
const users = require('../models/userSchema');

exports.signup = async (req, res) => {
  try {
    
    
    
    const user = new users({
      username:req.body.username ,
      email:req.body.email,
      password:req.body.password
    });
    await user.save();
    res.status(200).json("Accounts created succefully");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};



