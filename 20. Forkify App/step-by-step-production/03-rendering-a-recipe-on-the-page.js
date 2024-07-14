// --- Importing Icons
// A) Asset Management:
// During development, assets like images and SVG icons are often located in a source directory (e.g., src/img)
// Parcel processes these assets and outputs them into the dist folder, where the optimized production build of your application resides

// B) URL Transformation:
// Parcel can transform the URL of assets during the build process, ensuring that references in your code point to the correct location in the dist folder

// C) Using url: Prefix:
// By using import icons from 'url:../img/icons.svg';, you instruct Parcel to treat the import as a URL
// Parcel will handle the path transformation, so the correct path to the asset is used in the final build
// now we can use the icons var where ever we want to refer to images in the final build
import icons from 'url:../img/icons.svg';

// Polyfilling Packages (Methods & Async-Await)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Parent Container
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// --- API:
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Loading Spinner
const renderSpinner = function (parentEl) {
  // HTML for Spinner
  const markup = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
  // Clear the Content of the Container first
  recipeContainer.innerHTML = '';

  // Render the spinner in Parent Container
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};

// Loading a Recipe from API
const showRecipe = async function () {
  try {
    // --- 1) Loading Recipe:
    // While Loading Recipe we want the Spinner to be displayed
    renderSpinner(recipeContainer);

    // API Request
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
      // `https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e863b`
    );

    // Convert to Js Object
    const data = await res.json();

    // Check Response
    if (!res.ok) {
      throw new Error(`${data.message}(${res.status})`);
    }

    // Reformat Variable Names of Data
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      publisher: recipe.publisher,
    };

    // Checking Output
    console.log(recipe);

    // --- 2) Rendering Recipe:
    const markup = `
       <figure class="recipe__fig">
          <img src="${recipe.image}" alt=${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
        </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
        
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          
          ${
            /*
          <!-- For all the Ingredients we want to traverse each one of them and then... render a List element for it on teh Page -->
          <!-- As we want a New String as Output we use .map() as it gives a new array as Output -->
          <!-- We use the .join() to Produce a String from teh given Array  -->*/ ''
          }
          
          ${recipe.ingredients
            .map(ing => {
              return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
              </div>
            </li>
            `;
            })
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;

    // Remove Existing Content
    // To remove any pre existing content in the container
    recipeContainer.innerHTML = '';

    // Rendering created HTML on Parent Container 'recipeContainer'
    // Rendering as first child of the Container using 'afterbegin' method
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    // Catch and Display Error
    alert(err.message);
  }
};

showRecipe();