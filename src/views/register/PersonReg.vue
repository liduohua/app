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
	@import '../../scss/mixins.scss';
	.regist {
    background-color: #fff;
    padding: 0 .5rem;
}
.regist ul li {
    height: 1.1rem;
    line-height: 1.1rem;
    position: relative;
     @include hairline(bottom , #ccc);
    
}
.regist ul li button {
    position: absolute;
    right: 0;
    top: .25rem;
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
    color: #fff;
    font-size: .25rem;
    display: block;
    background: -webkit-linear-gradient(#324fff, #1d2088);
    box-shadow: 0 1px 4px 0 #5887ff;
    border: none;
}
.regist ul li button ~ p input {
    padding-right: 2.3rem;
}
.regist ul li label {
    position: absolute;
    font-size: .3rem;
    float: left;
    color: #1c1816;
}
.regist ul li p {
    margin: 0;
    text-align: right;
    font-size: .25rem;
}
.regist ul li p input[type='text'],
.regist ul li p input[type='password'] {
    height: 1.1rem;
    float: left;
    font-size: .25rem;
    width: 100%;
    text-align: right;
    background-color: transparent;
    border: none;
}
.regist ul li p input[type='radio'],
.regist ul li p input[type='checkbox'] {
    border: 1px solid #1d2088;
    vertical-align: middle;
    margin-right: .15rem;
    width: .22rem;
    border-radius: 0;
}
.regist ul li p.select::after {
    content: "▼";
    font-size: .16rem;
    color: #7d7d7d;
}

.card {
    background-color: #fff;
    padding: 0 .5rem .4rem;
    overflow: hidden;
}
.card h4 {
    font-size: .3rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
}
.card ul li {
    width: 3.1rem;
}
.card ul li p {
    margin: 0;
    padding: 0;
}
.card ul li .pic {
    background-color: #efefef;
    width: 3.1rem;
    height: 1.8rem;
    border-radius: .05rem;
    font-size: .22rem;
    color: #c5c5c5;
    text-align: center;
    padding-top: .32rem;
    line-height: 1;
}
.card ul li .pic img {
    width: .8rem;
    display: block;
    margin: 0 auto;
}
.card ul li .info {
    font-size: .16rem;
    color: #1c1816;
    line-height: 2;
}
.card ul.one li {
    width: 100%;
}
.card ul.one li .pic {
    width: 100%;
}
.regist-foot {
    height: 2.28rem;
}
.regist-foot p {
    margin: .3rem 0;
    padding: 0;
    padding-left: .4rem;
    font-size: .2rem;
    color: #646464;
}
.regist-foot p input {
    border: 1px solid #1d2088;
    vertical-align: middle;
    margin-right: .15rem;
    width: .22rem;
    border-radius: 0;
}
.regist-foot button {
    width: 7.1rem;
    height: .8rem;
    margin: 0 auto;
    display: block;
    background: -webkit-linear-gradient(#324fff, #1d2088);
    border: none;
    box-shadow: 0 1px 4px 0 #5887ff;
    color: #fff;
    font-size: .25rem;
    border-radius: .05rem;
}
.regist-foot ~ .content {
    bottom: 2.28rem;
}
</style>