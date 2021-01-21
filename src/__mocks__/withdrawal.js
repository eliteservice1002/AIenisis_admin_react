import moment from 'moment';
import mock from 'src/utils/mock';

const withdrawals = [
  {
    application_date: '20-05-2021',
    amount: '1000',
    equivalence: '0.18',
    payment_date: '20-05-2021',
  },
];

mock.onGet('/api/withdrawal').reply(200, { withdrawals });
