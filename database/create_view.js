var fs = require('fs');

const tagList = ['JS','NODE','REACT','VUE','WEBPACK','CSS',
                'JAVA','CPP','PYTHON','LINUX',
                'MYSQL','POSTGRESQL','REDIS','MONGODB',
                'ALGORITHM','DATASTRUCTURE','AI'];

var createViewSql = '';

for(tag of tagList){
    const sql = `CREATE VIEW ${tag.toLowerCase()}_articles AS SELECT  ROW_NUMBER() OVER (ORDER BY collected_articles.caid DESC),caid,title,date FROM collected_articles WHERE tag='${tag}';\n`
    createViewSql += sql;
}

fs.writeFile('./create_view.sql',createViewSql,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('写入完成')
    }
})