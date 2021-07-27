import {resetDOM, search} from "./search.js"
import { Recipe } from "./Recipe.js"

import { ustensilsList } from "./search.js"
import {UstensilsList} from "./UstensilsList.js"

const form = document.getElementById('form')
const search_input = document.getElementById('search')
const filters_div = document.querySelector('.filters-list')
const recipes_section = document.querySelector('.recipes')
const ingredients_btn = document.getElementById('ingredientsBtn')
const ustensils_btn = document.getElementById('ustensilsBtn')


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
  const list = document.createElement('div')
  list.innerHTML = `${ingredient}`
  recipes_section.appendChild(list)
}

function searchIngredients() {
  let uniqueIngredientsList
  recipes.forEach(el => {
    el.ingredients.forEach(ingredient => {
      ingredientsList.push(ingredient.ingredient)
    })
  })
  uniqueIngredientsList = [...new Set(ingredientsList)];
  renderIngredientList(uniqueIngredientsList)
}

function addFilter(search) {
  /**
   * render the filter
   * @type {HTMLSpanElement}
   */
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', 'btn_blue')
  filter_span.innerHTML = `${search} <i class="far fa-times-circle"></i>`
  filters_div.appendChild(filter_span)
  form.append(filters_div)
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

// ustensils_btn.addEventListener('click', () => {
//   console.log('ustensilsList')
//   // ustensilsList(ustensils)
//   UstensilsList.render()
// })

form.addEventListener('submit', (e) => {
  e.preventDefault()

  console.log('form submit')
  if (search_input.value) {
    addFilter(search_input.value)
    console.log('value ok')
  }
  form.reset()
})



