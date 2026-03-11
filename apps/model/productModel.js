let products = [
  {
    id: 1,
    name: "Red Roses",
    price: 20,
    description: "Beautiful red roses for romance.",
    image: "images/prod1.gif",
  },
  {
    id: 2,
    name: "White Lilies",
    price: 15,
    description: "Elegant white lilies for any occasion.",
    image: "images/prod2.gif",
  },
  {
    id: 3,
    name: "Sunflowers",
    price: 10,
    description: "Bright sunflowers to light up the room.",
    image: "images/thumb1.gif",
  },
];

module.exports = {
  getAll: () => products,
  getById: (id) => products.find((p) => p.id == id),
  add: (name, price, description, image) => {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push({ id, name, price, description, image });
  },
  update: (id, name, price, description, image) => {
    const index = products.findIndex((p) => p.id == id);
    if (index !== -1) {
      products[index] = { id, name, price, description, image };
    }
  },
  delete: (id) => {
    products = products.filter((p) => p.id != id);
  },
};
