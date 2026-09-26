import { getResourse } from "../services/requests";

const showMoreStyles = (triggerSelector, wrapperSelector) => {
  const trigger = document.querySelector(triggerSelector),
        wrapper = document.querySelector(wrapperSelector);

  trigger.addEventListener("click", function() {
    getResourse('assets/db.json')
      .then(res => createCard(res.styles))
      .catch(error => showError(error));
  
    this.remove();
  });

  function createCard(res) {
    res.forEach(({src, title, link}) => {
      const card = document.createElement('div');
      card.classList.add('animated', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'fadeInUp');

      card.innerHTML = `
        <div class="styles-block">
          <img src="${src}" alt>
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;

      wrapper.append(card);
    });
  }

  function showError(error) {
    console.log(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message', 'error-message_big', 'animated', 'fadeInUp');
    errorMessage.innerText = 'Произошла ошибка! Стилей не найдено';
    wrapper.append(errorMessage);
  }
}

export default showMoreStyles;