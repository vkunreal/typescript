import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  const defaultDateFrom = new Date();
  const defaultDateTo = new Date();
  defaultDateFrom.setDate(defaultDateFrom.getDate() + 1);
  defaultDateTo.setDate(defaultDateTo.getDate() + 3);

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: "Wade Warren",
      avatar: "/img/avatar.png",
    })
  );

  localStorage.setItem("favoritesAmount", "0");

  const userData = getUserData();
  const favoritesAmount = getFavoritesAmount();

  renderUserBlock(userData.username, userData.avatar, Number(favoritesAmount));
  renderSearchFormBlock(defaultDateFrom, defaultDateTo);
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});

interface IUserData {
  username: string;
  avatar: string;
}

function getUserData(): IUserData {
  return JSON.parse(localStorage.getItem("user"));
}

function getFavoritesAmount(): string {
  return localStorage.getItem("favoritesAmount");
}
