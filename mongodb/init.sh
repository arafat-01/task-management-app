# docker/mongodb/init.sh

#!/bin/sh

# Create a custom user with a password, role and auth mechanism. This user will
# be used by the application for MongoDB connection.
mongo \
    -u ${MONGO_INITDB_ROOT_USERNAME} \
    -p ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin ${MONGO_NAME} \
<<-EOJS
db.createUser({
    user: "${MONGO_USER}",
    pwd: "${MONGO_PASS}",
    roles: [{
        role: "readWrite",
        db: "${MONGO_NAME}"
    }],
    mechanisms: ["${MONGO_AUTH}"],
})
EOJS


mongo \
    -u ${MONGO_INITDB_ROOT_USERNAME} \
    -p ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin ${MONGO_NAME} \
<<-EOJS
use ${MONGO_NAME}
db.createCollection("tasks")
EOJS

# Migrate dump.
mongoimport --jsonArray \
    --db ${MONGO_NAME} \
    --collection tasks \
    --username ${MONGO_INITDB_ROOT_USERNAME} \
    --password ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin \
    --file /docker-entrypoint-initdb.d/init.json
    \
