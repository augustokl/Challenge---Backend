import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';

class HelpOrdersController {
  async index(req, res) {
    const student_id = req.params.studentId;

    const helpOrders = await HelpOrders.findAll({
      where: {
        student_id,
        answer: null,
      },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student_id = req.params.studentId;

    const { question } = req.body;

    const helpOrder = await HelpOrders.create({
      student_id,
      question,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const id = req.params.helpOrderId;

    const { answer } = req.body;

    const helpOrder = await HelpOrders.findByPk(id);

    const helpOrderAnswer = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(helpOrderAnswer);
  }
}

export default new HelpOrdersController();
