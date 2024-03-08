import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_xMnfgK6ktKZ8DHw1y5QsGeWrKw4fGeuH16i2bt4U3syOORaIkM5Q3anmRy0MPesu';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

async function fetchBreeds() {
  await axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      console.log(response.data);
      const option = response.data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('');
      refs.select.insertAdjacentHTML('afterbegin', option);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchBreeds();

async function fetchCatByBreed(breedId) {
    axios.get(``)
}