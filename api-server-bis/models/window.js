module.exports = function (sequelize, DataTypes) {
  const Window = sequelize.define('Window', {
    orientation: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    },
    size: {
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
    opacityWanted: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Window.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
      },
    },
  });

  return Window;
};