import{F as hm,a as yt,L as dm,R as ue,H as as,I as sa,J as ql,K as fm,Z as mm,g as gm,_ as Bl,Y as pm,q as _m,b as ym,i as Im,G as oi,$ as Ul,a0 as jl,S as Tm,e as Em,C as wm,r as dc,o as Am}from"./BNzHx_Hw.js";var fc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ve,Gl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function I(){}I.prototype=p.prototype,T.D=p.prototype,T.prototype=new I,T.prototype.constructor=T,T.C=function(E,w,P){for(var y=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)y[ie-2]=arguments[ie];return p.prototype[w].apply(E,y)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,I){I||(I=0);var E=Array(16);if(typeof p=="string")for(var w=0;16>w;++w)E[w]=p.charCodeAt(I++)|p.charCodeAt(I++)<<8|p.charCodeAt(I++)<<16|p.charCodeAt(I++)<<24;else for(w=0;16>w;++w)E[w]=p[I++]|p[I++]<<8|p[I++]<<16|p[I++]<<24;p=T.g[0],I=T.g[1],w=T.g[2];var P=T.g[3],y=p+(P^I&(w^P))+E[0]+3614090360&4294967295;p=I+(y<<7&4294967295|y>>>25),y=P+(w^p&(I^w))+E[1]+3905402710&4294967295,P=p+(y<<12&4294967295|y>>>20),y=w+(I^P&(p^I))+E[2]+606105819&4294967295,w=P+(y<<17&4294967295|y>>>15),y=I+(p^w&(P^p))+E[3]+3250441966&4294967295,I=w+(y<<22&4294967295|y>>>10),y=p+(P^I&(w^P))+E[4]+4118548399&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(w^p&(I^w))+E[5]+1200080426&4294967295,P=p+(y<<12&4294967295|y>>>20),y=w+(I^P&(p^I))+E[6]+2821735955&4294967295,w=P+(y<<17&4294967295|y>>>15),y=I+(p^w&(P^p))+E[7]+4249261313&4294967295,I=w+(y<<22&4294967295|y>>>10),y=p+(P^I&(w^P))+E[8]+1770035416&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(w^p&(I^w))+E[9]+2336552879&4294967295,P=p+(y<<12&4294967295|y>>>20),y=w+(I^P&(p^I))+E[10]+4294925233&4294967295,w=P+(y<<17&4294967295|y>>>15),y=I+(p^w&(P^p))+E[11]+2304563134&4294967295,I=w+(y<<22&4294967295|y>>>10),y=p+(P^I&(w^P))+E[12]+1804603682&4294967295,p=I+(y<<7&4294967295|y>>>25),y=P+(w^p&(I^w))+E[13]+4254626195&4294967295,P=p+(y<<12&4294967295|y>>>20),y=w+(I^P&(p^I))+E[14]+2792965006&4294967295,w=P+(y<<17&4294967295|y>>>15),y=I+(p^w&(P^p))+E[15]+1236535329&4294967295,I=w+(y<<22&4294967295|y>>>10),y=p+(w^P&(I^w))+E[1]+4129170786&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^w&(p^I))+E[6]+3225465664&4294967295,P=p+(y<<9&4294967295|y>>>23),y=w+(p^I&(P^p))+E[11]+643717713&4294967295,w=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(w^P))+E[0]+3921069994&4294967295,I=w+(y<<20&4294967295|y>>>12),y=p+(w^P&(I^w))+E[5]+3593408605&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^w&(p^I))+E[10]+38016083&4294967295,P=p+(y<<9&4294967295|y>>>23),y=w+(p^I&(P^p))+E[15]+3634488961&4294967295,w=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(w^P))+E[4]+3889429448&4294967295,I=w+(y<<20&4294967295|y>>>12),y=p+(w^P&(I^w))+E[9]+568446438&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^w&(p^I))+E[14]+3275163606&4294967295,P=p+(y<<9&4294967295|y>>>23),y=w+(p^I&(P^p))+E[3]+4107603335&4294967295,w=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(w^P))+E[8]+1163531501&4294967295,I=w+(y<<20&4294967295|y>>>12),y=p+(w^P&(I^w))+E[13]+2850285829&4294967295,p=I+(y<<5&4294967295|y>>>27),y=P+(I^w&(p^I))+E[2]+4243563512&4294967295,P=p+(y<<9&4294967295|y>>>23),y=w+(p^I&(P^p))+E[7]+1735328473&4294967295,w=P+(y<<14&4294967295|y>>>18),y=I+(P^p&(w^P))+E[12]+2368359562&4294967295,I=w+(y<<20&4294967295|y>>>12),y=p+(I^w^P)+E[5]+4294588738&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^w)+E[8]+2272392833&4294967295,P=p+(y<<11&4294967295|y>>>21),y=w+(P^p^I)+E[11]+1839030562&4294967295,w=P+(y<<16&4294967295|y>>>16),y=I+(w^P^p)+E[14]+4259657740&4294967295,I=w+(y<<23&4294967295|y>>>9),y=p+(I^w^P)+E[1]+2763975236&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^w)+E[4]+1272893353&4294967295,P=p+(y<<11&4294967295|y>>>21),y=w+(P^p^I)+E[7]+4139469664&4294967295,w=P+(y<<16&4294967295|y>>>16),y=I+(w^P^p)+E[10]+3200236656&4294967295,I=w+(y<<23&4294967295|y>>>9),y=p+(I^w^P)+E[13]+681279174&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^w)+E[0]+3936430074&4294967295,P=p+(y<<11&4294967295|y>>>21),y=w+(P^p^I)+E[3]+3572445317&4294967295,w=P+(y<<16&4294967295|y>>>16),y=I+(w^P^p)+E[6]+76029189&4294967295,I=w+(y<<23&4294967295|y>>>9),y=p+(I^w^P)+E[9]+3654602809&4294967295,p=I+(y<<4&4294967295|y>>>28),y=P+(p^I^w)+E[12]+3873151461&4294967295,P=p+(y<<11&4294967295|y>>>21),y=w+(P^p^I)+E[15]+530742520&4294967295,w=P+(y<<16&4294967295|y>>>16),y=I+(w^P^p)+E[2]+3299628645&4294967295,I=w+(y<<23&4294967295|y>>>9),y=p+(w^(I|~P))+E[0]+4096336452&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~w))+E[7]+1126891415&4294967295,P=p+(y<<10&4294967295|y>>>22),y=w+(p^(P|~I))+E[14]+2878612391&4294967295,w=P+(y<<15&4294967295|y>>>17),y=I+(P^(w|~p))+E[5]+4237533241&4294967295,I=w+(y<<21&4294967295|y>>>11),y=p+(w^(I|~P))+E[12]+1700485571&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~w))+E[3]+2399980690&4294967295,P=p+(y<<10&4294967295|y>>>22),y=w+(p^(P|~I))+E[10]+4293915773&4294967295,w=P+(y<<15&4294967295|y>>>17),y=I+(P^(w|~p))+E[1]+2240044497&4294967295,I=w+(y<<21&4294967295|y>>>11),y=p+(w^(I|~P))+E[8]+1873313359&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~w))+E[15]+4264355552&4294967295,P=p+(y<<10&4294967295|y>>>22),y=w+(p^(P|~I))+E[6]+2734768916&4294967295,w=P+(y<<15&4294967295|y>>>17),y=I+(P^(w|~p))+E[13]+1309151649&4294967295,I=w+(y<<21&4294967295|y>>>11),y=p+(w^(I|~P))+E[4]+4149444226&4294967295,p=I+(y<<6&4294967295|y>>>26),y=P+(I^(p|~w))+E[11]+3174756917&4294967295,P=p+(y<<10&4294967295|y>>>22),y=w+(p^(P|~I))+E[2]+718787259&4294967295,w=P+(y<<15&4294967295|y>>>17),y=I+(P^(w|~p))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+P&4294967295}n.prototype.u=function(T,p){p===void 0&&(p=T.length);for(var I=p-this.blockSize,E=this.B,w=this.h,P=0;P<p;){if(w==0)for(;P<=I;)s(this,T,P),P+=this.blockSize;if(typeof T=="string"){for(;P<p;)if(E[w++]=T.charCodeAt(P++),w==this.blockSize){s(this,E),w=0;break}}else for(;P<p;)if(E[w++]=T[P++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=p},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;var I=8*this.o;for(p=T.length-8;p<T.length;++p)T[p]=I&255,I/=256;for(this.u(T),T=Array(16),p=I=0;4>p;++p)for(var E=0;32>E;E+=8)T[I++]=this.g[p]>>>E&255;return T};function i(T,p){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=p(T)}function a(T,p){this.h=p;for(var I=[],E=!0,w=T.length-1;0<=w;w--){var P=T[w]|0;E&&P==p||(I[w]=P,E=!1)}this.g=I}var u={};function c(T){return-128<=T&&128>T?i(T,function(p){return new a([p|0],0>p?-1:0)}):new a([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return g;if(0>T)return D(h(-T));for(var p=[],I=1,E=0;T>=I;E++)p[E]=T/I|0,I*=4294967296;return new a(p,0)}function f(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return D(f(T.substring(1),p));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(p,8)),E=g,w=0;w<T.length;w+=8){var P=Math.min(8,T.length-w),y=parseInt(T.substring(w,w+P),p);8>P?(P=h(Math.pow(p,P)),E=E.j(P).add(h(y))):(E=E.j(I),E=E.add(h(y)))}return E}var g=c(0),_=c(1),S=c(16777216);r=a.prototype,r.m=function(){if(x(this))return-D(this).m();for(var T=0,p=1,I=0;I<this.g.length;I++){var E=this.i(I);T+=(0<=E?E:4294967296+E)*p,p*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(x(this))return"-"+D(this).toString(T);for(var p=h(Math.pow(T,6)),I=this,E="";;){var w=X(I,p).g;I=U(I,w.j(p));var P=((0<I.g.length?I.g[0]:I.h)>>>0).toString(T);if(I=w,C(I))return P+E;for(;6>P.length;)P="0"+P;E=P+E}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function x(T){return T.h==-1}r.l=function(T){return T=U(this,T),x(T)?-1:C(T)?0:1};function D(T){for(var p=T.g.length,I=[],E=0;E<p;E++)I[E]=~T.g[E];return new a(I,~T.h).add(_)}r.abs=function(){return x(this)?D(this):this},r.add=function(T){for(var p=Math.max(this.g.length,T.g.length),I=[],E=0,w=0;w<=p;w++){var P=E+(this.i(w)&65535)+(T.i(w)&65535),y=(P>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);E=y>>>16,P&=65535,y&=65535,I[w]=y<<16|P}return new a(I,I[I.length-1]&-2147483648?-1:0)};function U(T,p){return T.add(D(p))}r.j=function(T){if(C(this)||C(T))return g;if(x(this))return x(T)?D(this).j(D(T)):D(D(this).j(T));if(x(T))return D(this.j(D(T)));if(0>this.l(S)&&0>T.l(S))return h(this.m()*T.m());for(var p=this.g.length+T.g.length,I=[],E=0;E<2*p;E++)I[E]=0;for(E=0;E<this.g.length;E++)for(var w=0;w<T.g.length;w++){var P=this.i(E)>>>16,y=this.i(E)&65535,ie=T.i(w)>>>16,fr=T.i(w)&65535;I[2*E+2*w]+=y*fr,j(I,2*E+2*w),I[2*E+2*w+1]+=P*fr,j(I,2*E+2*w+1),I[2*E+2*w+1]+=y*ie,j(I,2*E+2*w+1),I[2*E+2*w+2]+=P*ie,j(I,2*E+2*w+2)}for(E=0;E<p;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=p;E<2*p;E++)I[E]=0;return new a(I,0)};function j(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function q(T,p){this.g=T,this.h=p}function X(T,p){if(C(p))throw Error("division by zero");if(C(T))return new q(g,g);if(x(T))return p=X(D(T),p),new q(D(p.g),D(p.h));if(x(p))return p=X(T,D(p)),new q(D(p.g),p.h);if(30<T.g.length){if(x(T)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var I=_,E=p;0>=E.l(T);)I=nt(I),E=nt(E);var w=H(I,1),P=H(E,1);for(E=H(E,2),I=H(I,2);!C(E);){var y=P.add(E);0>=y.l(T)&&(w=w.add(I),P=y),E=H(E,1),I=H(I,1)}return p=U(T,w.j(p)),new q(w,p)}for(w=g;0<=T.l(p);){for(I=Math.max(1,Math.floor(T.m()/p.m())),E=Math.ceil(Math.log(I)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),P=h(I),y=P.j(p);x(y)||0<y.l(T);)I-=E,P=h(I),y=P.j(p);C(P)&&(P=_),w=w.add(P),T=U(T,y)}return new q(w,T)}r.A=function(T){return X(this,T).h},r.and=function(T){for(var p=Math.max(this.g.length,T.g.length),I=[],E=0;E<p;E++)I[E]=this.i(E)&T.i(E);return new a(I,this.h&T.h)},r.or=function(T){for(var p=Math.max(this.g.length,T.g.length),I=[],E=0;E<p;E++)I[E]=this.i(E)|T.i(E);return new a(I,this.h|T.h)},r.xor=function(T){for(var p=Math.max(this.g.length,T.g.length),I=[],E=0;E<p;E++)I[E]=this.i(E)^T.i(E);return new a(I,this.h^T.h)};function nt(T){for(var p=T.g.length+1,I=[],E=0;E<p;E++)I[E]=T.i(E)<<1|T.i(E-1)>>>31;return new a(I,T.h)}function H(T,p){var I=p>>5;p%=32;for(var E=T.g.length-I,w=[],P=0;P<E;P++)w[P]=0<p?T.i(P+I)>>>p|T.i(P+I+1)<<32-p:T.i(P+I);return new a(w,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Gl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ve=a}).apply(typeof fc<"u"?fc:typeof self<"u"?self:typeof window<"u"?window:{});var Us=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zl,Mr,Kl,Hs,Co,Ql,$l,Wl;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Us=="object"&&Us];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,l){if(l)t:{var d=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var v=o[m];if(!(v in d))break t;d=d[v]}o=o[o.length-1],m=d[o],l=l(m),l!=m&&l!=null&&t(d,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var d=0,m=!1,v={next:function(){if(!m&&d<o.length){var V=d++;return{value:l(V,o[V]),done:!1}}return m=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function c(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function g(o,l,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,m),o.apply(l,v)}}return function(){return o.apply(l,arguments)}}function _(o,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,_.apply(null,arguments)}function S(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,v,V){for(var F=Array(arguments.length-2),rt=2;rt<arguments.length;rt++)F[rt-2]=arguments[rt];return l.prototype[v].apply(m,F)}}function x(o){const l=o.length;if(0<l){const d=Array(l);for(let m=0;m<l;m++)d[m]=o[m];return d}return[]}function D(o,l){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(c(m)){const v=o.length||0,V=m.length||0;o.length=v+V;for(let F=0;F<V;F++)o[v+F]=m[F]}else o.push(m)}}class U{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(o){return/^[\s\xa0]*$/.test(o)}function q(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function X(o){return X[" "](o),o}X[" "]=function(){};var nt=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function H(o,l,d){for(const m in o)l.call(d,o[m],m,o)}function T(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function p(o){const l={};for(const d in o)l[d]=o[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,l){let d,m;for(let v=1;v<arguments.length;v++){m=arguments[v];for(d in m)o[d]=m[d];for(let V=0;V<I.length;V++)d=I[V],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function w(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function P(o){u.setTimeout(()=>{throw o},0)}function y(){var o=Ji;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class ie{constructor(){this.h=this.g=null}add(l,d){const m=fr.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var fr=new U(()=>new Cf,o=>o.reset());class Cf{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let mr,gr=!1,Ji=new ie,du=()=>{const o=u.Promise.resolve(void 0);mr=()=>{o.then(xf)}};var xf=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(d){P(d)}var l=fr;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}gr=!1};function pe(){this.s=this.s,this.C=this.C}pe.prototype.s=!1,pe.prototype.ma=function(){this.s||(this.s=!0,this.N())},pe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function St(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}St.prototype.h=function(){this.defaultPrevented=!0};var Df=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return o})();function pr(o,l){if(St.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(nt){t:{try{X(l.nodeName);var v=!0;break t}catch{}v=!1}v||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Nf[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&pr.aa.h.call(this)}}C(pr,St);var Nf={2:"touch",3:"pen",4:"mouse"};pr.prototype.h=function(){pr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ws="closure_listenable_"+(1e6*Math.random()|0),kf=0;function Mf(o,l,d,m,v){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=v,this.key=++kf,this.da=this.fa=!1}function As(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function vs(o){this.src=o,this.g={},this.h=0}vs.prototype.add=function(o,l,d,m,v){var V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);var F=Yi(o,l,m,v);return-1<F?(l=o[F],d||(l.fa=!1)):(l=new Mf(l,this.src,V,!!m,v),l.fa=d,o.push(l)),l};function Xi(o,l){var d=l.type;if(d in o.g){var m=o.g[d],v=Array.prototype.indexOf.call(m,l,void 0),V;(V=0<=v)&&Array.prototype.splice.call(m,v,1),V&&(As(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Yi(o,l,d,m){for(var v=0;v<o.length;++v){var V=o[v];if(!V.da&&V.listener==l&&V.capture==!!d&&V.ha==m)return v}return-1}var Zi="closure_lm_"+(1e6*Math.random()|0),to={};function fu(o,l,d,m,v){if(Array.isArray(l)){for(var V=0;V<l.length;V++)fu(o,l[V],d,m,v);return null}return d=pu(d),o&&o[ws]?o.K(l,d,h(m)?!!m.capture:!1,v):Ff(o,l,d,!1,m,v)}function Ff(o,l,d,m,v,V){if(!l)throw Error("Invalid event type");var F=h(v)?!!v.capture:!!v,rt=no(o);if(rt||(o[Zi]=rt=new vs(o)),d=rt.add(l,d,m,F,V),d.proxy)return d;if(m=Of(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)Df||(v=F),v===void 0&&(v=!1),o.addEventListener(l.toString(),m,v);else if(o.attachEvent)o.attachEvent(gu(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Of(){function o(d){return l.call(o.src,o.listener,d)}const l=Lf;return o}function mu(o,l,d,m,v){if(Array.isArray(l))for(var V=0;V<l.length;V++)mu(o,l[V],d,m,v);else m=h(m)?!!m.capture:!!m,d=pu(d),o&&o[ws]?(o=o.i,l=String(l).toString(),l in o.g&&(V=o.g[l],d=Yi(V,d,m,v),-1<d&&(As(V[d]),Array.prototype.splice.call(V,d,1),V.length==0&&(delete o.g[l],o.h--)))):o&&(o=no(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Yi(l,d,m,v)),(d=-1<o?l[o]:null)&&eo(d))}function eo(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[ws])Xi(l.i,o);else{var d=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(d,m,o.capture):l.detachEvent?l.detachEvent(gu(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=no(l))?(Xi(d,o),d.h==0&&(d.src=null,l[Zi]=null)):As(o)}}}function gu(o){return o in to?to[o]:to[o]="on"+o}function Lf(o,l){if(o.da)o=!0;else{l=new pr(l,this);var d=o.listener,m=o.ha||o.src;o.fa&&eo(o),o=d.call(m,l)}return o}function no(o){return o=o[Zi],o instanceof vs?o:null}var ro="__closure_events_fn_"+(1e9*Math.random()>>>0);function pu(o){return typeof o=="function"?o:(o[ro]||(o[ro]=function(l){return o.handleEvent(l)}),o[ro])}function Vt(){pe.call(this),this.i=new vs(this),this.M=this,this.F=null}C(Vt,pe),Vt.prototype[ws]=!0,Vt.prototype.removeEventListener=function(o,l,d,m){mu(this,o,l,d,m)};function Mt(o,l){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new St(l,o);else if(l instanceof St)l.target=l.target||o;else{var v=l;l=new St(m,o),E(l,v)}if(v=!0,d)for(var V=d.length-1;0<=V;V--){var F=l.g=d[V];v=Rs(F,m,!0,l)&&v}if(F=l.g=o,v=Rs(F,m,!0,l)&&v,v=Rs(F,m,!1,l)&&v,d)for(V=0;V<d.length;V++)F=l.g=d[V],v=Rs(F,m,!1,l)&&v}Vt.prototype.N=function(){if(Vt.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],m=0;m<d.length;m++)As(d[m]);delete o.g[l],o.h--}}this.F=null},Vt.prototype.K=function(o,l,d,m){return this.i.add(String(o),l,!1,d,m)},Vt.prototype.L=function(o,l,d,m){return this.i.add(String(o),l,!0,d,m)};function Rs(o,l,d,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var v=!0,V=0;V<l.length;++V){var F=l[V];if(F&&!F.da&&F.capture==d){var rt=F.listener,vt=F.ha||F.src;F.fa&&Xi(o.i,F),v=rt.call(vt,m)!==!1&&v}}return v&&!m.defaultPrevented}function _u(o,l,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(o,l||0)}function yu(o){o.g=_u(()=>{o.g=null,o.i&&(o.i=!1,yu(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class qf extends pe{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:yu(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _r(o){pe.call(this),this.h=o,this.g={}}C(_r,pe);var Iu=[];function Tu(o){H(o.g,function(l,d){this.g.hasOwnProperty(d)&&eo(l)},o),o.g={}}_r.prototype.N=function(){_r.aa.N.call(this),Tu(this)},_r.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var so=u.JSON.stringify,Bf=u.JSON.parse,Uf=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function io(){}io.prototype.h=null;function Eu(o){return o.h||(o.h=o.i())}function wu(){}var yr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function oo(){St.call(this,"d")}C(oo,St);function ao(){St.call(this,"c")}C(ao,St);var Ge={},Au=null;function Ps(){return Au=Au||new Vt}Ge.La="serverreachability";function vu(o){St.call(this,Ge.La,o)}C(vu,St);function Ir(o){const l=Ps();Mt(l,new vu(l))}Ge.STAT_EVENT="statevent";function Ru(o,l){St.call(this,Ge.STAT_EVENT,o),this.stat=l}C(Ru,St);function Ft(o){const l=Ps();Mt(l,new Ru(l,o))}Ge.Ma="timingevent";function Pu(o,l){St.call(this,Ge.Ma,o),this.size=l}C(Pu,St);function Tr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},l)}function Er(){this.g=!0}Er.prototype.xa=function(){this.g=!1};function jf(o,l,d,m,v,V){o.info(function(){if(o.g)if(V)for(var F="",rt=V.split("&"),vt=0;vt<rt.length;vt++){var J=rt[vt].split("=");if(1<J.length){var bt=J[0];J=J[1];var Ct=bt.split("_");F=2<=Ct.length&&Ct[1]=="type"?F+(bt+"="+J+"&"):F+(bt+"=redacted&")}}else F=null;else F=V;return"XMLHTTP REQ ("+m+") [attempt "+v+"]: "+l+`
`+d+`
`+F})}function Gf(o,l,d,m,v,V,F){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+v+"]: "+l+`
`+d+`
`+V+" "+F})}function En(o,l,d,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Kf(o,d)+(m?" "+m:"")})}function zf(o,l){o.info(function(){return"TIMEOUT: "+l})}Er.prototype.info=function(){};function Kf(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var v=m[1];if(Array.isArray(v)&&!(1>v.length)){var V=v[0];if(V!="noop"&&V!="stop"&&V!="close")for(var F=1;F<v.length;F++)v[F]=""}}}}return so(d)}catch{return l}}var Ss={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Su={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},uo;function Vs(){}C(Vs,io),Vs.prototype.g=function(){return new XMLHttpRequest},Vs.prototype.i=function(){return{}},uo=new Vs;function _e(o,l,d,m){this.j=o,this.i=l,this.l=d,this.R=m||1,this.U=new _r(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vu}function Vu(){this.i=null,this.g="",this.h=!1}var bu={},co={};function lo(o,l,d){o.L=1,o.v=Ds(oe(l)),o.m=d,o.P=!0,Cu(o,null)}function Cu(o,l){o.F=Date.now(),bs(o),o.A=oe(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),zu(d.i,"t",m),o.C=0,d=o.j.J,o.h=new Vu,o.g=uc(o.j,d?l:null,!o.m),0<o.O&&(o.M=new qf(_(o.Y,o,o.g),o.O)),l=o.U,d=o.g,m=o.ca;var v="readystatechange";Array.isArray(v)||(v&&(Iu[0]=v.toString()),v=Iu);for(var V=0;V<v.length;V++){var F=fu(d,v[V],m||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=o.H?p(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Ir(),jf(o.i,o.u,o.A,o.l,o.R,o.m)}_e.prototype.ca=function(o){o=o.target;const l=this.M;l&&ae(o)==3?l.j():this.Y(o)},_e.prototype.Y=function(o){try{if(o==this.g)t:{const Ct=ae(this.g);var l=this.g.Ba();const vn=this.g.Z();if(!(3>Ct)&&(Ct!=3||this.g&&(this.h.h||this.g.oa()||Xu(this.g)))){this.J||Ct!=4||l==7||(l==8||0>=vn?Ir(3):Ir(2)),ho(this);var d=this.g.Z();this.X=d;e:if(xu(this)){var m=Xu(this.g);o="";var v=m.length,V=ae(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ze(this),wr(this);var F="";break e}this.h.i=new u.TextDecoder}for(l=0;l<v;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(V&&l==v-1)});m.length=0,this.h.g+=o,this.C=0,F=this.h.g}else F=this.g.oa();if(this.o=d==200,Gf(this.i,this.u,this.A,this.l,this.R,Ct,d),this.o){if(this.T&&!this.K){e:{if(this.g){var rt,vt=this.g;if((rt=vt.g?vt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(rt)){var J=rt;break e}}J=null}if(d=J)En(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,fo(this,d);else{this.o=!1,this.s=3,Ft(12),ze(this),wr(this);break t}}if(this.P){d=!0;let $t;for(;!this.J&&this.C<F.length;)if($t=Qf(this,F),$t==co){Ct==4&&(this.s=4,Ft(14),d=!1),En(this.i,this.l,null,"[Incomplete Response]");break}else if($t==bu){this.s=4,Ft(15),En(this.i,this.l,F,"[Invalid Chunk]"),d=!1;break}else En(this.i,this.l,$t,null),fo(this,$t);if(xu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ct!=4||F.length!=0||this.h.h||(this.s=1,Ft(16),d=!1),this.o=this.o&&d,!d)En(this.i,this.l,F,"[Invalid Chunked Response]"),ze(this),wr(this);else if(0<F.length&&!this.W){this.W=!0;var bt=this.j;bt.g==this&&bt.ba&&!bt.M&&(bt.j.info("Great, no buffering proxy detected. Bytes received: "+F.length),Io(bt),bt.M=!0,Ft(11))}}else En(this.i,this.l,F,null),fo(this,F);Ct==4&&ze(this),this.o&&!this.J&&(Ct==4?sc(this.j,this):(this.o=!1,bs(this)))}else cm(this.g),d==400&&0<F.indexOf("Unknown SID")?(this.s=3,Ft(12)):(this.s=0,Ft(13)),ze(this),wr(this)}}}catch{}finally{}};function xu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Qf(o,l){var d=o.C,m=l.indexOf(`
`,d);return m==-1?co:(d=Number(l.substring(d,m)),isNaN(d)?bu:(m+=1,m+d>l.length?co:(l=l.slice(m,m+d),o.C=m+d,l)))}_e.prototype.cancel=function(){this.J=!0,ze(this)};function bs(o){o.S=Date.now()+o.I,Du(o,o.I)}function Du(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Tr(_(o.ba,o),l)}function ho(o){o.B&&(u.clearTimeout(o.B),o.B=null)}_e.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(zf(this.i,this.A),this.L!=2&&(Ir(),Ft(17)),ze(this),this.s=2,wr(this)):Du(this,this.S-o)};function wr(o){o.j.G==0||o.J||sc(o.j,o)}function ze(o){ho(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Tu(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function fo(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||mo(d.h,o))){if(!o.K&&mo(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var v=m;if(v[0]==0){t:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Ls(d),Fs(d);else break t;yo(d),Ft(18)}}else d.za=v[1],0<d.za-d.T&&37500>v[2]&&d.F&&d.v==0&&!d.C&&(d.C=Tr(_(d.Za,d),6e3));if(1>=Mu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Qe(d,11)}else if((o.K||d.g==o)&&Ls(d),!j(l))for(v=d.Da.g.parse(l),l=0;l<v.length;l++){let J=v[l];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const bt=J[3];bt!=null&&(d.la=bt,d.j.info("VER="+d.la));const Ct=J[4];Ct!=null&&(d.Aa=Ct,d.j.info("SVER="+d.Aa));const vn=J[5];vn!=null&&typeof vn=="number"&&0<vn&&(m=1.5*vn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const $t=o.g;if($t){const Bs=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Bs){var V=m.h;V.g||Bs.indexOf("spdy")==-1&&Bs.indexOf("quic")==-1&&Bs.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(go(V,V.h),V.h=null))}if(m.D){const To=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;To&&(m.ya=To,ot(m.I,m.D,To))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var F=o;if(m.qa=ac(m,m.J?m.ia:null,m.W),F.K){Fu(m.h,F);var rt=F,vt=m.L;vt&&(rt.I=vt),rt.B&&(ho(rt),bs(rt)),m.g=F}else nc(m);0<d.i.length&&Os(d)}else J[0]!="stop"&&J[0]!="close"||Qe(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?Qe(d,7):_o(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}Ir(4)}catch{}}var $f=class{constructor(o,l){this.g=o,this.map=l}};function Nu(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ku(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Mu(o){return o.h?1:o.g?o.g.size:0}function mo(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function go(o,l){o.g?o.g.add(l):o.h=l}function Fu(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Nu.prototype.cancel=function(){if(this.i=Ou(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ou(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return x(o.i)}function Wf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var l=[],d=o.length,m=0;m<d;m++)l.push(o[m]);return l}l=[],d=0;for(m in o)l[d++]=o[m];return l}function Hf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const m in o)l[d++]=m;return l}}}function Lu(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=Hf(o),m=Wf(o),v=m.length,V=0;V<v;V++)l.call(void 0,m[V],d&&d[V],o)}var qu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jf(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),v=null;if(0<=m){var V=o[d].substring(0,m);v=o[d].substring(m+1)}else V=o[d];l(V,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Ke(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Ke){this.h=o.h,Cs(this,o.j),this.o=o.o,this.g=o.g,xs(this,o.s),this.l=o.l;var l=o.i,d=new Rr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Bu(this,d),this.m=o.m}else o&&(l=String(o).match(qu))?(this.h=!1,Cs(this,l[1]||"",!0),this.o=Ar(l[2]||""),this.g=Ar(l[3]||"",!0),xs(this,l[4]),this.l=Ar(l[5]||"",!0),Bu(this,l[6]||"",!0),this.m=Ar(l[7]||"")):(this.h=!1,this.i=new Rr(null,this.h))}Ke.prototype.toString=function(){var o=[],l=this.j;l&&o.push(vr(l,Uu,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(vr(l,Uu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(vr(d,d.charAt(0)=="/"?Zf:Yf,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",vr(d,em)),o.join("")};function oe(o){return new Ke(o)}function Cs(o,l,d){o.j=d?Ar(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function xs(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function Bu(o,l,d){l instanceof Rr?(o.i=l,nm(o.i,o.h)):(d||(l=vr(l,tm)),o.i=new Rr(l,o.h))}function ot(o,l,d){o.i.set(l,d)}function Ds(o){return ot(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ar(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function vr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Xf),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Xf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Uu=/[#\/\?@]/g,Yf=/[#\?:]/g,Zf=/[#\?]/g,tm=/[#\?@]/g,em=/#/g;function Rr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function ye(o){o.g||(o.g=new Map,o.h=0,o.i&&Jf(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Rr.prototype,r.add=function(o,l){ye(this),this.i=null,o=wn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function ju(o,l){ye(o),l=wn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Gu(o,l){return ye(o),l=wn(o,l),o.g.has(l)}r.forEach=function(o,l){ye(this),this.g.forEach(function(d,m){d.forEach(function(v){o.call(l,v,m,this)},this)},this)},r.na=function(){ye(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let m=0;m<l.length;m++){const v=o[m];for(let V=0;V<v.length;V++)d.push(l[m])}return d},r.V=function(o){ye(this);let l=[];if(typeof o=="string")Gu(this,o)&&(l=l.concat(this.g.get(wn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},r.set=function(o,l){return ye(this),this.i=null,o=wn(this,o),Gu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function zu(o,l,d){ju(o,l),0<d.length&&(o.i=null,o.g.set(wn(o,l),x(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var m=l[d];const V=encodeURIComponent(String(m)),F=this.V(m);for(m=0;m<F.length;m++){var v=V;F[m]!==""&&(v+="="+encodeURIComponent(String(F[m]))),o.push(v)}}return this.i=o.join("&")};function wn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function nm(o,l){l&&!o.j&&(ye(o),o.i=null,o.g.forEach(function(d,m){var v=m.toLowerCase();m!=v&&(ju(this,m),zu(this,v,d))},o)),o.j=l}function rm(o,l){const d=new Er;if(u.Image){const m=new Image;m.onload=S(Ie,d,"TestLoadImage: loaded",!0,l,m),m.onerror=S(Ie,d,"TestLoadImage: error",!1,l,m),m.onabort=S(Ie,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=S(Ie,d,"TestLoadImage: timeout",!1,l,m),u.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function sm(o,l){const d=new Er,m=new AbortController,v=setTimeout(()=>{m.abort(),Ie(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(V=>{clearTimeout(v),V.ok?Ie(d,"TestPingServer: ok",!0,l):Ie(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(v),Ie(d,"TestPingServer: error",!1,l)})}function Ie(o,l,d,m,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),m(d)}catch{}}function im(){this.g=new Uf}function om(o,l,d){const m=d||"";try{Lu(o,function(v,V){let F=v;h(v)&&(F=so(v)),l.push(m+V+"="+encodeURIComponent(F))})}catch(v){throw l.push(m+"type="+encodeURIComponent("_badmap")),v}}function Ns(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Ns,io),Ns.prototype.g=function(){return new ks(this.l,this.j)},Ns.prototype.i=(function(o){return function(){return o}})({});function ks(o,l){Vt.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(ks,Vt),r=ks.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Sr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Pr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Sr(this)),this.g&&(this.readyState=3,Sr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ku(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ku(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Pr(this):Sr(this),this.readyState==3&&Ku(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Pr(this))},r.Qa=function(o){this.g&&(this.response=o,Pr(this))},r.ga=function(){this.g&&Pr(this)};function Pr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Sr(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Sr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ks.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Qu(o){let l="";return H(o,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function po(o,l,d){t:{for(m in d){var m=!1;break t}m=!0}m||(d=Qu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ot(o,l,d))}function dt(o){Vt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(dt,Vt);var am=/^https?$/i,um=["POST","PUT"];r=dt.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():uo.g(),this.v=this.o?Eu(this.o):Eu(uo),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(V){$u(this,V);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var v in m)d.set(v,m[v]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const V of m.keys())d.set(V,m.get(V));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(V=>V.toLowerCase()=="content-type"),v=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(um,l,void 0))||m||v||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,F]of d)this.g.setRequestHeader(V,F);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ju(this),this.u=!0,this.g.send(o),this.u=!1}catch(V){$u(this,V)}};function $u(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Wu(o),Ms(o)}function Wu(o){o.A||(o.A=!0,Mt(o,"complete"),Mt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Mt(this,"complete"),Mt(this,"abort"),Ms(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ms(this,!0)),dt.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Hu(this):this.bb())},r.bb=function(){Hu(this)};function Hu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ae(o)!=4||o.Z()!=2)){if(o.u&&ae(o)==4)_u(o.Ea,0,o);else if(Mt(o,"readystatechange"),ae(o)==4){o.h=!1;try{const F=o.Z();t:switch(F){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var m;if(m=F===0){var v=String(o.D).match(qu)[1]||null;!v&&u.self&&u.self.location&&(v=u.self.location.protocol.slice(0,-1)),m=!am.test(v?v.toLowerCase():"")}d=m}if(d)Mt(o,"complete"),Mt(o,"success");else{o.m=6;try{var V=2<ae(o)?o.g.statusText:""}catch{V=""}o.l=V+" ["+o.Z()+"]",Wu(o)}}finally{Ms(o)}}}}function Ms(o,l){if(o.g){Ju(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Mt(o,"ready");try{d.onreadystatechange=m}catch{}}}function Ju(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function ae(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<ae(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Bf(l)}};function Xu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function cm(o){const l={};o=(o.g&&2<=ae(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(j(o[m]))continue;var d=w(o[m]);const v=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const V=l[v]||[];l[v]=V,V.push(d)}T(l,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Yu(o){this.Aa=0,this.i=[],this.j=new Er,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vr("baseRetryDelayMs",5e3,o),this.cb=Vr("retryDelaySeedMs",1e4,o),this.Wa=Vr("forwardChannelMaxRetries",2,o),this.wa=Vr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Nu(o&&o.concurrentRequestLimit),this.Da=new im,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Yu.prototype,r.la=8,r.G=1,r.connect=function(o,l,d,m){Ft(0),this.W=o,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=ac(this,null,this.W),Os(this)};function _o(o){if(Zu(o),o.G==3){var l=o.U++,d=oe(o.I);if(ot(d,"SID",o.K),ot(d,"RID",l),ot(d,"TYPE","terminate"),br(o,d),l=new _e(o,o.j,l),l.L=2,l.v=Ds(oe(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=uc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),bs(l)}oc(o)}function Fs(o){o.g&&(Io(o),o.g.cancel(),o.g=null)}function Zu(o){Fs(o),o.u&&(u.clearTimeout(o.u),o.u=null),Ls(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Os(o){if(!ku(o.h)&&!o.s){o.s=!0;var l=o.Ga;mr||du(),gr||(mr(),gr=!0),Ji.add(l,o),o.B=0}}function lm(o,l){return Mu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Tr(_(o.Ga,o,l),ic(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const v=new _e(this,this.j,o);let V=this.o;if(this.S&&(V?(V=p(V),E(V,this.S)):V=this.S),this.m!==null||this.O||(v.H=V,V=null),this.P)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=ec(this,v,l),d=oe(this.I),ot(d,"RID",o),ot(d,"CVER",22),this.D&&ot(d,"X-HTTP-Session-Id",this.D),br(this,d),V&&(this.O?l="headers="+encodeURIComponent(String(Qu(V)))+"&"+l:this.m&&po(d,this.m,V)),go(this.h,v),this.Ua&&ot(d,"TYPE","init"),this.P?(ot(d,"$req",l),ot(d,"SID","null"),v.T=!0,lo(v,d,null)):lo(v,d,l),this.G=2}}else this.G==3&&(o?tc(this,o):this.i.length==0||ku(this.h)||tc(this))};function tc(o,l){var d;l?d=l.l:d=o.U++;const m=oe(o.I);ot(m,"SID",o.K),ot(m,"RID",d),ot(m,"AID",o.T),br(o,m),o.m&&o.o&&po(m,o.m,o.o),d=new _e(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=ec(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),go(o.h,d),lo(d,m,l)}function br(o,l){o.H&&H(o.H,function(d,m){ot(l,m,d)}),o.l&&Lu({},function(d,m){ot(l,m,d)})}function ec(o,l,d){d=Math.min(o.i.length,d);var m=o.l?_(o.l.Na,o.l,o):null;t:{var v=o.i;let V=-1;for(;;){const F=["count="+d];V==-1?0<d?(V=v[0].g,F.push("ofs="+V)):V=0:F.push("ofs="+V);let rt=!0;for(let vt=0;vt<d;vt++){let J=v[vt].g;const bt=v[vt].map;if(J-=V,0>J)V=Math.max(0,v[vt].g-100),rt=!1;else try{om(bt,F,"req"+J+"_")}catch{m&&m(bt)}}if(rt){m=F.join("&");break t}}}return o=o.i.splice(0,d),l.D=o,m}function nc(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;mr||du(),gr||(mr(),gr=!0),Ji.add(l,o),o.v=0}}function yo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Tr(_(o.Fa,o),ic(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,rc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Tr(_(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ft(10),Fs(this),rc(this))};function Io(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function rc(o){o.g=new _e(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=oe(o.qa);ot(l,"RID","rpc"),ot(l,"SID",o.K),ot(l,"AID",o.T),ot(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&ot(l,"TO",o.ja),ot(l,"TYPE","xmlhttp"),br(o,l),o.m&&o.o&&po(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ds(oe(l)),d.m=null,d.P=!0,Cu(d,o)}r.Za=function(){this.C!=null&&(this.C=null,Fs(this),yo(this),Ft(19))};function Ls(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function sc(o,l){var d=null;if(o.g==l){Ls(o),Io(o),o.g=null;var m=2}else if(mo(o.h,l))d=l.D,Fu(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var v=o.B;m=Ps(),Mt(m,new Pu(m,d)),Os(o)}else nc(o);else if(v=l.s,v==3||v==0&&0<l.X||!(m==1&&lm(o,l)||m==2&&yo(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),v){case 1:Qe(o,5);break;case 4:Qe(o,10);break;case 3:Qe(o,6);break;default:Qe(o,2)}}}function ic(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Qe(o,l){if(o.j.info("Error code "+l),l==2){var d=_(o.fb,o),m=o.Xa;const v=!m;m=new Ke(m||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Cs(m,"https"),Ds(m),v?rm(m.toString(),d):sm(m.toString(),d)}else Ft(2);o.G=0,o.l&&o.l.sa(l),oc(o),Zu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ft(2)):(this.j.info("Failed to ping google.com"),Ft(1))};function oc(o){if(o.G=0,o.ka=[],o.l){const l=Ou(o.h);(l.length!=0||o.i.length!=0)&&(D(o.ka,l),D(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function ac(o,l,d){var m=d instanceof Ke?oe(d):new Ke(d);if(m.g!="")l&&(m.g=l+"."+m.g),xs(m,m.s);else{var v=u.location;m=v.protocol,l=l?l+"."+v.hostname:v.hostname,v=+v.port;var V=new Ke(null);m&&Cs(V,m),l&&(V.g=l),v&&xs(V,v),d&&(V.l=d),m=V}return d=o.D,l=o.ya,d&&l&&ot(m,d,l),ot(m,"VER",o.la),br(o,m),m}function uc(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new dt(new Ns({eb:d})):new dt(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function cc(){}r=cc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function qs(){}qs.prototype.g=function(o,l){return new Bt(o,l)};function Bt(o,l){Vt.call(this),this.g=new Yu(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!j(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new An(this)}C(Bt,Vt),Bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Bt.prototype.close=function(){_o(this.g)},Bt.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=so(o),o=d);l.i.push(new $f(l.Ya++,o)),l.G==3&&Os(l)},Bt.prototype.N=function(){this.g.l=null,delete this.j,_o(this.g),delete this.g,Bt.aa.N.call(this)};function lc(o){oo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){t:{for(const d in l){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(lc,oo);function hc(){ao.call(this),this.status=1}C(hc,ao);function An(o){this.g=o}C(An,cc),An.prototype.ua=function(){Mt(this.g,"a")},An.prototype.ta=function(o){Mt(this.g,new lc(o))},An.prototype.sa=function(o){Mt(this.g,new hc)},An.prototype.ra=function(){Mt(this.g,"b")},qs.prototype.createWebChannel=qs.prototype.g,Bt.prototype.send=Bt.prototype.o,Bt.prototype.open=Bt.prototype.m,Bt.prototype.close=Bt.prototype.close,Wl=function(){return new qs},$l=function(){return Ps()},Ql=Ge,Co={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ss.NO_ERROR=0,Ss.TIMEOUT=8,Ss.HTTP_ERROR=6,Hs=Ss,Su.COMPLETE="complete",Kl=Su,wu.EventType=yr,yr.OPEN="a",yr.CLOSE="b",yr.ERROR="c",yr.MESSAGE="d",Vt.prototype.listen=Vt.prototype.K,Mr=wu,dt.prototype.listenOnce=dt.prototype.L,dt.prototype.getLastError=dt.prototype.Ka,dt.prototype.getLastErrorCode=dt.prototype.Ba,dt.prototype.getStatus=dt.prototype.Z,dt.prototype.getResponseJson=dt.prototype.Oa,dt.prototype.getResponseText=dt.prototype.oa,dt.prototype.send=dt.prototype.ea,dt.prototype.setWithCredentials=dt.prototype.Ha,zl=dt}).apply(typeof Us<"u"?Us:typeof self<"u"?self:typeof window<"u"?window:{});const mc="@firebase/firestore",gc="4.9.1";/**
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
 */class Et{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Et.UNAUTHENTICATED=new Et(null),Et.GOOGLE_CREDENTIALS=new Et("google-credentials-uid"),Et.FIRST_PARTY=new Et("first-party-uid"),Et.MOCK_USER=new Et("mock-user");/**
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
 */let rr="12.2.0";/**
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
 */const Ce=new dm("@firebase/firestore");function xn(){return Ce.logLevel}function my(r){Ce.setLogLevel(r)}function N(r,...t){if(Ce.logLevel<=ue.DEBUG){const e=t.map(ia);Ce.debug(`Firestore (${rr}): ${r}`,...e)}}function mt(r,...t){if(Ce.logLevel<=ue.ERROR){const e=t.map(ia);Ce.error(`Firestore (${rr}): ${r}`,...e)}}function Qt(r,...t){if(Ce.logLevel<=ue.WARN){const e=t.map(ia);Ce.warn(`Firestore (${rr}): ${r}`,...e)}}function ia(r){if(typeof r=="string")return r;try{/**
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
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,Hl(r,n,e)}function Hl(r,t,e){let n=`FIRESTORE (${rr}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw mt(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||Hl(t,s,n)}function gy(r,t){r||O(57014,t)}function M(r,t){return r}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends hm{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class wt{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
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
 */class Jl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class vm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Et.UNAUTHENTICATED)))}shutdown(){}}class Rm{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class Pm{constructor(t){this.t=t,this.currentUser=Et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=c=>this.i!==n?(n=this.i,e(c)):Promise.resolve();let i=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new wt,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wt)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new Jl(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new Et(t)}}class Sm{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=Et.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Vm{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Sm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Et.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class xo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bm{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Am(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>n(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new xo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new xo(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class py{getToken(){return Promise.resolve(new xo(""))}invalidateToken(){}start(t,e){}shutdown(){}}/**
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
 */function Cm(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class oa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Cm(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function G(r,t){return r<t?-1:r>t?1:0}function Do(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return Eo(s)===Eo(i)?G(s,i):Eo(s)?1:-1}return G(r.length,t.length)}const xm=55296,Dm=57343;function Eo(r){const t=r.charCodeAt(0);return t>=xm&&t<=Dm}function On(r,t,e){return r.length===t.length&&r.every(((n,s)=>e(n,t[s])))}function Xl(r){return r+"\0"}/**
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
 */const No="__name__";class Jt{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Jt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Jt?t.forEach((n=>{e.push(n)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Jt.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return G(t.length,e.length)}static compareSegments(t,e){const n=Jt.isNumericId(t),s=Jt.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Jt.extractNumericId(t).compare(Jt.extractNumericId(e)):Do(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ve.fromString(t.substring(4,t.length-2))}}class K extends Jt{construct(t,e,n){return new K(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new b(R.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((s=>s.length>0)))}return new K(e)}static emptyPath(){return new K([])}}const Nm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends Jt{construct(t,e,n){return new ct(t,e,n)}static isValidIdentifier(t){return Nm.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===No}static keyField(){return new ct([No])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new b(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new b(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new b(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new b(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
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
 */class k{constructor(t){this.path=t}static fromPath(t){return new k(K.fromString(t))}static fromName(t){return new k(K.fromString(t).popFirst(5))}static empty(){return new k(K.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&K.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return K.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new K(t.slice()))}}/**
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
 */function aa(r,t,e){if(!e)throw new b(R.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function km(r,t,e,n){if(t===!0&&n===!0)throw new b(R.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function pc(r){if(!k.isDocumentKey(r))throw new b(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function _c(r){if(k.isDocumentKey(r))throw new b(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Yl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function wi(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=(function(n){return n.constructor?n.constructor.name:null})(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function Q(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new b(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=wi(r);throw new b(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function Zl(r,t){if(t<=0)throw new b(R.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
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
 */function _t(r,t){const e={typeString:r};return t&&(e.value=t),e}function gn(r,t){if(!Yl(r))throw new b(R.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new b(R.INVALID_ARGUMENT,e);return!0}/**
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
 */const yc=-62135596800,Ic=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Ic);return new Y(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new b(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new b(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<yc)throw new b(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new b(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ic}_compareTo(t){return this.seconds===t.seconds?G(this.nanoseconds,t.nanoseconds):G(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(gn(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-yc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:_t("string",Y._jsonSchemaVersion),seconds:_t("number"),nanoseconds:_t("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new Y(0,0))}static max(){return new B(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ln=-1;class qn{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function ko(r){return r.fields.find((t=>t.kind===2))}function We(r){return r.fields.filter((t=>t.kind!==2))}function Mm(r,t){let e=G(r.collectionGroup,t.collectionGroup);if(e!==0)return e;for(let n=0;n<Math.min(r.fields.length,t.fields.length);++n)if(e=Fm(r.fields[n],t.fields[n]),e!==0)return e;return G(r.fields.length,t.fields.length)}qn.UNKNOWN_ID=-1;class en{constructor(t,e){this.fieldPath=t,this.kind=e}}function Fm(r,t){const e=ct.comparator(r.fieldPath,t.fieldPath);return e!==0?e:G(r.kind,t.kind)}class Bn{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new Bn(0,Kt.min())}}function th(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Y(e+1,0):new Y(e,n));return new Kt(s,k.empty(),t)}function eh(r){return new Kt(r.readTime,r.key,Ln)}class Kt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Kt(B.min(),k.empty(),Ln)}static max(){return new Kt(B.max(),k.empty(),Ln)}}function ua(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:G(r.largestBatchId,t.largestBatchId))}/**
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
 */const nh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function Oe(r){if(r.code!==R.FAILED_PRECONDITION||r.message!==nh)throw r;N("LocalStore","Unexpectedly lost primary lease")}/**
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
 */const Ut="SimpleDb";class Ai{static open(t,e,n,s){try{return new Ai(e,t.transaction(s,n))}catch(i){throw new qr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new wt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new qr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=ca(n.target.error);this.S.reject(new qr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(N(Ut,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new Lm(e)}}class te{static delete(t){return N(Ut,"Removing database:",t),Je(ym().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!Im())return!1;if(te.F())return!0;const t=oi(),e=te.M(t),n=0<e&&e<10,s=sh(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,te.M(oi())===12.2&&mt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(N(Ut,"Opening database:",this.name),this.db=await new Promise(((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new qr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new b(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new b(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new qr(t,a))},s.onupgradeneeded=i=>{N(Ut,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next((()=>{N(Ut,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}$(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=Ai.open(this.db,t,i?"readonly":"readwrite",n),c=s(u).next((h=>(u.C(),h))).catch((h=>(u.abort(h),A.reject(h)))).toPromise();return c.catch((()=>{})),await u.D,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&a<3;if(N(Ut,"Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function sh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class Om{constructor(t){this.U=t,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(t){this.U=t}done(){this.K=!0}j(t){this.W=t}delete(){return Je(this.U.delete())}}class qr extends b{constructor(t,e){super(R.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Le(r){return r.name==="IndexedDbTransactionError"}class Lm{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(N(Ut,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(N(Ut,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Je(n)}add(t){return N(Ut,"ADD",this.store.name,t,t),Je(this.store.add(t))}get(t){return Je(this.store.get(t)).next((e=>(e===void 0&&(e=null),N(Ut,"GET",this.store.name,t,e),e)))}delete(t){return N(Ut,"DELETE",this.store.name,t),Je(this.store.delete(t))}count(){return N(Ut,"COUNT",this.store.name),Je(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A(((a,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{a(c.target.result)}}))}{const i=this.cursor(n),a=[];return this.H(i,((u,c)=>{a.push(c)})).next((()=>a))}}Y(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A(((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}}))}Z(t,e){N(Ut,"DELETE ALL",this.store.name);const n=this.options(t,e);n.X=!1;const s=this.cursor(n);return this.H(s,((i,a,u)=>u.delete()))}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new A(((n,s)=>{e.onerror=i=>{const a=ca(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next((u=>{u?a.continue():n()})):n()}}))}H(t,e){const n=[];return new A(((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const c=new Om(u),h=e(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch((g=>(c.done(),A.reject(g))));n.push(f)}c.isDone?s():c.G===null?u.continue():u.continue(c.G)}})).next((()=>A.waitFor(n)))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.X?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Je(r){return new A(((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=ca(n.target.error);e(s)}}))}let Tc=!1;function ca(r){const t=te.M(oi());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new b("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Tc||(Tc=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Br="IndexBackfiller";class qm{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){N(Br,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,(async()=>{this.task=null;try{const e=await this.ne.ie();N(Br,`Documents written: ${e}`)}catch(e){Le(e)?N(Br,"Ignoring IndexedDB error during index backfill: ",e):await Oe(e)}await this.re(6e4)}))}}class Bm{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(e=>this.se(e,t)))}se(t,e){const n=new Set;let s=e,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next((a=>{if(a!==null&&!n.has(a))return N(Br,`Processing collection: ${a}`),this.oe(t,a,s).next((u=>{s-=u,n.add(a)}));i=!1})))).next((()=>e-s))}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next((s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next((i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next((()=>this._e(s,i))).next((u=>(N(Br,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u)))).next((()=>a.size))}))))}_e(t,e){let n=t;return e.changes.forEach(((s,i)=>{const a=eh(i);ua(a,n)>0&&(n=a)})),new Kt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class Ot{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ot.ce=-1;/**
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
 */const be=-1;function us(r){return r==null}function $r(r){return r===0&&1/r==-1/0}function ih(r){return typeof r=="number"&&Number.isInteger(r)&&!$r(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const ai="";function Nt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Ec(t)),t=Um(r.get(e),t);return Ec(t)}function Um(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case ai:e+="";break;default:e+=i}}return e}function Ec(r){return r+ai+""}function Yt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===ai&&r.charAt(1)==="",56145,{path:r}),K.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(ai,i);switch((a<0||a>e)&&O(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:O(61167,{path:r})}i=a+2}return new K(n)}/**
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
 */const He="remoteDocuments",cs="owner",Rn="owner",Wr="mutationQueues",jm="userId",Wt="mutations",wc="batchId",tn="userMutationsIndex",Ac=["userId","batchId"];/**
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
 */function Js(r,t){return[r,Nt(t)]}function oh(r,t,e){return[r,Nt(t),e]}const Gm={},Un="documentMutations",ui="remoteDocumentsV14",zm=["prefixPath","collectionGroup","readTime","documentId"],Xs="documentKeyIndex",Km=["prefixPath","collectionGroup","documentId"],ah="collectionGroupIndex",Qm=["collectionGroup","readTime","prefixPath","documentId"],Hr="remoteDocumentGlobal",Mo="remoteDocumentGlobalKey",jn="targets",uh="queryTargetsIndex",$m=["canonicalId","targetId"],Gn="targetDocuments",Wm=["targetId","path"],la="documentTargetsIndex",Hm=["path","targetId"],ci="targetGlobalKey",nn="targetGlobal",Jr="collectionParents",Jm=["collectionId","parent"],zn="clientMetadata",Xm="clientId",vi="bundles",Ym="bundleId",Ri="namedQueries",Zm="name",ha="indexConfiguration",tg="indexId",Fo="collectionGroupIndex",eg="collectionGroup",Ur="indexState",ng=["indexId","uid"],ch="sequenceNumberIndex",rg=["uid","sequenceNumber"],jr="indexEntries",sg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],lh="documentKeyIndex",ig=["indexId","uid","orderedDocumentKey"],Pi="documentOverlays",og=["userId","collectionPath","documentId"],Oo="collectionPathOverlayIndex",ag=["userId","collectionPath","largestBatchId"],hh="collectionGroupOverlayIndex",ug=["userId","collectionGroup","largestBatchId"],da="globals",cg="name",dh=[Wr,Wt,Un,He,jn,cs,nn,Gn,zn,Hr,Jr,vi,Ri],lg=[...dh,Pi],fh=[Wr,Wt,Un,ui,jn,cs,nn,Gn,zn,Hr,Jr,vi,Ri,Pi],mh=fh,fa=[...mh,ha,Ur,jr],hg=fa,gh=[...fa,da],dg=gh;/**
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
 */class Lo extends rh{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function It(r,t){const e=M(r);return te.O(e.le,t)}/**
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
 */function vc(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function qe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function ph(r,t){const e=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.push(t(r[n],n,r));return e}function _h(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class it{constructor(t,e){this.comparator=t,this.root=e||Rt.EMPTY}insert(t,e){return new it(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Rt.BLACK,null,null))}remove(t){return new it(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Rt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new js(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new js(this.root,t,this.comparator,!1)}getReverseIterator(){return new js(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new js(this.root,t,this.comparator,!0)}}class js{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Rt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??Rt.RED,this.left=s??Rt.EMPTY,this.right=i??Rt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Rt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Rt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Rt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}Rt.EMPTY=null,Rt.RED=!0,Rt.BLACK=!1;Rt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new Rt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class tt{constructor(t){this.comparator=t,this.data=new it(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Rc(this.data.getIterator())}getIteratorFrom(t){return new Rc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((n=>{e=e.add(n)})),e}isEqual(t){if(!(t instanceof tt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new tt(this.comparator);return e.data=t,e}}class Rc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Pn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Lt{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new Lt([])}unionWith(t){let e=new tt(ct.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Lt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return On(this.fields,t.fields,((e,n)=>e.isEqual(n)))}}/**
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
 */class yh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function yy(){return typeof atob<"u"}/**
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
 */class ft{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new yh("Invalid base64 string: "+i):i}})(t);return new ft(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new ft(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return G(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const fg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function le(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=fg.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function he(r){return typeof r=="string"?ft.fromBase64String(r):ft.fromUint8Array(r)}/**
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
 */const Ih="server_timestamp",Th="__type__",Eh="__previous_value__",wh="__local_write_time__";function Si(r){return(r?.mapValue?.fields||{})[Th]?.stringValue===Ih}function Vi(r){const t=r.mapValue.fields[Eh];return Si(t)?Vi(t):t}function Xr(r){const t=le(r.mapValue.fields[wh].timestampValue);return new Y(t.seconds,t.nanos)}/**
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
 */class mg{constructor(t,e,n,s,i,a,u,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f}}const Yr="(default)";class sn{constructor(t,e){this.projectId=t,this.database=e||Yr}static empty(){return new sn("","")}get isDefaultDatabase(){return this.database===Yr}isEqual(t){return t instanceof sn&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const ma="__type__",Ah="__max__",Re={mapValue:{fields:{__type__:{stringValue:Ah}}}},ga="__vector__",Kn="value",Ys={nullValue:"NULL_VALUE"};function xe(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Si(r)?4:vh(r)?9007199254740991:bi(r)?10:11:O(28295,{value:r})}function se(r,t){if(r===t)return!0;const e=xe(r);if(e!==xe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Xr(r).isEqual(Xr(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=le(s.timestampValue),u=le(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(r,t);case 5:return r.stringValue===t.stringValue;case 6:return(function(s,i){return he(s.bytesValue).isEqual(he(i.bytesValue))})(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return(function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)})(r,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ut(s.doubleValue),u=ut(i.doubleValue);return a===u?$r(a)===$r(u):isNaN(a)&&isNaN(u)}return!1})(r,t);case 9:return On(r.arrayValue.values||[],t.arrayValue.values||[],se);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(vc(a)!==vc(u))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(u[c]===void 0||!se(a[c],u[c])))return!1;return!0})(r,t);default:return O(52216,{left:r})}}function Zr(r,t){return(r.values||[]).find((e=>se(e,t)))!==void 0}function De(r,t){if(r===t)return 0;const e=xe(r),n=xe(t);if(e!==n)return G(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,t.booleanValue);case 2:return(function(i,a){const u=ut(i.integerValue||i.doubleValue),c=ut(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(r,t);case 3:return Pc(r.timestampValue,t.timestampValue);case 4:return Pc(Xr(r),Xr(t));case 5:return Do(r.stringValue,t.stringValue);case 6:return(function(i,a){const u=he(i),c=he(a);return u.compareTo(c)})(r.bytesValue,t.bytesValue);case 7:return(function(i,a){const u=i.split("/"),c=a.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=G(u[h],c[h]);if(f!==0)return f}return G(u.length,c.length)})(r.referenceValue,t.referenceValue);case 8:return(function(i,a){const u=G(ut(i.latitude),ut(a.latitude));return u!==0?u:G(ut(i.longitude),ut(a.longitude))})(r.geoPointValue,t.geoPointValue);case 9:return Sc(r.arrayValue,t.arrayValue);case 10:return(function(i,a){const u=i.fields||{},c=a.fields||{},h=u[Kn]?.arrayValue,f=c[Kn]?.arrayValue,g=G(h?.values?.length||0,f?.values?.length||0);return g!==0?g:Sc(h,f)})(r.mapValue,t.mapValue);case 11:return(function(i,a){if(i===Re.mapValue&&a===Re.mapValue)return 0;if(i===Re.mapValue)return 1;if(a===Re.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let g=0;g<c.length&&g<f.length;++g){const _=Do(c[g],f[g]);if(_!==0)return _;const S=De(u[c[g]],h[f[g]]);if(S!==0)return S}return G(c.length,f.length)})(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function Pc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return G(r,t);const e=le(r),n=le(t),s=G(e.seconds,n.seconds);return s!==0?s:G(e.nanos,n.nanos)}function Sc(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=De(e[s],n[s]);if(i)return i}return G(e.length,n.length)}function Qn(r){return qo(r)}function qo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(e){const n=le(e);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(e){return he(e).toBase64()})(r.bytesValue):"referenceValue"in r?(function(e){return k.fromName(e).toString()})(r.referenceValue):"geoPointValue"in r?(function(e){return`geo(${e.latitude},${e.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=qo(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${qo(e.fields[a])}`;return s+"}"})(r.mapValue):O(61005,{value:r})}function Zs(r){switch(xe(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Vi(r);return t?16+Zs(t):16;case 5:return 2*r.stringValue.length;case 6:return he(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Zs(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return qe(n.fields,((i,a)=>{s+=i.length+Zs(a)})),s})(r.mapValue);default:throw O(13486,{value:r})}}function on(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Bo(r){return!!r&&"integerValue"in r}function ts(r){return!!r&&"arrayValue"in r}function Vc(r){return!!r&&"nullValue"in r}function bc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ti(r){return!!r&&"mapValue"in r}function bi(r){return(r?.mapValue?.fields||{})[ma]?.stringValue===ga}function Gr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return qe(r.mapValue.fields,((e,n)=>t.mapValue.fields[e]=Gr(n))),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Gr(r.arrayValue.values[e]);return t}return{...r}}function vh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Ah}const Rh={mapValue:{fields:{[ma]:{stringValue:ga},[Kn]:{arrayValue:{}}}}};function gg(r){return"nullValue"in r?Ys:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?on(sn.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?bi(r)?Rh:{mapValue:{}}:O(35942,{value:r})}function pg(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?on(sn.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Rh:"mapValue"in r?bi(r)?{mapValue:{}}:Re:O(61959,{value:r})}function Cc(r,t){const e=De(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function xc(r,t){const e=De(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class Pt{constructor(t){this.value=t}static empty(){return new Pt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!ti(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Gr(e)}setAll(t){let e=ct.emptyPath(),n={},s=[];t.forEach(((a,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=Gr(a):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());ti(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return se(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];ti(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){qe(e,((s,i)=>t[s]=i));for(const s of n)delete t[s]}clone(){return new Pt(Gr(this.value))}}function Ph(r){const t=[];return qe(r.fields,((e,n)=>{const s=new ct([e]);if(ti(n)){const i=Ph(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Lt(t)}/**
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
 */class at{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new at(t,0,B.min(),B.min(),B.min(),Pt.empty(),0)}static newFoundDocument(t,e,n,s){return new at(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new at(t,2,e,B.min(),B.min(),Pt.empty(),0)}static newUnknownDocument(t,e){return new at(t,3,e,B.min(),B.min(),Pt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Pt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Pt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof at&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ne{constructor(t,e){this.position=t,this.inclusive=e}}function Dc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(a.referenceValue),e.key):n=De(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Nc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!se(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class es{constructor(t,e="asc"){this.field=t,this.dir=e}}function _g(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Sh{}class $ extends Sh{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new yg(t,e,n):e==="array-contains"?new Eg(t,n):e==="in"?new Nh(t,n):e==="not-in"?new wg(t,n):e==="array-contains-any"?new Ag(t,n):new $(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Ig(t,n):new Tg(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(De(e,this.value)):e!==null&&xe(this.value)===xe(e)&&this.matchesComparison(De(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Z extends Sh{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Z(t,e)}matches(t){return $n(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function $n(r){return r.op==="and"}function Uo(r){return r.op==="or"}function pa(r){return Vh(r)&&$n(r)}function Vh(r){for(const t of r.filters)if(t instanceof Z)return!1;return!0}function jo(r){if(r instanceof $)return r.field.canonicalString()+r.op.toString()+Qn(r.value);if(pa(r))return r.filters.map((t=>jo(t))).join(",");{const t=r.filters.map((e=>jo(e))).join(",");return`${r.op}(${t})`}}function bh(r,t){return r instanceof $?(function(n,s){return s instanceof $&&n.op===s.op&&n.field.isEqual(s.field)&&se(n.value,s.value)})(r,t):r instanceof Z?(function(n,s){return s instanceof Z&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,u)=>i&&bh(a,s.filters[u])),!0):!1})(r,t):void O(19439)}function Ch(r,t){const e=r.filters.concat(t);return Z.create(e,r.op)}function xh(r){return r instanceof $?(function(e){return`${e.field.canonicalString()} ${e.op} ${Qn(e.value)}`})(r):r instanceof Z?(function(e){return e.op.toString()+" {"+e.getFilters().map(xh).join(" ,")+"}"})(r):"Filter"}class yg extends ${constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ig extends ${constructor(t,e){super(t,"in",e),this.keys=Dh("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Tg extends ${constructor(t,e){super(t,"not-in",e),this.keys=Dh("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Dh(r,t){return(t.arrayValue?.values||[]).map((e=>k.fromName(e.referenceValue)))}class Eg extends ${constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ts(e)&&Zr(e.arrayValue,this.value)}}class Nh extends ${constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Zr(this.value.arrayValue,e)}}class wg extends ${constructor(t,e){super(t,"not-in",e)}matches(t){if(Zr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Zr(this.value.arrayValue,e)}}class Ag extends ${constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ts(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>Zr(this.value.arrayValue,n)))}}/**
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
 */class vg{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function Go(r,t=null,e=[],n=[],s=null,i=null,a=null){return new vg(r,t,e,n,s,i,a)}function an(r){const t=M(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((n=>jo(n))).join(","),e+="|ob:",e+=t.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),us(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((n=>Qn(n))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((n=>Qn(n))).join(",")),t.Te=e}return t.Te}function ls(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!_g(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!bh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Nc(r.startAt,t.startAt)&&Nc(r.endAt,t.endAt)}function li(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function hi(r,t){return r.filters.filter((e=>e instanceof $&&e.field.isEqual(t)))}function kc(r,t,e){let n=Ys,s=!0;for(const i of hi(r,t)){let a=Ys,u=!0;switch(i.op){case"<":case"<=":a=gg(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=Ys}Cc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Cc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function Mc(r,t,e){let n=Re,s=!0;for(const i of hi(r,t)){let a=Re,u=!0;switch(i.op){case">=":case">":a=pg(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=Re}xc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];xc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class de{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function kh(r,t,e,n,s,i,a,u){return new de(r,t,e,n,s,i,a,u)}function sr(r){return new de(r)}function Fc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function _a(r){return r.collectionGroup!==null}function Mn(r){const t=M(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new tt(ct.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new es(i,n))})),e.has(ct.keyField().canonicalString())||t.Ie.push(new es(ct.keyField(),n))}return t.Ie}function kt(r){const t=M(r);return t.Ee||(t.Ee=Fh(t,Mn(r))),t.Ee}function Mh(r){const t=M(r);return t.de||(t.de=Fh(t,r.explicitOrderBy)),t.de}function Fh(r,t){if(r.limitType==="F")return Go(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new es(s.field,i)}));const e=r.endAt?new Ne(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Ne(r.startAt.position,r.startAt.inclusive):null;return Go(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function zo(r,t){const e=r.filters.concat([t]);return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function di(r,t,e){return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function hs(r,t){return ls(kt(r),kt(t))&&r.limitType===t.limitType}function Oh(r){return`${an(kt(r))}|lt:${r.limitType}`}function Dn(r){return`Query(target=${(function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map((s=>xh(s))).join(", ")}]`),us(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((s=>Qn(s))).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((s=>Qn(s))).join(",")),`Target(${n})`})(kt(r))}; limitType=${r.limitType})`}function ds(r,t){return t.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,t)&&(function(n,s){for(const i of Mn(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,t)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,t)&&(function(n,s){return!(n.startAt&&!(function(a,u,c){const h=Dc(a,u,c);return a.inclusive?h<=0:h<0})(n.startAt,Mn(n),s)||n.endAt&&!(function(a,u,c){const h=Dc(a,u,c);return a.inclusive?h>=0:h>0})(n.endAt,Mn(n),s))})(r,t)}function Lh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function qh(r){return(t,e)=>{let n=!1;for(const s of Mn(r)){const i=Rg(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Rg(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):(function(i,a,u){const c=a.data.field(i),h=u.data.field(i);return c!==null&&h!==null?De(c,h):O(42886)})(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
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
 */class fe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){qe(this.inner,((e,n)=>{for(const[s,i]of n)t(s,i)}))}isEmpty(){return _h(this.inner)}size(){return this.innerSize}}/**
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
 */const Pg=new it(k.comparator);function qt(){return Pg}const Bh=new it(k.comparator);function Fr(...r){let t=Bh;for(const e of r)t=t.insert(e.key,e);return t}function Uh(r){let t=Bh;return r.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Zt(){return zr()}function jh(){return zr()}function zr(){return new fe((r=>r.toString()),((r,t)=>r.isEqual(t)))}const Sg=new it(k.comparator),Vg=new tt(k.comparator);function z(...r){let t=Vg;for(const e of r)t=t.add(e);return t}const bg=new tt(G);function ya(){return bg}/**
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
 */function Ia(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:$r(t)?"-0":t}}function Gh(r){return{integerValue:""+r}}function zh(r,t){return ih(t)?Gh(t):Ia(r,t)}/**
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
 */class Ci{constructor(){this._=void 0}}function Cg(r,t,e){return r instanceof Wn?(function(s,i){const a={fields:{[Th]:{stringValue:Ih},[wh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Si(i)&&(i=Vi(i)),i&&(a.fields[Eh]=i),{mapValue:a}})(e,t):r instanceof un?Qh(r,t):r instanceof cn?$h(r,t):(function(s,i){const a=Kh(s,i),u=Oc(a)+Oc(s.Ae);return Bo(a)&&Bo(s.Ae)?Gh(u):Ia(s.serializer,u)})(r,t)}function xg(r,t,e){return r instanceof un?Qh(r,t):r instanceof cn?$h(r,t):e}function Kh(r,t){return r instanceof Hn?(function(n){return Bo(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(t)?t:{integerValue:0}:null}class Wn extends Ci{}class un extends Ci{constructor(t){super(),this.elements=t}}function Qh(r,t){const e=Wh(t);for(const n of r.elements)e.some((s=>se(s,n)))||e.push(n);return{arrayValue:{values:e}}}class cn extends Ci{constructor(t){super(),this.elements=t}}function $h(r,t){let e=Wh(t);for(const n of r.elements)e=e.filter((s=>!se(s,n)));return{arrayValue:{values:e}}}class Hn extends Ci{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Oc(r){return ut(r.integerValue||r.doubleValue)}function Wh(r){return ts(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class fs{constructor(t,e){this.field=t,this.transform=e}}function Dg(r,t){return r.field.isEqual(t.field)&&(function(n,s){return n instanceof un&&s instanceof un||n instanceof cn&&s instanceof cn?On(n.elements,s.elements,se):n instanceof Hn&&s instanceof Hn?se(n.Ae,s.Ae):n instanceof Wn&&s instanceof Wn})(r.transform,t.transform)}class Ng{constructor(t,e){this.version=t,this.transformResults=e}}class lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new lt}static exists(t){return new lt(void 0,t)}static updateTime(t){return new lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ei(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class xi{}function Hh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new or(r.key,lt.none()):new ir(r.key,r.data,lt.none());{const e=r.data,n=Pt.empty();let s=new tt(ct.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new me(r.key,n,new Lt(s.toArray()),lt.none())}}function kg(r,t,e){r instanceof ir?(function(s,i,a){const u=s.value.clone(),c=qc(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,t,e):r instanceof me?(function(s,i,a){if(!ei(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=qc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(Jh(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,t,e):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Kr(r,t,e,n){return r instanceof ir?(function(i,a,u,c){if(!ei(i.precondition,a))return u;const h=i.value.clone(),f=Bc(i.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(r,t,e,n):r instanceof me?(function(i,a,u,c){if(!ei(i.precondition,a))return u;const h=Bc(i.fieldTransforms,c,a),f=a.data;return f.setAll(Jh(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(r,t,e,n):(function(i,a,u){return ei(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,t,e)}function Mg(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Kh(n.transform,s||null);i!=null&&(e===null&&(e=Pt.empty()),e.set(n.field,i))}return e||null}function Lc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&On(n,s,((i,a)=>Dg(i,a)))})(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class ir extends xi{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class me extends xi{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Jh(r){const t=new Map;return r.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}})),t}function qc(r,t,e){const n=new Map;L(r.length===e.length,32656,{Re:e.length,Ve:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,xg(a,u,e[s]))}return n}function Bc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Cg(i,a,t))}return n}class or extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ta extends xi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Ea{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&kg(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Kr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Kr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=jh();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const c=Hh(a,u);c!==null&&n.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),z())}isEqual(t){return this.batchId===t.batchId&&On(this.mutations,t.mutations,((e,n)=>Lc(e,n)))&&On(this.baseMutations,t.baseMutations,((e,n)=>Lc(e,n)))}}class wa{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=(function(){return Sg})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new wa(t,e,n,s)}}/**
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
 */class Aa{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Xh{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}/**
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
 */class Fg{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var pt,W;function Yh(r){switch(r){case R.OK:return O(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function Zh(r){if(r===void 0)return mt("GRPC error has no .code"),R.UNKNOWN;switch(r){case pt.OK:return R.OK;case pt.CANCELLED:return R.CANCELLED;case pt.UNKNOWN:return R.UNKNOWN;case pt.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case pt.INTERNAL:return R.INTERNAL;case pt.UNAVAILABLE:return R.UNAVAILABLE;case pt.UNAUTHENTICATED:return R.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case pt.NOT_FOUND:return R.NOT_FOUND;case pt.ALREADY_EXISTS:return R.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return R.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case pt.ABORTED:return R.ABORTED;case pt.OUT_OF_RANGE:return R.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return R.UNIMPLEMENTED;case pt.DATA_LOSS:return R.DATA_LOSS;default:return O(39323,{code:r})}}(W=pt||(pt={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Ko=null;/**
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
 */function td(){return new TextEncoder}/**
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
 */const Og=new Ve([4294967295,4294967295],0);function Uc(r){const t=td().encode(r),e=new Gl;return e.update(t),new Uint8Array(e.digest())}function jc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ve([e,n],0),new Ve([s,i],0)]}class va{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Or(`Invalid padding: ${e}`);if(n<0)throw new Or(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Or(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Or(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Ve.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(Ve.fromNumber(n)));return s.compare(Og)===1&&(s=new Ve([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Uc(t),[n,s]=jc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new va(i,s,e);return n.forEach((u=>a.insert(u))),a}insert(t){if(this.ge===0)return;const e=Uc(t),[n,s]=jc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Or extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ms{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,gs.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new ms(B.min(),s,new it(G),qt(),z())}}class gs{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new gs(n,e,z(),z(),z())}}/**
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
 */class ni{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class ed{constructor(t,e){this.targetId=t,this.Ce=e}}class nd{constructor(t,e,n=ft.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Gc{constructor(){this.ve=0,this.Fe=zc(),this.Me=ft.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=z(),e=z(),n=z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:O(38017,{changeType:i})}})),new gs(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=zc()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Lg{constructor(t){this.Ge=t,this.ze=new Map,this.je=qt(),this.Je=Gs(),this.He=Gs(),this.Ye=new it(G)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,n=t.Ce.count,s=this.ot(e);if(s){const i=s.target;if(li(i))if(n===0){const a=new k(i.path);this.et(e,a,at.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this._t(e);if(a!==n){const u=this.ut(t),c=u?this.ct(u,t,a):1;if(c!==0){this.it(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}Ko?.lt((function(f,g,_,S,C){const x={localCacheCount:f,existenceFilterCount:g.count,databaseId:_.database,projectId:_.projectId},D=g.unchangedNames;return D&&(x.bloomFilter={applied:C===0,hashCount:D?.hashCount??0,bitmapLength:D?.bits?.bitmap?.length??0,padding:D?.bits?.padding??0,mightContain:U=>S?.mightContain(U)??!1}),x})(a,t.Ce,this.Ge.ht(),u,c))}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=he(n).toUint8Array()}catch(c){if(c instanceof yh)return Qt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new va(a,s,i)}catch(c){return Qt(c instanceof Or?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach((i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.et(e,i,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((i,a)=>{const u=this.ot(a);if(u){if(i.current&&li(u.target)){const c=new k(u.target.path);this.It(c).has(a)||this.Et(a,c)||this.et(a,c,at.newNoDocument(c,t))}i.Be&&(e.set(a,i.ke()),i.qe())}}));let n=z();this.He.forEach(((i,a)=>{let u=!0;a.forEachWhile((c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(t)));const s=new ms(t,e,this.Ye,this.je,n);return this.je=qt(),this.Je=Gs(),this.He=Gs(),this.Ye=new it(G),s}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Gc,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new tt(G),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new tt(G),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Gc),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Gs(){return new it(k.comparator)}function zc(){return new it(k.comparator)}const qg={asc:"ASCENDING",desc:"DESCENDING"},Bg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ug={and:"AND",or:"OR"};class jg{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Qo(r,t){return r.useProto3Json||us(t)?t:{value:t}}function Jn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rd(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function Gg(r,t){return Jn(r,t.toTimestamp())}function gt(r){return L(!!r,49232),B.fromTimestamp((function(e){const n=le(e);return new Y(n.seconds,n.nanos)})(r))}function Ra(r,t){return $o(r,t).canonicalString()}function $o(r,t){const e=(function(s){return new K(["projects",s.projectId,"databases",s.database])})(r).child("documents");return t===void 0?e:e.child(t)}function sd(r){const t=K.fromString(r);return L(fd(t),10190,{key:t.toString()}),t}function ns(r,t){return Ra(r.databaseId,t.path)}function ee(r,t){const e=sd(t);if(e.get(1)!==r.databaseId.projectId)throw new b(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new b(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(ad(e))}function id(r,t){return Ra(r.databaseId,t)}function od(r){const t=sd(r);return t.length===4?K.emptyPath():ad(t)}function Wo(r){return new K(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function ad(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Kc(r,t,e){return{name:ns(r,t),fields:e.value.mapValue.fields}}function Di(r,t,e){const n=ee(r,t.name),s=gt(t.updateTime),i=t.createTime?gt(t.createTime):B.min(),a=new Pt({mapValue:{fields:t.fields}}),u=at.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function zg(r,t){return"found"in t?(function(n,s){L(!!s.found,43571),s.found.name,s.found.updateTime;const i=ee(n,s.found.name),a=gt(s.found.updateTime),u=s.found.createTime?gt(s.found.createTime):B.min(),c=new Pt({mapValue:{fields:s.found.fields}});return at.newFoundDocument(i,a,u,c)})(r,t):"missing"in t?(function(n,s){L(!!s.missing,3894),L(!!s.readTime,22933);const i=ee(n,s.missing),a=gt(s.readTime);return at.newNoDocument(i,a)})(r,t):O(7234,{result:t})}function Kg(r,t){let e;if("targetChange"in t){t.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:O(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ft.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ft.fromUint8Array(f||new Uint8Array))})(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&(function(h){const f=h.code===void 0?R.UNKNOWN:Zh(h.code);return new b(f,h.message||"")})(a);e=new nd(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=ee(r,n.document.name),i=gt(n.document.updateTime),a=n.document.createTime?gt(n.document.createTime):B.min(),u=new Pt({mapValue:{fields:n.document.fields}}),c=at.newFoundDocument(s,i,a,u),h=n.targetIds||[],f=n.removedTargetIds||[];e=new ni(h,f,c.key,c)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=ee(r,n.document),i=n.readTime?gt(n.readTime):B.min(),a=at.newNoDocument(s,i),u=n.removedTargetIds||[];e=new ni([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=ee(r,n.document),i=n.removedTargetIds||[];e=new ni([],i,s,null)}else{if(!("filter"in t))return O(11601,{Rt:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new Fg(s,i),u=n.targetId;e=new ed(u,a)}}return e}function rs(r,t){let e;if(t instanceof ir)e={update:Kc(r,t.key,t.value)};else if(t instanceof or)e={delete:ns(r,t.key)};else if(t instanceof me)e={update:Kc(r,t.key,t.data),updateMask:Xg(t.fieldMask)};else{if(!(t instanceof Ta))return O(16599,{Vt:t.type});e={verify:ns(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((n=>(function(i,a){const u=a.transform;if(u instanceof Wn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof un)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof cn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Hn)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw O(20930,{transform:a.transform})})(0,n)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Gg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:O(27497)})(r,t.precondition)),e}function Ho(r,t){const e=t.currentDocument?(function(i){return i.updateTime!==void 0?lt.updateTime(gt(i.updateTime)):i.exists!==void 0?lt.exists(i.exists):lt.none()})(t.currentDocument):lt.none(),n=t.updateTransforms?t.updateTransforms.map((s=>(function(a,u){let c=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),c=new Wn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new un(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new cn(f)}else"increment"in u?c=new Hn(a,u.increment):O(16584,{proto:u});const h=ct.fromServerFormat(u.fieldPath);return new fs(h,c)})(r,s))):[];if(t.update){t.update.name;const s=ee(r,t.update.name),i=new Pt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=(function(c){const h=c.fieldPaths||[];return new Lt(h.map((f=>ct.fromServerFormat(f))))})(t.updateMask);return new me(s,i,a,e,n)}return new ir(s,i,e,n)}if(t.delete){const s=ee(r,t.delete);return new or(s,e)}if(t.verify){const s=ee(r,t.verify);return new Ta(s,e)}return O(1463,{proto:t})}function Qg(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map((e=>(function(s,i){let a=s.updateTime?gt(s.updateTime):gt(i);return a.isEqual(B.min())&&(a=gt(i)),new Ng(a,s.transformResults||[])})(e,t)))):[]}function ud(r,t){return{documents:[id(r,t.path)]}}function Ni(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=id(r,s);const i=(function(h){if(h.length!==0)return dd(Z.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(_){return{field:Ae(_.field),direction:Wg(_.dir)}})(f)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Qo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{ft:e,parent:s}}function cd(r,t,e,n){const{ft:s,parent:i}=Ni(r,t),a={},u=[];let c=0;return e.forEach((h=>{const f=n?h.alias:"aggregate_"+c++;a[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:Ae(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:Ae(h.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},gt:a,parent:i}}function ld(r){let t=od(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=(function(g){const _=hd(g);return _ instanceof Z&&pa(_)?_.getFilters():[_]})(e.where));let a=[];e.orderBy&&(a=(function(g){return g.map((_=>(function(C){return new es(Nn(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(_)))})(e.orderBy));let u=null;e.limit&&(u=(function(g){let _;return _=typeof g=="object"?g.value:g,us(_)?null:_})(e.limit));let c=null;e.startAt&&(c=(function(g){const _=!!g.before,S=g.values||[];return new Ne(S,_)})(e.startAt));let h=null;return e.endAt&&(h=(function(g){const _=!g.before,S=g.values||[];return new Ne(S,_)})(e.endAt)),kh(t,s,a,i,u,"F",c,h)}function $g(r,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function hd(r){return r.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Nn(e.unaryFilter.field);return $.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Nn(e.unaryFilter.field);return $.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Nn(e.unaryFilter.field);return $.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Nn(e.unaryFilter.field);return $.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}})(r):r.fieldFilter!==void 0?(function(e){return $.create(Nn(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(e){return Z.create(e.compositeFilter.filters.map((n=>hd(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}})(e.compositeFilter.op))})(r):O(30097,{filter:r})}function Wg(r){return qg[r]}function Hg(r){return Bg[r]}function Jg(r){return Ug[r]}function Ae(r){return{fieldPath:r.canonicalString()}}function Nn(r){return ct.fromServerFormat(r.fieldPath)}function dd(r){return r instanceof $?(function(e){if(e.op==="=="){if(bc(e.value))return{unaryFilter:{field:Ae(e.field),op:"IS_NAN"}};if(Vc(e.value))return{unaryFilter:{field:Ae(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(bc(e.value))return{unaryFilter:{field:Ae(e.field),op:"IS_NOT_NAN"}};if(Vc(e.value))return{unaryFilter:{field:Ae(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ae(e.field),op:Hg(e.op),value:e.value}}})(r):r instanceof Z?(function(e){const n=e.getFilters().map((s=>dd(s)));return n.length===1?n[0]:{compositeFilter:{op:Jg(e.op),filters:n}}})(r):O(54877,{filter:r})}function Xg(r){const t=[];return r.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function fd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class ce{constructor(t,e,n,s,i=B.min(),a=B.min(),u=ft.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new ce(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new ce(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new ce(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new ce(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class md{constructor(t){this.yt=t}}function Yg(r,t){let e;if(t.document)e=Di(r.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=k.fromSegments(t.noDocument.path),s=hn(t.noDocument.readTime);e=at.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return O(56709);{const n=k.fromSegments(t.unknownDocument.path),s=hn(t.unknownDocument.version);e=at.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime((function(s){const i=new Y(s[0],s[1]);return B.fromTimestamp(i)})(t.readTime)),e}function Qc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:fi(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=(function(i,a){return{name:ns(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Jn(i,a.version.toTimestamp()),createTime:Jn(i,a.createTime.toTimestamp())}})(r.yt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:ln(t.version)};else{if(!t.isUnknownDocument())return O(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:ln(t.version)}}return n}function fi(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function ln(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function hn(r){const t=new Y(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function Xe(r,t){const e=(t.baseMutations||[]).map((i=>Ho(r.yt,i)));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map((i=>Ho(r.yt,i))),s=Y.fromMillis(t.localWriteTimeMs);return new Ea(t.batchId,s,e,n)}function Lr(r){const t=hn(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?hn(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),kt(sr(od(i.documents[0])))})(r.query):(function(i){return kt(ld(i))})(r.query),new ce(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ft.fromBase64String(r.resumeToken))}function gd(r,t){const e=ln(t.snapshotVersion),n=ln(t.lastLimboFreeSnapshotVersion);let s;s=li(t.target)?ud(r.yt,t.target):Ni(r.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:an(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function ki(r){const t=ld({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?di(t,t.limit,"L"):t}function wo(r,t){return new Aa(t.largestBatchId,Ho(r.yt,t.overlayMutation))}function $c(r,t){const e=t.path.lastSegment();return[r,Nt(t.path.popLast()),e]}function Wc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:ln(n.readTime),documentKey:Nt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class Zg{getBundleMetadata(t,e){return Hc(t).get(e).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:hn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(t,e){return Hc(t).put((function(s){return{bundleId:s.id,createTime:ln(gt(s.createTime)),version:s.version}})(e))}getNamedQuery(t,e){return Jc(t).get(e).next((n=>{if(n)return(function(i){return{name:i.name,query:ki(i.bundledQuery),readTime:hn(i.readTime)}})(n)}))}saveNamedQuery(t,e){return Jc(t).put((function(s){return{name:s.name,readTime:ln(gt(s.readTime)),bundledQuery:s.bundledQuery}})(e))}}function Hc(r){return It(r,vi)}function Jc(r){return It(r,Ri)}/**
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
 */class Mi{constructor(t,e){this.serializer=t,this.userId=e}static wt(t,e){const n=e.uid||"";return new Mi(t,n)}getOverlay(t,e){return Cr(t).get($c(this.userId,e)).next((n=>n?wo(this.serializer,n):null))}getOverlays(t,e){const n=Zt();return A.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){const s=[];return n.forEach(((i,a)=>{const u=new Aa(e,a);s.push(this.St(t,u))})),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach((a=>s.add(Nt(a.getCollectionPath()))));const i=[];return s.forEach((a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Cr(t).Z(Oo,u))})),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Zt(),i=Nt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Cr(t).J(Oo,a).next((u=>{for(const c of u){const h=wo(this.serializer,c);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(t,e,n,s){const i=Zt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Cr(t).ee({index:hh,range:u},((c,h,f)=>{const g=wo(this.serializer,h);i.size()<s||g.largestBatchId===a?(i.set(g.getKey(),g),a=g.largestBatchId):f.done()})).next((()=>i))}St(t,e){return Cr(t).put((function(s,i,a){const[u,c,h]=$c(i,a.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:rs(s.yt,a.mutation)}})(this.serializer,this.userId,e))}}function Cr(r){return It(r,Pi)}/**
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
 */class tp{bt(t){return It(t,da)}getSessionToken(t){return this.bt(t).get("sessionToken").next((e=>{const n=e?.value;return n?ft.fromUint8Array(n):ft.EMPTY_BYTE_STRING}))}setSessionToken(t,e){return this.bt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class Ye{constructor(){}Dt(t,e){this.Ct(t,e),e.vt()}Ct(t,e){if("nullValue"in t)this.Ft(e,5);else if("booleanValue"in t)this.Ft(e,10),e.Mt(t.booleanValue?1:0);else if("integerValue"in t)this.Ft(e,15),e.Mt(ut(t.integerValue));else if("doubleValue"in t){const n=ut(t.doubleValue);isNaN(n)?this.Ft(e,13):(this.Ft(e,15),$r(n)?e.Mt(0):e.Mt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ft(e,20),typeof n=="string"&&(n=le(n)),e.xt(`${n.seconds||""}`),e.Mt(n.nanos||0)}else if("stringValue"in t)this.Ot(t.stringValue,e),this.Nt(e);else if("bytesValue"in t)this.Ft(e,30),e.Bt(he(t.bytesValue)),this.Nt(e);else if("referenceValue"in t)this.Lt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ft(e,45),e.Mt(n.latitude||0),e.Mt(n.longitude||0)}else"mapValue"in t?vh(t)?this.Ft(e,Number.MAX_SAFE_INTEGER):bi(t)?this.kt(t.mapValue,e):(this.qt(t.mapValue,e),this.Nt(e)):"arrayValue"in t?(this.Qt(t.arrayValue,e),this.Nt(e)):O(19022,{$t:t})}Ot(t,e){this.Ft(e,25),this.Ut(t,e)}Ut(t,e){e.xt(t)}qt(t,e){const n=t.fields||{};this.Ft(e,55);for(const s of Object.keys(n))this.Ot(s,e),this.Ct(n[s],e)}kt(t,e){const n=t.fields||{};this.Ft(e,53);const s=Kn,i=n[s].arrayValue?.values?.length||0;this.Ft(e,15),e.Mt(ut(i)),this.Ot(s,e),this.Ct(n[s],e)}Qt(t,e){const n=t.values||[];this.Ft(e,50);for(const s of n)this.Ct(s,e)}Lt(t,e){this.Ft(e,37),k.fromName(t).path.forEach((n=>{this.Ft(e,60),this.Ut(n,e)}))}Ft(t,e){t.Mt(e)}Nt(t){t.Mt(2)}}Ye.Kt=new Ye;/**
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
 */const Sn=255;function ep(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function Xc(r){const t=64-(function(n){let s=0;for(let i=0;i<8;++i){const a=ep(255&n[i]);if(s+=a,a!==8)break}return s})(r);return Math.ceil(t/8)}class np{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Gt(n.value),n=e.next();this.zt()}jt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Jt(n.value),n=e.next();this.Ht()}Yt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=e.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=e.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(t){const e=this.en(t),n=Xc(e);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}nn(t){const e=this.en(t),n=Xc(e);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}rn(){this.sn(Sn),this.sn(255)}_n(){this.an(Sn),this.an(255)}reset(){this.position=0}seed(t){this.tn(t.length),this.buffer.set(t,this.position),this.position+=t.length}un(){return this.buffer.slice(0,this.position)}en(t){const e=(function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)})(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Gt(t){const e=255&t;e===0?(this.sn(0),this.sn(255)):e===Sn?(this.sn(Sn),this.sn(0)):this.sn(e)}Jt(t){const e=255&t;e===0?(this.an(0),this.an(255)):e===Sn?(this.an(Sn),this.an(0)):this.an(t)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(t){this.tn(1),this.buffer[this.position++]=t}an(t){this.tn(1),this.buffer[this.position++]=~t}tn(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class rp{constructor(t){this.cn=t}Bt(t){this.cn.Wt(t)}xt(t){this.cn.Yt(t)}Mt(t){this.cn.Xt(t)}vt(){this.cn.rn()}}class sp{constructor(t){this.cn=t}Bt(t){this.cn.jt(t)}xt(t){this.cn.Zt(t)}Mt(t){this.cn.nn(t)}vt(){this.cn._n()}}class xr{constructor(){this.cn=new np,this.ln=new rp(this.cn),this.hn=new sp(this.cn)}seed(t){this.cn.seed(t)}Pn(t){return t===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class Ze{constructor(t,e,n,s){this.Tn=t,this.In=e,this.En=n,this.dn=s}An(){const t=this.dn.length,e=t===0||this.dn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.dn,0),e!==t?n.set([0],this.dn.length):++n[n.length-1],new Ze(this.Tn,this.In,this.En,n)}Rn(t,e,n){return{indexId:this.Tn,uid:t,arrayValue:ri(this.En),directionalValue:ri(this.dn),orderedDocumentKey:ri(e),documentKey:n.path.toArray()}}Vn(t,e,n){const s=this.Rn(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Te(r,t){let e=r.Tn-t.Tn;return e!==0?e:(e=Yc(r.En,t.En),e!==0?e:(e=Yc(r.dn,t.dn),e!==0?e:k.comparator(r.In,t.In)))}function Yc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function ri(r){return jl()?(function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n})(r):r}function Zc(r){return typeof r!="string"?r:(function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n})(r)}class tl{constructor(t){this.mn=new tt(((e,n)=>ct.comparator(e.field,n.field))),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.fn=t.orderBy,this.gn=[];for(const e of t.filters){const n=e;n.isInequality()?this.mn=this.mn.add(n):this.gn.push(n)}}get pn(){return this.mn.size>1}yn(t){if(L(t.collectionGroup===this.collectionId,49279),this.pn)return!1;const e=ko(t);if(e!==void 0&&!this.wn(e))return!1;const n=We(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.wn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.mn.size>0){const u=this.mn.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.Sn(u,c)||!this.bn(this.fn[a++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.fn.length||!this.bn(this.fn[a++],u))return!1}return!0}Dn(){if(this.pn)return null;let t=new tt(ct.comparator);const e=[];for(const n of this.gn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new en(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new en(n.field,0))}for(const n of this.fn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new en(n.field,n.dir==="asc"?0:1)));return new qn(qn.UNKNOWN_ID,this.collectionId,e,Bn.empty())}wn(t){for(const e of this.gn)if(this.Sn(e,t))return!0;return!1}Sn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}bn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function pd(r){if(L(r instanceof $||r instanceof Z,20012),r instanceof $){if(r instanceof Nh){const e=r.value.arrayValue?.values?.map((n=>$.create(r.field,"==",n)))||[];return Z.create(e,"or")}return r}const t=r.filters.map((e=>pd(e)));return Z.create(t,r.op)}function ip(r){if(r.getFilters().length===0)return[];const t=Yo(pd(r));return L(_d(t),7391),Jo(t)||Xo(t)?[t]:t.getFilters()}function Jo(r){return r instanceof $}function Xo(r){return r instanceof Z&&pa(r)}function _d(r){return Jo(r)||Xo(r)||(function(e){if(e instanceof Z&&Uo(e)){for(const n of e.getFilters())if(!Jo(n)&&!Xo(n))return!1;return!0}return!1})(r)}function Yo(r){if(L(r instanceof $||r instanceof Z,34018),r instanceof $)return r;if(r.filters.length===1)return Yo(r.filters[0]);const t=r.filters.map((n=>Yo(n)));let e=Z.create(t,r.op);return e=mi(e),_d(e)?e:(L(e instanceof Z,64498),L($n(e),40251),L(e.filters.length>1,57927),e.filters.reduce(((n,s)=>Pa(n,s))))}function Pa(r,t){let e;return L(r instanceof $||r instanceof Z,38388),L(t instanceof $||t instanceof Z,25473),e=r instanceof $?t instanceof $?(function(s,i){return Z.create([s,i],"and")})(r,t):el(r,t):t instanceof $?el(t,r):(function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),$n(s)&&$n(i))return Ch(s,i.getFilters());const a=Uo(s)?s:i,u=Uo(s)?i:s,c=a.filters.map((h=>Pa(h,u)));return Z.create(c,"or")})(r,t),mi(e)}function el(r,t){if($n(t))return Ch(t,r.getFilters());{const e=t.filters.map((n=>Pa(r,n)));return Z.create(e,"or")}}function mi(r){if(L(r instanceof $||r instanceof Z,11850),r instanceof $)return r;const t=r.getFilters();if(t.length===1)return mi(t[0]);if(Vh(r))return r;const e=t.map((s=>mi(s))),n=[];return e.forEach((s=>{s instanceof $?n.push(s):s instanceof Z&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:Z.create(n,r.op)}/**
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
 */class op{constructor(){this.Cn=new Sa}addToCollectionParentIndex(t,e){return this.Cn.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(Kt.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class Sa{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new tt(K.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new tt(K.comparator)).toArray()}}/**
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
 */const nl="IndexedDbIndexManager",zs=new Uint8Array(0);class ap{constructor(t,e){this.databaseId=e,this.vn=new Sa,this.Fn=new fe((n=>an(n)),((n,s)=>ls(n,s))),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.vn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener((()=>{this.vn.add(e)}));const i={collectionId:n,parent:Nt(s)};return rl(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[Xl(e),""],!1,!0);return rl(t).J(s).next((i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Yt(a.parent))}return n}))}addFieldIndex(t,e){const n=Dr(t),s=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=bn(t);return i.next((u=>{a.put(Wc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))}))}return i.next()}deleteFieldIndex(t,e){const n=Dr(t),s=bn(t),i=Vn(t);return n.delete(e.indexId).next((()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))))}deleteAllFieldIndexes(t){const e=Dr(t),n=Vn(t),s=bn(t);return e.Z().next((()=>n.Z())).next((()=>s.Z()))}createTargetIndexes(t,e){return A.forEach(this.Mn(e),(n=>this.getIndexType(t,n).next((s=>{if(s===0||s===1){const i=new tl(n).Dn();if(i!=null)return this.addFieldIndex(t,i)}}))))}getDocumentsMatchingTarget(t,e){const n=Vn(t);let s=!0;const i=new Map;return A.forEach(this.Mn(e),(a=>this.xn(t,a).next((u=>{s&&(s=!!u),i.set(a,u)})))).next((()=>{if(s){let a=z();const u=[];return A.forEach(i,((c,h)=>{N(nl,`Using index ${(function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map((X=>`${X.fieldPath}:${X.kind}`)).join(",")}`})(c)} to execute ${an(e)}`);const f=(function(q,X){const nt=ko(X);if(nt===void 0)return null;for(const H of hi(q,nt.fieldPath))switch(H.op){case"array-contains-any":return H.value.arrayValue.values||[];case"array-contains":return[H.value]}return null})(h,c),g=(function(q,X){const nt=new Map;for(const H of We(X))for(const T of hi(q,H.fieldPath))switch(T.op){case"==":case"in":nt.set(H.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return nt.set(H.fieldPath.canonicalString(),T.value),Array.from(nt.values())}return null})(h,c),_=(function(q,X){const nt=[];let H=!0;for(const T of We(X)){const p=T.kind===0?kc(q,T.fieldPath,q.startAt):Mc(q,T.fieldPath,q.startAt);nt.push(p.value),H&&(H=p.inclusive)}return new Ne(nt,H)})(h,c),S=(function(q,X){const nt=[];let H=!0;for(const T of We(X)){const p=T.kind===0?Mc(q,T.fieldPath,q.endAt):kc(q,T.fieldPath,q.endAt);nt.push(p.value),H&&(H=p.inclusive)}return new Ne(nt,H)})(h,c),C=this.On(c,h,_),x=this.On(c,h,S),D=this.Nn(c,h,g),U=this.Bn(c.indexId,f,C,_.inclusive,x,S.inclusive,D);return A.forEach(U,(j=>n.Y(j,e.limit).next((q=>{q.forEach((X=>{const nt=k.fromSegments(X.documentKey);a.has(nt)||(a=a.add(nt),u.push(nt))}))}))))})).next((()=>u))}return A.resolve(null)}))}Mn(t){let e=this.Fn.get(t);return e||(t.filters.length===0?e=[t]:e=ip(Z.create(t.filters,"and")).map((n=>Go(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt))),this.Fn.set(t,e),e)}Bn(t,e,n,s,i,a,u){const c=(e!=null?e.length:1)*Math.max(n.length,i.length),h=c/(e!=null?e.length:1),f=[];for(let g=0;g<c;++g){const _=e?this.Ln(e[g/h]):zs,S=this.kn(t,_,n[g%h],s),C=this.qn(t,_,i[g%h],a),x=u.map((D=>this.kn(t,_,D,!0)));f.push(...this.createRange(S,C,x))}return f}kn(t,e,n,s){const i=new Ze(t,k.empty(),e,n);return s?i:i.An()}qn(t,e,n,s){const i=new Ze(t,k.empty(),e,n);return s?i.An():i}xn(t,e){const n=new tl(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next((i=>{let a=null;for(const u of i)n.yn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a}))}getIndexType(t,e){let n=2;const s=this.Mn(e);return A.forEach(s,(i=>this.xn(t,i).next((a=>{a?n!==0&&a.fields.length<(function(c){let h=new tt(ct.comparator),f=!1;for(const g of c.filters)for(const _ of g.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const g of c.orderBy)g.field.isKeyField()||(h=h.add(g.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(e)&&s.length>1&&n===2?1:n))}Qn(t,e){const n=new xr;for(const s of We(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.Pn(s.kind);Ye.Kt.Dt(i,a)}return n.un()}Ln(t){const e=new xr;return Ye.Kt.Dt(t,e.Pn(0)),e.un()}$n(t,e){const n=new xr;return Ye.Kt.Dt(on(this.databaseId,e),n.Pn((function(i){const a=We(i);return a.length===0?0:a[a.length-1].kind})(t))),n.un()}Nn(t,e,n){if(n===null)return[];let s=[];s.push(new xr);let i=0;for(const a of We(t)){const u=n[i++];for(const c of s)if(this.Un(e,a.fieldPath)&&ts(u))s=this.Kn(s,a,u);else{const h=c.Pn(a.kind);Ye.Kt.Dt(u,h)}}return this.Wn(s)}On(t,e,n){return this.Nn(t,e,n.position)}Wn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].un();return e}Kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const c=new xr;c.seed(u.un()),Ye.Kt.Dt(a,c.Pn(e.kind)),i.push(c)}return i}Un(t,e){return!!t.filters.find((n=>n instanceof $&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(t,e){const n=Dr(t),s=bn(t);return(e?n.J(Fo,IDBKeyRange.bound(e,e)):n.J()).next((i=>{const a=[];return A.forEach(i,(u=>s.get([u.indexId,this.uid]).next((c=>{a.push((function(f,g){const _=g?new Bn(g.sequenceNumber,new Kt(hn(g.readTime),new k(Yt(g.documentKey)),g.largestBatchId)):Bn.empty(),S=f.fields.map((([C,x])=>new en(ct.fromServerFormat(C),x)));return new qn(f.indexId,f.collectionGroup,S,_)})(u,c))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next((e=>e.length===0?null:(e.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:G(n.collectionGroup,s.collectionGroup)})),e[0].collectionGroup)))}updateCollectionGroup(t,e,n){const s=Dr(t),i=bn(t);return this.Gn(t).next((a=>s.J(Fo,IDBKeyRange.bound(e,e)).next((u=>A.forEach(u,(c=>i.put(Wc(c.indexId,this.uid,a,n))))))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,((s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next((u=>(n.set(s.collectionGroup,u),A.forEach(u,(c=>this.zn(t,s,c).next((h=>{const f=this.jn(i,c);return h.isEqual(f)?A.resolve():this.Jn(t,i,c,h,f)})))))))}))}Hn(t,e,n,s){return Vn(t).put(s.Rn(this.uid,this.$n(n,e.key),e.key))}Yn(t,e,n,s){return Vn(t).delete(s.Vn(this.uid,this.$n(n,e.key),e.key))}zn(t,e,n){const s=Vn(t);let i=new tt(Te);return s.ee({index:lh,range:IDBKeyRange.only([n.indexId,this.uid,ri(this.$n(n,e))])},((a,u)=>{i=i.add(new Ze(n.indexId,e,Zc(u.arrayValue),Zc(u.directionalValue)))})).next((()=>i))}jn(t,e){let n=new tt(Te);const s=this.Qn(e,t);if(s==null)return n;const i=ko(e);if(i!=null){const a=t.data.field(i.fieldPath);if(ts(a))for(const u of a.arrayValue.values||[])n=n.add(new Ze(e.indexId,t.key,this.Ln(u),s))}else n=n.add(new Ze(e.indexId,t.key,zs,s));return n}Jn(t,e,n,s,i){N(nl,"Updating index entries for document '%s'",e.key);const a=[];return(function(c,h,f,g,_){const S=c.getIterator(),C=h.getIterator();let x=Pn(S),D=Pn(C);for(;x||D;){let U=!1,j=!1;if(x&&D){const q=f(x,D);q<0?j=!0:q>0&&(U=!0)}else x!=null?j=!0:U=!0;U?(g(D),D=Pn(C)):j?(_(x),x=Pn(S)):(x=Pn(S),D=Pn(C))}})(s,i,Te,(u=>{a.push(this.Hn(t,e,n,u))}),(u=>{a.push(this.Yn(t,e,n,u))})),A.waitFor(a)}Gn(t){let e=1;return bn(t).ee({index:ch,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),e=s.sequenceNumber+1})).next((()=>e))}createRange(t,e,n){n=n.sort(((a,u)=>Te(a,u))).filter(((a,u,c)=>!u||Te(a,c[u-1])!==0));const s=[];s.push(t);for(const a of n){const u=Te(a,t),c=Te(a,e);if(u===0)s[0]=t.An();else if(u>0&&c<0)s.push(a),s.push(a.An());else if(c>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Zn(s[a],s[a+1]))return[];const u=s[a].Vn(this.uid,zs,k.empty()),c=s[a+1].Vn(this.uid,zs,k.empty());i.push(IDBKeyRange.bound(u,c))}return i}Zn(t,e){return Te(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(sl)}getMinOffset(t,e){return A.mapArray(this.Mn(e),(n=>this.xn(t,n).next((s=>s||O(44426))))).next(sl)}}function rl(r){return It(r,Jr)}function Vn(r){return It(r,jr)}function Dr(r){return It(r,ha)}function bn(r){return It(r,Ur)}function sl(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ua(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Kt(t.readTime,t.documentKey,e)}/**
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
 */const il={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},yd=41943040;class Dt{static withCacheSize(t){return new Dt(t,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function Id(r,t,e){const n=r.store(Wt),s=r.store(Un),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const c=n.ee({range:a},((f,g,_)=>(u++,_.delete())));i.push(c.next((()=>{L(u===1,47070,{batchId:e.batchId})})));const h=[];for(const f of e.mutations){const g=oh(t,f.key.path,e.batchId);i.push(s.delete(g)),h.push(f.key)}return A.waitFor(i).next((()=>h))}function gi(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw O(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */Dt.DEFAULT_COLLECTION_PERCENTILE=10,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Dt.DEFAULT=new Dt(yd,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Dt.DISABLED=new Dt(-1,0,0);class Fi{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Xn={}}static wt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new Fi(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ee(t).ee({index:tn,range:n},((s,i,a)=>{e=!1,a.done()})).next((()=>e))}addMutationBatch(t,e,n,s){const i=kn(t),a=Ee(t);return a.add({}).next((u=>{L(typeof u=="number",49019);const c=new Ea(u,e,n,s),h=(function(S,C,x){const D=x.baseMutations.map((j=>rs(S.yt,j))),U=x.mutations.map((j=>rs(S.yt,j)));return{userId:C,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:D,mutations:U}})(this.serializer,this.userId,c),f=[];let g=new tt(((_,S)=>G(_.canonicalString(),S.canonicalString())));for(const _ of s){const S=oh(this.userId,_.key.path,u);g=g.add(_.key.path.popLast()),f.push(a.put(h)),f.push(i.put(S,Gm))}return g.forEach((_=>{f.push(this.indexManager.addToCollectionParentIndex(t,_))})),t.addOnCommittedListener((()=>{this.Xn[u]=c.keys()})),A.waitFor(f).next((()=>c))}))}lookupMutationBatch(t,e){return Ee(t).get(e).next((n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Xe(this.serializer,n)):null))}er(t,e){return this.Xn[e]?A.resolve(this.Xn[e]):this.lookupMutationBatch(t,e).next((n=>{if(n){const s=n.keys();return this.Xn[e]=s,s}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ee(t).ee({index:tn,range:s},((a,u,c)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{tr:n}),i=Xe(this.serializer,u)),c.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=be;return Ee(t).ee({index:tn,range:e,reverse:!0},((s,i,a)=>{n=i.batchId,a.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,be],[this.userId,Number.POSITIVE_INFINITY]);return Ee(t).J(tn,e).next((n=>n.map((s=>Xe(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Js(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return kn(t).ee({range:s},((a,u,c)=>{const[h,f,g]=a,_=Yt(f);if(h===this.userId&&e.path.isEqual(_))return Ee(t).get(g).next((S=>{if(!S)throw O(61480,{nr:a,batchId:g});L(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:g}),i.push(Xe(this.serializer,S))}));c.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(G);const s=[];return e.forEach((i=>{const a=Js(this.userId,i.path),u=IDBKeyRange.lowerBound(a),c=kn(t).ee({range:u},((h,f,g)=>{const[_,S,C]=h,x=Yt(S);_===this.userId&&i.path.isEqual(x)?n=n.add(C):g.done()}));s.push(c)})),A.waitFor(s).next((()=>this.rr(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Js(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new tt(G);return kn(t).ee({range:a},((c,h,f)=>{const[g,_,S]=c,C=Yt(_);g===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(S)):f.done()})).next((()=>this.rr(t,u)))}rr(t,e){const n=[],s=[];return e.forEach((i=>{s.push(Ee(t).get(i).next((a=>{if(a===null)throw O(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Xe(this.serializer,a))})))})),A.waitFor(s).next((()=>n))}removeMutationBatch(t,e){return Id(t.le,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.ir(e.batchId)})),A.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))))}ir(t){delete this.Xn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),s=[];return kn(t).ee({range:n},((i,a,u)=>{if(i[0]===this.userId){const c=Yt(i[1]);s.push(c)}else u.done()})).next((()=>{L(s.length===0,56720,{sr:s.map((i=>i.canonicalString()))})}))}))}containsKey(t,e){return Td(t,this.userId,e)}_r(t){return Ed(t).get(this.userId).next((e=>e||{userId:this.userId,lastAcknowledgedBatchId:be,lastStreamToken:""}))}}function Td(r,t,e){const n=Js(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return kn(r).ee({range:i,X:!0},((u,c,h)=>{const[f,g,_]=u;f===t&&g===s&&(a=!0),h.done()})).next((()=>a))}function Ee(r){return It(r,Wt)}function kn(r){return It(r,Un)}function Ed(r){return It(r,Wr)}/**
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
 */class dn{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new dn(0)}static cr(){return new dn(-1)}}/**
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
 */class up{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.lr(t).next((e=>{const n=new dn(e.highestTargetId);return e.highestTargetId=n.next(),this.hr(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.lr(t).next((e=>B.fromTimestamp(new Y(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.lr(t).next((e=>e.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.lr(t).next((s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.hr(t,s))))}addTargetData(t,e){return this.Pr(t,e).next((()=>this.lr(t).next((n=>(n.targetCount+=1,this.Tr(e,n),this.hr(t,n))))))}updateTargetData(t,e){return this.Pr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>Cn(t).delete(e.targetId))).next((()=>this.lr(t))).next((n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.hr(t,n))))}removeTargets(t,e,n){let s=0;const i=[];return Cn(t).ee(((a,u)=>{const c=Lr(u);c.sequenceNumber<=e&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(t,c)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(t,e){return Cn(t).ee(((n,s)=>{const i=Lr(s);e(i)}))}lr(t){return ol(t).get(ci).next((e=>(L(e!==null,2888),e)))}hr(t,e){return ol(t).put(ci,e)}Pr(t,e){return Cn(t).put(gd(this.serializer,e))}Tr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.lr(t).next((e=>e.targetCount))}getTargetData(t,e){const n=an(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Cn(t).ee({range:s,index:uh},((a,u,c)=>{const h=Lr(u);ls(e,h.target)&&(i=h,c.done())})).next((()=>i))}addMatchingKeys(t,e,n){const s=[],i=ve(t);return e.forEach((a=>{const u=Nt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))})),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=ve(t);return A.forEach(e,(i=>{const a=Nt(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])}))}removeMatchingKeysForTargetId(t,e){const n=ve(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=ve(t);let i=z();return s.ee({range:n,X:!0},((a,u,c)=>{const h=Yt(a[1]),f=new k(h);i=i.add(f)})).next((()=>i))}containsKey(t,e){const n=Nt(e.path),s=IDBKeyRange.bound([n],[Xl(n)],!1,!0);let i=0;return ve(t).ee({index:la,X:!0,range:s},(([a,u],c,h)=>{a!==0&&(i++,h.done())})).next((()=>i>0))}At(t,e){return Cn(t).get(e).next((n=>n?Lr(n):null))}}function Cn(r){return It(r,jn)}function ol(r){return It(r,nn)}function ve(r){return It(r,Gn)}/**
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
 */const al="LruGarbageCollector",wd=1048576;function ul([r,t],[e,n]){const s=G(r,e);return s===0?G(t,n):s}class cp{constructor(t){this.Ir=t,this.buffer=new tt(ul),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();ul(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ad{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(al,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Le(e)?N(al,"Ignoring IndexedDB error during garbage collection: ",e):await Oe(e)}await this.Vr(3e5)}))}}class lp{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Ot.ce);const n=new cp(e);return this.mr.forEachTarget(t,(s=>n.Ar(s.sequenceNumber))).next((()=>this.mr.pr(t,(s=>n.Ar(s))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(il)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),il):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,s,i,a,u,c,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((g=>(g>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(t,s)))).next((g=>(n=g,u=Date.now(),this.removeTargets(t,n,e)))).next((g=>(i=g,c=Date.now(),this.removeOrphanedDocuments(t,n)))).next((g=>(h=Date.now(),xn()<=ue.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${g} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g}))))}}function vd(r,t){return new lp(r,t)}/**
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
 */class hp{constructor(t,e){this.db=t,this.garbageCollector=vd(this,e)}gr(t){const e=this.wr(t);return this.db.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}wr(t){let e=0;return this.pr(t,(n=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}pr(t,e){return this.Sr(t,((n,s)=>e(s)))}addReference(t,e,n){return Ks(t,n)}removeReference(t,e,n){return Ks(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Ks(t,e)}br(t,e){return(function(s,i){let a=!1;return Ed(s).te((u=>Td(s,u,i).next((c=>(c&&(a=!0),A.resolve(!c)))))).next((()=>a))})(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(t,((a,u)=>{if(u<=e){const c=this.br(t,a).next((h=>{if(!h)return i++,n.getEntry(t,a).next((()=>(n.removeEntry(a,B.min()),ve(t).delete((function(g){return[0,Nt(g.path)]})(a)))))}));s.push(c)}})).next((()=>A.waitFor(s))).next((()=>n.apply(t))).next((()=>i))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Ks(t,e)}Sr(t,e){const n=ve(t);let s,i=Ot.ce;return n.ee({index:la},(([a,u],{path:c,sequenceNumber:h})=>{a===0?(i!==Ot.ce&&e(new k(Yt(s)),i),i=h,s=c):i=Ot.ce})).next((()=>{i!==Ot.ce&&e(new k(Yt(s)),i)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Ks(r,t){return ve(r).put((function(n,s){return{targetId:0,path:Nt(n.path),sequenceNumber:s}})(t,r.currentSequenceNumber))}/**
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
 */class Rd{constructor(){this.changes=new fe((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,at.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class dp{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return $e(t).put(n)}removeEntry(t,e,n){return $e(t).delete((function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],fi(a),u[u.length-1]]})(e,n))}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.Dr(t,n))))}getEntry(t,e){let n=at.newInvalidDocument(e);return $e(t).ee({index:Xs,range:IDBKeyRange.only(Nr(e))},((s,i)=>{n=this.Cr(e,i)})).next((()=>n))}vr(t,e){let n={size:0,document:at.newInvalidDocument(e)};return $e(t).ee({index:Xs,range:IDBKeyRange.only(Nr(e))},((s,i)=>{n={document:this.Cr(e,i),size:gi(i)}})).next((()=>n))}getEntries(t,e){let n=qt();return this.Fr(t,e,((s,i)=>{const a=this.Cr(s,i);n=n.insert(s,a)})).next((()=>n))}Mr(t,e){let n=qt(),s=new it(k.comparator);return this.Fr(t,e,((i,a)=>{const u=this.Cr(i,a);n=n.insert(i,u),s=s.insert(i,gi(a))})).next((()=>({documents:n,Or:s})))}Fr(t,e,n){if(e.isEmpty())return A.resolve();let s=new tt(hl);e.forEach((c=>s=s.add(c)));const i=IDBKeyRange.bound(Nr(s.first()),Nr(s.last())),a=s.getIterator();let u=a.getNext();return $e(t).ee({index:Xs,range:i},((c,h,f)=>{const g=k.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&hl(u,g)<0;)n(u,null),u=a.getNext();u&&u.isEqual(g)&&(n(u,h),u=a.hasNext()?a.getNext():null),u?f.j(Nr(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),fi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return $e(t).J(IDBKeyRange.bound(u,c,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=qt();for(const g of h){const _=this.Cr(k.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);_.isFoundDocument()&&(ds(e,_)||s.has(_.key))&&(f=f.insert(_.key,_))}return f}))}getAllFromCollectionGroup(t,e,n,s){let i=qt();const a=ll(e,n),u=ll(e,Kt.max());return $e(t).ee({index:ah,range:IDBKeyRange.bound(a,u,!0)},((c,h,f)=>{const g=this.Cr(k.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(g.key,g),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(t){return new fp(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((e=>e.byteSize))}getMetadata(t){return cl(t).get(Mo).next((e=>(L(!!e,20021),e)))}Dr(t,e){return cl(t).put(Mo,e)}Cr(t,e){if(e){const n=Yg(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return at.newInvalidDocument(t)}}function Pd(r){return new dp(r)}class fp extends Rd{constructor(t,e){super(),this.Nr=t,this.trackRemovals=e,this.Br=new fe((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(t){const e=[];let n=0,s=new tt(((i,a)=>G(i.canonicalString(),a.canonicalString())));return this.changes.forEach(((i,a)=>{const u=this.Br.get(i);if(e.push(this.Nr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const c=Qc(this.Nr.serializer,a);s=s.add(i.path.popLast());const h=gi(c);n+=h-u.size,e.push(this.Nr.addEntry(t,i,c))}else if(n-=u.size,this.trackRemovals){const c=Qc(this.Nr.serializer,a.convertToNoDocument(B.min()));e.push(this.Nr.addEntry(t,i,c))}})),s.forEach((i=>{e.push(this.Nr.indexManager.addToCollectionParentIndex(t,i))})),e.push(this.Nr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.Nr.vr(t,e).next((n=>(this.Br.set(e,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(t,e){return this.Nr.Mr(t,e).next((({documents:n,Or:s})=>(s.forEach(((i,a)=>{this.Br.set(i,{size:a,readTime:n.get(i).readTime})})),n)))}}function cl(r){return It(r,Hr)}function $e(r){return It(r,ui)}function Nr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function ll(r,t){const e=t.documentKey.path.toArray();return[r,fi(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function hl(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=G(e[i],n[i]),s)return s;return s=G(e.length,n.length),s||(s=G(e[e.length-2],n[n.length-2]),s||G(e[e.length-1],n[n.length-1]))}/**
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
 */class mp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Sd{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(n=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(n!==null&&Kr(n.mutation,s,Lt.empty(),Y.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,z()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=z()){const s=Zt();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,n).next((i=>{let a=Fr();return i.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const n=Zt();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,z())))}populateOverlays(t,e,n){const s=[];return n.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,u)=>{e.set(a,u)}))}))}computeViews(t,e,n,s){let i=qt();const a=zr(),u=(function(){return zr()})();return e.forEach(((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof me)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Kr(f.mutation,h,f.mutation.getFieldMask(),Y.now())):a.set(h.key,Lt.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((h,f)=>a.set(h,f))),e.forEach(((h,f)=>u.set(h,new mp(f,a.get(h)??null)))),u)))}recalculateAndSaveOverlays(t,e){const n=zr();let s=new it(((a,u)=>a-u)),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const u of a)u.keys().forEach((c=>{const h=e.get(c);if(h===null)return;let f=n.get(c)||Lt.empty();f=u.applyToLocalView(h,f),n.set(c,f);const g=(s.get(u.batchId)||z()).add(c);s=s.insert(u.batchId,g)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,g=jh();f.forEach((_=>{if(!i.has(_)){const S=Hh(e.get(_),n.get(_));S!==null&&g.set(_,S),i=i.add(_)}})),a.push(this.documentOverlayCache.saveOverlays(t,h,g))}return A.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,s){return(function(a){return k.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):_a(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Zt());let u=Ln,c=i;return a.next((h=>A.forEach(h,((f,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next((_=>{c=c.insert(f,_)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,c,h,z()))).next((f=>({batchId:u,changes:Uh(f)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next((n=>{let s=Fr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=Fr();return this.indexManager.getCollectionParents(t,i).next((u=>A.forEach(u,(c=>{const h=(function(g,_){return new de(_,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next((f=>{f.forEach(((g,_)=>{a=a.insert(g,_)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s)))).next((a=>{i.forEach(((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,at.newInvalidDocument(f)))}));let u=Fr();return a.forEach(((c,h)=>{const f=i.get(c);f!==void 0&&Kr(f.mutation,h,Lt.empty(),Y.now()),ds(e,h)&&(u=u.insert(c,h))})),u}))}}/**
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
 */class gp{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return A.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:gt(s.createTime)}})(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(s){return{name:s.name,query:ki(s.bundledQuery),readTime:gt(s.readTime)}})(e)),A.resolve()}}/**
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
 */class pp{constructor(){this.overlays=new it(k.comparator),this.qr=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Zt();return A.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((s,i)=>{this.St(t,e,i)})),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Zt(),i=e.length+1,a=new k(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new it(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Zt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Zt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,f)=>u.set(h,f))),!(u.size()>=s)););return A.resolve(u)}St(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Aa(e,n));let i=this.qr.get(e);i===void 0&&(i=z(),this.qr.set(e,i)),this.qr.set(e,i.add(n.key))}}/**
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
 */class _p{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
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
 */class Va{constructor(){this.Qr=new tt(Tt.$r),this.Ur=new tt(Tt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new Tt(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Gr(new Tt(t,e))}zr(t,e){t.forEach((n=>this.removeReference(n,e)))}jr(t){const e=new k(new K([])),n=new Tt(e,t),s=new Tt(e,t+1),i=[];return this.Ur.forEachInRange([n,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new k(new K([])),n=new Tt(e,t),s=new Tt(e,t+1);let i=z();return this.Ur.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const e=new Tt(t,0),n=this.Qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class Tt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return k.comparator(t.key,e.key)||G(t.Yr,e.Yr)}static Kr(t,e){return G(t.Yr,e.Yr)||k.comparator(t.key,e.key)}}/**
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
 */class yp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new tt(Tt.$r)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ea(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Zr=this.Zr.add(new Tt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.ei(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?be:this.tr-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Tt(e,0),s=new Tt(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],(a=>{const u=this.Xr(a.Yr);i.push(u)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(G);return e.forEach((s=>{const i=new Tt(s,0),a=new Tt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(u=>{n=n.add(u.Yr)}))})),A.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const a=new Tt(new k(i),0);let u=new tt(G);return this.Zr.forEachWhile((c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.Yr)),!0)}),a),A.resolve(this.ti(u))}ti(t){const e=[];return t.forEach((n=>{const s=this.Xr(n);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){L(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return A.forEach(e.mutations,(s=>{const i=new Tt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Zr=n}))}ir(t){}containsKey(t,e){const n=new Tt(e,0),s=this.Zr.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Ip{constructor(t){this.ri=t,this.docs=(function(){return new it(k.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():at.newInvalidDocument(e))}getEntries(t,e){let n=qt();return e.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():at.newInvalidDocument(s))})),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=qt();const a=e.path,u=new k(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||ua(eh(f),n)<=0||(s.has(f.key)||ds(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){O(9500)}ii(t,e){return A.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new Tp(this)}getSize(t){return A.resolve(this.size)}}class Tp extends Rd{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(n)})),A.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
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
 */class Ep{constructor(t){this.persistence=t,this.si=new fe((e=>an(e)),ls),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new Va,this.targetCount=0,this.ai=dn.ur()}forEachTarget(t,e){return this.si.forEach(((n,s)=>e(s))),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),A.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new dn(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.Pr(e),A.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.si.forEach(((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),A.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this._i.containsKey(e))}}/**
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
 */class ba{constructor(t,e){this.ui={},this.overlays={},this.ci=new Ot(0),this.li=!1,this.li=!0,this.hi=new _p,this.referenceDelegate=t(this),this.Pi=new Ep(this),this.indexManager=new op,this.remoteDocumentCache=(function(s){return new Ip(s)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new md(e),this.Ii=new gp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new pp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new yp(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){N("MemoryPersistence","Starting transaction:",t);const s=new wp(this.ci.next());return this.referenceDelegate.Ei(),n(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(t,e){return A.or(Object.values(this.ui).map((n=>()=>n.containsKey(t,e))))}}class wp extends rh{constructor(t){super(),this.currentSequenceNumber=t}}class Oi{constructor(t){this.persistence=t,this.Ri=new Va,this.Vi=null}static mi(t){return new Oi(t)}get fi(){if(this.Vi)return this.Vi;throw O(60996)}addReference(t,e,n){return this.Ri.addReference(n,e),this.fi.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Ri.removeReference(n,e),this.fi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),A.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach((s=>this.fi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>n.removeTargetData(t,e)))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.fi,(n=>{const s=k.fromPath(n);return this.gi(t,s).next((i=>{i||e.removeEntry(s,B.min())}))})).next((()=>(this.Vi=null,e.apply(t))))}updateLimboDocument(t,e){return this.gi(t,e).next((n=>{n?this.fi.delete(e.toString()):this.fi.add(e.toString())}))}Ti(t){return 0}gi(t,e){return A.or([()=>A.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class pi{constructor(t,e){this.persistence=t,this.pi=new fe((n=>Nt(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=vd(this,e)}static mi(t,e){return new pi(t,e)}Ei(){}di(t){return A.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next((n=>e.next((s=>n+s))))}wr(t){let e=0;return this.pr(t,(n=>{e++})).next((()=>e))}pr(t,e){return A.forEach(this.pi,((n,s)=>this.br(t,n,s).next((i=>i?A.resolve():e(s)))))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(t,(a=>this.br(t,a,e).next((u=>{u||(n++,i.removeEntry(a,B.min()))})))).next((()=>i.apply(t))).next((()=>n))}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),A.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),A.resolve()}removeReference(t,e,n){return this.pi.set(n,t.currentSequenceNumber),A.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),A.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Zs(t.data.value)),e}br(t,e,n){return A.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class Ap{constructor(t){this.serializer=t}k(t,e,n,s){const i=new Ai("createOrUpgrade",e);n<1&&s>=1&&((function(c){c.createObjectStore(cs)})(t),(function(c){c.createObjectStore(Wr,{keyPath:jm}),c.createObjectStore(Wt,{keyPath:wc,autoIncrement:!0}).createIndex(tn,Ac,{unique:!0}),c.createObjectStore(Un)})(t),dl(t),(function(c){c.createObjectStore(He)})(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&((function(c){c.deleteObjectStore(Gn),c.deleteObjectStore(jn),c.deleteObjectStore(nn)})(t),dl(t)),a=a.next((()=>(function(c){const h=c.store(nn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(ci,f)})(i)))),n<4&&s>=4&&(n!==0&&(a=a.next((()=>(function(c,h){return h.store(Wt).J().next((g=>{c.deleteObjectStore(Wt),c.createObjectStore(Wt,{keyPath:wc,autoIncrement:!0}).createIndex(tn,Ac,{unique:!0});const _=h.store(Wt),S=g.map((C=>_.put(C)));return A.waitFor(S)}))})(t,i)))),a=a.next((()=>{(function(c){c.createObjectStore(zn,{keyPath:Xm})})(t)}))),n<5&&s>=5&&(a=a.next((()=>this.yi(i)))),n<6&&s>=6&&(a=a.next((()=>((function(c){c.createObjectStore(Hr)})(t),this.wi(i))))),n<7&&s>=7&&(a=a.next((()=>this.Si(i)))),n<8&&s>=8&&(a=a.next((()=>this.bi(t,i)))),n<9&&s>=9&&(a=a.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(t)}))),n<10&&s>=10&&(a=a.next((()=>this.Di(i)))),n<11&&s>=11&&(a=a.next((()=>{(function(c){c.createObjectStore(vi,{keyPath:Ym})})(t),(function(c){c.createObjectStore(Ri,{keyPath:Zm})})(t)}))),n<12&&s>=12&&(a=a.next((()=>{(function(c){const h=c.createObjectStore(Pi,{keyPath:og});h.createIndex(Oo,ag,{unique:!1}),h.createIndex(hh,ug,{unique:!1})})(t)}))),n<13&&s>=13&&(a=a.next((()=>(function(c){const h=c.createObjectStore(ui,{keyPath:zm});h.createIndex(Xs,Km),h.createIndex(ah,Qm)})(t))).next((()=>this.Ci(t,i))).next((()=>t.deleteObjectStore(He)))),n<14&&s>=14&&(a=a.next((()=>this.Fi(t,i)))),n<15&&s>=15&&(a=a.next((()=>(function(c){c.createObjectStore(ha,{keyPath:tg,autoIncrement:!0}).createIndex(Fo,eg,{unique:!1}),c.createObjectStore(Ur,{keyPath:ng}).createIndex(ch,rg,{unique:!1}),c.createObjectStore(jr,{keyPath:sg}).createIndex(lh,ig,{unique:!1})})(t)))),n<16&&s>=16&&(a=a.next((()=>{e.objectStore(Ur).clear()})).next((()=>{e.objectStore(jr).clear()}))),n<17&&s>=17&&(a=a.next((()=>{(function(c){c.createObjectStore(da,{keyPath:cg})})(t)}))),n<18&&s>=18&&jl()&&(a=a.next((()=>{e.objectStore(Ur).clear()})).next((()=>{e.objectStore(jr).clear()}))),a}wi(t){let e=0;return t.store(He).ee(((n,s)=>{e+=gi(s)})).next((()=>{const n={byteSize:e};return t.store(Hr).put(Mo,n)}))}yi(t){const e=t.store(Wr),n=t.store(Wt);return e.J().next((s=>A.forEach(s,(i=>{const a=IDBKeyRange.bound([i.userId,be],[i.userId,i.lastAcknowledgedBatchId]);return n.J(tn,a).next((u=>A.forEach(u,(c=>{L(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const h=Xe(this.serializer,c);return Id(t,i.userId,h).next((()=>{}))}))))}))))}Si(t){const e=t.store(Gn),n=t.store(He);return t.store(nn).get(ci).next((s=>{const i=[];return n.ee(((a,u)=>{const c=new K(a),h=(function(g){return[0,Nt(g)]})(c);i.push(e.get(h).next((f=>f?A.resolve():(g=>e.put({targetId:0,path:Nt(g),sequenceNumber:s.highestListenSequenceNumber}))(c))))})).next((()=>A.waitFor(i)))}))}bi(t,e){t.createObjectStore(Jr,{keyPath:Jm});const n=e.store(Jr),s=new Sa,i=a=>{if(s.add(a)){const u=a.lastSegment(),c=a.popLast();return n.put({collectionId:u,parent:Nt(c)})}};return e.store(He).ee({X:!0},((a,u)=>{const c=new K(a);return i(c.popLast())})).next((()=>e.store(Un).ee({X:!0},(([a,u,c],h)=>{const f=Yt(u);return i(f.popLast())}))))}Di(t){const e=t.store(jn);return e.ee(((n,s)=>{const i=Lr(s),a=gd(this.serializer,i);return e.put(a)}))}Ci(t,e){const n=e.store(He),s=[];return n.ee(((i,a)=>{const u=e.store(ui),c=(function(g){return g.document?new k(K.fromString(g.document.name).popFirst(5)):g.noDocument?k.fromSegments(g.noDocument.path):g.unknownDocument?k.fromSegments(g.unknownDocument.path):O(36783)})(a).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(h))})).next((()=>A.waitFor(s)))}Fi(t,e){const n=e.store(Wt),s=Pd(this.serializer),i=new ba(Oi.mi,this.serializer.yt);return n.J().next((a=>{const u=new Map;return a.forEach((c=>{let h=u.get(c.userId)??z();Xe(this.serializer,c).keys().forEach((f=>h=h.add(f))),u.set(c.userId,h)})),A.forEach(u,((c,h)=>{const f=new Et(h),g=Mi.wt(this.serializer,f),_=i.getIndexManager(f),S=Fi.wt(f,this.serializer,_,i.referenceDelegate);return new Sd(s,S,g,_).recalculateAndSaveOverlaysForDocumentKeys(new Lo(e,Ot.ce),c).next()}))}))}}function dl(r){r.createObjectStore(Gn,{keyPath:Wm}).createIndex(la,Hm,{unique:!0}),r.createObjectStore(jn,{keyPath:"targetId"}).createIndex(uh,$m,{unique:!0}),r.createObjectStore(nn)}const we="IndexedDbPersistence",Ao=18e5,vo=5e3,Ro="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Vd="main";class Ca{constructor(t,e,n,s,i,a,u,c,h,f,g=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Mi=i,this.window=a,this.document=u,this.xi=h,this.Oi=f,this.Ni=g,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=_=>Promise.resolve(),!Ca.v())throw new b(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new hp(this,s),this.$i=e+Vd,this.serializer=new md(c),this.Ui=new te(this.$i,this.Ni,new Ap(this.serializer)),this.hi=new tp,this.Pi=new up(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Pd(this.serializer),this.Ii=new Zg,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&mt(we,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new b(R.FAILED_PRECONDITION,Ro);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Pi.getHighestSequenceNumber(t)))})).then((t=>{this.ci=new Ot(t,this.xi)})).then((()=>{this.li=!0})).catch((t=>(this.Ui&&this.Ui.close(),Promise.reject(t))))}Ji(t){return this.Qi=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ui.$((async e=>{e.newVersion===null&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Mi.enqueueAndForget((async()=>{this.started&&await this.Wi()})))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Qs(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.Hi(t).next((e=>{e||(this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))))}))})).next((()=>this.Yi(t))).next((e=>this.isPrimary&&!e?this.Zi(t).next((()=>!1)):!!e&&this.Xi(t).next((()=>!0)))))).catch((t=>{if(Le(t))return N(we,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return N(we,"Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Mi.enqueueRetryable((()=>this.Qi(t))),this.isPrimary=t}))}Hi(t){return kr(t).get(Rn).next((e=>A.resolve(this.es(e))))}ts(t){return Qs(t).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,Ao)){this.qi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(e=>{const n=It(e,zn);return n.J().next((s=>{const i=this.ss(s,Ao),a=s.filter((u=>i.indexOf(u)===-1));return A.forEach(a,(u=>n.delete(u.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Ki)for(const e of t)this.Ki.removeItem(this._s(e.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Wi().then((()=>this.ns())).then((()=>this.ji()))))}es(t){return!!t&&t.ownerId===this.clientId}Yi(t){return this.Oi?A.resolve(!0):kr(t).get(Rn).next((e=>{if(e!==null&&this.rs(e.leaseTimestampMs,vo)&&!this.us(e.ownerId)){if(this.es(e)&&this.networkEnabled)return!0;if(!this.es(e)){if(!e.allowTabSynchronization)throw new b(R.FAILED_PRECONDITION,Ro);return!1}}return!(!this.networkEnabled||!this.inForeground)||Qs(t).J().next((n=>this.ss(n,vo).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1}))===void 0))})).next((e=>(this.isPrimary!==e&&N(we,`Client ${e?"is":"is not"} eligible for a primary lease.`),e)))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[cs,zn],(t=>{const e=new Lo(t,Ot.ce);return this.Zi(e).next((()=>this.ts(e)))})),this.Ui.close(),this.Ps()}ss(t,e){return t.filter((n=>this.rs(n.updateTimeMs,e)&&!this.us(n.clientId)))}Ts(){return this.runTransaction("getActiveClients","readonly",(t=>Qs(t).J().next((e=>this.ss(e,Ao).map((n=>n.clientId))))))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(t,e){return Fi.wt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new ap(t,this.serializer.yt.databaseId)}getDocumentOverlayCache(t){return Mi.wt(this.serializer,t)}getBundleCache(){return this.Ii}runTransaction(t,e,n){N(we,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=(function(c){return c===18?dg:c===17?gh:c===16?hg:c===15?fa:c===14?mh:c===13?fh:c===12?lg:c===11?dh:void O(60245)})(this.Ni);let a;return this.Ui.runTransaction(t,s,i,(u=>(a=new Lo(u,this.ci?this.ci.next():Ot.ce),e==="readwrite-primary"?this.Hi(a).next((c=>!!c||this.Yi(a))).next((c=>{if(!c)throw mt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))),new b(R.FAILED_PRECONDITION,nh);return n(a)})).next((c=>this.Xi(a).next((()=>c)))):this.Is(a).next((()=>n(a)))))).then((u=>(a.raiseOnCommittedEvent(),u)))}Is(t){return kr(t).get(Rn).next((e=>{if(e!==null&&this.rs(e.leaseTimestampMs,vo)&&!this.us(e.ownerId)&&!this.es(e)&&!(this.Oi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new b(R.FAILED_PRECONDITION,Ro)}))}Xi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return kr(t).put(Rn,e)}static v(){return te.v()}Zi(t){const e=kr(t);return e.get(Rn).next((n=>this.es(n)?(N(we,"Releasing primary lease."),e.delete(Rn)):A.resolve()))}rs(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(mt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi())))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){typeof this.window?.addEventListener=="function"&&(this.Bi=()=>{this.cs();const t=/(?:Version|Mobile)\/1[456]/;Ul()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(t){try{const e=this.Ki?.getItem(this._s(t))!==null;return N(we,`Client '${t}' ${e?"is":"is not"} zombied in LocalStorage`),e}catch(e){return mt(we,"Failed to get zombied client id.",e),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(t){mt("Failed to set zombie client id.",t)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function kr(r){return It(r,cs)}function Qs(r){return It(r,zn)}function xa(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class Da{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Es=n,this.ds=s}static As(t,e){let n=z(),s=z();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Da(t,e.fromCache,n,s)}}/**
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
 */class vp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class bd{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Ul()?8:sh(oi())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.ys(t,e).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(t,e,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new vp;return this.Ss(t,e,a).next((u=>{if(i.result=u,this.Vs)return this.bs(t,e,a,u.size)}))})).next((()=>i.result))}bs(t,e,n,s){return n.documentReadCount<this.fs?(xn()<=ue.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Dn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),A.resolve()):(xn()<=ue.DEBUG&&N("QueryEngine","Query:",Dn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(xn()<=ue.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Dn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,kt(e))):A.resolve())}ys(t,e){if(Fc(e))return A.resolve(null);let n=kt(e);return this.indexManager.getIndexType(t,n).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=di(e,null,"F"),n=kt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((i=>{const a=z(...i);return this.ps.getDocuments(t,a).next((u=>this.indexManager.getMinOffset(t,n).next((c=>{const h=this.Ds(e,u);return this.Cs(e,h,a,c.readTime)?this.ys(t,di(e,null,"F")):this.vs(t,h,e,c)}))))})))))}ws(t,e,n,s){return Fc(e)||s.isEqual(B.min())?A.resolve(null):this.ps.getDocuments(t,n).next((i=>{const a=this.Ds(e,i);return this.Cs(e,a,n,s)?A.resolve(null):(xn()<=ue.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dn(e)),this.vs(t,a,e,th(s,Ln)).next((u=>u)))}))}Ds(t,e){let n=new tt(qh(t));return e.forEach(((s,i)=>{ds(t,i)&&(n=n.add(i))})),n}Cs(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(t,e,n){return xn()<=ue.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Dn(e)),this.ps.getDocumentsMatchingQuery(t,e,Kt.min(),n)}vs(t,e,n,s){return this.ps.getDocumentsMatchingQuery(t,n,s).next((i=>(e.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */const Na="LocalStore",Rp=3e8;class Pp{constructor(t,e,n,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new it(G),this.xs=new fe((i=>an(i)),ls),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Sd(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}}function Cd(r,t,e,n){return new Pp(r,t,e,n)}async function xd(r,t){const e=M(r);return await e.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,e.Bs(t),e.mutationQueue.getAllMutationBatches(n)))).next((i=>{const a=[],u=[];let c=z();for(const h of s){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return e.localDocuments.getDocuments(n,c).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:u})))}))}))}function Sp(r,t){const e=M(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=t.batch.keys(),i=e.Ns.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,f){const g=h.batch,_=g.keys();let S=A.resolve();return _.forEach((C=>{S=S.next((()=>f.getEntry(c,C))).next((x=>{const D=h.docVersions.get(C);L(D!==null,48541),x.version.compareTo(D)<0&&(g.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))}))})),S.next((()=>u.mutationQueue.removeMutationBatch(c,g)))})(e,n,t,i).next((()=>i.apply(n))).next((()=>e.mutationQueue.performConsistencyCheck(n))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=z();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(t)))).next((()=>e.localDocuments.getDocuments(n,s)))}))}function Dd(r){const t=M(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Pi.getLastRemoteSnapshotVersion(e)))}function Vp(r,t){const e=M(r),n=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const u=[];t.targetChanges.forEach(((f,g)=>{const _=s.get(g);if(!_)return;u.push(e.Pi.removeMatchingKeys(i,f.removedDocuments,g).next((()=>e.Pi.addMatchingKeys(i,f.addedDocuments,g))));let S=_.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?S=S.withResumeToken(ft.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),s=s.insert(g,S),(function(x,D,U){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=Rp?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0})(_,S,f)&&u.push(e.Pi.updateTargetData(i,S))}));let c=qt(),h=z();if(t.documentUpdates.forEach((f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))})),u.push(Nd(i,a,t.documentUpdates).next((f=>{c=f.ks,h=f.qs}))),!n.isEqual(B.min())){const f=e.Pi.getLastRemoteSnapshotVersion(i).next((g=>e.Pi.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(f)}return A.waitFor(u).next((()=>a.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(e.Ms=s,i)))}function Nd(r,t,e){let n=z(),s=z();return e.forEach((i=>n=n.add(i))),t.getEntries(r,n).next((i=>{let a=qt();return e.forEach(((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(B.min())?(t.removeEntry(u,c.readTime),a=a.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),a=a.insert(u,c)):N(Na,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{ks:a,qs:s}}))}function bp(r,t){const e=M(r);return e.persistence.runTransaction("Get next mutation batch","readonly",(n=>(t===void 0&&(t=be),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t))))}function Xn(r,t){const e=M(r);return e.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return e.Pi.getTargetData(n,t).next((i=>i?(s=i,A.resolve(s)):e.Pi.allocateTargetId(n).next((a=>(s=new ce(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Pi.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=e.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(n.targetId,n),e.xs.set(t,n.targetId)),n}))}async function Yn(r,t,e){const n=M(r),s=n.Ms.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Le(a))throw a;N(Na,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Ms=n.Ms.remove(t),n.xs.delete(s.target)}function _i(r,t,e){const n=M(r);let s=B.min(),i=z();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,h,f){const g=M(c),_=g.xs.get(f);return _!==void 0?A.resolve(g.Ms.get(_)):g.Pi.getTargetData(h,f)})(n,a,kt(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(a,u.targetId).next((c=>{i=c}))})).next((()=>n.Fs.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:z()))).next((u=>(Fd(n,Lh(t),u),{documents:u,Qs:i})))))}function kd(r,t){const e=M(r),n=M(e.Pi),s=e.Ms.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,t).next((a=>a?a.target:null))))}function Md(r,t){const e=M(r),n=e.Os.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",(s=>e.Ns.getAllFromCollectionGroup(s,t,th(n,Ln),Number.MAX_SAFE_INTEGER))).then((s=>(Fd(e,t,s),s)))}function Fd(r,t,e){let n=r.Os.get(t)||B.min();e.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Os.set(t,n)}async function Cp(r,t,e,n){const s=M(r);let i=z(),a=qt();for(const h of e){const f=t.$s(h.metadata.name);h.document&&(i=i.add(f));const g=t.Us(h);g.setReadTime(t.Ks(h.metadata.readTime)),a=a.insert(f,g)}const u=s.Ns.newChangeBuffer({trackRemovals:!0}),c=await Xn(s,(function(f){return kt(sr(K.fromString(`__bundle__/docs/${f}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(h=>Nd(h,u,a).next((f=>(u.apply(h),f))).next((f=>s.Pi.removeMatchingKeysForTargetId(h,c.targetId).next((()=>s.Pi.addMatchingKeys(h,i,c.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(h,f.ks,f.qs))).next((()=>f.ks))))))}async function xp(r,t,e=z()){const n=await Xn(r,kt(ki(t.bundledQuery))),s=M(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const a=gt(t.readTime);if(n.snapshotVersion.compareTo(a)>=0)return s.Ii.saveNamedQuery(i,t);const u=n.withResumeToken(ft.EMPTY_BYTE_STRING,a);return s.Ms=s.Ms.insert(u.targetId,u),s.Pi.updateTargetData(i,u).next((()=>s.Pi.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.Pi.addMatchingKeys(i,e,n.targetId))).next((()=>s.Ii.saveNamedQuery(i,t)))}))}/**
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
 */const Od="firestore_clients";function fl(r,t){return`${Od}_${r}_${t}`}const Ld="firestore_mutations";function ml(r,t,e){let n=`${Ld}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const qd="firestore_targets";function Po(r,t){return`${qd}_${r}_${t}`}/**
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
 */const Xt="SharedClientState";class yi{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Ws(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new b(s.error.code,s.error.message))),a?new yi(t,e,s.state,i):(mt(Xt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}Gs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Qr{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Ws(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new b(n.error.code,n.error.message))),i?new Qr(t,n.state,s):(mt(Xt,`Failed to parse target state for ID '${t}': ${e}`),null)}Gs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Ii{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Ws(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=ya();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=ih(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new Ii(t,i):(mt(Xt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class ka{constructor(t,e){this.clientId=t,this.onlineState=e}static Ws(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new ka(e.clientId,e.onlineState):(mt(Xt,`Failed to parse online state: ${t}`),null)}}class Zo{constructor(){this.activeTargetIds=ya()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class So{constructor(t,e,n,s,i){this.window=t,this.Mi=e,this.persistenceKey=n,this.Js=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new it(G),this.started=!1,this.Xs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.eo=fl(this.persistenceKey,this.Js),this.no=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new Zo),this.ro=new RegExp(`^${Od}_${a}_([^_]*)$`),this.io=new RegExp(`^${Ld}_${a}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${qd}_${a}_(\\d+)$`),this.oo=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this._o=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.Ts();for(const n of t){if(n===this.Js)continue;const s=this.getItem(fl(this.persistenceKey,n));if(s){const i=Ii.Ws(n,s);i&&(this.Zs=this.Zs.insert(i.clientId,i))}}this.ao();const e=this.storage.getItem(this.oo);if(e){const n=this.uo(e);n&&this.co(n)}for(const n of this.Xs)this.Ys(n);this.Xs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.no,JSON.stringify(t))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(t){let e=!1;return this.Zs.forEach(((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.ho(t,"pending")}updateMutationState(t,e,n){this.ho(t,e,n),this.Po(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(Po(this.persistenceKey,t));if(s){const i=Qr.Ws(t,s);i&&(n=i.state)}}return e&&this.To.zs(t),this.ao(),n}removeLocalQueryTarget(t){this.To.js(t),this.ao()}isLocalQueryTarget(t){return this.To.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Po(this.persistenceKey,t))}updateQueryState(t,e,n){this.Io(t,e,n)}handleUserChange(t,e,n){e.forEach((s=>{this.Po(s)})),this.currentUser=t,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(t){this.Eo(t)}notifyBundleLoaded(t){this.Ao(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return N(Xt,"READ",t,e),e}setItem(t,e){N(Xt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){N(Xt,"REMOVE",t),this.storage.removeItem(t)}Ys(t){const e=t;if(e.storageArea===this.storage){if(N(Xt,"EVENT",e.key,e.newValue),e.key===this.eo)return void mt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable((async()=>{if(this.started){if(e.key!==null){if(this.ro.test(e.key)){if(e.newValue==null){const n=this.Ro(e.key);return this.Vo(n,null)}{const n=this.mo(e.key,e.newValue);if(n)return this.Vo(n.clientId,n)}}else if(this.io.test(e.key)){if(e.newValue!==null){const n=this.fo(e.key,e.newValue);if(n)return this.po(n)}}else if(this.so.test(e.key)){if(e.newValue!==null){const n=this.yo(e.key,e.newValue);if(n)return this.wo(n)}}else if(e.key===this.oo){if(e.newValue!==null){const n=this.uo(e.newValue);if(n)return this.co(n)}}else if(e.key===this.no){const n=(function(i){let a=Ot.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{So:i}),a=u}catch(u){mt(Xt,"Failed to read sequence number from WebStorage",u)}return a})(e.newValue);n!==Ot.ce&&this.sequenceNumberHandler(n)}else if(e.key===this._o){const n=this.bo(e.newValue);await Promise.all(n.map((s=>this.syncEngine.Do(s))))}}}else this.Xs.push(e)}))}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(t,e,n){const s=new yi(this.currentUser,t,e,n),i=ml(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Gs())}Po(t){const e=ml(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Eo(t){const e={clientId:this.Js,onlineState:t};this.storage.setItem(this.oo,JSON.stringify(e))}Io(t,e,n){const s=Po(this.persistenceKey,t),i=new Qr(t,e,n);this.setItem(s,i.Gs())}Ao(t){const e=JSON.stringify(Array.from(t));this.setItem(this._o,e)}Ro(t){const e=this.ro.exec(t);return e?e[1]:null}mo(t,e){const n=this.Ro(t);return Ii.Ws(n,e)}fo(t,e){const n=this.io.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return yi.Ws(new Et(i),s,e)}yo(t,e){const n=this.so.exec(t),s=Number(n[1]);return Qr.Ws(s,e)}uo(t){return ka.Ws(t)}bo(t){return JSON.parse(t)}async po(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.Co(t.batchId,t.state,t.error);N(Xt,`Ignoring mutation for non-active user ${t.user.uid}`)}wo(t){return this.syncEngine.vo(t.targetId,t.state,t.error)}Vo(t,e){const n=e?this.Zs.insert(t,e):this.Zs.remove(t),s=this.lo(this.Zs),i=this.lo(n),a=[],u=[];return i.forEach((c=>{s.has(c)||a.push(c)})),s.forEach((c=>{i.has(c)||u.push(c)})),this.syncEngine.Fo(a,u).then((()=>{this.Zs=n}))}co(t){this.Zs.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}lo(t){let e=ya();return t.forEach(((n,s)=>{e=e.unionWith(s.activeTargetIds)})),e}}class Bd{constructor(){this.Mo=new Zo,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Zo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class Dp{Oo(t){}shutdown(){}}/**
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
 */const gl="ConnectivityMonitor";class pl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(gl,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N(gl,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let $s=null;function ta(){return $s===null?$s=(function(){return 268435456+Math.round(2147483648*Math.random())})():$s++,"0x"+$s.toString(16)}/**
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
 */const Vo="RestConnection",Np={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class kp{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===Yr?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(t,e,n,s,i){const a=ta(),u=this.zo(t,e.toUriEncodedString());N(Vo,`Sending RPC '${t}' ${a}:`,u,n);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,i);const{host:h}=new URL(u),f=sa(h);return this.Jo(t,u,c,n,f).then((g=>(N(Vo,`Received RPC '${t}' ${a}: `,g),g)),(g=>{throw Qt(Vo,`RPC '${t}' ${a} failed with error: `,g,"url: ",u,"request:",n),g}))}Ho(t,e,n,s,i,a){return this.Go(t,e,n,s,i)}jo(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+rr})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),n&&n.headers.forEach(((s,i)=>t[i]=s))}zo(t,e){const n=Np[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}}/**
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
 */class Mp{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
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
 */const xt="WebChannelConnection";class Fp extends kp{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,s,i){const a=ta();return new Promise(((u,c)=>{const h=new zl;h.setWithCredentials(!0),h.listenOnce(Kl.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Hs.NO_ERROR:const g=h.getResponseJson();N(xt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(g)),u(g);break;case Hs.TIMEOUT:N(xt,`RPC '${t}' ${a} timed out`),c(new b(R.DEADLINE_EXCEEDED,"Request time out"));break;case Hs.HTTP_ERROR:const _=h.getStatus();if(N(xt,`RPC '${t}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S?.error;if(C&&C.status&&C.message){const x=(function(U){const j=U.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(j)>=0?j:R.UNKNOWN})(C.status);c(new b(x,C.message))}else c(new b(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new b(R.UNAVAILABLE,"Connection failed."));break;default:O(9055,{l_:t,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{N(xt,`RPC '${t}' ${a} completed.`)}}));const f=JSON.stringify(s);N(xt,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,n,15)}))}T_(t,e,n){const s=ta(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Wl(),u=$l(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,e,n),c.encodeInitMessageHeaders=!0;const f=i.join("");N(xt,`Creating RPC '${t}' stream ${s}: ${f}`,c);const g=a.createWebChannel(f,c);this.I_(g);let _=!1,S=!1;const C=new Mp({Yo:D=>{S?N(xt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(_||(N(xt,`Opening RPC '${t}' stream ${s} transport.`),g.open(),_=!0),N(xt,`RPC '${t}' stream ${s} sending:`,D),g.send(D))},Zo:()=>g.close()}),x=(D,U,j)=>{D.listen(U,(q=>{try{j(q)}catch(X){setTimeout((()=>{throw X}),0)}}))};return x(g,Mr.EventType.OPEN,(()=>{S||(N(xt,`RPC '${t}' stream ${s} transport opened.`),C.o_())})),x(g,Mr.EventType.CLOSE,(()=>{S||(S=!0,N(xt,`RPC '${t}' stream ${s} transport closed`),C.a_(),this.E_(g))})),x(g,Mr.EventType.ERROR,(D=>{S||(S=!0,Qt(xt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),C.a_(new b(R.UNAVAILABLE,"The operation could not be completed")))})),x(g,Mr.EventType.MESSAGE,(D=>{if(!S){const U=D.data[0];L(!!U,16349);const j=U,q=j?.error||j[0]?.error;if(q){N(xt,`RPC '${t}' stream ${s} received error:`,q);const X=q.status;let nt=(function(p){const I=pt[p];if(I!==void 0)return Zh(I)})(X),H=q.message;nt===void 0&&(nt=R.INTERNAL,H="Unknown error status: "+X+" with message "+q.message),S=!0,C.a_(new b(nt,H)),g.close()}else N(xt,`RPC '${t}' stream ${s} received:`,U),C.u_(U)}})),x(u,Ql.STAT_EVENT,(D=>{D.stat===Co.PROXY?N(xt,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Co.NOPROXY&&N(xt,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.__()}),0),C}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}}/**
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
 */function Ud(){return typeof window<"u"?window:null}function si(){return typeof document<"u"?document:null}/**
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
 */function pn(r){return new jg(r,!0)}/**
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
 */class Ma{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-n);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const _l="PersistentStream";class jd{constructor(t,e,n,s,i,a,u,c){this.Mi=t,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ma(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===R.RESOURCE_EXHAUSTED?(mt(e.toString()),mt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===e&&this.G_(n,s)}),(n=>{t((()=>{const s=new b(R.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return N(_l,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(N(_l,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Op extends jd{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Kg(this.serializer,t),n=(function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?gt(a.readTime):B.min()})(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=Wo(this.serializer),e.addTarget=(function(i,a){let u;const c=a.target;if(u=li(c)?{documents:ud(i,c)}:{query:Ni(i,c).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=rd(i,a.resumeToken);const h=Qo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=Jn(i,a.snapshotVersion.toTimestamp());const h=Qo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,t);const n=$g(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=Wo(this.serializer),e.removeTarget=t,this.q_(e)}}class Lp extends jd{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Qg(t.writeResults,t.commitTime),n=gt(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=Wo(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>rs(this.serializer,n)))};this.q_(e)}}/**
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
 */class qp{}class Bp extends qp{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new b(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(t,$o(e,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new b(R.UNKNOWN,i.toString())}))}Ho(t,e,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.Ho(t,$o(e,n),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new b(R.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Up{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(mt(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const fn="RemoteStore";class jp{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{n.enqueueAndForget((async()=>{Be(this)&&(N(fn,"Restarting streams for network reachability change."),await(async function(c){const h=M(c);h.Ea.add(4),await ar(h),h.Ra.set("Unknown"),h.Ea.delete(4),await ps(h)})(this))}))})),this.Ra=new Up(n,s)}}async function ps(r){if(Be(r))for(const t of r.da)await t(!0)}async function ar(r){for(const t of r.da)await t(!1)}function Li(r,t){const e=M(r);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),La(e)?Oa(e):cr(e).O_()&&Fa(e,t))}function Zn(r,t){const e=M(r),n=cr(e);e.Ia.delete(t),n.O_()&&Gd(e,t),e.Ia.size===0&&(n.O_()?n.L_():Be(e)&&e.Ra.set("Unknown"))}function Fa(r,t){if(r.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}cr(r).Y_(t)}function Gd(r,t){r.Va.Ue(t),cr(r).Z_(t)}function Oa(r){r.Va=new Lg({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),At:t=>r.Ia.get(t)||null,ht:()=>r.datastore.serializer.databaseId}),cr(r).start(),r.Ra.ua()}function La(r){return Be(r)&&!cr(r).x_()&&r.Ia.size>0}function Be(r){return M(r).Ea.size===0}function zd(r){r.Va=void 0}async function Gp(r){r.Ra.set("Online")}async function zp(r){r.Ia.forEach(((t,e)=>{Fa(r,t)}))}async function Kp(r,t){zd(r),La(r)?(r.Ra.ha(t),Oa(r)):r.Ra.set("Unknown")}async function Qp(r,t,e){if(r.Ra.set("Online"),t instanceof nd&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Va.removeTarget(u))})(r,t)}catch(n){N(fn,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Ti(r,n)}else if(t instanceof ni?r.Va.Ze(t):t instanceof ed?r.Va.st(t):r.Va.tt(t),!e.isEqual(B.min()))try{const n=await Dd(r.localStore);e.compareTo(n)>=0&&await(function(i,a){const u=i.Va.Tt(a);return u.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(c.resumeToken,a))}})),u.targetMismatches.forEach(((c,h)=>{const f=i.Ia.get(c);if(!f)return;i.Ia.set(c,f.withResumeToken(ft.EMPTY_BYTE_STRING,f.snapshotVersion)),Gd(i,c);const g=new ce(f.target,c,h,f.sequenceNumber);Fa(i,g)})),i.remoteSyncer.applyRemoteEvent(u)})(r,e)}catch(n){N(fn,"Failed to raise snapshot:",n),await Ti(r,n)}}async function Ti(r,t,e){if(!Le(t))throw t;r.Ea.add(1),await ar(r),r.Ra.set("Offline"),e||(e=()=>Dd(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{N(fn,"Retrying IndexedDB access"),await e(),r.Ea.delete(1),await ps(r)}))}function Kd(r,t){return t().catch((e=>Ti(r,e,t)))}async function ur(r){const t=M(r),e=ke(t);let n=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:be;for(;$p(t);)try{const s=await bp(t.localStore,n);if(s===null){t.Ta.length===0&&e.L_();break}n=s.batchId,Wp(t,s)}catch(s){await Ti(t,s)}Qd(t)&&$d(t)}function $p(r){return Be(r)&&r.Ta.length<10}function Wp(r,t){r.Ta.push(t);const e=ke(r);e.O_()&&e.X_&&e.ea(t.mutations)}function Qd(r){return Be(r)&&!ke(r).x_()&&r.Ta.length>0}function $d(r){ke(r).start()}async function Hp(r){ke(r).ra()}async function Jp(r){const t=ke(r);for(const e of r.Ta)t.ea(e.mutations)}async function Xp(r,t,e){const n=r.Ta.shift(),s=wa.from(n,t,e);await Kd(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await ur(r)}async function Yp(r,t){t&&ke(r).X_&&await(async function(n,s){if((function(a){return Yh(a)&&a!==R.ABORTED})(s.code)){const i=n.Ta.shift();ke(n).B_(),await Kd(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await ur(n)}})(r,t),Qd(r)&&$d(r)}async function yl(r,t){const e=M(r);e.asyncQueue.verifyOperationInProgress(),N(fn,"RemoteStore received new credentials");const n=Be(e);e.Ea.add(3),await ar(e),n&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await ps(e)}async function ea(r,t){const e=M(r);t?(e.Ea.delete(2),await ps(e)):t||(e.Ea.add(2),await ar(e),e.Ra.set("Unknown"))}function cr(r){return r.ma||(r.ma=(function(e,n,s){const i=M(e);return i.sa(),new Op(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:Gp.bind(null,r),t_:zp.bind(null,r),r_:Kp.bind(null,r),H_:Qp.bind(null,r)}),r.da.push((async t=>{t?(r.ma.B_(),La(r)?Oa(r):r.Ra.set("Unknown")):(await r.ma.stop(),zd(r))}))),r.ma}function ke(r){return r.fa||(r.fa=(function(e,n,s){const i=M(e);return i.sa(),new Lp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:Hp.bind(null,r),r_:Yp.bind(null,r),ta:Jp.bind(null,r),na:Xp.bind(null,r)}),r.da.push((async t=>{t?(r.fa.B_(),await ur(r)):(await r.fa.stop(),r.Ta.length>0&&(N(fn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
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
 */class qa{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new qa(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new b(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lr(r,t){if(mt("AsyncQueue",`${t}: ${r}`),Le(r))return new b(R.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class rn{static emptySet(t){return new rn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=Fr(),this.sortedSet=new it(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof rn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new rn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Il{constructor(){this.ga=new it(k.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):O(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}}class mn{constructor(t,e,n,s,i,a,u,c,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach((u=>{a.push({type:0,doc:u})})),new mn(t,e,rn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&hs(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class Zp{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class t_{constructor(){this.queries=Tl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const s=M(e),i=s.queries;s.queries=Tl(),i.forEach(((a,u)=>{for(const c of u.Sa)c.onError(n)}))})(this,new b(R.ABORTED,"Firestore shutting down"))}}function Tl(){return new fe((r=>Oh(r)),hs)}async function Ba(r,t){const e=M(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.ba()&&t.Da()&&(n=2):(i=new Zp,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await e.onListen(s,!0);break;case 1:i.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=lr(a,`Initialization of query '${Dn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&ja(e)}async function Ua(r,t){const e=M(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Sa.indexOf(t);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function e_(r,t){const e=M(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(n=!0);a.wa=s}}n&&ja(e)}function n_(r,t,e){const n=M(r),s=n.queries.get(t);if(s)for(const i of s.Sa)i.onError(e);n.queries.delete(t)}function ja(r){r.Ca.forEach((t=>{t.next()}))}var na,El;(El=na||(na={})).Ma="default",El.Cache="cache";class Ga{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new mn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=mn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==na.Cache}}/**
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
 */class Wd{constructor(t,e){this.Qa=t,this.byteLength=e}$a(){return"metadata"in this.Qa}}/**
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
 */class wl{constructor(t){this.serializer=t}$s(t){return ee(this.serializer,t)}Us(t){return t.metadata.exists?Di(this.serializer,t.document,!1):at.newNoDocument(this.$s(t.metadata.name),this.Ks(t.metadata.readTime))}Ks(t){return gt(t)}}class za{constructor(t,e){this.Ua=t,this.serializer=e,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=Hd(t)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;if(t.Qa.namedQuery)this.Ka.push(t.Qa.namedQuery);else if(t.Qa.documentMetadata){this.Wa.push({metadata:t.Qa.documentMetadata}),t.Qa.documentMetadata.exists||++e;const n=K.fromString(t.Qa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else t.Qa.document&&(this.Wa[this.Wa.length-1].document=t.Qa.document,++e);return e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,{...this.progress}):null}za(t){const e=new Map,n=new wl(this.serializer);for(const s of t)if(s.metadata.queries){const i=n.$s(s.metadata.name);for(const a of s.metadata.queries){const u=(e.get(a)||z()).add(i);e.set(a,u)}}return e}async ja(t){const e=await Cp(t,new wl(this.serializer),this.Wa,this.Ua.id),n=this.za(this.documents);for(const s of this.Ka)await xp(t,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:e}}}function Hd(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
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
 */class Jd{constructor(t){this.key=t}}class Xd{constructor(t){this.key=t}}class Yd{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=z(),this.mutatedKeys=z(),this.eu=qh(t),this.tu=new rn(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new Il,s=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((f,g)=>{const _=s.get(f),S=ds(this.query,g)?g:null,C=!!_&&this.mutatedKeys.has(_.key),x=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;_&&S?_.data.isEqual(S.data)?C!==x&&(n.track({type:3,doc:S}),D=!0):this.su(_,S)||(n.track({type:2,doc:S}),D=!0,(c&&this.eu(S,c)>0||h&&this.eu(S,h)<0)&&(u=!0)):!_&&S?(n.track({type:0,doc:S}),D=!0):_&&!S&&(n.track({type:1,doc:_}),D=!0,(c||h)&&(u=!0)),D&&(S?(a=a.add(S),i=x?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,Cs:u,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((f,g)=>(function(S,C){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{Rt:D})}};return x(S)-x(C)})(f.type,g.type)||this.eu(f.doc,g.doc))),this.ou(n),s=s??!1;const u=e&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,h=c!==this.Za;return this.Za=c,a.length!==0||h?{snapshot:new mn(this.query,t.tu,i,a,t.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Il,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=z(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const e=[];return t.forEach((n=>{this.Xa.has(n)||e.push(new Xd(n))})),this.Xa.forEach((n=>{t.has(n)||e.push(new Jd(n))})),e}cu(t){this.Ya=t.Qs,this.Xa=z();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return mn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ue="SyncEngine";class r_{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class s_{constructor(t){this.key=t,this.hu=!1}}class i_{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new fe((u=>Oh(u)),hs),this.Iu=new Map,this.Eu=new Set,this.du=new it(k.comparator),this.Au=new Map,this.Ru=new Va,this.Vu={},this.mu=new Map,this.fu=dn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function o_(r,t,e=!0){const n=qi(r);let s;const i=n.Tu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Zd(n,t,e,!0),s}async function a_(r,t){const e=qi(r);await Zd(e,t,!0,!1)}async function Zd(r,t,e,n){const s=await Xn(r.localStore,kt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await Ka(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Li(r.remoteStore,s),u}async function Ka(r,t,e,n,s){r.pu=(g,_,S)=>(async function(x,D,U,j){let q=D.view.ru(U);q.Cs&&(q=await _i(x.localStore,D.query,!1).then((({documents:T})=>D.view.ru(T,q))));const X=j&&j.targetChanges.get(D.targetId),nt=j&&j.targetMismatches.get(D.targetId)!=null,H=D.view.applyChanges(q,x.isPrimaryClient,X,nt);return ra(x,D.targetId,H.au),H.snapshot})(r,g,_,S);const i=await _i(r.localStore,t,!0),a=new Yd(t,i.Qs),u=a.ru(i.documents),c=gs.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(u,r.isPrimaryClient,c);ra(r,e,h.au);const f=new r_(t,e,a);return r.Tu.set(t,f),r.Iu.has(e)?r.Iu.get(e).push(t):r.Iu.set(e,[t]),h.snapshot}async function u_(r,t,e){const n=M(r),s=n.Tu.get(t),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter((a=>!hs(a,t)))),void n.Tu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Yn(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Zn(n.remoteStore,s.targetId),tr(n,s.targetId)})).catch(Oe)):(tr(n,s.targetId),await Yn(n.localStore,s.targetId,!0))}async function c_(r,t){const e=M(r),n=e.Tu.get(t),s=e.Iu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Zn(e.remoteStore,n.targetId))}async function l_(r,t,e){const n=Ha(r);try{const s=await(function(a,u){const c=M(a),h=Y.now(),f=u.reduce(((S,C)=>S.add(C.key)),z());let g,_;return c.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let C=qt(),x=z();return c.Ns.getEntries(S,f).next((D=>{C=D,C.forEach(((U,j)=>{j.isValidDocument()||(x=x.add(U))}))})).next((()=>c.localDocuments.getOverlayedDocuments(S,C))).next((D=>{g=D;const U=[];for(const j of u){const q=Mg(j,g.get(j.key).overlayedDocument);q!=null&&U.push(new me(j.key,q,Ph(q.value.mapValue),lt.exists(!0)))}return c.mutationQueue.addMutationBatch(S,h,U,u)})).next((D=>{_=D;const U=D.applyToLocalDocumentSet(g,x);return c.documentOverlayCache.saveOverlays(S,D.batchId,U)}))})).then((()=>({batchId:_.batchId,changes:Uh(g)})))})(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),(function(a,u,c){let h=a.Vu[a.currentUser.toKey()];h||(h=new it(G)),h=h.insert(u,c),a.Vu[a.currentUser.toKey()]=h})(n,s.batchId,e),await ge(n,s.changes),await ur(n.remoteStore)}catch(s){const i=lr(s,"Failed to persist write");e.reject(i)}}async function tf(r,t){const e=M(r);try{const n=await Vp(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=e.Au.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?L(a.hu,14607):s.removedDocuments.size>0&&(L(a.hu,42227),a.hu=!1))})),await ge(e,n,t)}catch(n){await Oe(n)}}function Al(r,t,e){const n=M(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Tu.forEach(((i,a)=>{const u=a.view.va(t);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const c=M(a);c.onlineState=u;let h=!1;c.queries.forEach(((f,g)=>{for(const _ of g.Sa)_.va(u)&&(h=!0)})),h&&ja(c)})(n.eventManager,t),s.length&&n.Pu.H_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function h_(r,t,e){const n=M(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Au.get(t),i=s&&s.key;if(i){let a=new it(k.comparator);a=a.insert(i,at.newNoDocument(i,B.min()));const u=z().add(i),c=new ms(B.min(),new Map,new it(G),a,u);await tf(n,c),n.du=n.du.remove(i),n.Au.delete(t),Wa(n)}else await Yn(n.localStore,t,!1).then((()=>tr(n,t,e))).catch(Oe)}async function d_(r,t){const e=M(r),n=t.batch.batchId;try{const s=await Sp(e.localStore,t);$a(e,n,null),Qa(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await ge(e,s)}catch(s){await Oe(s)}}async function f_(r,t,e){const n=M(r);try{const s=await(function(a,u){const c=M(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next((g=>(L(g!==null,37113),f=g.keys(),c.mutationQueue.removeMutationBatch(h,g)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>c.localDocuments.getDocuments(h,f)))}))})(n.localStore,t);$a(n,t,e),Qa(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await ge(n,s)}catch(s){await Oe(s)}}async function m_(r,t){const e=M(r);Be(e.remoteStore)||N(Ue,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(a){const u=M(a);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(e.localStore);if(n===be)return void t.resolve();const s=e.mu.get(n)||[];s.push(t),e.mu.set(n,s)}catch(n){const s=lr(n,"Initialization of waitForPendingWrites() operation failed");t.reject(s)}}function Qa(r,t){(r.mu.get(t)||[]).forEach((e=>{e.resolve()})),r.mu.delete(t)}function $a(r,t,e){const n=M(r);let s=n.Vu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.Vu[n.currentUser.toKey()]=s}}function tr(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Iu.get(t))r.Tu.delete(n),e&&r.Pu.yu(n,e);r.Iu.delete(t),r.isPrimaryClient&&r.Ru.jr(t).forEach((n=>{r.Ru.containsKey(n)||ef(r,n)}))}function ef(r,t){r.Eu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Zn(r.remoteStore,e),r.du=r.du.remove(t),r.Au.delete(e),Wa(r))}function ra(r,t,e){for(const n of e)n instanceof Jd?(r.Ru.addReference(n.key,t),g_(r,n)):n instanceof Xd?(N(Ue,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,t),r.Ru.containsKey(n.key)||ef(r,n.key)):O(19791,{wu:n})}function g_(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Eu.has(n)||(N(Ue,"New document in limbo: "+e),r.Eu.add(n),Wa(r))}function Wa(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Eu.values().next().value;r.Eu.delete(t);const e=new k(K.fromString(t)),n=r.fu.next();r.Au.set(n,new s_(e)),r.du=r.du.insert(e,n),Li(r.remoteStore,new ce(kt(sr(e.path)),n,"TargetPurposeLimboResolution",Ot.ce))}}async function ge(r,t,e){const n=M(r),s=[],i=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((u,c)=>{a.push(n.pu(c,t,e).then((h=>{if((h||e)&&n.isPrimaryClient){const f=h?!h.fromCache:e?.targetChanges.get(c.targetId)?.current;n.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Da.As(c.targetId,h);i.push(f)}})))})),await Promise.all(a),n.Pu.H_(s),await(async function(c,h){const f=M(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>A.forEach(h,(_=>A.forEach(_.Es,(S=>f.persistence.referenceDelegate.addReference(g,_.targetId,S))).next((()=>A.forEach(_.ds,(S=>f.persistence.referenceDelegate.removeReference(g,_.targetId,S)))))))))}catch(g){if(!Le(g))throw g;N(Na,"Failed to update sequence numbers: "+g)}for(const g of h){const _=g.targetId;if(!g.fromCache){const S=f.Ms.get(_),C=S.snapshotVersion,x=S.withLastLimboFreeSnapshotVersion(C);f.Ms=f.Ms.insert(_,x)}}})(n.localStore,i))}async function p_(r,t){const e=M(r);if(!e.currentUser.isEqual(t)){N(Ue,"User change. New user:",t.toKey());const n=await xd(e.localStore,t);e.currentUser=t,(function(i,a){i.mu.forEach((u=>{u.forEach((c=>{c.reject(new b(R.CANCELLED,a))}))})),i.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await ge(e,n.Ls)}}function __(r,t){const e=M(r),n=e.Au.get(t);if(n&&n.hu)return z().add(n.key);{let s=z();const i=e.Iu.get(t);if(!i)return s;for(const a of i){const u=e.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}async function y_(r,t){const e=M(r),n=await _i(e.localStore,t.query,!0),s=t.view.cu(n);return e.isPrimaryClient&&ra(e,t.targetId,s.au),s}async function I_(r,t){const e=M(r);return Md(e.localStore,t).then((n=>ge(e,n)))}async function T_(r,t,e,n){const s=M(r),i=await(function(u,c){const h=M(u),f=M(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(g=>f.er(g,c).next((_=>_?h.localDocuments.getDocuments(g,_):A.resolve(null)))))})(s.localStore,t);i!==null?(e==="pending"?await ur(s.remoteStore):e==="acknowledged"||e==="rejected"?($a(s,t,n||null),Qa(s,t),(function(u,c){M(M(u).mutationQueue).ir(c)})(s.localStore,t)):O(6720,"Unknown batchState",{Su:e}),await ge(s,i)):N(Ue,"Cannot apply mutation batch with id: "+t)}async function E_(r,t){const e=M(r);if(qi(e),Ha(e),t===!0&&e.gu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await vl(e,n.toArray());e.gu=!0,await ea(e.remoteStore,!0);for(const i of s)Li(e.remoteStore,i)}else if(t===!1&&e.gu!==!1){const n=[];let s=Promise.resolve();e.Iu.forEach(((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then((()=>(tr(e,a),Yn(e.localStore,a,!0)))),Zn(e.remoteStore,a)})),await s,await vl(e,n),(function(a){const u=M(a);u.Au.forEach(((c,h)=>{Zn(u.remoteStore,h)})),u.Ru.Jr(),u.Au=new Map,u.du=new it(k.comparator)})(e),e.gu=!1,await ea(e.remoteStore,!1)}}async function vl(r,t,e){const n=M(r),s=[],i=[];for(const a of t){let u;const c=n.Iu.get(a);if(c&&c.length!==0){u=await Xn(n.localStore,kt(c[0]));for(const h of c){const f=n.Tu.get(h),g=await y_(n,f);g.snapshot&&i.push(g.snapshot)}}else{const h=await kd(n.localStore,a);u=await Xn(n.localStore,h),await Ka(n,nf(h),a,!1,u.resumeToken)}s.push(u)}return n.Pu.H_(i),s}function nf(r){return kh(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function w_(r){return(function(e){return M(M(e).persistence).Ts()})(M(r).localStore)}async function A_(r,t,e,n){const s=M(r);if(s.gu)return void N(Ue,"Ignoring unexpected query state notification.");const i=s.Iu.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await Md(s.localStore,Lh(i[0])),u=ms.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ft.EMPTY_BYTE_STRING);await ge(s,a,u);break}case"rejected":await Yn(s.localStore,t,!0),tr(s,t,n);break;default:O(64155,e)}}async function v_(r,t,e){const n=qi(r);if(n.gu){for(const s of t){if(n.Iu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){N(Ue,"Adding an already active target "+s);continue}const i=await kd(n.localStore,s),a=await Xn(n.localStore,i);await Ka(n,nf(i),a.targetId,!1,a.resumeToken),Li(n.remoteStore,a)}for(const s of e)n.Iu.has(s)&&await Yn(n.localStore,s,!1).then((()=>{Zn(n.remoteStore,s),tr(n,s)})).catch(Oe)}}function qi(r){const t=M(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=tf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=__.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=h_.bind(null,t),t.Pu.H_=e_.bind(null,t.eventManager),t.Pu.yu=n_.bind(null,t.eventManager),t}function Ha(r){const t=M(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=d_.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=f_.bind(null,t),t}function R_(r,t,e){const n=M(r);(async function(i,a,u){try{const c=await a.getMetadata();if(await(function(S,C){const x=M(S),D=gt(C.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",(U=>x.Ii.getBundleMetadata(U,C.id))).then((U=>!!U&&U.createTime.compareTo(D)>=0))})(i.localStore,c))return await a.close(),u._completeWith((function(S){return{taskState:"Success",documentsLoaded:S.totalDocuments,bytesLoaded:S.totalBytes,totalDocuments:S.totalDocuments,totalBytes:S.totalBytes}})(c)),Promise.resolve(new Set);u._updateProgress(Hd(c));const h=new za(c,a.serializer);let f=await a.bu();for(;f;){const _=await h.Ga(f);_&&u._updateProgress(_),f=await a.bu()}const g=await h.ja(i.localStore);return await ge(i,g.Ha,void 0),await(function(S,C){const x=M(S);return x.persistence.runTransaction("Save bundle","readwrite",(D=>x.Ii.saveBundleMetadata(D,C)))})(i.localStore,c),u._completeWith(g.progress),Promise.resolve(g.Ja)}catch(c){return Qt(Ue,`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,t,e).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class er{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=pn(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Cd(this.persistence,new bd,t.initialUser,this.serializer)}Cu(t){return new ba(Oi.mi,this.serializer)}Du(t){return new Bd}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}er.provider={build:()=>new er};class Ja extends er{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){L(this.persistence.referenceDelegate instanceof pi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ad(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new ba((n=>pi.mi(n,e)),this.serializer)}}class Xa extends er{constructor(t,e,n){super(),this.xu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.xu.initialize(this,t),await Ha(this.xu.syncEngine),await ur(this.xu.remoteStore),await this.persistence.Ji((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(t){return Cd(this.persistence,new bd,t.initialUser,this.serializer)}Fu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new Ad(n,t.asyncQueue,e)}Mu(t,e){const n=new Bm(e,this.persistence);return new qm(t.asyncQueue,n)}Cu(t){const e=xa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new Ca(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Ud(),si(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(t){return new Bd}}class rf extends Xa{constructor(t,e){super(t,e,!1),this.xu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.xu.syncEngine;this.sharedClientState instanceof So&&(this.sharedClientState.syncEngine={Co:T_.bind(null,e),vo:A_.bind(null,e),Fo:v_.bind(null,e),Ts:w_.bind(null,e),Do:I_.bind(null,e)},await this.sharedClientState.start()),await this.persistence.Ji((async n=>{await E_(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(t){const e=Ud();if(!So.v(e))throw new b(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=xa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new So(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class Me{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Al(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=p_.bind(null,this.syncEngine),await ea(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new t_})()}createDatastore(t){const e=pn(t.databaseInfo.databaseId),n=(function(i){return new Fp(i)})(t.databaseInfo);return(function(i,a,u,c){return new Bp(i,a,u,c)})(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,s,i,a,u){return new jp(n,s,i,a,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>Al(this.syncEngine,e,0)),(function(){return pl.v()?new pl:new Dp})())}createSyncEngine(t,e){return(function(s,i,a,u,c,h,f){const g=new i_(s,i,a,u,c,h);return f&&(g.gu=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const n=M(e);N(fn,"RemoteStore shutting down."),n.Ea.add(5),await ar(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Me.provider={build:()=>new Me};function Rl(r,t=10240){let e=0;return{async read(){if(e<r.byteLength){const n={value:r.slice(e,e+t),done:!1};return e+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class Bi{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):mt("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
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
 */class P_{constructor(t,e){this.Bu=t,this.serializer=e,this.metadata=new wt,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((n=>{n&&n.$a()?this.metadata.resolve(n.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.Qa)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const t=await this.qu();if(t===null)return null;const e=this.Lu.decode(t),n=Number(e);isNaN(n)&&this.Qu(`length string (${e}) is not valid number`);const s=await this.$u(n);return new Wd(JSON.parse(s),t.length+n)}Uu(){return this.buffer.findIndex((t=>t===123))}async qu(){for(;this.Uu()<0&&!await this.Ku(););if(this.buffer.length===0)return null;const t=this.Uu();t<0&&this.Qu("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async $u(t){for(;this.buffer.length<t;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");const e=this.Lu.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Qu(t){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${t}`)}async Ku(){const t=await this.Bu.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}/**
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
 */class S_{constructor(t,e){this.bundleData=t,this.serializer=e,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.$a())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n?.Qa)}`);this.metadata=n;do n=this.bu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}Wu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const t=this.qu(),e=this.$u(t);return new Wd(JSON.parse(e),t)}$u(t){if(this.cursor+t>this.bundleData.length)throw new b(R.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=t)}qu(){const t=this.cursor;let e=this.cursor;for(;e<this.bundleData.length;){if(this.bundleData[e]==="{"){if(e===t)throw new Error("First character is a bracket and not a number");return this.cursor=e,Number(this.bundleData.slice(t,e))}e++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */class V_{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new b(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const a=M(s),u={documents:i.map((g=>ns(a.serializer,g)))},c=await a.Ho("BatchGetDocuments",a.serializer.databaseId,K.emptyPath(),u,i.length),h=new Map;c.forEach((g=>{const _=zg(a.serializer,g);h.set(_.key.toString(),_)}));const f=[];return i.forEach((g=>{const _=h.get(g.toString());L(!!_,55234,{key:g}),f.push(_)})),f})(this.datastore,t);return e.forEach((n=>this.recordVersion(n))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(t.toString())}delete(t){this.write(new or(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,n)=>{const s=k.fromPath(n);this.mutations.push(new Ta(s,this.precondition(s)))})),await(async function(n,s){const i=M(n),a={writes:s.map((u=>rs(i.serializer,u)))};await i.Go("Commit",i.serializer.databaseId,K.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw O(50498,{Gu:t.constructor.name});e=B.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new b(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(B.min())?lt.exists(!1):lt.updateTime(e):lt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(B.min()))throw new b(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return lt.updateTime(e)}return lt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class b_{constructor(t,e,n,s,i){this.asyncQueue=t,this.datastore=e,this.options=n,this.updateFunction=s,this.deferred=i,this.zu=n.maxAttempts,this.M_=new Ma(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const t=new V_(this.datastore),e=this.Hu(t);e&&e.then((n=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.Yu(s)}))))})).catch((n=>{this.Yu(n)}))}))}Hu(t){try{const e=this.updateFunction(t);return!us(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(t)}Zu(t){if(t?.name==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Yh(e)}return!1}}/**
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
 */const Fe="FirestoreClient";class C_{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=Et.UNAUTHENTICATED,this.clientId=oa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{N(Fe,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(N(Fe,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=lr(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function bo(r,t){r.asyncQueue.verifyOperationInProgress(),N(Fe,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await xd(t.localStore,s),n=s)})),t.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=t}async function Pl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Ya(r);N(Fe,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener((n=>yl(t.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>yl(t.remoteStore,s))),r._onlineComponents=t}async function Ya(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){N(Fe,"Using user provided OfflineComponentProvider");try{await bo(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Qt("Error using user provided cache. Falling back to memory cache: "+e),await bo(r,new er)}}else N(Fe,"Using default OfflineComponentProvider"),await bo(r,new Ja(void 0));return r._offlineComponents}async function Ui(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(N(Fe,"Using user provided OnlineComponentProvider"),await Pl(r,r._uninitializedComponentsProvider._online)):(N(Fe,"Using default OnlineComponentProvider"),await Pl(r,new Me))),r._onlineComponents}function sf(r){return Ya(r).then((t=>t.persistence))}function hr(r){return Ya(r).then((t=>t.localStore))}function of(r){return Ui(r).then((t=>t.remoteStore))}function Za(r){return Ui(r).then((t=>t.syncEngine))}function af(r){return Ui(r).then((t=>t.datastore))}async function nr(r){const t=await Ui(r),e=t.eventManager;return e.onListen=o_.bind(null,t.syncEngine),e.onUnlisten=u_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=a_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=c_.bind(null,t.syncEngine),e}function x_(r){return r.asyncQueue.enqueue((async()=>{const t=await sf(r),e=await of(r);return t.setNetworkEnabled(!0),(function(s){const i=M(s);return i.Ea.delete(0),ps(i)})(e)}))}function D_(r){return r.asyncQueue.enqueue((async()=>{const t=await sf(r),e=await of(r);return t.setNetworkEnabled(!1),(async function(s){const i=M(s);i.Ea.add(0),await ar(i),i.Ra.set("Offline")})(e)}))}function N_(r,t){const e=new wt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,a){try{const u=await(function(h,f){const g=M(h);return g.persistence.runTransaction("read document","readonly",(_=>g.localDocuments.getDocument(_,f)))})(s,i);u.isFoundDocument()?a.resolve(u):u.isNoDocument()?a.resolve(null):a.reject(new b(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=lr(u,`Failed to get document '${i} from cache`);a.reject(c)}})(await hr(r),t,e))),e.promise}function uf(r,t,e={}){const n=new wt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,h){const f=new Bi({next:_=>{f.Nu(),a.enqueueAndForget((()=>Ua(i,g)));const S=_.docs.has(u);!S&&_.fromCache?h.reject(new b(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&_.fromCache&&c&&c.source==="server"?h.reject(new b(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),g=new Ga(sr(u.path),f,{includeMetadataChanges:!0,qa:!0});return Ba(i,g)})(await nr(r),r.asyncQueue,t,e,n))),n.promise}function k_(r,t){const e=new wt;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,a){try{const u=await _i(s,i,!0),c=new Yd(i,u.Qs),h=c.ru(u.documents),f=c.applyChanges(h,!1);a.resolve(f.snapshot)}catch(u){const c=lr(u,`Failed to execute query '${i} against cache`);a.reject(c)}})(await hr(r),t,e))),e.promise}function cf(r,t,e={}){const n=new wt;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,c,h){const f=new Bi({next:_=>{f.Nu(),a.enqueueAndForget((()=>Ua(i,g))),_.fromCache&&c.source==="server"?h.reject(new b(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),g=new Ga(u,f,{includeMetadataChanges:!0,qa:!0});return Ba(i,g)})(await nr(r),r.asyncQueue,t,e,n))),n.promise}function M_(r,t,e){const n=new wt;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await af(r);n.resolve((async function(a,u,c){const h=M(a),{request:f,gt:g,parent:_}=cd(h.serializer,Mh(u),c);h.connection.$o||delete f.parent;const S=(await h.Ho("RunAggregationQuery",h.serializer.databaseId,_,f,1)).filter((x=>!!x.result));L(S.length===1,64727);const C=S[0].result?.aggregateFields;return Object.keys(C).reduce(((x,D)=>(x[g[D]]=C[D],x)),{})})(s,t,e))}catch(s){n.reject(s)}})),n.promise}function F_(r,t){const e=new Bi(t);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){M(s).Ca.add(i),i.next()})(await nr(r),e))),()=>{e.Nu(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){M(s).Ca.delete(i)})(await nr(r),e)))}}function O_(r,t,e,n){const s=(function(a,u){let c;return c=typeof a=="string"?td().encode(a):a,(function(f,g){return new P_(f,g)})((function(f,g){if(f instanceof Uint8Array)return Rl(f,g);if(f instanceof ArrayBuffer)return Rl(new Uint8Array(f),g);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),u)})(e,pn(t));r.asyncQueue.enqueueAndForget((async()=>{R_(await Za(r),s,n)}))}function L_(r,t){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=M(n);return i.persistence.runTransaction("Get named query","readonly",(a=>i.Ii.getNamedQuery(a,s)))})(await hr(r),t)))}function lf(r,t){return(function(n,s){return new S_(n,s)})(r,t)}function q_(r,t){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=M(n),a=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",(c=>a.getFieldIndexes(c).next((h=>(function(g,_,S,C,x){g=[...g],_=[..._],g.sort(S),_.sort(S);const D=g.length,U=_.length;let j=0,q=0;for(;j<U&&q<D;){const X=S(g[q],_[j]);X<0?x(g[q++]):X>0?C(_[j++]):(j++,q++)}for(;j<U;)C(_[j++]);for(;q<D;)x(g[q++])})(h,s,Mm,(f=>{u.push(a.addFieldIndex(c,f))}),(f=>{u.push(a.deleteFieldIndex(c,f))})))).next((()=>A.waitFor(u)))))})(await hr(r),t)))}function B_(r,t){return r.asyncQueue.enqueue((async()=>(function(n,s){M(n).Fs.Vs=s})(await hr(r),t)))}function U_(r){return r.asyncQueue.enqueue((async()=>(function(e){const n=M(e),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await hr(r))))}/**
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
 */function hf(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const Sl=new Map;/**
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
 */const df="firestore.googleapis.com",Vl=!0;class bl{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new b(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=df,this.ssl=Vl}else this.host=t.host,this.ssl=t.ssl??Vl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=yd;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<wd)throw new b(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}km("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hf(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new b(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class _s{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new b(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new b(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bl(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new vm;switch(n.type){case"firstParty":return new Vm(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new b(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=Sl.get(e);n&&(N("ComponentProvider","Removing Datastore"),Sl.delete(e),n.terminate())})(this),Promise.resolve()}}function j_(r,t,e,n={}){r=Q(r,_s);const s=sa(t),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},u=`${t}:${e}`;s&&(ql(`https://${u}`),fm("Firestore",!0)),i.host!==df&&i.host!==u&&Qt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:n};if(!as(c,a)&&(r._setSettings(c),n.mockUserToken)){let h,f;if(typeof n.mockUserToken=="string")h=n.mockUserToken,f=Et.MOCK_USER;else{h=mm(n.mockUserToken,r._app?.options.projectId);const g=n.mockUserToken.sub||n.mockUserToken.user_id;if(!g)throw new b(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Et(g)}r._authCredentials=new Rm(new Jl(h,f))}}/**
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
 */class At{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new At(this.firestore,t,this._query)}}class et{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ne(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new et(this.firestore,t,this._key)}toJSON(){return{type:et._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(gn(e,et._jsonSchema))return new et(t,n||null,new k(K.fromString(e.referencePath)))}}et._jsonSchemaVersion="firestore/documentReference/1.0",et._jsonSchema={type:_t("string",et._jsonSchemaVersion),referencePath:_t("string")};class ne extends At{constructor(t,e,n){super(t,e,sr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new et(this.firestore,null,new k(t))}withConverter(t){return new ne(this.firestore,t,this._path)}}function Iy(r,t,...e){if(r=yt(r),aa("collection","path",t),r instanceof _s){const n=K.fromString(t,...e);return _c(n),new ne(r,null,n)}{if(!(r instanceof et||r instanceof ne))throw new b(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(K.fromString(t,...e));return _c(n),new ne(r.firestore,null,n)}}function Ty(r,t){if(r=Q(r,_s),aa("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new b(R.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new At(r,null,(function(n){return new de(K.emptyPath(),n)})(t))}function G_(r,t,...e){if(r=yt(r),arguments.length===1&&(t=oa.newId()),aa("doc","path",t),r instanceof _s){const n=K.fromString(t,...e);return pc(n),new et(r,null,new k(n))}{if(!(r instanceof et||r instanceof ne))throw new b(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(K.fromString(t,...e));return pc(n),new et(r.firestore,r instanceof ne?r.converter:null,new k(n))}}function Ey(r,t){return r=yt(r),t=yt(t),(r instanceof et||r instanceof ne)&&(t instanceof et||t instanceof ne)&&r.firestore===t.firestore&&r.path===t.path&&r.converter===t.converter}function ff(r,t){return r=yt(r),t=yt(t),r instanceof At&&t instanceof At&&r.firestore===t.firestore&&hs(r._query,t._query)&&r.converter===t.converter}/**
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
 */const Cl="AsyncQueue";class xl{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ma(this,"async_queue_retry"),this._c=()=>{const n=si();n&&N(Cl,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=si();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=si();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new wt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Le(t))throw t;N(Cl,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,mt("INTERNAL UNHANDLED ERROR: ",Dl(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=qa.createAndSchedule(this,t,e,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&O(47125,{Pc:Dl(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function Dl(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
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
 */function Fn(r){return(function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}class z_{constructor(){this._progressObserver={},this._taskCompletionResolver=new wt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}/**
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
 */const wy=-1;class st extends _s{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new xl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new xl(t),this._firestoreClient=void 0,await t}}}function Ay(r,t,e){e||(e=Yr);const n=Bl(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(as(i,t))return s;throw new b(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new b(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<wd)throw new b(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&sa(t.host)&&ql(t.host),n.initialize({options:t,instanceIdentifier:e})}function vy(r,t){const e=typeof r=="object"?r:gm(),n=typeof r=="string"?r:t||Yr,s=Bl(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=pm("firestore");i&&j_(s,...i)}return s}function ht(r){if(r._terminated)throw new b(R.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||mf(r),r._firestoreClient}function mf(r){const t=r._freezeSettings(),e=(function(s,i,a,u){return new mg(s,i,a,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,hf(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)})(r._databaseId,r._app?.options.appId||"",r._persistenceKey,t);r._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new C_(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}function Ry(r,t){Qt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();return gf(r,Me.provider,{build:n=>new Xa(n,e.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function Py(r){Qt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();gf(r,Me.provider,{build:e=>new rf(e,t.cacheSizeBytes)})}function gf(r,t,e){if((r=Q(r,st))._firestoreClient||r._terminated)throw new b(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new b(R.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},mf(r)}function Sy(r){if(r._initialized&&!r._terminated)throw new b(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new wt;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!te.v())return Promise.resolve();const s=n+Vd;await te.delete(s)})(xa(r._databaseId,r._persistenceKey)),t.resolve()}catch(e){t.reject(e)}})),t.promise}function Vy(r){return(function(e){const n=new wt;return e.asyncQueue.enqueueAndForget((async()=>m_(await Za(e),n))),n.promise})(ht(r=Q(r,st)))}function by(r){return x_(ht(r=Q(r,st)))}function Cy(r){return D_(ht(r=Q(r,st)))}function xy(r){return _m(r.app,"firestore",r._databaseId.database),r._delete()}function Nl(r,t){const e=ht(r=Q(r,st)),n=new z_;return O_(e,r._databaseId,t,n),n}function K_(r,t){return L_(ht(r=Q(r,st)),t).then((e=>e?new At(r,null,e.query):null))}/**
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
 */class ss{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class Q_{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class jt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new jt(ft.fromBase64String(t))}catch(e){throw new b(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new jt(ft.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:jt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(gn(t,jt._jsonSchema))return jt.fromBase64String(t.bytes)}}jt._jsonSchemaVersion="firestore/bytes/1.0",jt._jsonSchema={type:_t("string",jt._jsonSchemaVersion),bytes:_t("string")};/**
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
 */class _n{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new b(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Dy(){return new _n(No)}/**
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
 */class yn{constructor(t){this._methodName=t}}/**
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
 */class re{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new b(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new b(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return G(this._lat,t._lat)||G(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:re._jsonSchemaVersion}}static fromJSON(t){if(gn(t,re._jsonSchema))return new re(t.latitude,t.longitude)}}re._jsonSchemaVersion="firestore/geoPoint/1.0",re._jsonSchema={type:_t("string",re._jsonSchemaVersion),latitude:_t("number"),longitude:_t("number")};/**
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
 */class Ht{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Ht._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(gn(t,Ht._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Ht(t.vectorValues);throw new b(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ht._jsonSchemaVersion="firestore/vectorValue/1.0",Ht._jsonSchema={type:_t("string",Ht._jsonSchemaVersion),vectorValues:_t("object")};/**
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
 */const $_=/^__.*__$/;class W_{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new me(t,this.data,this.fieldMask,e,this.fieldTransforms):new ir(t,this.data,e,this.fieldTransforms)}}class pf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new me(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function _f(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{Ac:r})}}class ji{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new ji({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){const e=this.path?.child(t),n=this.Vc({path:e,fc:!1});return n.gc(t),n}yc(t){const e=this.path?.child(t),n=this.Vc({path:e,fc:!1});return n.Rc(),n}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Ei(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(_f(this.Ac)&&$_.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class H_{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||pn(t)}Cc(t,e,n,s=!1){return new ji({Ac:t,methodName:e,Dc:n,path:ct.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function In(r){const t=r._freezeSettings(),e=pn(r._databaseId);return new H_(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Gi(r,t,e,n,s,i={}){const a=r.Cc(i.merge||i.mergeFields?2:0,t,e,s);ou("Data must be an object, but it was:",a,n);const u=Tf(n,a);let c,h;if(i.merge)c=new Lt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const _=is(t,g,e);if(!a.contains(_))throw new b(R.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);wf(f,_)||f.push(_)}c=new Lt(f),h=a.fieldTransforms.filter((g=>c.covers(g.field)))}else c=null,h=a.fieldTransforms;return new W_(new Pt(u),c,h)}class ys extends yn{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof ys}}function yf(r,t,e){return new ji({Ac:3,Dc:t.settings.Dc,methodName:r._methodName,fc:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class tu extends yn{_toFieldTransform(t){return new fs(t.path,new Wn)}isEqual(t){return t instanceof tu}}class eu extends yn{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=yf(this,t,!0),n=this.vc.map((i=>Tn(i,e))),s=new un(n);return new fs(t.path,s)}isEqual(t){return t instanceof eu&&as(this.vc,t.vc)}}class nu extends yn{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=yf(this,t,!0),n=this.vc.map((i=>Tn(i,e))),s=new cn(n);return new fs(t.path,s)}isEqual(t){return t instanceof nu&&as(this.vc,t.vc)}}class ru extends yn{constructor(t,e){super(t),this.Fc=e}_toFieldTransform(t){const e=new Hn(t.serializer,zh(t.serializer,this.Fc));return new fs(t.path,e)}isEqual(t){return t instanceof ru&&this.Fc===t.Fc}}function su(r,t,e,n){const s=r.Cc(1,t,e);ou("Data must be an object, but it was:",s,n);const i=[],a=Pt.empty();qe(n,((c,h)=>{const f=zi(t,c,e);h=yt(h);const g=s.yc(f);if(h instanceof ys)i.push(f);else{const _=Tn(h,g);_!=null&&(i.push(f),a.set(f,_))}}));const u=new Lt(i);return new pf(a,u,s.fieldTransforms)}function iu(r,t,e,n,s,i){const a=r.Cc(1,t,e),u=[is(t,n,e)],c=[s];if(i.length%2!=0)throw new b(R.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)u.push(is(t,i[_])),c.push(i[_+1]);const h=[],f=Pt.empty();for(let _=u.length-1;_>=0;--_)if(!wf(h,u[_])){const S=u[_];let C=c[_];C=yt(C);const x=a.yc(S);if(C instanceof ys)h.push(S);else{const D=Tn(C,x);D!=null&&(h.push(S),f.set(S,D))}}const g=new Lt(h);return new pf(f,g,a.fieldTransforms)}function If(r,t,e,n=!1){return Tn(e,r.Cc(n?4:3,t))}function Tn(r,t){if(Ef(r=yt(r)))return ou("Unsupported field value:",t,r),Tf(r,t);if(r instanceof yn)return(function(n,s){if(!_f(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return(function(n,s){const i=[];let a=0;for(const u of n){let c=Tn(u,s.wc(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(r,t)}return(function(n,s){if((n=yt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return zh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Y.fromDate(n);return{timestampValue:Jn(s.serializer,i)}}if(n instanceof Y){const i=new Y(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Jn(s.serializer,i)}}if(n instanceof re)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof jt)return{bytesValue:rd(s.serializer,n._byteString)};if(n instanceof et){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ra(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ht)return(function(a,u){return{mapValue:{fields:{[ma]:{stringValue:ga},[Kn]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw u.Sc("VectorValues must only contain numeric values.");return Ia(u.serializer,h)}))}}}}}})(n,s);throw s.Sc(`Unsupported field value: ${wi(n)}`)})(r,t)}function Tf(r,t){const e={};return _h(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):qe(r,((n,s)=>{const i=Tn(s,t.mc(n));i!=null&&(e[n]=i)})),{mapValue:{fields:e}}}function Ef(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Y||r instanceof re||r instanceof jt||r instanceof et||r instanceof yn||r instanceof Ht)}function ou(r,t,e){if(!Ef(e)||!Yl(e)){const n=wi(e);throw n==="an object"?t.Sc(r+" a custom object"):t.Sc(r+" "+n)}}function is(r,t,e){if((t=yt(t))instanceof _n)return t._internalPath;if(typeof t=="string")return zi(r,t);throw Ei("Field path arguments must be of type string or ",r,!1,void 0,e)}const J_=new RegExp("[~\\*/\\[\\]]");function zi(r,t,e){if(t.search(J_)>=0)throw Ei(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new _n(...t.split("."))._internalPath}catch{throw Ei(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function Ei(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${n}`),a&&(c+=` in document ${s}`),c+=")"),new b(R.INVALID_ARGUMENT,u+r+c)}function wf(r,t){return r.some((e=>e.isEqual(t)))}/**
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
 */class os{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new X_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ki("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class X_ extends os{data(){return super.data()}}function Ki(r,t){return typeof t=="string"?zi(r,t):t instanceof _n?t._internalPath:t._delegate._internalPath}/**
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
 */function Af(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new b(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class au{}class Is extends au{}function Ny(r,t,...e){let n=[];t instanceof au&&n.push(t),n=n.concat(e),(function(i){const a=i.filter((c=>c instanceof dr)).length,u=i.filter((c=>c instanceof Ts)).length;if(a>1||a>0&&u>0)throw new b(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Ts extends Is{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Ts(t,e,n)}_apply(t){const e=this._parse(t);return Rf(t._query,e),new At(t.firestore,t.converter,zo(t._query,e))}_parse(t){const e=In(t.firestore);return(function(i,a,u,c,h,f,g){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new b(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ml(g,f);const C=[];for(const x of g)C.push(kl(c,i,x));_={arrayValue:{values:C}}}else _=kl(c,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ml(g,f),_=If(u,a,g,f==="in"||f==="not-in");return $.create(h,f,_)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function ky(r,t,e){const n=t,s=Ki("where",r);return Ts._create(s,n,e)}class dr extends au{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new dr(t,e)}_parse(t){const e=this._queryConstraints.map((n=>n._parse(t))).filter((n=>n.getFilters().length>0));return e.length===1?e[0]:Z.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let a=s;const u=i.getFlattenedFilters();for(const c of u)Rf(a,c),a=zo(a,c)})(t._query,e),new At(t.firestore,t.converter,zo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function My(...r){return r.forEach((t=>Pf("or",t))),dr._create("or",r)}function Fy(...r){return r.forEach((t=>Pf("and",t))),dr._create("and",r)}class uu extends Is{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new uu(t,e)}_apply(t){const e=(function(s,i,a){if(s.startAt!==null)throw new b(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new b(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new es(i,a)})(t._query,this._field,this._direction);return new At(t.firestore,t.converter,(function(s,i){const a=s.explicitOrderBy.concat([i]);return new de(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(t._query,e))}}function Oy(r,t="asc"){const e=t,n=Ki("orderBy",r);return uu._create(n,e)}class Qi extends Is{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Qi(t,e,n)}_apply(t){return new At(t.firestore,t.converter,di(t._query,this._limit,this._limitType))}}function Ly(r){return Zl("limit",r),Qi._create("limit",r,"F")}function qy(r){return Zl("limitToLast",r),Qi._create("limitToLast",r,"L")}class $i extends Is{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new $i(t,e,n)}_apply(t){const e=vf(t,this.type,this._docOrFields,this._inclusive);return new At(t.firestore,t.converter,(function(s,i){return new de(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)})(t._query,e))}}function By(...r){return $i._create("startAt",r,!0)}function Uy(...r){return $i._create("startAfter",r,!1)}class Wi extends Is{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new Wi(t,e,n)}_apply(t){const e=vf(t,this.type,this._docOrFields,this._inclusive);return new At(t.firestore,t.converter,(function(s,i){return new de(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)})(t._query,e))}}function jy(...r){return Wi._create("endBefore",r,!1)}function Gy(...r){return Wi._create("endAt",r,!0)}function vf(r,t,e,n){if(e[0]=yt(e[0]),e[0]instanceof os)return(function(i,a,u,c,h){if(!c)throw new b(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const g of Mn(i))if(g.field.isKeyField())f.push(on(a,c.key));else{const _=c.data.field(g.field);if(Si(_))throw new b(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+g.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(_===null){const S=g.field.canonicalString();throw new b(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${S}' (used as the orderBy) does not exist.`)}f.push(_)}return new Ne(f,h)})(r._query,r.firestore._databaseId,t,e[0]._document,n);{const s=In(r.firestore);return(function(a,u,c,h,f,g){const _=a.explicitOrderBy;if(f.length>_.length)throw new b(R.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const S=[];for(let C=0;C<f.length;C++){const x=f[C];if(_[C].field.isKeyField()){if(typeof x!="string")throw new b(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof x}`);if(!_a(a)&&x.indexOf("/")!==-1)throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${x}' contains a slash.`);const D=a.path.child(K.fromString(x));if(!k.isDocumentKey(D))throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const U=new k(D);S.push(on(u,U))}else{const D=If(c,h,x);S.push(D)}}return new Ne(S,g)})(r._query,r.firestore._databaseId,s,t,e,n)}}function kl(r,t,e){if(typeof(e=yt(e))=="string"){if(e==="")throw new b(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_a(t)&&e.indexOf("/")!==-1)throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(K.fromString(e));if(!k.isDocumentKey(n))throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return on(r,new k(n))}if(e instanceof et)return on(r,e._key);throw new b(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wi(e)}.`)}function Ml(r,t){if(!Array.isArray(r)||r.length===0)throw new b(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Rf(r,t){const e=(function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new b(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new b(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Pf(r,t){if(!(t instanceof Ts||t instanceof dr))throw new b(R.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Sf{convertValue(t,e="none"){switch(xe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(he(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return qe(t,((s,i)=>{n[s]=this.convertValue(i,e)})),n}convertVectorValue(t){const e=t.fields?.[Kn].arrayValue?.values?.map((n=>ut(n.doubleValue)));return new Ht(e)}convertGeoPoint(t){return new re(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Vi(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Xr(t));default:return null}}convertTimestamp(t){const e=le(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=K.fromString(t);L(fd(n),9688,{name:t});const s=new sn(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(e)||mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function Hi(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class cu extends Sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new jt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new et(this.firestore,null,e)}}/**
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
 */function zy(r){return new ss("sum",is("sum",r))}function Ky(r){return new ss("avg",is("average",r))}function Y_(){return new ss("count")}function Qy(r,t){return r instanceof ss&&t instanceof ss&&r.aggregateType===t.aggregateType&&r._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function $y(r,t){return ff(r.query,t.query)&&as(r.data(),t.data())}/**
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
 */const Vf="NOT SUPPORTED";class Pe{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Gt extends os{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ii(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Ki("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new b(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Gt._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}function Wy(r,t,e){if(gn(t,Gt._jsonSchema)){if(t.bundle===Vf)throw new b(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=pn(r._databaseId),s=lf(t.bundle,n),i=s.Wu(),a=new za(s.getMetadata(),n);for(const f of i)a.Ga(f);const u=a.documents;if(u.length!==1)throw new b(R.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${u.length} documents.`);const c=Di(n,u[0].document),h=new k(K.fromString(t.bundleName));return new Gt(r,new cu(r),h,c,new Pe(!1,!1),e||null)}}Gt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Gt._jsonSchema={type:_t("string",Gt._jsonSchemaVersion),bundleSource:_t("string","DocumentSnapshot"),bundleName:_t("string"),bundle:_t("string")};class ii extends Gt{data(t={}){return super.data(t)}}class zt{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Pe(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new ii(this._firestore,this._userDataWriter,n.key,n,new Pe(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new b(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const c=new ii(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Pe(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const c=new ii(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Pe(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:Z_(u.type),doc:c,oldIndex:h,newIndex:f}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new b(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=zt._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=oa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Hy(r,t,e){if(gn(t,zt._jsonSchema)){if(t.bundle===Vf)throw new b(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=pn(r._databaseId),s=lf(t.bundle,n),i=s.Wu(),a=new za(s.getMetadata(),n);for(const _ of i)a.Ga(_);if(a.queries.length!==1)throw new b(R.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);const u=ki(a.queries[0].bundledQuery),c=a.documents;let h=new rn;c.map((_=>{const S=Di(n,_.document);h=h.add(S)}));const f=mn.fromInitialDocuments(u,h,z(),!1,!1),g=new At(r,e||null,u);return new zt(r,new cu(r),g,f)}}function Z_(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}function Jy(r,t){return r instanceof Gt&&t instanceof Gt?r._firestore===t._firestore&&r._key.isEqual(t._key)&&(r._document===null?t._document===null:r._document.isEqual(t._document))&&r._converter===t._converter:r instanceof zt&&t instanceof zt&&r._firestore===t._firestore&&ff(r.query,t.query)&&r.metadata.isEqual(t.metadata)&&r._snapshot.isEqual(t._snapshot)}/**
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
 */function Xy(r){r=Q(r,et);const t=Q(r.firestore,st);return uf(ht(t),r._key).then((e=>lu(t,r,e)))}zt._jsonSchemaVersion="firestore/querySnapshot/1.0",zt._jsonSchema={type:_t("string",zt._jsonSchemaVersion),bundleSource:_t("string","QuerySnapshot"),bundleName:_t("string"),bundle:_t("string")};class je extends Sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new jt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new et(this.firestore,null,e)}}function Yy(r){r=Q(r,et);const t=Q(r.firestore,st),e=ht(t),n=new je(t);return N_(e,r._key).then((s=>new Gt(t,n,r._key,s,new Pe(s!==null&&s.hasLocalMutations,!0),r.converter)))}function Zy(r){r=Q(r,et);const t=Q(r.firestore,st);return uf(ht(t),r._key,{source:"server"}).then((e=>lu(t,r,e)))}function tI(r){r=Q(r,At);const t=Q(r.firestore,st),e=ht(t),n=new je(t);return Af(r._query),cf(e,r._query).then((s=>new zt(t,n,r,s)))}function eI(r){r=Q(r,At);const t=Q(r.firestore,st),e=ht(t),n=new je(t);return k_(e,r._query).then((s=>new zt(t,n,r,s)))}function nI(r){r=Q(r,At);const t=Q(r.firestore,st),e=ht(t),n=new je(t);return cf(e,r._query,{source:"server"}).then((s=>new zt(t,n,r,s)))}function rI(r,t,e){r=Q(r,et);const n=Q(r.firestore,st),s=Hi(r.converter,t,e);return Es(n,[Gi(In(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,lt.none())])}function sI(r,t,e,...n){r=Q(r,et);const s=Q(r.firestore,st),i=In(s);let a;return a=typeof(t=yt(t))=="string"||t instanceof _n?iu(i,"updateDoc",r._key,t,e,n):su(i,"updateDoc",r._key,t),Es(s,[a.toMutation(r._key,lt.exists(!0))])}function iI(r){return Es(Q(r.firestore,st),[new or(r._key,lt.none())])}function oI(r,t){const e=Q(r.firestore,st),n=G_(r),s=Hi(r.converter,t);return Es(e,[Gi(In(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,lt.exists(!1))]).then((()=>n))}function Fl(r,...t){r=yt(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||Fn(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Fn(t[n])){const c=t[n];t[n]=c.next?.bind(c),t[n+1]=c.error?.bind(c),t[n+2]=c.complete?.bind(c)}let i,a,u;if(r instanceof et)a=Q(r.firestore,st),u=sr(r._key.path),i={next:c=>{t[n]&&t[n](lu(a,r,c))},error:t[n+1],complete:t[n+2]};else{const c=Q(r,At);a=Q(c.firestore,st),u=c._query;const h=new je(a);i={next:f=>{t[n]&&t[n](new zt(a,h,c,f))},error:t[n+1],complete:t[n+2]},Af(r._query)}return(function(h,f,g,_){const S=new Bi(_),C=new Ga(f,S,g);return h.asyncQueue.enqueueAndForget((async()=>Ba(await nr(h),C))),()=>{S.Nu(),h.asyncQueue.enqueueAndForget((async()=>Ua(await nr(h),C)))}})(ht(a),u,s,i)}function aI(r,t,...e){const n=yt(r),s=(function(c){const h={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const g of f){if(!(g in c)){h.error=`snapshotJson missing required field: ${g}`;break}const _=c[g];if(typeof _!="string"){h.error=`snapshotJson field '${g}' must be a string.`;break}if(_.length===0){h.error=`snapshotJson field '${g}' cannot be an empty string.`;break}g==="bundle"?h.bundle=_:g==="bundleName"?h.bundleName=_:g==="bundleSource"&&(h.bundleSource=_)}return h})(t);if(s.error)throw new b(R.INVALID_ARGUMENT,s.error);let i,a=0;if(typeof e[a]!="object"||Fn(e[a])||(i=e[a++]),s.bundleSource==="QuerySnapshot"){let u=null;if(typeof e[a]=="object"&&Fn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return(function(h,f,g,_,S){let C,x=!1;return Nl(h,f.bundle).then((()=>K_(h,f.bundleName))).then((U=>{U&&!x&&(S&&U.withConverter(S),C=Fl(U,g||{},_))})).catch((U=>(_.error&&_.error(U),()=>{}))),()=>{x||(x=!0,C&&C())}})(n,s,i,u,e[a])}if(s.bundleSource==="DocumentSnapshot"){let u=null;if(typeof e[a]=="object"&&Fn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return(function(h,f,g,_,S){let C,x=!1;return Nl(h,f.bundle).then((()=>{if(!x){const U=new et(h,S||null,k.fromPath(f.bundleName));C=Fl(U,g||{},_)}})).catch((U=>(_.error&&_.error(U),()=>{}))),()=>{x||(x=!0,C&&C())}})(n,s,i,u,e[a])}throw new b(R.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function uI(r,t){return F_(ht(r=Q(r,st)),Fn(t)?t:{next:t})}function Es(r,t){return(function(n,s){const i=new wt;return n.asyncQueue.enqueueAndForget((async()=>l_(await Za(n),s,i))),i.promise})(ht(r),t)}function lu(r,t,e){const n=e.docs.get(t._key),s=new je(r);return new Gt(r,s,t._key,n,new Pe(e.hasPendingWrites,e.fromCache),t.converter)}function cI(r){return ty(r,{count:Y_()})}function ty(r,t){const e=Q(r.firestore,st),n=ht(e),s=ph(t,((i,a)=>new Xh(a,i.aggregateType,i._internalFieldPath)));return M_(n,r._query,s).then((i=>(function(u,c,h){const f=new je(u);return new Q_(c,f,h)})(e,r,i)))}class ey{constructor(t){this.kind="memory",this._onlineComponentProvider=Me.provider,this._offlineComponentProvider=t?.garbageCollector?t.garbageCollector._offlineComponentProvider:{build:()=>new Ja(void 0)}}toJSON(){return{kind:this.kind}}}class ny{constructor(t){let e;this.kind="persistent",t?.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=ay(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class ry{constructor(){this.kind="memoryEager",this._offlineComponentProvider=er.provider}toJSON(){return{kind:this.kind}}}class sy{constructor(t){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Ja(t)}}toJSON(){return{kind:this.kind}}}function lI(){return new ry}function hI(r){return new sy(r?.cacheSizeBytes)}function dI(r){return new ey(r)}function fI(r){return new ny(r)}class iy{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=Me.provider,this._offlineComponentProvider={build:e=>new Xa(e,t?.cacheSizeBytes,this.forceOwnership)}}}class oy{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=Me.provider,this._offlineComponentProvider={build:e=>new rf(e,t?.cacheSizeBytes)}}}function ay(r){return new iy(r?.forceOwnership)}function mI(){return new oy}/**
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
 */const uy={maxAttempts:5};/**
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
 */class cy{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=In(t)}set(t,e,n){this._verifyNotCommitted();const s=Se(t,this._firestore),i=Hi(s.converter,e,n),a=Gi(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,lt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=Se(t,this._firestore);let a;return a=typeof(e=yt(e))=="string"||e instanceof _n?iu(this._dataReader,"WriteBatch.update",i._key,e,n,s):su(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,lt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Se(t,this._firestore);return this._mutations=this._mutations.concat(new or(e._key,lt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new b(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Se(r,t){if((r=yt(r)).firestore!==t)throw new b(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */class ly{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=In(t)}get(t){const e=Se(t,this._firestore),n=new cu(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return O(24041);const i=s[0];if(i.isFoundDocument())return new os(this._firestore,n,i.key,i,e.converter);if(i.isNoDocument())return new os(this._firestore,n,e._key,null,e.converter);throw O(18433,{doc:i})}))}set(t,e,n){const s=Se(t,this._firestore),i=Hi(s.converter,e,n),a=Gi(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,a),this}update(t,e,n,...s){const i=Se(t,this._firestore);let a;return a=typeof(e=yt(e))=="string"||e instanceof _n?iu(this._dataReader,"Transaction.update",i._key,e,n,s):su(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,a),this}delete(t){const e=Se(t,this._firestore);return this._transaction.delete(e._key),this}}/**
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
 */class hy extends ly{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Se(t,this._firestore),n=new je(this._firestore);return super.get(t).then((s=>new Gt(this._firestore,n,e._key,s._document,new Pe(!1,!1),e.converter)))}}function gI(r,t,e){r=Q(r,st);const n={...uy,...e};return(function(i){if(i.maxAttempts<1)throw new b(R.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n),(function(i,a,u){const c=new wt;return i.asyncQueue.enqueueAndForget((async()=>{const h=await af(i);new b_(i.asyncQueue,h,u,a,c).ju()})),c.promise})(ht(r),(s=>t(new hy(r,s))),n)}/**
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
 */function pI(){return new ys("deleteField")}function _I(){return new tu("serverTimestamp")}function yI(...r){return new eu("arrayUnion",r)}function II(...r){return new nu("arrayRemove",r)}function TI(r){return new ru("increment",r)}function EI(r){return new Ht(r)}/**
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
 */function wI(r){return ht(r=Q(r,st)),new cy(r,(t=>Es(r,t)))}/**
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
 */function AI(r,t){const e=ht(r=Q(r,st));if(!e._uninitializedComponentsProvider||e._uninitializedComponentsProvider._offline.kind==="memory")return Qt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const a=typeof i=="string"?(function(h){try{return JSON.parse(h)}catch(f){throw new b(R.INVALID_ARGUMENT,"Failed to parse JSON: "+f?.message)}})(i):i,u=[];if(Array.isArray(a.indexes))for(const c of a.indexes){const h=Ol(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const g of c.fields){const _=zi("setIndexConfiguration",Ol(g,"fieldPath"));g.arrayConfig==="CONTAINS"?f.push(new en(_,2)):g.order==="ASCENDING"?f.push(new en(_,0)):g.order==="DESCENDING"&&f.push(new en(_,1))}u.push(new qn(qn.UNKNOWN_ID,h,f,Bn.empty()))}return u})(t);return q_(e,n)}function Ol(r,t){if(typeof r[t]!="string")throw new b(R.INVALID_ARGUMENT,"Missing string value for: "+t);return r[t]}/**
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
 */class dy{constructor(t){this._firestore=t,this.type="PersistentCacheIndexManager"}}function vI(r){r=Q(r,st);const t=Ll.get(r);if(t)return t;if(ht(r)._uninitializedComponentsProvider?._offline.kind!=="persistent")return null;const n=new dy(r);return Ll.set(r,n),n}function RI(r){bf(r,!0)}function PI(r){bf(r,!1)}function SI(r){U_(ht(r._firestore)).then((t=>N("deleting all persistent cache indexes succeeded"))).catch((t=>Qt("deleting all persistent cache indexes failed",t)))}function bf(r,t){B_(ht(r._firestore),t).then((e=>N(`setting persistent cache index auto creation isEnabled=${t} succeeded`))).catch((e=>Qt(`setting persistent cache index auto creation isEnabled=${t} failed`,e)))}const Ll=new WeakMap;/**
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
 */function VI(r){const t=ht(Q(r.firestore,st)),e=t._onlineComponents?.datastore.serializer;return e===void 0?null:Ni(e,kt(r._query)).ft}function bI(r,t){const e=ph(t,((i,a)=>new Xh(a,i.aggregateType,i._internalFieldPath))),n=ht(Q(r.firestore,st)),s=n._onlineComponents?.datastore.serializer;return s===void 0?null:cd(s,Mh(r._query),e,!0).request}/**
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
 */class CI{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(t){return hu.instance.onExistenceFilterMismatch(t)}}class hu{constructor(){this.Mc=new Map}static get instance(){return Ws||(Ws=new hu,(function(e){if(Ko)throw new Error("a TestingHooksSpi instance is already set");Ko=e})(Ws)),Ws}lt(t){this.Mc.forEach((e=>e(t)))}onExistenceFilterMismatch(t){const e=Symbol(),n=this.Mc;return n.set(e,t),()=>n.delete(e)}}let Ws=null;(function(t,e=!0){(function(s){rr=s})(Tm),Em(new wm("firestore",((n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new st(new Pm(n.getProvider("auth-internal")),new bm(a,n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new b(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new sn(h.options.projectId,f)})(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),dc(mc,gc,t),dc(mc,gc,"esm2020")})();export{Sf as AbstractUserDataWriter,ss as AggregateField,Q_ as AggregateQuerySnapshot,jt as Bytes,wy as CACHE_SIZE_UNLIMITED,ne as CollectionReference,et as DocumentReference,Gt as DocumentSnapshot,_n as FieldPath,yn as FieldValue,st as Firestore,b as FirestoreError,re as GeoPoint,z_ as LoadBundleTask,dy as PersistentCacheIndexManager,At as Query,dr as QueryCompositeFilterConstraint,Is as QueryConstraint,ii as QueryDocumentSnapshot,Wi as QueryEndAtConstraint,Ts as QueryFieldFilterConstraint,Qi as QueryLimitConstraint,uu as QueryOrderByConstraint,zt as QuerySnapshot,$i as QueryStartAtConstraint,Pe as SnapshotMetadata,Y as Timestamp,hy as Transaction,Ht as VectorValue,cy as WriteBatch,oa as _AutoId,ft as _ByteString,sn as _DatabaseId,k as _DocumentKey,py as _EmptyAppCheckTokenProvider,vm as _EmptyAuthCredentialsProvider,ct as _FieldPath,CI as _TestingHooks,Q as _cast,gy as _debugAssert,bI as _internalAggregationQueryToProtoRunAggregationQueryRequest,VI as _internalQueryToProtoQueryTarget,yy as _isBase64Available,Qt as _logWarn,km as _validateIsNotUsedTogether,oI as addDoc,Qy as aggregateFieldEqual,$y as aggregateQuerySnapshotEqual,Fy as and,II as arrayRemove,yI as arrayUnion,Ky as average,Sy as clearIndexedDbPersistence,Iy as collection,Ty as collectionGroup,j_ as connectFirestoreEmulator,Y_ as count,SI as deleteAllPersistentCacheIndexes,iI as deleteDoc,pI as deleteField,Cy as disableNetwork,PI as disablePersistentCacheIndexAutoCreation,G_ as doc,Dy as documentId,Wy as documentSnapshotFromJSON,Ry as enableIndexedDbPersistence,Py as enableMultiTabIndexedDbPersistence,by as enableNetwork,RI as enablePersistentCacheIndexAutoCreation,Gy as endAt,jy as endBefore,ht as ensureFirestoreConfigured,Es as executeWrite,ty as getAggregateFromServer,cI as getCountFromServer,Xy as getDoc,Yy as getDocFromCache,Zy as getDocFromServer,tI as getDocs,eI as getDocsFromCache,nI as getDocsFromServer,vy as getFirestore,vI as getPersistentCacheIndexManager,TI as increment,Ay as initializeFirestore,Ly as limit,qy as limitToLast,Nl as loadBundle,lI as memoryEagerGarbageCollector,dI as memoryLocalCache,hI as memoryLruGarbageCollector,K_ as namedQuery,Fl as onSnapshot,aI as onSnapshotResume,uI as onSnapshotsInSync,My as or,Oy as orderBy,fI as persistentLocalCache,mI as persistentMultipleTabManager,ay as persistentSingleTabManager,Ny as query,ff as queryEqual,Hy as querySnapshotFromJSON,Ey as refEqual,gI as runTransaction,_I as serverTimestamp,rI as setDoc,AI as setIndexConfiguration,my as setLogLevel,Jy as snapshotEqual,Uy as startAfter,By as startAt,zy as sum,xy as terminate,sI as updateDoc,EI as vector,Vy as waitForPendingWrites,ky as where,wI as writeBatch};
