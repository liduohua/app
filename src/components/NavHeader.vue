<template>
	<header class="bar bar-nav">
    	<a class="pull-left open-panel"></a>
    	<h1 class="title">摸才宝</h1>
  	</header>
</template>
<style scoped lang='scss'>
@import "../scss/mixins.scss";
.title {
  	position: absolute;
  	display: block;
  	width: 100%;
  	padding: 0;
  	margin: 0 -.5rem;
  	font-size: 1.2rem;
  	font-weight: 500;
 	line-height: 2.5rem;
  	color : $white;
  	text-align: center;
  	white-space: nowrap;
}
.title a {
  color: inherit;
}
header{
	background:$yellow;
	
}
</style>