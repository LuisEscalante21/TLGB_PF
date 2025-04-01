const suppliersController = {};
import suppliersModel from "../models/Suppliers.js";

// S E L E C T
suppliersController.getSuppliers = async (req, res) => {
  const suppliers = await suppliersModel.find();
  res.json(suppliers);
};

// I N S E R T
suppliersController.insertSuppliers = async (req, res) => {
  const { name } = req.body;
  const newSupplier = new suppliersModel({name});
  await newSupplier.save();
  res.json({ message: "supplier saved" });
};

// D E L E T E
suppliersController.deleteSuppliers = async (req, res) => {
  await suppliersModel.findByIdAndDelete(req.params.id);
  res.json({ message: "supplier deleted" });
};

// U P D A T E
suppliersController.updateSuppliers = async (req, res) => {
  const { name } = req.body;
  const updateSupplier = await suppliersModel.findByIdAndUpdate(
    req.params.id,
    {name},
    { new: true }
  );

  if(!updateSupplier){
    res.json({ message: "supplier not found" });
  }else {
    res.json({ message: "supplier updated" });
  }
  
};

export default suppliersController;