// 点击左侧返回按钮
	$('.back').click(function(){
		// location.href = 'index.html'
		// history.back()
		history.go(-1)
		// 以上三种写法都能返回
	})

	// 点击右侧首页按钮
	$('.jia').click(function(){
		location.href = 'index.html'
	})
