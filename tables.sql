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
    win_rate real not null
);

create table table_link(
    id int not null,
    word_key int not null,
    user_key int not null,
    complete_state text not null,
    points int not null
);

create table new_words(
    id int not null,
    word text not null,
    username text not null,
    status text not null
);