import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_form = document.getElementById('searchForm')
const search_input = document.getElementById('searchFormInput')

const filters_div = document.querySelector('.filters-list')

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
let searchResults = []

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
        searchResults = [...recipesList]
      })
    })
}

/**
 * create new Recipe
 * render it
 * @param searchResult
 */
function renderRecipes(searchResult) {
  if (searchResult) {
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
  } else {
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
}

/**
 * select all the .recipe and
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
 * @returns {*[]}
 */
function search(recipesList, value) {
  const filteredByName = recipesList.filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase()))
  const filteredByDescription = recipesList.filter(recipe => recipe.description.toLowerCase().includes(value.toLowerCase()))
  const filteredByIngredient = recipesList.filter(recipe => recipe.ingredients.some((ingredientObj) =>
    ingredientObj.ingredient.toLowerCase().includes(value.toLowerCase())
  ))

  const result = [...new Set([...filteredByName, ...filteredByDescription, ...filteredByIngredient])]
  return result
}

/**
 * reset ingredientsList[]
 * push data from searchResult || recipesList and generate the list of ingredients
 * @param searchResult
 */
function generateIngredientsList(searchResult) {
  if (searchResult) {
    ingredientsList = []
    searchResult.filter(recipes => recipes.ingredients.forEach(el => {
      ingredientsList.push(el.ingredient.toLowerCase())
    }))
    ingredientsList = [...new Set(ingredientsList)]
  } else {
    ingredientsList = []
    recipesList.filter(recipes => recipes.ingredients.forEach(el => {
      ingredientsList.push(el.ingredient.toLowerCase())
    }))
    ingredientsList = [...new Set(ingredientsList)]
  }
}

/**
 * reset appliancesList[]
 * push data from searchResult || recipesList and generate the list of appliances
 * @param searchResult
 */

function generateAppliancesList(searchResult) {
  if (searchResult) {
    appliancesList = []
    searchResult.filter(recipe =>
      appliancesList.push(recipe.appliance.toLowerCase())
    )
    appliancesList = [...new Set(appliancesList)]
  } else {
    recipesList.filter(recipe =>
      appliancesList.push(recipe.appliance.toLowerCase())
    )
    appliancesList = [...new Set(appliancesList)]
  }
}

/**
 * reset ustensilsList[]
 * push data from searchResult || recipesList annd generate the list of ustensils
 * @param searchResult
 */
function generateUstensilsList(searchResult) {
  if (searchResult) {
    ustensilsList = []
    searchResult.filter(recipes => recipes.ustensils.forEach(el => {
      ustensilsList.push(el.toLowerCase())
    }))
    ustensilsList = [...new Set(ustensilsList)]
  } else {
    recipesList.filter(recipes => recipes.ustensils.forEach(el => {
      ustensilsList.push(el.toLowerCase())
    }))
    ustensilsList = [...new Set(ustensilsList)]
  }
}

/**
 * add a filter in filterList when the user select one
 * @param filter
 */
function addToFilterList(filter) {
  filterList.push(filter)
}

/**
 * render the filter below the main search input
 * @param filter
 * @param btnClass
 */
function renderFilter(filter, btnClass) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', btnClass)
  filter_span.innerHTML = `${filter.value} <i class="far fa-times-circle filter-test"></i>`
  filters_div.append(filter_span)
}

/**
 * create list from
 * ingredientsList[]
 */
function renderIngredientsList() {
  ingredientsList_ul.innerHTML = ''

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
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    ingredientsList_ul.appendChild(li)
  })
}

/**
 * create list from
 * appliancesList[]
 */
function renderAppliancesList() {
  appliancesList_ul.innerHTML = ''

  appliancesList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'appliance', value: e.target.innerText.toLowerCase()}, 'btn_green')
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    appliancesList_ul.appendChild(li)
  })
}

/**
 * create list from
 * ustensilsList[]
 */
function renderUstensilsList() {
  ustensilsList_ul.innerHTML = ''

  ustensilsList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ustensil', value: e.target.innerText.toLowerCase()}, 'btn_red')
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    ustensilsList_ul.appendChild(li)
  })
}

/**
 * function filter for ingredients input
 * @param ingredientsSearchResult
 */
function renderIngredientsListFiltered(ingredientsSearchResult) {
  ingredientsSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ingredient', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ingredient', value: e.target.innerText.toLowerCase()}, 'btn_blue')
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    ingredientsList_ul.appendChild(li)
  })
}

