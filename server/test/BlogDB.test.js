var BlogDB = require('../BlogDB');
var db = new BlogDB();

describe('测试登录验证功能',()=>{
    test('根据用户名查找一个不存在的用户',()=>{
        expect.assertions(1); // 确保至少有一个断言被调用，否则测试失败
        return db.getUserInfoByNickname('闰南').then(data=>{
            expect(data).toBe(null);
        })
    })
})