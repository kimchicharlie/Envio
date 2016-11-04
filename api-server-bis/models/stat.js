module.exports = function (sequelize, DataTypes) {
  const Stat = sequelize.define('Stat', {
    roomId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    realLight: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    neededLight: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    realTemperature: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    neededTemperature: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
  }, {
    classMethods: {
      associate(models) {
      },
    },
  });

  return Stat;
};