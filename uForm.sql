create database uForm

use uForm

create table tbladminUser(
	id int primary key identity(1,1),
	username nvarchar(50) not null,
	upassword nvarchar(100) not null	
	)

insert into tbladminUser(username,upassword)values('Admin','admin@123')
select * from tbladminUser

