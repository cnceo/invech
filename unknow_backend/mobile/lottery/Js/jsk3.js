var bool = auto_new = false;
var ball_odds = cl_hao = cl_dx = cl_ds = cl_zhdx = cl_zhds = cl_lh ='';
var sound_off=0;


 $(function(){
    $('#cqc_sound').bind('click',function(){//绑定声音按钮
        var e=$(this);
        if(e.attr('off')=='1'){//声音开启
            e.attr('off','0');
            e.children('img').attr('src','images/on.png');
            sound_off=0;
        }else{//关闭
            e.attr('off','1');
            e.children('img').attr('src','images/off.png');
            sound_off=1;
        }
    });
});
//限制只能输入1-9纯数字 
function digitOnly ($this) {
	var n = $($this);
	var r = /^\+?[1-9][0-9]*$/;
	if (!r.test(n.val())) {
		n.val("");
	}
}
//盘口信息
function loadinfo(){
	$.post("class/odds_6.php", function(data)
		{
			if(data.opentime>0){
				$("#open_qihao").html(data.number);
				ball_odds = data.oddslist;
				loadodds(data.oddslist);
				endtime(data.opentime);
				auto(1);
			}else{
				$(".bian_td_odds").html("-");
				$(".bian_td_inp").html("封盘");
				$("#autoinfo").html("已经封盘，请稍后进行投注！");
				//$.jBox.alert('当前彩票已经封盘，请稍后再进行下注！<br><br>广西快乐十分开盘时间为：09:00 - 21:00', '提示');
				
				alert('当前彩票已经封盘，请稍后再进行下注！\n江苏快3开盘时间为：08:30 - 22:10', '提示');
				return false;
			}
		}, "json");
}
//更新赔率
function loadodds(oddslist){
	if (oddslist == null || oddslist == "") {
			$(".bian_td_odds").html("-");
			$(".bian_td_inp").html("封盘");
			return false;
	}
	for(var i = 1; i<7; i++){
		
		if(i==1){
			for(var s = 1; s<15; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
		
		if(i==2){
			for(var s = 1; s<5; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
		
		if(i==3){
			for(var s = 1; s<7; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
		
		if(i==4){
			for(var s = 1; s<7; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
		if(i==5){
			for(var s = 1; s<16; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
		
		if(i==6){
			for(var s = 1; s<7; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
	} 
	
} 

//更新投注框
function loadinput(ball , s){
	b = "ball_"+ball+"_"+s;
	n = "<input name=\""+b+"\" id=\""+b+"\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"loadSet(this)\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"5\"/>"
	
	$("#ball_"+ball+"_t"+s).html(n);
	
}

//2015-1-2 增加自动下注
function loadSet(item){
item.className="inp1m";
$(item).attr('value',$('#autoInput').attr('value'));
}
//封盘时间
function endtime(iTime)
{
	var iMinute,iSecond;
    var sMinute="",sSecond="",sTime="";
    iMinute = parseInt((iTime/60)%60);
	if (iMinute == 0){
		sMinute = "00";
    }
    if (iMinute > 0 && iMinute < 10){
    	sMinute = "0" + iMinute;
    }
	if (iMinute >= 10){
    	sMinute = iMinute+"";
    }
    iSecond = parseInt(iTime%60);
    if (iSecond >= 0 && iSecond < 10 ){
    	sSecond = "0" + iSecond;
    }
	if (iSecond >= 10 ){
    	sSecond =iSecond+"";
    }
    sTime= sMinute +""+ sSecond;
	if(iTime==65){
            if(!sound_off){
                getSwfId('swfcontent').Pten();
            }
    } 
    //alert(sTime);
    if(iTime==0){
		$("#look").html('<embed width="0" height="0" src="js/2.swf" type="application/x-shockwave-flash" hidden="true" />');
		var xnumbers = parseInt($("#numbers").html());
		//var numinfo= xnumbers+1+'正在开奖...';
		var numinfo= '<span>正在开奖...</span>';
		$("#autoinfo").html(numinfo);
		var i=0;
		$('.kick').each(function(){
			var e=$(this).children('img');
			e.prop('src','images/open_6/x.png');
			i++;
		});
    }
	if(iTime==60){
		$(".bian_td_odds").html("-");
		$(".bian_td_inp").html("封盘");
		$("#look").html('<embed width="0" height="0" src="js/1.swf" type="application/x-shockwave-flash" hidden="true" />');
    }
	if(iTime<0){
		clearTimeout(fp);
		loadinfo();
    }else
    {
		iTime--;
		var t = 'time';
		if(iTime<60){
			t = 'times';
		}
		$("#sss").html(iTime);
		$('.colon > img').attr('src','images/'+t+'/10.png');
		$('.minute > span > img').eq(0).attr('src','images/'+t+'/'+sTime.substr(0,1)+'.png');
		$('.minute > span > img').eq(1).attr('src','images/'+t+'/'+sTime.substr(1,1)+'.png');
		$('.second > span > img').eq(0).attr('src','images/'+t+'/'+sTime.substr(2,1)+'.png');
		$('.second > span > img').eq(1).attr('src','images/'+t+'/'+sTime.substr(3,1)+'.png');
		fp = setTimeout("endtime("+iTime+")",1000);
    }
}
//更新开奖号码
function auto(ball){
	$.post("class/auto_6.php", {ball : ball}, function(data)
		{
			$("#numbers").html(data.numbers);
			var openqihao = $("#open_qihao").html();
			if(auto_new == false || openqihao - data.numbers == 1){
				var numinfo='';
				//numinfo = numinfo+'总和：<span>'+data.hms[0]+'</span><span>'+data.hms[1]+'</span><span>'+data.hms[2]+'</span><span>'+data.hms[3]+'</span>龙虎：<span>'+data.hms[4]+'</span>';
				numinfo = numinfo+'点数：<span>'+data.hms[0]+'</span><span>'+data.hms[1]+'</span><span>'+data.hms[2]+'</span>';
				$("#autoinfo").html(numinfo);
				var i=0;
				var fun=5;
				$('.kick').each(function(){
					var e=$(this).children('img');
					var nu=data.hm[i];
					setTimeout(function(){e.prop('src','images/open_6/'+nu+'.png');},fun*600);
					i++;
					fun--;
				});
				auto_new = true;
				if(openqihao - data.numbers != 1){xhm = setTimeout("auto(1)",3000);}
				else{
					if(!sound_off){
                        getSwfId('swfcontent').Pling();
                    }
				}
			}else{
				xhm = setTimeout("auto(1)",3000);
			}
			var auto_top = '<table width="100%" border="0" cellspacing="1" cellpadding="0" class="clbian"><tr class="clbian_tr_title"><td colspan="2">开奖结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="jsk3_list.php" target="_blank" style="color:#F9E101">更多>></a></td></tr><tr class="clbian_tr_title"><td>开奖期数</td><td>开奖号码</td></tr>';
			//data.hmlist.reverse();
			//alert(data.hmlist[0]);
			var $auto_top=new Array(),$i=0;
			for (var key in data.hmlist){$auto_top[$i]=[key,data.hmlist[key]];$i++;}
			//for(var i=$auto_top.length-1;i>=0;i--){
			for(var i=0; i<$auto_top.length;i++){
				//alert(key);
				auto_top = auto_top+'<tr class="clbian_tr_txt"><td class="qihao">'+$auto_top[i][0]+'</td><td class="haoma">'+$auto_top[i][1]+'</td></tr>'
			}
			auto_top = auto_top+'</table>'
			$("#auto_list").html(auto_top);
		}, "json");
}
//投注提交
function order(){
	if($islg!=1){ //没有登录
		alert("登录后才能进行此操作");
		return ;
	}
	var tt = $("input.inp1");
	var mix = 10; cou = m = 0, txt = '', c=true;
	for (var i = 1; i < 7; i++){
		if(i==1){
			for(var s = 1; s < 15; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan1(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}else if(i==2){
			
			for(var s = 1; s < 5; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan2(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
			
		}else if(i==3){
			for(var s = 1; s < 6; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan3(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}else if(i==4){
			for(var s = 1; s < 7; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan4(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}else if(i==5){
			for(var s = 1; s < 16; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan5(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}else if(i==6){
			for(var s = 1; s < 7; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan6(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}
	}
	//if (!c) {$.jBox.tip("最低下注金额："+mix+"￥");return false;}
	//if (cou <= 0) {$.jBox.tip("请输入下注金额!!!");return false;}
	if (!c) {alert("最低下注金额："+mix+"￥");return false;}
	if (!cou) {alert("请输入下注金额!!!");return false;}
	
	var t = "共 ￥"+m+" / "+cou+" 笔，确定下注吗？\n\n下注明细如下：\n\n";
	txt = t + txt;
	var ok = confirm(txt);
	if (ok)
	document.orders.submit()
	document.orders.reset()
}
//读取第几球
function did (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '点数'; break;
		case 2 : r = '双面'; break;
		case 3 : r = '三军'; break;
		case 4 : r = '围骰'; break;
		case 5 : r = '长牌'; break;
		case 6 : r = '短牌'; break;
	}
	return r;
}
//读取玩法
function wan1 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '4'; break;
		case 2 : r = '5'; break;
		case 3 : r = '6'; break;
		case 4 : r = '7'; break;
		case 5 : r = '8'; break;
		case 6 : r = '9'; break;
		case 7 : r = '10'; break;
		case 8 : r = '11'; break;
		case 9 : r = '12'; break;
		case 10 : r = '13'; break;
		case 11 : r = '14'; break;
		case 12 : r = '15'; break;
		case 13 : r = '16'; break;
		case 14 : r = '17'; break;
	}
	return r;
}
//读取玩法
function wan2 (type)
{
	var r = '';
	switch (type)
	{
	case 1 : r = '点数大'; break;
	case 2 : r = '点数小'; break;
	case 3 : r = '点数单'; break;
	case 4 : r = '点数双'; break;
	}
	return r;
}

 
//读取玩法
function wan3 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '01'; break;
		case 2 : r = '02'; break;
		case 3 : r = '03'; break;
		case 4 : r = '04'; break;
		case 5 : r = '05'; break;
		case 6 : r = '06'; break;
	}
	return r;
}

//读取玩法
function wan4 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '010101'; break;
		case 2 : r = '020202'; break;
		case 3 : r = '030303'; break;
		case 4 : r = '040404'; break;
		case 5 : r = '050505'; break;
		case 6 : r = '060606'; break;
	}
	return r;
}


//读取玩法
function wan5 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '0102'; break;
		case 2 : r = '0103'; break;
		case 3 : r = '0104'; break;
		case 4 : r = '0105'; break;
		case 5 : r = '0106'; break;
		case 6 : r = '0203'; break;
		case 7 : r = '0204'; break;
		case 8 : r = '0205'; break;
		case 9 : r = '0206'; break;
		case 10 : r = '0304'; break;
		case 11 : r = '0305'; break;
		case 12 : r = '0306'; break;
		case 13 : r = '0405'; break;
		case 14 : r = '0406'; break;
		case 15 : r = '0506'; break;
	}
	return r;
}


//读取玩法
function wan6 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '0101'; break;
		case 2 : r = '0202'; break;
		case 3 : r = '0303'; break;
		case 4 : r = '0404'; break;
		case 5 : r = '0505'; break;
		case 6 : r = '0606'; break;
	}
	return r;
}

function getSwfId(id) { //与as3交互 跨浏览器
    if (navigator.appName.indexOf("Microsoft") != -1) { 
        return window[id]; 
    } else { 
        return document[id]; 
    } 
} 
