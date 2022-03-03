import express from "express";
import CartItem from "../models/CartItem";
const cartRouter = express.Router();

const cart: CartItem[] = [
  {
    product: "diamond",
    price: 500,
    quantity: 5,
    id: 1,
  },
  {
    product: "sapphire",
    price: 450,
    quantity: 2,
    id: 2,
  },
  {
    product: "pearl",
    price: 100,
    quantity: 99,
    id: 3,
  },
  {
    product: "emerald",
    price: 230,
    quantity: 7,
    id: 4,
  },
  {
    product: "lapis lazuli",
    price: 80,
    quantity: 12,
    id: 5,
  },
  {
    product: "garnet",
    price: 375,
    quantity: 10,
    id: 6,
  },
  {
    product: "peridot",
    price: 300,
    quantity: 27,
    id: 7,
  },
  {
    product: "amethyst",
    price: 10,
    quantity: 34,
    id: 8,
  },
  {
    product: "rose quartz",
    price: 125,
    quantity: 17,
    id: 9,
  },
];

let nextId: number = 10;

cartRouter.get("/cart", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;
  let curatedArray: CartItem[] = cart;
  if (maxPrice) {
    curatedArray = curatedArray.filter(
      (item) => item.price <= parseInt(maxPrice as string)
    );
  }
  if (prefix) {
    curatedArray = curatedArray.filter((item) =>
      item.product.startsWith(prefix as string)
    );
  }
  if (pageSize) {
    curatedArray = curatedArray.slice(0, parseInt(pageSize as string));
  }
  res.status(200);
  res.json(curatedArray);
});

cartRouter.get("/cart/:id", (req, res) => {
  const updatedCart: CartItem = req.body;
  const id: number = parseInt(req.params.id);
  const index: number = cart.findIndex((item) => item.id === id);
  if (index === undefined) {
    res.status(404);
    res.send("ID not found");
  } else {
    cart[index] = updatedCart;
    res.json();
    res.status(200);
  }
});

cartRouter.post("/cart", (req, res) => {
  const newCart: CartItem = req.body;
  newCart.id = nextId++;
  cart.push(newCart);
  res.status(201);
  res.json(newCart);
});

cartRouter.put("/cart:id", (req, res) => {
  const refurbishedCart: CartItem = req.body;
  const id: number = parseInt(req.params.id);
  const index: number = cart.findIndex((item) => item.id === id);
  cart[index] = refurbishedCart;
  res.status(200);
  res.json(refurbishedCart);
});

cartRouter.delete("/cart:id", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index: number = cart.findIndex((item) => item.id === id);
  cart.splice(index, 1);
  res.status(204);
});
export default cartRouter;
