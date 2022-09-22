import Mongoose from 'mongoose';
import multer from 'multer';
import path, { dirname } from 'path';
import fs from 'fs';
import Documents from '../models/db/documents.models.js';
import jwtDecode from 'jwt-decode';

global.__basedir = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('./uploads/',(err)=>{
            cb(null, './uploads/');
        });
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const maxSize = 50 * 1000 * 1000;

const upload = multer({ 
    storage: storage,
    limits: { fileSize:maxSize},
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
    }
}).single('resumes')

export const uploadTheResumes = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwtDecode(token);
    const user = {
        _id: decodedToken.user._id,
        names: decodedToken.user.names,
        phone: decodedToken.user.phone,
        email: decodedToken.user.email,
        type: decodedToken.user.type,
    }

    upload(req,res,function(err) {
        const path = 'http://' + req.headers.host + '/' + req.file.path; 
        console.log(path);
        if(err) {
            res.status(400).json({
                message: err
            });
        }
        else {
            const documents = new Documents({
                _id: new Mongoose.Types.ObjectId(),
                user,
                userType: user.type,
                resume: path,
            });

            documents
                .save()
                .then(() => {
                    res.status(201).json({
                        message: 'Resume Uploaded!'
                    });
                }).catch(() => {
                    res.status(500).json({
                        message: 'Something went wrong, please try again!'
                    });
                })
        }
    })
}

export const downloadFile = (req, res) => {
    const fileName = req.params.name;
    const path = process.cwd() + '/uploads/';
    res.download(path + fileName, (err) => {
        if(err){
            return res.status(500).json({
                message: 'File cannot be downloaded: ' + err,
            });
        }
    });
}
