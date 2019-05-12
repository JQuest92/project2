module.exports = function (sequelize, DataTypes) {
  var Visit = sequelize.define("Visit", {
    restaurantName: {
      type: DataTypes.STRING,
      field: "restaurantName"
    },
    userName: {
      type: DataTypes.STRING,
      field: "userName"
    }
  },
    {
      freezeTableName: true
    });
  return Visit;
};
