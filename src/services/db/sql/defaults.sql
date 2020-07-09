
INSERT INTO comotdb.roles(id, name) VALUES(1, 'admin');
INSERT INTO comotdb.roles(id, name) VALUES(2, 'manager');
INSERT INTO comotdb.roles(id, name) VALUES(3, 'user');
INSERT INTO comotdb.roles(id, name) VALUES(4, 'guest');
INSERT INTO comotdb.roles(id, name) VALUES(5, 'supplier');

INSERT INTO comotdb.transaction_types(id, name) VALUES(1, 'income');
INSERT INTO comotdb.transaction_types(id, name) VALUES(2, 'expense');
INSERT INTO comotdb.transaction_types(id, name) VALUES(3, 'none');

INSERT INTO comotdb.categories(id, name, description) VALUES(1, 'אינסטלציה', 'plumbing');
INSERT INTO comotdb.categories(id, name, description) VALUES(2, 'חשמל', 'electricity');
INSERT INTO comotdb.categories(id, name, description) VALUES(3, 'גינון', 'gardening');
INSERT INTO comotdb.categories(id, name, description) VALUES(4, 'מעלית', 'elevators');
INSERT INTO comotdb.categories(id, name, description) VALUES(5, 'ניקיון', 'cleaning');

INSERT INTO comotdb.sub_categories(id, name, description, category_id) VALUES(1, 'ביקור', 'visit', 1);
INSERT INTO comotdb.sub_categories(id, name, description, category_id) VALUES(2, 'ביקור', 'visit', 2);