import { renderBlock } from "./lib.js";
import { renderUserBlock } from "./user.js";

export interface IPlace {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  remoteness: number;
  bookedDates: any[];
}

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(places: IPlace[]) {
  let placesHtml = ``;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];

    placesHtml += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" id="favorites-${place.id}"></div>
            <img class="result-img" src="${place.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `;
  }

  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${placesHtml}
    </ul>
    `
  );

  toggleFavoriteItem();
}

const toggleFavoriteItem = () => {
  const favbtnsList = Array.from(document.getElementsByClassName("favorites"));

  favbtnsList.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("id");
      const elem = document.getElementById(`${id}`);

      if (elem.getAttribute("class") === "favorites active") {
        elem.setAttribute("class", "favorites");
        const favItems = Number(localStorage.getItem("favoritesAmount"));
        const userData = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("favoritesAmount", String(favItems - 1));
        renderUserBlock(userData.username, userData.avatar, favItems - 1);
      } else {
        elem.setAttribute("class", "favorites active");
        const favItems = Number(localStorage.getItem("favoritesAmount"));
        const userData = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("favoritesAmount", String(favItems + 1));
        renderUserBlock(userData.username, userData.avatar, favItems + 1);
      }
    });
  });
};
