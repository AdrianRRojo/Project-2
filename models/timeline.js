'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timeline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.timeline.belongsTo(models.user)
      models.timeline.hasMany(models.user_timeline)
    }
  }
  timeline.init({
    post: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    header: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'timeline',
  });
  return timeline;
};