const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes= require('./recipes');
const Recipe= require('./recipe');
const Types = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', Recipes);
router.use('/recipe', Recipe);
router.use('/types', Types);



module.exports = router;
