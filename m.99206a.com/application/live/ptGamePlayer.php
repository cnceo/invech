<?php
namespace app\live;
use app\live\ptGame;
class ptGamePlayer extends ptGame {
    /**
     * 获取用户列表
     * @return mixed
     */
    public static function userList (){
        $url = self::$_BASEURL.'/player/list';
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 获取用户信息
     * @param string $username 用户名
     * @return array
     */
    public static function info($username){
        $username = strtoupper(self::$_PREFIX.$username);
        $url = self::$_BASEURL.'/player/info/playername/'.$username;
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 创建用户
     * @param unknown $username 用户名
     * @param string $password 密码
     * @return array
     */
    public static function create($username,$password = '',$extral = array()){
        $username = strtoupper(self::$_PREFIX.$username);
        $url = self::$_BASEURL."/player/create/playername/{$username}/adminname/".self::$_ADMINNAME."/kioskname/".self::$_KIOSKNAME;
        if($password != ''){
            $url .= "/password/$password";
        }
        if($extral){
            foreach ($extral as $k => $v){
                $url .= "/$k/$v";
            }
        }
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 转入
     * @param string $playername 用户名
     * @param string $amount 转账金额
     * @param string $externaltranid 订单号
     */
    public static function deposit($playername,$amount,$externaltranid){
        $playername = strtoupper(self::$_PREFIX.$playername);
        $url = self::$_BASEURL . "/player/deposit/playername/{$playername}/amount/{$amount}";
        $url .= "/adminname/".self::$_ADMINNAME."/externaltranid/{$externaltranid}/isForce/1";
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 转出
     * @param string $playername 用户名
     * @param numberic $amount 金额
     * @param string $externaltranid 转账ID
     * @param boolean $isForce 是否强制转账
     */
    public static function withdraw($playername,$amount,$externaltranid,$isForce = false){
        $playername = strtoupper(self::$_PREFIX.$playername);
        $url = self::$_BASEURL ."/player/withdraw/playername/{$playername}/amount/{$amount}/";
        $url .= "adminname/".self::$_ADMINNAME."/externaltranid/".$externaltranid."/isForce/1";
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 查询用户余额
     * @param string $username 用户名
     * @return mixed
     */
    public static function balance($username){
        $username = strtoupper(self::$_PREFIX.$username);
        $url = self::$_BASEURL.'/player/balance/playername/'.$username;
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 登出用户
     * @param string $username 用户名
     */
    public static function logout($username){
        $username = strtoupper(self::$_PREFIX.$username);
        $url = self::$_BASEURL.'/player/logout/playername/'.$username;
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 更新用户信息
     * @param string $username 用户名
     * @param array $info 需要修改的信息
     * @return array
     */
    public static function update($username,$info){
        $username = strtoupper(self::$_PREFIX.$username);
        $changable = "firstname/lastname/countrycode/city/address/phone/email/state/zip/fax/comments/";
        $changable .= "birthdate/viplevel/languagecode/sex/password/nickname/frozen/custom02/3RDPContainer";
        $changes = explode('/', $changable);
        $seted = '';
        foreach ($info as $k => $v){
            if(in_array($k, $changes)){
                $seted .= "/$k/$v";
            }
        }
        $url = self::$_BASEURL."/player/update/playername/".$username.$seted;
        $result = self::sendRequest($url);
        return $result;
    }
    
    /**
     * 获取游戏记录
     * @param datetime $startdate 开始时间
     * @param datetime $enddate 结束时间
     * @param string $playername 用户名
     * @param string $frozen
     */
    public static function playerGames($startdate,$enddate,$playername = '',$frozen = 'all'){
        $playername = strtoupper(self::$_PREFIX.$playername);
        $url = self::$_BASEURL . "/customreport/getdata/reportname/PlayerGames/startdate/{$startdate}/enddate/{$enddate}/frozen/{$frozen}/";
        if($playername){
            $url = "playername/{$playername}";
        }
        $result = self::sendRequest($url);
        return $result;
    }
    
    public static function PlayerTransactions($startdate,$enddate,$extral){
        $url = self::$_BASEURL."/customreport/getdata/reportname/PlayerTransactions/startdate/{$startdate}/enddate/{$enddate}";
        $extralArray = explode('/','timeperiod/sortby/sortorder/page/perPage');
        foreach($extral as $k => $v){
            if(in_array($k, $extralArray) && !empty($v)){
                $url .= $k.'/'.$v;
            }
        }
        $result = self::sendRequest($url);
        return $result;
    }
    
}
