import { renderBlock } from "./lib.js";
import { renderSearchResultsBlock } from "./search-results.js";
import { FlatRentSdk } from "./flat-rent-sdk.js";

interface SearchFormData {
  date1: string;
  date2: string;
}

const sdk = new FlatRentSdk();

export function renderSearchFormBlock(date1: Date, date2: Date) {
  const date = new Date();
  const min = dateToString(date);
  const max = dateToString(
    getLastDayOfMonth(date.getFullYear(), date.getMonth() + 2)
  );

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" class="date1" type="date" value="${dateToString(
              date1
            )}" min="${min}" max="${max}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" class="date2" type="date" value="${dateToString(
              date2
            )}" min="${min}" max="${max}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="searchBtn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );

  const btn = document.getElementById("searchBtn");

  btn.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    const date1 = (<HTMLInputElement>(
      document.getElementsByClassName("date1")[0]
    )).value;
    const date2 = (<HTMLInputElement>(
      document.getElementsByClassName("date2")[0]
    )).value;

    const result: SearchFormData = {
      date1,
      date2,
    };

    search(result);
    sdk
      .search({
        city: "Санкт-Петербург",
        checkInDate: new Date(date1),
        checkOutDate: new Date(date2),
      })
      .then((data) => {
        renderSearchResultsBlock(data);
      });
  });
}

function dateToString(date: Date): string {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  if (Number(month) < 10) {
    month = "0" + month;
  }

  if (Number(day) < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function search(data: SearchFormData) {
  console.log(data);
}
