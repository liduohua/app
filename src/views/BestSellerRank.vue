<template>
<div class="page">
    <NavHeader title="畅销榜"></NavHeader>
    <div class="content">
        <ul class="nav-tab" @click="navTab">
            <li class="active">成交量排行榜</li>
            <li>成交额排行榜</li>
            <li>涨跌幅排行榜</li>
        </ul>
        <!--成交量排行榜-->
        <div class="tab-content" v-bind:class="tabContentIndex==0 ? 'show' : '' ">
           	<BrandAndClassify>
                <div class="rank-list-panel">
                    <table>
                        <tr><th>排名</th><th>商品名称</th><th>成交量</th></tr>
                    </table>
                    <div>
                        <table>
                            <tr v-for="(item,index) of tradeVolumeRank">
                                <td  :class="rankClassSelect(index)">{{index+1}}</td>
                                <td><label>琵琶腿150kg溜溜大小 <br/>&nbsp;<span>2342342</span></label></td>
                                <td>9999<i class="up-arrow"></i></td>
                            </tr>
                        </table>
                    </div>
                </div>
           	</BrandAndClassify>
        </div>
        <!--成交额排行榜-->
        <div class="tab-content" v-bind:class="tabContentIndex==1 ? 'show' : '' ">
           	<BrandAndClassify>
                <div class="rank-list-panel">
                    <table>
                        <tr><th>排名</th><th>商品名称</th><th>成交量</th></tr>
                    </table>
                    <div>
                        <table>
                            <tr v-for="(item,index) of tradeAmountRank">
                                <td  :class="rankClassSelect(index)">{{index+1}}</td>
                                <td><label>琵琶腿150kg溜溜大小 <br/>&nbsp;<span>2342342</span></label></td>
                                <td>9999<i class="up-arrow"></i></td>
                            </tr>
                        </table>
                    </div>
                </div>
           	</BrandAndClassify>
        </div>
        <!--涨跌幅排行榜-->
        <div class="tab-content" v-bind:class="tabContentIndex==2 ? 'show' : '' ">
           	<BrandAndClassify>
                <div class="rank-list-panel">
                    <table>
                        <tr><th>排名</th><th>商品名称</th><th>成交量</th></tr>
                    </table>
                    <div>
                        <table>
                            <tr v-for="(item,index) of changeRatioRank">
                                <td  :class="rankClassSelect(index)">{{index+1}}</td>
                                <td><label>琵琶腿150kg溜溜大小 <br/>&nbsp;<span>2342342</span></label></td>
                                <td>9999<i class="up-arrow"></i></td>
                            </tr>
                        </table>
                    </div>
                </div>
           	</BrandAndClassify>
        </div>
    </div>
</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import BrandAndClassify from '../components/BrandAndClassify.vue';
	export default {
		name : 'bestSellerRank',
		components :{
			NavHeader,
			BrandAndClassify,
		},
		data : ()=>({
			tabContentIndex : 0,
			tradeVolumeRank : [{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
			],
			tradeAmountRank : [{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
			],
			changeRatioRank : [{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
				{rankNo : 1,name : '',code : '',trandAmount : '132'},
			],
		}),
		methods :{
			navTab(e){
				var target = e.target || e;
                if (target.tagName.toLowerCase() !== 'li') {
                    return;
                }
                var parent = target.parentNode;
                parent.querySelector('.active').classList.toggle('active');
                target.classList.toggle('active');
                var childNodes = parent.children;
                for (var i = 0; i < 3; i++) {
                    if (childNodes[i] === target)
                        break;
                }
               	this.tabContentIndex = i;
			},
			rankClassSelect(index){
				switch(index){
					case 0:
						return 'rank-first';
					case 1:
						return 'rank-second';
					case 2:
						return 'rank-third';
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:			
						return 'rank-other';
					default :
						return '';
				}
			},
		},
	}
</script>
<style scoped lang="scss">
	@import '../scss/mixins.scss';
	.content{
        background:#fff;
    }
    .nav-tab .active{
    	position: relative;
    }
    .nav-tab .active::after{
    	position: absolute;
    	bottom: -1px;
    	left: 50%;
        @include triangle_icon((direction : top,width:10px,height:10px,color:#fff));
    }
    .rank-list-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 1.8rem;
        background-color: #fff;
        width: 5.7rem;
        overflow: auto;
        table{
        	width:100%;
    	}
    	table th{
        	color:#2e2f33;
        	font-size:0.25rem;
        	text-align: center;
    	}
    	table td{
        	text-align: center;
        	color:#39394c;
        	font-size:0.23rem;
    	}
    	table th:first-child{
        	width:0.9rem;
    	}
    	table td:first-child{
        	width:0.9rem;
        	height:0.9rem;
        	font-weight: bold;
    	}
    	table th:last-child{
        	width:1.5rem;
    	}
    	table td > label{
        	color:#39394c;
        	position: relative;
        	transform: translateY(-50%);
    	}
    	table td > label span{
        	position: absolute;
        	left:0;
        	bottom:0;
    	}
     	table td:last-child{
        	color:#39394c;
         	width:1.5rem;
        	font-weight:bold;
    	}
    	.up-arrow{
        	display: inline-block;
        	background:url('../assets/icon/up-arrow-icon.png') no-repeat center;
       	 	background-size: 70%;
        	margin-left: 0.1rem;
        	height:1em;
        	width:1em;	
    	}
    	.down-arrow{
        	display: inline-block;
        	background:url('../assets/icon/down-arrow-icon.png') no-repeat center;
        	background-size: 70%;
        	margin-left: 0.1rem;
        	height:1em;
        	width:1em;
    	}
    	.no-change{
        	display: inline-block;
        	margin-left: 0.1rem;
        	height: 3px;
        	width: 0.5em;
        	background: #39394c;
        	vertical-align: 3px;
    	}
    	.rank-first{
        	background:url('../assets/icon/rank-first-icon.png') no-repeat center;
        	background-size: 0.5rem;
         	color:#fff;
    	}
    	.rank-second{
         	background:url('../assets/icon/rank-second-icon.png') no-repeat center;
	        background-size: 0.5rem;
	        color:#fff;
     	}
    	.rank-third{
        	background:url('../assets/icon/rank-third-icon.png') no-repeat center;
       	 	background-size: 0.5rem;
         	color:#fff;
    	}
    	.rank-other{
        	background:url('../assets/icon/rank-other-icon.png') no-repeat center;
        	background-size: 0.5rem;
         	color:#fff;
    	}
    } 
</style>