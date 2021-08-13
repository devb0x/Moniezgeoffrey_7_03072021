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
function resetRenderList() {
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
  ingredientsList = searchResult.map(el => el.ingredients)
  ingredientsList.forEach(el => {
    el.forEach(ingredient => {
      ingredientsResult.push(ingredient.ingredient)
    })
  })
  ingredientsResult = [...new Set(ingredientsResult)]
  ingredientsList = ingredientsResult
  renderIngredientsListFilter(ingredientsResult)

  /**
   * appliances result render
   */
  appliancesList = searchResult.map(el => el.appliance)
  appliancesList = [...new Set(appliancesList)]
  renderAppliancesListFilter(appliancesList)

  /**
   * ustensils result render
   */
  let ustensilsResult = []
  ustensilsList = searchResult.map(el => el.ustensils)
  ustensilsList.forEach(el => {
    el.forEach(ustensil => {
      ustensilsResult.push(ustensil)
    })
  })
  ustensilsResult = [...new Set(ustensilsResult)]
  ustensilsList = ustensilsResult
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
}

search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(search_input.value)

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

    resetRenderList()
    renderSearchResult(searchResult)
  }
})

/**
 * add a filter when the user select one in filter list
 * @param filter
 */
function addToFilterList(filter) {
  filterList.push(filter)
  renderFilter(filter)
}

/**
 * add the filter to the DOM
 * @param filter
 */
function renderFilter(filter) {

  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item')
  filter_span.innerHTML = `${filter.value} <i class="far fa-times-circle"></i>`
  filters_div.append(filter_span)

  if (filter.category === 'ingredient') {
    filter_span.classList.add('btn_blue')

    searchResult.filter(el => {
      el.ingredients.forEach(item => {
        if (item.ingredient.toLowerCase().match(filter.value)) {
          newResult.push(el)
        }
      })
    })
    renderResultFiltered(newResult)
  }

  // if (filter.category === 'appliance') {
  //   filter_span.classList.add('btn_green')
  //
  //   searchResult.filter(el => {
  //     if (el.appliance.toLowerCase().match(filter.value)) {
  //       newResult.push(el)
  //     }
  //   })
  //   renderResultFiltered(newResult)
  // }

  // if (filter.category === 'ustensil') {
  //   filter_span.classList.add('btn_red')
  //
  //   searchResult.filter(el => {
  //     el.ustensils.forEach(ustensil => {
  //       if (ustensil.toLowerCase().match(filter.value)) {
  //         newResult.push(el)
  //       }
  //     })
  //   })
  //   renderResultFiltered(newResult)
  // }

  if (filter.category === 'appliance') {
    filter_span.classList.add('btn_green')

    // newResult = searchResult.filter(el => {
    //   if (el.appliance.toLowerCase().match(filter.value)) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })

    filterList.forEach(filter => {
        searchResult = searchResult.filter(recipe => {
          if (recipe.appliance.toLowerCase().includes(filter.value)) {
            return true
          } else {
            return false
          }
        })
    })
    resetRenderRecipes()
    renderResultFiltered(searchResult)
  }

  if (filter.category === 'ustensil') {
    filter_span.classList.add('btn_red')

    filterList.forEach(filter => {
      searchResult = searchResult.filter(recipe => {
        recipe.ustensils.forEach(el => {
          if (el.toLowerCase().includes(filter.value)) {
            console.log(recipe)
            return true
          } else {
            return false
          }
        })
      })
    })
    resetRenderRecipes()
    renderResultFiltered(searchResult)
  }

}

function renderIngredientsListFilter(searchResult) {
  searchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ingredient', value: e.target.innerText.toLowerCase()})
    })

    ingredientsList_ul.appendChild(li)
  })
}

function renderAppliancesListFilter(searchResult) {
  searchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'appliance', value: e.target.innerText.toLowerCase()})
    })

    appliancesList_ul.appendChild(li)
  })
}

function renderUstensilsListFilter(searchResult) {
  searchResult.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    li.innerText = `${el}`

    li.addEventListener('click', (e) => {
      addToFilterList({category: 'ustensil', value: e.target.innerText.toLowerCase()})
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

    let searchResult = ingredientsList.filter(ingredientsList => ingredientsList.toLowerCase().includes(searchIngredientsInput))
    console.log(searchResult)
    searchResult = [...new Set(searchResult)]

    renderIngredientsListFilter(searchResult)
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

    let searchResult = appliancesList.filter(appliancesList => appliancesList.toLowerCase().includes(searchAppliancesInput))
    console.log(searchResult)
    searchResult = [...new Set(searchResult)]

    renderAppliancesListFilter(searchResult)
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

    let searchResult = ustensilsList.filter(ustensilsList => ustensilsList.toLowerCase().includes(searchUstensilsInput))
    console.log(searchResult)
    searchResult = [...new Set(searchResult)]

    renderUstensilsListFilter(searchResult)
  }
})












fetchAllRecipes()
  .then(renderAllRecipes)
  .then(generateIngredientsFilter)
  .then(generateAppliancesList)
  .then(generateUstensilsList)
