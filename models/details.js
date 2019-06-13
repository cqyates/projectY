module.exports = function(sequelize, DataTypes) {
  var Details = sequelize.define("Details", {
    title: DataTypes.STRING,
    photoURL: {
      type: DataTypes.TEXT
    },
    tags: DataTypes.STRING,
    zipcode: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    }
  });

  return Details;
};
