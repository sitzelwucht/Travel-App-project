

export const get = (id) => {
   return document.getElementById(id)
 }

// creates a new li element dynamically

export const createLi = (text, i) => {
     const ul = document.getElementById('list')
     const li = document.createElement('li')
     li.textContent = text
     ul.appendChild(li)
     addDelBtn(li, i)
     }

// adds a delete button to li elements for individual removal based on index

export const addDelBtn = (item, index) => {

  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', 'delBtn');
  delBtn.innerText = "X";
  item.appendChild(delBtn);
    delBtn.addEventListener('click', function() {
      item.parentElement.removeChild(item);
      removeItem(index)
        })
}

// deletes items based on index, removes empty items from array

export const removeItem = (index)=> {

  let array = JSON.parse(localStorage.getItem('items'))
  localStorage.setItem('items', JSON.stringify(array))

  let i = 0;
  while (i < array.length) {
  if(array[i] == array[index]) {
        delete array[i]
        break;
        }
      else { ++i; }
    }
    array = array.filter(item => item != null && item != '');
    localStorage.setItem('items', JSON.stringify(array))
}
