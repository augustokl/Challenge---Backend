import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const list = await Plan.findAll();

    return res.json(list);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const { id, title, duration, price } = await Plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.destroy({ where: { id: req.body.id } });

    return res.json(plan);
  }
}

export default new PlanController();
