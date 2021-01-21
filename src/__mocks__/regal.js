import moment from 'moment';
import mock from 'src/utils/mock';

const regals = [
  {
    title: 'GDPR',
  },
  {
    title: 'LEGAL WARNING',
  },
  {
    title: 'MARKETING AND ADVERTISING GUIDES',
  },
  {
    title: 'POLITICS AND PROCEDURES',
  },
  {
    title: 'PROVACY POLICY',
  },
  {
    title: 'TERMS AND CONDITIONS',
  }
];

mock.onGet('/api/regal').reply(200, { regals });
