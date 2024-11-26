var express = require('express');
var router = express.Router();

var Sinhvien = require("../model/Sinhvien");
var upload = require("../until/uploadConfig");
const JWT = require('jsonwebtoken');
const config = require("../until/tokenConfig");


//lấy tất cả sinh viên
router.get('/all', async function(req, res) {
    try {
        const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: "Co loi xay ra"});
      }else{
        var sinhViens = await Sinhvien.find().populate("category");
        res.status(200).json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false , message : "Loi xac thuc"});
  }
        
    } catch (e) {
        res.status(500).json({status : false , message: "Co loi"});
    }
  });
  
  
  //lấy toàn bộ danh sách sinh viên thuộc CNTT
  router.get('/khoa/CNTT', async function(req, res)  {
    try {
      const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: "Co loi xay ra"});
      }else{
        const sinhViens = await Sinhvien.find({ boMon: 'CNTT' });
        res.json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false , message : "Loi xac thuc"});
  }
        
    } catch (error) {
        res.status(500).json({starus : false , message: "Co loi"});
    }
  });
  
  //lấy sv có điểm tb 6.5 - 8
  router.get('/dtb/range', async function(req, res) {
    try {
      const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: "Co loi xay ra"});
      }else{
        const sinhViens = await Sinhvien.find({ diemTrungBinh: { $gte: 6.5, $lte: 8.5 } });
        res.json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false , message : "Loi xac thuc"});
  }
        
    } catch (error) {
      res.status(500).json({starus : false , message: "Co loi"});
    }
  });
  
  //tìm sv theo MSSV
  router.get('/dtb/ranges', async function (req, res)  {
    try {
      const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: "Co loi xay ra"});
      }else{
        const sinhViens = await Sinhvien.find({ diemTrungBinh: { $gte: 6.5, $lte: 8.5 } });
        res.json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false , message : "Loi xac thuc"});
  }
        
    } catch (error) {
      res.status(500).json({starus : false , message: "Co loi"});
    }
  });
  
  
  //lấy ds sv thuộc CNTT và DTB 9
  router.get('/cntt/dtb9', async function (req, res)  {
    try {
      const token = req.header("Authorization").split(' ')[1];
  if(token){
    JWT.verify(token, config.SECRETKEY, async function (err, id){
      if(err){
        res.status(403).json({status: false, message: "Co loi xay ra"});
      }else{
        const sinhViens = await Sinhvien.find({ boMon: 'CNTT', diemTrungBinh: { $gte: 9.0 } });
        res.json(sinhViens);
      }
    });
  }else{
    res.status(401).json({status: false , message : "Loi xac thuc"});
  }
        
    } catch (error) {
      res.status(500).json({starus : false , message: "Co loi"});
    }
  });
  
  //sắp xếp tăng dần theo dtb
  router.get('/sort/dtb', async function(req, res)  {
    try {
        const sinhViens = await Sinhvien.find().sort({ diemTrungBinh: 1 });
        res.json(sinhViens);
    } catch (error) {
        res.status(500).send(error);
    }
  });
  
  //tìm sv có điểm cao nhất trong CNTT
  router.get('/sinhvien/cntt/top', async function(req, res)  {
    try {
        const sinhVien = await Sinhvien.findOne({ boMon: 'CNTT' }).sort({ diemTrungBinh: -1 });
        if (!sinhVien) return res.status(404).send('Không tìm thấy sinh viên nào.');
        res.json(sinhVien);
    } catch (error) {
        res.status(500).send(error);
    }
  });
  //upload file
  //localhost:2004/Sinhviens/upload
  router.post('/upload', [upload.single('image')],
  async (req, res, next) => {
      try {
          const { file } = req;
          if (!file) {
             return res.json({ status: 0, link : "" }); 
          } else {
              const url = `http://localhost:2004/images/${file.filename}`;
              return res.json({ status: 1, url : url });
          }
      } catch (error) {
          console.log('Upload image error: ', error);
          return res.json({status: 0, link : "" });
      }
  });

module.exports = router;