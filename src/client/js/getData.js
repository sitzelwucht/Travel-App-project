

  // fetch data from external APIs and populate DOM with the data

export const getData = async () => {

  const place = Client.get('destination').value;
  const date = Client.get('departure').value;

  Client.get('destination-field').textContent = place;
  Client.get('depart-field').textContent = new Date(date).toDateString();

  const res = await Client.getAPIkey();
  const data = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${res.opencageKey}`);

  const geoData = await data.json();
  const lat = geoData.results[0].geometry.lat;
  const lon = geoData.results[0].geometry.lng;
  const tz = geoData.results[0].annotations.timezone.offset_string;
  const tzName = geoData.results[0].annotations.timezone.short_name;

  const split = date.split('-');        // extract day and month from date
  const weatherData = await fetch(`https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lon}&start_day=${split[1]}-${split[2]}&end_day=${split[1]}-${split[2]}&tp=daily&key=${res.weatherbitKey}`);
  const weather = await weatherData.json();

  const cityData = await fetch(`http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${place}&maxRows=10&username=${res.geonamesKey}&style=full`)
  const city = await cityData.json();

  const setInnerHtml = () => {
      Client.get('areainfo').innerHTML = `${geoData.results[0].components.country_code} - ${geoData.results[0].annotations.flag}`;
      Client.get('currency').innerHTML = `currency: ${geoData.results[0].annotations.currency.name}`;
      Client.get('timezone').innerHTML = `timezone: ${tz}, ${tzName}`;
      Client.get('call').innerHTML = `calling code: ${geoData.results[0].annotations.callingcode}`;
      Client.get('weather-header').innerHTML = '<b>typical temperatures for this period:</b>';
      Client.get('max').innerHTML = `max: ${weather.data[0].max_temp} &deg;c`;
      Client.get('min').innerHTML = `min: ${weather.data[0].min_temp} &deg;c`;
      Client.get('avg').innerHTML = `average: ${weather.data[0].temp} &deg;c`;
      Client.get('city-info').innerHTML = city.geonames[0].summary;
      Client.get('infolink').href = `https://${city.geonames[0].wikipediaUrl}`;
      Client.get('infolink').innerHTML = 'Read more';
      document.getElementsByClassName('infobox')[0].style.backgroundColor= 'white';
      document.getElementsByClassName('infobox')[1].style.backgroundColor= 'white';
    }

    setInnerHtml();
    Client.get('load').classList.add('hidden')






}
