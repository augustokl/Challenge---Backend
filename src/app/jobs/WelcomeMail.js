import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { student, registration } = data;

    await Mail.sendMail({
      to: `${student.nome} <${student.email}>`,
      subject: `Olá ${student.nome}`,
      template: 'welcome',
      context: {
        student: student.noxme,
        startDate: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
          {
            locale: pt,
          }
        ),
        endDate: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
          {
            locale: pt,
          }
        ),
        price: registration.price,
      },
    });
  }
}

export default new WelcomeMail();
