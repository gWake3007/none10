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

fetchBreeds();
refs.select.addEventListener('change', changeSelect);

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

async function fetchCatByBreed(breedId) {
  const URL = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
  await axios
    .get(`${URL}${breedId}`)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function changeSelect(event) {
  const breedId = event.target.value;
  try {
    const posts = await fetchCatByBreed(breedId);
    renderCatInfo(posts);
  } catch (error) {
    console.log(error);
  }
}

function renderCatInfo(arr) {
  const markup = arr
    .map(({ description, name, temperament, image: { url } }) => {
      return `<li class="cat-cart">
<img class="cat-img" src="${url}" alt="${name}" />
<h2 class="cat-name">${name}</h2>
<p class="cat-text">${description}</p>
<h4 class="title-temperament">Temperament:<span class="temperament">${temperament}</span></h4>
</li>`;
    })
    .join('');
  refs.catInfo.innerHTML = markup;
}
