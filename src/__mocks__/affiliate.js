import moment from 'moment';
import mock from 'src/utils/mock';

const affiliates = [
  {
    level: '1',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
  {
    level: '2',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
  {
    level: '3',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
  {
    level: '4',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
  {
    level: '5',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
  {
    level: '6',
    username: 'Jaime Tor',
    email: 'jaimetor@gmail.com',
    surname: 'Jaime Torres',
    country: 'Spain',
    enrollmentdate: '20/05/2021',
    license: '5',
  },
];

mock.onGet('/api/affiliate').reply(200, { affiliates });
