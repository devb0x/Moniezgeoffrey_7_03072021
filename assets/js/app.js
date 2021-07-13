import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

let recipes = []
let ingredients = []
let appareils = []
let ustensils = []

function fetchAllRecipes() {
  return fetch(`${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error' + response.status)
      }
      return response.json()
    })
    .then(data => {
      data.recipes.forEach(el => {
        recipes.push(el)
      })
    })
}

function fetchAllIngredients() {
  recipes.forEach(el => {
    el.ingredients.filter(ingredient => {
      ingredients.push(ingredient.ingredient)
    })
  })
  /**
   * remove duplicate ingredients
   * @type {*[]}
   */
  ingredients = [...new Set(ingredients)]
  console.warn(ingredients)
}

function fetchAllAppareils() {
  recipes.forEach(el => {
    appareils.push(el.appliance)
  })
  /**
   * remove duplicate appareils
   * @type {*[]}
   */
  appareils = [...new Set(appareils)]
  console.warn(appareils)
}

function fetchAllUstensils() {
  recipes.forEach(el => {
    el.ustensils.filter(ustensil => {
      ustensils.push(ustensil)
    })
  })
  /**
   * remove duplicate ustensils
   * @type {*[]}
   */
  ustensils = [...new Set(ustensils)]
  console.warn(ustensils)
}

function renderAllRecipes() {
  recipes.forEach(el => {
    new Recipe(
      el.id,
      el.name,
      el.servings,
      el.ingredients,
      el.time,
      el.description,
      el.appliance,
      el.ustensils
    ).render()
  })
}

fetchAllRecipes()
  .then(fetchAllIngredients)
  .then(fetchAllAppareils)
  .then(fetchAllUstensils)
  .then(renderAllRecipes)

