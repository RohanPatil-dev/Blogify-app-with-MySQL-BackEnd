create database blogs;

use blogs;

create table user(
 id int auto_increment primary key,
 username varchar(100) not null,
 email varchar(100) unique not null,
 password int(8) not null,
 role Enum("user","blogger") default "user" not null
);

select * from user;

select email,password,role from user where email = "Rohitpatil7119999@gmail.com" and password = 12345678;


create table blog(
 id int auto_increment primary key,
 blogger int not null,
 title varchar(100) unique not null,
 description text not null
);

select * from blog;

alter table blog add column comments JSON;

UPDATE blog
SET comments = JSON_ARRAY_APPEND(comments, '$', 'this is a best site')
WHERE id = 1;

INSERT INTO blog (blogger, title, description, comments)
VALUES (1, 'Blog Title', 'Blog Description', JSON_ARRAY('Initial comment'));

create table comment(
 id int auto_increment primary key,
 blogger_id int not null,
 user_id int not null,
 comments text not null
)

select * from comment;

desc comment;
