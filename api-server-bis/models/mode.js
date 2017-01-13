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
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    opacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true
      }
    },
    temperature: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
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
