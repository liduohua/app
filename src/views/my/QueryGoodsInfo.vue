<template>
	<div class="page">
		<NavHeader title="商品信息"></NavHeader>
		<div class="content">
			<ScrollTable></ScrollTable>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	import ScrollTable from '../../components/ScrollTable.vue';
	export default {
		data : () => ({
			tabContentIndex : 0
		}),
		methods : {
			
		},
		components : {
			NavHeader,
			ScrollTable,
		}
	}
</script>
