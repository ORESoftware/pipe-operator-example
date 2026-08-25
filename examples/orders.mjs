import { filter, map, pipe, tap } from '../src/index.mjs';

const orders = [
  { id: 'order-1', cents: 1_500, status: 'paid' },
  { id: 'order-2', cents: 700, status: 'pending' },
  { id: 'order-3', cents: 2_000, status: 'paid' },
];

const paidOrderIds = pipe(
  orders,
  filter(({ status }) => status === 'paid'),
  map(({ id, cents }) => ({ id, dollars: cents / 100 })),
  tap((values) => {
    if (values.some(({ dollars }) => !Number.isFinite(dollars))) {
      throw new TypeError('order total is not finite');
    }
  }),
  map(({ id }) => id),
);

process.stdout.write(`${JSON.stringify(paidOrderIds)}\n`);
