module.exports = function (sequelize, DataTypes) {
  const Stat = sequelize.define('Stat', {
    realLight: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    neededLight: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    realTemperature: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    neededTemperature: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Stat.hasOne(models.Room, { as: 'room', foreignKey: 'roomId' });
      },
    },
  });

  return Stat;
};