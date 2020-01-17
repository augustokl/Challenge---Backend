import { addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Registration from '../models/Registration';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date } = req.body;
    const startDate = parseISO(start_date);

    const { price, duration } = await Plan.findByPk(plan_id);

    const valuePlan = price * duration;
    const end_date = addMonths(startDate, duration);
    console.log(req.query.student_id);

    const registration = await Registration.create({
      student_id: req.query.student_id,
      plan_id,
      start_date,
      end_date,
      price: valuePlan,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
