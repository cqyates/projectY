//Sets up the database through sequelize TODO should we have two tables (user/password and photo entry?)

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    authorname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 16]
      }
    }
  });

  // Profile.associate = function(models) {
  //   Profile.hasMany(models.Details, {
  //     onDelete: "cascade"
  //   });
  // };
  return Profile;
};
