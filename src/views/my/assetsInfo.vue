<template>
	<div class="page">
    	<NavHeader title="资产信息"></NavHeader>
    	<div class="content">
    		<div class="list-block">
            	<ul>
        			<li class="disabled"><span class="myspace-ico"></span>资产总值：<label style="color:#f92626;">{{totalAmount}}</label> (元)</li>
                	<li class="disabled"><span class="myspace-ico"></span>可用资金：<label style="color:#f92626;">{{usableAmount}}</label> (元)</li>
                	<li class="disabled"><span class="myspace-ico"></span>可取资金：<label style="color:#f92626;">{{canFetchAmount}}</label> (元)</li>
        		</ul>
           </div>
    	</div>
	</div>
</template>
<script>
import NavHeader from '../../components/NavHeader.vue';
import {httpPost} from '../../api';
import {formatMoney} from '../../lib/utils';
	export default {
		name : 'assets-info',
		data : () => ({
			totalAmount : '',
			usableAmount : '',
			canFetchAmount : ''
		}),
		components : {
			NavHeader,	
		},
		async created () {
			let assetsInfo = await httpPost('300003',{
				
			});
			if(assetsInfo.error_no === 0){
				this.totalAmount = formatMoney(assetsInfo.totalAmount,2);
				this.usableAmount = formatMoney(assetsInfo.usableAmount,2);
				this.canFetchAmount = formatMoney(assetsInfo.canFetchAmount,2);
			}
		}
	}
</script>
