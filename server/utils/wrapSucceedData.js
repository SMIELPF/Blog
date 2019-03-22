function wrapSucceedData(data){
    return {
        succeed:true,
        errorCode:-1,
        message:null,
        data:data
    }
}

module.exports = wrapSucceedData;