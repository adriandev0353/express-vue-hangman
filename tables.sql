create table word_list( 
    id int not null,
    word text not null,
    word_length int not null
);

create table user_data(
    id int not null,
    username text not null,
    password text not null,
    points int not null,
    words_played text not null
);
