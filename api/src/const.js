require('dotenv').config();
const {
    API_KEY,
} = process.env;

const URL_COMPLEXSEARCH = "https://api.spoonacular.com/recipes/complexSearch";
const URL_RECIPES = function (id) {
    return `https://api.spoonacular.com/recipes/${id}/information`
};
const URL_API_KEY = `?apiKey=${API_KEY}`;

module.exports = {
    URL_COMPLEXSEARCH,
    URL_RECIPES,
    URL_API_KEY
}