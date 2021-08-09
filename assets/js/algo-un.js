import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_input = document.getElementById('searchFormInput')
const search_form = document.getElementById('searchForm')

const filters_div = document.querySelector('.filters-list')

const ingredients_btn = document.getElementById('ingredientsBtn')
const ingredients_list = document.getElementById('ingredientsDropDown')

const appliances_btn = document.getElementById('appliancesBtn')
const appliances_list = document.getElementById('appliancesDropDown')

const ustensils_btn = document.getElementById('ustensilsBtn')
const ustensils_list = document.getElementById('ustensilsDropDown')

const test = document.getElementById('reset')

/**
 * data with all recipes
 * @type {*[]}
 */
let recipes = []
let filtersList = []

let appliances = []
let ustensils = []
let ingredients = []

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

search_form.addEventListener('submit', (e) => {
  e.preventDefault()

  // search = []
  appliances = []
  ustensils = []
  ingredients = []
  /**
   * search start at 3 characters
   */
  if (search_input.value && search_input.value.length >= 3) {
    let searchInput = search_input.value.toLowerCase()
    console.log('form submited with this value: ' + searchInput)
    const result = recipes.filter(el => {
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

    resetRenderRecipes()
    resetRenderFilters()
    renderFilter(searchInput)
    renderSearch(result)

    renderIngredientsList(result)
    renderAppliancesList(result)
    renderUstensilsList(result)

    search_form.reset()
  }
})

fetchAllRecipes()
  .then(renderAllRecipes)
  .then(focus)

function resetRenderRecipes() {
  const recipes = document.querySelectorAll('.recipe')

  if (recipes) {
    recipes.forEach(el => {
      el.remove()
    })
  }
}

function resetRenderFilters() {
  const filters = document.querySelectorAll('.filter-item')

  if (filters) {
    filters.forEach(el => {
      el.remove()
    })
  }
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

/**
 * add the filter under the input search
 * @param filter
 */
function renderFilter(filter) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', 'btn_black')
  filter_span.innerHTML = `${filter} <i class="far fa-times-circle"></i>`
  filters_div.append(filter_span)
}

function renderUstensilFilter (filter) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', 'btn_red')
  filter_span.innerHTML = `${filter} <i class="far fa-times-circle"></i>`
  filters_div.append(filter_span)
}

/**
 * render the recipes data inside search[],
 * when the user use the main research input
 */
function renderSearch(list) {
  resetRenderRecipes()
  if (filtersList.length === 0) {
    list.forEach(recipe => {
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

  filtersList.forEach(filter =>
    recipes.filter(recipe => {
      if (recipe.ustensils.includes(filter)
        || recipe.appliance.includes(filter)
        || recipe.ingredients.includes(filter)) {
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
      }
    })
  )
  renderIngredientsList(list)
  renderUstensilsList(list)
  renderAppliancesList(list)
}

function renderIngredientsList(result) {
  let ingredients = result.map(el => el.ingredients)
  // console.log(ingredients)

  let list = []
  ingredients.forEach(el => {
    el.forEach(ingredient => {
      list.push(ingredient.ingredient)
    })
  })
  // console.log(list)
  ingredients = [...new Set(list)]
  // console.warn(ingredients)

  ingredients_list.innerHTML = `
      <label for="ingredientsSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="ingredientsSearchInput" placeholder="Rechercher un ingrédient">
        <i class="fas fa-chevron-down dropdown-content__arrow ingredients-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list ingredients-list"></ul>
      </div>
  `
  ingredients.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.classList.add('filters-results-list__item-link')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.ingredients-list').appendChild(li)
  })

  document.querySelector('.ingredients-arrow').addEventListener('click', (e) => {
    ingredients_btn.classList.toggle('hidden')
    document.getElementById('ingredientsDropDown').classList.toggle('hidden')
  })

  document.getElementById('ingredientsSearchInput').addEventListener('input', (e) => {
    // console.log(e.target.value)
    const newList = ingredients.filter(ingredients => ingredients.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(newList)
    renderIngredientsListFiltered(newList)
  })

}

function renderIngredientsListFiltered(newList) {
  console.log(newList)
  const ingredientsList = document.querySelector('.ingredients-list').innerHTML = ''

  console.log(ingredientsList)
  newList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.classList.add('filters-results-list__item-link')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.ingredients-list').appendChild(li)
  })

}

function renderAppliancesList(result) {
  let appliances = result.map(el => el.appliance)
  appliances = [...new Set(appliances)]

  // console.log(appliances)
  appliances_list.innerHTML = `
      <label for="appliancesSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="appliancesSearchInput" placeholder="Rechercher un appareil">
        <i class="fas fa-chevron-down dropdown-content__arrow appliances-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list appliances-list"></ul>
      </div>
  `
  appliances.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.appliances-list').appendChild(li)
  })

  document.querySelector('.appliances-arrow').addEventListener('click', (e) => {
    appliances_btn.classList.toggle('hidden')
    document.getElementById('appliancesDropDown').classList.toggle('hidden')
  })

  document.getElementById('appliancesSearchInput').addEventListener('input', (e) => {
    const newList = appliances.filter(appliances => appliances.toLowerCase().includes(e.target.value.toLowerCase()))
    renderAppliancesListFiltered(newList)
  })

}

