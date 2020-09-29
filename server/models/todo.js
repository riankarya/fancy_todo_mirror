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
      // define association here
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
      type: DataTypes.DATE,
      validate: {
        customValidator(value) {
          if (value === '') {
            throw new Error('dueDate harus diisi')
          } else if (new Date() > new Date(value)) {
            throw new Error('tanggal tidak boleh dari masa lalu')
          }
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