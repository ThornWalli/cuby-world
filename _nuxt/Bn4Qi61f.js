import{F as sm,a as It,L as im,R as ie,H as os,I as Zo,J as Ml,K as om,Z as am,g as um,_ as Fl,Y as cm,q as lm,b as hm,i as dm,G as ei,$ as Ol,a0 as Ll,S as fm,e as mm,C as gm,r as uc,o as pm}from"./CSIJlsuB.js";var cc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Se,ql;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function I(){}I.prototype=p.prototype,T.F=p.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(w,E,P){for(var y=Array(arguments.length-2),Mt=2;Mt<arguments.length;Mt++)y[Mt-2]=arguments[Mt];return p.prototype[E].apply(w,y)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,I){I||(I=0);const w=Array(16);if(typeof p=="string")for(var E=0;E<16;++E)w[E]=p.charCodeAt(I++)|p.charCodeAt(I++)<<8|p.charCodeAt(I++)<<16|p.charCodeAt(I++)<<24;else for(E=0;E<16;++E)w[E]=p[I++]|p[I++]<<8|p[I++]<<16|p[I++]<<24;p=T.g[0],I=T.g[1],E=T.g[2];let P=T.g[3],y;y=p+(P^I&(E^P))+w[0]+3614090360&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(E^p&(I^E))+w[1]+3905402710&4294967295,P=p+(y<<12&4294967295|y>>>20),y=E+(I^P&(p^I))+w[2]+606105819&4294967295,E=P+(y<<17&4294967295|y>>>15),y=I+(p^E&(P^p))+w[3]+3250441966&4294967295,I=E+(y<<22&4294967295|y>>>10),y=p+(P^I&(E^P))+w[4]+4118548399&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(E^p&(I^E))+w[5]+1200080426&4294967295,P=p+(y<<12&4294967295|y>>>20),y=E+(I^P&(p^I))+w[6]+2821735955&4294967295,E=P+(y<<17&4294967295|y>>>15),y=I+(p^E&(P^p))+w[7]+4249261313&4294967295,I=E+(y<<22&4294967295|y>>>10),y=p+(P^I&(E^P))+w[8]+1770035416&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(E^p&(I^E))+w[9]+2336552879&4294967295,P=p+(y<<12&4294967295|y>>>20),y=E+(I^P&(p^I))+w[10]+4294925233&4294967295,E=P+(y<<17&4294967295|y>>>15),y=I+(p^E&(P^p))+w[11]+2304563134&4294967295,I=E+(y<<22&4294967295|y>>>10),y=p+(P^I&(E^P))+w[12]+1804603682&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(E^p&(I^E))+w[13]+4254626195&4294967295,P=p+(y<<12&4294967295|y>>>20),y=E+(I^P&(p^I))+w[14]+2792965006&4294967295,E=P+(y<<17&4294967295|y>>>15),y=I+(p^E&(P^p))+w[15]+1236535329&4294967295,I=E+(y<<22&4294967295|y>>>10),y=p+(E^P&(I^E))+w[1]+4129170786&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^E&(p^I))+w[6]+3225465664&4294967295,P=p+(y<<9&4294967295|y>>>23),y=E+(p^I&(P^p))+w[11]+643717713&4294967295,E=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(E^P))+w[0]+3921069994&4294967295,I=E+(y<<20&4294967295|y>>>12),y=p+(E^P&(I^E))+w[5]+3593408605&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^E&(p^I))+w[10]+38016083&4294967295,P=p+(y<<9&4294967295|y>>>23),y=E+(p^I&(P^p))+w[15]+3634488961&4294967295,E=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(E^P))+w[4]+3889429448&4294967295,I=E+(y<<20&4294967295|y>>>12),y=p+(E^P&(I^E))+w[9]+568446438&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^E&(p^I))+w[14]+3275163606&4294967295,P=p+(y<<9&4294967295|y>>>23),y=E+(p^I&(P^p))+w[3]+4107603335&4294967295,E=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(E^P))+w[8]+1163531501&4294967295,I=E+(y<<20&4294967295|y>>>12),y=p+(E^P&(I^E))+w[13]+2850285829&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^E&(p^I))+w[2]+4243563512&4294967295,P=p+(y<<9&4294967295|y>>>23),y=E+(p^I&(P^p))+w[7]+1735328473&4294967295,E=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(E^P))+w[12]+2368359562&4294967295,I=E+(y<<20&4294967295|y>>>12),y=p+(I^E^P)+w[5]+4294588738&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^E)+w[8]+2272392833&4294967295,P=p+(y<<11&4294967295|y>>>21),y=E+(P^p^I)+w[11]+1839030562&4294967295,E=P+(y<<16&4294967295|y>>>16),y=I+(E^P^p)+w[14]+4259657740&4294967295,I=E+(y<<23&4294967295|y>>>9),y=p+(I^E^P)+w[1]+2763975236&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^E)+w[4]+1272893353&4294967295,P=p+(y<<11&4294967295|y>>>21),y=E+(P^p^I)+w[7]+4139469664&4294967295,E=P+(y<<16&4294967295|y>>>16),y=I+(E^P^p)+w[10]+3200236656&4294967295,I=E+(y<<23&4294967295|y>>>9),y=p+(I^E^P)+w[13]+681279174&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^E)+w[0]+3936430074&4294967295,P=p+(y<<11&4294967295|y>>>21),y=E+(P^p^I)+w[3]+3572445317&4294967295,E=P+(y<<16&4294967295|y>>>16),y=I+(E^P^p)+w[6]+76029189&4294967295,I=E+(y<<23&4294967295|y>>>9),y=p+(I^E^P)+w[9]+3654602809&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^E)+w[12]+3873151461&4294967295,P=p+(y<<11&4294967295|y>>>21),y=E+(P^p^I)+w[15]+530742520&4294967295,E=P+(y<<16&4294967295|y>>>16),y=I+(E^P^p)+w[2]+3299628645&4294967295,I=E+(y<<23&4294967295|y>>>9),y=p+(E^(I|~P))+w[0]+4096336452&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~E))+w[7]+1126891415&4294967295,P=p+(y<<10&4294967295|y>>>22),y=E+(p^(P|~I))+w[14]+2878612391&4294967295,E=P+(y<<15&4294967295|y>>>17),y=I+(P^(E|~p))+w[5]+4237533241&4294967295,I=E+(y<<21&4294967295|y>>>11),y=p+(E^(I|~P))+w[12]+1700485571&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~E))+w[3]+2399980690&4294967295,P=p+(y<<10&4294967295|y>>>22),y=E+(p^(P|~I))+w[10]+4293915773&4294967295,E=P+(y<<15&4294967295|y>>>17),y=I+(P^(E|~p))+w[1]+2240044497&4294967295,I=E+(y<<21&4294967295|y>>>11),y=p+(E^(I|~P))+w[8]+1873313359&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~E))+w[15]+4264355552&4294967295,P=p+(y<<10&4294967295|y>>>22),y=E+(p^(P|~I))+w[6]+2734768916&4294967295,E=P+(y<<15&4294967295|y>>>17),y=I+(P^(E|~p))+w[13]+1309151649&4294967295,I=E+(y<<21&4294967295|y>>>11),y=p+(E^(I|~P))+w[4]+4149444226&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~E))+w[11]+3174756917&4294967295,P=p+(y<<10&4294967295|y>>>22),y=E+(p^(P|~I))+w[2]+718787259&4294967295,E=P+(y<<15&4294967295|y>>>17),y=I+(P^(E|~p))+w[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+P&4294967295}n.prototype.v=function(T,p){p===void 0&&(p=T.length);const I=p-this.blockSize,w=this.C;let E=this.h,P=0;for(;P<p;){if(E==0)for(;P<=I;)s(this,T,P),P+=this.blockSize;if(typeof T=="string"){for(;P<p;)if(w[E++]=T.charCodeAt(P++),E==this.blockSize){s(this,w),E=0;break}}else for(;P<p;)if(w[E++]=T[P++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=p},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;p=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=p&255,p/=256;for(this.v(T),T=Array(16),p=0,I=0;I<4;++I)for(let w=0;w<32;w+=8)T[p++]=this.g[I]>>>w&255;return T};function i(T,p){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=p(T)}function a(T,p){this.h=p;const I=[];let w=!0;for(let E=T.length-1;E>=0;E--){const P=T[E]|0;w&&P==p||(I[E]=P,w=!1)}this.g=I}var u={};function c(T){return-128<=T&&T<128?i(T,function(p){return new a([p|0],p<0?-1:0)}):new a([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return x(h(-T));const p=[];let I=1;for(let w=0;T>=I;w++)p[w]=T/I|0,I*=4294967296;return new a(p,0)}function f(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return x(f(T.substring(1),p));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(p,8));let w=m;for(let P=0;P<T.length;P+=8){var E=Math.min(8,T.length-P);const y=parseInt(T.substring(P,P+E),p);E<8?(E=h(Math.pow(p,E)),w=w.j(E).add(h(y))):(w=w.j(I),w=w.add(h(y)))}return w}var m=c(0),_=c(1),S=c(16777216);r=a.prototype,r.m=function(){if(C(this))return-x(this).m();let T=0,p=1;for(let I=0;I<this.g.length;I++){const w=this.i(I);T+=(w>=0?w:4294967296+w)*p,p*=4294967296}return T},r.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(N(this))return"0";if(C(this))return"-"+x(this).toString(T);const p=h(Math.pow(T,6));var I=this;let w="";for(;;){const E=Y(I,p).g;I=B(I,E.j(p));let P=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=E,N(I))return P+w;for(;P.length<6;)P="0"+P;w=P+w}},r.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function N(T){if(T.h!=0)return!1;for(let p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function C(T){return T.h==-1}r.l=function(T){return T=B(this,T),C(T)?-1:N(T)?0:1};function x(T){const p=T.g.length,I=[];for(let w=0;w<p;w++)I[w]=~T.g[w];return new a(I,~T.h).add(_)}r.abs=function(){return C(this)?x(this):this},r.add=function(T){const p=Math.max(this.g.length,T.g.length),I=[];let w=0;for(let E=0;E<=p;E++){let P=w+(this.i(E)&65535)+(T.i(E)&65535),y=(P>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);w=y>>>16,P&=65535,y&=65535,I[E]=y<<16|P}return new a(I,I[I.length-1]&-2147483648?-1:0)};function B(T,p){return T.add(x(p))}r.j=function(T){if(N(this)||N(T))return m;if(C(this))return C(T)?x(this).j(x(T)):x(x(this).j(T));if(C(T))return x(this.j(x(T)));if(this.l(S)<0&&T.l(S)<0)return h(this.m()*T.m());const p=this.g.length+T.g.length,I=[];for(var w=0;w<2*p;w++)I[w]=0;for(w=0;w<this.g.length;w++)for(let E=0;E<T.g.length;E++){const P=this.i(w)>>>16,y=this.i(w)&65535,Mt=T.i(E)>>>16,je=T.i(E)&65535;I[2*w+2*E]+=y*je,G(I,2*w+2*E),I[2*w+2*E+1]+=P*je,G(I,2*w+2*E+1),I[2*w+2*E+1]+=y*Mt,G(I,2*w+2*E+1),I[2*w+2*E+2]+=P*Mt,G(I,2*w+2*E+2)}for(T=0;T<p;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=p;T<2*p;T++)I[T]=0;return new a(I,0)};function G(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function U(T,p){this.g=T,this.h=p}function Y(T,p){if(N(p))throw Error("division by zero");if(N(T))return new U(m,m);if(C(T))return p=Y(x(T),p),new U(x(p.g),x(p.h));if(C(p))return p=Y(T,x(p)),new U(x(p.g),p.h);if(T.g.length>30){if(C(T)||C(p))throw Error("slowDivide_ only works with positive integers.");for(var I=_,w=p;w.l(T)<=0;)I=X(I),w=X(w);var E=H(I,1),P=H(w,1);for(w=H(w,2),I=H(I,2);!N(w);){var y=P.add(w);y.l(T)<=0&&(E=E.add(I),P=y),w=H(w,1),I=H(I,1)}return p=B(T,E.j(p)),new U(E,p)}for(E=m;T.l(p)>=0;){for(I=Math.max(1,Math.floor(T.m()/p.m())),w=Math.ceil(Math.log(I)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),P=h(I),y=P.j(p);C(y)||y.l(T)>0;)I-=w,P=h(I),y=P.j(p);N(P)&&(P=_),E=E.add(P),T=B(T,y)}return new U(E,T)}r.B=function(T){return Y(this,T).h},r.and=function(T){const p=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<p;w++)I[w]=this.i(w)&T.i(w);return new a(I,this.h&T.h)},r.or=function(T){const p=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<p;w++)I[w]=this.i(w)|T.i(w);return new a(I,this.h|T.h)},r.xor=function(T){const p=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<p;w++)I[w]=this.i(w)^T.i(w);return new a(I,this.h^T.h)};function X(T){const p=T.g.length+1,I=[];for(let w=0;w<p;w++)I[w]=T.i(w)<<1|T.i(w-1)>>>31;return new a(I,T.h)}function H(T,p){const I=p>>5;p%=32;const w=T.g.length-I,E=[];for(let P=0;P<w;P++)E[P]=p>0?T.i(P+I)>>>p|T.i(P+I+1)<<32-p:T.i(P+I);return new a(E,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,ql=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Se=a}).apply(typeof cc<"u"?cc:typeof self<"u"?self:typeof window<"u"?window:{});var Fs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bl,kr,Ul,zs,Ro,jl,Gl,zl;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fs=="object"&&Fs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,l){if(l)t:{var d=n;o=o.split(".");for(var g=0;g<o.length-1;g++){var v=o[g];if(!(v in d))break t;d=d[v]}o=o[o.length-1],g=d[o],l=l(g),l!=g&&l!=null&&t(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function c(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=c,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function m(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(g,v,V){for(var F=Array(arguments.length-2),K=2;K<arguments.length;K++)F[K-2]=arguments[K];return l.prototype[v].apply(g,F)}}var _=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const l=o.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=o[g];return d}return[]}function N(o,l){for(let g=1;g<arguments.length;g++){const v=arguments[g];var d=typeof v;if(d=d!="object"?d:v?Array.isArray(v)?"array":d:"null",d=="array"||d=="object"&&typeof v.length=="number"){d=o.length||0;const V=v.length||0;o.length=d+V;for(let F=0;F<V;F++)o[d+F]=v[F]}else o.push(v)}}class C{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(o){a.setTimeout(()=>{throw o},0)}function B(){var o=T;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class G{constructor(){this.h=this.g=null}add(l,d){const g=U.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var U=new C(()=>new Y,o=>o.reset());class Y{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let X,H=!1,T=new G,p=()=>{const o=Promise.resolve(void 0);X=()=>{o.then(I)}};function I(){for(var o;o=B();){try{o.h.call(o.g)}catch(d){x(d)}var l=U;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}H=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var P=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o})();function y(o){return/^[\s\xa0]*$/.test(o)}function Mt(o,l){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}m(Mt,E),Mt.prototype.init=function(o,l){const d=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Mt.Z.h.call(this)},Mt.prototype.h=function(){Mt.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var je="closure_listenable_"+(Math.random()*1e6|0),Pf=0;function Sf(o,l,d,g,v){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=v,this.key=++Pf,this.da=this.fa=!1}function Es(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ws(o,l,d){for(const g in o)l.call(d,o[g],g,o)}function Vf(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function au(o){const l={};for(const d in o)l[d]=o[d];return l}const uu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function cu(o,l){let d,g;for(let v=1;v<arguments.length;v++){g=arguments[v];for(d in g)o[d]=g[d];for(let V=0;V<uu.length;V++)d=uu[V],Object.prototype.hasOwnProperty.call(g,d)&&(o[d]=g[d])}}function As(o){this.src=o,this.g={},this.h=0}As.prototype.add=function(o,l,d,g,v){const V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);const F=Qi(o,l,g,v);return F>-1?(l=o[F],d||(l.fa=!1)):(l=new Sf(l,this.src,V,!!g,v),l.fa=d,o.push(l)),l};function Ki(o,l){const d=l.type;if(d in o.g){var g=o.g[d],v=Array.prototype.indexOf.call(g,l,void 0),V;(V=v>=0)&&Array.prototype.splice.call(g,v,1),V&&(Es(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Qi(o,l,d,g){for(let v=0;v<o.length;++v){const V=o[v];if(!V.da&&V.listener==l&&V.capture==!!d&&V.ha==g)return v}return-1}var $i="closure_lm_"+(Math.random()*1e6|0),Wi={};function lu(o,l,d,g,v){if(Array.isArray(l)){for(let V=0;V<l.length;V++)lu(o,l[V],d,g,v);return null}return d=fu(d),o&&o[je]?o.J(l,d,u(g)?!!g.capture:!1,v):bf(o,l,d,!1,g,v)}function bf(o,l,d,g,v,V){if(!l)throw Error("Invalid event type");const F=u(v)?!!v.capture:!!v;let K=Ji(o);if(K||(o[$i]=K=new As(o)),d=K.add(l,d,g,F,V),d.proxy)return d;if(g=Cf(),d.proxy=g,g.src=o,g.listener=d,o.addEventListener)P||(v=F),v===void 0&&(v=!1),o.addEventListener(l.toString(),g,v);else if(o.attachEvent)o.attachEvent(du(l.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Cf(){function o(d){return l.call(o.src,o.listener,d)}const l=xf;return o}function hu(o,l,d,g,v){if(Array.isArray(l))for(var V=0;V<l.length;V++)hu(o,l[V],d,g,v);else g=u(g)?!!g.capture:!!g,d=fu(d),o&&o[je]?(o=o.i,V=String(l).toString(),V in o.g&&(l=o.g[V],d=Qi(l,d,g,v),d>-1&&(Es(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[V],o.h--)))):o&&(o=Ji(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Qi(l,d,g,v)),(d=o>-1?l[o]:null)&&Hi(d))}function Hi(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[je])Ki(l.i,o);else{var d=o.type,g=o.proxy;l.removeEventListener?l.removeEventListener(d,g,o.capture):l.detachEvent?l.detachEvent(du(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=Ji(l))?(Ki(d,o),d.h==0&&(d.src=null,l[$i]=null)):Es(o)}}}function du(o){return o in Wi?Wi[o]:Wi[o]="on"+o}function xf(o,l){if(o.da)o=!0;else{l=new Mt(l,this);const d=o.listener,g=o.ha||o.src;o.fa&&Hi(o),o=d.call(g,l)}return o}function Ji(o){return o=o[$i],o instanceof As?o:null}var Xi="__closure_events_fn_"+(Math.random()*1e9>>>0);function fu(o){return typeof o=="function"?o:(o[Xi]||(o[Xi]=function(l){return o.handleEvent(l)}),o[Xi])}function Vt(){w.call(this),this.i=new As(this),this.M=this,this.G=null}m(Vt,w),Vt.prototype[je]=!0,Vt.prototype.removeEventListener=function(o,l,d,g){hu(this,o,l,d,g)};function Nt(o,l){var d,g=o.G;if(g)for(d=[];g;g=g.G)d.push(g);if(o=o.M,g=l.type||l,typeof l=="string")l=new E(l,o);else if(l instanceof E)l.target=l.target||o;else{var v=l;l=new E(g,o),cu(l,v)}v=!0;let V,F;if(d)for(F=d.length-1;F>=0;F--)V=l.g=d[F],v=vs(V,g,!0,l)&&v;if(V=l.g=o,v=vs(V,g,!0,l)&&v,v=vs(V,g,!1,l)&&v,d)for(F=0;F<d.length;F++)V=l.g=d[F],v=vs(V,g,!1,l)&&v}Vt.prototype.N=function(){if(Vt.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let g=0;g<d.length;g++)Es(d[g]);delete o.g[l],o.h--}}this.G=null},Vt.prototype.J=function(o,l,d,g){return this.i.add(String(o),l,!1,d,g)},Vt.prototype.K=function(o,l,d,g){return this.i.add(String(o),l,!0,d,g)};function vs(o,l,d,g){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let v=!0;for(let V=0;V<l.length;++V){const F=l[V];if(F&&!F.da&&F.capture==d){const K=F.listener,yt=F.ha||F.src;F.fa&&Ki(o.i,F),v=K.call(yt,g)!==!1&&v}}return v&&!g.defaultPrevented}function Df(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function mu(o){o.g=Df(()=>{o.g=null,o.i&&(o.i=!1,mu(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Nf extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:mu(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fr(o){w.call(this),this.h=o,this.g={}}m(fr,w);var gu=[];function pu(o){ws(o.g,function(l,d){this.g.hasOwnProperty(d)&&Hi(l)},o),o.g={}}fr.prototype.N=function(){fr.Z.N.call(this),pu(this)},fr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Yi=a.JSON.stringify,kf=a.JSON.parse,Mf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function _u(){}function yu(){}var mr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Zi(){E.call(this,"d")}m(Zi,E);function to(){E.call(this,"c")}m(to,E);var Ge={},Iu=null;function Rs(){return Iu=Iu||new Vt}Ge.Ia="serverreachability";function Tu(o){E.call(this,Ge.Ia,o)}m(Tu,E);function gr(o){const l=Rs();Nt(l,new Tu(l))}Ge.STAT_EVENT="statevent";function Eu(o,l){E.call(this,Ge.STAT_EVENT,o),this.stat=l}m(Eu,E);function kt(o){const l=Rs();Nt(l,new Eu(l,o))}Ge.Ja="timingevent";function wu(o,l){E.call(this,Ge.Ja,o),this.size=l}m(wu,E);function pr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function _r(){this.g=!0}_r.prototype.ua=function(){this.g=!1};function Ff(o,l,d,g,v,V){o.info(function(){if(o.g)if(V){var F="",K=V.split("&");for(let rt=0;rt<K.length;rt++){var yt=K[rt].split("=");if(yt.length>1){const Et=yt[0];yt=yt[1];const Ht=Et.split("_");F=Ht.length>=2&&Ht[1]=="type"?F+(Et+"="+yt+"&"):F+(Et+"=redacted&")}}}else F=null;else F=V;return"XMLHTTP REQ ("+g+") [attempt "+v+"]: "+l+`
`+d+`
`+F})}function Of(o,l,d,g,v,V,F){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+v+"]: "+l+`
`+d+`
`+V+" "+F})}function wn(o,l,d,g){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+qf(o,d)+(g?" "+g:"")})}function Lf(o,l){o.info(function(){return"TIMEOUT: "+l})}_r.prototype.info=function(){};function qf(o,l){if(!o.g)return l;if(!l)return null;try{const V=JSON.parse(l);if(V){for(o=0;o<V.length;o++)if(Array.isArray(V[o])){var d=V[o];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var v=g[0];if(v!="noop"&&v!="stop"&&v!="close")for(let F=1;F<g.length;F++)g[F]=""}}}}return Yi(V)}catch{return l}}var Ps={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Au={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},vu;function eo(){}m(eo,_u),eo.prototype.g=function(){return new XMLHttpRequest},vu=new eo;function yr(o){return encodeURIComponent(String(o))}function Bf(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function fe(o,l,d,g){this.j=o,this.i=l,this.l=d,this.S=g||1,this.V=new fr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ru}function Ru(){this.i=null,this.g="",this.h=!1}var Pu={},no={};function ro(o,l,d){o.M=1,o.A=Vs(Wt(l)),o.u=d,o.R=!0,Su(o,null)}function Su(o,l){o.F=Date.now(),Ss(o),o.B=Wt(o.A);var d=o.B,g=o.S;Array.isArray(g)||(g=[String(g)]),Bu(d.i,"t",g),o.C=0,d=o.j.L,o.h=new Ru,o.g=sc(o.j,d?l:null,!o.u),o.P>0&&(o.O=new Nf(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,g=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(gu[0]=v.toString()),v=gu);for(let V=0;V<v.length;V++){const F=lu(d,v[V],g||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=o.J?au(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),gr(),Ff(o.i,o.v,o.B,o.l,o.S,o.u)}fe.prototype.ba=function(o){o=o.target;const l=this.O;l&&pe(o)==3?l.j():this.Y(o)},fe.prototype.Y=function(o){try{if(o==this.g)t:{const K=pe(this.g),yt=this.g.ya(),rt=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||$u(this.g)))){this.K||K!=4||yt==7||(yt==8||rt<=0?gr(3):gr(2)),so(this);var l=this.g.ca();this.X=l;var d=Uf(this);if(this.o=l==200,Of(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,v=this.g;if((g=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var V=g;break e}}V=null}if(o=V)wn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,io(this,o);else{this.o=!1,this.m=3,kt(12),ze(this),Ir(this);break t}}if(this.R){o=!0;let Et;for(;!this.K&&this.C<d.length;)if(Et=jf(this,d),Et==no){K==4&&(this.m=4,kt(14),o=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(Et==Pu){this.m=4,kt(15),wn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else wn(this.i,this.l,Et,null),io(this,Et);if(Vu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,kt(16),o=!1),this.o=this.o&&o,!o)wn(this.i,this.l,d,"[Invalid Chunked Response]"),ze(this),Ir(this);else if(d.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),mo(F),F.P=!0,kt(11))}}else wn(this.i,this.l,d,null),io(this,d);K==4&&ze(this),this.o&&!this.K&&(K==4?tc(this.j,this):(this.o=!1,Ss(this)))}else nm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,kt(12)):(this.m=0,kt(13)),ze(this),Ir(this)}}}catch{}finally{}};function Uf(o){if(!Vu(o))return o.g.la();const l=$u(o.g);if(l==="")return"";let d="";const g=l.length,v=pe(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return ze(o),Ir(o),"";o.h.i=new a.TextDecoder}for(let V=0;V<g;V++)o.h.h=!0,d+=o.h.i.decode(l[V],{stream:!(v&&V==g-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function Vu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function jf(o,l){var d=o.C,g=l.indexOf(`
`,d);return g==-1?no:(d=Number(l.substring(d,g)),isNaN(d)?Pu:(g+=1,g+d>l.length?no:(l=l.slice(g,g+d),o.C=g+d,l)))}fe.prototype.cancel=function(){this.K=!0,ze(this)};function Ss(o){o.T=Date.now()+o.H,bu(o,o.H)}function bu(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=pr(h(o.aa,o),l)}function so(o){o.D&&(a.clearTimeout(o.D),o.D=null)}fe.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Lf(this.i,this.B),this.M!=2&&(gr(),kt(17)),ze(this),this.m=2,Ir(this)):bu(this,this.T-o)};function Ir(o){o.j.I==0||o.K||tc(o.j,o)}function ze(o){so(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,pu(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function io(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||oo(d.h,o))){if(!o.L&&oo(d.h,o)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var v=g;if(v[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Ns(d),xs(d);else break t;fo(d),kt(18)}}else d.xa=v[1],0<d.xa-d.K&&v[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=pr(h(d.Va,d),6e3));Du(d.h)<=1&&d.ta&&(d.ta=void 0)}else Qe(d,11)}else if((o.L||d.g==o)&&Ns(d),!y(l))for(v=d.Ba.g.parse(l),l=0;l<v.length;l++){let rt=v[l];const Et=rt[0];if(!(Et<=d.K))if(d.K=Et,rt=rt[1],d.I==2)if(rt[0]=="c"){d.M=rt[1],d.ba=rt[2];const Ht=rt[3];Ht!=null&&(d.ka=Ht,d.j.info("VER="+d.ka));const $e=rt[4];$e!=null&&(d.za=$e,d.j.info("SVER="+d.za));const _e=rt[5];_e!=null&&typeof _e=="number"&&_e>0&&(g=1.5*_e,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const ye=o.g;if(ye){const Ms=ye.g?ye.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ms){var V=g.h;V.g||Ms.indexOf("spdy")==-1&&Ms.indexOf("quic")==-1&&Ms.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(ao(V,V.h),V.h=null))}if(g.G){const go=ye.g?ye.g.getResponseHeader("X-HTTP-Session-Id"):null;go&&(g.wa=go,ot(g.J,g.G,go))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var F=o;if(g.na=rc(g,g.L?g.ba:null,g.W),F.L){Nu(g.h,F);var K=F,yt=g.O;yt&&(K.H=yt),K.D&&(so(K),Ss(K)),g.g=F}else Yu(g);d.i.length>0&&Ds(d)}else rt[0]!="stop"&&rt[0]!="close"||Qe(d,7);else d.I==3&&(rt[0]=="stop"||rt[0]=="close"?rt[0]=="stop"?Qe(d,7):ho(d):rt[0]!="noop"&&d.l&&d.l.qa(rt),d.A=0)}}gr(4)}catch{}}var Gf=class{constructor(o,l){this.g=o,this.map=l}};function Cu(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function xu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Du(o){return o.h?1:o.g?o.g.size:0}function oo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function ao(o,l){o.g?o.g.add(l):o.h=l}function Nu(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Cu.prototype.cancel=function(){if(this.i=ku(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ku(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return S(o.i)}var Mu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zf(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const g=o[d].indexOf("=");let v,V=null;g>=0?(v=o[d].substring(0,g),V=o[d].substring(g+1)):v=o[d],l(v,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function me(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof me?(this.l=o.l,Tr(this,o.j),this.o=o.o,this.g=o.g,Er(this,o.u),this.h=o.h,uo(this,Uu(o.i)),this.m=o.m):o&&(l=String(o).match(Mu))?(this.l=!1,Tr(this,l[1]||"",!0),this.o=wr(l[2]||""),this.g=wr(l[3]||"",!0),Er(this,l[4]),this.h=wr(l[5]||"",!0),uo(this,l[6]||"",!0),this.m=wr(l[7]||"")):(this.l=!1,this.i=new vr(null,this.l))}me.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Ar(l,Fu,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Ar(l,Fu,!0),"@"),o.push(yr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ar(d,d.charAt(0)=="/"?$f:Qf,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ar(d,Hf)),o.join("")},me.prototype.resolve=function(o){const l=Wt(this);let d=!!o.j;d?Tr(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var g=o.h;if(d)Er(l,o.u);else if(d=!!o.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var v=l.h.lastIndexOf("/");v!=-1&&(g=l.h.slice(0,v+1)+g)}if(v=g,v==".."||v==".")g="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){g=v.lastIndexOf("/",0)==0,v=v.split("/");const V=[];for(let F=0;F<v.length;){const K=v[F++];K=="."?g&&F==v.length&&V.push(""):K==".."?((V.length>1||V.length==1&&V[0]!="")&&V.pop(),g&&F==v.length&&V.push("")):(V.push(K),g=!0)}g=V.join("/")}else g=v}return d?l.h=g:d=o.i.toString()!=="",d?uo(l,Uu(o.i)):d=!!o.m,d&&(l.m=o.m),l};function Wt(o){return new me(o)}function Tr(o,l,d){o.j=d?wr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Er(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function uo(o,l,d){l instanceof vr?(o.i=l,Jf(o.i,o.l)):(d||(l=Ar(l,Wf)),o.i=new vr(l,o.l))}function ot(o,l,d){o.i.set(l,d)}function Vs(o){return ot(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function wr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ar(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Kf),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Kf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Fu=/[#\/\?@]/g,Qf=/[#\?:]/g,$f=/[#\?]/g,Wf=/[#\?@]/g,Hf=/#/g;function vr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Ke(o){o.g||(o.g=new Map,o.h=0,o.i&&zf(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=vr.prototype,r.add=function(o,l){Ke(this),this.i=null,o=An(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Ou(o,l){Ke(o),l=An(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Lu(o,l){return Ke(o),l=An(o,l),o.g.has(l)}r.forEach=function(o,l){Ke(this),this.g.forEach(function(d,g){d.forEach(function(v){o.call(l,v,g,this)},this)},this)};function qu(o,l){Ke(o);let d=[];if(typeof l=="string")Lu(o,l)&&(d=d.concat(o.g.get(An(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}r.set=function(o,l){return Ke(this),this.i=null,o=An(this,o),Lu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=qu(this,o),o.length>0?String(o[0]):l):l};function Bu(o,l,d){Ou(o,l),d.length>0&&(o.i=null,o.g.set(An(o,l),S(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const v=yr(d);d=qu(this,d);for(let V=0;V<d.length;V++){let F=v;d[V]!==""&&(F+="="+yr(d[V])),o.push(F)}}return this.i=o.join("&")};function Uu(o){const l=new vr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function An(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Jf(o,l){l&&!o.j&&(Ke(o),o.i=null,o.g.forEach(function(d,g){const v=g.toLowerCase();g!=v&&(Ou(this,g),Bu(this,v,d))},o)),o.j=l}function Xf(o,l){const d=new _r;if(a.Image){const g=new Image;g.onload=f(ge,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(ge,d,"TestLoadImage: error",!1,l,g),g.onabort=f(ge,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(ge,d,"TestLoadImage: timeout",!1,l,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else l(!1)}function Yf(o,l){const d=new _r,g=new AbortController,v=setTimeout(()=>{g.abort(),ge(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:g.signal}).then(V=>{clearTimeout(v),V.ok?ge(d,"TestPingServer: ok",!0,l):ge(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(v),ge(d,"TestPingServer: error",!1,l)})}function ge(o,l,d,g,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),g(d)}catch{}}function Zf(){this.g=new Mf}function co(o){this.i=o.Sb||null,this.h=o.ab||!1}m(co,_u),co.prototype.g=function(){return new bs(this.i,this.h)};function bs(o,l){Vt.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(bs,Vt),r=bs.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,Pr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Rr(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Pr(this)),this.g&&(this.readyState=3,Pr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ju(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ju(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Rr(this):Pr(this),this.readyState==3&&ju(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,Rr(this))},r.Na=function(o){this.g&&(this.response=o,Rr(this))},r.ga=function(){this.g&&Rr(this)};function Rr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Pr(o)}r.setRequestHeader=function(o,l){this.A.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Pr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(bs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Gu(o){let l="";return ws(o,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function lo(o,l,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=Gu(d),typeof o=="string"?d!=null&&yr(d):ot(o,l,d))}function dt(o){Vt.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(dt,Vt);var tm=/^https?$/i,em=["POST","PUT"];r=dt.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():vu.g(),this.g.onreadystatechange=_(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(V){zu(this,V);return}if(o=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var v in g)d.set(v,g[v]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const V of g.keys())d.set(V,g.get(V));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(V=>V.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(em,l,void 0)>=0)||g||v||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,F]of d)this.g.setRequestHeader(V,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(V){zu(this,V)}};function zu(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,Ku(o),Cs(o)}function Ku(o){o.A||(o.A=!0,Nt(o,"complete"),Nt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Nt(this,"complete"),Nt(this,"abort"),Cs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Cs(this,!0)),dt.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Qu(this):this.Xa())},r.Xa=function(){Qu(this)};function Qu(o){if(o.h&&typeof i<"u"){if(o.v&&pe(o)==4)setTimeout(o.Ca.bind(o),0);else if(Nt(o,"readystatechange"),pe(o)==4){o.h=!1;try{const V=o.ca();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var g;if(g=V===0){let F=String(o.D).match(Mu)[1]||null;!F&&a.self&&a.self.location&&(F=a.self.location.protocol.slice(0,-1)),g=!tm.test(F?F.toLowerCase():"")}d=g}if(d)Nt(o,"complete"),Nt(o,"success");else{o.o=6;try{var v=pe(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",Ku(o)}}finally{Cs(o)}}}}function Cs(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||Nt(o,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function pe(o){return o.g?o.g.readyState:0}r.ca=function(){try{return pe(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),kf(l)}};function $u(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function nm(o){const l={};o=(o.g&&pe(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(y(o[g]))continue;var d=Bf(o[g]);const v=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const V=l[v]||[];l[v]=V,V.push(d)}Vf(l,function(g){return g.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Sr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Wu(o){this.za=0,this.i=[],this.j=new _r,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Sr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Sr("baseRetryDelayMs",5e3,o),this.Za=Sr("retryDelaySeedMs",1e4,o),this.Ta=Sr("forwardChannelMaxRetries",2,o),this.va=Sr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Cu(o&&o.concurrentRequestLimit),this.Ba=new Zf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Wu.prototype,r.ka=8,r.I=1,r.connect=function(o,l,d,g){kt(0),this.W=o,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=rc(this,null,this.W),Ds(this)};function ho(o){if(Hu(o),o.I==3){var l=o.V++,d=Wt(o.J);if(ot(d,"SID",o.M),ot(d,"RID",l),ot(d,"TYPE","terminate"),Vr(o,d),l=new fe(o,o.j,l),l.M=2,l.A=Vs(Wt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=sc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ss(l)}nc(o)}function xs(o){o.g&&(mo(o),o.g.cancel(),o.g=null)}function Hu(o){xs(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ns(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Ds(o){if(!xu(o.h)&&!o.m){o.m=!0;var l=o.Ea;X||p(),H||(X(),H=!0),T.add(l,o),o.D=0}}function rm(o,l){return Du(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=pr(h(o.Ea,o,l),ec(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new fe(this,this.j,o);let V=this.o;if(this.U&&(V?(V=au(V),cu(V,this.U)):V=this.U),this.u!==null||this.R||(v.J=V,V=null),this.S)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=Xu(this,v,l),d=Wt(this.J),ot(d,"RID",o),ot(d,"CVER",22),this.G&&ot(d,"X-HTTP-Session-Id",this.G),Vr(this,d),V&&(this.R?l="headers="+yr(Gu(V))+"&"+l:this.u&&lo(d,this.u,V)),ao(this.h,v),this.Ra&&ot(d,"TYPE","init"),this.S?(ot(d,"$req",l),ot(d,"SID","null"),v.U=!0,ro(v,d,null)):ro(v,d,l),this.I=2}}else this.I==3&&(o?Ju(this,o):this.i.length==0||xu(this.h)||Ju(this))};function Ju(o,l){var d;l?d=l.l:d=o.V++;const g=Wt(o.J);ot(g,"SID",o.M),ot(g,"RID",d),ot(g,"AID",o.K),Vr(o,g),o.u&&o.o&&lo(g,o.u,o.o),d=new fe(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Xu(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),ao(o.h,d),ro(d,g,l)}function Vr(o,l){o.H&&ws(o.H,function(d,g){ot(l,g,d)}),o.l&&ws({},function(d,g){ot(l,g,d)})}function Xu(o,l,d){d=Math.min(o.i.length,d);const g=o.l?h(o.l.Ka,o.l,o):null;t:{var v=o.i;let K=-1;for(;;){const yt=["count="+d];K==-1?d>0?(K=v[0].g,yt.push("ofs="+K)):K=0:yt.push("ofs="+K);let rt=!0;for(let Et=0;Et<d;Et++){var V=v[Et].g;const Ht=v[Et].map;if(V-=K,V<0)K=Math.max(0,v[Et].g-100),rt=!1;else try{V="req"+V+"_"||"";try{var F=Ht instanceof Map?Ht:Object.entries(Ht);for(const[$e,_e]of F){let ye=_e;u(_e)&&(ye=Yi(_e)),yt.push(V+$e+"="+encodeURIComponent(ye))}}catch($e){throw yt.push(V+"type="+encodeURIComponent("_badmap")),$e}}catch{g&&g(Ht)}}if(rt){F=yt.join("&");break t}}F=void 0}return o=o.i.splice(0,d),l.G=o,F}function Yu(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;X||p(),H||(X(),H=!0),T.add(l,o),o.A=0}}function fo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=pr(h(o.Da,o),ec(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,Zu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=pr(h(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,kt(10),xs(this),Zu(this))};function mo(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Zu(o){o.g=new fe(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=Wt(o.na);ot(l,"RID","rpc"),ot(l,"SID",o.M),ot(l,"AID",o.K),ot(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ot(l,"TO",o.ia),ot(l,"TYPE","xmlhttp"),Vr(o,l),o.u&&o.o&&lo(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Vs(Wt(l)),d.u=null,d.R=!0,Su(d,o)}r.Va=function(){this.C!=null&&(this.C=null,xs(this),fo(this),kt(19))};function Ns(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function tc(o,l){var d=null;if(o.g==l){Ns(o),mo(o),o.g=null;var g=2}else if(oo(o.h,l))d=l.G,Nu(o.h,l),g=1;else return;if(o.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var v=o.D;g=Rs(),Nt(g,new wu(g,d)),Ds(o)}else Yu(o);else if(v=l.m,v==3||v==0&&l.X>0||!(g==1&&rm(o,l)||g==2&&fo(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),v){case 1:Qe(o,5);break;case 4:Qe(o,10);break;case 3:Qe(o,6);break;default:Qe(o,2)}}}function ec(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function Qe(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),g=o.Ua;const v=!g;g=new me(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Tr(g,"https"),Vs(g),v?Xf(g.toString(),d):Yf(g.toString(),d)}else kt(2);o.I=0,o.l&&o.l.pa(l),nc(o),Hu(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),kt(2)):(this.j.info("Failed to ping google.com"),kt(1))};function nc(o){if(o.I=0,o.ja=[],o.l){const l=ku(o.h);(l.length!=0||o.i.length!=0)&&(N(o.ja,l),N(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function rc(o,l,d){var g=d instanceof me?Wt(d):new me(d);if(g.g!="")l&&(g.g=l+"."+g.g),Er(g,g.u);else{var v=a.location;g=v.protocol,l=l?l+"."+v.hostname:v.hostname,v=+v.port;const V=new me(null);g&&Tr(V,g),l&&(V.g=l),v&&Er(V,v),d&&(V.h=d),g=V}return d=o.G,l=o.wa,d&&l&&ot(g,d,l),ot(g,"VER",o.ka),Vr(o,g),g}function sc(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new dt(new co({ab:d})):new dt(o.ma),l.Fa(o.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function ic(){}r=ic.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ks(){}ks.prototype.g=function(o,l){return new qt(o,l)};function qt(o,l){Vt.call(this),this.g=new Wu(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!y(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new vn(this)}m(qt,Vt),qt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){ho(this.g)},qt.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=Yi(o),o=d);l.i.push(new Gf(l.Ya++,o)),l.I==3&&Ds(l)},qt.prototype.N=function(){this.g.l=null,delete this.j,ho(this.g),delete this.g,qt.Z.N.call(this)};function oc(o){Zi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){t:{for(const d in l){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}m(oc,Zi);function ac(){to.call(this),this.status=1}m(ac,to);function vn(o){this.g=o}m(vn,ic),vn.prototype.ra=function(){Nt(this.g,"a")},vn.prototype.qa=function(o){Nt(this.g,new oc(o))},vn.prototype.pa=function(o){Nt(this.g,new ac)},vn.prototype.oa=function(){Nt(this.g,"b")},ks.prototype.createWebChannel=ks.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,zl=function(){return new ks},Gl=function(){return Rs()},jl=Ge,Ro={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ps.NO_ERROR=0,Ps.TIMEOUT=8,Ps.HTTP_ERROR=6,zs=Ps,Au.COMPLETE="complete",Ul=Au,yu.EventType=mr,mr.OPEN="a",mr.CLOSE="b",mr.ERROR="c",mr.MESSAGE="d",Vt.prototype.listen=Vt.prototype.J,kr=yu,dt.prototype.listenOnce=dt.prototype.K,dt.prototype.getLastError=dt.prototype.Ha,dt.prototype.getLastErrorCode=dt.prototype.ya,dt.prototype.getStatus=dt.prototype.ca,dt.prototype.getResponseJson=dt.prototype.La,dt.prototype.getResponseText=dt.prototype.la,dt.prototype.send=dt.prototype.ea,dt.prototype.setWithCredentials=dt.prototype.Fa,Bl=dt}).apply(typeof Fs<"u"?Fs:typeof self<"u"?self:typeof window<"u"?window:{});const lc="@firebase/firestore",hc="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rr="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be=new im("@firebase/firestore");function xn(){return be.logLevel}function ay(r){be.setLogLevel(r)}function D(r,...t){if(be.logLevel<=ie.DEBUG){const e=t.map(ta);be.debug(`Firestore (${rr}): ${r}`,...e)}}function mt(r,...t){if(be.logLevel<=ie.ERROR){const e=t.map(ta);be.error(`Firestore (${rr}): ${r}`,...e)}}function Kt(r,...t){if(be.logLevel<=ie.WARN){const e=t.map(ta);be.warn(`Firestore (${rr}): ${r}`,...e)}}function ta(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(e){return JSON.stringify(e)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,Kl(r,n,e)}function Kl(r,t,e){let n=`FIRESTORE (${rr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw mt(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||Kl(t,s,n)}function uy(r,t){r||O(57014,t)}function M(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends sm{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _m{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(At.UNAUTHENTICATED)))}shutdown(){}}class ym{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class Im{constructor(t){this.t=t,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=c=>this.i!==n?(n=this.i,e(c)):Promise.resolve();let i=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new vt,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new vt)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new Ql(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new At(t)}}class Tm{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=At.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Em{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Tm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(At.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Po{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wm{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,pm(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>n(i)))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Po(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Po(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class cy{getToken(){return Promise.resolve(new Po(""))}invalidateToken(){}start(t,e){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Am(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Am(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function j(r,t){return r<t?-1:r>t?1:0}function So(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return po(s)===po(i)?j(s,i):po(s)?1:-1}return j(r.length,t.length)}const vm=55296,Rm=57343;function po(r){const t=r.charCodeAt(0);return t>=vm&&t<=Rm}function On(r,t,e){return r.length===t.length&&r.every(((n,s)=>e(n,t[s])))}function $l(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="__name__";class Jt{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Jt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Jt?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Jt.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return j(t.length,e.length)}static compareSegments(t,e){const n=Jt.isNumericId(t),s=Jt.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Jt.extractNumericId(t).compare(Jt.extractNumericId(e)):So(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Se.fromString(t.substring(4,t.length-2))}}class Q extends Jt{construct(t,e,n){return new Q(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new b(R.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((s=>s.length>0)))}return new Q(e)}static emptyPath(){return new Q([])}}const Pm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends Jt{construct(t,e,n){return new ct(t,e,n)}static isValidIdentifier(t){return Pm.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Vo}static keyField(){return new ct([Vo])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new b(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new b(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new b(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new b(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(t){this.path=t}static fromPath(t){return new k(Q.fromString(t))}static fromName(t){return new k(Q.fromString(t).popFirst(5))}static empty(){return new k(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Q.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Q.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new Q(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function na(r,t,e){if(!e)throw new b(R.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Sm(r,t,e,n){if(t===!0&&n===!0)throw new b(R.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function dc(r){if(!k.isDocumentKey(r))throw new b(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function fc(r){if(k.isDocumentKey(r))throw new b(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Wl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function _i(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function $(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new b(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=_i(r);throw new b(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function Hl(r,t){if(t<=0)throw new b(R.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(r,t){const e={typeString:r};return t&&(e.value=t),e}function pn(r,t){if(!Wl(r))throw new b(R.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new b(R.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mc=-62135596800,gc=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(t){return Z.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*gc);return new Z(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new b(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new b(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<mc)throw new b(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new b(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/gc}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(pn(t,Z._jsonSchema))return new Z(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-mc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:_t("string",Z._jsonSchemaVersion),seconds:_t("number"),nanoseconds:_t("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(t){return new q(t)}static min(){return new q(new Z(0,0))}static max(){return new q(new Z(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=-1;class qn{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function bo(r){return r.fields.find((t=>t.kind===2))}function He(r){return r.fields.filter((t=>t.kind!==2))}function Vm(r,t){let e=j(r.collectionGroup,t.collectionGroup);if(e!==0)return e;for(let n=0;n<Math.min(r.fields.length,t.fields.length);++n)if(e=bm(r.fields[n],t.fields[n]),e!==0)return e;return j(r.fields.length,t.fields.length)}qn.UNKNOWN_ID=-1;class nn{constructor(t,e){this.fieldPath=t,this.kind=e}}function bm(r,t){const e=ct.comparator(r.fieldPath,t.fieldPath);return e!==0?e:j(r.kind,t.kind)}class Bn{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new Bn(0,zt.min())}}function Jl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=q.fromTimestamp(n===1e9?new Z(e+1,0):new Z(e,n));return new zt(s,k.empty(),t)}function Xl(r){return new zt(r.readTime,r.key,Ln)}class zt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new zt(q.min(),k.empty(),Ln)}static max(){return new zt(q.max(),k.empty(),Ln)}}function ra(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:j(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fe(r){if(r.code!==R.FAILED_PRECONDITION||r.message!==Yl)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new A(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof A?e:A.resolve(e)}catch(e){return A.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):A.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):A.reject(e)}static resolve(t){return new A(((e,n)=>{e(t)}))}static reject(t){return new A(((e,n)=>{n(t)}))}static waitFor(t){return new A(((e,n)=>{let s=0,i=0,a=!1;t.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&e()}),(c=>n(c)))})),a=!0,i===s&&e()}))}static or(t){let e=A.resolve(!1);for(const n of t)e=e.next((s=>s?A.resolve(s):n()));return e}static forEach(t,e){const n=[];return t.forEach(((s,i)=>{n.push(e.call(this,s,i))})),this.waitFor(n)}static mapArray(t,e){return new A(((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;e(t[h]).next((f=>{a[h]=f,++u,u===i&&n(a)}),(f=>s(f)))}}))}static doWhile(t,e){return new A(((n,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt="SimpleDb";class yi{static open(t,e,n,s){try{return new yi(e,t.transaction(s,n))}catch(i){throw new Lr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new vt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new Lr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=sa(n.target.error);this.S.reject(new Lr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(D(Bt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new xm(e)}}class te{static delete(t){return D(Bt,"Removing database:",t),Xe(hm().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!dm())return!1;if(te.F())return!0;const t=ei(),e=te.M(t),n=0<e&&e<10,s=th(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,te.M(ei())===12.2&&mt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(D(Bt,"Opening database:",this.name),this.db=await new Promise(((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new Lr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new b(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new b(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Lr(t,a))},s.onupgradeneeded=i=>{D(Bt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next((()=>{D(Bt,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}$(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=yi.open(this.db,t,i?"readonly":"readwrite",n),c=s(u).next((h=>(u.C(),h))).catch((h=>(u.abort(h),A.reject(h)))).toPromise();return c.catch((()=>{})),await u.D,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&a<3;if(D(Bt,"Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function th(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class Cm{constructor(t){this.U=t,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(t){this.U=t}done(){this.K=!0}j(t){this.W=t}delete(){return Xe(this.U.delete())}}class Lr extends b{constructor(t,e){super(R.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Oe(r){return r.name==="IndexedDbTransactionError"}class xm{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(D(Bt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(D(Bt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Xe(n)}add(t){return D(Bt,"ADD",this.store.name,t,t),Xe(this.store.add(t))}get(t){return Xe(this.store.get(t)).next((e=>(e===void 0&&(e=null),D(Bt,"GET",this.store.name,t,e),e)))}delete(t){return D(Bt,"DELETE",this.store.name,t),Xe(this.store.delete(t))}count(){return D(Bt,"COUNT",this.store.name),Xe(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A(((a,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{a(c.target.result)}}))}{const i=this.cursor(n),a=[];return this.H(i,((u,c)=>{a.push(c)})).next((()=>a))}}Y(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A(((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}}))}Z(t,e){D(Bt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.X=!1;const s=this.cursor(n);return this.H(s,((i,a,u)=>u.delete()))}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new A(((n,s)=>{e.onerror=i=>{const a=sa(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next((u=>{u?a.continue():n()})):n()}}))}H(t,e){const n=[];return new A(((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const c=new Cm(u),h=e(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch((m=>(c.done(),A.reject(m))));n.push(f)}c.isDone?s():c.G===null?u.continue():u.continue(c.G)}})).next((()=>A.waitFor(n)))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.X?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Xe(r){return new A(((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=sa(n.target.error);e(s)}}))}let pc=!1;function sa(r){const t=te.M(ei());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new b("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return pc||(pc=!0,setTimeout((()=>{throw n}),0)),n}}return r}const qr="IndexBackfiller";class Dm{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){D(qr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,(async()=>{this.task=null;try{const e=await this.ne.ie();D(qr,`Documents written: ${e}`)}catch(e){Oe(e)?D(qr,"Ignoring IndexedDB error during index backfill: ",e):await Fe(e)}await this.re(6e4)}))}}class Nm{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(e=>this.se(e,t)))}se(t,e){const n=new Set;let s=e,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((a=>{if(a!==null&&!n.has(a))return D(qr,`Processing collection: ${a}`),this.oe(t,a,s).next((u=>{s-=u,n.add(a)}));i=!1})))).next((()=>e-s))}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next((s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next((i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next((()=>this._e(s,i))).next((u=>(D(qr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u)))).next((()=>a.size))}))))}_e(t,e){let n=t;return e.changes.forEach(((s,i)=>{const a=Xl(i);ra(a,n)>0&&(n=a)})),new zt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ft.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve=-1;function as(r){return r==null}function Qr(r){return r===0&&1/r==-1/0}function eh(r){return typeof r=="number"&&Number.isInteger(r)&&!Qr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni="";function xt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=_c(t)),t=km(r.get(e),t);return _c(t)}function km(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case ni:e+="";break;default:e+=i}}return e}function _c(r){return r+ni+""}function Yt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===ni&&r.charAt(1)==="",56145,{path:r}),Q.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(ni,i);switch((a<0||a>e)&&O(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:O(61167,{path:r})}i=a+2}return new Q(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="remoteDocuments",us="owner",Rn="owner",$r="mutationQueues",Mm="userId",Qt="mutations",yc="batchId",en="userMutationsIndex",Ic=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(r,t){return[r,xt(t)]}function nh(r,t,e){return[r,xt(t),e]}const Fm={},Un="documentMutations",ri="remoteDocumentsV14",Om=["prefixPath","collectionGroup","readTime","documentId"],Qs="documentKeyIndex",Lm=["prefixPath","collectionGroup","documentId"],rh="collectionGroupIndex",qm=["collectionGroup","readTime","prefixPath","documentId"],Wr="remoteDocumentGlobal",Co="remoteDocumentGlobalKey",jn="targets",sh="queryTargetsIndex",Bm=["canonicalId","targetId"],Gn="targetDocuments",Um=["targetId","path"],ia="documentTargetsIndex",jm=["path","targetId"],si="targetGlobalKey",rn="targetGlobal",Hr="collectionParents",Gm=["collectionId","parent"],zn="clientMetadata",zm="clientId",Ii="bundles",Km="bundleId",Ti="namedQueries",Qm="name",oa="indexConfiguration",$m="indexId",xo="collectionGroupIndex",Wm="collectionGroup",Br="indexState",Hm=["indexId","uid"],ih="sequenceNumberIndex",Jm=["uid","sequenceNumber"],Ur="indexEntries",Xm=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],oh="documentKeyIndex",Ym=["indexId","uid","orderedDocumentKey"],Ei="documentOverlays",Zm=["userId","collectionPath","documentId"],Do="collectionPathOverlayIndex",tg=["userId","collectionPath","largestBatchId"],ah="collectionGroupOverlayIndex",eg=["userId","collectionGroup","largestBatchId"],aa="globals",ng="name",uh=[$r,Qt,Un,Je,jn,us,rn,Gn,zn,Wr,Hr,Ii,Ti],rg=[...uh,Ei],ch=[$r,Qt,Un,ri,jn,us,rn,Gn,zn,Wr,Hr,Ii,Ti,Ei],lh=ch,ua=[...lh,oa,Br,Ur],sg=ua,hh=[...ua,aa],ig=hh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No extends Zl{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function Tt(r,t){const e=M(r);return te.O(e.le,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Le(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function dh(r,t){const e=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.push(t(r[n],n,r));return e}function fh(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t,e){this.comparator=t,this.root=e||Pt.EMPTY}insert(t,e){return new it(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Pt.BLACK,null,null))}remove(t){return new it(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Pt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Os(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Os(this.root,t,this.comparator,!1)}getReverseIterator(){return new Os(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Os(this.root,t,this.comparator,!0)}}class Os{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Pt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??Pt.RED,this.left=s??Pt.EMPTY,this.right=i??Pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Pt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Pt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Pt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}Pt.EMPTY=null,Pt.RED=!0,Pt.BLACK=!1;Pt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new Pt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t){this.comparator=t,this.data=new it(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ec(this.data.getIterator())}getIteratorFrom(t){return new Ec(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof et)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new et(this.comparator);return e.data=t,e}}class Ec{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Pn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new Ot([])}unionWith(t){let e=new et(ct.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Ot(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return On(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hy(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new mh("Invalid base64 string: "+i):i}})(t);return new ft(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new ft(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const og=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ae(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=og.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ue(r){return typeof r=="string"?ft.fromBase64String(r):ft.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="server_timestamp",ph="__type__",_h="__previous_value__",yh="__local_write_time__";function wi(r){return(r?.mapValue?.fields||{})[ph]?.stringValue===gh}function Ai(r){const t=r.mapValue.fields[_h];return wi(t)?Ai(t):t}function Jr(r){const t=ae(r.mapValue.fields[yh].timestampValue);return new Z(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(t,e,n,s,i,a,u,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f}}const Xr="(default)";class on{constructor(t,e){this.projectId=t,this.database=e||Xr}static empty(){return new on("","")}get isDefaultDatabase(){return this.database===Xr}isEqual(t){return t instanceof on&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ca="__type__",Ih="__max__",ve={mapValue:{fields:{__type__:{stringValue:Ih}}}},la="__vector__",Kn="value",$s={nullValue:"NULL_VALUE"};function Ce(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?wi(r)?4:Th(r)?9007199254740991:vi(r)?10:11:O(28295,{value:r})}function se(r,t){if(r===t)return!0;const e=Ce(r);if(e!==Ce(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Jr(r).isEqual(Jr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=ae(s.timestampValue),u=ae(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(s,i){return ue(s.bytesValue).isEqual(ue(i.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)})(r,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ut(s.doubleValue),u=ut(i.doubleValue);return a===u?Qr(a)===Qr(u):isNaN(a)&&isNaN(u)}return!1})(r,t);case 9:return On(r.arrayValue.values||[],t.arrayValue.values||[],se);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Tc(a)!==Tc(u))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(u[c]===void 0||!se(a[c],u[c])))return!1;return!0})(r,t);default:return O(52216,{left:r})}}function Yr(r,t){return(r.values||[]).find((e=>se(e,t)))!==void 0}function xe(r,t){if(r===t)return 0;const e=Ce(r),n=Ce(t);if(e!==n)return j(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(r.booleanValue,t.booleanValue);case 2:return(function(i,a){const u=ut(i.integerValue||i.doubleValue),c=ut(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(r,t);case 3:return wc(r.timestampValue,t.timestampValue);case 4:return wc(Jr(r),Jr(t));case 5:return So(r.stringValue,t.stringValue);case 6:return(function(i,a){const u=ue(i),c=ue(a);return u.compareTo(c)})(r.bytesValue,t.bytesValue);case 7:return(function(i,a){const u=i.split("/"),c=a.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=j(u[h],c[h]);if(f!==0)return f}return j(u.length,c.length)})(r.referenceValue,t.referenceValue);case 8:return(function(i,a){const u=j(ut(i.latitude),ut(a.latitude));return u!==0?u:j(ut(i.longitude),ut(a.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return Ac(r.arrayValue,t.arrayValue);case 10:return(function(i,a){const u=i.fields||{},c=a.fields||{},h=u[Kn]?.arrayValue,f=c[Kn]?.arrayValue,m=j(h?.values?.length||0,f?.values?.length||0);return m!==0?m:Ac(h,f)})(r.mapValue,t.mapValue);case 11:return(function(i,a){if(i===ve.mapValue&&a===ve.mapValue)return 0;if(i===ve.mapValue)return 1;if(a===ve.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const _=So(c[m],f[m]);if(_!==0)return _;const S=xe(u[c[m]],h[f[m]]);if(S!==0)return S}return j(c.length,f.length)})(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function wc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return j(r,t);const e=ae(r),n=ae(t),s=j(e.seconds,n.seconds);return s!==0?s:j(e.nanos,n.nanos)}function Ac(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=xe(e[s],n[s]);if(i)return i}return j(e.length,n.length)}function Qn(r){return ko(r)}function ko(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=ae(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return ue(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return k.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=ko(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${ko(e.fields[a])}`;return s+"}"})(r.mapValue):O(61005,{value:r})}function Ws(r){switch(Ce(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Ai(r);return t?16+Ws(t):16;case 5:return 2*r.stringValue.length;case 6:return ue(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Ws(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return Le(n.fields,((i,a)=>{s+=i.length+Ws(a)})),s})(r.mapValue);default:throw O(13486,{value:r})}}function an(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Mo(r){return!!r&&"integerValue"in r}function Zr(r){return!!r&&"arrayValue"in r}function vc(r){return!!r&&"nullValue"in r}function Rc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Hs(r){return!!r&&"mapValue"in r}function vi(r){return(r?.mapValue?.fields||{})[ca]?.stringValue===la}function jr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return Le(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=jr(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=jr(r.arrayValue.values[e]);return t}return{...r}}function Th(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Ih}const Eh={mapValue:{fields:{[ca]:{stringValue:la},[Kn]:{arrayValue:{}}}}};function ug(r){return"nullValue"in r?$s:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?an(on.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?vi(r)?Eh:{mapValue:{}}:O(35942,{value:r})}function cg(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?an(on.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Eh:"mapValue"in r?vi(r)?{mapValue:{}}:ve:O(61959,{value:r})}function Pc(r,t){const e=xe(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Sc(r,t){const e=xe(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.value=t}static empty(){return new St({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Hs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=jr(e)}setAll(t){let e=ct.emptyPath(),n={},s=[];t.forEach(((a,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=jr(a):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());Hs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return se(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Hs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Le(e,((s,i)=>t[s]=i));for(const s of n)delete t[s]}clone(){return new St(jr(this.value))}}function wh(r){const t=[];return Le(r.fields,((e,n)=>{const s=new ct([e]);if(Hs(n)){const i=wh(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Ot(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new at(t,0,q.min(),q.min(),q.min(),St.empty(),0)}static newFoundDocument(t,e,n,s){return new at(t,1,e,q.min(),n,s,0)}static newNoDocument(t,e){return new at(t,2,e,q.min(),q.min(),St.empty(),0)}static newUnknownDocument(t,e){return new at(t,3,e,q.min(),q.min(),St.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=St.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=St.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof at&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(t,e){this.position=t,this.inclusive=e}}function Vc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(a.referenceValue),e.key):n=xe(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function bc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!se(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(t,e="asc"){this.field=t,this.dir=e}}function lg(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{}class W extends Ah{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new hg(t,e,n):e==="array-contains"?new mg(t,n):e==="in"?new bh(t,n):e==="not-in"?new gg(t,n):e==="array-contains-any"?new pg(t,n):new W(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new dg(t,n):new fg(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(xe(e,this.value)):e!==null&&Ce(this.value)===Ce(e)&&this.matchesComparison(xe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends Ah{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new tt(t,e)}matches(t){return $n(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function $n(r){return r.op==="and"}function Fo(r){return r.op==="or"}function ha(r){return vh(r)&&$n(r)}function vh(r){for(const t of r.filters)if(t instanceof tt)return!1;return!0}function Oo(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+Qn(r.value);if(ha(r))return r.filters.map((t=>Oo(t))).join(",");{const t=r.filters.map((e=>Oo(e))).join(",");return`${r.op}(${t})`}}function Rh(r,t){return r instanceof W?(function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&se(n.value,s.value)})(r,t):r instanceof tt?(function(n,s){return s instanceof tt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,u)=>i&&Rh(a,s.filters[u])),!0):!1})(r,t):void O(19439)}function Ph(r,t){const e=r.filters.concat(t);return tt.create(e,r.op)}function Sh(r){return r instanceof W?(function(e){return`${e.field.canonicalString()} ${e.op} ${Qn(e.value)}`})(r):r instanceof tt?(function(e){return e.op.toString()+" {"+e.getFilters().map(Sh).join(" ,")+"}"})(r):"Filter"}class hg extends W{constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class dg extends W{constructor(t,e){super(t,"in",e),this.keys=Vh("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class fg extends W{constructor(t,e){super(t,"not-in",e),this.keys=Vh("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Vh(r,t){return(t.arrayValue?.values||[]).map((e=>k.fromName(e.referenceValue)))}class mg extends W{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Zr(e)&&Yr(e.arrayValue,this.value)}}class bh extends W{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Yr(this.value.arrayValue,e)}}class gg extends W{constructor(t,e){super(t,"not-in",e)}matches(t){if(Yr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Yr(this.value.arrayValue,e)}}class pg extends W{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Zr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>Yr(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function Lo(r,t=null,e=[],n=[],s=null,i=null,a=null){return new _g(r,t,e,n,s,i,a)}function un(r){const t=M(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>Oo(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),as(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>Qn(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>Qn(n))).join(",")),t.Te=e}return t.Te}function cs(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!lg(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Rh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!bc(r.startAt,t.startAt)&&bc(r.endAt,t.endAt)}function ii(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function oi(r,t){return r.filters.filter((e=>e instanceof W&&e.field.isEqual(t)))}function Cc(r,t,e){let n=$s,s=!0;for(const i of oi(r,t)){let a=$s,u=!0;switch(i.op){case"<":case"<=":a=ug(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=$s}Pc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Pc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function xc(r,t,e){let n=ve,s=!0;for(const i of oi(r,t)){let a=ve,u=!0;switch(i.op){case">=":case">":a=cg(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=ve}Sc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Sc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ch(r,t,e,n,s,i,a,u){return new ce(r,t,e,n,s,i,a,u)}function sr(r){return new ce(r)}function Dc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function da(r){return r.collectionGroup!==null}function Mn(r){const t=M(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new et(ct.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new ts(i,n))})),e.has(ct.keyField().canonicalString())||t.Ie.push(new ts(ct.keyField(),n))}return t.Ie}function Dt(r){const t=M(r);return t.Ee||(t.Ee=Dh(t,Mn(r))),t.Ee}function xh(r){const t=M(r);return t.de||(t.de=Dh(t,r.explicitOrderBy)),t.de}function Dh(r,t){if(r.limitType==="F")return Lo(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new ts(s.field,i)}));const e=r.endAt?new De(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new De(r.startAt.position,r.startAt.inclusive):null;return Lo(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function qo(r,t){const e=r.filters.concat([t]);return new ce(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function ai(r,t,e){return new ce(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function ls(r,t){return cs(Dt(r),Dt(t))&&r.limitType===t.limitType}function Nh(r){return`${un(Dt(r))}|lt:${r.limitType}`}function Dn(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((s=>Sh(s))).join(", ")}]`),as(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((s=>Qn(s))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((s=>Qn(s))).join(",")),`Target(${n})`})(Dt(r))}; limitType=${r.limitType})`}function hs(r,t){return t.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,t)&&(function(n,s){for(const i of Mn(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,t)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,t)&&(function(n,s){return!(n.startAt&&!(function(a,u,c){const h=Vc(a,u,c);return a.inclusive?h<=0:h<0})(n.startAt,Mn(n),s)||n.endAt&&!(function(a,u,c){const h=Vc(a,u,c);return a.inclusive?h>=0:h>0})(n.endAt,Mn(n),s))})(r,t)}function kh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Mh(r){return(t,e)=>{let n=!1;for(const s of Mn(r)){const i=yg(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function yg(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):(function(i,a,u){const c=a.data.field(i),h=u.data.field(i);return c!==null&&h!==null?xe(c,h):O(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Le(this.inner,((e,n)=>{for(const[s,i]of n)t(s,i)}))}isEmpty(){return fh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig=new it(k.comparator);function Lt(){return Ig}const Fh=new it(k.comparator);function Mr(...r){let t=Fh;for(const e of r)t=t.insert(e.key,e);return t}function Oh(r){let t=Fh;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Zt(){return Gr()}function Lh(){return Gr()}function Gr(){return new le((r=>r.toString()),((r,t)=>r.isEqual(t)))}const Tg=new it(k.comparator),Eg=new et(k.comparator);function z(...r){let t=Eg;for(const e of r)t=t.add(e);return t}const wg=new et(j);function fa(){return wg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qr(t)?"-0":t}}function qh(r){return{integerValue:""+r}}function Bh(r,t){return eh(t)?qh(t):ma(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(){this._=void 0}}function Ag(r,t,e){return r instanceof Wn?(function(s,i){const a={fields:{[ph]:{stringValue:gh},[yh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&wi(i)&&(i=Ai(i)),i&&(a.fields[_h]=i),{mapValue:a}})(e,t):r instanceof cn?jh(r,t):r instanceof ln?Gh(r,t):(function(s,i){const a=Uh(s,i),u=Nc(a)+Nc(s.Ae);return Mo(a)&&Mo(s.Ae)?qh(u):ma(s.serializer,u)})(r,t)}function vg(r,t,e){return r instanceof cn?jh(r,t):r instanceof ln?Gh(r,t):e}function Uh(r,t){return r instanceof Hn?(function(n){return Mo(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(t)?t:{integerValue:0}:null}class Wn extends Ri{}class cn extends Ri{constructor(t){super(),this.elements=t}}function jh(r,t){const e=zh(t);for(const n of r.elements)e.some((s=>se(s,n)))||e.push(n);return{arrayValue:{values:e}}}class ln extends Ri{constructor(t){super(),this.elements=t}}function Gh(r,t){let e=zh(t);for(const n of r.elements)e=e.filter((s=>!se(s,n)));return{arrayValue:{values:e}}}class Hn extends Ri{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Nc(r){return ut(r.integerValue||r.doubleValue)}function zh(r){return Zr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(t,e){this.field=t,this.transform=e}}function Rg(r,t){return r.field.isEqual(t.field)&&(function(n,s){return n instanceof cn&&s instanceof cn||n instanceof ln&&s instanceof ln?On(n.elements,s.elements,se):n instanceof Hn&&s instanceof Hn?se(n.Ae,s.Ae):n instanceof Wn&&s instanceof Wn})(r.transform,t.transform)}class Pg{constructor(t,e){this.version=t,this.transformResults=e}}class lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new lt}static exists(t){return new lt(void 0,t)}static updateTime(t){return new lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Js(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Pi{}function Kh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new or(r.key,lt.none()):new ir(r.key,r.data,lt.none());{const e=r.data,n=St.empty();let s=new et(ct.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new he(r.key,n,new Ot(s.toArray()),lt.none())}}function Sg(r,t,e){r instanceof ir?(function(s,i,a){const u=s.value.clone(),c=Mc(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,t,e):r instanceof he?(function(s,i,a){if(!Js(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=Mc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(Qh(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,t,e):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function zr(r,t,e,n){return r instanceof ir?(function(i,a,u,c){if(!Js(i.precondition,a))return u;const h=i.value.clone(),f=Fc(i.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(r,t,e,n):r instanceof he?(function(i,a,u,c){if(!Js(i.precondition,a))return u;const h=Fc(i.fieldTransforms,c,a),f=a.data;return f.setAll(Qh(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(r,t,e,n):(function(i,a,u){return Js(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,t,e)}function Vg(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Uh(n.transform,s||null);i!=null&&(e===null&&(e=St.empty()),e.set(n.field,i))}return e||null}function kc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&On(n,s,((i,a)=>Rg(i,a)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class ir extends Pi{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class he extends Pi{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Qh(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function Mc(r,t,e){const n=new Map;L(r.length===e.length,32656,{Re:e.length,Ve:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,vg(a,u,e[s]))}return n}function Fc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Ag(i,a,t))}return n}class or extends Pi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ga extends Pi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Sg(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=zr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=zr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Lh();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const c=Kh(a,u);c!==null&&n.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(q.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),z())}isEqual(t){return this.batchId===t.batchId&&On(this.mutations,t.mutations,((e,n)=>kc(e,n)))&&On(this.baseMutations,t.baseMutations,((e,n)=>kc(e,n)))}}class _a{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=(function(){return Tg})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new _a(t,e,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,J;function Wh(r){switch(r){case R.OK:return O(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function Hh(r){if(r===void 0)return mt("GRPC error has no .code"),R.UNKNOWN;switch(r){case pt.OK:return R.OK;case pt.CANCELLED:return R.CANCELLED;case pt.UNKNOWN:return R.UNKNOWN;case pt.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case pt.INTERNAL:return R.INTERNAL;case pt.UNAVAILABLE:return R.UNAVAILABLE;case pt.UNAUTHENTICATED:return R.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case pt.NOT_FOUND:return R.NOT_FOUND;case pt.ALREADY_EXISTS:return R.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return R.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case pt.ABORTED:return R.ABORTED;case pt.OUT_OF_RANGE:return R.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return R.UNIMPLEMENTED;case pt.DATA_LOSS:return R.DATA_LOSS;default:return O(39323,{code:r})}}(J=pt||(pt={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bo=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg=new Se([4294967295,4294967295],0);function Oc(r){const t=Jh().encode(r),e=new ql;return e.update(t),new Uint8Array(e.digest())}function Lc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Se([e,n],0),new Se([s,i],0)]}class Ia{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Fr(`Invalid padding: ${e}`);if(n<0)throw new Fr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Fr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Fr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Se.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(Se.fromNumber(n)));return s.compare(Cg)===1&&(s=new Se([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Oc(t),[n,s]=Lc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Ia(i,s,e);return n.forEach((u=>a.insert(u))),a}insert(t){if(this.ge===0)return;const e=Oc(t),[n,s]=Lc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Fr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,ms.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new fs(q.min(),s,new it(j),Lt(),z())}}class ms{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new ms(n,e,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class Xh{constructor(t,e){this.targetId=t,this.Ce=e}}class Yh{constructor(t,e,n=ft.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class qc{constructor(){this.ve=0,this.Fe=Bc(),this.Me=ft.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=z(),e=z(),n=z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:O(38017,{changeType:i})}})),new ms(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=Bc()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class xg{constructor(t){this.Ge=t,this.ze=new Map,this.je=Lt(),this.Je=Ls(),this.He=Ls(),this.Ye=new it(j)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,n=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(ii(i))if(n===0){const a=new k(i.path);this.et(e,a,at.newNoDocument(a,q.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this._t(e);if(a!==n){const u=this.ut(t),c=u?this.ct(u,t,a):1;if(c!==0){this.it(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}Bo?.lt((function(f,m,_,S,N){const C={localCacheCount:f,existenceFilterCount:m.count,databaseId:_.database,projectId:_.projectId},x=m.unchangedNames;return x&&(C.bloomFilter={applied:N===0,hashCount:x?.hashCount??0,bitmapLength:x?.bits?.bitmap?.length??0,padding:x?.bits?.padding??0,mightContain:B=>S?.mightContain(B)??!1}),C})(a,t.Ce,this.Ge.ht(),u,c))}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ue(n).toUint8Array()}catch(c){if(c instanceof mh)return Kt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Ia(a,s,i)}catch(c){return Kt(c instanceof Fr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach((i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,a)=>{const u=this.ot(a);if(u){if(i.current&&ii(u.target)){const c=new k(u.target.path);this.It(c).has(a)||this.Et(a,c)||this.et(a,c,at.newNoDocument(c,t))}i.Be&&(e.set(a,i.ke()),i.qe())}}));let n=z();this.He.forEach(((i,a)=>{let u=!0;a.forEachWhile((c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(t)));const s=new fs(t,e,this.Ye,this.je,n);return this.je=Lt(),this.Je=Ls(),this.He=Ls(),this.Ye=new it(j),s}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new qc,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new et(j),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new et(j),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new qc),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Ls(){return new it(k.comparator)}function Bc(){return new it(k.comparator)}const Dg={asc:"ASCENDING",desc:"DESCENDING"},Ng={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},kg={and:"AND",or:"OR"};class Mg{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Uo(r,t){return r.useProto3Json||as(t)?t:{value:t}}function Jn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Zh(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Fg(r,t){return Jn(r,t.toTimestamp())}function gt(r){return L(!!r,49232),q.fromTimestamp((function(e){const n=ae(e);return new Z(n.seconds,n.nanos)})(r))}function Ta(r,t){return jo(r,t).canonicalString()}function jo(r,t){const e=(function(s){return new Q(["projects",s.projectId,"databases",s.database])})(r).child("documents");return t===void 0?e:e.child(t)}function td(r){const t=Q.fromString(r);return L(cd(t),10190,{key:t.toString()}),t}function es(r,t){return Ta(r.databaseId,t.path)}function ee(r,t){const e=td(t);if(e.get(1)!==r.databaseId.projectId)throw new b(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new b(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(rd(e))}function ed(r,t){return Ta(r.databaseId,t)}function nd(r){const t=td(r);return t.length===4?Q.emptyPath():rd(t)}function Go(r){return new Q(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function rd(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Uc(r,t,e){return{name:es(r,t),fields:e.value.mapValue.fields}}function Si(r,t,e){const n=ee(r,t.name),s=gt(t.updateTime),i=t.createTime?gt(t.createTime):q.min(),a=new St({mapValue:{fields:t.fields}}),u=at.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function Og(r,t){return"found"in t?(function(n,s){L(!!s.found,43571),s.found.name,s.found.updateTime;const i=ee(n,s.found.name),a=gt(s.found.updateTime),u=s.found.createTime?gt(s.found.createTime):q.min(),c=new St({mapValue:{fields:s.found.fields}});return at.newFoundDocument(i,a,u,c)})(r,t):"missing"in t?(function(n,s){L(!!s.missing,3894),L(!!s.readTime,22933);const i=ee(n,s.missing),a=gt(s.readTime);return at.newNoDocument(i,a)})(r,t):O(7234,{result:t})}function Lg(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:O(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ft.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ft.fromUint8Array(f||new Uint8Array))})(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&(function(h){const f=h.code===void 0?R.UNKNOWN:Hh(h.code);return new b(f,h.message||"")})(a);e=new Yh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=ee(r,n.document.name),i=gt(n.document.updateTime),a=n.document.createTime?gt(n.document.createTime):q.min(),u=new St({mapValue:{fields:n.document.fields}}),c=at.newFoundDocument(s,i,a,u),h=n.targetIds||[],f=n.removedTargetIds||[];e=new Xs(h,f,c.key,c)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=ee(r,n.document),i=n.readTime?gt(n.readTime):q.min(),a=at.newNoDocument(s,i),u=n.removedTargetIds||[];e=new Xs([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=ee(r,n.document),i=n.removedTargetIds||[];e=new Xs([],i,s,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new bg(s,i),u=n.targetId;e=new Xh(u,a)}}return e}function ns(r,t){let e;if(t instanceof ir)e={update:Uc(r,t.key,t.value)};else if(t instanceof or)e={delete:es(r,t.key)};else if(t instanceof he)e={update:Uc(r,t.key,t.data),updateMask:zg(t.fieldMask)};else{if(!(t instanceof ga))return O(16599,{Vt:t.type});e={verify:es(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(i,a){const u=a.transform;if(u instanceof Wn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof cn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof ln)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Hn)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw O(20930,{transform:a.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Fg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:O(27497)})(r,t.precondition)),e}function zo(r,t){const e=t.currentDocument?(function(i){return i.updateTime!==void 0?lt.updateTime(gt(i.updateTime)):i.exists!==void 0?lt.exists(i.exists):lt.none()})(t.currentDocument):lt.none(),n=t.updateTransforms?t.updateTransforms.map((s=>(function(a,u){let c=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),c=new Wn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new cn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new ln(f)}else"increment"in u?c=new Hn(a,u.increment):O(16584,{proto:u});const h=ct.fromServerFormat(u.fieldPath);return new ds(h,c)})(r,s))):[];if(t.update){t.update.name;const s=ee(r,t.update.name),i=new St({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=(function(c){const h=c.fieldPaths||[];return new Ot(h.map((f=>ct.fromServerFormat(f))))})(t.updateMask);return new he(s,i,a,e,n)}return new ir(s,i,e,n)}if(t.delete){const s=ee(r,t.delete);return new or(s,e)}if(t.verify){const s=ee(r,t.verify);return new ga(s,e)}return O(1463,{proto:t})}function qg(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map((e=>(function(s,i){let a=s.updateTime?gt(s.updateTime):gt(i);return a.isEqual(q.min())&&(a=gt(i)),new Pg(a,s.transformResults||[])})(e,t)))):[]}function sd(r,t){return{documents:[ed(r,t.path)]}}function Vi(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=ed(r,s);const i=(function(h){if(h.length!==0)return ud(tt.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(_){return{field:we(_.field),direction:Ug(_.dir)}})(f)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Uo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function id(r,t,e,n){const{ft:s,parent:i}=Vi(r,t),a={},u=[];let c=0;return e.forEach((h=>{const f=n?h.alias:"aggregate_"+c++;a[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:we(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:we(h.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},gt:a,parent:i}}function od(r){let t=nd(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(m){const _=ad(m);return _ instanceof tt&&ha(_)?_.getFilters():[_]})(e.where));let a=[];e.orderBy&&(a=(function(m){return m.map((_=>(function(N){return new ts(Nn(N.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(_)))})(e.orderBy));let u=null;e.limit&&(u=(function(m){let _;return _=typeof m=="object"?m.value:m,as(_)?null:_})(e.limit));let c=null;e.startAt&&(c=(function(m){const _=!!m.before,S=m.values||[];return new De(S,_)})(e.startAt));let h=null;return e.endAt&&(h=(function(m){const _=!m.before,S=m.values||[];return new De(S,_)})(e.endAt)),Ch(t,s,a,i,u,"F",c,h)}function Bg(r,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ad(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Nn(e.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Nn(e.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Nn(e.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Nn(e.unaryFilter.field);return W.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}})(r):r.fieldFilter!==void 0?(function(e){return W.create(Nn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return tt.create(e.compositeFilter.filters.map((n=>ad(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}})(e.compositeFilter.op))})(r):O(30097,{filter:r})}function Ug(r){return Dg[r]}function jg(r){return Ng[r]}function Gg(r){return kg[r]}function we(r){return{fieldPath:r.canonicalString()}}function Nn(r){return ct.fromServerFormat(r.fieldPath)}function ud(r){return r instanceof W?(function(e){if(e.op==="=="){if(Rc(e.value))return{unaryFilter:{field:we(e.field),op:"IS_NAN"}};if(vc(e.value))return{unaryFilter:{field:we(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Rc(e.value))return{unaryFilter:{field:we(e.field),op:"IS_NOT_NAN"}};if(vc(e.value))return{unaryFilter:{field:we(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:we(e.field),op:jg(e.op),value:e.value}}})(r):r instanceof tt?(function(e){const n=e.getFilters().map((s=>ud(s)));return n.length===1?n[0]:{compositeFilter:{op:Gg(e.op),filters:n}}})(r):O(54877,{filter:r})}function zg(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function cd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(t,e,n,s,i=q.min(),a=q.min(),u=ft.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new oe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(t){this.yt=t}}function Kg(r,t){let e;if(t.document)e=Si(r.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=k.fromSegments(t.noDocument.path),s=dn(t.noDocument.readTime);e=at.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return O(56709);{const n=k.fromSegments(t.unknownDocument.path),s=dn(t.unknownDocument.version);e=at.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime((function(s){const i=new Z(s[0],s[1]);return q.fromTimestamp(i)})(t.readTime)),e}function jc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:ui(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=(function(i,a){return{name:es(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Jn(i,a.version.toTimestamp()),createTime:Jn(i,a.createTime.toTimestamp())}})(r.yt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:hn(t.version)};else{if(!t.isUnknownDocument())return O(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:hn(t.version)}}return n}function ui(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function hn(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function dn(r){const t=new Z(r.seconds,r.nanoseconds);return q.fromTimestamp(t)}function Ye(r,t){const e=(t.baseMutations||[]).map((i=>zo(r.yt,i)));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map((i=>zo(r.yt,i))),s=Z.fromMillis(t.localWriteTimeMs);return new pa(t.batchId,s,e,n)}function Or(r){const t=dn(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?dn(r.lastLimboFreeSnapshotVersion):q.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),Dt(sr(nd(i.documents[0])))})(r.query):(function(i){return Dt(od(i))})(r.query),new oe(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ft.fromBase64String(r.resumeToken))}function hd(r,t){const e=hn(t.snapshotVersion),n=hn(t.lastLimboFreeSnapshotVersion);let s;s=ii(t.target)?sd(r.yt,t.target):Vi(r.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:un(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function bi(r){const t=od({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ai(t,t.limit,"L"):t}function _o(r,t){return new ya(t.largestBatchId,zo(r.yt,t.overlayMutation))}function Gc(r,t){const e=t.path.lastSegment();return[r,xt(t.path.popLast()),e]}function zc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:hn(n.readTime),documentKey:xt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{getBundleMetadata(t,e){return Kc(t).get(e).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:dn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(t,e){return Kc(t).put((function(s){return{bundleId:s.id,createTime:hn(gt(s.createTime)),version:s.version}})(e))}getNamedQuery(t,e){return Qc(t).get(e).next((n=>{if(n)return(function(i){return{name:i.name,query:bi(i.bundledQuery),readTime:dn(i.readTime)}})(n)}))}saveNamedQuery(t,e){return Qc(t).put((function(s){return{name:s.name,readTime:hn(gt(s.readTime)),bundledQuery:s.bundledQuery}})(e))}}function Kc(r){return Tt(r,Ii)}function Qc(r){return Tt(r,Ti)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(t,e){this.serializer=t,this.userId=e}static wt(t,e){const n=e.uid||"";return new Ci(t,n)}getOverlay(t,e){return br(t).get(Gc(this.userId,e)).next((n=>n?_o(this.serializer,n):null))}getOverlays(t,e){const n=Zt();return A.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){const s=[];return n.forEach(((i,a)=>{const u=new ya(e,a);s.push(this.St(t,u))})),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach((a=>s.add(xt(a.getCollectionPath()))));const i=[];return s.forEach((a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(br(t).Z(Do,u))})),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Zt(),i=xt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return br(t).J(Do,a).next((u=>{for(const c of u){const h=_o(this.serializer,c);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(t,e,n,s){const i=Zt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return br(t).ee({index:ah,range:u},((c,h,f)=>{const m=_o(this.serializer,h);i.size()<s||m.largestBatchId===a?(i.set(m.getKey(),m),a=m.largestBatchId):f.done()})).next((()=>i))}St(t,e){return br(t).put((function(s,i,a){const[u,c,h]=Gc(i,a.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:ns(s.yt,a.mutation)}})(this.serializer,this.userId,e))}}function br(r){return Tt(r,Ei)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{bt(t){return Tt(t,aa)}getSessionToken(t){return this.bt(t).get("sessionToken").next((e=>{const n=e?.value;return n?ft.fromUint8Array(n):ft.EMPTY_BYTE_STRING}))}setSessionToken(t,e){return this.bt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(){}Dt(t,e){this.Ct(t,e),e.vt()}Ct(t,e){if("nullValue"in t)this.Ft(e,5);else if("booleanValue"in t)this.Ft(e,10),e.Mt(t.booleanValue?1:0);else if("integerValue"in t)this.Ft(e,15),e.Mt(ut(t.integerValue));else if("doubleValue"in t){const n=ut(t.doubleValue);isNaN(n)?this.Ft(e,13):(this.Ft(e,15),Qr(n)?e.Mt(0):e.Mt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ft(e,20),typeof n=="string"&&(n=ae(n)),e.xt(`${n.seconds||""}`),e.Mt(n.nanos||0)}else if("stringValue"in t)this.Ot(t.stringValue,e),this.Nt(e);else if("bytesValue"in t)this.Ft(e,30),e.Bt(ue(t.bytesValue)),this.Nt(e);else if("referenceValue"in t)this.Lt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ft(e,45),e.Mt(n.latitude||0),e.Mt(n.longitude||0)}else"mapValue"in t?Th(t)?this.Ft(e,Number.MAX_SAFE_INTEGER):vi(t)?this.kt(t.mapValue,e):(this.qt(t.mapValue,e),this.Nt(e)):"arrayValue"in t?(this.Qt(t.arrayValue,e),this.Nt(e)):O(19022,{$t:t})}Ot(t,e){this.Ft(e,25),this.Ut(t,e)}Ut(t,e){e.xt(t)}qt(t,e){const n=t.fields||{};this.Ft(e,55);for(const s of Object.keys(n))this.Ot(s,e),this.Ct(n[s],e)}kt(t,e){const n=t.fields||{};this.Ft(e,53);const s=Kn,i=n[s].arrayValue?.values?.length||0;this.Ft(e,15),e.Mt(ut(i)),this.Ot(s,e),this.Ct(n[s],e)}Qt(t,e){const n=t.values||[];this.Ft(e,50);for(const s of n)this.Ct(s,e)}Lt(t,e){this.Ft(e,37),k.fromName(t).path.forEach((n=>{this.Ft(e,60),this.Ut(n,e)}))}Ft(t,e){t.Mt(e)}Nt(t){t.Mt(2)}}Ze.Kt=new Ze;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=255;function Wg(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function $c(r){const t=64-(function(n){let s=0;for(let i=0;i<8;++i){const a=Wg(255&n[i]);if(s+=a,a!==8)break}return s})(r);return Math.ceil(t/8)}class Hg{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Gt(n.value),n=e.next();this.zt()}jt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Jt(n.value),n=e.next();this.Ht()}Yt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=e.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=e.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(t){const e=this.en(t),n=$c(e);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}nn(t){const e=this.en(t),n=$c(e);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}rn(){this.sn(Sn),this.sn(255)}_n(){this.an(Sn),this.an(255)}reset(){this.position=0}seed(t){this.tn(t.length),this.buffer.set(t,this.position),this.position+=t.length}un(){return this.buffer.slice(0,this.position)}en(t){const e=(function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)})(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Gt(t){const e=255&t;e===0?(this.sn(0),this.sn(255)):e===Sn?(this.sn(Sn),this.sn(0)):this.sn(e)}Jt(t){const e=255&t;e===0?(this.an(0),this.an(255)):e===Sn?(this.an(Sn),this.an(0)):this.an(t)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(t){this.tn(1),this.buffer[this.position++]=t}an(t){this.tn(1),this.buffer[this.position++]=~t}tn(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Jg{constructor(t){this.cn=t}Bt(t){this.cn.Wt(t)}xt(t){this.cn.Yt(t)}Mt(t){this.cn.Xt(t)}vt(){this.cn.rn()}}class Xg{constructor(t){this.cn=t}Bt(t){this.cn.jt(t)}xt(t){this.cn.Zt(t)}Mt(t){this.cn.nn(t)}vt(){this.cn._n()}}class Cr{constructor(){this.cn=new Hg,this.ln=new Jg(this.cn),this.hn=new Xg(this.cn)}seed(t){this.cn.seed(t)}Pn(t){return t===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(t,e,n,s){this.Tn=t,this.In=e,this.En=n,this.dn=s}An(){const t=this.dn.length,e=t===0||this.dn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.dn,0),e!==t?n.set([0],this.dn.length):++n[n.length-1],new tn(this.Tn,this.In,this.En,n)}Rn(t,e,n){return{indexId:this.Tn,uid:t,arrayValue:Ys(this.En),directionalValue:Ys(this.dn),orderedDocumentKey:Ys(e),documentKey:n.path.toArray()}}Vn(t,e,n){const s=this.Rn(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Ie(r,t){let e=r.Tn-t.Tn;return e!==0?e:(e=Wc(r.En,t.En),e!==0?e:(e=Wc(r.dn,t.dn),e!==0?e:k.comparator(r.In,t.In)))}function Wc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function Ys(r){return Ll()?(function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n})(r):r}function Hc(r){return typeof r!="string"?r:(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(r)}class Jc{constructor(t){this.mn=new et(((e,n)=>ct.comparator(e.field,n.field))),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.fn=t.orderBy,this.gn=[];for(const e of t.filters){const n=e;n.isInequality()?this.mn=this.mn.add(n):this.gn.push(n)}}get pn(){return this.mn.size>1}yn(t){if(L(t.collectionGroup===this.collectionId,49279),this.pn)return!1;const e=bo(t);if(e!==void 0&&!this.wn(e))return!1;const n=He(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.wn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.mn.size>0){const u=this.mn.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.Sn(u,c)||!this.bn(this.fn[a++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.fn.length||!this.bn(this.fn[a++],u))return!1}return!0}Dn(){if(this.pn)return null;let t=new et(ct.comparator);const e=[];for(const n of this.gn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new nn(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new nn(n.field,0))}for(const n of this.fn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new nn(n.field,n.dir==="asc"?0:1)));return new qn(qn.UNKNOWN_ID,this.collectionId,e,Bn.empty())}wn(t){for(const e of this.gn)if(this.Sn(e,t))return!0;return!1}Sn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}bn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(r){if(L(r instanceof W||r instanceof tt,20012),r instanceof W){if(r instanceof bh){const e=r.value.arrayValue?.values?.map((n=>W.create(r.field,"==",n)))||[];return tt.create(e,"or")}return r}const t=r.filters.map((e=>dd(e)));return tt.create(t,r.op)}function Yg(r){if(r.getFilters().length===0)return[];const t=$o(dd(r));return L(fd(t),7391),Ko(t)||Qo(t)?[t]:t.getFilters()}function Ko(r){return r instanceof W}function Qo(r){return r instanceof tt&&ha(r)}function fd(r){return Ko(r)||Qo(r)||(function(e){if(e instanceof tt&&Fo(e)){for(const n of e.getFilters())if(!Ko(n)&&!Qo(n))return!1;return!0}return!1})(r)}function $o(r){if(L(r instanceof W||r instanceof tt,34018),r instanceof W)return r;if(r.filters.length===1)return $o(r.filters[0]);const t=r.filters.map((n=>$o(n)));let e=tt.create(t,r.op);return e=ci(e),fd(e)?e:(L(e instanceof tt,64498),L($n(e),40251),L(e.filters.length>1,57927),e.filters.reduce(((n,s)=>Ea(n,s))))}function Ea(r,t){let e;return L(r instanceof W||r instanceof tt,38388),L(t instanceof W||t instanceof tt,25473),e=r instanceof W?t instanceof W?(function(s,i){return tt.create([s,i],"and")})(r,t):Xc(r,t):t instanceof W?Xc(t,r):(function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),$n(s)&&$n(i))return Ph(s,i.getFilters());const a=Fo(s)?s:i,u=Fo(s)?i:s,c=a.filters.map((h=>Ea(h,u)));return tt.create(c,"or")})(r,t),ci(e)}function Xc(r,t){if($n(t))return Ph(t,r.getFilters());{const e=t.filters.map((n=>Ea(r,n)));return tt.create(e,"or")}}function ci(r){if(L(r instanceof W||r instanceof tt,11850),r instanceof W)return r;const t=r.getFilters();if(t.length===1)return ci(t[0]);if(vh(r))return r;const e=t.map((s=>ci(s))),n=[];return e.forEach((s=>{s instanceof W?n.push(s):s instanceof tt&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:tt.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(){this.Cn=new wa}addToCollectionParentIndex(t,e){return this.Cn.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(zt.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(zt.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class wa{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new et(Q.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new et(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yc="IndexedDbIndexManager",qs=new Uint8Array(0);class tp{constructor(t,e){this.databaseId=e,this.vn=new wa,this.Fn=new le((n=>un(n)),((n,s)=>cs(n,s))),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.vn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener((()=>{this.vn.add(e)}));const i={collectionId:n,parent:xt(s)};return Zc(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[$l(e),""],!1,!0);return Zc(t).J(s).next((i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Yt(a.parent))}return n}))}addFieldIndex(t,e){const n=xr(t),s=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=bn(t);return i.next((u=>{a.put(zc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))}))}return i.next()}deleteFieldIndex(t,e){const n=xr(t),s=bn(t),i=Vn(t);return n.delete(e.indexId).next((()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))))}deleteAllFieldIndexes(t){const e=xr(t),n=Vn(t),s=bn(t);return e.Z().next((()=>n.Z())).next((()=>s.Z()))}createTargetIndexes(t,e){return A.forEach(this.Mn(e),(n=>this.getIndexType(t,n).next((s=>{if(s===0||s===1){const i=new Jc(n).Dn();if(i!=null)return this.addFieldIndex(t,i)}}))))}getDocumentsMatchingTarget(t,e){const n=Vn(t);let s=!0;const i=new Map;return A.forEach(this.Mn(e),(a=>this.xn(t,a).next((u=>{s&&(s=!!u),i.set(a,u)})))).next((()=>{if(s){let a=z();const u=[];return A.forEach(i,((c,h)=>{D(Yc,`Using index ${(function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map((Y=>`${Y.fieldPath}:${Y.kind}`)).join(",")}`})(c)} to execute ${un(e)}`);const f=(function(U,Y){const X=bo(Y);if(X===void 0)return null;for(const H of oi(U,X.fieldPath))switch(H.op){case"array-contains-any":return H.value.arrayValue.values||[];case"array-contains":return[H.value]}return null})(h,c),m=(function(U,Y){const X=new Map;for(const H of He(Y))for(const T of oi(U,H.fieldPath))switch(T.op){case"==":case"in":X.set(H.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return X.set(H.fieldPath.canonicalString(),T.value),Array.from(X.values())}return null})(h,c),_=(function(U,Y){const X=[];let H=!0;for(const T of He(Y)){const p=T.kind===0?Cc(U,T.fieldPath,U.startAt):xc(U,T.fieldPath,U.startAt);X.push(p.value),H&&(H=p.inclusive)}return new De(X,H)})(h,c),S=(function(U,Y){const X=[];let H=!0;for(const T of He(Y)){const p=T.kind===0?xc(U,T.fieldPath,U.endAt):Cc(U,T.fieldPath,U.endAt);X.push(p.value),H&&(H=p.inclusive)}return new De(X,H)})(h,c),N=this.On(c,h,_),C=this.On(c,h,S),x=this.Nn(c,h,m),B=this.Bn(c.indexId,f,N,_.inclusive,C,S.inclusive,x);return A.forEach(B,(G=>n.Y(G,e.limit).next((U=>{U.forEach((Y=>{const X=k.fromSegments(Y.documentKey);a.has(X)||(a=a.add(X),u.push(X))}))}))))})).next((()=>u))}return A.resolve(null)}))}Mn(t){let e=this.Fn.get(t);return e||(t.filters.length===0?e=[t]:e=Yg(tt.create(t.filters,"and")).map((n=>Lo(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt))),this.Fn.set(t,e),e)}Bn(t,e,n,s,i,a,u){const c=(e!=null?e.length:1)*Math.max(n.length,i.length),h=c/(e!=null?e.length:1),f=[];for(let m=0;m<c;++m){const _=e?this.Ln(e[m/h]):qs,S=this.kn(t,_,n[m%h],s),N=this.qn(t,_,i[m%h],a),C=u.map((x=>this.kn(t,_,x,!0)));f.push(...this.createRange(S,N,C))}return f}kn(t,e,n,s){const i=new tn(t,k.empty(),e,n);return s?i:i.An()}qn(t,e,n,s){const i=new tn(t,k.empty(),e,n);return s?i.An():i}xn(t,e){const n=new Jc(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next((i=>{let a=null;for(const u of i)n.yn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a}))}getIndexType(t,e){let n=2;const s=this.Mn(e);return A.forEach(s,(i=>this.xn(t,i).next((a=>{a?n!==0&&a.fields.length<(function(c){let h=new et(ct.comparator),f=!1;for(const m of c.filters)for(const _ of m.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(e)&&s.length>1&&n===2?1:n))}Qn(t,e){const n=new Cr;for(const s of He(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.Pn(s.kind);Ze.Kt.Dt(i,a)}return n.un()}Ln(t){const e=new Cr;return Ze.Kt.Dt(t,e.Pn(0)),e.un()}$n(t,e){const n=new Cr;return Ze.Kt.Dt(an(this.databaseId,e),n.Pn((function(i){const a=He(i);return a.length===0?0:a[a.length-1].kind})(t))),n.un()}Nn(t,e,n){if(n===null)return[];let s=[];s.push(new Cr);let i=0;for(const a of He(t)){const u=n[i++];for(const c of s)if(this.Un(e,a.fieldPath)&&Zr(u))s=this.Kn(s,a,u);else{const h=c.Pn(a.kind);Ze.Kt.Dt(u,h)}}return this.Wn(s)}On(t,e,n){return this.Nn(t,e,n.position)}Wn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].un();return e}Kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const c=new Cr;c.seed(u.un()),Ze.Kt.Dt(a,c.Pn(e.kind)),i.push(c)}return i}Un(t,e){return!!t.filters.find((n=>n instanceof W&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(t,e){const n=xr(t),s=bn(t);return(e?n.J(xo,IDBKeyRange.bound(e,e)):n.J()).next((i=>{const a=[];return A.forEach(i,(u=>s.get([u.indexId,this.uid]).next((c=>{a.push((function(f,m){const _=m?new Bn(m.sequenceNumber,new zt(dn(m.readTime),new k(Yt(m.documentKey)),m.largestBatchId)):Bn.empty(),S=f.fields.map((([N,C])=>new nn(ct.fromServerFormat(N),C)));return new qn(f.indexId,f.collectionGroup,S,_)})(u,c))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next((e=>e.length===0?null:(e.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:j(n.collectionGroup,s.collectionGroup)})),e[0].collectionGroup)))}updateCollectionGroup(t,e,n){const s=xr(t),i=bn(t);return this.Gn(t).next((a=>s.J(xo,IDBKeyRange.bound(e,e)).next((u=>A.forEach(u,(c=>i.put(zc(c.indexId,this.uid,a,n))))))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,((s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next((u=>(n.set(s.collectionGroup,u),A.forEach(u,(c=>this.zn(t,s,c).next((h=>{const f=this.jn(i,c);return h.isEqual(f)?A.resolve():this.Jn(t,i,c,h,f)})))))))}))}Hn(t,e,n,s){return Vn(t).put(s.Rn(this.uid,this.$n(n,e.key),e.key))}Yn(t,e,n,s){return Vn(t).delete(s.Vn(this.uid,this.$n(n,e.key),e.key))}zn(t,e,n){const s=Vn(t);let i=new et(Ie);return s.ee({index:oh,range:IDBKeyRange.only([n.indexId,this.uid,Ys(this.$n(n,e))])},((a,u)=>{i=i.add(new tn(n.indexId,e,Hc(u.arrayValue),Hc(u.directionalValue)))})).next((()=>i))}jn(t,e){let n=new et(Ie);const s=this.Qn(e,t);if(s==null)return n;const i=bo(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Zr(a))for(const u of a.arrayValue.values||[])n=n.add(new tn(e.indexId,t.key,this.Ln(u),s))}else n=n.add(new tn(e.indexId,t.key,qs,s));return n}Jn(t,e,n,s,i){D(Yc,"Updating index entries for document '%s'",e.key);const a=[];return(function(c,h,f,m,_){const S=c.getIterator(),N=h.getIterator();let C=Pn(S),x=Pn(N);for(;C||x;){let B=!1,G=!1;if(C&&x){const U=f(C,x);U<0?G=!0:U>0&&(B=!0)}else C!=null?G=!0:B=!0;B?(m(x),x=Pn(N)):G?(_(C),C=Pn(S)):(C=Pn(S),x=Pn(N))}})(s,i,Ie,(u=>{a.push(this.Hn(t,e,n,u))}),(u=>{a.push(this.Yn(t,e,n,u))})),A.waitFor(a)}Gn(t){let e=1;return bn(t).ee({index:ih,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),e=s.sequenceNumber+1})).next((()=>e))}createRange(t,e,n){n=n.sort(((a,u)=>Ie(a,u))).filter(((a,u,c)=>!u||Ie(a,c[u-1])!==0));const s=[];s.push(t);for(const a of n){const u=Ie(a,t),c=Ie(a,e);if(u===0)s[0]=t.An();else if(u>0&&c<0)s.push(a),s.push(a.An());else if(c>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Zn(s[a],s[a+1]))return[];const u=s[a].Vn(this.uid,qs,k.empty()),c=s[a+1].Vn(this.uid,qs,k.empty());i.push(IDBKeyRange.bound(u,c))}return i}Zn(t,e){return Ie(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(tl)}getMinOffset(t,e){return A.mapArray(this.Mn(e),(n=>this.xn(t,n).next((s=>s||O(44426))))).next(tl)}}function Zc(r){return Tt(r,Hr)}function Vn(r){return Tt(r,Ur)}function xr(r){return Tt(r,oa)}function bn(r){return Tt(r,Br)}function tl(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ra(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new zt(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},md=41943040;class Ct{static withCacheSize(t){return new Ct(t,Ct.DEFAULT_COLLECTION_PERCENTILE,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(r,t,e){const n=r.store(Qt),s=r.store(Un),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const c=n.ee({range:a},((f,m,_)=>(u++,_.delete())));i.push(c.next((()=>{L(u===1,47070,{batchId:e.batchId})})));const h=[];for(const f of e.mutations){const m=nh(t,f.key.path,e.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next((()=>h))}function li(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw O(14731);t=r.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ct.DEFAULT_COLLECTION_PERCENTILE=10,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ct.DEFAULT=new Ct(md,Ct.DEFAULT_COLLECTION_PERCENTILE,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ct.DISABLED=new Ct(-1,0,0);class xi{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Xn={}}static wt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new xi(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Te(t).ee({index:en,range:n},((s,i,a)=>{e=!1,a.done()})).next((()=>e))}addMutationBatch(t,e,n,s){const i=kn(t),a=Te(t);return a.add({}).next((u=>{L(typeof u=="number",49019);const c=new pa(u,e,n,s),h=(function(S,N,C){const x=C.baseMutations.map((G=>ns(S.yt,G))),B=C.mutations.map((G=>ns(S.yt,G)));return{userId:N,batchId:C.batchId,localWriteTimeMs:C.localWriteTime.toMillis(),baseMutations:x,mutations:B}})(this.serializer,this.userId,c),f=[];let m=new et(((_,S)=>j(_.canonicalString(),S.canonicalString())));for(const _ of s){const S=nh(this.userId,_.key.path,u);m=m.add(_.key.path.popLast()),f.push(a.put(h)),f.push(i.put(S,Fm))}return m.forEach((_=>{f.push(this.indexManager.addToCollectionParentIndex(t,_))})),t.addOnCommittedListener((()=>{this.Xn[u]=c.keys()})),A.waitFor(f).next((()=>c))}))}lookupMutationBatch(t,e){return Te(t).get(e).next((n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Ye(this.serializer,n)):null))}er(t,e){return this.Xn[e]?A.resolve(this.Xn[e]):this.lookupMutationBatch(t,e).next((n=>{if(n){const s=n.keys();return this.Xn[e]=s,s}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Te(t).ee({index:en,range:s},((a,u,c)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{tr:n}),i=Ye(this.serializer,u)),c.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Ve;return Te(t).ee({index:en,range:e,reverse:!0},((s,i,a)=>{n=i.batchId,a.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,Ve],[this.userId,Number.POSITIVE_INFINITY]);return Te(t).J(en,e).next((n=>n.map((s=>Ye(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Ks(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return kn(t).ee({range:s},((a,u,c)=>{const[h,f,m]=a,_=Yt(f);if(h===this.userId&&e.path.isEqual(_))return Te(t).get(m).next((S=>{if(!S)throw O(61480,{nr:a,batchId:m});L(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:m}),i.push(Ye(this.serializer,S))}));c.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(j);const s=[];return e.forEach((i=>{const a=Ks(this.userId,i.path),u=IDBKeyRange.lowerBound(a),c=kn(t).ee({range:u},((h,f,m)=>{const[_,S,N]=h,C=Yt(S);_===this.userId&&i.path.isEqual(C)?n=n.add(N):m.done()}));s.push(c)})),A.waitFor(s).next((()=>this.rr(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Ks(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new et(j);return kn(t).ee({range:a},((c,h,f)=>{const[m,_,S]=c,N=Yt(_);m===this.userId&&n.isPrefixOf(N)?N.length===s&&(u=u.add(S)):f.done()})).next((()=>this.rr(t,u)))}rr(t,e){const n=[],s=[];return e.forEach((i=>{s.push(Te(t).get(i).next((a=>{if(a===null)throw O(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Ye(this.serializer,a))})))})),A.waitFor(s).next((()=>n))}removeMutationBatch(t,e){return gd(t.le,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.ir(e.batchId)})),A.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))))}ir(t){delete this.Xn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),s=[];return kn(t).ee({range:n},((i,a,u)=>{if(i[0]===this.userId){const c=Yt(i[1]);s.push(c)}else u.done()})).next((()=>{L(s.length===0,56720,{sr:s.map((i=>i.canonicalString()))})}))}))}containsKey(t,e){return pd(t,this.userId,e)}_r(t){return _d(t).get(this.userId).next((e=>e||{userId:this.userId,lastAcknowledgedBatchId:Ve,lastStreamToken:""}))}}function pd(r,t,e){const n=Ks(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return kn(r).ee({range:i,X:!0},((u,c,h)=>{const[f,m,_]=u;f===t&&m===s&&(a=!0),h.done()})).next((()=>a))}function Te(r){return Tt(r,Qt)}function kn(r){return Tt(r,Un)}function _d(r){return Tt(r,$r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new fn(0)}static cr(){return new fn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.lr(t).next((e=>{const n=new fn(e.highestTargetId);return e.highestTargetId=n.next(),this.hr(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.lr(t).next((e=>q.fromTimestamp(new Z(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.lr(t).next((e=>e.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.lr(t).next((s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.hr(t,s))))}addTargetData(t,e){return this.Pr(t,e).next((()=>this.lr(t).next((n=>(n.targetCount+=1,this.Tr(e,n),this.hr(t,n))))))}updateTargetData(t,e){return this.Pr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>Cn(t).delete(e.targetId))).next((()=>this.lr(t))).next((n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.hr(t,n))))}removeTargets(t,e,n){let s=0;const i=[];return Cn(t).ee(((a,u)=>{const c=Or(u);c.sequenceNumber<=e&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(t,c)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(t,e){return Cn(t).ee(((n,s)=>{const i=Or(s);e(i)}))}lr(t){return nl(t).get(si).next((e=>(L(e!==null,2888),e)))}hr(t,e){return nl(t).put(si,e)}Pr(t,e){return Cn(t).put(hd(this.serializer,e))}Tr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.lr(t).next((e=>e.targetCount))}getTargetData(t,e){const n=un(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Cn(t).ee({range:s,index:sh},((a,u,c)=>{const h=Or(u);cs(e,h.target)&&(i=h,c.done())})).next((()=>i))}addMatchingKeys(t,e,n){const s=[],i=Ae(t);return e.forEach((a=>{const u=xt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))})),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=Ae(t);return A.forEach(e,(i=>{const a=xt(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])}))}removeMatchingKeysForTargetId(t,e){const n=Ae(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=Ae(t);let i=z();return s.ee({range:n,X:!0},((a,u,c)=>{const h=Yt(a[1]),f=new k(h);i=i.add(f)})).next((()=>i))}containsKey(t,e){const n=xt(e.path),s=IDBKeyRange.bound([n],[$l(n)],!1,!0);let i=0;return Ae(t).ee({index:ia,X:!0,range:s},(([a,u],c,h)=>{a!==0&&(i++,h.done())})).next((()=>i>0))}At(t,e){return Cn(t).get(e).next((n=>n?Or(n):null))}}function Cn(r){return Tt(r,jn)}function nl(r){return Tt(r,rn)}function Ae(r){return Tt(r,Gn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl="LruGarbageCollector",yd=1048576;function sl([r,t],[e,n]){const s=j(r,e);return s===0?j(t,n):s}class np{constructor(t){this.Ir=t,this.buffer=new et(sl),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();sl(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Id{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){D(rl,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Oe(e)?D(rl,"Ignoring IndexedDB error during garbage collection: ",e):await Fe(e)}await this.Vr(3e5)}))}}class rp{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Ft.ce);const n=new np(e);return this.mr.forEachTarget(t,(s=>n.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>n.Ar(s))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(el)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),el):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,s,i,a,u,c,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(t,s)))).next((m=>(n=m,u=Date.now(),this.removeTargets(t,n,e)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(t,n)))).next((m=>(h=Date.now(),xn()<=ie.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Td(r,t){return new rp(r,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(t,e){this.db=t,this.garbageCollector=Td(this,e)}gr(t){const e=this.wr(t);return this.db.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}wr(t){let e=0;return this.pr(t,(n=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}pr(t,e){return this.Sr(t,((n,s)=>e(s)))}addReference(t,e,n){return Bs(t,n)}removeReference(t,e,n){return Bs(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Bs(t,e)}br(t,e){return(function(s,i){let a=!1;return _d(s).te((u=>pd(s,u,i).next((c=>(c&&(a=!0),A.resolve(!c)))))).next((()=>a))})(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(t,((a,u)=>{if(u<=e){const c=this.br(t,a).next((h=>{if(!h)return i++,n.getEntry(t,a).next((()=>(n.removeEntry(a,q.min()),Ae(t).delete((function(m){return[0,xt(m.path)]})(a)))))}));s.push(c)}})).next((()=>A.waitFor(s))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Bs(t,e)}Sr(t,e){const n=Ae(t);let s,i=Ft.ce;return n.ee({index:ia},(([a,u],{path:c,sequenceNumber:h})=>{a===0?(i!==Ft.ce&&e(new k(Yt(s)),i),i=h,s=c):i=Ft.ce})).next((()=>{i!==Ft.ce&&e(new k(Yt(s)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Bs(r,t){return Ae(r).put((function(n,s){return{targetId:0,path:xt(n.path),sequenceNumber:s}})(t,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(){this.changes=new le((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,at.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return We(t).put(n)}removeEntry(t,e,n){return We(t).delete((function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],ui(a),u[u.length-1]]})(e,n))}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.Dr(t,n))))}getEntry(t,e){let n=at.newInvalidDocument(e);return We(t).ee({index:Qs,range:IDBKeyRange.only(Dr(e))},((s,i)=>{n=this.Cr(e,i)})).next((()=>n))}vr(t,e){let n={size:0,document:at.newInvalidDocument(e)};return We(t).ee({index:Qs,range:IDBKeyRange.only(Dr(e))},((s,i)=>{n={document:this.Cr(e,i),size:li(i)}})).next((()=>n))}getEntries(t,e){let n=Lt();return this.Fr(t,e,((s,i)=>{const a=this.Cr(s,i);n=n.insert(s,a)})).next((()=>n))}Mr(t,e){let n=Lt(),s=new it(k.comparator);return this.Fr(t,e,((i,a)=>{const u=this.Cr(i,a);n=n.insert(i,u),s=s.insert(i,li(a))})).next((()=>({documents:n,Or:s})))}Fr(t,e,n){if(e.isEmpty())return A.resolve();let s=new et(al);e.forEach((c=>s=s.add(c)));const i=IDBKeyRange.bound(Dr(s.first()),Dr(s.last())),a=s.getIterator();let u=a.getNext();return We(t).ee({index:Qs,range:i},((c,h,f)=>{const m=k.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&al(u,m)<0;)n(u,null),u=a.getNext();u&&u.isEqual(m)&&(n(u,h),u=a.hasNext()?a.getNext():null),u?f.j(Dr(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),ui(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return We(t).J(IDBKeyRange.bound(u,c,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=Lt();for(const m of h){const _=this.Cr(k.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);_.isFoundDocument()&&(hs(e,_)||s.has(_.key))&&(f=f.insert(_.key,_))}return f}))}getAllFromCollectionGroup(t,e,n,s){let i=Lt();const a=ol(e,n),u=ol(e,zt.max());return We(t).ee({index:rh,range:IDBKeyRange.bound(a,u,!0)},((c,h,f)=>{const m=this.Cr(k.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(t){return new op(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((e=>e.byteSize))}getMetadata(t){return il(t).get(Co).next((e=>(L(!!e,20021),e)))}Dr(t,e){return il(t).put(Co,e)}Cr(t,e){if(e){const n=Kg(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return at.newInvalidDocument(t)}}function wd(r){return new ip(r)}class op extends Ed{constructor(t,e){super(),this.Nr=t,this.trackRemovals=e,this.Br=new le((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(t){const e=[];let n=0,s=new et(((i,a)=>j(i.canonicalString(),a.canonicalString())));return this.changes.forEach(((i,a)=>{const u=this.Br.get(i);if(e.push(this.Nr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const c=jc(this.Nr.serializer,a);s=s.add(i.path.popLast());const h=li(c);n+=h-u.size,e.push(this.Nr.addEntry(t,i,c))}else if(n-=u.size,this.trackRemovals){const c=jc(this.Nr.serializer,a.convertToNoDocument(q.min()));e.push(this.Nr.addEntry(t,i,c))}})),s.forEach((i=>{e.push(this.Nr.indexManager.addToCollectionParentIndex(t,i))})),e.push(this.Nr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.Nr.vr(t,e).next((n=>(this.Br.set(e,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(t,e){return this.Nr.Mr(t,e).next((({documents:n,Or:s})=>(s.forEach(((i,a)=>{this.Br.set(i,{size:a,readTime:n.get(i).readTime})})),n)))}}function il(r){return Tt(r,Wr)}function We(r){return Tt(r,ri)}function Dr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function ol(r,t){const e=t.documentKey.path.toArray();return[r,ui(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function al(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=j(e[i],n[i]),s)return s;return s=j(e.length,n.length),s||(s=j(e[e.length-2],n[n.length-2]),s||j(e[e.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(n=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(n!==null&&zr(n.mutation,s,Ot.empty(),Z.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,z()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=z()){const s=Zt();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,n).next((i=>{let a=Mr();return i.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const n=Zt();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,z())))}populateOverlays(t,e,n){const s=[];return n.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,u)=>{e.set(a,u)}))}))}computeViews(t,e,n,s){let i=Lt();const a=Gr(),u=(function(){return Gr()})();return e.forEach(((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof he)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),zr(f.mutation,h,f.mutation.getFieldMask(),Z.now())):a.set(h.key,Ot.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((h,f)=>a.set(h,f))),e.forEach(((h,f)=>u.set(h,new ap(f,a.get(h)??null)))),u)))}recalculateAndSaveOverlays(t,e){const n=Gr();let s=new it(((a,u)=>a-u)),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const u of a)u.keys().forEach((c=>{const h=e.get(c);if(h===null)return;let f=n.get(c)||Ot.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(s.get(u.batchId)||z()).add(c);s=s.insert(u.batchId,m)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=Lh();f.forEach((_=>{if(!i.has(_)){const S=Kh(e.get(_),n.get(_));S!==null&&m.set(_,S),i=i.add(_)}})),a.push(this.documentOverlayCache.saveOverlays(t,h,m))}return A.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,s){return(function(a){return k.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):da(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Zt());let u=Ln,c=i;return a.next((h=>A.forEach(h,((f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next((_=>{c=c.insert(f,_)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,c,h,z()))).next((f=>({batchId:u,changes:Oh(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next((n=>{let s=Mr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=Mr();return this.indexManager.getCollectionParents(t,i).next((u=>A.forEach(u,(c=>{const h=(function(m,_){return new ce(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next((f=>{f.forEach(((m,_)=>{a=a.insert(m,_)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s)))).next((a=>{i.forEach(((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,at.newInvalidDocument(f)))}));let u=Mr();return a.forEach(((c,h)=>{const f=i.get(c);f!==void 0&&zr(f.mutation,h,Ot.empty(),Z.now()),hs(e,h)&&(u=u.insert(c,h))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return A.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:gt(s.createTime)}})(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:bi(s.bundledQuery),readTime:gt(s.readTime)}})(e)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(){this.overlays=new it(k.comparator),this.qr=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Zt();return A.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((s,i)=>{this.St(t,e,i)})),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Zt(),i=e.length+1,a=new k(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new it(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Zt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Zt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,f)=>u.set(h,f))),!(u.size()>=s)););return A.resolve(u)}St(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new ya(e,n));let i=this.qr.get(e);i===void 0&&(i=z(),this.qr.set(e,i)),this.qr.set(e,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(){this.Qr=new et(wt.$r),this.Ur=new et(wt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new wt(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Gr(new wt(t,e))}zr(t,e){t.forEach((n=>this.removeReference(n,e)))}jr(t){const e=new k(new Q([])),n=new wt(e,t),s=new wt(e,t+1),i=[];return this.Ur.forEachInRange([n,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new k(new Q([])),n=new wt(e,t),s=new wt(e,t+1);let i=z();return this.Ur.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const e=new wt(t,0),n=this.Qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class wt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return k.comparator(t.key,e.key)||j(t.Yr,e.Yr)}static Kr(t,e){return j(t.Yr,e.Yr)||k.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new et(wt.$r)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new pa(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Zr=this.Zr.add(new wt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.ei(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Ve:this.tr-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new wt(e,0),s=new wt(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],(a=>{const u=this.Xr(a.Yr);i.push(u)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(j);return e.forEach((s=>{const i=new wt(s,0),a=new wt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(u=>{n=n.add(u.Yr)}))})),A.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const a=new wt(new k(i),0);let u=new et(j);return this.Zr.forEachWhile((c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.Yr)),!0)}),a),A.resolve(this.ti(u))}ti(t){const e=[];return t.forEach((n=>{const s=this.Xr(n);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){L(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return A.forEach(e.mutations,(s=>{const i=new wt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=n}))}ir(t){}containsKey(t,e){const n=new wt(e,0),s=this.Zr.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(t){this.ri=t,this.docs=(function(){return new it(k.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():at.newInvalidDocument(e))}getEntries(t,e){let n=Lt();return e.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():at.newInvalidDocument(s))})),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Lt();const a=e.path,u=new k(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||ra(Xl(f),n)<=0||(s.has(f.key)||hs(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){O(9500)}ii(t,e){return A.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new fp(this)}getSize(t){return A.resolve(this.size)}}class fp extends Ed{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(n)})),A.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(t){this.persistence=t,this.si=new le((e=>un(e)),cs),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.oi=0,this._i=new Aa,this.targetCount=0,this.ai=fn.ur()}forEachTarget(t,e){return this.si.forEach(((n,s)=>e(s))),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),A.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new fn(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.Pr(e),A.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.si.forEach(((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),A.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(t,e){this.ui={},this.overlays={},this.ci=new Ft(0),this.li=!1,this.li=!0,this.hi=new lp,this.referenceDelegate=t(this),this.Pi=new mp(this),this.indexManager=new Zg,this.remoteDocumentCache=(function(s){return new dp(s)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new ld(e),this.Ii=new up(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new cp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new hp(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){D("MemoryPersistence","Starting transaction:",t);const s=new gp(this.ci.next());return this.referenceDelegate.Ei(),n(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return A.or(Object.values(this.ui).map((n=>()=>n.containsKey(t,e))))}}class gp extends Zl{constructor(t){super(),this.currentSequenceNumber=t}}class Di{constructor(t){this.persistence=t,this.Ri=new Aa,this.Vi=null}static mi(t){return new Di(t)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.fi.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.fi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),A.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>n.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.fi,(n=>{const s=k.fromPath(n);return this.gi(t,s).next((i=>{i||e.removeEntry(s,q.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((n=>{n?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return A.or([()=>A.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class hi{constructor(t,e){this.persistence=t,this.pi=new le((n=>xt(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Td(this,e)}static mi(t,e){return new hi(t,e)}Ei(){}di(t){return A.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}wr(t){let e=0;return this.pr(t,(n=>{e++})).next((()=>e))}pr(t,e){return A.forEach(this.pi,((n,s)=>this.br(t,n,s).next((i=>i?A.resolve():e(s)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(a=>this.br(t,a,e).next((u=>{u||(n++,i.removeEntry(a,q.min()))})))).next((()=>i.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),A.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),A.resolve()}removeReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),A.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),A.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ws(t.data.value)),e}br(t,e,n){return A.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(t){this.serializer=t}k(t,e,n,s){const i=new yi("createOrUpgrade",e);n<1&&s>=1&&((function(c){c.createObjectStore(us)})(t),(function(c){c.createObjectStore($r,{keyPath:Mm}),c.createObjectStore(Qt,{keyPath:yc,autoIncrement:!0}).createIndex(en,Ic,{unique:!0}),c.createObjectStore(Un)})(t),ul(t),(function(c){c.createObjectStore(Je)})(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&((function(c){c.deleteObjectStore(Gn),c.deleteObjectStore(jn),c.deleteObjectStore(rn)})(t),ul(t)),a=a.next((()=>(function(c){const h=c.store(rn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put(si,f)})(i)))),n<4&&s>=4&&(n!==0&&(a=a.next((()=>(function(c,h){return h.store(Qt).J().next((m=>{c.deleteObjectStore(Qt),c.createObjectStore(Qt,{keyPath:yc,autoIncrement:!0}).createIndex(en,Ic,{unique:!0});const _=h.store(Qt),S=m.map((N=>_.put(N)));return A.waitFor(S)}))})(t,i)))),a=a.next((()=>{(function(c){c.createObjectStore(zn,{keyPath:zm})})(t)}))),n<5&&s>=5&&(a=a.next((()=>this.yi(i)))),n<6&&s>=6&&(a=a.next((()=>((function(c){c.createObjectStore(Wr)})(t),this.wi(i))))),n<7&&s>=7&&(a=a.next((()=>this.Si(i)))),n<8&&s>=8&&(a=a.next((()=>this.bi(t,i)))),n<9&&s>=9&&(a=a.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(t)}))),n<10&&s>=10&&(a=a.next((()=>this.Di(i)))),n<11&&s>=11&&(a=a.next((()=>{(function(c){c.createObjectStore(Ii,{keyPath:Km})})(t),(function(c){c.createObjectStore(Ti,{keyPath:Qm})})(t)}))),n<12&&s>=12&&(a=a.next((()=>{(function(c){const h=c.createObjectStore(Ei,{keyPath:Zm});h.createIndex(Do,tg,{unique:!1}),h.createIndex(ah,eg,{unique:!1})})(t)}))),n<13&&s>=13&&(a=a.next((()=>(function(c){const h=c.createObjectStore(ri,{keyPath:Om});h.createIndex(Qs,Lm),h.createIndex(rh,qm)})(t))).next((()=>this.Ci(t,i))).next((()=>t.deleteObjectStore(Je)))),n<14&&s>=14&&(a=a.next((()=>this.Fi(t,i)))),n<15&&s>=15&&(a=a.next((()=>(function(c){c.createObjectStore(oa,{keyPath:$m,autoIncrement:!0}).createIndex(xo,Wm,{unique:!1}),c.createObjectStore(Br,{keyPath:Hm}).createIndex(ih,Jm,{unique:!1}),c.createObjectStore(Ur,{keyPath:Xm}).createIndex(oh,Ym,{unique:!1})})(t)))),n<16&&s>=16&&(a=a.next((()=>{e.objectStore(Br).clear()})).next((()=>{e.objectStore(Ur).clear()}))),n<17&&s>=17&&(a=a.next((()=>{(function(c){c.createObjectStore(aa,{keyPath:ng})})(t)}))),n<18&&s>=18&&Ll()&&(a=a.next((()=>{e.objectStore(Br).clear()})).next((()=>{e.objectStore(Ur).clear()}))),a}wi(t){let e=0;return t.store(Je).ee(((n,s)=>{e+=li(s)})).next((()=>{const n={byteSize:e};return t.store(Wr).put(Co,n)}))}yi(t){const e=t.store($r),n=t.store(Qt);return e.J().next((s=>A.forEach(s,(i=>{const a=IDBKeyRange.bound([i.userId,Ve],[i.userId,i.lastAcknowledgedBatchId]);return n.J(en,a).next((u=>A.forEach(u,(c=>{L(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const h=Ye(this.serializer,c);return gd(t,i.userId,h).next((()=>{}))}))))}))))}Si(t){const e=t.store(Gn),n=t.store(Je);return t.store(rn).get(si).next((s=>{const i=[];return n.ee(((a,u)=>{const c=new Q(a),h=(function(m){return[0,xt(m)]})(c);i.push(e.get(h).next((f=>f?A.resolve():(m=>e.put({targetId:0,path:xt(m),sequenceNumber:s.highestListenSequenceNumber}))(c))))})).next((()=>A.waitFor(i)))}))}bi(t,e){t.createObjectStore(Hr,{keyPath:Gm});const n=e.store(Hr),s=new wa,i=a=>{if(s.add(a)){const u=a.lastSegment(),c=a.popLast();return n.put({collectionId:u,parent:xt(c)})}};return e.store(Je).ee({X:!0},((a,u)=>{const c=new Q(a);return i(c.popLast())})).next((()=>e.store(Un).ee({X:!0},(([a,u,c],h)=>{const f=Yt(u);return i(f.popLast())}))))}Di(t){const e=t.store(jn);return e.ee(((n,s)=>{const i=Or(s),a=hd(this.serializer,i);return e.put(a)}))}Ci(t,e){const n=e.store(Je),s=[];return n.ee(((i,a)=>{const u=e.store(ri),c=(function(m){return m.document?new k(Q.fromString(m.document.name).popFirst(5)):m.noDocument?k.fromSegments(m.noDocument.path):m.unknownDocument?k.fromSegments(m.unknownDocument.path):O(36783)})(a).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(h))})).next((()=>A.waitFor(s)))}Fi(t,e){const n=e.store(Qt),s=wd(this.serializer),i=new va(Di.mi,this.serializer.yt);return n.J().next((a=>{const u=new Map;return a.forEach((c=>{let h=u.get(c.userId)??z();Ye(this.serializer,c).keys().forEach((f=>h=h.add(f))),u.set(c.userId,h)})),A.forEach(u,((c,h)=>{const f=new At(h),m=Ci.wt(this.serializer,f),_=i.getIndexManager(f),S=xi.wt(f,this.serializer,_,i.referenceDelegate);return new Ad(s,S,m,_).recalculateAndSaveOverlaysForDocumentKeys(new No(e,Ft.ce),c).next()}))}))}}function ul(r){r.createObjectStore(Gn,{keyPath:Um}).createIndex(ia,jm,{unique:!0}),r.createObjectStore(jn,{keyPath:"targetId"}).createIndex(sh,Bm,{unique:!0}),r.createObjectStore(rn)}const Ee="IndexedDbPersistence",yo=18e5,Io=5e3,To="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",vd="main";class Ra{constructor(t,e,n,s,i,a,u,c,h,f,m=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Mi=i,this.window=a,this.document=u,this.xi=h,this.Oi=f,this.Ni=m,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=_=>Promise.resolve(),!Ra.v())throw new b(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new sp(this,s),this.$i=e+vd,this.serializer=new ld(c),this.Ui=new te(this.$i,this.Ni,new pp(this.serializer)),this.hi=new $g,this.Pi=new ep(this.referenceDelegate,this.serializer),this.remoteDocumentCache=wd(this.serializer),this.Ii=new Qg,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&mt(Ee,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new b(R.FAILED_PRECONDITION,To);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Pi.getHighestSequenceNumber(t)))})).then((t=>{this.ci=new Ft(t,this.xi)})).then((()=>{this.li=!0})).catch((t=>(this.Ui&&this.Ui.close(),Promise.reject(t))))}Ji(t){return this.Qi=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ui.$((async e=>{e.newVersion===null&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Mi.enqueueAndForget((async()=>{this.started&&await this.Wi()})))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Us(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.Hi(t).next((e=>{e||(this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))))}))})).next((()=>this.Yi(t))).next((e=>this.isPrimary&&!e?this.Zi(t).next((()=>!1)):!!e&&this.Xi(t).next((()=>!0)))))).catch((t=>{if(Oe(t))return D(Ee,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return D(Ee,"Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Mi.enqueueRetryable((()=>this.Qi(t))),this.isPrimary=t}))}Hi(t){return Nr(t).get(Rn).next((e=>A.resolve(this.es(e))))}ts(t){return Us(t).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,yo)){this.qi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(e=>{const n=Tt(e,zn);return n.J().next((s=>{const i=this.ss(s,yo),a=s.filter((u=>i.indexOf(u)===-1));return A.forEach(a,(u=>n.delete(u.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Ki)for(const e of t)this.Ki.removeItem(this._s(e.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Wi().then((()=>this.ns())).then((()=>this.ji()))))}es(t){return!!t&&t.ownerId===this.clientId}Yi(t){return this.Oi?A.resolve(!0):Nr(t).get(Rn).next((e=>{if(e!==null&&this.rs(e.leaseTimestampMs,Io)&&!this.us(e.ownerId)){if(this.es(e)&&this.networkEnabled)return!0;if(!this.es(e)){if(!e.allowTabSynchronization)throw new b(R.FAILED_PRECONDITION,To);return!1}}return!(!this.networkEnabled||!this.inForeground)||Us(t).J().next((n=>this.ss(n,Io).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1}))===void 0))})).next((e=>(this.isPrimary!==e&&D(Ee,`Client ${e?"is":"is not"} eligible for a primary lease.`),e)))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[us,zn],(t=>{const e=new No(t,Ft.ce);return this.Zi(e).next((()=>this.ts(e)))})),this.Ui.close(),this.Ps()}ss(t,e){return t.filter((n=>this.rs(n.updateTimeMs,e)&&!this.us(n.clientId)))}Ts(){return this.runTransaction("getActiveClients","readonly",(t=>Us(t).J().next((e=>this.ss(e,yo).map((n=>n.clientId))))))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(t,e){return xi.wt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new tp(t,this.serializer.yt.databaseId)}getDocumentOverlayCache(t){return Ci.wt(this.serializer,t)}getBundleCache(){return this.Ii}runTransaction(t,e,n){D(Ee,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=(function(c){return c===18?ig:c===17?hh:c===16?sg:c===15?ua:c===14?lh:c===13?ch:c===12?rg:c===11?uh:void O(60245)})(this.Ni);let a;return this.Ui.runTransaction(t,s,i,(u=>(a=new No(u,this.ci?this.ci.next():Ft.ce),e==="readwrite-primary"?this.Hi(a).next((c=>!!c||this.Yi(a))).next((c=>{if(!c)throw mt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))),new b(R.FAILED_PRECONDITION,Yl);return n(a)})).next((c=>this.Xi(a).next((()=>c)))):this.Is(a).next((()=>n(a)))))).then((u=>(a.raiseOnCommittedEvent(),u)))}Is(t){return Nr(t).get(Rn).next((e=>{if(e!==null&&this.rs(e.leaseTimestampMs,Io)&&!this.us(e.ownerId)&&!this.es(e)&&!(this.Oi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new b(R.FAILED_PRECONDITION,To)}))}Xi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Nr(t).put(Rn,e)}static v(){return te.v()}Zi(t){const e=Nr(t);return e.get(Rn).next((n=>this.es(n)?(D(Ee,"Releasing primary lease."),e.delete(Rn)):A.resolve()))}rs(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(mt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi())))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){typeof this.window?.addEventListener=="function"&&(this.Bi=()=>{this.cs();const t=/(?:Version|Mobile)\/1[456]/;Ol()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(t){try{const e=this.Ki?.getItem(this._s(t))!==null;return D(Ee,`Client '${t}' ${e?"is":"is not"} zombied in LocalStorage`),e}catch(e){return mt(Ee,"Failed to get zombied client id.",e),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(t){mt("Failed to set zombie client id.",t)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Nr(r){return Tt(r,us)}function Us(r){return Tt(r,zn)}function Pa(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Es=n,this.ds=s}static As(t,e){let n=z(),s=z();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Sa(t,e.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Ol()?8:th(ei())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.ys(t,e).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(t,e,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new _p;return this.Ss(t,e,a).next((u=>{if(i.result=u,this.Vs)return this.bs(t,e,a,u.size)}))})).next((()=>i.result))}bs(t,e,n,s){return n.documentReadCount<this.fs?(xn()<=ie.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Dn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),A.resolve()):(xn()<=ie.DEBUG&&D("QueryEngine","Query:",Dn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(xn()<=ie.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Dn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Dt(e))):A.resolve())}ys(t,e){if(Dc(e))return A.resolve(null);let n=Dt(e);return this.indexManager.getIndexType(t,n).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=ai(e,null,"F"),n=Dt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((i=>{const a=z(...i);return this.ps.getDocuments(t,a).next((u=>this.indexManager.getMinOffset(t,n).next((c=>{const h=this.Ds(e,u);return this.Cs(e,h,a,c.readTime)?this.ys(t,ai(e,null,"F")):this.vs(t,h,e,c)}))))})))))}ws(t,e,n,s){return Dc(e)||s.isEqual(q.min())?A.resolve(null):this.ps.getDocuments(t,n).next((i=>{const a=this.Ds(e,i);return this.Cs(e,a,n,s)?A.resolve(null):(xn()<=ie.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dn(e)),this.vs(t,a,e,Jl(s,Ln)).next((u=>u)))}))}Ds(t,e){let n=new et(Mh(t));return e.forEach(((s,i)=>{hs(t,i)&&(n=n.add(i))})),n}Cs(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,n){return xn()<=ie.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Dn(e)),this.ps.getDocumentsMatchingQuery(t,e,zt.min(),n)}vs(t,e,n,s){return this.ps.getDocumentsMatchingQuery(t,n,s).next((i=>(e.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="LocalStore",yp=3e8;class Ip{constructor(t,e,n,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new it(j),this.xs=new le((i=>un(i)),cs),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Ad(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function Pd(r,t,e,n){return new Ip(r,t,e,n)}async function Sd(r,t){const e=M(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(n)))).next((i=>{const a=[],u=[];let c=z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return e.localDocuments.getDocuments(n,c).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:u})))}))}))}function Tp(r,t){const e=M(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,f){const m=h.batch,_=m.keys();let S=A.resolve();return _.forEach((N=>{S=S.next((()=>f.getEntry(c,N))).next((C=>{const x=h.docVersions.get(N);L(x!==null,48541),C.version.compareTo(x)<0&&(m.applyToRemoteDocument(C,h),C.isValidDocument()&&(C.setReadTime(h.commitVersion),f.addEntry(C)))}))})),S.next((()=>u.mutationQueue.removeMutationBatch(c,m)))})(e,n,t,i).next((()=>i.apply(n))).next((()=>e.mutationQueue.performConsistencyCheck(n))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=z();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(t)))).next((()=>e.localDocuments.getDocuments(n,s)))}))}function Vd(r){const t=M(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function Ep(r,t){const e=M(r),n=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const u=[];t.targetChanges.forEach(((f,m)=>{const _=s.get(m);if(!_)return;u.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,m).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,m))));let S=_.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?S=S.withResumeToken(ft.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),s=s.insert(m,S),(function(C,x,B){return C.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=yp?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(_,S,f)&&u.push(e.Pi.updateTargetData(i,S))}));let c=Lt(),h=z();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),u.push(bd(i,a,t.documentUpdates).next((f=>{c=f.ks,h=f.qs}))),!n.isEqual(q.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((m=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(f)}return A.waitFor(u).next((()=>a.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(e.Ms=s,i)))}function bd(r,t,e){let n=z(),s=z();return e.forEach((i=>n=n.add(i))),t.getEntries(r,n).next((i=>{let a=Lt();return e.forEach(((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(q.min())?(t.removeEntry(u,c.readTime),a=a.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),a=a.insert(u,c)):D(Va,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{ks:a,qs:s}}))}function wp(r,t){const e=M(r);return e.persistence.runTransaction("Get next mutation batch","readonly",(n=>(t===void 0&&(t=Ve),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t))))}function Xn(r,t){const e=M(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return e.Pi.getTargetData(n,t).next((i=>i?(s=i,A.resolve(s)):e.Pi.allocateTargetId(n).next((a=>(s=new oe(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Pi.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=e.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(n.targetId,n),e.xs.set(t,n.targetId)),n}))}async function Yn(r,t,e){const n=M(r),s=n.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Oe(a))throw a;D(Va,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Ms=n.Ms.remove(t),n.xs.delete(s.target)}function di(r,t,e){const n=M(r);let s=q.min(),i=z();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,h,f){const m=M(c),_=m.xs.get(f);return _!==void 0?A.resolve(m.Ms.get(_)):m.Pi.getTargetData(h,f)})(n,a,Dt(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(a,u.targetId).next((c=>{i=c}))})).next((()=>n.Fs.getDocumentsMatchingQuery(a,t,e?s:q.min(),e?i:z()))).next((u=>(Dd(n,kh(t),u),{documents:u,Qs:i})))))}function Cd(r,t){const e=M(r),n=M(e.Pi),s=e.Ms.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,t).next((a=>a?a.target:null))))}function xd(r,t){const e=M(r),n=e.Os.get(t)||q.min();return e.persistence.runTransaction("Get new document changes","readonly",(s=>e.Ns.getAllFromCollectionGroup(s,t,Jl(n,Ln),Number.MAX_SAFE_INTEGER))).then((s=>(Dd(e,t,s),s)))}function Dd(r,t,e){let n=r.Os.get(t)||q.min();e.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Os.set(t,n)}async function Ap(r,t,e,n){const s=M(r);let i=z(),a=Lt();for(const h of e){const f=t.$s(h.metadata.name);h.document&&(i=i.add(f));const m=t.Us(h);m.setReadTime(t.Ks(h.metadata.readTime)),a=a.insert(f,m)}const u=s.Ns.newChangeBuffer({trackRemovals:!0}),c=await Xn(s,(function(f){return Dt(sr(Q.fromString(`__bundle__/docs/${f}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(h=>bd(h,u,a).next((f=>(u.apply(h),f))).next((f=>s.Pi.removeMatchingKeysForTargetId(h,c.targetId).next((()=>s.Pi.addMatchingKeys(h,i,c.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(h,f.ks,f.qs))).next((()=>f.ks))))))}async function vp(r,t,e=z()){const n=await Xn(r,Dt(bi(t.bundledQuery))),s=M(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const a=gt(t.readTime);if(n.snapshotVersion.compareTo(a)>=0)return s.Ii.saveNamedQuery(i,t);const u=n.withResumeToken(ft.EMPTY_BYTE_STRING,a);return s.Ms=s.Ms.insert(u.targetId,u),s.Pi.updateTargetData(i,u).next((()=>s.Pi.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.Pi.addMatchingKeys(i,e,n.targetId))).next((()=>s.Ii.saveNamedQuery(i,t)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="firestore_clients";function cl(r,t){return`${Nd}_${r}_${t}`}const kd="firestore_mutations";function ll(r,t,e){let n=`${kd}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Md="firestore_targets";function Eo(r,t){return`${Md}_${r}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="SharedClientState";class fi{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Ws(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new b(s.error.code,s.error.message))),a?new fi(t,e,s.state,i):(mt(Xt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}Gs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Kr{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Ws(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new b(n.error.code,n.error.message))),i?new Kr(t,n.state,s):(mt(Xt,`Failed to parse target state for ID '${t}': ${e}`),null)}Gs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class mi{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Ws(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=fa();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=eh(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new mi(t,i):(mt(Xt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class ba{constructor(t,e){this.clientId=t,this.onlineState=e}static Ws(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new ba(e.clientId,e.onlineState):(mt(Xt,`Failed to parse online state: ${t}`),null)}}class Wo{constructor(){this.activeTargetIds=fa()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class wo{constructor(t,e,n,s,i){this.window=t,this.Mi=e,this.persistenceKey=n,this.Js=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new it(j),this.started=!1,this.Xs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.eo=cl(this.persistenceKey,this.Js),this.no=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new Wo),this.ro=new RegExp(`^${Nd}_${a}_([^_]*)$`),this.io=new RegExp(`^${kd}_${a}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${Md}_${a}_(\\d+)$`),this.oo=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this._o=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.Ts();for(const n of t){if(n===this.Js)continue;const s=this.getItem(cl(this.persistenceKey,n));if(s){const i=mi.Ws(n,s);i&&(this.Zs=this.Zs.insert(i.clientId,i))}}this.ao();const e=this.storage.getItem(this.oo);if(e){const n=this.uo(e);n&&this.co(n)}for(const n of this.Xs)this.Ys(n);this.Xs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.no,JSON.stringify(t))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(t){let e=!1;return this.Zs.forEach(((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.ho(t,"pending")}updateMutationState(t,e,n){this.ho(t,e,n),this.Po(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(Eo(this.persistenceKey,t));if(s){const i=Kr.Ws(t,s);i&&(n=i.state)}}return e&&this.To.zs(t),this.ao(),n}removeLocalQueryTarget(t){this.To.js(t),this.ao()}isLocalQueryTarget(t){return this.To.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Eo(this.persistenceKey,t))}updateQueryState(t,e,n){this.Io(t,e,n)}handleUserChange(t,e,n){e.forEach((s=>{this.Po(s)})),this.currentUser=t,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(t){this.Eo(t)}notifyBundleLoaded(t){this.Ao(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return D(Xt,"READ",t,e),e}setItem(t,e){D(Xt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){D(Xt,"REMOVE",t),this.storage.removeItem(t)}Ys(t){const e=t;if(e.storageArea===this.storage){if(D(Xt,"EVENT",e.key,e.newValue),e.key===this.eo)return void mt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable((async()=>{if(this.started){if(e.key!==null){if(this.ro.test(e.key)){if(e.newValue==null){const n=this.Ro(e.key);return this.Vo(n,null)}{const n=this.mo(e.key,e.newValue);if(n)return this.Vo(n.clientId,n)}}else if(this.io.test(e.key)){if(e.newValue!==null){const n=this.fo(e.key,e.newValue);if(n)return this.po(n)}}else if(this.so.test(e.key)){if(e.newValue!==null){const n=this.yo(e.key,e.newValue);if(n)return this.wo(n)}}else if(e.key===this.oo){if(e.newValue!==null){const n=this.uo(e.newValue);if(n)return this.co(n)}}else if(e.key===this.no){const n=(function(i){let a=Ft.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{So:i}),a=u}catch(u){mt(Xt,"Failed to read sequence number from WebStorage",u)}return a})(e.newValue);n!==Ft.ce&&this.sequenceNumberHandler(n)}else if(e.key===this._o){const n=this.bo(e.newValue);await Promise.all(n.map((s=>this.syncEngine.Do(s))))}}}else this.Xs.push(e)}))}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(t,e,n){const s=new fi(this.currentUser,t,e,n),i=ll(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Gs())}Po(t){const e=ll(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Eo(t){const e={clientId:this.Js,onlineState:t};this.storage.setItem(this.oo,JSON.stringify(e))}Io(t,e,n){const s=Eo(this.persistenceKey,t),i=new Kr(t,e,n);this.setItem(s,i.Gs())}Ao(t){const e=JSON.stringify(Array.from(t));this.setItem(this._o,e)}Ro(t){const e=this.ro.exec(t);return e?e[1]:null}mo(t,e){const n=this.Ro(t);return mi.Ws(n,e)}fo(t,e){const n=this.io.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return fi.Ws(new At(i),s,e)}yo(t,e){const n=this.so.exec(t),s=Number(n[1]);return Kr.Ws(s,e)}uo(t){return ba.Ws(t)}bo(t){return JSON.parse(t)}async po(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.Co(t.batchId,t.state,t.error);D(Xt,`Ignoring mutation for non-active user ${t.user.uid}`)}wo(t){return this.syncEngine.vo(t.targetId,t.state,t.error)}Vo(t,e){const n=e?this.Zs.insert(t,e):this.Zs.remove(t),s=this.lo(this.Zs),i=this.lo(n),a=[],u=[];return i.forEach((c=>{s.has(c)||a.push(c)})),s.forEach((c=>{i.has(c)||u.push(c)})),this.syncEngine.Fo(a,u).then((()=>{this.Zs=n}))}co(t){this.Zs.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}lo(t){let e=fa();return t.forEach(((n,s)=>{e=e.unionWith(s.activeTargetIds)})),e}}class Fd{constructor(){this.Mo=new Wo,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Wo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="ConnectivityMonitor";class dl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){D(hl,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){D(hl,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let js=null;function Ho(){return js===null?js=(function(){return 268435456+Math.round(2147483648*Math.random())})():js++,"0x"+js.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ao="RestConnection",Pp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Sp{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===Xr?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(t,e,n,s,i){const a=Ho(),u=this.zo(t,e.toUriEncodedString());D(Ao,`Sending RPC '${t}' ${a}:`,u,n);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(u),f=Zo(h);return this.Jo(t,u,c,n,f).then((m=>(D(Ao,`Received RPC '${t}' ${a}: `,m),m)),(m=>{throw Kt(Ao,`RPC '${t}' ${a} failed with error: `,m,"url: ",u,"request:",n),m}))}Ho(t,e,n,s,i,a){return this.Go(t,e,n,s,i)}jo(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+rr})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),n&&n.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const n=Pp[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt="WebChannelConnection";class bp extends Sp{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,s,i){const a=Ho();return new Promise(((u,c)=>{const h=new Bl;h.setWithCredentials(!0),h.listenOnce(Ul.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case zs.NO_ERROR:const m=h.getResponseJson();D(bt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(m)),u(m);break;case zs.TIMEOUT:D(bt,`RPC '${t}' ${a} timed out`),c(new b(R.DEADLINE_EXCEEDED,"Request time out"));break;case zs.HTTP_ERROR:const _=h.getStatus();if(D(bt,`RPC '${t}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const N=S?.error;if(N&&N.status&&N.message){const C=(function(B){const G=B.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(G)>=0?G:R.UNKNOWN})(N.status);c(new b(C,N.message))}else c(new b(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new b(R.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{D(bt,`RPC '${t}' ${a} completed.`)}}));const f=JSON.stringify(s);D(bt,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,n,15)}))}T_(t,e,n){const s=Ho(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=zl(),u=Gl(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,e,n),c.encodeInitMessageHeaders=!0;const f=i.join("");D(bt,`Creating RPC '${t}' stream ${s}: ${f}`,c);const m=a.createWebChannel(f,c);this.I_(m);let _=!1,S=!1;const N=new Vp({Yo:x=>{S?D(bt,`Not sending because RPC '${t}' stream ${s} is closed:`,x):(_||(D(bt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),_=!0),D(bt,`RPC '${t}' stream ${s} sending:`,x),m.send(x))},Zo:()=>m.close()}),C=(x,B,G)=>{x.listen(B,(U=>{try{G(U)}catch(Y){setTimeout((()=>{throw Y}),0)}}))};return C(m,kr.EventType.OPEN,(()=>{S||(D(bt,`RPC '${t}' stream ${s} transport opened.`),N.o_())})),C(m,kr.EventType.CLOSE,(()=>{S||(S=!0,D(bt,`RPC '${t}' stream ${s} transport closed`),N.a_(),this.E_(m))})),C(m,kr.EventType.ERROR,(x=>{S||(S=!0,Kt(bt,`RPC '${t}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),N.a_(new b(R.UNAVAILABLE,"The operation could not be completed")))})),C(m,kr.EventType.MESSAGE,(x=>{if(!S){const B=x.data[0];L(!!B,16349);const G=B,U=G?.error||G[0]?.error;if(U){D(bt,`RPC '${t}' stream ${s} received error:`,U);const Y=U.status;let X=(function(p){const I=pt[p];if(I!==void 0)return Hh(I)})(Y),H=U.message;X===void 0&&(X=R.INTERNAL,H="Unknown error status: "+Y+" with message "+U.message),S=!0,N.a_(new b(X,H)),m.close()}else D(bt,`RPC '${t}' stream ${s} received:`,B),N.u_(B)}})),C(u,jl.STAT_EVENT,(x=>{x.stat===Ro.PROXY?D(bt,`RPC '${t}' stream ${s} detected buffering proxy`):x.stat===Ro.NOPROXY&&D(bt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{N.__()}),0),N}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(){return typeof window<"u"?window:null}function Zs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(r){return new Mg(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-n);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl="PersistentStream";class Ld{constructor(t,e,n,s,i,a,u,c){this.Mi=t,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ca(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===R.RESOURCE_EXHAUSTED?(mt(e.toString()),mt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===e&&this.G_(n,s)}),(n=>{t((()=>{const s=new b(R.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return D(fl,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(D(fl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Cp extends Ld{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Lg(this.serializer,t),n=(function(i){if(!("targetChange"in i))return q.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?q.min():a.readTime?gt(a.readTime):q.min()})(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=Go(this.serializer),e.addTarget=(function(i,a){let u;const c=a.target;if(u=ii(c)?{documents:sd(i,c)}:{query:Vi(i,c).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Zh(i,a.resumeToken);const h=Uo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}else if(a.snapshotVersion.compareTo(q.min())>0){u.readTime=Jn(i,a.snapshotVersion.toTimestamp());const h=Uo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,t);const n=Bg(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=Go(this.serializer),e.removeTarget=t,this.q_(e)}}class xp extends Ld{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=qg(t.writeResults,t.commitTime),n=gt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=Go(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>ns(this.serializer,n)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{}class Np extends Dp{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new b(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(t,jo(e,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new b(R.UNKNOWN,i.toString())}))}Ho(t,e,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.Ho(t,jo(e,n),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new b(R.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class kp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(mt(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn="RemoteStore";class Mp{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{n.enqueueAndForget((async()=>{qe(this)&&(D(mn,"Restarting streams for network reachability change."),await(async function(c){const h=M(c);h.Ea.add(4),await ar(h),h.Ra.set("Unknown"),h.Ea.delete(4),await gs(h)})(this))}))})),this.Ra=new kp(n,s)}}async function gs(r){if(qe(r))for(const t of r.da)await t(!0)}async function ar(r){for(const t of r.da)await t(!1)}function Ni(r,t){const e=M(r);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Na(e)?Da(e):cr(e).O_()&&xa(e,t))}function Zn(r,t){const e=M(r),n=cr(e);e.Ia.delete(t),n.O_()&&qd(e,t),e.Ia.size===0&&(n.O_()?n.L_():qe(e)&&e.Ra.set("Unknown"))}function xa(r,t){if(r.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(q.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}cr(r).Y_(t)}function qd(r,t){r.Va.Ue(t),cr(r).Z_(t)}function Da(r){r.Va=new xg({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ia.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),cr(r).start(),r.Ra.ua()}function Na(r){return qe(r)&&!cr(r).x_()&&r.Ia.size>0}function qe(r){return M(r).Ea.size===0}function Bd(r){r.Va=void 0}async function Fp(r){r.Ra.set("Online")}async function Op(r){r.Ia.forEach(((t,e)=>{xa(r,t)}))}async function Lp(r,t){Bd(r),Na(r)?(r.Ra.ha(t),Da(r)):r.Ra.set("Unknown")}async function qp(r,t,e){if(r.Ra.set("Online"),t instanceof Yh&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Va.removeTarget(u))})(r,t)}catch(n){D(mn,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await gi(r,n)}else if(t instanceof Xs?r.Va.Ze(t):t instanceof Xh?r.Va.st(t):r.Va.tt(t),!e.isEqual(q.min()))try{const n=await Vd(r.localStore);e.compareTo(n)>=0&&await(function(i,a){const u=i.Va.Tt(a);return u.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(c.resumeToken,a))}})),u.targetMismatches.forEach(((c,h)=>{const f=i.Ia.get(c);if(!f)return;i.Ia.set(c,f.withResumeToken(ft.EMPTY_BYTE_STRING,f.snapshotVersion)),qd(i,c);const m=new oe(f.target,c,h,f.sequenceNumber);xa(i,m)})),i.remoteSyncer.applyRemoteEvent(u)})(r,e)}catch(n){D(mn,"Failed to raise snapshot:",n),await gi(r,n)}}async function gi(r,t,e){if(!Oe(t))throw t;r.Ea.add(1),await ar(r),r.Ra.set("Offline"),e||(e=()=>Vd(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{D(mn,"Retrying IndexedDB access"),await e(),r.Ea.delete(1),await gs(r)}))}function Ud(r,t){return t().catch((e=>gi(r,e,t)))}async function ur(r){const t=M(r),e=Ne(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Ve;for(;Bp(t);)try{const s=await wp(t.localStore,n);if(s===null){t.Ta.length===0&&e.L_();break}n=s.batchId,Up(t,s)}catch(s){await gi(t,s)}jd(t)&&Gd(t)}function Bp(r){return qe(r)&&r.Ta.length<10}function Up(r,t){r.Ta.push(t);const e=Ne(r);e.O_()&&e.X_&&e.ea(t.mutations)}function jd(r){return qe(r)&&!Ne(r).x_()&&r.Ta.length>0}function Gd(r){Ne(r).start()}async function jp(r){Ne(r).ra()}async function Gp(r){const t=Ne(r);for(const e of r.Ta)t.ea(e.mutations)}async function zp(r,t,e){const n=r.Ta.shift(),s=_a.from(n,t,e);await Ud(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await ur(r)}async function Kp(r,t){t&&Ne(r).X_&&await(async function(n,s){if((function(a){return Wh(a)&&a!==R.ABORTED})(s.code)){const i=n.Ta.shift();Ne(n).B_(),await Ud(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ur(n)}})(r,t),jd(r)&&Gd(r)}async function ml(r,t){const e=M(r);e.asyncQueue.verifyOperationInProgress(),D(mn,"RemoteStore received new credentials");const n=qe(e);e.Ea.add(3),await ar(e),n&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await gs(e)}async function Jo(r,t){const e=M(r);t?(e.Ea.delete(2),await gs(e)):t||(e.Ea.add(2),await ar(e),e.Ra.set("Unknown"))}function cr(r){return r.ma||(r.ma=(function(e,n,s){const i=M(e);return i.sa(),new Cp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:Fp.bind(null,r),t_:Op.bind(null,r),r_:Lp.bind(null,r),H_:qp.bind(null,r)}),r.da.push((async t=>{t?(r.ma.B_(),Na(r)?Da(r):r.Ra.set("Unknown")):(await r.ma.stop(),Bd(r))}))),r.ma}function Ne(r){return r.fa||(r.fa=(function(e,n,s){const i=M(e);return i.sa(),new xp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:jp.bind(null,r),r_:Kp.bind(null,r),ta:Gp.bind(null,r),na:zp.bind(null,r)}),r.da.push((async t=>{t?(r.fa.B_(),await ur(r)):(await r.fa.stop(),r.Ta.length>0&&(D(mn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new ka(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new b(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lr(r,t){if(mt("AsyncQueue",`${t}: ${r}`),Oe(r))return new b(R.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{static emptySet(t){return new sn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=Mr(),this.sortedSet=new it(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof sn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new sn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.ga=new it(k.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}}class gn{constructor(t,e,n,s,i,a,u,c,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach((u=>{a.push({type:0,doc:u})})),new gn(t,e,sn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ls(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class $p{constructor(){this.queries=pl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const s=M(e),i=s.queries;s.queries=pl(),i.forEach(((a,u)=>{for(const c of u.Sa)c.onError(n)}))})(this,new b(R.ABORTED,"Firestore shutting down"))}}function pl(){return new le((r=>Nh(r)),ls)}async function Ma(r,t){const e=M(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(n=2):(i=new Qp,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=lr(a,`Initialization of query '${Dn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&Oa(e)}async function Fa(r,t){const e=M(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Sa.indexOf(t);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function Wp(r,t){const e=M(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(n=!0);a.wa=s}}n&&Oa(e)}function Hp(r,t,e){const n=M(r),s=n.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);n.queries.delete(t)}function Oa(r){r.Ca.forEach((t=>{t.next()}))}var Xo,_l;(_l=Xo||(Xo={})).Ma="default",_l.Cache="cache";class La{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new gn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=gn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Xo.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(t,e){this.Qa=t,this.byteLength=e}$a(){return"metadata"in this.Qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(t){this.serializer=t}$s(t){return ee(this.serializer,t)}Us(t){return t.metadata.exists?Si(this.serializer,t.document,!1):at.newNoDocument(this.$s(t.metadata.name),this.Ks(t.metadata.readTime))}Ks(t){return gt(t)}}class qa{constructor(t,e){this.Ua=t,this.serializer=e,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=Kd(t)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;if(t.Qa.namedQuery)this.Ka.push(t.Qa.namedQuery);else if(t.Qa.documentMetadata){this.Wa.push({metadata:t.Qa.documentMetadata}),t.Qa.documentMetadata.exists||++e;const n=Q.fromString(t.Qa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else t.Qa.document&&(this.Wa[this.Wa.length-1].document=t.Qa.document,++e);return e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,{...this.progress}):null}za(t){const e=new Map,n=new yl(this.serializer);for(const s of t)if(s.metadata.queries){const i=n.$s(s.metadata.name);for(const a of s.metadata.queries){const u=(e.get(a)||z()).add(i);e.set(a,u)}}return e}async ja(t){const e=await Ap(t,new yl(this.serializer),this.Wa,this.Ua.id),n=this.za(this.documents);for(const s of this.Ka)await vp(t,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:e}}}function Kd(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(t){this.key=t}}class $d{constructor(t){this.key=t}}class Wd{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=z(),this.mutatedKeys=z(),this.eu=Mh(t),this.tu=new sn(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new gl,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,m)=>{const _=s.get(f),S=hs(this.query,m)?m:null,N=!!_&&this.mutatedKeys.has(_.key),C=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let x=!1;_&&S?_.data.isEqual(S.data)?N!==C&&(n.track({type:3,doc:S}),x=!0):this.su(_,S)||(n.track({type:2,doc:S}),x=!0,(c&&this.eu(S,c)>0||h&&this.eu(S,h)<0)&&(u=!0)):!_&&S?(n.track({type:0,doc:S}),x=!0):_&&!S&&(n.track({type:1,doc:_}),x=!0,(c||h)&&(u=!0)),x&&(S?(a=a.add(S),i=C?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,Cs:u,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((f,m)=>(function(S,N){const C=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:x})}};return C(S)-C(N)})(f.type,m.type)||this.eu(f.doc,m.doc))),this.ou(n),s=s??!1;const u=e&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,a.length!==0||h?{snapshot:new gn(this.query,t.tu,i,a,t.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new gl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=z(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const e=[];return t.forEach((n=>{this.Xa.has(n)||e.push(new $d(n))})),this.Xa.forEach((n=>{t.has(n)||e.push(new Qd(n))})),e}cu(t){this.Ya=t.Qs,this.Xa=z();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return gn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Be="SyncEngine";class Jp{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Xp{constructor(t){this.key=t,this.hu=!1}}class Yp{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new le((u=>Nh(u)),ls),this.Iu=new Map,this.Eu=new Set,this.du=new it(k.comparator),this.Au=new Map,this.Ru=new Aa,this.Vu={},this.mu=new Map,this.fu=fn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Zp(r,t,e=!0){const n=ki(r);let s;const i=n.Tu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Hd(n,t,e,!0),s}async function t_(r,t){const e=ki(r);await Hd(e,t,!0,!1)}async function Hd(r,t,e,n){const s=await Xn(r.localStore,Dt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await Ba(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Ni(r.remoteStore,s),u}async function Ba(r,t,e,n,s){r.pu=(m,_,S)=>(async function(C,x,B,G){let U=x.view.ru(B);U.Cs&&(U=await di(C.localStore,x.query,!1).then((({documents:T})=>x.view.ru(T,U))));const Y=G&&G.targetChanges.get(x.targetId),X=G&&G.targetMismatches.get(x.targetId)!=null,H=x.view.applyChanges(U,C.isPrimaryClient,Y,X);return Yo(C,x.targetId,H.au),H.snapshot})(r,m,_,S);const i=await di(r.localStore,t,!0),a=new Wd(t,i.Qs),u=a.ru(i.documents),c=ms.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(u,r.isPrimaryClient,c);Yo(r,e,h.au);const f=new Jp(t,e,a);return r.Tu.set(t,f),r.Iu.has(e)?r.Iu.get(e).push(t):r.Iu.set(e,[t]),h.snapshot}async function e_(r,t,e){const n=M(r),s=n.Tu.get(t),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter((a=>!ls(a,t)))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Yn(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Zn(n.remoteStore,s.targetId),tr(n,s.targetId)})).catch(Fe)):(tr(n,s.targetId),await Yn(n.localStore,s.targetId,!0))}async function n_(r,t){const e=M(r),n=e.Tu.get(t),s=e.Iu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Zn(e.remoteStore,n.targetId))}async function r_(r,t,e){const n=za(r);try{const s=await(function(a,u){const c=M(a),h=Z.now(),f=u.reduce(((S,N)=>S.add(N.key)),z());let m,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let N=Lt(),C=z();return c.Ns.getEntries(S,f).next((x=>{N=x,N.forEach(((B,G)=>{G.isValidDocument()||(C=C.add(B))}))})).next((()=>c.localDocuments.getOverlayedDocuments(S,N))).next((x=>{m=x;const B=[];for(const G of u){const U=Vg(G,m.get(G.key).overlayedDocument);U!=null&&B.push(new he(G.key,U,wh(U.value.mapValue),lt.exists(!0)))}return c.mutationQueue.addMutationBatch(S,h,B,u)})).next((x=>{_=x;const B=x.applyToLocalDocumentSet(m,C);return c.documentOverlayCache.saveOverlays(S,x.batchId,B)}))})).then((()=>({batchId:_.batchId,changes:Oh(m)})))})(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),(function(a,u,c){let h=a.Vu[a.currentUser.toKey()];h||(h=new it(j)),h=h.insert(u,c),a.Vu[a.currentUser.toKey()]=h})(n,s.batchId,e),await de(n,s.changes),await ur(n.remoteStore)}catch(s){const i=lr(s,"Failed to persist write");e.reject(i)}}async function Jd(r,t){const e=M(r);try{const n=await Ep(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=e.Au.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?L(a.hu,14607):s.removedDocuments.size>0&&(L(a.hu,42227),a.hu=!1))})),await de(e,n,t)}catch(n){await Fe(n)}}function Il(r,t,e){const n=M(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Tu.forEach(((i,a)=>{const u=a.view.va(t);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const c=M(a);c.onlineState=u;let h=!1;c.queries.forEach(((f,m)=>{for(const _ of m.Sa)_.va(u)&&(h=!0)})),h&&Oa(c)})(n.eventManager,t),s.length&&n.Pu.H_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function s_(r,t,e){const n=M(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Au.get(t),i=s&&s.key;if(i){let a=new it(k.comparator);a=a.insert(i,at.newNoDocument(i,q.min()));const u=z().add(i),c=new fs(q.min(),new Map,new it(j),a,u);await Jd(n,c),n.du=n.du.remove(i),n.Au.delete(t),Ga(n)}else await Yn(n.localStore,t,!1).then((()=>tr(n,t,e))).catch(Fe)}async function i_(r,t){const e=M(r),n=t.batch.batchId;try{const s=await Tp(e.localStore,t);ja(e,n,null),Ua(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await de(e,s)}catch(s){await Fe(s)}}async function o_(r,t,e){const n=M(r);try{const s=await(function(a,u){const c=M(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next((m=>(L(m!==null,37113),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>c.localDocuments.getDocuments(h,f)))}))})(n.localStore,t);ja(n,t,e),Ua(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await de(n,s)}catch(s){await Fe(s)}}async function a_(r,t){const e=M(r);qe(e.remoteStore)||D(Be,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(a){const u=M(a);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(e.localStore);if(n===Ve)return void t.resolve();const s=e.mu.get(n)||[];s.push(t),e.mu.set(n,s)}catch(n){const s=lr(n,"Initialization of waitForPendingWrites() operation failed");t.reject(s)}}function Ua(r,t){(r.mu.get(t)||[]).forEach((e=>{e.resolve()})),r.mu.delete(t)}function ja(r,t,e){const n=M(r);let s=n.Vu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.Vu[n.currentUser.toKey()]=s}}function tr(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Iu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Iu.delete(t),r.isPrimaryClient&&r.Ru.jr(t).forEach((n=>{r.Ru.containsKey(n)||Xd(r,n)}))}function Xd(r,t){r.Eu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Zn(r.remoteStore,e),r.du=r.du.remove(t),r.Au.delete(e),Ga(r))}function Yo(r,t,e){for(const n of e)n instanceof Qd?(r.Ru.addReference(n.key,t),u_(r,n)):n instanceof $d?(D(Be,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,t),r.Ru.containsKey(n.key)||Xd(r,n.key)):O(19791,{wu:n})}function u_(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Eu.has(n)||(D(Be,"New document in limbo: "+e),r.Eu.add(n),Ga(r))}function Ga(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Eu.values().next().value;r.Eu.delete(t);const e=new k(Q.fromString(t)),n=r.fu.next();r.Au.set(n,new Xp(e)),r.du=r.du.insert(e,n),Ni(r.remoteStore,new oe(Dt(sr(e.path)),n,"TargetPurposeLimboResolution",Ft.ce))}}async function de(r,t,e){const n=M(r),s=[],i=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((u,c)=>{a.push(n.pu(c,t,e).then((h=>{if((h||e)&&n.isPrimaryClient){const f=h?!h.fromCache:e?.targetChanges.get(c.targetId)?.current;n.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Sa.As(c.targetId,h);i.push(f)}})))})),await Promise.all(a),n.Pu.H_(s),await(async function(c,h){const f=M(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>A.forEach(h,(_=>A.forEach(_.Es,(S=>f.persistence.referenceDelegate.addReference(m,_.targetId,S))).next((()=>A.forEach(_.ds,(S=>f.persistence.referenceDelegate.removeReference(m,_.targetId,S)))))))))}catch(m){if(!Oe(m))throw m;D(Va,"Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const S=f.Ms.get(_),N=S.snapshotVersion,C=S.withLastLimboFreeSnapshotVersion(N);f.Ms=f.Ms.insert(_,C)}}})(n.localStore,i))}async function c_(r,t){const e=M(r);if(!e.currentUser.isEqual(t)){D(Be,"User change. New user:",t.toKey());const n=await Sd(e.localStore,t);e.currentUser=t,(function(i,a){i.mu.forEach((u=>{u.forEach((c=>{c.reject(new b(R.CANCELLED,a))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await de(e,n.Ls)}}function l_(r,t){const e=M(r),n=e.Au.get(t);if(n&&n.hu)return z().add(n.key);{let s=z();const i=e.Iu.get(t);if(!i)return s;for(const a of i){const u=e.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}async function h_(r,t){const e=M(r),n=await di(e.localStore,t.query,!0),s=t.view.cu(n);return e.isPrimaryClient&&Yo(e,t.targetId,s.au),s}async function d_(r,t){const e=M(r);return xd(e.localStore,t).then((n=>de(e,n)))}async function f_(r,t,e,n){const s=M(r),i=await(function(u,c){const h=M(u),f=M(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(m=>f.er(m,c).next((_=>_?h.localDocuments.getDocuments(m,_):A.resolve(null)))))})(s.localStore,t);i!==null?(e==="pending"?await ur(s.remoteStore):e==="acknowledged"||e==="rejected"?(ja(s,t,n||null),Ua(s,t),(function(u,c){M(M(u).mutationQueue).ir(c)})(s.localStore,t)):O(6720,"Unknown batchState",{Su:e}),await de(s,i)):D(Be,"Cannot apply mutation batch with id: "+t)}async function m_(r,t){const e=M(r);if(ki(e),za(e),t===!0&&e.gu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await Tl(e,n.toArray());e.gu=!0,await Jo(e.remoteStore,!0);for(const i of s)Ni(e.remoteStore,i)}else if(t===!1&&e.gu!==!1){const n=[];let s=Promise.resolve();e.Iu.forEach(((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then((()=>(tr(e,a),Yn(e.localStore,a,!0)))),Zn(e.remoteStore,a)})),await s,await Tl(e,n),(function(a){const u=M(a);u.Au.forEach(((c,h)=>{Zn(u.remoteStore,h)})),u.Ru.Jr(),u.Au=new Map,u.du=new it(k.comparator)})(e),e.gu=!1,await Jo(e.remoteStore,!1)}}async function Tl(r,t,e){const n=M(r),s=[],i=[];for(const a of t){let u;const c=n.Iu.get(a);if(c&&c.length!==0){u=await Xn(n.localStore,Dt(c[0]));for(const h of c){const f=n.Tu.get(h),m=await h_(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await Cd(n.localStore,a);u=await Xn(n.localStore,h),await Ba(n,Yd(h),a,!1,u.resumeToken)}s.push(u)}return n.Pu.H_(i),s}function Yd(r){return Ch(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function g_(r){return(function(e){return M(M(e).persistence).Ts()})(M(r).localStore)}async function p_(r,t,e,n){const s=M(r);if(s.gu)return void D(Be,"Ignoring unexpected query state notification.");const i=s.Iu.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await xd(s.localStore,kh(i[0])),u=fs.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ft.EMPTY_BYTE_STRING);await de(s,a,u);break}case"rejected":await Yn(s.localStore,t,!0),tr(s,t,n);break;default:O(64155,e)}}async function __(r,t,e){const n=ki(r);if(n.gu){for(const s of t){if(n.Iu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){D(Be,"Adding an already active target "+s);continue}const i=await Cd(n.localStore,s),a=await Xn(n.localStore,i);await Ba(n,Yd(i),a.targetId,!1,a.resumeToken),Ni(n.remoteStore,a)}for(const s of e)n.Iu.has(s)&&await Yn(n.localStore,s,!1).then((()=>{Zn(n.remoteStore,s),tr(n,s)})).catch(Fe)}}function ki(r){const t=M(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=Jd.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=l_.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=s_.bind(null,t),t.Pu.H_=Wp.bind(null,t.eventManager),t.Pu.yu=Hp.bind(null,t.eventManager),t}function za(r){const t=M(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=i_.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=o_.bind(null,t),t}function y_(r,t,e){const n=M(r);(async function(i,a,u){try{const c=await a.getMetadata();if(await(function(S,N){const C=M(S),x=gt(N.createTime);return C.persistence.runTransaction("hasNewerBundle","readonly",(B=>C.Ii.getBundleMetadata(B,N.id))).then((B=>!!B&&B.createTime.compareTo(x)>=0))})(i.localStore,c))return await a.close(),u._completeWith((function(S){return{taskState:"Success",documentsLoaded:S.totalDocuments,bytesLoaded:S.totalBytes,totalDocuments:S.totalDocuments,totalBytes:S.totalBytes}})(c)),Promise.resolve(new Set);u._updateProgress(Kd(c));const h=new qa(c,a.serializer);let f=await a.bu();for(;f;){const _=await h.Ga(f);_&&u._updateProgress(_),f=await a.bu()}const m=await h.ja(i.localStore);return await de(i,m.Ha,void 0),await(function(S,N){const C=M(S);return C.persistence.runTransaction("Save bundle","readwrite",(x=>C.Ii.saveBundleMetadata(x,N)))})(i.localStore,c),u._completeWith(m.progress),Promise.resolve(m.Ja)}catch(c){return Kt(Be,`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,t,e).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class er{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=_n(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Pd(this.persistence,new Rd,t.initialUser,this.serializer)}Cu(t){return new va(Di.mi,this.serializer)}Du(t){return new Fd}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}er.provider={build:()=>new er};class Ka extends er{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){L(this.persistence.referenceDelegate instanceof hi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Id(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Ct.withCacheSize(this.cacheSizeBytes):Ct.DEFAULT;return new va((n=>hi.mi(n,e)),this.serializer)}}class Qa extends er{constructor(t,e,n){super(),this.xu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.xu.initialize(this,t),await za(this.xu.syncEngine),await ur(this.xu.remoteStore),await this.persistence.Ji((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(t){return Pd(this.persistence,new Rd,t.initialUser,this.serializer)}Fu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new Id(n,t.asyncQueue,e)}Mu(t,e){const n=new Nm(e,this.persistence);return new Dm(t.asyncQueue,n)}Cu(t){const e=Pa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ct.withCacheSize(this.cacheSizeBytes):Ct.DEFAULT;return new Ra(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Od(),Zs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(t){return new Fd}}class Zd extends Qa{constructor(t,e){super(t,e,!1),this.xu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.xu.syncEngine;this.sharedClientState instanceof wo&&(this.sharedClientState.syncEngine={Co:f_.bind(null,e),vo:p_.bind(null,e),Fo:__.bind(null,e),Ts:g_.bind(null,e),Do:d_.bind(null,e)},await this.sharedClientState.start()),await this.persistence.Ji((async n=>{await m_(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(t){const e=Od();if(!wo.v(e))throw new b(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Pa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new wo(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class ke{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Il(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=c_.bind(null,this.syncEngine),await Jo(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new $p})()}createDatastore(t){const e=_n(t.databaseInfo.databaseId),n=(function(i){return new bp(i)})(t.databaseInfo);return(function(i,a,u,c){return new Np(i,a,u,c)})(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,s,i,a,u){return new Mp(n,s,i,a,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>Il(this.syncEngine,e,0)),(function(){return dl.v()?new dl:new Rp})())}createSyncEngine(t,e){return(function(s,i,a,u,c,h,f){const m=new Yp(s,i,a,u,c,h);return f&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const n=M(e);D(mn,"RemoteStore shutting down."),n.Ea.add(5),await ar(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ke.provider={build:()=>new ke};function El(r,t=10240){let e=0;return{async read(){if(e<r.byteLength){const n={value:r.slice(e,e+t),done:!1};return e+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):mt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(t,e){this.Bu=t,this.serializer=e,this.metadata=new vt,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((n=>{n&&n.$a()?this.metadata.resolve(n.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.Qa)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const t=await this.qu();if(t===null)return null;const e=this.Lu.decode(t),n=Number(e);isNaN(n)&&this.Qu(`length string (${e}) is not valid number`);const s=await this.$u(n);return new zd(JSON.parse(s),t.length+n)}Uu(){return this.buffer.findIndex((t=>t===123))}async qu(){for(;this.Uu()<0&&!await this.Ku(););if(this.buffer.length===0)return null;const t=this.Uu();t<0&&this.Qu("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async $u(t){for(;this.buffer.length<t;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");const e=this.Lu.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Qu(t){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${t}`)}async Ku(){const t=await this.Bu.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(t,e){this.bundleData=t,this.serializer=e,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.$a())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n?.Qa)}`);this.metadata=n;do n=this.bu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}Wu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const t=this.qu(),e=this.$u(t);return new zd(JSON.parse(e),t)}$u(t){if(this.cursor+t>this.bundleData.length)throw new b(R.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=t)}qu(){const t=this.cursor;let e=this.cursor;for(;e<this.bundleData.length;){if(this.bundleData[e]==="{"){if(e===t)throw new Error("First character is a bracket and not a number");return this.cursor=e,Number(this.bundleData.slice(t,e))}e++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E_{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new b(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const a=M(s),u={documents:i.map((m=>es(a.serializer,m)))},c=await a.Ho("BatchGetDocuments",a.serializer.databaseId,Q.emptyPath(),u,i.length),h=new Map;c.forEach((m=>{const _=Og(a.serializer,m);h.set(_.key.toString(),_)}));const f=[];return i.forEach((m=>{const _=h.get(m.toString());L(!!_,55234,{key:m}),f.push(_)})),f})(this.datastore,t);return e.forEach((n=>this.recordVersion(n))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(t.toString())}delete(t){this.write(new or(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,n)=>{const s=k.fromPath(n);this.mutations.push(new ga(s,this.precondition(s)))})),await(async function(n,s){const i=M(n),a={writes:s.map((u=>ns(i.serializer,u)))};await i.Go("Commit",i.serializer.databaseId,Q.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw O(50498,{Gu:t.constructor.name});e=q.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new b(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(q.min())?lt.exists(!1):lt.updateTime(e):lt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(q.min()))throw new b(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return lt.updateTime(e)}return lt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w_{constructor(t,e,n,s,i){this.asyncQueue=t,this.datastore=e,this.options=n,this.updateFunction=s,this.deferred=i,this.zu=n.maxAttempts,this.M_=new Ca(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new E_(this.datastore),e=this.Hu(t);e&&e.then((n=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.Yu(s)}))))})).catch((n=>{this.Yu(n)}))}))}Hu(t){try{const e=this.updateFunction(t);return!as(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if(t?.name==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Wh(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="FirestoreClient";class A_{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=ea.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{D(Me,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(D(Me,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=lr(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function vo(r,t){r.asyncQueue.verifyOperationInProgress(),D(Me,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Sd(t.localStore,s),n=s)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function wl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await $a(r);D(Me,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>ml(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>ml(t.remoteStore,s))),r._onlineComponents=t}async function $a(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D(Me,"Using user provided OfflineComponentProvider");try{await vo(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Kt("Error using user provided cache. Falling back to memory cache: "+e),await vo(r,new er)}}else D(Me,"Using default OfflineComponentProvider"),await vo(r,new Ka(void 0));return r._offlineComponents}async function Fi(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D(Me,"Using user provided OnlineComponentProvider"),await wl(r,r._uninitializedComponentsProvider._online)):(D(Me,"Using default OnlineComponentProvider"),await wl(r,new ke))),r._onlineComponents}function tf(r){return $a(r).then((t=>t.persistence))}function hr(r){return $a(r).then((t=>t.localStore))}function ef(r){return Fi(r).then((t=>t.remoteStore))}function Wa(r){return Fi(r).then((t=>t.syncEngine))}function nf(r){return Fi(r).then((t=>t.datastore))}async function nr(r){const t=await Fi(r),e=t.eventManager;return e.onListen=Zp.bind(null,t.syncEngine),e.onUnlisten=e_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=t_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=n_.bind(null,t.syncEngine),e}function v_(r){return r.asyncQueue.enqueue((async()=>{const t=await tf(r),e=await ef(r);return t.setNetworkEnabled(!0),(function(s){const i=M(s);return i.Ea.delete(0),gs(i)})(e)}))}function R_(r){return r.asyncQueue.enqueue((async()=>{const t=await tf(r),e=await ef(r);return t.setNetworkEnabled(!1),(async function(s){const i=M(s);i.Ea.add(0),await ar(i),i.Ra.set("Offline")})(e)}))}function P_(r,t){const e=new vt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,a){try{const u=await(function(h,f){const m=M(h);return m.persistence.runTransaction("read document","readonly",(_=>m.localDocuments.getDocument(_,f)))})(s,i);u.isFoundDocument()?a.resolve(u):u.isNoDocument()?a.resolve(null):a.reject(new b(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=lr(u,`Failed to get document '${i} from cache`);a.reject(c)}})(await hr(r),t,e))),e.promise}function rf(r,t,e={}){const n=new vt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,h){const f=new Mi({next:_=>{f.Nu(),a.enqueueAndForget((()=>Fa(i,m)));const S=_.docs.has(u);!S&&_.fromCache?h.reject(new b(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&_.fromCache&&c&&c.source==="server"?h.reject(new b(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new La(sr(u.path),f,{includeMetadataChanges:!0,qa:!0});return Ma(i,m)})(await nr(r),r.asyncQueue,t,e,n))),n.promise}function S_(r,t){const e=new vt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,a){try{const u=await di(s,i,!0),c=new Wd(i,u.Qs),h=c.ru(u.documents),f=c.applyChanges(h,!1);a.resolve(f.snapshot)}catch(u){const c=lr(u,`Failed to execute query '${i} against cache`);a.reject(c)}})(await hr(r),t,e))),e.promise}function sf(r,t,e={}){const n=new vt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,h){const f=new Mi({next:_=>{f.Nu(),a.enqueueAndForget((()=>Fa(i,m))),_.fromCache&&c.source==="server"?h.reject(new b(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new La(u,f,{includeMetadataChanges:!0,qa:!0});return Ma(i,m)})(await nr(r),r.asyncQueue,t,e,n))),n.promise}function V_(r,t,e){const n=new vt;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await nf(r);n.resolve((async function(a,u,c){const h=M(a),{request:f,gt:m,parent:_}=id(h.serializer,xh(u),c);h.connection.$o||delete f.parent;const S=(await h.Ho("RunAggregationQuery",h.serializer.databaseId,_,f,1)).filter((C=>!!C.result));L(S.length===1,64727);const N=S[0].result?.aggregateFields;return Object.keys(N).reduce(((C,x)=>(C[m[x]]=N[x],C)),{})})(s,t,e))}catch(s){n.reject(s)}})),n.promise}function b_(r,t){const e=new Mi(t);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){M(s).Ca.add(i),i.next()})(await nr(r),e))),()=>{e.Nu(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){M(s).Ca.delete(i)})(await nr(r),e)))}}function C_(r,t,e,n){const s=(function(a,u){let c;return c=typeof a=="string"?Jh().encode(a):a,(function(f,m){return new I_(f,m)})((function(f,m){if(f instanceof Uint8Array)return El(f,m);if(f instanceof ArrayBuffer)return El(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),u)})(e,_n(t));r.asyncQueue.enqueueAndForget((async()=>{y_(await Wa(r),s,n)}))}function x_(r,t){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=M(n);return i.persistence.runTransaction("Get named query","readonly",(a=>i.Ii.getNamedQuery(a,s)))})(await hr(r),t)))}function of(r,t){return(function(n,s){return new T_(n,s)})(r,t)}function D_(r,t){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=M(n),a=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",(c=>a.getFieldIndexes(c).next((h=>(function(m,_,S,N,C){m=[...m],_=[..._],m.sort(S),_.sort(S);const x=m.length,B=_.length;let G=0,U=0;for(;G<B&&U<x;){const Y=S(m[U],_[G]);Y<0?C(m[U++]):Y>0?N(_[G++]):(G++,U++)}for(;G<B;)N(_[G++]);for(;U<x;)C(m[U++])})(h,s,Vm,(f=>{u.push(a.addFieldIndex(c,f))}),(f=>{u.push(a.deleteFieldIndex(c,f))})))).next((()=>A.waitFor(u)))))})(await hr(r),t)))}function N_(r,t){return r.asyncQueue.enqueue((async()=>(function(n,s){M(n).Fs.Vs=s})(await hr(r),t)))}function k_(r){return r.asyncQueue.enqueue((async()=>(function(e){const n=M(e),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await hr(r))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="firestore.googleapis.com",vl=!0;class Rl{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new b(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=uf,this.ssl=vl}else this.host=t.host,this.ssl=t.ssl??vl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=md;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<yd)throw new b(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Sm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=af(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class ps{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Rl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new b(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new b(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Rl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new _m;switch(n.type){case"firstParty":return new Em(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new b(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=Al.get(e);n&&(D("ComponentProvider","Removing Datastore"),Al.delete(e),n.terminate())})(this),Promise.resolve()}}function M_(r,t,e,n={}){r=$(r,ps);const s=Zo(t),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},u=`${t}:${e}`;s&&(Ml(`https://${u}`),om("Firestore",!0)),i.host!==uf&&i.host!==u&&Kt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:n};if(!os(c,a)&&(r._setSettings(c),n.mockUserToken)){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=At.MOCK_USER;else{h=am(n.mockUserToken,r._app?.options.projectId);const m=n.mockUserToken.sub||n.mockUserToken.user_id;if(!m)throw new b(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new At(m)}r._authCredentials=new ym(new Ql(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Rt(this.firestore,t,this._query)}}class nt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ne(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new nt(this.firestore,t,this._key)}toJSON(){return{type:nt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(pn(e,nt._jsonSchema))return new nt(t,n||null,new k(Q.fromString(e.referencePath)))}}nt._jsonSchemaVersion="firestore/documentReference/1.0",nt._jsonSchema={type:_t("string",nt._jsonSchemaVersion),referencePath:_t("string")};class ne extends Rt{constructor(t,e,n){super(t,e,sr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new nt(this.firestore,null,new k(t))}withConverter(t){return new ne(this.firestore,t,this._path)}}function dy(r,t,...e){if(r=It(r),na("collection","path",t),r instanceof ps){const n=Q.fromString(t,...e);return fc(n),new ne(r,null,n)}{if(!(r instanceof nt||r instanceof ne))throw new b(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Q.fromString(t,...e));return fc(n),new ne(r.firestore,null,n)}}function fy(r,t){if(r=$(r,ps),na("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new b(R.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Rt(r,null,(function(n){return new ce(Q.emptyPath(),n)})(t))}function F_(r,t,...e){if(r=It(r),arguments.length===1&&(t=ea.newId()),na("doc","path",t),r instanceof ps){const n=Q.fromString(t,...e);return dc(n),new nt(r,null,new k(n))}{if(!(r instanceof nt||r instanceof ne))throw new b(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Q.fromString(t,...e));return dc(n),new nt(r.firestore,r instanceof ne?r.converter:null,new k(n))}}function my(r,t){return r=It(r),t=It(t),(r instanceof nt||r instanceof ne)&&(t instanceof nt||t instanceof ne)&&r.firestore===t.firestore&&r.path===t.path&&r.converter===t.converter}function cf(r,t){return r=It(r),t=It(t),r instanceof Rt&&t instanceof Rt&&r.firestore===t.firestore&&ls(r._query,t._query)&&r.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="AsyncQueue";class Sl{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ca(this,"async_queue_retry"),this._c=()=>{const n=Zs();n&&D(Pl,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Zs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Zs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new vt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Oe(t))throw t;D(Pl,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,mt("INTERNAL UNHANDLED ERROR: ",Vl(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=ka.createAndSchedule(this,t,e,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&O(47125,{Pc:Vl(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Vl(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(r){return(function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}class O_{constructor(){this._progressObserver={},this._taskCompletionResolver=new vt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy=-1;class st extends ps{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Sl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Sl(t),this._firestoreClient=void 0,await t}}}function py(r,t,e){e||(e=Xr);const n=Fl(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(os(i,t))return s;throw new b(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new b(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<yd)throw new b(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&Zo(t.host)&&Ml(t.host),n.initialize({options:t,instanceIdentifier:e})}function _y(r,t){const e=typeof r=="object"?r:um(),n=typeof r=="string"?r:t||Xr,s=Fl(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=cm("firestore");i&&M_(s,...i)}return s}function ht(r){if(r._terminated)throw new b(R.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||lf(r),r._firestoreClient}function lf(r){const t=r._freezeSettings(),e=(function(s,i,a,u){return new ag(s,i,a,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,af(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)})(r._databaseId,r._app?.options.appId||"",r._persistenceKey,t);r._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new A_(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}function yy(r,t){Kt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();return hf(r,ke.provider,{build:n=>new Qa(n,e.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function Iy(r){Kt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();hf(r,ke.provider,{build:e=>new Zd(e,t.cacheSizeBytes)})}function hf(r,t,e){if((r=$(r,st))._firestoreClient||r._terminated)throw new b(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new b(R.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},lf(r)}function Ty(r){if(r._initialized&&!r._terminated)throw new b(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new vt;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!te.v())return Promise.resolve();const s=n+vd;await te.delete(s)})(Pa(r._databaseId,r._persistenceKey)),t.resolve()}catch(e){t.reject(e)}})),t.promise}function Ey(r){return(function(e){const n=new vt;return e.asyncQueue.enqueueAndForget((async()=>a_(await Wa(e),n))),n.promise})(ht(r=$(r,st)))}function wy(r){return v_(ht(r=$(r,st)))}function Ay(r){return R_(ht(r=$(r,st)))}function vy(r){return lm(r.app,"firestore",r._databaseId.database),r._delete()}function bl(r,t){const e=ht(r=$(r,st)),n=new O_;return C_(e,r._databaseId,t,n),n}function L_(r,t){return x_(ht(r=$(r,st)),t).then((e=>e?new Rt(r,null,e.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class q_{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ut(ft.fromBase64String(t))}catch(e){throw new b(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ut(ft.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(pn(t,Ut._jsonSchema))return Ut.fromBase64String(t.bytes)}}Ut._jsonSchemaVersion="firestore/bytes/1.0",Ut._jsonSchema={type:_t("string",Ut._jsonSchemaVersion),bytes:_t("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new b(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Ry(){return new yn(Vo)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new b(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new b(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:re._jsonSchemaVersion}}static fromJSON(t){if(pn(t,re._jsonSchema))return new re(t.latitude,t.longitude)}}re._jsonSchemaVersion="firestore/geoPoint/1.0",re._jsonSchema={type:_t("string",re._jsonSchemaVersion),latitude:_t("number"),longitude:_t("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:$t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(pn(t,$t._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new $t(t.vectorValues);throw new b(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}$t._jsonSchemaVersion="firestore/vectorValue/1.0",$t._jsonSchema={type:_t("string",$t._jsonSchemaVersion),vectorValues:_t("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B_=/^__.*__$/;class U_{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new he(t,this.data,this.fieldMask,e,this.fieldTransforms):new ir(t,this.data,e,this.fieldTransforms)}}class df{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new he(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function ff(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:r})}}class Oi{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new Oi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){const e=this.path?.child(t),n=this.Vc({path:e,fc:!1});return n.gc(t),n}yc(t){const e=this.path?.child(t),n=this.Vc({path:e,fc:!1});return n.Rc(),n}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return pi(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(ff(this.Ac)&&B_.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class j_{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||_n(t)}Cc(t,e,n,s=!1){return new Oi({Ac:t,methodName:e,Dc:n,path:ct.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Tn(r){const t=r._freezeSettings(),e=_n(r._databaseId);return new j_(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Li(r,t,e,n,s,i={}){const a=r.Cc(i.merge||i.mergeFields?2:0,t,e,s);eu("Data must be an object, but it was:",a,n);const u=pf(n,a);let c,h;if(i.merge)c=new Ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const _=ss(t,m,e);if(!a.contains(_))throw new b(R.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);yf(f,_)||f.push(_)}c=new Ot(f),h=a.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=a.fieldTransforms;return new U_(new St(u),c,h)}class _s extends In{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof _s}}function mf(r,t,e){return new Oi({Ac:3,Dc:t.settings.Dc,methodName:r._methodName,fc:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class Ha extends In{_toFieldTransform(t){return new ds(t.path,new Wn)}isEqual(t){return t instanceof Ha}}class Ja extends In{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=mf(this,t,!0),n=this.vc.map((i=>En(i,e))),s=new cn(n);return new ds(t.path,s)}isEqual(t){return t instanceof Ja&&os(this.vc,t.vc)}}class Xa extends In{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=mf(this,t,!0),n=this.vc.map((i=>En(i,e))),s=new ln(n);return new ds(t.path,s)}isEqual(t){return t instanceof Xa&&os(this.vc,t.vc)}}class Ya extends In{constructor(t,e){super(t),this.Fc=e}_toFieldTransform(t){const e=new Hn(t.serializer,Bh(t.serializer,this.Fc));return new ds(t.path,e)}isEqual(t){return t instanceof Ya&&this.Fc===t.Fc}}function Za(r,t,e,n){const s=r.Cc(1,t,e);eu("Data must be an object, but it was:",s,n);const i=[],a=St.empty();Le(n,((c,h)=>{const f=qi(t,c,e);h=It(h);const m=s.yc(f);if(h instanceof _s)i.push(f);else{const _=En(h,m);_!=null&&(i.push(f),a.set(f,_))}}));const u=new Ot(i);return new df(a,u,s.fieldTransforms)}function tu(r,t,e,n,s,i){const a=r.Cc(1,t,e),u=[ss(t,n,e)],c=[s];if(i.length%2!=0)throw new b(R.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)u.push(ss(t,i[_])),c.push(i[_+1]);const h=[],f=St.empty();for(let _=u.length-1;_>=0;--_)if(!yf(h,u[_])){const S=u[_];let N=c[_];N=It(N);const C=a.yc(S);if(N instanceof _s)h.push(S);else{const x=En(N,C);x!=null&&(h.push(S),f.set(S,x))}}const m=new Ot(h);return new df(f,m,a.fieldTransforms)}function gf(r,t,e,n=!1){return En(e,r.Cc(n?4:3,t))}function En(r,t){if(_f(r=It(r)))return eu("Unsupported field value:",t,r),pf(r,t);if(r instanceof In)return(function(n,s){if(!ff(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(n,s){const i=[];let a=0;for(const u of n){let c=En(u,s.wc(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(r,t)}return(function(n,s){if((n=It(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Bh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:Jn(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Jn(s.serializer,i)}}if(n instanceof re)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ut)return{bytesValue:Zh(s.serializer,n._byteString)};if(n instanceof nt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ta(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof $t)return(function(a,u){return{mapValue:{fields:{[ca]:{stringValue:la},[Kn]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw u.Sc("VectorValues must only contain numeric values.");return ma(u.serializer,h)}))}}}}}})(n,s);throw s.Sc(`Unsupported field value: ${_i(n)}`)})(r,t)}function pf(r,t){const e={};return fh(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Le(r,((n,s)=>{const i=En(s,t.mc(n));i!=null&&(e[n]=i)})),{mapValue:{fields:e}}}function _f(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof re||r instanceof Ut||r instanceof nt||r instanceof In||r instanceof $t)}function eu(r,t,e){if(!_f(e)||!Wl(e)){const n=_i(e);throw n==="an object"?t.Sc(r+" a custom object"):t.Sc(r+" "+n)}}function ss(r,t,e){if((t=It(t))instanceof yn)return t._internalPath;if(typeof t=="string")return qi(r,t);throw pi("Field path arguments must be of type string or ",r,!1,void 0,e)}const G_=new RegExp("[~\\*/\\[\\]]");function qi(r,t,e){if(t.search(G_)>=0)throw pi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new yn(...t.split("."))._internalPath}catch{throw pi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function pi(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${n}`),a&&(c+=` in document ${s}`),c+=")"),new b(R.INVALID_ARGUMENT,u+r+c)}function yf(r,t){return r.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new z_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Bi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class z_ extends is{data(){return super.data()}}function Bi(r,t){return typeof t=="string"?qi(r,t):t instanceof yn?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new b(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class nu{}class ys extends nu{}function Py(r,t,...e){let n=[];t instanceof nu&&n.push(t),n=n.concat(e),(function(i){const a=i.filter((c=>c instanceof dr)).length,u=i.filter((c=>c instanceof Is)).length;if(a>1||a>0&&u>0)throw new b(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Is extends ys{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Is(t,e,n)}_apply(t){const e=this._parse(t);return Ef(t._query,e),new Rt(t.firestore,t.converter,qo(t._query,e))}_parse(t){const e=Tn(t.firestore);return(function(i,a,u,c,h,f,m){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new b(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){xl(m,f);const N=[];for(const C of m)N.push(Cl(c,i,C));_={arrayValue:{values:N}}}else _=Cl(c,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||xl(m,f),_=gf(u,a,m,f==="in"||f==="not-in");return W.create(h,f,_)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Sy(r,t,e){const n=t,s=Bi("where",r);return Is._create(s,n,e)}class dr extends nu{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new dr(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:tt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let a=s;const u=i.getFlattenedFilters();for(const c of u)Ef(a,c),a=qo(a,c)})(t._query,e),new Rt(t.firestore,t.converter,qo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Vy(...r){return r.forEach((t=>wf("or",t))),dr._create("or",r)}function by(...r){return r.forEach((t=>wf("and",t))),dr._create("and",r)}class ru extends ys{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new ru(t,e)}_apply(t){const e=(function(s,i,a){if(s.startAt!==null)throw new b(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new b(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ts(i,a)})(t._query,this._field,this._direction);return new Rt(t.firestore,t.converter,(function(s,i){const a=s.explicitOrderBy.concat([i]);return new ce(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(t._query,e))}}function Cy(r,t="asc"){const e=t,n=Bi("orderBy",r);return ru._create(n,e)}class Ui extends ys{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Ui(t,e,n)}_apply(t){return new Rt(t.firestore,t.converter,ai(t._query,this._limit,this._limitType))}}function xy(r){return Hl("limit",r),Ui._create("limit",r,"F")}function Dy(r){return Hl("limitToLast",r),Ui._create("limitToLast",r,"L")}class ji extends ys{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new ji(t,e,n)}_apply(t){const e=Tf(t,this.type,this._docOrFields,this._inclusive);return new Rt(t.firestore,t.converter,(function(s,i){return new ce(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)})(t._query,e))}}function Ny(...r){return ji._create("startAt",r,!0)}function ky(...r){return ji._create("startAfter",r,!1)}class Gi extends ys{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new Gi(t,e,n)}_apply(t){const e=Tf(t,this.type,this._docOrFields,this._inclusive);return new Rt(t.firestore,t.converter,(function(s,i){return new ce(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)})(t._query,e))}}function My(...r){return Gi._create("endBefore",r,!1)}function Fy(...r){return Gi._create("endAt",r,!0)}function Tf(r,t,e,n){if(e[0]=It(e[0]),e[0]instanceof is)return(function(i,a,u,c,h){if(!c)throw new b(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of Mn(i))if(m.field.isKeyField())f.push(an(a,c.key));else{const _=c.data.field(m.field);if(wi(_))throw new b(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(_===null){const S=m.field.canonicalString();throw new b(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${S}' (used as the orderBy) does not exist.`)}f.push(_)}return new De(f,h)})(r._query,r.firestore._databaseId,t,e[0]._document,n);{const s=Tn(r.firestore);return(function(a,u,c,h,f,m){const _=a.explicitOrderBy;if(f.length>_.length)throw new b(R.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const S=[];for(let N=0;N<f.length;N++){const C=f[N];if(_[N].field.isKeyField()){if(typeof C!="string")throw new b(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof C}`);if(!da(a)&&C.indexOf("/")!==-1)throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${C}' contains a slash.`);const x=a.path.child(Q.fromString(C));if(!k.isDocumentKey(x))throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${x}' is not because it contains an odd number of segments.`);const B=new k(x);S.push(an(u,B))}else{const x=gf(c,h,C);S.push(x)}}return new De(S,m)})(r._query,r.firestore._databaseId,s,t,e,n)}}function Cl(r,t,e){if(typeof(e=It(e))=="string"){if(e==="")throw new b(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!da(t)&&e.indexOf("/")!==-1)throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(Q.fromString(e));if(!k.isDocumentKey(n))throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return an(r,new k(n))}if(e instanceof nt)return an(r,e._key);throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${_i(e)}.`)}function xl(r,t){if(!Array.isArray(r)||r.length===0)throw new b(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Ef(r,t){const e=(function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new b(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new b(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function wf(r,t){if(!(t instanceof Is||t instanceof dr))throw new b(R.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Af{convertValue(t,e="none"){switch(Ce(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ue(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Le(t,((s,i)=>{n[s]=this.convertValue(i,e)})),n}convertVectorValue(t){const e=t.fields?.[Kn].arrayValue?.values?.map((n=>ut(n.doubleValue)));return new $t(e)}convertGeoPoint(t){return new re(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Ai(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Jr(t));default:return null}}convertTimestamp(t){const e=ae(t);return new Z(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Q.fromString(t);L(cd(n),9688,{name:t});const s=new on(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(e)||mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class su extends Af{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ut(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new nt(this.firestore,null,e)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(r){return new rs("sum",ss("sum",r))}function Ly(r){return new rs("avg",ss("average",r))}function K_(){return new rs("count")}function qy(r,t){return r instanceof rs&&t instanceof rs&&r.aggregateType===t.aggregateType&&r._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function By(r,t){return cf(r.query,t.query)&&os(r.data(),t.data())}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf="NOT SUPPORTED";class Re{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class jt extends is{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ti(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Bi("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new b(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=jt._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}function Uy(r,t,e){if(pn(t,jt._jsonSchema)){if(t.bundle===vf)throw new b(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=_n(r._databaseId),s=of(t.bundle,n),i=s.Wu(),a=new qa(s.getMetadata(),n);for(const f of i)a.Ga(f);const u=a.documents;if(u.length!==1)throw new b(R.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${u.length} documents.`);const c=Si(n,u[0].document),h=new k(Q.fromString(t.bundleName));return new jt(r,new su(r),h,c,new Re(!1,!1),e||null)}}jt._jsonSchemaVersion="firestore/documentSnapshot/1.0",jt._jsonSchema={type:_t("string",jt._jsonSchemaVersion),bundleSource:_t("string","DocumentSnapshot"),bundleName:_t("string"),bundle:_t("string")};class ti extends jt{data(t={}){return super.data(t)}}class Gt{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Re(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new ti(this._firestore,this._userDataWriter,n.key,n,new Re(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new b(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const c=new ti(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Re(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const c=new ti(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Re(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:Q_(u.type),doc:c,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new b(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Gt._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ea.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function jy(r,t,e){if(pn(t,Gt._jsonSchema)){if(t.bundle===vf)throw new b(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=_n(r._databaseId),s=of(t.bundle,n),i=s.Wu(),a=new qa(s.getMetadata(),n);for(const _ of i)a.Ga(_);if(a.queries.length!==1)throw new b(R.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);const u=bi(a.queries[0].bundledQuery),c=a.documents;let h=new sn;c.map((_=>{const S=Si(n,_.document);h=h.add(S)}));const f=gn.fromInitialDocuments(u,h,z(),!1,!1),m=new Rt(r,e||null,u);return new Gt(r,new su(r),m,f)}}function Q_(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}function Gy(r,t){return r instanceof jt&&t instanceof jt?r._firestore===t._firestore&&r._key.isEqual(t._key)&&(r._document===null?t._document===null:r._document.isEqual(t._document))&&r._converter===t._converter:r instanceof Gt&&t instanceof Gt&&r._firestore===t._firestore&&cf(r.query,t.query)&&r.metadata.isEqual(t.metadata)&&r._snapshot.isEqual(t._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(r){r=$(r,nt);const t=$(r.firestore,st);return rf(ht(t),r._key).then((e=>iu(t,r,e)))}Gt._jsonSchemaVersion="firestore/querySnapshot/1.0",Gt._jsonSchema={type:_t("string",Gt._jsonSchemaVersion),bundleSource:_t("string","QuerySnapshot"),bundleName:_t("string"),bundle:_t("string")};class Ue extends Af{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ut(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new nt(this.firestore,null,e)}}function Ky(r){r=$(r,nt);const t=$(r.firestore,st),e=ht(t),n=new Ue(t);return P_(e,r._key).then((s=>new jt(t,n,r._key,s,new Re(s!==null&&s.hasLocalMutations,!0),r.converter)))}function Qy(r){r=$(r,nt);const t=$(r.firestore,st);return rf(ht(t),r._key,{source:"server"}).then((e=>iu(t,r,e)))}function $y(r){r=$(r,Rt);const t=$(r.firestore,st),e=ht(t),n=new Ue(t);return If(r._query),sf(e,r._query).then((s=>new Gt(t,n,r,s)))}function Wy(r){r=$(r,Rt);const t=$(r.firestore,st),e=ht(t),n=new Ue(t);return S_(e,r._query).then((s=>new Gt(t,n,r,s)))}function Hy(r){r=$(r,Rt);const t=$(r.firestore,st),e=ht(t),n=new Ue(t);return sf(e,r._query,{source:"server"}).then((s=>new Gt(t,n,r,s)))}function Jy(r,t,e){r=$(r,nt);const n=$(r.firestore,st),s=zi(r.converter,t,e);return Ts(n,[Li(Tn(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,lt.none())])}function Xy(r,t,e,...n){r=$(r,nt);const s=$(r.firestore,st),i=Tn(s);let a;return a=typeof(t=It(t))=="string"||t instanceof yn?tu(i,"updateDoc",r._key,t,e,n):Za(i,"updateDoc",r._key,t),Ts(s,[a.toMutation(r._key,lt.exists(!0))])}function Yy(r){return Ts($(r.firestore,st),[new or(r._key,lt.none())])}function Zy(r,t){const e=$(r.firestore,st),n=F_(r),s=zi(r.converter,t);return Ts(e,[Li(Tn(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,lt.exists(!1))]).then((()=>n))}function Dl(r,...t){r=It(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||Fn(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Fn(t[n])){const c=t[n];t[n]=c.next?.bind(c),t[n+1]=c.error?.bind(c),t[n+2]=c.complete?.bind(c)}let i,a,u;if(r instanceof nt)a=$(r.firestore,st),u=sr(r._key.path),i={next:c=>{t[n]&&t[n](iu(a,r,c))},error:t[n+1],complete:t[n+2]};else{const c=$(r,Rt);a=$(c.firestore,st),u=c._query;const h=new Ue(a);i={next:f=>{t[n]&&t[n](new Gt(a,h,c,f))},error:t[n+1],complete:t[n+2]},If(r._query)}return(function(h,f,m,_){const S=new Mi(_),N=new La(f,S,m);return h.asyncQueue.enqueueAndForget((async()=>Ma(await nr(h),N))),()=>{S.Nu(),h.asyncQueue.enqueueAndForget((async()=>Fa(await nr(h),N)))}})(ht(a),u,s,i)}function tI(r,t,...e){const n=It(r),s=(function(c){const h={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const m of f){if(!(m in c)){h.error=`snapshotJson missing required field: ${m}`;break}const _=c[m];if(typeof _!="string"){h.error=`snapshotJson field '${m}' must be a string.`;break}if(_.length===0){h.error=`snapshotJson field '${m}' cannot be an empty string.`;break}m==="bundle"?h.bundle=_:m==="bundleName"?h.bundleName=_:m==="bundleSource"&&(h.bundleSource=_)}return h})(t);if(s.error)throw new b(R.INVALID_ARGUMENT,s.error);let i,a=0;if(typeof e[a]!="object"||Fn(e[a])||(i=e[a++]),s.bundleSource==="QuerySnapshot"){let u=null;if(typeof e[a]=="object"&&Fn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return(function(h,f,m,_,S){let N,C=!1;return bl(h,f.bundle).then((()=>L_(h,f.bundleName))).then((B=>{B&&!C&&(S&&B.withConverter(S),N=Dl(B,m||{},_))})).catch((B=>(_.error&&_.error(B),()=>{}))),()=>{C||(C=!0,N&&N())}})(n,s,i,u,e[a])}if(s.bundleSource==="DocumentSnapshot"){let u=null;if(typeof e[a]=="object"&&Fn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return(function(h,f,m,_,S){let N,C=!1;return bl(h,f.bundle).then((()=>{if(!C){const B=new nt(h,S||null,k.fromPath(f.bundleName));N=Dl(B,m||{},_)}})).catch((B=>(_.error&&_.error(B),()=>{}))),()=>{C||(C=!0,N&&N())}})(n,s,i,u,e[a])}throw new b(R.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function eI(r,t){return b_(ht(r=$(r,st)),Fn(t)?t:{next:t})}function Ts(r,t){return(function(n,s){const i=new vt;return n.asyncQueue.enqueueAndForget((async()=>r_(await Wa(n),s,i))),i.promise})(ht(r),t)}function iu(r,t,e){const n=e.docs.get(t._key),s=new Ue(r);return new jt(r,s,t._key,n,new Re(e.hasPendingWrites,e.fromCache),t.converter)}function nI(r){return $_(r,{count:K_()})}function $_(r,t){const e=$(r.firestore,st),n=ht(e),s=dh(t,((i,a)=>new $h(a,i.aggregateType,i._internalFieldPath)));return V_(n,r._query,s).then((i=>(function(u,c,h){const f=new Ue(u);return new q_(c,f,h)})(e,r,i)))}class W_{constructor(t){this.kind="memory",this._onlineComponentProvider=ke.provider,this._offlineComponentProvider=t?.garbageCollector?t.garbageCollector._offlineComponentProvider:{build:()=>new Ka(void 0)}}toJSON(){return{kind:this.kind}}}class H_{constructor(t){let e;this.kind="persistent",t?.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=ty(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class J_{constructor(){this.kind="memoryEager",this._offlineComponentProvider=er.provider}toJSON(){return{kind:this.kind}}}class X_{constructor(t){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Ka(t)}}toJSON(){return{kind:this.kind}}}function rI(){return new J_}function sI(r){return new X_(r?.cacheSizeBytes)}function iI(r){return new W_(r)}function oI(r){return new H_(r)}class Y_{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ke.provider,this._offlineComponentProvider={build:e=>new Qa(e,t?.cacheSizeBytes,this.forceOwnership)}}}class Z_{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ke.provider,this._offlineComponentProvider={build:e=>new Zd(e,t?.cacheSizeBytes)}}}function ty(r){return new Y_(r?.forceOwnership)}function aI(){return new Z_}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Tn(t)}set(t,e,n){this._verifyNotCommitted();const s=Pe(t,this._firestore),i=zi(s.converter,e,n),a=Li(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,lt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=Pe(t,this._firestore);let a;return a=typeof(e=It(e))=="string"||e instanceof yn?tu(this._dataReader,"WriteBatch.update",i._key,e,n,s):Za(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,lt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Pe(t,this._firestore);return this._mutations=this._mutations.concat(new or(e._key,lt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new b(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Pe(r,t){if((r=It(r)).firestore!==t)throw new b(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Tn(t)}get(t){const e=Pe(t,this._firestore),n=new su(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return O(24041);const i=s[0];if(i.isFoundDocument())return new is(this._firestore,n,i.key,i,e.converter);if(i.isNoDocument())return new is(this._firestore,n,e._key,null,e.converter);throw O(18433,{doc:i})}))}set(t,e,n){const s=Pe(t,this._firestore),i=zi(s.converter,e,n),a=Li(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,a),this}update(t,e,n,...s){const i=Pe(t,this._firestore);let a;return a=typeof(e=It(e))=="string"||e instanceof yn?tu(this._dataReader,"Transaction.update",i._key,e,n,s):Za(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,a),this}delete(t){const e=Pe(t,this._firestore);return this._transaction.delete(e._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy extends ry{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Pe(t,this._firestore),n=new Ue(this._firestore);return super.get(t).then((s=>new jt(this._firestore,n,e._key,s._document,new Re(!1,!1),e.converter)))}}function uI(r,t,e){r=$(r,st);const n={...ey,...e};return(function(i){if(i.maxAttempts<1)throw new b(R.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n),(function(i,a,u){const c=new vt;return i.asyncQueue.enqueueAndForget((async()=>{const h=await nf(i);new w_(i.asyncQueue,h,u,a,c).ju()})),c.promise})(ht(r),(s=>t(new sy(r,s))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cI(){return new _s("deleteField")}function lI(){return new Ha("serverTimestamp")}function hI(...r){return new Ja("arrayUnion",r)}function dI(...r){return new Xa("arrayRemove",r)}function fI(r){return new Ya("increment",r)}function mI(r){return new $t(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gI(r){return ht(r=$(r,st)),new ny(r,(t=>Ts(r,t)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(r,t){const e=ht(r=$(r,st));if(!e._uninitializedComponentsProvider||e._uninitializedComponentsProvider._offline.kind==="memory")return Kt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const a=typeof i=="string"?(function(h){try{return JSON.parse(h)}catch(f){throw new b(R.INVALID_ARGUMENT,"Failed to parse JSON: "+f?.message)}})(i):i,u=[];if(Array.isArray(a.indexes))for(const c of a.indexes){const h=Nl(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const m of c.fields){const _=qi("setIndexConfiguration",Nl(m,"fieldPath"));m.arrayConfig==="CONTAINS"?f.push(new nn(_,2)):m.order==="ASCENDING"?f.push(new nn(_,0)):m.order==="DESCENDING"&&f.push(new nn(_,1))}u.push(new qn(qn.UNKNOWN_ID,h,f,Bn.empty()))}return u})(t);return D_(e,n)}function Nl(r,t){if(typeof r[t]!="string")throw new b(R.INVALID_ARGUMENT,"Missing string value for: "+t);return r[t]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(t){this._firestore=t,this.type="PersistentCacheIndexManager"}}function _I(r){r=$(r,st);const t=kl.get(r);if(t)return t;if(ht(r)._uninitializedComponentsProvider?._offline.kind!=="persistent")return null;const n=new iy(r);return kl.set(r,n),n}function yI(r){Rf(r,!0)}function II(r){Rf(r,!1)}function TI(r){k_(ht(r._firestore)).then((t=>D("deleting all persistent cache indexes succeeded"))).catch((t=>Kt("deleting all persistent cache indexes failed",t)))}function Rf(r,t){N_(ht(r._firestore),t).then((e=>D(`setting persistent cache index auto creation isEnabled=${t} succeeded`))).catch((e=>Kt(`setting persistent cache index auto creation isEnabled=${t} failed`,e)))}const kl=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(r){const t=ht($(r.firestore,st)),e=t._onlineComponents?.datastore.serializer;return e===void 0?null:Vi(e,Dt(r._query)).ft}function wI(r,t){const e=dh(t,((i,a)=>new $h(a,i.aggregateType,i._internalFieldPath))),n=ht($(r.firestore,st)),s=n._onlineComponents?.datastore.serializer;return s===void 0?null:id(s,xh(r._query),e,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(t){return ou.instance.onExistenceFilterMismatch(t)}}class ou{constructor(){this.Mc=new Map}static get instance(){return Gs||(Gs=new ou,(function(e){if(Bo)throw new Error("a TestingHooksSpi instance is already set");Bo=e})(Gs)),Gs}lt(t){this.Mc.forEach((e=>e(t)))}onExistenceFilterMismatch(t){const e=Symbol(),n=this.Mc;return n.set(e,t),()=>n.delete(e)}}let Gs=null;(function(t,e=!0){(function(s){rr=s})(fm),mm(new gm("firestore",((n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new st(new Im(n.getProvider("auth-internal")),new wm(a,n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new b(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new on(h.options.projectId,f)})(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),uc(lc,hc,t),uc(lc,hc,"esm2020")})();export{Af as AbstractUserDataWriter,rs as AggregateField,q_ as AggregateQuerySnapshot,Ut as Bytes,gy as CACHE_SIZE_UNLIMITED,ne as CollectionReference,nt as DocumentReference,jt as DocumentSnapshot,yn as FieldPath,In as FieldValue,st as Firestore,b as FirestoreError,re as GeoPoint,O_ as LoadBundleTask,iy as PersistentCacheIndexManager,Rt as Query,dr as QueryCompositeFilterConstraint,ys as QueryConstraint,ti as QueryDocumentSnapshot,Gi as QueryEndAtConstraint,Is as QueryFieldFilterConstraint,Ui as QueryLimitConstraint,ru as QueryOrderByConstraint,Gt as QuerySnapshot,ji as QueryStartAtConstraint,Re as SnapshotMetadata,Z as Timestamp,sy as Transaction,$t as VectorValue,ny as WriteBatch,ea as _AutoId,ft as _ByteString,on as _DatabaseId,k as _DocumentKey,cy as _EmptyAppCheckTokenProvider,_m as _EmptyAuthCredentialsProvider,ct as _FieldPath,AI as _TestingHooks,$ as _cast,uy as _debugAssert,wI as _internalAggregationQueryToProtoRunAggregationQueryRequest,EI as _internalQueryToProtoQueryTarget,hy as _isBase64Available,Kt as _logWarn,Sm as _validateIsNotUsedTogether,Zy as addDoc,qy as aggregateFieldEqual,By as aggregateQuerySnapshotEqual,by as and,dI as arrayRemove,hI as arrayUnion,Ly as average,Ty as clearIndexedDbPersistence,dy as collection,fy as collectionGroup,M_ as connectFirestoreEmulator,K_ as count,TI as deleteAllPersistentCacheIndexes,Yy as deleteDoc,cI as deleteField,Ay as disableNetwork,II as disablePersistentCacheIndexAutoCreation,F_ as doc,Ry as documentId,Uy as documentSnapshotFromJSON,yy as enableIndexedDbPersistence,Iy as enableMultiTabIndexedDbPersistence,wy as enableNetwork,yI as enablePersistentCacheIndexAutoCreation,Fy as endAt,My as endBefore,ht as ensureFirestoreConfigured,Ts as executeWrite,$_ as getAggregateFromServer,nI as getCountFromServer,zy as getDoc,Ky as getDocFromCache,Qy as getDocFromServer,$y as getDocs,Wy as getDocsFromCache,Hy as getDocsFromServer,_y as getFirestore,_I as getPersistentCacheIndexManager,fI as increment,py as initializeFirestore,xy as limit,Dy as limitToLast,bl as loadBundle,rI as memoryEagerGarbageCollector,iI as memoryLocalCache,sI as memoryLruGarbageCollector,L_ as namedQuery,Dl as onSnapshot,tI as onSnapshotResume,eI as onSnapshotsInSync,Vy as or,Cy as orderBy,oI as persistentLocalCache,aI as persistentMultipleTabManager,ty as persistentSingleTabManager,Py as query,cf as queryEqual,jy as querySnapshotFromJSON,my as refEqual,uI as runTransaction,lI as serverTimestamp,Jy as setDoc,pI as setIndexConfiguration,ay as setLogLevel,Gy as snapshotEqual,ky as startAfter,Ny as startAt,Oy as sum,vy as terminate,Xy as updateDoc,mI as vector,Ey as waitForPendingWrites,Sy as where,gI as writeBatch};
