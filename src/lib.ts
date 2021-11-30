interface IMessage {
  text: string;
  type: string;
}

interface IAction {
  name: string;
  handler: () => void;
}

export function renderBlock(elementId: string | null, html: string | null) {
  const element = document.getElementById(elementId);
  element.insertAdjacentHTML("afterbegin", html);
}

export function renderToast(message: IMessage | null, action: IAction | null) {
  if (message != null) {
    const messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || "Закрыть"}</button>
      </div>
    `;

    renderBlock("toast-block", messageText);

    const button = document.getElementById("toast-main-action");

    if (button != null) {
      button.onclick = function () {
        if (action != null && action.handler != null) {
          action.handler();
        }
        renderToast(null, null);
      };
    }
  } else {
    const elem = document.getElementById("info-block");

    elem.parentNode.removeChild(elem);
  }
}
