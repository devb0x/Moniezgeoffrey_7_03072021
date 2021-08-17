import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_form = document.getElementById('searchForm')
const search_input = document.getElementById('searchFormInput')

const filters_div = document.querySelector('.filters-list')
const filterItem_i = document.querySelectorAll('.fa-times-circle')

const ingredientsFilter_btn = document.getElementById('ingredientsBtn')
const ingredientsFilter_dropdown = document.getElementById('ingredientsDropDown')
const ingredientsFilterSearch_input = document.getElementById('ingredientsSearchInput')
const ingredientsFilterSearch_arrow = document.querySelector('.ingredients-arrow')
const ingredientsList_ul = document.querySelector('.ingredients-list')

const appliancesFilter_btn = document.getElementById('appliancesBtn')
const appliancesFilter_dropdown = document.getElementById('appliancesDropDown')
const appliancesfilterSearch_input = document.getElementById('appliancesSearchInput')
const appliancesFilterSearch_arrow = document.querySelector('.appliances-arrow')
const appliancesList_ul = document.querySelector('.appliances-list')

const ustensilsFilter_btn = document.getElementById('ustensilsBtn')
const ustensilsFilter_dropdown = document.getElementById('ustensilsDropDown')
const ustensilsFilterSearch_input = document.getElementById('ustensilsSearchInput')
const ustensilsFilterSearch_arrow = document.querySelector('.ustensils-arrow')
const ustensilsList_ul = document.querySelector('.ustensils-list')


let recipes = [] // all recipes from the json
let searchResult = [] // result when the user valid the search form
let ingredientsList = []
let appliancesList = []
let ustensilsList = []
let filterList = [] // when the user select a secondary filter, we push the value
let newResult = []

/**
 * push json data in Recipes[]
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
        recipes.push(el)
      })
    })
}

/**
 * render all data in Recipes[]
 */
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

/**
 * push data in ingredientsList[]
 */
function generateIngredientsFilter() {
  recipes.filter(recipes => recipes.ingredients.forEach(el => {
    ingredientsList.push(el.ingredient.toLowerCase())
  }))
  ingredientsList = [...new Set(ingredientsList)]
}

/**
 * push data in appliancesList[]
 */
function generateAppliancesList() {
  appliancesList = recipes.map(recipes => recipes.appliance.toLowerCase())
  appliancesList = [...new Set(appliancesList)]
}

/**
 * push data in ustensilsList[]
 */
function generateUstensilsList() {
  recipes.filter(recipes => recipes.ustensils.forEach(el => {
    ustensilsList.push(el.toLowerCase())
  }))
  ustensilsList = [...new Set(ustensilsList)]
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
 * remove li elements from the filters list
 */
function resetRenderSecondaryList() {
  const items = document.querySelectorAll('.filters-results-list__item')

  items.forEach(el => {
    el.remove()
  })
}

/**
 * render searchResult data when we use the main search form
 * @param searchResult
 */
function renderSearchResult(searchResult) {
  resetRenderRecipes()
  searchResult.forEach(recipe => {
    new Recipe(
      recipe.id,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    ).render()
  })

  /**
   * ingredients result render
   */
  let ingredientsResult = []
  console.log(searchResult)
  searchResult.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredientsResult.push(ingredient.ingredient)
    })
  })
  ingredientsResult = [...new Set(ingredientsResult)]
  renderIngredientsListFilter(ingredientsResult)

  /**
   * appliances result render
   */
  let appliancesResult = []
  searchResult.forEach(recipe => {
    appliancesResult.push(recipe.appliance)
  })
  appliancesResult = [...new Set(appliancesResult)]
  renderAppliancesListFilter(appliancesResult)

  /**
   * ustensils result render
   */
  let ustensilsResult = []
  searchResult.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      ustensilsResult.push(ustensil)
    })
  })
  ustensilsResult = [...new Set(ustensilsResult)]
  renderUstensilsListFilter(ustensilsResult)

  search_form.reset()
}

