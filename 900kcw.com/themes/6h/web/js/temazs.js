$(window).scroll(function(){if($(this).scrollTop()>=55){$(".num_view").show()}else{$(".num_view").hide()}});$(function(){var a=new Date().getFullYear();$("#date").text(a+"年").dateTools();addDataFun(a);console.log(a)});function dateAjax(a){console.log(a+"  时间改变做请求！");addDataFun(a)}function addDataFun(a){$.ajax({type:"get",url:url.apiurl+"smallSixMobile/findSpecialNumberTrend.php",data:{year:a},dataType:"json",success:function(e){console.log(e);if(e.result.data==""){$("#c1").attr("height",1000);var c=c1.getContext("2d");c.clearRect(0,0,20000,20000);return false}var b=e.result.data.issues;var f=e.result.data.numbers;var d=e.result.data.colors;strokecanvas(f,b,d,true)}})};