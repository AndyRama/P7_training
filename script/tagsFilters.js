// create a new tags   
function showTags(items, tagId, type) {
  const tag = document.getElementById(tagId);
  let templateTaglist = ``;
  items.sort();
  // display tag
  items.map(item => {
    let contentItem = item[0].toUpperCase() + item.toLowerCase().slice(1);
    if(filteredIngredients.indexOf(item) != -1 | filteredDevices.indexOf(item) != -1 | filteredUstensils.indexOf(item) != -1) {
      templateTaglist += `
        <li><button onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag is-selected" data-type="${type}" data-item="item">${contentItem}</button></li>      
      `
    } else {
      templateTaglist += `
        <li><button onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag" data-type="${type}" data-item="item">${contentItem}</button></li>        
      `
    }
    tag.innerHTML = templateTaglist;
  })
}

// create function add tags 
function addFilter(e) {
  const type = e.dataset.type;
  const title = e.dataset.title;
  var htmlClass;
  const tagList = document.getElementById("tagsBtn");
  const allTags = tagList.getElementsByTagName("button");
  const tagsStringList = [];

  for( i = 0; i < allTags.length; i++) {
    tagsStringList.push({ title: allTags[i].dataset.controls, type: allTags[i].dataset.type })
  }
  switch(type) {
    case 'ingredients':
      htmlClass = 'filters__btn--ingredients';
    break
    case 'device':
      htmlClass = 'filters__btn--devices';
    break

    case 'ustensil':
      htmlClass = 'filters_btn--ustensils';
    break
  }
  //if tags isn't already present in this list => add  new tag element
  if(!tagsStringList.some(tag => tag.title.toLowerCase() == title.toLowerCase())) {
    document.getElementById('tagsBtn').innerHTML = document.getElementById('tagsBtn').innerHTML + `
      <button class="filters__tag filters__Btn ${htmlClass}" data-type="${type}" data-controls="${title}" >
        ${title}
        <svg id="close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"></path>
        </svg>
      </button>
    `;
  }
}

// Si tags deja present, add new tags
// remove tags with close
// filtre les tags avec keyword input