-- Create the burgers_db.
-- Switch to or use the burgers_db.
-- Create a burgers table with these fields:
-- id: an auto incrementing int that serves as the primary key.
-- burger_name: a string.
-- devoured: a boolean.
-- date: a TIMESTAMP.
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