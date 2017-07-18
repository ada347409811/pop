// 用于注册用户信息
// 点击左侧返回按钮
	$('#goBack').click(function(){
		// location.href = 'index.html'
		// history.back()
		history.go(-1)
		// 以上三种写法都能返回
	})

	// 点击右侧注册按钮
	$('#home').click(function(){
		location.href = 'index.html'
	})

	