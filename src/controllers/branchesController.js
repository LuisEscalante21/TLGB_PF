const branchesController = {};
import branchesModel from "../models/Branches.js";

// S E L E C T
branchesController.getBranches = async (req, res) => {
  const branches = await branchesModel.find();
  res.json(branches);
};

// I N S E R T
branchesController.insertBranches = async (req, res) => {
  const { Name, Direction } = req.body;
  const newBranch = new branchesModel({Name, Direction });
  await newBranch.save();
  res.json({ message: "branch saved" });
};

// D E L E T E
branchesController.deleteBranches = async (req, res) => {
  await branchesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "branch deleted" });
};

// U P D A T E
branchesController.updateBranches = async (req, res) => {
  const { Name, Direction } = req.body;
  const updateBranch = await branchesModel.findByIdAndUpdate(
    req.params.id,
    {Name, Direction },
    { new: true }
  );

  if(!updateBranch){
    res.json({ message: "branch not found" });
  }else {
    res.json({ message: "branch updated" });
  }
  
};

export default branchesController;