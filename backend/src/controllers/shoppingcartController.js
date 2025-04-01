import ShoppingCartModel from "../models/ShoppingCart.js"; // Add .js extension

const shoppingcartController = {};

// SELECT
shoppingcartController.getShoppingCart = async (req, res) => {
  const cart = await ShoppingCartModel.find();
  res.json(cart);
};

// INSERT
shoppingcartController.insertShoppingCart = async (req, res) => {
  const { idClient, products, total, status } = req.body;
  const newCart = new ShoppingCartModel({ idClient, products, total, status });
  await newCart.save();
  res.json({ message: "Shopping cart saved" });
};

// DELETE
shoppingcartController.deleteShoppingCart = async (req, res) => {
  await ShoppingCartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Shopping cart deleted" });
};

// UPDATE
shoppingcartController.updateShoppingCart = async (req, res) => {
  const { idClient, products, total, status } = req.body;
  const updateCart = await ShoppingCartModel.findByIdAndUpdate(
    req.params.id,
    { idClient, products, total, status },
    { new: true }
  );

  if (!updateCart) {
    res.json({ message: "Shopping cart not found" });
  } else {
    res.json({ message: "Shopping cart updated" });
  }
};

export default shoppingcartController;