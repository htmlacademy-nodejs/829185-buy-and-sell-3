"use strict";

const {DataTypes, Model} = require(`sequelize`);
class Comment extends Model {}

const define = (sequelize) => Comment.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`
});

module.exports = define;
