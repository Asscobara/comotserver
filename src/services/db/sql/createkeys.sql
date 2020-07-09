ALTER TABLE comotdb.users ADD CONSTRAINT users_FK FOREIGN KEY (role_id) REFERENCES comotdb.roles(id);
ALTER TABLE comotdb.users ADD CONSTRAINT address_FK FOREIGN KEY (address_id) REFERENCES comotdb.address(id);

ALTER TABLE comotdb.transactions ADD CONSTRAINT transaction_type_FK FOREIGN KEY (transaction_type) REFERENCES comotdb.transaction_types(id);
ALTER TABLE comotdb.transactions ADD CONSTRAINT users_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id);
ALTER TABLE comotdb.transactions ADD CONSTRAINT recipts_FK FOREIGN KEY (recipt_id) REFERENCES comotdb.recipts(id);

ALTER TABLE comotdb.recipts ADD CONSTRAINT users_recipts_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id);

ALTER TABLE comotdb.sub_categories ADD CONSTRAINT category_FK FOREIGN KEY (category_id) REFERENCES comotdb.categories(id);

ALTER TABLE comotdb.suppliers ADD CONSTRAINT user_s_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id);
ALTER TABLE comotdb.suppliers ADD CONSTRAINT category_s_FK FOREIGN KEY (category_id) REFERENCES comotdb.categories(id);

ALTER TABLE comotdb.price_list ADD CONSTRAINT sub_category_id_FK FOREIGN KEY (sub_category_id) REFERENCES comotdb.sub_categories(id);
ALTER TABLE comotdb.price_list ADD CONSTRAINT supplier_id_FK FOREIGN KEY (supplier_id) REFERENCES comotdb.suppliers(id);