'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        birthdate: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });

    return User;
};