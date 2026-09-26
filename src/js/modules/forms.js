import { postData } from "../services/requests";

const forms = () => {
  const formsArr = document.querySelectorAll('form'),
        uploadInpArr = document.querySelectorAll('[name="upload"]');

  const statusMessages = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены',
    failure: 'Произошла ошибка',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  }

  const pathApi = {
    design: 'assets/design.php',
    consult: 'assets/server.php'
  }

  uploadInpArr.forEach(input => {
    input.addEventListener("input", e => {
      if (validateUpload(input)) {
        const fileName = e.target.files[0].name.split('.');
        let dots = fileName[0].length < 6 ? '.' : '...';
        input.previousElementSibling.textContent = fileName[0].slice(0, 6) + dots + fileName[1];
      }   
    });
  })

  formsArr.forEach(form => {
    const reqInputs = form.querySelectorAll('[required]');

    reqInputs.forEach(inp => {
      inp.addEventListener('input', () => {
        if (inp.value.trim() !== '') {
          removeError(inp);
        }
      }); 
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      
      if(!validateForm(form)) {
        return;
      }

      form.classList.add('animated', 'fadeOutUp');
      form.style.position = 'absolute';
      form.style.left = '0';

      setTimeout(() => {
        form.style.display = 'none';
      }, 400);

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.classList.add('animated', 'fadeInUp');
      form.parentNode.append(statusMessage);

      const img = document.createElement('img');
      img.setAttribute('src', statusMessages.spinner);
      statusMessage.append(img);

      const textMessage = document.createElement('div');
      textMessage.textContent = statusMessages.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(form);
      let api;
      form.classList.contains('form_design') ? api = pathApi.design : api = pathApi.consult;

      postData(api, formData)
        .then(res => {
          console.log(res);
          textMessage.textContent = statusMessages.success;
          img.setAttribute('src', statusMessages.ok);
        })
        .catch(error => {
          console.error(error);
          img.setAttribute('src', statusMessages.fail)
          textMessage.textContent = statusMessages.failure;
        })
        .finally(() => {
          form.reset();

          uploadInpArr.forEach(input => {
            input.previousElementSibling.textContent = 'Файл не выбран';
          });

          setTimeout(() => {
            statusMessage.remove();
            form.classList.add('fadeInDown');
            form.classList.remove('fadeOutUp');
            form.style.display = 'block';
            form.style.position = 'relative'; 
          }, 5000);
        });
    });
  });

}

function showError(element) {
  element.classList.add('error');
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');

  errorMessage.textContent =
    element.dataset.error ||
    'Заполните это поле';

  element.insertAdjacentElement('afterend', errorMessage);
}

function removeError(element) {
  element.classList.remove('error');

  const errorMessage = element.nextElementSibling;

  if (errorMessage?.classList.contains('error-message')) {
    errorMessage.remove();
  }
}

function validateForm (form) {
  const reqInputs = form.querySelectorAll('[required]');
  let isValid = true;

  reqInputs.forEach(inp => {
    removeError(inp);

    if (inp.getAttribute('name') === 'phone' && inp.value.length < 19) {
      showError(inp);
      return isValid = false;
    }

    if (inp.value.trim() === '') {
      showError(inp);
      return isValid = false;
    } 
  });

  return isValid;
}

function validateUpload(inp) {
  const file = inp.files[0];
  let isValid = true;

  if (!file) {
    showError(inp);
    return isValid = false;
  }

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('Файл слишком большой! Максимальный размер — 2 МБ.');
    inp.value = '';
    return isValid = false;
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    alert('Недопустимый формат файла.');
    inp.value = '';
    return isValid = false;
  }

  return isValid;
}

export default forms;