/**
 * function filter for appareils input
 * @param appliancesSearchResult
 */
function renderAppliancesListFiltered(appliancesSearchResult) {
  appliancesSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'appliance', value: e.target.innerText.toLowerCase()}, 'btn_green')
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    appliancesList_ul.appendChild(li)
  })
}

/**
 * function filter for ustensils input
 * @param ustensilsSearchResult
 */
function renderUstensilsListFiltered(ustensilsSearchResult) {
  ustensilsSearchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ustensil', value: e.target.innerText.toLowerCase()}, 'btn_red')
      filterRecipes(searchResults, e.target.innerText.toLowerCase())
    })

    ustensilsList_ul.appendChild(li)
  })
}

/**
 * filter recipes
 * @param recipesList
 */
function filterRecipes(recipesList) {
  let searchResult = recipesList

  filterList.forEach(filterItem => {
    switch (filterItem.category) {
      case ('ingredient'):
        searchResult = searchResult.filter(recipe => {
          return recipe.ingredients.some(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(filterItem.value)) {
              return recipe
            }
          })
        })
        break
      case ('appliance'):
        searchResult = searchResult.filter(recipe => {
          return recipe.appliance.toLowerCase().includes(filterItem.value);
        })
        break
      case ('ustensil'):
        searchResult = searchResult.filter(recipe => {
          return recipe.ustensils.some(ustensil => {
            if (ustensil.toLowerCase().includes(filterItem.value)) {
              return recipe
            }
          })
        })
    }
  })

  resetRenderRecipes()
  renderRecipes(searchResult)

  addEventFilter()
  generateIngredientsList(searchResult)
  generateAppliancesList(searchResult)
  generateUstensilsList(searchResult)
}

/**
 * function for adding event listener when we remove a filter from the filters List
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
      filterRecipes(searchResults)
    }))
  }
}

function resetFilters() {
  filterList = []

  const filterItem = document.querySelectorAll('.filter-item')

  if (filterItem) {
    filterItem.forEach(el => el.remove())
  }
}

/**
 * Main research
 * @event input
 */
search_form.addEventListener('input', (e) => {
  e.preventDefault()

  if (search_input.value && search_input.value.length < 3) {
    resetRenderRecipes()
    renderRecipes()

    generateIngredientsList()
    generateAppliancesList()
    generateUstensilsList()
  }
  /**
   * the research start at 3 character
   */
  if (search_input.value && search_input.value.length > 2) {
    searchResults = search(recipesList, search_input.value)
    /**
     * reset DOM and render the recipes
     */
    resetRenderRecipes()
    renderRecipes(searchResults)

    generateIngredientsList(searchResults)
    generateAppliancesList(searchResults)
    generateUstensilsList(searchResults)
  }
})

/**
 * Main research
 * @event submit
 */
search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  resetFilters()

  search_input.blur()
  if (search_input.value && search_input.value.length > 2) {
    searchResults = search(recipesList, search_input.value)
    /**
     * reset DOM and render the recipes
     */
    resetRenderRecipes()
    renderRecipes(searchResults)

    generateIngredientsList(searchResults)
    generateAppliancesList(searchResults)
    generateUstensilsList(searchResults)

    search_form.reset()
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
ingredientsFilter_btn.addEventListener('click', () => {
  toggleDisplayIngredientsListFilter()
  renderIngredientsList()
})

ingredientsFilterSearch_arrow.addEventListener('click', () => {
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

    renderIngredientsListFiltered(ingredientsSearchResult)
  }
})

/**
 * appareils button
 * display list of filters
 * @event clic
 */
appliancesFilter_btn.addEventListener('click', () => {
  toggleDisplayAppliancesFilter()
  renderAppliancesList()
})

appliancesFilterSearch_arrow.addEventListener('click', () => {
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
ustensilsFilter_btn.addEventListener('click', () => {
  toggleDisplayUstensilsFilter()
  renderUstensilsList()
})

ustensilsFilterSearch_arrow.addEventListener('click', () => {
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

    renderUstensilsListFiltered(ustensilsSearchResult)
  }
})

fetchAllRecipes()
  .then(renderRecipes)
  .then(generateIngredientsList)
  .then(generateAppliancesList)
  .then(generateUstensilsList)
