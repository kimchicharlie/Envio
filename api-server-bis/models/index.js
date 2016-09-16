var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

// SSL BUG with HEROKU
var herokuURL = "postgres://zkedseioxtgcax:IrLXZosSYStXmpb-uKykx2tZ-E@ec2-54-75-230-137.eu-west-1.compute.amazonaws.com:5432/d1ja8ig5gvtnuk";
// Working OK
var elephantURL = "postgres://fqguhbuq:fGLVbi-Fvwck_qKkuKP2xUzjO30gvmlb@horton.elephantsql.com:5432/fqguhbuq";

const db = {};

var sequelize = new Sequelize(elephantURL);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;