var fs = require('fs');

const tagList = ['JS','NODE','REACT','VUE','WEBPACK','CSS',
                'JAVA','CPP','PYTHON','LINUX',
                'MYSQL','POSTGRESQL','REDIS','MONGODB',
                'ALGORITHM','DATASTRUCTURE','AI'];

var initDataSql = '';

for(tag of tagList){
    const sql = `INSERT INTO collected_articles(tag,title,author,content,original_link) VALUES('${tag}','test','author','test','/#');\n`
    initDataSql += sql;
}

fs.writeFile('./init_data.sql',initDataSql,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('写入完成')
    }
})