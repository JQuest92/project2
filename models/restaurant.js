module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("restaurant", {
    name: DataTypes.String,
    address: DataTypes.String,
    city: DataTypes.String,
    state: DataTypes.String,
    zip: DataTypes.Integer,
    latitude: DataTypes.Decimal,
    longituge: DataTypes.Decimal,
    phone: DataTypes.String,
    website: DataTypes.String,
    facebook: DataTypes.String
  });
  return Restaurant;
};
