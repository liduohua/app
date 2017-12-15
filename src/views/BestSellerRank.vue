<template>
<div class="page">
    <NavHeader title="畅销榜"></NavHeader>
    <div class="content">
        <ul class="nav-tab">
            <li class="active">成交量排行榜</li>
            <li>成交额排行榜</li>
            <li>涨跌幅排行榜</li>
        </ul>
        <div class="tab-content show">
            <table  class="rank-table rank-table-head">
                <thead>
                <tr>
                    <td>排名</td>
                    <td>商品名称</td>
                    <td>成交量</td>
                </tr>
                </thead>
            </table>
            <div class="rank-table-body">
                <table class="rank-table">
                    <tbody>
                    <tr class="first"><td class="bg">1</td><td>鸡腿10912六合12<label>1231241</label></td><td>124992342</td></tr>
                    <tr class="second"><td class="bg">1</td><td>鸡腿10912六合12<label>1231241</label></td><td>124992342</td></tr>
                    <tr class="third"><td class="bg">1</td><td>鸡腿10912六合12<label>1231241</label></td><td>124992342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>
                    <tr><td class="bg">1</td><td>鸡腿10912六合12<br/>1231241</td><td>1242342</td></tr>

                    </tbody>
                </table>
            </div>
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
			
		},
	}
</script>
<style>
	.content{
            background:#fff;
        }
        
        .tab-content{
            font-size: 0.23rem;
            position: absolute;
            top: 0.7rem;
            left: 15px;
            bottom: 0;
            right: 15px;
        }
        .rank-table{
            width:100%;
        }
        .rank-table-head{
            font-weight: bold;
            border-bottom:1px solid #efeff0;
        }
        .rank-table-head td{
            height:0.7rem;
        }
        .rank-table-body{
            position: absolute;
            top: 0.7rem;
            left: 0;
            bottom: 0;
            width: 100%;
            overflow: auto;
        }
        .rank-table-body tr{
            border-bottom:1px solid #efeff0;
        }
        .rank-table-body td{
            padding:5px;
            color:#89898a;
        }
        .rank-table-body td label{
            display:block;
        }
        .rank-table td:first-child{
            width:50px;
            text-align: center;
        }
        .rank-table td:last-child{
            width:100px;
            text-align: center;
        }
        .bg{
            background: url(../assets/rank-ordinary-icon.png) center no-repeat;
            background-size: 0.5rem;
        }
        .first td{
            color :#f29f9f;
        }
        .first .bg{
            background: url(../assets/rank-first-icon.png) center no-repeat;
            background-size: 0.5rem;
        }
        .second td{
            color :#87a0ed;
        }
        .second .bg{
            background: url(../assets/rank-second-icon.png) center no-repeat;
            background-size: 0.5rem;
        }
        .third td{
            color :#f7cfa1;
        }
        .third .bg{
            background: url(../assets/rank-third-icon.png) center no-repeat;
            background-size: 0.5rem;
        }
        td label{
            color: #cececf;
        }
</style>