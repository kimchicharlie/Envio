module.exports = function (sequelize, DataTypes) {
  const Captor = sequelize.define('Captor', {
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        isInt: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Captor.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
      },
    },
  });

  return Captor;
};