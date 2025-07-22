import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import Drive from './Models/drive.js'
import upload from './multermiddle.js';
import cor from './corsmiddle.js';

const app = express();
const PORT= process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;


const server = http.createServer(app);

app.use(cor);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

mongoose.connect(DB_URI)
                .then(()=>console.log("DB Connection Successful"))
                .catch((err)=>console.log(err));

app.use('/uploads', express.static('uploads'));

app.post('/upload/file',upload.single("fileupl"),async (req,res)=>{
    try{
        if(req.file){
            const {parentid} = req.body;
             const pid = parentid === "null" ? null : parentid;
            const newFile = await Drive.create({
            name: req.file.originalname,
            type: "file",
            parentid: pid, 
            filePath: `/uploads/${req.file.filename}`,
            });
            return res.status(201).send(newFile);
        }
    }
    catch(err){
        console.log(err);
    }
})
app.post('/upload/folder',async (req,res)=>{
    try{
        const {name,type,parentid} = req.body;
        const folder = Drive.create({name,type,parentid:parentid || null});
        res.send(folder);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/getdata/:parentid',async (req,res)=>{
    try{
        const {parentid} = req.params;
        const pid = parentid === "null" ? null : parentid;
        console.log(parentid);
        const data = await Drive.find({parentid:pid});
        if(data){
            res.send(data);
        }
    }
    catch(err){
        console.log(err);
    }
})

server.listen(PORT,()=>console.log(`server running on port ${PORT}`));
