
import 'regenerator-runtime/runtime'
import { getAPIkey } from './js/APIkeyGetter'
import { getData } from './js/getData'
import { getImage } from './js/getImage'
import { validate } from './js/validator'
import { createLi, get, removeItem, addDelBtn } from './js/helperFunctions'
import './js/modals'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/buttons.scss'
import './styles/modals.scss'
import './styles/form.scss'
import './styles/loader.scss'


// variable to store local storage items

let array = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

localStorage.setItem('items', JSON.stringify(array))


      // EVENT LISTENERS

// invoke initial data fetching functions after validating input

get('apply').addEventListener('click', (e) => {
    e.preventDefault();
    validate();
  })

// clear entire local storage and empty ul element

get('removeAll').addEventListener('click', () => {
      localStorage.clear()
      const ul = get('list')
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
      }
    });

// remove individual items from list/local storage

get('removeOne').addEventListener('click', (e) => {
        e.preventDefault()
        const target = get('toRemove').value.toLowerCase()
        let i = 0;
        while (i < array.length) {
        if(array[i].destination.toLowerCase() == target) {
              array.splice(i, 1);
              localStorage.setItem('items', JSON.stringify(array))
              }
            else { ++i; }

          }
        window.location.reload()

        })

// select text content, put it into an object to post and retrieve

get('save').addEventListener('click', (e) => {
      const place = get('destination-field').textContent
      const depDate = get('depart-field').textContent
      const notes = get('notes-data').value
      const myTrip = {
            destination: place,
            departure: depDate,
            notes: notes
            }
    postData(myTrip)
    getProjectData()

      }
    )

      // MAIN FUNCTIONS

    const postData = async(data) => {

      const response = await fetch('/data', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          try {
              const newData = await response;
              return newData;
          } catch (err) {
              console.log(err);
          }
      }

    const getProjectData = async() => {

        const response = await fetch('/data');
              try {
                const projectData = await response.json();
                let i = projectData.data.length-1
                array.push(projectData.data[i])
                localStorage.setItem('items', JSON.stringify(array))
                get('savebox').innerHTML = 'Your trip was saved!'
                setTimeout(window.location.reload.bind(window.location), 1100);
              }
              catch (err) {
                  console.log(err);
              }
          }



// checks local storage and creates ul accordingly

    const loadList = () => {

      let storageData = JSON.parse(localStorage.getItem('items'))
      for (let i = 0; i < storageData.length; i++){
        let str = `${storageData[i].destination} | ${storageData[i].departure} | ${storageData[i].notes}`
        createLi(str, i)
          }
}

      loadList()





  export {
    getAPIkey,
    getData,
    getImage,
    createLi,
    get,
    addDelBtn }
