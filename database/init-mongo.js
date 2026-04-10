// init-mongo.js

db = db.getSiblingDB("pandadict");

db.createUser({
    user: "user",
    pwd: "abc123!$",
    roles: [
        { role: "readWrite", db: "pandadict" },
        { role: "dbAdmin", db: "pandadict" }
    ]
});
