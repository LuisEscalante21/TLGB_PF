const stockController = {};
import stockModel from "../models/Stock.js";

// S E L E C T
stockController.getStock = async (req, res) => {
  const stock = await stockModel.find();
  res.json(stock);
};

// I N S E R T
stockController.insertStock = async (req, res) => {
  const { idBranch, idProduct, stock} = req.body;
  const newStock = new stockModel({idBranch, idProduct, stock});
  await newStock.save();
  res.json({ message: "stock saved" });
};

// D E L E T E
stockController.deleteStock = async (req, res) => {
  await stockModel.findByIdAndDelete(req.params.id);
  res.json({ message: "stock deleted" });
};

// U P D A T E
stockController.updateStock = async (req, res) => {
  const { idBranch, idProduct, stock} = req.body;
  const updateStock = await stockModel.findByIdAndUpdate(
    req.params.id,
    {idBranch, idProduct, stock},
    { new: true }
  );

  if(!updateStock){
    res.json({ message: "stock not found" });
  }else {
    res.json({ message: "stock updated" });
  }
  
};

export default stockController;