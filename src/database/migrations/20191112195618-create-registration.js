module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registration', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('registration');
  },
};
