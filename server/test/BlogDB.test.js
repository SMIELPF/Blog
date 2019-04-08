var BlogDB = require('../BlogDB');
var db = new BlogDB();

describe('测试函数 getUserInfoByNickname ',()=>{
    test('根据用户名查找一个不存在的用户',()=>{
        expect.assertions(1); // 确保至少有一个断言被调用，否则测试失败
        return db.getUserInfoByNickname('闰南').then(data=>{
            expect(data).toBe(null);
        })
    });
    test('根据用户名查找一个存在的用户',()=>{
        expect.assertions(1); // 确保至少有一个断言被调用，否则测试失败
        const expectedData = { 
            uid: 1,
            nickname: '润楠',
            password: 'smielpf1204.',
            role: 'ADMIN',
            email: '1608272694@qq.com' 
        };
        return db.getUserInfoByNickname('润楠').then(data=>{
            expect(JSON.stringify(data)).toBe(JSON.stringify(expectedData));
        })
    })
})