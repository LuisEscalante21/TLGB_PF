const productsController = {};
import productsModel from "../models/Products.js";

// S E L E C T
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// I N S E R T
productsController.insertProducts = async (req, res) => {
  const { name, price, description, idSupplier} = req.body;
  const newProduct = new productsModel({name, price, description, idSupplier});
  await newProduct.save();
  res.json({ message: "product saved" });
};

// D E L E T E
productsController.deleteProducts = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "product deleted" });
};

// U P D A T E
productsController.updateProducts = async (req, res) => {
  const { name, price, description, idSupplier } = req.body;
  const updateProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    {name, price, description, idSupplier},
    { new: true }
  );

  if(!updateProduct){
    res.json({ message: "product not found" });
  }else {
    res.json({ message: "product updated" });
  }
  
};

export default productsController;