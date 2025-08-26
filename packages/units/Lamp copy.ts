// import { type Object3D, LoopPingPong } from 'three';
// import {
//   Mesh,
//   MeshBasicMaterial,
//   MeshPhysicalMaterial,
//   PointLight,
//   SphereGeometry
// } from 'three';

// import Unit, {
//   OBJECT_NAME,
//   type AnimatedUnit,
//   type SetupContext,
//   type UnitConstructorOptions,
//   type UnitModules,
//   type UnitOptions
// } from '../app/lib/classes/Unit';
// import { getHoverClip } from '../app/lib/utils/animation';
// import type { UnitModuleSetupContext } from '../app/lib/classes/UnitModule';
// import { AnimationUnitModule } from '../app/lib/classes/unitModule/Animation';
// import { ASSET } from '../app/utils/assets';

// export type LampOptions = UnitOptions;
// export default class Lamp
//   extends Unit<LampOptions, UnitModules & { animation: UnitAnimation }>
//   implements AnimatedUnit
// {
//   override options = {
//     size: 0.5
//   };

//   constructor(
//     options: Omit<UnitConstructorOptions, 'name' | 'selectable'> = {}
//   ) {
//     super(
//       {
//         ...options,
//         name: 'Lamp',
//         selectable: true
//       },
//       [UnitAnimation]
//     );
//   }
//   animate: (deltaTime: number) => void;

//   override createMesh(context: SetupContext) {
//     const geometry = new SphereGeometry(0.3, 32, 16);
//     // const material = new MeshBasicMaterial({ color: 0xffff00 });

//     const glassMaterial = new MeshPhysicalMaterial({
//       color: 0xffffff,
//       metalness: 0,
//       roughness: 0,
//       transparent: true,
//       transmission: 1, // Wichtig für die Lichtdurchlässigkeit wie bei Glas
//       thickness: 0.1, // Dicke des Glases für Lichtbrechungseffekte
//       envMap: context.textures[ASSET.SKY_BOX_1] // Wichtig für realistische Reflexionen
//     });

//     // const cameraWrapper = new Object3D();

//     // const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
//     //   format: RGBFormat,
//     //   generateMipmaps: true,
//     //   minFilter: LinearMipmapLinearFilter
//     // });

//     // const cubeCamera = new CubeCamera(0.1, 50, cubeRenderTarget);
//     // cubeCamera.position.set(0, 0, 0);
//     // cameraWrapper.add(cubeCamera);
//     // this.cubeCamera = cubeCamera;
//     // const material = new MeshStandardMaterial({
//     //   color: 0xffffff,
//     //   metalness: 1, // Wichtig für eine spiegelnde Oberfläche
//     //   roughness: 0, // Je niedriger, desto spiegelnder
//     //   envMap: cubeRenderTarget.texture
//     // });
//     const mesh: Object3D = new Mesh(geometry, glassMaterial);

//     // mesh.add(cameraWrapper);

//     const lampGeometry = new SphereGeometry(0.1, 32, 16);
//     const lampMaterial = new MeshBasicMaterial({ color: 0xffff00 });
//     const innerMesh = new Mesh(lampGeometry, lampMaterial);
//     // const material = new MeshPhongMaterial({ color: 0xff0000 });
//     mesh.add(innerMesh);
//     // const size = this.options.size;
//     // const ratio = 19 / 20;
//     // const geometry = new BoxGeometry(size * 1, size * ratio, size * 1);

//     // const mesh: Object3D = new Mesh(geometry, material);
//     mesh.name = OBJECT_NAME.MESH;
//     // mesh.castShadow = true;
//     // mesh.receiveShadow = true;
//     mesh.position.set(0, 0.5, 0);

//     const light = new PointLight(0xffffff, 3, 10);
//     light.position.set(0, 0, 0);
//     light.castShadow = true;

//     light.shadow.mapSize.width = 128;
//     light.shadow.mapSize.height = 128;
//     light.shadow.camera.near = 1;
//     light.shadow.camera.far = 50;
//     light.shadow.camera.updateProjectionMatrix();

