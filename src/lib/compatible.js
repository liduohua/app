(()=>{
	//ios输入框失去焦点
	document.addEventListener('touchend',function(e){
		var tagName = e.target.tagName;
		if(document.activeElement && typeof document.activeElement.blur === 'function'){
			if(tagName && tagName.toLowerCase() !== 'input' && tagName.toLowerCase() !== 'textarea'){
				var lastActiveEle = document.activeElement;
					lastActiveEle.blur();
			}
		}
	});
	//修复ios的active伪类不生效
})();
