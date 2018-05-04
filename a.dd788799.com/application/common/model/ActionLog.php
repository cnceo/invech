<?php
namespace app\common\model;
use think\Model;
class ActionLog extends Base{

    protected $table = 'gygy_action_log';
    protected $createTime = 'created_at';
    protected $updateTime = 'update_at';
    protected $autoWriteTimestamp = 'datetime';

    CONST BUSINESS_TYPE_LOGIN = 1;
    CONST BUSINESS_TYPE_MEMBER = 2;
    CONST BUSINESS_TYPE_ADD = 3;
    CONST BUSINESS_TYPE_EDIT = 4;
    CONST BUSINESS_TYPE_DELE = 5;
    CONST BUSINESS_TYPES = [self::BUSINESS_TYPE_LOGIN=>'登录',
        self::BUSINESS_TYPE_MEMBER=>'会员',
        self::BUSINESS_TYPE_ADD=>'增加',
        self::BUSINESS_TYPE_EDIT=>'编辑',
        self::BUSINESS_TYPE_DELE=>'删除',
    ]; 
    //CONST BUSINESS_DESCS = ['登录','会员',];    

    public static function log($business,$obj,$content, string $json_extra = null){
        $adminid = session('uid');
        $admin = request()->user();
        $model = get_class($obj);
        $pk = $obj->getPk();
        $aid = $obj->$pk;
        $data = [
            'uid'  =>  $adminid,
            'username'  =>  $admin['username'],
            'business'  =>  $business,
            'model'     =>  $model,
            'aid'       =>  $aid,
            'content'   =>  $content,
            //'json_extra'=>  $json_extra,
        ];
        return self::create($data);
    }

    public static function getList(){
        $query = self::order('id desc');
        $params = request()->param();
        if($params['name']??0){
            $query->where('username','like','%'.trim($params['name']).'%');
        }
        if(isset($params['type']) && is_numeric($params['type'])){
            $query->where('business',$params['type']);
        }
        if($params['startTime']??''){
            $query->where('created_at', '>=',$params['startTime']);
        }
        if($params['endTime']??''){
            $query->where('created_at', '<=',$params['endTime']);
        }
        return $query->paginate();
    }
  

}