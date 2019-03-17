-- 枚举类型1: 文章种类
CREATE TYPE ARTICLE_TAG AS ENUM ('JS','NODE','REACT','VUE','WEBPACK','CSS',
                                'JAVA','CPP','PYTHON','LINUX',
                                'MYSQL','POSTGRESQL','REDIS','MONGODB',
                                'ALGORITHM','DATASTRUCTURE','AI');
-- 枚举类型2：用户角色
CREATE TYPE USER_ROLE AS ENUM ('ADMIN','VISITOR');

-- 表1：用户
CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    nickname  VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    role USER_ROLE DEFAULT 'VISITOR',
    email VARCHAR(50),
    unread_num INTEGER DEFAULT 0
);

-- 表2：从其他博客网站收藏的文章
CREATE TABLE collected_articles (
    caid SERIAL PRIMARY KEY,
    tag ARTICLE_TAG,
    title TEXT,
    author VARCHAR(20),
    content TEXT,
    original_link TEXT,
    date DATE DEFAULT CURRENT_DATE
);

-- 表3：原创文章
CREATE TABLE  original_articles (
    oaid SERIAL PRIMARY KEY,
    title VARCHAR(30),
    author INTEGER,
    content TEXT,
    date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (author) REFERENCES users(uid)
);

-- 表4：原创文章下的评论
CREATE TABLE comments (
    cid SERIAL PRIMARY KEY,
    oaid INTEGER,
    owner INTEGER,
    content TEXT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner) REFERENCES users(uid),
    FOREIGN KEY (oaid) REFERENCES original_articles(oaid)
);

-- 表5：对评论的回复
CREATE TABLE replys (
    rid SERIAL PRIMARY KEY,
    cid INTEGER,
    owner INTEGER,
    responder INTEGER,
    content TEXT,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner) REFERENCES users(uid),
    FOREIGN KEY (responder) REFERENCES users(uid),
    FOREIGN KEY (cid) REFERENCES comments(cid)
);


