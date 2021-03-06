<?php
namespace app\common\model;
use think\Model;

class UserMessage extends Base{

    protected $table = 'gygy_user_message';
    
    protected $createTime = 'created_at';
    protected $updateTime = 'updated_at';
    protected $autoWriteTimestamp = 'datetime';
    protected $pk = 'id';

    use \traits\model\SoftDelete;
    protected $deleteTime = 'deleted_at';
    //deleted_at字段必须是可空,软删除模型的基本查询作用域默认是deleted_at IS NULL 

    public function receiver(){
        return $this->morphTo(['recv_type','recv_uid'],[
            //'member'    =>  \app\common\model\Member::class,
            //'agent'     =>  \app\common\model\Member::class,
            'user'     =>  \app\common\model\Member::class,
            'admin'     =>  \app\common\model\Admin::class,
        ]);              
    }

    public function message(){
        return $this->belongsTo('Message','message_id','id');
    }

    //protected $visible = ['id','status'];
    protected $append = ['status_text','msg_sender','msg_title','msg_text','msg_sendtime',];
    protected $hidden = ['message',];

    public function getStatusTextAttr($value,$data){
        $status = $this->getAttr('status');
        if(0==$status){
            return '未读';
        }else{
            return '已读';
        };
    }

    public function getMsgSenderAttr($value,$data){
        return $this->message->sender->getAttr('username');
    }

    public function getMsgTitleAttr($value,$data){
        return $this->message->getAttr('title');
    }
    
    public function getMsgTextAttr($value,$data){
        return $this->message->getAttr('text');
    }

    public function getMsgSendtimeAttr($value,$data){
        return $this->message->getAttr('created_at');
    }
    
    public function toArray(){
        $arr = parent::toArray();
        $visible = ['id','status'];
        //模型的$visible属性导致$hidden属性检测失效;
        foreach($arr as $key => $value){
            if(in_array($key,$this->field) && !in_array($key,$visible)){
                unset($arr[$key]);
            }
        }
        return $arr;
    }
    
}
