import moment from 'moment';
import mock from 'src/utils/mock';

const marketings = [
  {
    title: 'TUTORIALS',
  },
  {
    title: 'ACADEMY',
  },
  {
    title: 'DOWNLOADS',
  },
  {
    title: 'SOCIAL MEDIA',
  },
  {
    title: 'INFORMATIVE DOSSIER',
  },
  {
    title: 'OTHERS',
  },
];

mock.onGet('/api/marketing').reply(200, { marketings });
