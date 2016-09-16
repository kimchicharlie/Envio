module.exports = function (sequelize, DataTypes) {
  const ConnectedUser = sequelize.define('ConnectedUser', {
    guid: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
      	ConnectedUser.hasOne(models.User, { as: 'user', foreignKey: 'userId' });
      },
    },
  });

  return ConnectedUser;
};