create table sm.security (
	security_id serial primary key,
	symbol VARCHAR not NULL,
	type smallint not null,
	description VARCHAR,
	date_modified timestamp not null default now(),
	date_created timestamp not null default now()
)

create table sm.exchange (
	exchange_id serial primary key,
	exchange_name VARCHAR not NULL,
	date_modified timestamp not null default now(),
	date_created timestamp not null default now()
)

create table sm.listing (
	listing_id serial primary key,
	security_id integer references sm.security (security_id) not null,
	exchange_id integer references sm.exchange (exchange_id) not null,
	exchange_security_id varchar,
	exchange_security_symbol varchar,
	date_modified timestamp not null default now(),
	date_created timestamp not null default now()
)
