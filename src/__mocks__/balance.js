import moment from 'moment';
import mock from 'src/utils/mock';

const balances = [
  {
    date: '20-05-2021',
    performanceper: '0.23%',
    performanceusd: '30$',
    equivalence: '0,00289 btw',
  },
];

mock.onGet('/api/balance').reply(200, { balances });

const balances1 = [
  {
    date: '20-05-2021',
    concept: 'Bonus',
    amount: '100$',
    equivalence: '0,00289 btw',
  },
  {
    date: '21-05-2021',
    concept: 'Residual',
    amount: '12$',
    equivalence: '0,004839',
  },
];

mock.onGet('/api/balance1').reply(200, { balances1 });
