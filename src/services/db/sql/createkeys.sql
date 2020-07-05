ALTER TABLE comotdb.users ADD CONSTRAINT users_FK FOREIGN KEY (role_id) REFERENCES comotdb.roles(id);
ALTER TABLE comotdb.users ADD CONSTRAINT address_FK FOREIGN KEY (address_id) REFERENCES comotdb.address(id);

ALTER TABLE comotdb.transactions ADD CONSTRAINT transaction_type_FK FOREIGN KEY (transaction_type) REFERENCES comotdb.transaction_types(id);
ALTER TABLE comotdb.transactions ADD CONSTRAINT users_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id);

        