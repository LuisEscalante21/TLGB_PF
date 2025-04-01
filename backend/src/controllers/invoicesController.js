const invoicesController = {};
import invoicesModel from "../models/Invoices.js"

//SELECT 
invoicesController.getInvoices = async(req, res) => {
    const invoices = await invoicesModel.find();
    res.json(invoices);
};

//INSERT
invoicesController.insertInvoices = async (req, res) => {
    const {idShoppingCart, paymentMethod} = req.body;
    const newInvoice = new invoicesModel({idShoppingCart, paymentMethod});
    await newInvoice.save();
    res.json({message: "invoice saved"});
}

//DELETE
invoicesController.deleteInvoices = async (req, res) => {
    await invoicesModel.findByIdAndDelete(req.params.id);
    res.json({message: "invoice deleted"});
};

//UPDATE
invoicesController.updateInvoices = async (req, res) => {
    const {idShoppingCart, paymentMethod} = req.body;
      const updateInvoice = await invoicesModel.findByIdAndUpdate(
        req.params.id,
        {idShoppingCart, paymentMethod},
        { new: true }
      );
    
      if(!updateInvoice){
        res.json({ message: "invoice not found" });
      }else {
        res.json({ message: "invoice updated" });
      }
      
}

export default invoicesController;