require('./data/server')();
const mbtaDao = require('./data/daos/mbtaSystem.dao.server');

mbtaDao.truncateDatabase().then(()=> console.log("documents dropped"))
    .then(() =>fetchData())
    .then(() => populateDatabase().then(() => addRelationships())
        .then(() => console.log("Created stations & person")));


