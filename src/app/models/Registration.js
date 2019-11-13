import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.student, { foreignKey: 'student_id' });
    this.belongsTo(models.plan, { foreignKey: 'plan_id' });
  }
}

export default Registration;
