//Sets up the database through sequelize TODO should we have two tables (user/password and photo entry?)

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

  // Details.associate = function(models) {
  //   Details.belongsTo(models.Profile, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Details;
};
