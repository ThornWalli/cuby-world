import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import Deferred from '../classes/Deferred';

export interface FirebaseFullConfig extends FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FirebaseConfig extends FirebaseOptions {
  region: string;
  appCheck?: {
    recaptchaPublicKey?: string;
    debugToken?: string;
  };
}
// ...

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
  }
}

export interface FirebaseModules {
  app: typeof import('firebase/app');
  auth: typeof import('firebase/auth');
  database: typeof import('firebase/database');
  functions: typeof import('firebase/functions');
  firestore: typeof import('firebase/firestore');
}

export default new (class Firebase {
  app: FirebaseApp | undefined;
  private initDeferred?: Deferred<FirebaseApp>;
  private config: FirebaseConfig | undefined;

  async initAppCheck(config: FirebaseConfig, firebaseApp: FirebaseApp) {
    const recaptchaPublicKey = config.appCheck?.recaptchaPublicKey;
    if (recaptchaPublicKey) {
      if (config.appCheck?.debugToken) {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = config.appCheck.debugToken;
      }
      const { initializeAppCheck, ReCaptchaV3Provider } = await import(
        'firebase/app-check'
      );

      const appCheck = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(recaptchaPublicKey),
        isTokenAutoRefreshEnabled: true
      });

      return appCheck;
    } else {
      console.warn(
        'Firebase AppCheck is not configured. Please set the recaptchaPublicKey in the config.'
      );
      return;
    }
  }

  initApp(config: FirebaseConfig, force = false) {
    if (!this.initDeferred) {
      this.initDeferred = new Deferred();

      this.initDeferred.promise = this.initDeferred.promise.then(async () => {
        const { app: firebaseApp } = await this.get();

        this.config = config;

        const app = firebaseApp.initializeApp(config);
        await this.initAppCheck(config, app);

        this.app = app;
        return app;
      });

      if (force) {
        this.initDeferred.resolve();
      }
    }
    return this;
  }

  async getFunction<
    RequestData = unknown,
    ResponseData = unknown,
    ResponseStream = unknown
  >(name: string) {
    if (!this.app) {
      this.initDeferred?.resolve();
    }
    await this.initDeferred?.promise;
    if (!this.app) {
      throw new Error('Firebase app not initialized');
    }
    const {
      functions: { httpsCallable, getFunctions }
    } = await this.get();
    const functions = getFunctions(this.app, this.config?.region);
    return httpsCallable<RequestData, ResponseData, ResponseStream>(
      functions,
      name,
      {
        limitedUseAppCheckTokens: false
      }
    );
  }

  firebase: Promise<FirebaseModules> | null = null;

  get(): Promise<FirebaseModules> {
    return this.firebase || (this.firebase = this.getImports());
  }

  getImports(): Promise<FirebaseModules> {
    return Promise.all([
      import('firebase/app').then(module => module.default || module),
      import('firebase/auth').then(module => module.default || module),
      import('firebase/database').then(module => module.default || module),
      import('firebase/functions').then(module => module.default || module),
      import('firebase/firestore').then(module => module.default || module)
    ]).then(([app, auth, database, functions, firestore]) => {
      return {
        app,
        auth,
        database,
        functions,
        firestore
      };
    });
  }
})();
