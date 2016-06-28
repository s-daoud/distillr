# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## friends
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
friend_id   | integer   | not null, foreign key (references users), indexed, unique [user_id]

## drinks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, unique
description | text      | not null
image_url   | string    | 

## checkins
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
drink_id    | integer   | not null, foreign key (references drinks), indexed
venue_id    | integer   | foreign key (references venues), indexed
rating      | integer   | not null
review      | text      | 

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
checkin_id  | integer   | not null, foreign key (references checkins), indexed
comment     | text      | not null

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
checkin_id  | integer   | not null, foreign key (references checkins), indexed, unique [user_id]

## venues
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, unique
description | text      | not null
address     | string    | not null, unique
lat         | integer   | not null
lng         | integer   | not null

## venue_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
venue_id    | integer   | not null, foreign key (references venues), indexed, unique [user_id]


