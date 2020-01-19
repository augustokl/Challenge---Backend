import { endOfWeek, startOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const actualDate = new Date();

    const checkin = await Checkin.findAll({
      where: {
        student_id: req.params.studentId,
        created_at: {
          [Op.between]: [startOfWeek(actualDate), endOfWeek(actualDate)],
        },
      },
    });

    return res.json(checkin);
  }

  async store(req, res) {
    const actualDate = new Date();

    const student_id = req.params.studentId;

    const checkinAvaible = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfWeek(actualDate), endOfWeek(actualDate)],
        },
      },
    });

    if (checkinAvaible.length > 4) {
      return res
        .status(401)
        .json({ error: 'You have 5 checkins, come back other week' });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
