import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  const defaultDateFrom = new Date();
  const defaultDateTo = new Date();
  defaultDateFrom.setDate(defaultDateFrom.getDate() + 1);
  defaultDateTo.setDate(defaultDateTo.getDate() + 3);

  renderUserBlock("Wade Warren", "/img/avatar.png", 5);
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
