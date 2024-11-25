const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const sinhvienSchema = new mongoose.Schema({
    id: { type: ObjectId },
    MSSV: { type: String, required: true, unique: true },
    hoTen: { type: String, required: true },
    diemTrungBinh: { type: String, required: true },
    boMon: { type: String, required: true },
    tuoi: { type: String, required: true },
    category: {type:ObjectId , ref:"category"}
});


module.exports = mongoose.models.sinhvien ||  mongoose.model('sinhvien', sinhvienSchema);;
