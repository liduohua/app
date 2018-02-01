<template>
	<div class="page">
    	<NavHeader title="个人注册"></NavHeader>
    <div class="bar bar-footer regist-foot">
        <p>
            <span class="input-checkbox active"><input type="checkbox" checked></span>同意云冻批《注册协议》
        </p>
        <button type="submit">申请注册</button>
    </div>
    <div class="content">
        <div class="regist">
            <ul>
                <li>
                    <label>手机号</label>
                    <p ><input type="text" placeholder="请输入手机号"></p>
                </li>
                <li>
                    <label>短信验证码</label>
                    <button  type="button" class="yzm">短信验证码</button>
                    <p>
                        <input type="text" placeholder="请输入短信验证码">
                    </p>
                </li>
                <li>
                    <label>密码</label>
                    <p><input type="password" placeholder="至少6位字母数字组合"></p>
                </li>
                <li>
                    <label>确认密码</label>
                    <p><input type="password" placeholder="至少6位字母数字组合"></p>
                </li>
                <li>
                    <label>证件类型</label>
                    <p class="select">
                        证件类型
                    </p>
                </li>
                <li>
                    <label>身份证</label>
                    <p><input type="text" placeholder="请输入身份证号"></p>
                </li>
            </ul>
        </div>
        <div class="card">
            <h4>身份证图片正反面</h4>
            <ul>
                <li class="fl">
                    <p class="pic"><img src="../../assets/sfz-pic.png" alt=""><br/>点击上传</p>
                    <p class="info">上传身份证图片正面，jpg/jpeg/png/gif格式，5M以内</p>
                </li>
                <li class="fr">
                    <p class="pic"><img src="../../assets/sfz-pic.png" alt=""><br/>点击上传</p>
                    <p class="info">上传身份证图片正面，jpg/jpeg/png/gif格式，5M以内</p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	export default {
		components : {
			NavHeader,
		},
	}
</script>
<style lang="scss">
	@import '../../scss/reg.scss'; 
</style>
