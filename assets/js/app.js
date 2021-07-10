import {resetDOM, search} from "./search.js";
import { Recipe } from "./Recipe.js";

const form = document.getElementById('form')
const search_input = document.getElementById('search')
const recipes_section = document.querySelector('.recipes')
const ingredients_btn = document.getElementById('ingredientsBtn')

let recipes = []
let ingredientsList = []

export function fetchAll() {
  return fetch('https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json')
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

function renderAll() {
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

function renderIngredientList(ingredient) {
  // console.log(ingredient)
  const list = document.createElement('div')
  list.innerHTML = `${ingredient}`
  recipes_section.appendChild(list)
}

// const names = ['John', 'Paul', 'George', 'Ringo', 'John'];
//
// let unique = [...new Set(names)];

function searchIngredients() {
  let uniqueIngredientsList
  // console.log(recipes)
  recipes.forEach(el => {
    el.ingredients.forEach(ingredient => {
      // console.log(ingredient.ingredient) // ok
      ingredientsList.push(ingredient.ingredient)
    })
  })
  uniqueIngredientsList = [...new Set(ingredientsList)];
  renderIngredientList(uniqueIngredientsList)
  // console.log(uniqueIngredientsList)
  // console.log(ingredientsList)
}

fetchAll().then(() => {
  renderAll()
})

search_input.addEventListener('input', (e) => {
  if (e.target.value.length >= 3) {
    // console.log(e.target.value)
    search(e.target.value)
  }
})

ingredients_btn.addEventListener('click', (e) => {
  console.log('searchIngredients()')
  searchIngredients()
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('form submit')
  if (search_input.value) {
    // resetDOM()
    console.log('value ok')
    search(search_input.value)
  }
  // console.log(search_input.value)
})

