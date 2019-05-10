// module.exports = function (DataTypes, DataTypes) {
//   var Restaurant = DataTypes.define("restaurant", {
//     name: DataTypes.String,
//     address: DataTypes.String,
//     city: DataTypes.String,
//     state: DataTypes.String,
//     zip: DataTypes.Integer,
//     latitude: DataTypes.Decimal,
//     longituge: DataTypes.Decimal,
//     phone: DataTypes.String,
//     website: DataTypes.String,
//     facebook: DataTypes.String
//   });
//   return Restaurant;
// };

module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      field: "name"
    },
    address: {
      type: DataTypes.STRING,
      field: "address"
    },
    city: {
      type: DataTypes.STRING,
      field: "city"
    },
    state: {
      type: DataTypes.STRING,
      field: "state"
    },
    zip: {
      type: DataTypes.INTEGER,
      field: "zip"
    },
    latitude: {
      type: DataTypes.DECIMAL,
      field: "latitude"
    },
    longitude: {
      type: DataTypes.DECIMAL,
      field: "longitude"
    },
    phone: {
      type: DataTypes.STRING,
      field: "phone"
    },
    website: {
      type: DataTypes.STRING,
      field: "website"
    },
    facebook: {
      type: DataTypes.STRING,
      field: "facebook"
    }
  });
  return Restaurant;
};
