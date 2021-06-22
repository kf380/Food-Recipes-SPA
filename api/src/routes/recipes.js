const { Sequelize, Op }= require('sequelize');
const router = require("express").Router();
const { Recipe, Diet } = require('../db.js');
const axios = require("axios");
const { API_KEY } = process.env;

router.get("/", async function (req, res,next) {
  const createdRecetas = await Recipe.findAll({include: {model: Diet}})
  console.log("BASE DE DATOS",createdRecetas[0]);
  const apiRecipes= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
 console.log("API",apiRecipes.data.results[0]);
  try {
    const { name } = req.query;
    const rece = apiRecipes.data.results.map((x)=>{
            return {
                id: x.id,
                title: x.title,
                img: x.image,
                diets: x.diets.map((x) => x),
                puntos: x.spoonacularScore,
                plato: x.dishTypes && x.dishTypes.map((m)=> m),
                nivel:  x.healthScore,
                puntos: x.spoonacularScore,
                resumen: x.summary,
              }
          })  
          const xrecetas=createdRecetas.map((m)=>{
           return{
             id: m.id,
             title: m.title,
             summary: m.summary,
             puntos: m.spoonacularScore,
             nivel: m.healthScore,
             paso: m.steps,
             diets: m.types.map((mt)=> mt.id)
           }
          })           
 
           const joinR = xrecetas.concat(rece);
           // console.log(joinR)
      
          if(name === undefined)  return res.status(200).send(joinR)
            
          else if (!!name && name.length>0 ){
                 
              const xname= joinR.filter(x=> x.title.toLowerCase().includes(name.toLowerCase()))
    
              return res.status(200).send(xname)
              }
    
  } catch (error) {
    next(error)
  }
 });
router.get('/:idReceta', async function(req, res){
  const pk = req.params.idReceta;
  let detail;
  //CASO DE BUSCAR EN LA DB SI ES POSITIVO
  if(pk.includes("-")){

      detail = await Recipe.findOne({
          where:{
              id: pk,
              // id:{
              //     [Sequelize.Op.like]: `${pk}`
              // },
          },
          include: {
              model: Diet,
              attributes: ['name'],
              through: {
                  attributes: [],
              },
          },
      });
  }else{
      //CASO VIENE DE API
    
      const r = await axios.get(`https://api.spoonacular.com/recipes/${pk}/information?apiKey=${API_KEY}`); 
      const elem = r.data;
          
      detail= {
          title: elem.title,
          summary: elem.summary,
          spoonacularScore: elem.spoonacularScore,
          healthScore: elem.healthScore,
          instructions:elem.instructions,
          APId: elem.id,
          diets: elem.diets,
          image: elem.image,
          dishTypes: elem.dishTypes,
      };
  };
  if(detail){
      res.send(detail);
  }else{
      res.status(404).send()
  };
});


module.exports = router;