var express = require('express');
var router = express.Router();

var userModel = require("../model/userModel");
var Sinhvien = require("../model/Sinhvien");
const JWT = require('jsonwebtoken');
const config = require("../until/tokenConfig");
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.post ("/login", async function(req, res){{
  try {
    const {username , password} = req.body;
    const checkUser = await userModel.findOne({username: username , password: password});
    console.log(checkUser);
    if (checkUser == null) {
      res.status(200).json({status:false , message: "Username va Password ko dung"});
    } else {
      const token = JWT.sign({username: username},config.SECRETKEY, {expiresIn : "30s"});
      const refreshtoken = JWT.sign({username: username},config.SECRETKEY, {expiresIn : "1h"});
      res.status(200).json({status:true ,message: "Dang nhap thanh cong", token: token , refreshtoken: refreshtoken});
    }
  } catch (e) {
    res.status(400).json({status:false , message: "Loi xay ra"});
    
  }
}}
)

module.exports = router;
