$(function() {	
	// 搜索跳转指定版块
	$('.search-btn').on('click', function(){
		var searchVal = $('#searchVal').val();
		
		switch(searchVal){
			case '基地新闻' :
				$(window).scrollTop($('#jdxw').offset().top);
				break;
			case '馆藏展示' :
				$(window).scrollTop($('#gczs').offset().top);
				break;
			case '基地概况' :
				$(window).scrollTop($('#jdgk').offset().top);
				break;
		}
	});
});


