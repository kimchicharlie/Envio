var models = require('./models');

models.sequelize.sync({ force: false }).then(() => {
  return models.Room.sync({ force: true });
})
.then(() => {
  return models.Mode.sync({ force: true });
})
.then(() => {
  return models.Window.sync({ force: true });
})
.then(() => {
  return models.AirConditioning.sync({ force: true });
})
.then(() => {
  return models.Captor.sync({ force: true });
})
.then(() => {
  return models.Stat.sync({ force: true });
})
.then(() => {
  return models.User.sync({ force: true });
})
.then(() => {
  return models.ConnectedUser.sync({ force: true });
})
.catch((err) => {
  console.log(err);
});
