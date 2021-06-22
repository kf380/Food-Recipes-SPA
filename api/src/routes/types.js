const router = require("express").Router();
const { Diet } = require('../db.js');
const { Sequelize, Op }= require('sequelize');
const axios= require ("axios")
const { API_KEY } = process.env;


  


// var array=[]

// router.get('/', async(req,res)=>{
//   var resp=await Diet.findAll()
//   for (let i = 0; i < resp.length; i++) {
//     array.push(resp[i].name)
//   }
//       res.json(array)
// })


  router.get('/', async(req,res,next)=>{

  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
  .then(async (response)=>{
      const data=  response.data.results
      let typdiet= []
     
      for(let i=0; i<data.length; i++){
          if(data[i].diets.length > 0){
            typdiet.push(data[i].diets.map(x=> x))
          }
      }
  
      const f = typdiet[3]
      const l=  typdiet[78]
      let allTypes= f.concat(l)
      allTypes.shift()
  
      for(let i =0; i<allTypes.length; i++){
          
          await Diet.findOrCreate({
              where:{
                  name:allTypes[i]
              }
          })
      }
      await Diet.findAll().then(response=>{
          let array =[]
          for(let i=0; i<response.length; i++){
              array.push({
                  id:response[i].id,
                  name:response[i].name
              })
          }
          return res.status(200).json(array)
      })
  }).catch(err => next(err))
  });



module.exports = router;
