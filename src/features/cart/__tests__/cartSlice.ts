import reducer, {
  addItem,
  calculateTotals,
  ICartSlice,
  removeItem,
} from '../cartSlice';

describe('redux cart slice', () => {
  test('should add item to global state', () => {
    const previousState: ICartSlice = {
      cartItems: [],
      total: 0,
    };

    expect(
      reducer(
        previousState,
        addItem({
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
        })
      )
    ).toEqual({
      cartItems: [
        {
          added: 1485723766805,
          amount: 1,
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          itemType: 'mug',
          manufacturer: 'OHara-Group',
          name: 'Handcrafted Trees Mug',
          price: 10.99,
          slug: 'Handcrafted-Trees-Mug',
          tags: ['Trees'],
        },
      ],
      total: 0,
    });
  });

  test('should remove one amount if there is more than 1 from global state', () => {
    const previousState = {
      cartItems: [
        {
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
          amount: 2,
        },
      ],
      total: 0,
    };

    expect(reducer(previousState, removeItem(0))).toEqual({
      cartItems: [
        {
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
          amount: 1,
        },
      ],
      total: 0,
    });
  });

  test('should remove item entirely if there is only 1 amount of the item', () => {
    const previousState = {
      cartItems: [
        {
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
          amount: 1,
        },
      ],
      total: 0,
    };

    expect(reducer(previousState, removeItem(0))).toEqual({
      cartItems: [],
      total: 0,
    });
  });

  test('calculates the total amount of the cart', () => {
    const previousState = {
      cartItems: [
        {
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
          amount: 2,
        },
      ],
      total: 0,
    };

    expect(reducer(previousState, calculateTotals())).toEqual({
      cartItems: [
        {
          tags: ['Trees'],
          price: 10.99,
          name: 'Handcrafted Trees Mug',
          description:
            'enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur',
          slug: 'Handcrafted-Trees-Mug',
          added: 1485723766805,
          manufacturer: 'OHara-Group',
          itemType: 'mug',
          amount: 2
        },
      ],
      total: 21.98,
    });
  });
});
