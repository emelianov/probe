create table lpu(
 id	serial primary key,
 name varchar(64)
);
create table region(
 id	serial primary key,
 name varchar(64)
);

create table doctor(
 id	serial primary key,
 name varchar(64)
);

create table child(
 id	serial primary key,
 lname	varchar(32) not null,
 fname	varchar(32) not null,
 mname	varchar(32) not null default '',
 birth	date not null,
 region_id integer references region(id),
 city varcher(64) not null,
 street	varchar(512) not null,
 house	varcher(16) not null,
 flat	varchr(8) default "",
 paddr	integer default 1,
 pcity varcher(64) default "",
 pstreet varchar(512) default "",
 phouse	varcher(16) default "",
 pflat	varchr(8) default "",
 sex	integer default 0,
 nn	integer default 1,
 doctor_id integer references doctor(id),
 lpu_id integer references lpu(id),
 phone	varchar(16),
 anamnez varchar(64),
 gweeks integer,
 gdays integer,
 weight	integer,
 note	varchar(512)
);

create table probe(
 id	serial primary key,
 child_id integer references child(id),
 sex integer default 0,
 blank	varchar(16),
 set_nr	integer not null,
 probe_nr integer not null,
 tdate	date not null,
 tdoctor varcher(128),
 adate	date not null,
 p1	real,
 p2	real,
 p3	real,
 p4	real,
 p5	real
);

grant all on child to mx;
grant all on region to mx;
grant all on doctor to mx;
grant all on probe to mx;

create table varprobe(
 id	serial primary key,
 blank	char(16),
 nr	integer,
 child_id integer references child(id)
);