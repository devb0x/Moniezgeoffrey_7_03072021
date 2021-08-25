import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_form = document.getElementById('searchForm')
const search_input = document.getElementById('searchFormInput')

const filters_div = document.querySelector('.filters-list')
// const filterItem_i = document.querySelectorAll('.fa-times-circle')

const ingredientsFilter_btn = document.getElementById('ingredientsBtn')
const ingredientsFilter_dropdown = document.getElementById('ingredientsDropDown')
const ingredientsFilterSearch_input = document.getElementById('ingredientsSearchInput')
const ingredientsFilterSearch_arrow = document.querySelector('.ingredients-arrow')
const ingredientsList_ul = document.querySelector('.ingredients-list')

const appliancesFilter_btn = document.getElementById('appliancesBtn')
const appliancesFilter_dropdown = document.getElementById('appliancesDropDown')
const appliancesFilterSearch_input = document.getElementById('appliancesSearchInput')
const appliancesFilterSearch_arrow = document.querySelector('.appliances-arrow')
const appliancesList_ul = document.querySelector('.appliances-list')

const ustensilsFilter_btn = document.getElementById('ustensilsBtn')
const ustensilsFilter_dropdown = document.getElementById('ustensilsDropDown')
const ustensilsFilterSearch_input = document.getElementById('ustensilsSearchInput')
const ustensilsFilterSearch_arrow = document.querySelector('.ustensils-arrow')
const ustensilsList_ul = document.querySelector('.ustensils-list')



let recipesList = []
let ingredientsList = []
let appliancesList = []
let ustensilsList =[]
let filterList = []


/**
 * recipesList[]
 * fetch & push json data
 * @returns {Promise<any>}
 */
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
        recipesList.push(el)
      })
    })
}

/**
 * render all data in recipesList[]
 */
function renderRecipes() {
  recipesList.forEach(el => {
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

/**
 * render function used when the user type or submit the form
 * @param searchResult
 */
function renderResult(searchResult) {
  searchResult.forEach(el => {
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

/**
 * target all the .recipe and
 * remove them from the .recipes section
 */
function resetRenderRecipes() {
  const recipes = document.querySelectorAll('.recipe')

  if (recipes) {
    recipes.forEach(el => {
      el.remove()
    })
  }
}

/**
 * function filtering recipes from name, description, or ingredients
 * @param recipesList
 * @param value
 * @returns {*}
 */
function search(recipesList, value) {
  return recipesList.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(value.toLowerCase()) ||
      recipe.description.toLowerCase().includes(value.toLowerCase()) ||
      recipe.ingredients.some((ingredientObj) =>
        ingredientObj.ingredient.toLowerCase().includes(value.toLowerCase())
      )
    );
  });
}

/**
 * ingredientsList[]
 * push data from reipesList
 */
function generateIngredientsList() {
  recipesList.filter(recipes => recipes.ingredients.forEach(el => {
    ingredientsList.push(el.ingredient.toLowerCase())
  }))
  ingredientsList = [...new Set(ingredientsList)]
}

/**
 * appliancesList[]
 * push data from reipesList
 */
function generateAppliancesList() {
  recipesList.filter(recipe =>
    appliancesList.push(recipe.appliance.toLowerCase())
  )
  appliancesList = [...new Set(appliancesList)]
}

/**
 * ustensilsList[]
 * push data from reipesList
 */
function generateUstensilsList() {
  recipesList.filter(recipes => recipes.ustensils.forEach(el => {
    ustensilsList.push(el.toLowerCase())
  }))
  ustensilsList = [...new Set(ustensilsList)]
}

/**
 * add a filter when the user select one in filter list
 * @param filter
 */
function addToFilterList(filter) {
  filterList.push(filter)
}

function renderFilter(filter, btnClass) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', btnClass)
  filter_span.innerHTML = `${filter.value} <i class="far fa-times-circle filter-test"></i>`
  filters_div.append(filter_span)
}

/**
 * ingredientsList[]
 */
function renderIngredientsList() {
  ingredientsList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    /**
     * add filter & render it
     * @event clic
     */
    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ingredient', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ingredient', value: e.target.innerText.toLowerCase()}, 'btn_blue')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    ingredientsList_ul.appendChild(li)
  })
}

