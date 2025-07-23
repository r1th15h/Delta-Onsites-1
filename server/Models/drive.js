import mongoose from "mongoose";

const driveschema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  type:{
    type:String, 
    required:true,
  },
  parentid:{
    type:mongoose.Schema.Types.ObjectId,
    default:null, 
  },
  filePath:{
    type: String,
  }
},{timestamps:true});

export default mongoose.model("Drive", driveschema);
