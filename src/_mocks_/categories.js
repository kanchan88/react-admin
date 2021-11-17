import faker from 'faker';
import { sample } from 'lodash';
import { mockImgProduct } from '../utils/mockImages';
import PRODUCTLIST from './products';

// ----------------------------------------------------------------------

const categories = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.commerce.productDescription(),
  featureImage: mockImgProduct(1),
  featured: sample(['yes', 'no']),
  products: `1`
}));

export default categories;
