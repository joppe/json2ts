!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/assets/",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);var r;!function(e){e[e.Left=0]="Left",e[e.Right=1]="Right"}(r||(r={}));function i(e){return 0===e.length?e:`${e.charAt(0).toUpperCase()}${e.slice(1)}`}const o=/^\[object\s(\w+)\]$/;function c(e){const t=Object.prototype.toString.call(e),n=o.exec(t);if(null===n||2!==n.length)throw new Error(`Type could not be found for "${t}"`);return n[1]}function s(e,t){if(e===t)return!0;const n=c(e);return n===c(t)&&("Date"===n?e.getTime()===t.getTime():"Array"===n?u(e,t):"Object"===n&&function(e,t){const n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>s(e[n],t[n]))}(e,t))}function a(e){const t=e.slice(0);return t.sort(),t}function u(e,t){if(e.length!==t.length)return!1;const n=a(e),r=a(t);return n.every((e,t)=>s(e,r[t]))}var p;function l(e,t){const n=e.slice(0);return t.forEach(e=>{var t;!1==(t=e,void 0!==n.find(e=>s(e,t)))&&n.push(e)}),n}function f(e){if(e===p.String)return"string";if(e===p.Number)return"number";if(e===p.Boolean)return"boolean";if(e===p.Array)return"array";if(e===p.Object)return"object";throw new Error(`Unsupported type ${e}`)}function d(e,t){if(void 0===e)return t;const n=function(e){return e.properties.map(e=>Object.assign(Object.assign({},e),{isOptional:!0}))}(e);return t.properties.forEach(e=>{const t=function(e,t){return t.find(t=>t.name===e.name)}(e,n);void 0===t?n.push(Object.assign(Object.assign({},e),{isOptional:!0})):(t.isOptional=!1,u(t.type,e.type)||(t.type=l(t.type,e.type)))}),{name:e.name,properties:n}}function h(e){let t;const n=[],r=[];e.forEach(e=>{const i=c(e);"Array"===i?r.push(e):"String"===i&&!1===n.includes(e)?n.push(e):"Object"===i&&(t=d(t,e))});const i=void 0===t?[]:[t];return[...n,...i,...r]}function y(e){if(e.type===p.Array)return function(e){const t=[];return e.children.forEach(e=>{const n=y(e);e.type===p.Array?t.push(n.type):t.push(...n.type)}),{name:e.name,type:h(t),isArray:!0,isOptional:!1}}(e);if(e.type===p.Object)return function(e){const t=b(e);return{name:e.name,type:[t],isArray:!1,isOptional:!1}}(e);if((t=e.type)===p.Boolean||t===p.Number||t===p.String)return function(e){return{name:e.name,type:[f(e.type)],isArray:!1,isOptional:!1}}(e);var t;throw new Error(`Unsupported node type ${e.type}`)}function b(e){const t=e.children.map(e=>y(e));return{name:i(e.name),properties:t}}!function(e){e[e.Array=0]="Array",e[e.Boolean=1]="Boolean",e[e.Number=2]="Number",e[e.Object=3]="Object",e[e.String=4]="String"}(p||(p={}));const m={};function g(e,t){const n=function(e){const t=c(e);switch(t){case"Array":return p.Array;case"Boolean":return p.Boolean;case"Number":return p.Number;case"Object":return p.Object;case"String":return p.String;default:throw new Error(`Unsupported type "${t}"`)}}(t),r=function(e,t){return{name:e,type:t,children:[]}}(function(e,t){if(t!==p.Object)return e;let n=i(e);return void 0===m[n]&&(m[n]=0),m[n]>0&&(n=`${n}${String(m[n])}`),m[n]+=1,n}(e,n),n);return n===p.Object?Object.keys(t).forEach(e=>{r.children.push(j(e,t[e]))}):n===p.Array&&t.forEach(t=>{const n=j(e,t);var i;i=n,void 0===r.children.find(e=>s(i,e))&&r.children.push(n)}),r}function j(e,t){return Object.keys(m).forEach(e=>{delete m[e]}),g(e,t)}function O(e,t){return function(e){return b(e)}(function(e,t){return j(t,JSON.parse(e))}(e,t))}class w{constructor(){this._text="",this._children=[]}get children(){return[...this._children]}space(){this._text+="&nbsp;"}newLine(){this._text+="\n"}tab(){this._text+="\t"}prepend(e){this._text=`${e}${this._text}`}append(e){this._text+=e}wrap(e,t){this._text=`${e}${this._text}${t}`}flush(){this._text=""}addChild(e){this._children.push(e)}addChildren(e){this._children.push(...e)}toString(){return this._text}toStringTree(){const e=this._children.map(e=>e.toStringTree());return`${this._text}${e.join("")}`}}class S{constructor(e){this._rootInterface=e}write(){return this.object(this._rootInterface).toStringTree()}type(e,t){const n=new w;return e.forEach((e,t)=>{const r=c(e);if(t>0&&n.append("|"),"Array"===r){const t=this.type(e,!0);n.append(`<span class="type type--array">${t.toString()}</span>`),n.addChildren(t.children)}else"Object"===r?(n.append(`<span class="type type--object">${e.name}</span>`),n.addChild(this.object(e))):n.append(`<span class="type type--primitive">${e}</span>`)}),e.length>1&&n.wrap("(",")"),t&&n.append("[]"),n}object(e){const t=new w;return t.newLine(),t.append('<span class="keyword keyword--interface">interface</span>'),t.space(),t.append(`<span class="name name--interface">${e.name}</span>`),t.append(" {"),e.properties.forEach(e=>{t.newLine(),t.tab(),t.append(`<span class="name name--property">${e.name}</span>`),e.isOptional&&t.append("?"),t.append(":"),t.space();const n=this.type(e.type,e.isArray);t.append(`<span class="type">${n.toString()}</span>`),t.addChildren(n.children),t.append(";")}),t.newLine(),t.append("}"),t.newLine(),t}}const _=window.document.querySelector(".js-trigger"),v=window.document.querySelector(".js-input"),$=window.document.querySelector(".js-output"),x=window.document.querySelector(".js-status");null!==_&&null!==v&&null!==$&&null!==x&&_.addEventListener("click",()=>{try{const e=new S(O(v.value,"root"));$.innerHTML=e.write(),x.className="",x.innerText="✅ Compile successful"}catch(e){$.innerText="",x.className="error",x.innerText=`❌ Error compiling: ${e.toString()}`}})}]);
//# sourceMappingURL=main.js.map