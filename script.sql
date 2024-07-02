    email        varchar(255) not null,
    phone        varchar(20),
    github       varchar(255),
    linkedin     varchar(255),
    profileimage text,
    role         varchar(50),
    date         date
);

create table post
(
    pid    serial not null
        primary key,
    uid    integer not null
        constraint fk_user_post
        references "User",
    date   date    not null,
    status varchar(30)
);

create table deleteduser
(
    uid          serial
        primary key,
    firstname    varchar(100) not null,
    lastname     varchar(100) not null,
    password     varchar(255) not null,
    address      varchar(255),
    email        varchar(255) not null,
    phone        varchar(20),
    github       varchar(255),
    linkedin     varchar(255),
    profileimage text,
    role         varchar(50),
    date         date,
    deleted_date date
);