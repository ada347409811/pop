// 用于首页的信息处理，包括  用户信息处理和用户昵称显示、 留言板信息的显示

// 从本地缓存cookie中取出petname的值
		var petname = $.cookie('petname');

		// 判断有没有昵称petname  如果有显示昵称，如果没有显示“登录”
		if(petname){
			$('#user').find('span').last().text(petname);
		}else{
			// $('#user').find('span').last().text('登录');
			// end() 往上往外层找匹配的元素
			$('#user').find('span').last().text('登录').end().end().removeAttr('data-toggle').click(function(){
				location.href = 'login.html'
			})
		}

		// 提问按钮 ➕  如果昵称存在跳转到ask.html，如果不存在跳转到login.html	
		$('#ask').click(function(){
			// if(petname){
			// 	location.href = 'ask.html'
			// }else{
			// 	location.href = 'login.html'
			// }
			petname?location.href = 'ask.html':location.href = 'login.html'

		})




// 获取首页数据
$.get('/question/all',function(resData){
//	console.log(resData);
	// 拼接HTML标签和上面要显示的内容 
	var htmlStr = '';
	for(var i = 0; i < resData.length; i++){
		// 采用的是 Bootstrap 里面的多媒体对象
		var question = resData[i];
		// 这是外层
		htmlStr += '<div class="media" data-question="' + new Date(question.time).getTime() + '">'
		// 内层第一块,显示头像的地方 pull-left
		htmlStr += '<div class="media-left"><a>'
		htmlStr += '<img class="media-object" src="../uploads/' + question.petname + '.jpg" onerror="defaultHeaderImage(this)">'
		htmlStr += '</a></div>'
		// 内层第二块,显示问题用的
		htmlStr += '<div class="media-body">'
		htmlStr += '<h4 class="media-heading">' + question.petname + '</h4>'
		htmlStr += question.content
		htmlStr += '<div class="media-footing">' + formatDate(new Date(question.time)) + '&#x3000;' + formatIp(question.ip) + '</div>';
		htmlStr += '</div></div>'
		
		// 判断这个问题 是否有人回答过
		if(question.answers){
			// 有人回答过,显示回答
			for(var j = 0; j < question.answers.length; j++){
				var answer = question.answers[j];
				// 内部的外层
				htmlStr += '<div class="media media-child">'
				// 内层的第一块
				htmlStr += '<div class="media-body">'
				htmlStr += '<h4 class="media-heading">' + answer.petname + '</h4>'
				htmlStr += answer.content
				htmlStr += '<div class="media-footing">' + formatDate(new Date(answer.time)) + '&#x3000;' + formatIp(answer.ip) +'</div>';
				htmlStr += '</div>'
				// 内层第二块
				htmlStr += '<div class="media-right"><a>'
				htmlStr += '<img class="media-object" src="../uploads/' + answer.petname + '.jpg" onerror="defaultHeaderImage(this)">'
				htmlStr += '</a></div></div>'
			}	
		}
		htmlStr += '<hr>'
		
		
	}
	$('.questions').html(htmlStr);
});
// 封装一个方法,解析 date用的
function formatDate(time){
	var y = time.getFullYear();
	var M = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var m = time.getMinutes();
	M = M < 10 ? '0' + M : M;
	d = d < 10 ? '0' + d : d;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	// 返回例如 : 2017-03-23
	return y + '-' + M + '-' + d + ' ' + h + ':' + m;
}

// 封装一个方法,解析 ip 用的
function formatIp(ip){
	console.log(ip);
	if(ip.startsWith('::1')){
		return 'localhost';
	}
	else{
		return ip.substr(7);
	}
}
 

 

// 给每个问题添加点击事件
$('.questions').on('click','.media[data-question]',function(){
	if(petname){
		// 用户已经登录了
		// 把 data-question 的值存到 cookie 中
		$.cookie('question',$(this).data('question'));
		
		location.href = 'answer.html';
	}
	else{
		// 用户未登录,请先登录
		location.href = 'login.html';
	}
}) 
