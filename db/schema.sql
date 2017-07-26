drop database burgers_db;
create database burgers_db;
use burgers_db;

create table burgers (
	id int auto_increment,
    burger_name varchar (30) not null,
    devoured BOOLEAN DEFAULT false,
    date timestamp,
    primary key (id)
);

select * from burgers;