/**
 * appliancesList[]
 */
function renderAppliancesList() {
  appliancesList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'appliance', value: e.target.innerText.toLowerCase()}, 'btn_green')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    appliancesList_ul.appendChild(li)
  })
}

/**
 * ustensilsList[]
 */
function renderUstensilsList() {
  ustensilsList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ustensil', value: e.target.innerText.toLowerCase()}, 'btn_red')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    ustensilsList_ul.appendChild(li)
  })
}

function renderIngredientsListFilter(ingredientsSearchResult) {
  ingredientsSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ingredient', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ingredient', value: e.target.innerText.toLowerCase()}, 'btn_blue')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    ingredientsList_ul.appendChild(li)
  })
}

function renderAppliancesListFiltered(appliancesSearchResult) {
  appliancesSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'appliance', value: e.target.innerText.toLowerCase()}, 'btn_green')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    appliancesList_ul.appendChild(li)
  })
}

function renderUstensilsListFiltered(ustensilsSearchResult) {
  ustensilsSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ustensil', value: e.target.innerText.toLowerCase()}, 'btn_red')
      filterRecipes(recipesList, e.target.innerText.toLowerCase())
    })

    ustensilsList_ul.appendChild(li)
  })
}

/**
 * filter recip
 * @param recipeList
 * @param value
 */
function filterRecipes(recipeList, value) {
  let newResult = recipeList

  filterList.forEach(filterItem => {
    switch (filterItem.category) {
      case ('ingredient'):
        newResult = newResult.filter(recipe => {
          return recipe.ingredients.some(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(filterItem.value)) {
              return recipe
            }
          })
        })
        break
      case ('appliance'):
        newResult = newResult.filter(recipe => {
          return recipe.appliance.toLowerCase().includes(filterItem.value);
        })
        break
      case ('ustensil'):
        newResult = newResult.filter(recipe => {
          return recipe.ustensils.some(ustensil => {
            if (ustensil.toLowerCase().includes(filterItem.value)) {
              return recipe
            }
          })
        })
    }
  })

  resetRenderRecipes()
  renderResult(newResult)
  addEventFilter()
}

/**
 * @event click
 */
function addEventFilter() {
  const filterItem_i = document.querySelectorAll('.fa-times-circle')

  if (filterItem_i) {
    filterItem_i.forEach(el => el.addEventListener('click', (e) => {
      let filterValue = e.target.parentNode.innerText.toLowerCase()
      e.target.parentNode.remove()
      filterList = filterList.filter(item => {
        return item.value !== filterValue
      })
      resetRenderRecipes()
      filterRecipes(recipesList)
    }))
  }
}

/**
 * Main research
 * @event input
 */
search_form.addEventListener('input', (e) => {
  e.preventDefault()

  /**
   * the research start at 3 character
   */
  if (search_input.value && search_input.value.length > 2) {
    let searchResult = search(recipesList, search_input.value)
    resetRenderRecipes()
    renderResult(searchResult)
  }
})

/**
 * Main research
 * @event submit
 */
search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  search_input.blur()
  if (search_input.value && search_input.value.length > 2) {
    let searchResult = search(recipesList, search_input.value)
    resetRenderRecipes()
    renderResult(searchResult)
    // renderIngredientsList()
  }
})

/**
 * for Ingredients
 * hide button & display filters list with input field
 */
function toggleDisplayIngredientsListFilter() {
  ingredientsFilter_btn.classList.toggle('hidden')
  ingredientsFilter_dropdown.classList.toggle('hidden')
}

