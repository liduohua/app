<template>
	<div class="page">
		<NavHeader title="全部功能"></NavHeader>
    <div class="content">
        <div class="more-ico-title">我的应用</div>
        <div class="grid-panel">
            <ul @click="delPreFuncBtn">
                <li v-for="item in preFuncBtns" data-id="{{item.id}}"><i class="subtract"></i><img src="../assets/{{item.imgName}}" />{{item.descText}}</li>
               <!-- <li><i class="subtract"></i><img src="./assets/global-icon.png" /><br/>全球指数</li>-->
            </ul>
        </div>
        <div class="more-ico-title mt10">全部应用</div>
        <div class="grid-panel">
            <ul @click="delOrAddPreFuncBtn">
                <li v-for="item in allFuncBtns" data-id="{{item.id}}"><i class="{{item.iconClass}}"></i><img src="../assets/{{item.imgName}}" />{{item.descText}}</li>

                <!--<li><i class="add"></i><img src="./assets/global-icon.png" /><br/>全球指数</li>-->
            </ul>
        </div>
    </div>
</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	export default {
		components :{
			NavHeader,
		},
		methods :{
			delPreFuncBtn(){
				
			},
			delOrAddPreFuncBtn(){
				
			},
			//loadNewsContent(){
				
			//}
		},
		created(){
			
		}
	}
</script>

<style lang="scss"> 
	
.grid-panel {
  width: 100%;
  background: #fff;
  padding-left: 0.18rem;
  padding-right: 0.18rem;
  height: auto;
  border-bottom: 1px solid #e0e4ef;
}

.grid-panel ul {
  overflow: hidden;
}

.grid-panel ul li {
  width: 25%;
  float: left;
  text-align: center;
  font-size: 0.2rem;
  color: #2e2f33;
  vertical-align: middle;
  padding: .3rem 0;
  position: relative;
}

.grid-panel ul li:active {
  background: #e9e9e9;
}

.grid-panel ul li img {
  width: 0.7rem;
}

.grid-panel ul li i {
  display:inline-block;
  width:0.25rem;
  height:0.25rem;
  border-radius: 0.2rem;
  top:0.3rem;
  right:0.1rem;
  position:absolute;
  background-size: 100%;
}


.grid-panel ul li i.subtract {
  background-image:url(../assets/subtract-icon.png) ;

}
.grid-panel ul li i.add {
  background-image:url(../assets/add-icon.png);
}

.more-ico-title {
  height: .75rem;
  padding-top: .3rem;
  background-color: #fff;
  font-size: .28rem;
  padding-left: .4rem;
  color: #2e2f33;
}
</style>