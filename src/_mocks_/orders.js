import faker from 'faker';
import { sample } from 'lodash';
// ----------------------------------------------------------------------

const orders = [...Array(24)].map((_, index) => ({
  id: faker.random.number(2000, 3000),
  name: faker.name.findName(),
  date: `2021-12-16`,
  status: sample(['processing', 'delivered', 'cancelled'])
}));

export default orders;