/**
 * for Appareils
 * hide button & display filters list with input field
 */
function toggleDisplayAppliancesFilter() {
  appliancesFilter_btn.classList.toggle('hidden')
  appliancesFilter_dropdown.classList.toggle('hidden')
}

/**
 * for Ustensiles
 * hide button & display filters list with input field
 */
function toggleDisplayUstensilsFilter() {
  ustensilsFilter_btn.classList.toggle('hidden')
  ustensilsFilter_dropdown.classList.toggle('hidden')
}

/**
 * ingredients button
 * display list of filters
 * @event clic
 */
ingredientsFilter_btn.addEventListener('click', (e) => {
  toggleDisplayIngredientsListFilter()
  renderIngredientsList()
})

ingredientsFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayIngredientsListFilter()
})

/**
 * ingredients filter search
 * @event input
 */
ingredientsFilterSearch_input.addEventListener('input', (e) => {
  let searchIngredientsInput = e.target.value.toLowerCase()

  if (searchIngredientsInput.length < 3) {
    ingredientsList_ul.innerHTML = ''
    renderIngredientsList()
  }

  if (searchIngredientsInput.length > 2) {
    ingredientsList_ul.innerHTML = ''

    let ingredientsSearchResult = ingredientsList.filter(ingredientsList => ingredientsList.toLowerCase()
      .includes(searchIngredientsInput))
    ingredientsSearchResult = [...new Set(ingredientsSearchResult)]

    renderIngredientsListFilter(ingredientsSearchResult)
  }
})

/**
 * appareils button
 * display list of filters
 * @event clic
 */
appliancesFilter_btn.addEventListener('click', (e) => {
  toggleDisplayAppliancesFilter()
  renderAppliancesList()
})

appliancesFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayAppliancesFilter()
})

/**
 * appareils filter search
 * @event input
 */
appliancesFilterSearch_input.addEventListener('input', (e) => {
  let searchAppliancesInput = e.target.value.toLowerCase()

  if (searchAppliancesInput.length < 3) {
    appliancesList_ul.innerHTML = ''
    renderAppliancesList(appliancesList)
  }

  if (searchAppliancesInput.length > 2) {
    appliancesList_ul.innerHTML = ''

    let appliancesSearchResult = appliancesList.filter(appliancesList => appliancesList.toLowerCase()
      .includes(searchAppliancesInput))
    appliancesSearchResult = [...new Set(appliancesSearchResult)]

    renderAppliancesListFiltered(appliancesSearchResult)
  }
})

/**
 * ustensiles button
 * display list of filters
 * @event clic
 */
ustensilsFilter_btn.addEventListener('click', (e) => {
  toggleDisplayUstensilsFilter()
  renderUstensilsList()
})

ustensilsFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayUstensilsFilter()
})

/**
 * ustensils filter search
 * @event input
 */
ustensilsFilterSearch_input.addEventListener('input', (e) => {
  let searchUstensilsInput = e.target.value.toLowerCase()

  /**
   * reset the ustensils list when the user delete input
   */
  if (searchUstensilsInput.length < 3) {
    ustensilsList_ul.innerHTML = ''
    renderUstensilsList(ustensilsList)
  }
  /**
   * display result start at 3 character
   */
  if (searchUstensilsInput.length > 2) {
    ustensilsList_ul.innerHTML = ''

    let ustensilsSearchResult = ustensilsList.filter(ustensilsList => ustensilsList.toLowerCase()
      .includes(searchUstensilsInput))
    ustensilsSearchResult = [...new Set(ustensilsSearchResult)]

    // renderUstensilsList(ustensilsSearchResult)
    renderUstensilsListFiltered(ustensilsSearchResult)
  }
})

fetchAllRecipes()
  .then(renderRecipes)
  .then(generateIngredientsList)
  .then(generateAppliancesList)
  .then(generateUstensilsList)