function renderAppliancesListFiltered(newList) {
  console.log(newList)
  const appliancesList = document.querySelector('.appliances-list').innerHTML = ''

  console.log(appliancesList)
  newList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.classList.add('filters-results-list__item-link')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.appliances-list').appendChild(li)
  })

}

function renderUstensilsList(result) {

  ustensils = result.map(el => el.ustensils)
  // console.log(ustensils)
  let list = []
  ustensils.forEach(el => {
    el.forEach(ustensil => {
      list.push(ustensil)
    })
  })
  // console.warn(list)
  ustensils = [...new Set(list)]
  // console.warn(ustensils)

  ustensils_list.innerHTML = `
      <label for="ustensilsSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="ustensilsSearchInput" placeholder="Rechercher un ustensile">
        <i class="fas fa-chevron-down dropdown-content__arrow ustensils-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list ustensils-list"></ul>
      </div>
  `

  ustensils.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)

    link.addEventListener('click', (e) => {
      el.toLowerCase()
      filtersList.push(el)
      filtersList = [...new Set(filtersList)]
      console.log(filtersList)

      let newList = result.filter(elem => {
        return elem.ustensils.includes(el)
      })
      newList = [...new Set(newList)]
      renderUstensilFilter(el)
      console.log(newList)
      resetRenderRecipes()

      renderSearch(newList)
    })

    document.querySelector('.ustensils-list').appendChild(li)

    document.querySelector('.ustensils-arrow').addEventListener('click', (e) => {
      ustensils_btn.classList.toggle('hidden')
      document.getElementById('ustensilsDropDown').classList.toggle('hidden')
    })

    document.getElementById('ustensilsSearchInput').addEventListener('input', (e) => {
      const newList = ustensils.filter(ustensils => ustensils.toLowerCase().includes(e.target.value.toLowerCase()))
      renderUstensilsListFiltered(newList)
      // renderUstensilsList(newList)
    })

  })
}

function renderUstensilsListFiltered(newList) {
  const ustensilsList = document.querySelector('.ustensils-list')
  ustensilsList.innerHTML = ''

  newList.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.classList.add('filters-results-list__item-link')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)

    link.addEventListener('click', (e) => {
      el.toLowerCase()
      filtersList.push(el)
      filtersList = [...new Set(filtersList)]
      console.log(newList)
      let newResult = recipes.filter(elem => {
        return elem.ustensils.includes(recipes)
      })
      newResult = [...new Set(newResult)]
      console.log(filtersList)
      renderUstensilFilter(el)
      // renderSearch(newList)
      // TODO CHECK THIS
      resetRenderRecipes()

      renderSearch(newResult)
      console.log(newResult)
      console.log(ustensils)
      renderUstensilsList(newResult)

      // renderIngredientsList(recipes)
      // renderAppliancesList(recipes)
      // renderUstensilsList(recipes)
    })
    document.querySelector('.ustensils-list').appendChild(li)
  })

}

ingredients_btn.addEventListener('click', () => {
  ingredients_btn.classList.add('hidden')
  ingredients_list.classList.toggle('hidden')

  appliances_list.classList.add('hidden')
  appliances_btn.classList.remove('hidden')

  ustensils_list.classList.add('hidden')
  ustensils_btn.classList.remove('hidden')

  // renderIngredientsList()
})

appliances_btn.addEventListener('click', () => {
  appliances_btn.classList.add('hidden')
  appliances_list.classList.toggle('hidden')

  ingredients_list.classList.add('hidden')
  ingredients_btn.classList.remove('hidden')

  ustensils_list.classList.add('hidden')
  ustensils_btn.classList.remove('hidden')
  // renderAppliancesList()
})

ustensils_btn.addEventListener('click', () => {
  ingredients_list.classList.add('hidden')
  ingredients_btn.classList.remove('hidden')

  appliances_list.classList.add('hidden')
  appliances_btn.classList.remove('hidden')

  ustensils_btn.classList.add('hidden')
  ustensils_list.classList.toggle('hidden')
  renderUstensilsList()
})

function focus() {
  search_input.focus()
}
// ##############################################################

// const filteredByReceipe = data.recipes.filter((elem) =>
//   elem.name.toLocaleLowerCase().includes(mySearch)
// );
//
// function filterByApplance(value) {
//   return filteredByReceipe.filter((elem) =>
//     elem.appliance.toLocaleLowerCase().includes(value)
//   );
// }

// ##############################################################

