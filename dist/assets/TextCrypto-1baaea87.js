import{d as b,r as d,a1 as g,o as h,B as w,w as n,e,g as s,bG as E,bH as V}from"./index-e2bf60b4.js";import{v as C}from"./el-loading-1a5f9ff1.js";import{a as k,b as B,E as D}from"./el-form-item-b5ac5a16.js";import{E as M}from"./el-button-ac666232.js";import{a as r,E as T}from"./index-f34aa124.js";import"./typescript-f3187430.js";import"./plugin-vue_export-helper-1cff8a04.js";const N=b({__name:"TextCrypto",setup(F){const p=d(!1),t=d(""),o=d(""),_=/^[a-zA-Z\d+/]+={0,2}$/,f=()=>{o.value="",r.cryptoEecrypt.do({text:t.value.trim()},p).then(l=>{o.value=l.result}).catch(r.errorMsg)},v=()=>{let l=o.value.trim();if(l.length&3||!_.test(l)){T.warning("密文格式错误");return}t.value="",r.cryptoDecrypt.do({text:l},p).then(a=>{t.value=a.result}).catch(r.errorMsg)};return(l,a)=>{const c=k,i=B,m=M,y=D,x=C;return g((h(),w(y,{"label-width":"80px",style:{width:"500px"}},{default:n(()=>[e(i,{label:"明文"},{default:n(()=>[e(c,{modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=u=>t.value=u),rows:3,type:"textarea",maxlength:100},null,8,["modelValue"])]),_:1}),e(i,{"label-width":"230px"},{default:n(()=>[e(m,{type:"success",icon:s(E),round:"",onClick:f,disabled:t.value.trim().length<2||!s(r).cryptoEecrypt.permit()},null,8,["icon","disabled"]),e(m,{type:"danger",icon:s(V),round:"",onClick:v,disabled:o.value.trim().length<4||!s(r).cryptoDecrypt.permit()},null,8,["icon","disabled"])]),_:1}),e(i,{label:"密文"},{default:n(()=>[e(c,{modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=u=>o.value=u),rows:5,type:"textarea",maxlength:400},null,8,["modelValue"])]),_:1})]),_:1})),[[x,p.value]])}}});export{N as default};
