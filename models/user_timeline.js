'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_timeline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  user_timeline.init({
    userId: DataTypes.INTEGER,
    timelineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_timeline',
  });
  return user_timeline;
};