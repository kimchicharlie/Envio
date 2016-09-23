module.exports = function (sequelize, DataTypes) {
  const Room = sequelize.define('Room', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    organisation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    volume: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    realLight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    light: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    maxLux: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    realTemperature: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    temperature: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    artificialIntellligence: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    data: DataTypes.JSON,
    planning: DataTypes.ARRAY(DataTypes.JSON),
    m: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    off: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Room.hasMany(models.Window, { as: 'windows', foreignKey: 'roomId' });
        Room.hasMany(models.AirConditioning, { as: 'airConditionings', foreignKey: 'roomId' });
        Room.hasMany(models.Captor, { as: 'captors', foreignKey: 'roomId' });
      },
    },
  });

  return Room;
};