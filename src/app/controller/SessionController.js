import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not exists' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password incorret' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'd83bc5f165445c21ccd7d74990d4ab76', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
