import{r as k,a as T,bL as V,aE as E,d as N,bB as P,$ as g,w as O,a1 as R,e as z,a2 as j,Z as M,R as _,a0 as A,a6 as I,b2 as Z,bM as q}from"./index-93963865.js";import{r as x,m as D,o as b,d as L}from"./el-button-d209cb55.js";function F(t){let e;const l=k(!1),n=T({...t,originalPosition:"",originalOverflow:"",visible:!1});function a(o){n.text=o}function s(){const o=n.parent,r=d.ns;if(!o.vLoadingAddClassList){let c=o.getAttribute("loading-number");c=Number.parseInt(c)-1,c?o.setAttribute("loading-number",c.toString()):(x(o,r.bm("parent","relative")),o.removeAttribute("loading-number")),x(o,r.bm("parent","hidden"))}i(),m.unmount()}function i(){var o,r;(r=(o=d.$el)==null?void 0:o.parentNode)==null||r.removeChild(d.$el)}function v(){var o;t.beforeClose&&!t.beforeClose()||(l.value=!0,clearTimeout(e),e=window.setTimeout(f,400),n.visible=!1,(o=t.closed)==null||o.call(t))}function f(){if(!l.value)return;const o=n.parent;l.value=!1,o.vLoadingAddClassList=void 0,s()}const u=N({name:"ElLoading",setup(o,{expose:r}){const{ns:c,zIndex:$}=P("loading");return r({ns:c,zIndex:$}),()=>{const C=n.spinner||n.svg,B=g("svg",{class:"circular",viewBox:n.svgViewBox?n.svgViewBox:"0 0 50 50",...C?{innerHTML:C}:{}},[g("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),S=n.text?g("p",{class:c.b("text")},[n.text]):void 0;return g(M,{name:c.b("fade"),onAfterLeave:f},{default:O(()=>[R(z("div",{style:{backgroundColor:n.background||""},class:[c.b("mask"),n.customClass,n.fullscreen?"is-fullscreen":""]},[g("div",{class:c.b("spinner")},[B,S])]),[[j,n.visible]])])})}}}),m=V(u),d=m.mount(document.createElement("div"));return{...E(n),setText:a,removeElLoadingChild:i,close:v,handleAfterLeave:f,vm:d,get $el(){return d.$el}}}let p;const G=function(t={}){if(!D)return;const e=H(t);if(e.fullscreen&&p)return p;const l=F({...e,closed:()=>{var a;(a=e.closed)==null||a.call(e),e.fullscreen&&(p=void 0)}});K(e,e.parent,l),w(e,e.parent,l),e.parent.vLoadingAddClassList=()=>w(e,e.parent,l);let n=e.parent.getAttribute("loading-number");return n?n=`${Number.parseInt(n)+1}`:n="1",e.parent.setAttribute("loading-number",n),e.parent.appendChild(l.$el),_(()=>l.visible.value=e.visible),e.fullscreen&&(p=l),l},H=t=>{var e,l,n,a;let s;return A(t.target)?s=(e=document.querySelector(t.target))!=null?e:document.body:s=t.target||document.body,{parent:s===document.body||t.body?document.body:s,background:t.background||"",svg:t.svg||"",svgViewBox:t.svgViewBox||"",spinner:t.spinner||!1,text:t.text||"",fullscreen:s===document.body&&((l=t.fullscreen)!=null?l:!0),lock:(n=t.lock)!=null?n:!1,customClass:t.customClass||"",visible:(a=t.visible)!=null?a:!0,target:s}},K=async(t,e,l)=>{const{nextZIndex:n}=l.vm.zIndex||l.vm._.exposed.zIndex,a={};if(t.fullscreen)l.originalPosition.value=b(document.body,"position"),l.originalOverflow.value=b(document.body,"overflow"),a.zIndex=n();else if(t.parent===document.body){l.originalPosition.value=b(document.body,"position"),await _();for(const s of["top","left"]){const i=s==="top"?"scrollTop":"scrollLeft";a[s]=`${t.target.getBoundingClientRect()[s]+document.body[i]+document.documentElement[i]-Number.parseInt(b(document.body,`margin-${s}`),10)}px`}for(const s of["height","width"])a[s]=`${t.target.getBoundingClientRect()[s]}px`}else l.originalPosition.value=b(e,"position");for(const[s,i]of Object.entries(a))l.$el.style[s]=i},w=(t,e,l)=>{const n=l.vm.ns||l.vm._.exposed.ns;["absolute","fixed","sticky"].includes(l.originalPosition.value)?x(e,n.bm("parent","relative")):L(e,n.bm("parent","relative")),t.fullscreen&&t.lock?L(e,n.bm("parent","hidden")):x(e,n.bm("parent","hidden"))},y=Symbol("ElLoading"),h=(t,e)=>{var l,n,a,s;const i=e.instance,v=o=>I(e.value)?e.value[o]:void 0,f=o=>{const r=A(o)&&(i==null?void 0:i[o])||o;return r&&k(r)},u=o=>f(v(o)||t.getAttribute(`element-loading-${q(o)}`)),m=(l=v("fullscreen"))!=null?l:e.modifiers.fullscreen,d={text:u("text"),svg:u("svg"),svgViewBox:u("svgViewBox"),spinner:u("spinner"),background:u("background"),customClass:u("customClass"),fullscreen:m,target:(n=v("target"))!=null?n:m?void 0:t,body:(a=v("body"))!=null?a:e.modifiers.body,lock:(s=v("lock"))!=null?s:e.modifiers.lock};t[y]={options:d,instance:G(d)}},Y=(t,e)=>{for(const l of Object.keys(e))Z(e[l])&&(e[l].value=t[l])},U={mounted(t,e){e.value&&h(t,e)},updated(t,e){const l=t[y];e.oldValue!==e.value&&(e.value&&!e.oldValue?h(t,e):e.value&&e.oldValue?I(e.value)&&Y(e.value,l.options):l==null||l.instance.close())},unmounted(t){var e;(e=t[y])==null||e.instance.close()}};export{U as v};
