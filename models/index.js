
const { Sequelize } =require("sequelize");

const sequelize = new Sequelize('moviearchive','root','1234',{
    host: 'localhost',
    dialect: 'mysql',

    pool:{
        max:5,
        min:0,
        idle:1000,
        acquire:30000,
    }
})

sequelize.authenticate()
.then(() => {
    console.log('connected')
})
.catch((err) => {
    console.log('error', err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.otp = require("./otp.model")(sequelize);
db.user = require("./user.model")(sequelize);
db.movie = require("./movie.model")(sequelize);
db.library = require('./library.model')(sequelize);
db.comment = require('./comment.model')(sequelize);

db.sequelize
    .sync({force: false,alter: false })
    .then(()=> console.log("db sync"));

module.exports = db;