//     mesh.add(light);
//     // const spotLight = new SpotLight(0xffffff); // Weiße Farbe
//     // spotLight.intensity = 1; // Stärke des Lichts
//     // spotLight.distance = 10; // Maximale Entfernung des Lichts
//     // spotLight.angle = Math.PI / 4; // Winkel des Lichtkegels
//     // spotLight.penumbra = 0.05; // Weichheit des Randes
//     // spotLight.decay = 2; // Abnahme der Intensität mit der Entfernung
//     // mesh.add(spotLight);

//     // spotLight.position.set(0, 0, 0); // Position des Lichts relativ zur Lampe
//     // spotLight.target.position.set(0, -10, 0); // Ziel des Lichtstrahls

//     return mesh;
//   }

//   // setupAnimation(mesh: Object3D) {
//   //   const animationWrapper = new Object3D();
//   //   this.mixer = new AnimationMixer(animationWrapper);
//   //   animationWrapper.add(mesh);

//   //   const hoverClip = getHoverClip(0.03);
//   //   const action = this.mixer.clipAction(hoverClip);
//   //   action.setLoop(LoopPingPong, Infinity);

//   //   window.setTimeout(() => {
//   //     action.play();
//   //   }, Math.random() * 1000);
//   //   console.log('Cuby setup complete with animation:', action);

//   //   return animationWrapper;
//   // }

//   // animate(_deltaTime: number) {
//   //   this.mixer?.update(this.clock.getDelta());
//   // }
//   // animate() {
//   //   if (this.cubeCamera) {
//   //     const { scene, renderer } = this.room.app.renderer;
//   //     // Verstecke das spiegelnde Objekt, damit es sich nicht selbst reflektiert
//   //     this.mesh.visible = false;
//   //     if (this.room.app.state.selectedUnit) {
//   //       this.room.app.state.selectedUnit.mesh.getObjectByName(
//   //         OBJECT_NAME.MESH_OUTLINE
//   //       ).visible = false;
//   //     }

//   //     // Aktualisiere die CubeCamera
//   //     this.cubeCamera.update(renderer, scene);

//   //     if (this.room.app.state.selectedUnit) {
//   //       this.room.app.state.selectedUnit.mesh.getObjectByName(
//   //         OBJECT_NAME.MESH_OUTLINE
//   //       ).visible = true;
//   //     }
//   //     // Mache das Objekt wieder sichtbar
//   //     this.mesh.visible = true;
//   //   }
//   // }

//   override async setup(context: SetupContext) {
//     super.setup(context);

//     // this.rayTexture = context.texture[].load('path/to/your/pixel_ray_texture.png');
//     // rayTexture.minFilter = THREE.NearestFilter;
//     // rayTexture.magFilter = THREE.NearestFilter;

//     // // Erstelle ein transparentes Material für die Strahlen
//     // const rayMaterial = new THREE.MeshBasicMaterial({
//     //   map: rayTexture,
//     //   transparent: true,
//     //   blending: THREE.AdditiveBlending, // Strahlen werden überlagert
//     //   side: THREE.DoubleSide, // Strahlen von beiden Seiten sichtbar
//     // });

//     // // Erstelle eine Ebene für die Strahlen
//     // const rayGeometry = new THREE.PlaneGeometry(10, 10);
//     // const rays = new THREE.Mesh(rayGeometry, rayMaterial);
//     // rays.position.copy(sun.position);
//   }
// }

// class UnitAnimation extends AnimationUnitModule {
//   override async setup(context: UnitModuleSetupContext) {
//     const mesh = await super.setup(context);

//     const hoverClip = getHoverClip(0.03);
//     const action = this.mixer.clipAction(hoverClip);
//     action.setLoop(LoopPingPong, Infinity);

//     window.setTimeout(() => {
//       action.play();
//     }, Math.random() * 1000);

//     console.log('Lamp setup complete with animation:', action);

//     return mesh;
//   }
//   update(_deltaTime: number) {
//     this.mixer?.update(this.clock.getDelta());
//   }
// }
