import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3000/items', (_req, res, ctx) => {
    return res(
      ctx.json([
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
        },
        {
          tags: ['City', 'Brick', 'Building'],
          price: 19.99,
          name: 'Small Building Shirt',
          description:
            'consequuntur aut cum perspiciatis harum cumque omnis nemo dolores quasi accusantium est dolores esse rerum ex dolorum earum aliquid',
          slug: 'Small-Building-Shirt',
          added: 1484314418588,
          manufacturer: 'Weissnat-Schowalter-and-Koelpin',
          itemType: 'shirt',
        },
      ])
    );
  }),
  //   rest.get(
  //     'http://localhost:3000/items?itemType=shirt&_sort=price&_order=asc',
  //     (_req, res, ctx) => {
  //       return res(
  //         ctx.json([
  //           {
  //             tags: ['City', 'Brick', 'Building'],
  //             price: 19.99,
  //             name: 'Small Building Shirt',
  //             description:
  //               'consequuntur aut cum perspiciatis harum cumque omnis nemo dolores quasi accusantium est dolores esse rerum ex dolorum earum aliquid',
  //             slug: 'Small-Building-Shirt',
  //             added: 1484314418588,
  //             manufacturer: 'Weissnat-Schowalter-and-Koelpin',
  //             itemType: 'shirt',
  //           },
  //         ])
  //       );
  //     }
  //   ),
];
