// 提问页面
// 点击左侧返回按钮
	$('#goBack').click(function(){
		// location.href = 'index.html'
		// history.back()
		history.go(-1)
		// 以上三种写法都能返回
	})

    // 返回首页    
	$('#home').click(function(){
		location.href = 'index.html'
	})

// 点击回答按钮处理表单事件

 $('form').submit(function(event){
			event.preventDefault();
			var data = $(this).serialize();
			// 发送post 提问 请求
			$.post('/user/answer',data,function(resData){
				$('.modal-body').text(resData.message)
				// 将模态框弹出
				// hide.bs.modal事件：模态框消失的时候触发的事件
				$('#myModal').modal('show').on('hide.bs.modal',function(){
					if(resData.code == '1'){
						location.href = 'index.html'
					}
				});

			});
		});