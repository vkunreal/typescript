import { renderBlock } from "./lib.js";

export function renderUserBlock(
  name: string,
  avatar: string,
  favoriteItemsAmount: number
) {
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount ? " active" : "";

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
