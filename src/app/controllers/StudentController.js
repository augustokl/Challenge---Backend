import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number()
        .required()
        .min(2),
      altura: Yup.number()
        .required()
        .min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExist) {
      res.status(401).json({ error: 'Student has exists' });
    }

    const { nome, email, idade, peso, altura } = await Student.create(req.body);

    return res.json({ student: { nome, email, idade, peso, altura } });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number(),
      peso: Yup.number().min(2),
      altura: Yup.number().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!studentExist) {
      res.status(401).json({ error: 'Student not exists' });
    }

    const { id, nome, email, idade, peso, altura } = await studentExist.update(
      req.body
    );

    return res.json({
      id,
      nome,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentController();
