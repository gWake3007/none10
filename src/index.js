import axios from 'axios';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
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

const errorText = refs.error.textContent;

fetchBreeds();

refs.select.addEventListener('change', changeSelect);

async function fetchBreeds() {
  await axios
    .get('breeds')
    .then(response => {
      const options = response.data.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
      );
      refs.select.insertAdjacentHTML('beforeend', options);
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

async function changeSelect(event) {
  const breedId = event.target.value;
  try {
    const posts = await fetchCatByBreed(breedId);
    renderCatInfo(posts);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(errorText);
  }
}

function renderCatInfo(data) {
  const url = data[0].url;
  const description = data[0].breeds[0].description;
  const temperament = data[0].breeds[0].temperament;
  const name = data[0].breeds[0].name;
  const markup = `<li class="cat-cart">
<img class="cat-img" src="${url}" alt="${name}" width="350px"/>
<h2 class="cat-name">${name}</h2>
<p class="cat-text">${description}</p>
<h4 class="title-temperament">Temperament:<span class="temperament">${temperament}</span></h4>
</li>`;
  console.log(markup);
  refs.catInfo.innerHTML = markup;
}