function renderResultFiltered(newResult) {
  resetRenderRecipes()
  newResult.forEach(recipe => {
    new Recipe(
      recipe.id,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    ).render()
  })

  resetRenderSecondaryList()
  /**
   * ingredients result render
   */
  let ingredientsResult = []
  newResult.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      ingredientsResult.push(ingredient.ingredient)
    })
  })
  ingredientsResult = [...new Set(ingredientsResult)]

  renderIngredientsListFilter(ingredientsResult)

  /**
   * appliances result render
   */
  let appliancesResult = []
  newResult.forEach(recipe => {
    appliancesResult.push(recipe.appliance)
  })
  appliancesResult = [...new Set(appliancesResult)]
  renderAppliancesListFilter(appliancesResult)

  /**
   * ustensils result render
   */
  let ustensilsResult = []
  newResult.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      ustensilsResult.push(ustensil)
    })
  })
  ustensilsResult = [...new Set(ustensilsResult)]
  renderUstensilsListFilter(ustensilsResult)
}

/**
 * Main research event submit
 */
search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(search_input.value)

  /**
   * reset the filterList
   * @type {*[]}
   */
  // filterList = []

  /**
   * the research start at 3 character
   */
  if (search_input.value && search_input.value.length > 2) {
    let searchInput = search_input.value.toLowerCase()
    searchResult = recipes.filter(el => {
      if (el.name.toLowerCase().includes(searchInput)
        || el.description.toLowerCase().includes(searchInput)
        || el.ingredients.forEach(ingredient => {
          ingredient.ingredient.toLowerCase().includes(searchInput)
        })
      ) {
        return true
      } else {
        return false
      }
    })

    resetRenderSecondaryList()
    renderSearchResult(searchResult)
  }
})

/**
 * add a filter when the user select one in filter list
 * @param filter
 */
function addToFilterList(filter) {
  filterList.push(filter)
}

/**
 * add the filter to the DOM
 * @param filter
 */
function renderFilter(filter, btnClass) {
  console.log(filterList)
  console.log('searchResult = ')
  console.log(searchResult)

  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', btnClass)
  filter_span.innerHTML = `${filter.value} <i class="far fa-times-circle"></i>`
  filters_div.append(filter_span)

  filterList.forEach(filterItem => {
    switch (filterItem.category) {
      case ('ingredient'):
        newResult = searchResult.filter(recipe => {
          return recipe.ingredients.some(ingredient => {
            if (ingredient.ingredient.toLowerCase().includes(filter.value)) {
              return recipe
            }
          })
        })
        break
      case ('appliance'):
        newResult = searchResult.filter(recipe => {
          return recipe.appliance.toLowerCase().includes(filter.value);
        })
        break
      case ('ustensil'):
        newResult = searchResult.filter(recipe => {
          return recipe.ustensils.some(ustensil => {
            if (ustensil.toLowerCase().includes(filter.value)) {
              return recipe
            }
          })
        })
    }
  })

  // document.querySelector('.fa-times-circle').addEventListener('click', (e) => {
  //   console.log('clic')
  //   console.log(e.target.value)
  // })

  console.table(newResult)

  resetRenderRecipes()
  renderResultFiltered(newResult)

}

function renderIngredientsListFilter(ingredientsResult) {
  ingredientsResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ingredient', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ingredient', value: e.target.innerText.toLowerCase()}, 'btn_blue')
    })

    ingredientsList_ul.appendChild(li)
  })
}

function renderAppliancesListFilter(appliancesResult) {
  appliancesResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'appliance', value: e.target.innerText.toLowerCase()}, 'btn_green')
    })

    appliancesList_ul.appendChild(li)
  })
}

function renderUstensilsListFilter(ustensilsResult) {
  ustensilsResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
      renderFilter({category: 'ustensil', value: e.target.innerText.toLowerCase()}, 'btn_red')
    })

    ustensilsList_ul.appendChild(li)
  })
}
/**
 * display input search and list of data used for filtering
 * (e.g ingredients, appliances & ustensils)
 */
