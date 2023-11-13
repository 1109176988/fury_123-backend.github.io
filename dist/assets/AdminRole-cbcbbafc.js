import{d as A,r as i,a as D,a1 as B,o as S,c as G,e,w as a,l as g,B as H,j as w,D as F,R as J}from"./index-e2bf60b4.js";import{v as O}from"./el-loading-1a5f9ff1.js";import{E as Q,a as W,b as X}from"./el-table-column-ae6330b6.js";import{a as Y,b as Z,E as ee}from"./el-form-item-b5ac5a16.js";import{E as oe,a as ae,b as te}from"./el-tree-59c610b1.js";import{E as le}from"./el-select-7b394ed3.js";/* empty css               */import"./el-scrollbar-cdb85f8e.js";import"./el-tooltip-4ed993c7.js";import{E as ne}from"./el-space-416b0443.js";import{E as se}from"./el-button-ac666232.js";import{a as u,E as U}from"./index-f34aa124.js";import"./vnode-0c7aa6a7.js";import"./plugin-vue_export-helper-1cff8a04.js";import"./typescript-f3187430.js";import"./index-dbdb01af.js";import"./index-86f67313.js";import"./validator-1a74f685.js";const re=w("span",null,"操作",-1),ie=["title"],ue={class:"center"},De=A({__name:"AdminRole",setup(ce){const m=i(!1),d=i([]),c=D({page:1,size:10}),v=i(0);function p(){u.roleList.do(c,m).then(o=>{console.log(o,"res"),v.value=o.total,console.log(v.value,"total.value"),d.value=o.list}).catch(u.errorPage)}p(),console.log("执行了queryData()");const y=i([]),b=i([]);u.sysMenuList.do({}).then(o=>{console.log(o,"res-el-drawer"),y.value=o.menus,console.log(y,"菜单权限数据"),b.value=o.actions,console.log(b,"功能权限数据")}).catch(u.errorPage);const _=i(!1);let f=-1;const t=D({id:0,name:"",actions:[],menus:[]}),k=i(),h=i();function x(o,l=-1){f=l,console.log(o,"item"),console.log(l,"idx"),console.log(o.id,"item.id"),t.id=o.id,console.log(t.id,"formState.id"),t.name=o.name,_.value=!0,J(()=>{var r,s;(r=k.value)==null||r.setCheckedKeys(o.menus),(s=h.value)==null||s.setCheckedKeys(o.actions)})}const z=i();function E(){console.log("关闭了el-drawer"),_.value=!1}function K(){var o;(o=z.value)==null||o.validate(l=>{var r,s;if(!l)return!1;t.menus=(r=k.value)==null?void 0:r.getCheckedKeys(!0),t.actions=(s=h.value)==null?void 0:s.getCheckedKeys(!0),t.id?u.roleUpdate.do(t,m).then(()=>{d.value[f].name=t.name,d.value[f].menus=t.menus,d.value[f].actions=t.actions,E(),U.success("操作成功")}).catch(u.errorMsg):u.roleCreate.do(t,m).then(()=>{U.success("操作成功"),E(),c.page=1,p()}).catch(u.errorMsg)})}return(o,l)=>{const r=Q,s=se,M=ne,P=W,j=le,q=Y,C=Z,R=oe,T=ae,I=te,L=ee,N=X,V=O;return B((S(),G("div",null,[e(P,{data:d.value,border:""},{default:a(()=>[e(r,{prop:"id",label:"ID",width:"80"}),e(r,{prop:"name",label:"名称"}),e(r,null,{header:a(()=>[e(M,{class:"justify"},{default:a(()=>[re,e(s,{type:"primary",link:"",size:"small",onClick:l[0]||(l[0]=n=>x({id:0,name:"",actions:[],menus:[]}))},{default:a(()=>[g("+ 新增")]),_:1})]),_:1})]),default:a(({row:n,$index:$})=>[e(s,{type:"primary",size:"small",onClick:me=>x(n,$)},{default:a(()=>[g("编辑")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),e(j,{small:"","current-page":c.page,"onUpdate:currentPage":l[1]||(l[1]=n=>c.page=n),"page-size":c.size,"onUpdate:pageSize":l[2]||(l[2]=n=>c.size=n),"page-sizes":[10,20,30,40,50],layout:"total, prev, pager, next, sizes, jumper",total:v.value,onCurrentChange:p,onSizeChange:p},null,8,["current-page","page-size","total"]),e(N,{modelValue:_.value,"onUpdate:modelValue":l[4]||(l[4]=n=>_.value=n),size:"800",title:(t.id?"编辑":"新增")+"角色"},{default:a(()=>[B((S(),H(L,{ref_key:"formRef",ref:z,model:t,"label-width":"80px"},{default:a(()=>[e(I,null,{default:a(()=>[e(T,{span:10},{default:a(()=>[e(C,{label:"角色名称",prop:"name",rules:[{required:!0,min:2,message:"请输入最少2个字符",trigger:"blur"}]},{default:a(()=>[e(q,{maxlength:33,modelValue:t.name,"onUpdate:modelValue":l[3]||(l[3]=n=>t.name=n)},null,8,["modelValue"])]),_:1}),e(C,{label:"菜单权限"},{default:a(()=>[e(R,{ref_key:"menuTreeRef",ref:k,data:y.value,"node-key":"name",props:{label:"title",children:"sub"},"default-expand-all":"","show-checkbox":""},null,8,["data"])]),_:1})]),_:1}),e(T,{span:14},{default:a(()=>[e(C,{label:"功能权限",style:{overflow:"hidden"}},{default:a(()=>[e(R,{ref_key:"actionTreeRef",ref:h,data:b.value,"node-key":"key_name","show-checkbox":"",props:{children:"sub"}},{default:a(({data:n})=>[w("span",{title:n.key_name},F(n.title)+" "+F(n.key_name),9,ie)]),_:1},8,["data"])]),_:1})]),_:1})]),_:1}),w("div",ue,[e(s,{type:"primary",onClick:K},{default:a(()=>[g("确定")]),_:1}),e(s,{onClick:E},{default:a(()=>[g("取消")]),_:1})])]),_:1},8,["model"])),[[V,m.value]])]),_:1},8,["modelValue","title"])])),[[V,m.value]])}}});export{De as default};
