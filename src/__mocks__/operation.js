import moment from 'moment';
import mock from 'src/utils/mock';

const operations = [
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
  {
    date: '23/03/09',
    operation: 'Arbitraje',
    market: 'Kraken',
    pair: 'btc/usd',
    type: 'Venta',
    price: '10978',
    quantity: '0,4593 btw',
    amount: '56875 usd'
  },
];

mock.onGet('/api/operations').reply(200, { operations });
