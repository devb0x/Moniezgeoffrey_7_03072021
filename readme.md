# App

**1. Au chargement de la page**
- [x] Fetch toutes les données
- [x] Push les données dans un array **recipes [ ]**
- [x] Push les données ingrédients dans un array **ingredients [ ]**
- [x] Push les données appareils dans un array **appareils [ ]**
- [x] Push les données dans un array **ustensils [ ]**
- [x] Afficher toutes les recettes dans la section ***recipes***

**2. Filtre avec la barre de recherche principal**
- [ ] Ajouter un eventListener (type *'input'*) quand l'utilisateur à saisi plus de 3 caractères
- [ ] Ajouter un debounce sur l'event (***bonus***)
- [ ] Mis à jour du rendu
- [ ] Mis à jour des différents arrays de filtres secondaires

**3. Affichage des filtres secondaires**
- [ ] Ajouter un eventListener *'clic'* pour chacun des trois filtres secondaires
- [ ] Afficher le rendu pour chaque filtre (dropdown + list)

**4. A l'ajout d'un filtre**
- [x] Ajout d'un Event (type *'submit'*) pour la barre de recherche principale
- [x] Afficher le filtre sous la barre de recherche 
- [ ] Ajouter un eventListener pour supprimer le filtre 
- [ ] Filtrer les array avec filter() ou map() selon l'input utlisateur 


###render listes
- \#ingredientsBtn =>
  - addEventListener
  - set display to none, (toggle class hidden)
  - remove hidden to \#ingredientsDropDown
  - \#ingredientsDropDown.innerHTML 
    ```<div id="ingredientsDropDown" class="dropdown-content bg_blue">
      <div class="test2">
        <label for="ingredientSearchInput"></label>
        <div class="dropdown-content__input">
          <input type="text" id="ingredientSearchInput" placeholder="Rechercher un ingrédient">
          <i class="fas fa-chevron-down test"></i>    
        </div>
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list"></ul>
      </div>
        
    </div>
  ```
  ingredients.forEach(el => {
  const li = document.createElement('li')
  li.classList.add('filters-results-list__item')
  const link = document.createElement('a')
  // link.classList.add('')
  link.href = '#'
  link.innerText = `${el}`
  li.appendChild(link)
  document.querySelector('.filters-results-list').appendChild(li)
  })
  console.log(ingredients) // ok
  ```
  - add eventListener => hide #ingredientsDropDown & affiche #ingredientsBtn (toggle class hidden)
  
