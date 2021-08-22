**Variables gloables pour les données**

- recipes [] = tout les recipes qd on charge la page
- filtersList [] = tous les filtres secondaires ajoutés
- appliances []
- ustensils []
- ingredients []

**Liste des fonctions**

- fetchAllRecipe()
  - push toutes les données dans recipes []


- renderAllRecipes()
  - affiche toutes les données de recipes []
    - boucle sur chaque élément
    - crée une nouvelle instance de la classe Recipe
    - appelle la méthode render() de Recipe


- renderFilter(el)
  - affiche le filtre dans le DOM


- resetRenderRecipes()
  - supprime tous les recipes dans le DOM


- resetRenderFilters()
  - supprime tous les filtres dans le DOM


- renderSearch(list)
  - bouche sur list si filtersList est vide
    - crée un nouveau Recipe
    - appelle la méthode render() de Recipe
  - boucle sur chaque filtre de filtersList
    - on boucle sur tout les recipes et on vérifie si le filtre est inclus dans 
    ustensils, appliance, ou ingredients avec la méthode .filter()
    - si oui on crée un nouveau Recipe qu'on affiche
    - on appelle les fonctions qui génèrent les 3 listes de filtre secondaires


- renderIngredientsList(result)

  - *appelé dans renderSearch(list)*
  - on map() result pour ne garder que les ingrédients
  - on crée une variable list []
  - on boucle sur chaques ingrédients qu'on push dans le tableau list
  - on supprime les doublons de list []
  - on modifie le HTML  de ingredients_list
    - on ajoute l'eventListener sur chaque lien
      - rendu du filtre
      - push du filtre dans filtersList []
      - suppression des doublons dans filtersList []
      - on filtre *result* en bouclant sur chaque élément et en vérifiant que le filtre cliqué y est inclus
      - appelle la fonction renderSearch avec le résultat du filter() de l'étape précédente en paramètre
  - on ajoute l'eventListener pour afficher la liste sur en cliquant sur la flèche
  - ajout de l'eventListener quand on rentre des données sur l'input
    - on filtre les ingrédients qui correspondent à l'input
    - on appelle la fonction de render avec en paramètre les ingrédients filtrés : *renderIngredientsListFiltered(newList)*
  

- renderIngredientsListFiltered(newList)
  - on remet a zéro le contenu de la liste d'ingrédients dans le DOM
  - on boucle sur newList et on crée une liste de lien


- renderAppliancesList(), renderAppliancesListFiltered(), renderUstensilsList(), renderUstensilsListfiltered()
  - utilise la même logique que pour les ingrédients
