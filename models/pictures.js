module.exports = function(sequelize, DataTypes) {
  var Pictures = sequelize.define('Pictures', {
    filePath: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Pictures;
};
