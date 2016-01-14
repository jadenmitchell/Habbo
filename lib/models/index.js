module.exports = function(sequelize) {
    this.sequelize = sequelize;
};

module.exports = require('./User')(this.sequelize);