//DOM elements
let recipesArray = [];
let allIngredients = [];
let allDevices = [];
let allUstensils = [];

let filteredIngredients = [];
let filteredDevices = [];
let filteredUstensils = [];

fetch("./script/api/recipes.json")
  .then(reponse => {
    if(reponse) return reponse.json();
  })
  .then((value) => {
    recipeCardDom(value.recipes);
    recipesArray = value.recipes;
  })

function recipeCardDom(recipes) {

  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  recipes.map(recipe => {
    recipeCard.innerHTML += `
    <article class="recipe__container">
    <div class="recipe__picture">
      <img src="./public/assets/recipes-images/recette_id_${recipe.id}.jpg" alt="${recipe.name}" class="recipe__img">
    </div>
    <div class="recipe__infoContent">
      <div class="recipe__legend">
        <h2 class="recipe__name">${recipe.name}</h2>
        <span class="recipe__time">
          <svg width="20" height="20"class="recipe__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
          </svg> 
          <span id="time">${recipe.time}min</span>
        </span>
      </div>
      <div class="recipe__info">
        <div class="recipe__ingredients">
          <ul id="recipe-${recipe.id}" class="recipe__ingredientList"></ul>
        </div>
        <div class="recipe__instruContent">
          <p class="recipe__instructiions">${recipe.description}</p>
        </div>
      </div>
    </div>
  </article>
  `;
  const ingredientList = document.getElementById(`recipe-${recipe.id}`);
  const ingredients = recipe.ingredients;
    ingredients.map(ingredient => {
      ingredientList.innerHTML += `
      <li class="recipe__ingredient">${ingredient.ingredient} ${ingredient.quantity == undefined ? "" : ":"}
      <span class="recipe__quantity">
        ${ingredient.quantity === undefined ? "" : ingredient.quantity}
        ${ingredient.unit === undefined ? "" : ingredient.unit}
      </span>
    </li>
      `
    })
  });
  //get all array of items
  allUstensils = [];
  allDevices = [];
  allIngredients = [];

  //display all tags in taglist container
  recipes.forEach((element) => {
    //ingrédients
    element.ingredients.map((e) => {
      if(allIngredients.indexOf(e.ingredient) == -1) allIngredients.push(e.ingredient);
    });
    
    //devices
    if (allDevices.indexOf(element.appliance) == -1) allDevices.push(element.appliance);
    
    //ustensiles
    element.ustensils.map((e) => {
      if (allUstensils.indexOf(e) == -1) allUstensils.push(e);
    });
  });

  showTags(allIngredients, "ingredientsTaglist", "ingredients");
  showTags(allDevices, "devicesTaglist", "device");
  showTags(allUstensils, "ustensilsTaglist", "ustensils");
}
// create a new tag, order by alpahbetique
function showTags(items, tagId, type) {
  const tag = document.getElementById(tagId);
  console.log(tag);
  let templateTaglist = ``;
  items.sort();
  // display tag with template
  items.map(item => {
    let contentItem = item[0].toUpperCase() + item.toLowerCase().slice(1);
    if (filteredIngredients.indexOf(item) != -1 || filteredDevices.indexOf(item) != -1 || filteredUstensils.indexOf(item) != -1) {
      templateTaglist += `
        <li><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag is-selected" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    } else {
      templateTaglist += `
        <li ><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    }
  })
  tag.innerHTML = templateTaglist;
}
