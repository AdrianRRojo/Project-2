'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timeline_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.timeline_comment.belongsTo(models.timeline)
      models.timeline_comment.belongsTo(models.user)
    }
  }
  timeline_comment.init({
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    timelineId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'timeline_comment',
  });
  return timeline_comment;
};