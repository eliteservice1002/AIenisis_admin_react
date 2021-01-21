import moment from 'moment';
import mock from 'src/utils/mock';

const licenses = [
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 1,
  },
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 2,
  },
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 1,
  },
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 3,
  },
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 1,
  },
  {
    date_of_purchase: '20-05-2021',
    number_of_licenses: 'Monday',
    license_cost: '0.23%',
    retirement_date: '30$',
    status: 2,
  },
];

mock.onGet('/api/license').reply(200, { licenses });
