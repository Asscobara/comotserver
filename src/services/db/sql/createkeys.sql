ALTER TABLE comotdb.users ADD CONSTRAINT users_FK FOREIGN KEY (role_id) REFERENCES comotdb.roles(id);
ALTER TABLE comotdb.users ADD CONSTRAINT address_FK FOREIGN KEY (address_id) REFERENCES comotdb.address(id);
