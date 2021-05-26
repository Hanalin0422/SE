// 배송지 스키마
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'}, // 유저랑 엮어놓은것.
  name : {type : String}, // 배송지 이름
  post : {type : Number, required : true}, // 우편 번호
  roadAddress : {type : String, required :true}, // 도로명 주소
  detailAddress : {type : String, required : true}, // 상세 주소
  contact : {
    type : String,
    required : true,
    match : [/^\d{3}-\d{3,4}-\d{4}$/, '잘못된 연락처입니다']
  } // 연락처
});

module.exports= mongoose.model('Destination', schema);
