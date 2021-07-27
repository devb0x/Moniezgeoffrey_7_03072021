import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_form = document.getElementById('searchForm')
const search_input = document.getElementById('searchFormInput')
const ingredients_btn = document.getElementById('ingredientsBtn')
const ingredients_list = document.getElementById('ingredientsDropDown')
const ingredients_div = document.querySelector('.ingredients')
const appliance_btn = document.getElementById('applianceBtn')
const appliance_list = document.getElementById('appareilsDropDown')
const ustensils_btn = document.getElementById('ustensilsBtn')
const ustensils_list = document.getElementById('ustensilsDropDown')
const filters_div = document.querySelector('.filters-list')

let recipes = []
let ingredients = []
let appliance = []
let ustensils = []

let filteredRecipes = []
let filteredIngredients = []
let filteredAppareils = []
let filteredUstensils = []

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
    const temp = el.ingredients.filter(ingredient => {
      ingredients.push(ingredient.ingredient.toLowerCase())
      // return ingredient.ingredient.startsWith('Limon')
    })
  })
  /**
   * remove duplicate ingredients
   * @type {*[]}
   */
  ingredients = [...new Set(ingredients)]
  console.warn(ingredients)

  filteredIngredients = ingredients
}

function fetchAllAppareils() {
  recipes.forEach(el => {
    appliance.push(el.appliance.toLowerCase())
  })
  /**
   * remove duplicate appareils
   * @type {*[]}
   */
  appliance = [...new Set(appliance)]
  console.warn(appliance)

  filteredAppareils = appliance
}

function fetchAllUstensils() {
  recipes.forEach(el => {
    el.ustensils.filter(ustensil => {
      ustensils.push(ustensil.toLowerCase())
    })
  })
  /**
   * remove duplicate ustensils
   * @type {*[]}
   */
  ustensils = [...new Set(ustensils)]
  console.warn(ustensils)

  filteredUstensils = ustensils
}

function filterData(filterName) {
  filterName.toLowerCase()

  /**
   * name filter
   * @type {*[]}
   */
  // filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().match(`${filterName}`))
  filteredRecipes.push(recipes.filter((recipe) => recipe.name.toLowerCase().match(`${filterName}`)))
  console.log(filteredRecipes)

  /**
   * appareils filter
   * @type {*[]}
   */
  // filteredAppareils = appliance.filter((appareil) => appareil.match(`${filterName}`))
  filteredAppareils.push(appliance.filter((appareil) => appareil.match(`${filterName}`)))
  console.log(filteredAppareils)

  /**
   * ustensils filter
   * @type {*[]}
   */
  // filteredUstensils = ustensils.filter((ustensils) => ustensils.match(`${filterName}`))
  filteredUstensils.push(ustensils.filter((ustensils) => ustensils.match(`${filterName}`)))
  console.log(filteredUstensils)

  /**
   * ingredients filter
   * @type {*[]}
   */
  // filteredIngredients = ingredients.filter((ingredients) => ingredients.match(`${filterName}`))
  filteredIngredients.push(ingredients.filter((ingredients) => ingredients.match(`${filterName}`)))
  console.log(filteredIngredients)

  filteredRecipes.push(filteredIngredients)
  filteredRecipes.push(filteredUstensils)
  filteredRecipes.push(filteredAppareils)
  console.log(filteredRecipes)

  renderFilteredRecipes()
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

function renderFilteredRecipes() {
  console.log(filteredRecipes)
  filteredRecipes.forEach(el => {
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

function renderFilter(filter) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', 'btn_blue')
  filter_span.innerHTML = `${filter} <i class="far fa-times-circle"></i>`
  filters_div.appendChild(filter_span)
  search_form.append(filters_div)

  filterData(filter)
}

function renderIngredientsList(ingredients) {
  ingredients_list.innerHTML = `
    <div id="ingredientsDropDown" class="dropdown-content bg_blue">

      <label for="ingredientSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="ingredientSearchInput" placeholder="Rechercher un ingrédient">
        <i class="fas fa-chevron-down dropdown-content__arrow test"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list"></ul>
      </div>
        
    </div>
  `
  ingredients.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.filters-results-list').appendChild(li)
  })
  // console.log(ingredients) // ok

  document.querySelector('.dropdown-content__arrow').addEventListener('click', (e) => {
    console.log('clic ')
    ingredients_btn.classList.toggle('hidden')
    document.getElementById('ingredientsDropDown').classList.toggle('hidden')
  })

}


search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (search_input.value) {
    renderFilter(search_input.value)
  }
  search_form.reset()
})




ingredients_btn.addEventListener('click', (e) => {
  console.log('ingredients clic')
  ingredients_btn.classList.add('hidden')
  ingredients_list.classList.toggle('hidden')
  renderIngredientsList(filteredIngredients)
})

appliance_btn.addEventListener('click', (e) => {
  console.log('appareils clic')
  appliance_list.classList.toggle('hidden')

})

ustensils_btn.addEventListener('click', (e) => {
  console.log('ustensiles clic')
  ustensils_list.classList.toggle('hidden')
})

fetchAllRecipes()
  .then(fetchAllIngredients)
  .then(fetchAllAppareils)
  .then(fetchAllUstensils)
  .then(renderAllRecipes)
