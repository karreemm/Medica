create table "User"
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
    gender       varchar(10),
    bdate        date,
    insta        varchar(255),
    facebook     varchar(255),
    twitter      varchar(255)
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
    deleted_date date,
    gender       varchar(10),
    bdate        date,
    insta        varchar(255),
    facebook     varchar(255),
    twitter      varchar(255)
);

create table appointment
(
    apid   serial
        constraint appointment_pk
            primary key,
    did    integer
        constraint appointment_user_uid_fk
            references "User"
            on delete cascade,
    pid    integer not null
        constraint fk
            references "User"
            on delete cascade,
    apdate date,
    accept boolean
);

create table surgery
(
    sid      serial
        constraint sid
            primary key,
    did      integer
        constraint surgery_user_uid_fk
            references "User"
            on delete cascade,
    pid      integer
        constraint surgery_user_uid_fk_2
            references "User"
            on delete cascade,
    name     varchar(255),
    sdate    date,
    cost     integer,
    op_room  integer,
    duration time
);

create table sugery_nurses
(
    sid integer not null
        constraint sugerynurses_surgery_sid_fk
            references surgery
            on delete cascade,
    nid integer not null
        constraint sugerynurses_user_uid_fk
            references "User"
            on delete cascade,
    constraint sugery_nurses_pk
        primary key (nid, sid)
);

create table activity
(
    ac_id  serial
        constraint activity_pk
            primary key,
    uid    integer
        constraint activity_user_uid_fk
            references "User"
            on delete cascade,
    action text,
    date   date,
    toid   integer
        constraint activity_user_uid_fk_2
            references "User"
            on delete cascade
);

create table phistory
(
    patient_id    integer not null
        constraint phistory_pk
            primary key
        constraint phistory_user_uid_fk
            references "User"
            on delete cascade,
    weight        real,
    height        real,
    smoking       boolean,
    hospital_stay integer
);

create table disease
(
    patient_id integer not null
        constraint disease_pk
            primary key
        constraint disease_phistory_patient_id_fk
            references phistory
            on delete cascade,
    disease    varchar(255)
);

create table scan
(
    scan_id     serial
        constraint scan_pk
            primary key,
    doc_id      integer
        constraint scan_user_uid_fk
            references "User"
            on delete cascade,
    p_id        integer
        constraint scan_user_uid_fk_2
            references "User"
            on delete cascade,
    description text,
    image       text,
    accept      boolean,
    response    text
);


