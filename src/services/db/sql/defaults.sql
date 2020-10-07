
INSERT INTO comotdb.roles(id, name) VALUES(1, 'admin');
INSERT INTO comotdb.roles(id, name) VALUES(2, 'manager');
INSERT INTO comotdb.roles(id, name) VALUES(3, 'user');
INSERT INTO comotdb.roles(id, name) VALUES(4, 'guest');
INSERT INTO comotdb.roles(id, name) VALUES(5, 'supplier');

INSERT INTO comotdb.transaction_types(id, name) VALUES(1, 'income');
INSERT INTO comotdb.transaction_types(id, name) VALUES(2, 'expense');
INSERT INTO comotdb.transaction_types(id, name) VALUES(3, 'none');

INSERT INTO comotdb.task_status(id, name) VALUES(1, 'new');
INSERT INTO comotdb.task_status(id, name) VALUES(2, 'inProgress');
INSERT INTO comotdb.task_status(id, name) VALUES(3, 'pending');
INSERT INTO comotdb.task_status(id, name) VALUES(4, 'done');
INSERT INTO comotdb.task_status(id, name) VALUES(5, 'aborted');
INSERT INTO comotdb.task_status(id, name) VALUES(6, 'deleted');

INSERT INTO comotdb.categories(id, name, description) VALUES(1, 'אינסטלציה', 'plumbing');
INSERT INTO comotdb.categories(id, name, description) VALUES(2, 'חשמל', 'electricity');
INSERT INTO comotdb.categories(id, name, description) VALUES(3, 'גינון', 'gardening');
INSERT INTO comotdb.categories(id, name, description) VALUES(4, 'מעלית', 'elevators');
INSERT INTO comotdb.categories(id, name, description) VALUES(5, 'ניקיון', 'cleaning');

INSERT INTO comotdb.sub_categories(id, name, description, category_id) VALUES(1, 'ביקור', 'visit', 1);
INSERT INTO comotdb.sub_categories(id, name, description, category_id) VALUES(2, 'ביקור', 'visit', 2);

INSERT INTO comotdb.features(id, name, level) VALUES(1, 'whatsApp', 1);
INSERT INTO comotdb.features(id, name, level) VALUES(2, 'noAdds', 2);

INSERT INTO comotdb.alert_status(id, name) VALUES(1, 'new');
INSERT INTO comotdb.alert_status(id, name) VALUES(2, 'read');
INSERT INTO comotdb.alert_status(id, name) VALUES(3, 'deleted');

INSERT INTO comotdb.alert_code(id, code) VALUES(1, 'missing_user_payment');
INSERT INTO comotdb.alert_code(id, code) VALUES(2, 'event_about_to_start');
INSERT INTO comotdb.alert_code(id, code) VALUES(3, 'task_max_new_days');
INSERT INTO comotdb.alert_code(id, code) VALUES(4, 'task_max_pending_days');

INSERT INTO comotdb.event_status(id, name) VALUES(1, 'new');
INSERT INTO comotdb.event_status(id, name) VALUES(2, 'canceled');
INSERT INTO comotdb.event_status(id, name) VALUES(3, 'deleted');
INSERT INTO comotdb.event_status(id, name) VALUES(4, 'active');

INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('send_email_alerts', 'true');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('event_alert', 'true');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('event_alert_days', '1');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('payment_alert', 'true');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('task_max_new_days', '5');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('task_max_pending_days', '5');
INSERT INTO comotdb.configuration(ckey, cvalue) VALUES('task_alert', 'true');

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));