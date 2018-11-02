'use strict';

const STORE = {
  listItems: [{name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}],
  hideChecked: false
};

function generateItemElement(item, itemIndex, template) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
  <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle js-item-toggle">
        <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete js-item-delete">
        <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM    
  let items = STORE.listItems;
  if (STORE.hideChecked) {
    items = STORE.listItems.filter(item => !item.checked);
  }
  console.log ('`renderShoppingList` ran');
  const shoppingListItemsString = 
  generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log(STORE);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.listItems.push({name: itemName, checked: false});
}


function handleNewItemSubmit() {
  // adds items to the list
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log (newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
  

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.listItems[itemIndex].checked = !STORE.listItems[itemIndex].checked;
  // updates STORE.items
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}


function handleItemCheckClicked() {
  // check  list items on and off
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log ('`hadleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
  
}


function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);
  STORE.listItems.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // should be able to delete items from the list
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}


function toggleHideChecked() {
  STORE.hideChecked = !STORE.hideChecked;
  // changes STORE.hideChecked true/false
}


function handleDisplayCheckBox() {
  $('.checkbox').click(event => {
    console.log('checkbox was clicked');
    toggleHideChecked();
    renderShoppingList();
  });
}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayCheckBox();
}

$(handleShoppingList);