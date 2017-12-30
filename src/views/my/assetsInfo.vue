<template>
	<div class="page">
    	<NavHeader title="资产信息"></NavHeader>
    	<div class="content">
    		<div class="list-block">
            	<ul>
        			<li class="disabled"><span class="myspace-ico"></span>资产总值：<label style="color:#f92626;">1231231.00</label> (元)</li>
                	<li class="disabled"><span class="myspace-ico"></span>可用资金：<label style="color:#f92626;">1231231.00</label> (元)</li>
                	<li class="disabled"><span class="myspace-ico"></span>可取资金：<label style="color:#f92626;">1231231.00</label> (元)</li>
        		</ul>
           </div>
    	</div>
	</div>
</template>
<script>
import NavHeader from '../../components/NavHeader.vue';
	export default {
		name : 'assets-info',
		components : {
			NavHeader,
			
		},
	}
</script>