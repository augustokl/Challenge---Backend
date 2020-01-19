import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registration = await Registration.findAll({
      order: ['plan_id'],
      attributes: ['start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['nome'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.query.student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exits' });
    }

    const { plan_id, start_date } = req.body;
    const startDate = parseISO(start_date);

    const { price, duration } = await Plan.findByPk(plan_id);

    const valuePlan = price * duration;
    const end_date = addMonths(startDate, duration);

    const registration = await Registration.create({
      student_id: req.query.student_id,
      plan_id,
      start_date,
      end_date,
      price: valuePlan,
    });

    Queue.add(WelcomeMail.key, { student, registration });

    return res.json(registration);
  }
}

export default new RegistrationController();
