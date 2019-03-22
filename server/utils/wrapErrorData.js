function wrapErrorData({errorCode=-1,message='数据库操作有误',data}){
    return {
        succeed:false,
        errorCode,
        message,
        data:data
    }
}

module.exports = wrapErrorData;