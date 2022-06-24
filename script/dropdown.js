const inputIng = document.getElementById("inputIng");
const inputDev = document.getElementById("inputDev");
const inputUst = document.getElementById("inputUst");

const btnOrder = Array.from(document.querySelectorAll(".filters__dropDown"));

btnOrder.forEach((btn, index) => 
  btn.addEventListener("click",(e) => {
    e.preventDefault();
    openTaglist(btn.getAttribute("aria-controls"), index);
  })
);

function openTaglist(idContainer, index) {
  let tagContainer = document.getElementById(idContainer);
  let filtersForm = tagContainer.previousElementSibling;
  const icoDropDown = document.querySelector(".ico");

  if(tagContainer.classList.contains("is-expanded")) {
    tagContainer.classList.remove("is-expanded");
    icoDropDown.classList.replace("ico__dropUp","ico__dropDown")
    closeInput();

  } else {
    if(document.querySelector(".filters__inputContainer.is-expanded") != null) {
      document.querySelector(".filters__inputContainer.is-expanded") .classList.remove("is-expanded");
      closeInput(this)
    }

    tagContainer.classList.add("is-expanded");
    icoDropDown.classList.replace("ico__dropDown","ico__dropUp");

    if(index == 0) {
      inputIng.classList.add("btn-Expansed");
      document.getElementById("inputIng").placeholder = 'rechercher un ingredient ...';
    }

    if(index == 1) {
      inputDev.classList.add("btn-Expansed");
      document.getElementById("inputDev").placeholder = 'rechercher un ingredient ...';
    }

    if(index == 2) {
      inputUst.classList.add("btn-Expansed");
      document.getElementById("inputUst").placeholder = 'rechercher un ingredient ...';
    }
  }
}

function closeInput() {
  const isExpanded = document.querySelectorAll(`.btn-Expansed`);

  isExpanded.forEach(btn => {
    btn.classList.remove(`btn-Expansed`);
    //placeholder
    document.getElementById('inputIng').placeholder = 'Ingrédients';
    document.getElementById('inputDev').placeholder = 'Appareils';
    document.getElementById('inputUst').placeholder = 'ustensiles';
  });
}
