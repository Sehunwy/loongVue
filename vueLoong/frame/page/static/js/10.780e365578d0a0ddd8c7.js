webpackJsonp([10],{"0TeB":function(t,e){},"3Pxq":function(t,e){},qqwI:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("BO1k"),a=i.n(s),o={name:"loongSelectTree",data:function(){return{isShowList:!1,iconClass:"",selectTreeData:[],index:-1,optionsShow:[],layerArr:[],searchData:[],searchVal:"",isSearch:!1,count:-1,selectedValue:""}},props:{treeWid:{default:"200px"},treeData:{default:[]},treeVal:{default:"value"}},methods:{selectBox:function(){this.isShowList=!this.isShowList,this.iconClass=this.isShowList?"select-icon-rotate":"select-icon-rotate1"},clickOther:function(){var t=this.$refs.selectBox,e=this.$refs.listBox,i=t.contains(event.target),s=e.contains(event.target);i||s||(this.isShowList&&(this.iconClass="select-icon-rotate1"),this.isShowList=!1)},setOptionData:function(t,e){for(var i in t)e=void 0==e?-1:e,this.index++,this.layerNumber=-1==e?0:this.layerArr[e]+1,this.layerArr[this.index]=this.layerNumber,this.selectTreeData.push({id:this.index,parentId:e,data:t[i],hasChild:void 0!=t[i].children&&t[i].children.length>0,layer:this.layerNumber}),-1==e&&this.searchData.push({id:this.index,parentId:-1,data:t[i]}),this.optionsShow.push({isShow:-1==e,parentId:e,icon:"#icon-jiantouyou"}),void 0!=t[i].children&&t[i].children.length>0&&this.setOptionData(t[i].children,this.index)},isSpread:function(t){var e=this.selectTreeData[t].id,i=!1;for(var s in this.optionsShow)this.optionsShow[s].parentId==e?i=!this.optionsShow[s].isShow:-1==this.selectTreeData[t].parentId&&-1==this.optionsShow[s].parentId?this.optionsShow[s].icon="#icon-jiantouyou":-1==this.selectTreeData[t].parentId&&(this.optionsShow[s].isShow=!1,this.optionsShow[s].icon="#icon-jiantouyou");this.recursiveShow(e,i,!i)},recursiveShow:function(t,e,i){for(var s in-1!=t&&(this.optionsShow[t].icon=e?"#icon-jiantouxia":"#icon-jiantouyou"),this.optionsShow)this.optionsShow[s].parentId==t&&(this.optionsShow[s].isShow=e,i&&this.recursiveShow(this.selectTreeData[s].id,e))},searchOption:function(){for(var t in this.isSearch=!0,this.count=-1,this.count++,this.searchData)-1!=this.searchData[t].data[this.treeVal].indexOf(this.searchVal)?(this.count++,this.recursiveShow(this.searchData[t].id,!0,!0),this.optionsShow[this.searchData[t].id].isShow=!0):(this.recursiveShow(this.searchData[t].id,!1,!0),this.optionsShow[this.searchData[t].id].isShow=!1)},initShow:function(){var t=!0,e=!1,i=void 0;try{for(var s,o=a()(this.optionsShow);!(t=(s=o.next()).done);t=!0){var n=s.value;-1==n.parentId?n.isShow=!0:n.isShow=!1}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}},selectData:function(t){this.selectedValue=this.selectTreeData[t].data[this.treeVal],this.isShowList=!1},reopen:function(){var t=!0,e=!1,i=void 0;try{for(var s,o=a()(this.optionsShow);!(t=(s=o.next()).done);t=!0){s.value.icon="#icon-jiantouyou"}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}}},mounted:function(){window.addEventListener("click",this.clickOther)},beforeDestroy:function(){window.removeEventListener("click",this.clickOther)},watch:{treeData:function(){this.setOptionData(this.treeData)},isShowList:function(t,e){t||(this.searchVal="",this.count=-1,this.reopen(),this.initShow(),console.log(this.optionsShow))}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"select-tree",style:{width:t.treeWid}},[i("div",{ref:"selectBox",staticClass:"select-box",class:[t.isShowList?"select-box-selected":""],on:{click:function(e){return t.selectBox()}}},[i("div",{staticClass:"select"},[t._v(t._s(t.selectedValue))]),t._v(" "),i("div",{staticClass:"select-icon"},[i("svg",{staticClass:"icon",class:t.iconClass},[i("use",{attrs:{"xlink:href":"#icon-xiajiantou"}})])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowList,expression:"isShowList"}],ref:"listBox",staticClass:"list-box"},[i("div",{staticClass:"select-search-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchVal,expression:"searchVal"}],staticClass:"select-search-input",attrs:{placeholder:"过滤搜索"},domProps:{value:t.searchVal},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchOption()},input:function(e){e.target.composing||(t.searchVal=e.target.value)}}}),t._v(" "),i("div",{staticClass:"search-icon cursor-pointer",on:{click:function(e){return t.searchOption()}}},[i("svg",{staticClass:"icon"},[i("use",{attrs:{"xlink:href":"#icon-sousu"}})])])]),t._v(" "),i("ul",{staticClass:"option-list"},[t._l(t.selectTreeData,function(e,s){return i("li",{staticClass:"option ellip c3 fs14",on:{click:function(e){return t.selectData(s)}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.optionsShow[s].isShow,expression:"optionsShow[index].isShow"}],style:{paddingLeft:10*e.layer+"px"}},[i("div",{staticClass:"fl",staticStyle:{width:"14px",height:"14px"}},[i("svg",{directives:[{name:"show",rawName:"v-show",value:e.hasChild,expression:"data.hasChild"}],staticClass:"icon collapable-icon",attrs:{"aria-hidden":"true"},on:{click:function(e){return e.stopPropagation(),t.isSpread(s)}}},[i("use",{attrs:{"xlink:href":t.optionsShow[s].icon}})])]),t._v(" "),i("svg",{staticClass:"icon mr5",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-bumen"}})]),t._v(" "),i("span",[t._v(t._s(e.data[t.treeVal]))])])])}),t._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:0==t.count||0==t.selectTreeData.length,expression:"count==0||selectTreeData.length==0"}],staticClass:"option ellip c9 fs14",staticStyle:{"text-align":"center","padding-top":"10px"}},[i("span",[t._v("无匹配数据")])])],2)])])},staticRenderFns:[]};var r={name:"selectTree",data:function(){return{treeWid:"200px",treeData:[],treeVal:"value"}},methods:{getTableData:function(){var t=this;this.$axios.get("http://13.15.11.34:3000/getSelectTree",{}).then(function(e){t.treeData=e.data.data,console.log(e.data.data)}).catch(function(t){alert("请求失败了哦")})}},created:function(){this.getTableData()},components:{loongSelectTree:i("VU/8")(o,n,!1,function(t){i("3Pxq")},"data-v-17384722",null).exports}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"selectTree"},[e("loongSelectTree",{attrs:{treeWid:this.treeWid,treeData:this.treeData,treeVal:this.treeVal}})],1)},staticRenderFns:[]};var h=i("VU/8")(r,c,!1,function(t){i("0TeB")},"data-v-339ecbc7",null);e.default=h.exports}});
//# sourceMappingURL=10.780e365578d0a0ddd8c7.js.map