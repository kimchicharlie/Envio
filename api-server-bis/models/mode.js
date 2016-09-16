module.exports = function (sequelize, DataTypes) {
  const Mode = sequelize.define('Mode', {
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
    light: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    opacity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    temperature: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
      },
    },
  });

  return Mode;
};