module.exports = function (sequelize, DataTypes) {
  const AirConditioning = sequelize.define('AirConditioning', {
    temperatureWanted: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
      validate: {
        min: 0,
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        AirConditioning.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
      },
    },
  });

  return AirConditioning;
};