function toggleDisplayIngredientsListFilter() {
  ingredientsFilter_btn.classList.toggle('hidden')
  ingredientsFilter_dropdown.classList.toggle('hidden')
}

ingredientsFilter_btn.addEventListener('click', (e) => {
  toggleDisplayIngredientsListFilter()
})

ingredientsFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayIngredientsListFilter()
})

/**
 * Input EventListener for ingredients
 */
ingredientsFilterSearch_input.addEventListener('input', (e) => {
  let searchIngredientsInput = e.target.value

  /**
   * reset the ingredients list when the user delete input
   */
  if (searchIngredientsInput.length < 3) {
    ingredientsList_ul.innerHTML = ''
    renderIngredientsListFilter(ingredientsList)
  }
  /**
   * display result start at 3 character
   */
  if (searchIngredientsInput.length > 2) {
    ingredientsList_ul.innerHTML = ''
    searchIngredientsInput.toLowerCase()

    let ingredientsSearchResult = ingredientsList.filter(ingredientsList => ingredientsList.toLowerCase().includes(searchIngredientsInput))
    console.log(searchResult)
    ingredientsSearchResult = [...new Set(ingredientsSearchResult)]

    renderIngredientsListFilter(ingredientsSearchResult)
  }
})

function toggleDisplayAppliancesFilter() {
  appliancesFilter_btn.classList.toggle('hidden')
  appliancesFilter_dropdown.classList.toggle('hidden')
}

appliancesFilter_btn.addEventListener('click', (e) => {
  toggleDisplayAppliancesFilter()
})

appliancesFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayAppliancesFilter()
})

/**
 * Input EventListener for appliances
 */
appliancesfilterSearch_input.addEventListener('input', (e) => {
  let searchAppliancesInput = e.target.value

  /**
   * reset the appliances list when the user delete input
   */
  if (searchAppliancesInput.length < 3) {
    appliancesList_ul.innerHTML = ''
    renderAppliancesListFilter(appliancesList)
  }

  /**
   * display result start at 3 character
   */
  if (searchAppliancesInput.length > 2) {
    appliancesList_ul.innerHTML = ''
    searchAppliancesInput.toLowerCase()

    let applianceSearchResult = appliancesList.filter(appliancesList => appliancesList.toLowerCase().includes(searchAppliancesInput))
    console.log(applianceSearchResult)
    applianceSearchResult = [...new Set(applianceSearchResult)]

    renderAppliancesListFilter(applianceSearchResult)
  }
})

function toggleDisplayUstensilsFilter() {
  ustensilsFilter_btn.classList.toggle('hidden')
  ustensilsFilter_dropdown.classList.toggle('hidden')
}

ustensilsFilter_btn.addEventListener('click', (e) => {
  toggleDisplayUstensilsFilter()
})

ustensilsFilterSearch_arrow.addEventListener('click', (e) => {
  toggleDisplayUstensilsFilter()
})

/**
 * Input EventListener for ustensils
 */
ustensilsFilterSearch_input.addEventListener('input', (e) => {
  let searchUstensilsInput = e.target.value

  /**
   * reset the ustensils list when the user delete input
   */
  if (searchUstensilsInput.length < 3) {
    ustensilsList_ul.innerHTML = ''
    renderUstensilsListFilter(ustensilsList)
  }
  /**
   * display result start at 3 character
   */
  if (searchUstensilsInput.length > 2) {
    ustensilsList_ul.innerHTML = ''
    searchUstensilsInput.toLowerCase()

    let ustensilsSearchResult = ustensilsList.filter(ustensilsList => ustensilsList.toLowerCase().includes(searchUstensilsInput))
    console.log(ustensilsSearchResult)
    ustensilsSearchResult = [...new Set(ustensilsSearchResult)]

    renderUstensilsListFilter(ustensilsSearchResult)
  }
})

fetchAllRecipes()
  .then(renderAllRecipes)
  .then(generateIngredientsFilter)
  .then(generateAppliancesList)
  .then(generateUstensilsList)
