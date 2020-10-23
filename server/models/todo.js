'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ToDo.belongsTo(models.User)
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value === '') {
            throw new Error('title harus diisi')
          }
        }
      }
    },
    dueDate: { 
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: {
          args: true,
          msg: "due_date is required!"
        },
        notEmpty: {
          arg: true,
          msg: "due_date is required!"
        },
        isAfter: {
          args: `${new Date(new Date().setDate(new Date().getDate()-1))}`,
          msg: "due_date can't be a date that has passed!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value === '') {
            throw new Error('description harus diisi')
          }
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value === '') {
            throw new Error('status harus diisi')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};