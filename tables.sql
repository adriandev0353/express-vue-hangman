create table word_list( 
    id serial not null primary key,
    word text not null,
    word_length int not null
);

create table user_data(
    id serial not null primary key,
    username text not null,
    password text not null,
    points int not null,
    win_rate real not null,
    friends text
);

create table table_link(
    id serial not null primary key,
    word_key int not null,
    user_key int not null,
    complete_state text not null,
    points int not null
);

create table new_words(
    id serial not null primary key,
    word text not null,
    username text not null,
    status text not null
);

create table friend_link(
    id serial not null primary key,
    requester text not null,
    receiver text not null,
    status text not null
);