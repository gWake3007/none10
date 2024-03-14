import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_xMnfgK6ktKZ8DHw1y5QsGeWrKw4fGeuH16i2bt4U3syOORaIkM5Q3anmRy0MPesu';
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';

import {refs} from './index';
export {fetchBreeds};
export {fetchCatByBreed};

async function fetchBreeds() {
  await axios
    .get('breeds')
    .then(response => {
      refs.select.classList.add("hidden");
      refs.loader.classList.remove("hidden");
      const options = response.data.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
      );
      refs.select.insertAdjacentHTML('beforeend', options);
      new SlimSelect ({
        select: '#multiple',
      });
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Notify.failure(errorText);
    });
}

async function fetchCatByBreed(breedId) {
  const URL = 'images/search?breed_ids=';
  const response = await axios.get(`${URL}${breedId}`);
  return response.data;
}
