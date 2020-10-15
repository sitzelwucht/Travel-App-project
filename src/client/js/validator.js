// validates input and accodingly gives alerts or fires data fetching functions and unhides sections

  export  const validate = () => {
            function hasNumber(myString) {
            return /\d/.test(myString);
            }
          let inputPlace = Client.get('destination').value
          let inputDate = Date.parse(Client.get('departure').value);
          let today = new Date();

          if (inputPlace == '' || Client.get('departure').value == '') {
              alert('Please enter both destination and departure date')
            }
          else if (inputDate < Date.parse(today)) {
              alert('Departure cannot be in the past')
            }
          else if (hasNumber(inputPlace)) {
              alert('Destination cannot contain numbers')
            }
          else {
              Client.get('load').classList.remove('hidden')
              document.querySelectorAll('section').forEach((section) => {
              section.classList.remove('hidden');
            });
            Client.getImage();
            Client.getData();
          }
        }
