var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      set: function(v) {
        var salt = bcrypt.genSaltSync(5);
        var password = bcrypt.hashSync(v, salt);
        return this.setDataValue('password', password);
      }
    },
    organisation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.ConnectedUser, { as: 'connectedUser', foreignKey: 'connectedUserId' });
      },
    },
  });

  return User;
};