import{q as _,aK as M,d as z,s as P,I as S,o as k,c as K,j as w,x as E,y,g as i,B,w as T,e as g,bc as x,X as I,W as A,J as L,Z as X,F as Y,$ as Z,r as V,a4 as q,b7 as h,al as C,bC as W,l as G,z as b,a0 as J}from"./index-93963865.js";import{c as D,a as O}from"./el-button-d209cb55.js";import{_ as H}from"./plugin-vue_export-helper-1cff8a04.js";import{P as p,i as R,a as Q}from"./vnode-40e000bf.js";const U=_({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:M,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),ee={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},ae=z({name:"ElTag"}),se=z({...ae,props:U,emits:ee,setup(e,{emit:u}){const d=e,r=D(),s=P("tag"),m=S(()=>{const{type:a,hit:n,effect:l,closable:o,round:c}=d;return[s.b(),s.is("closable",o),s.m(a),s.m(r.value),s.m(l),s.is("hit",n),s.is("round",c)]}),f=a=>{u("close",a)},t=a=>{u("click",a)};return(a,n)=>a.disableTransitions?(k(),K("span",{key:0,class:y(i(m)),style:L({backgroundColor:a.color}),onClick:t},[w("span",{class:y(i(s).e("content"))},[E(a.$slots,"default")],2),a.closable?(k(),B(i(O),{key:0,class:y(i(s).e("close")),onClick:I(f,["stop"])},{default:T(()=>[g(i(x))]),_:1},8,["class","onClick"])):A("v-if",!0)],6)):(k(),B(X,{key:1,name:`${i(s).namespace.value}-zoom-in-center`,appear:""},{default:T(()=>[w("span",{class:y(i(m)),style:L({backgroundColor:a.color}),onClick:t},[w("span",{class:y(i(s).e("content"))},[E(a.$slots,"default")],2),a.closable?(k(),B(i(O),{key:0,class:y(i(s).e("close")),onClick:I(f,["stop"])},{default:T(()=>[g(i(x))]),_:1},8,["class","onClick"])):A("v-if",!0)],6)]),_:3},8,["name"]))}});var te=H(se,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const pe=Y(te),le=_({prefixCls:{type:String}}),j=z({name:"ElSpaceItem",props:le,setup(e,{slots:u}){const d=P("space"),r=S(()=>`${e.prefixCls||d.b()}__item`);return()=>Z("div",{class:r.value},E(u,"default"))}}),F={small:8,default:12,large:16};function ne(e){const u=P("space"),d=S(()=>[u.b(),u.m(e.direction),e.class]),r=V(0),s=V(0),m=S(()=>{const t=e.wrap||e.fill?{flexWrap:"wrap",marginBottom:`-${s.value}px`}:{},a={alignItems:e.alignment};return[t,a,e.style]}),f=S(()=>{const t={paddingBottom:`${s.value}px`,marginRight:`${r.value}px`},a=e.fill?{flexGrow:1,minWidth:`${e.fillRatio}%`}:{};return[t,a]});return q(()=>{const{size:t="small",wrap:a,direction:n,fill:l}=e;if(h(t)){const[o=0,c=0]=t;r.value=o,s.value=c}else{let o;C(t)?o=t:o=F[t||"small"]||F.small,(a||l)&&n==="horizontal"?r.value=s.value=o:n==="horizontal"?(r.value=o,s.value=0):(s.value=o,r.value=0)}}),{classes:d,containerStyle:m,itemStyle:f}}const oe=_({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},class:{type:b([String,Object,Array]),default:""},style:{type:b([String,Array,Object]),default:""},alignment:{type:b(String),default:"center"},prefixCls:{type:String},spacer:{type:b([Object,String,Number,Array]),default:null,validator:e=>W(e)||C(e)||J(e)},wrap:Boolean,fill:Boolean,fillRatio:{type:Number,default:100},size:{type:[String,Array,Number],values:M,validator:e=>C(e)||h(e)&&e.length===2&&e.every(C)}}),re=z({name:"ElSpace",props:oe,setup(e,{slots:u}){const{classes:d,containerStyle:r,itemStyle:s}=ne(e);function m(f,t="",a=[]){const{prefixCls:n}=e;return f.forEach((l,o)=>{R(l)?h(l.children)&&l.children.forEach((c,v)=>{R(c)&&h(c.children)?m(c.children,`${t+v}-`,a):a.push(g(j,{style:s.value,prefixCls:n,key:`nested-${t+v}`},{default:()=>[c]},p.PROPS|p.STYLE,["style","prefixCls"]))}):Q(l)&&a.push(g(j,{style:s.value,prefixCls:n,key:`LoopKey${t+o}`},{default:()=>[l]},p.PROPS|p.STYLE,["style","prefixCls"]))}),a}return()=>{var f;const{spacer:t,direction:a}=e,n=E(u,"default",{key:0},()=>[]);if(((f=n.children)!=null?f:[]).length===0)return null;if(h(n.children)){let l=m(n.children);if(t){const o=l.length-1;l=l.reduce((c,v,$)=>{const N=[...c,v];return $!==o&&N.push(g("span",{style:[s.value,a==="vertical"?"width: 100%":null],key:$},[W(t)?t:G(t,p.TEXT)],p.STYLE)),N},[])}return g("div",{class:d.value,style:r.value},l,p.STYLE|p.CLASS)}return n.children}}}),de=Y(re);export{de as E,pe as a,U as t};
