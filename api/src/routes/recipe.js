const router = require('express').Router();
const { Sequelize, Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

router.post("/", async function (req, res) {
    try{
        const {id,title, summary, spoonacularScore, healthScore, instructions, } = req.body;
        const receta = await Recipe.create({ 
            id:uuidv4(),
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
        })
        return res.json(receta)
    }  catch(error){
        res.status(500).send("La receta no pudo ser creada:(")
    }
})

module.exports= router;