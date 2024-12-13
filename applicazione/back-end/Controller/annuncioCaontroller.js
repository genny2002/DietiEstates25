import express from "express";
import { AnnuncioService } from "../Service/annuncioService.js";
import multer from 'multer';

export const anunncioController = express.Router();

const upload = multer();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../img');
    }
});


anunncioController.get("/", (req, res) => {
    res.send("<h1>Welcome To JWT Authentication </h1>");
});

