import { getResourse } from "../services/requests";


const calcPrice = (sizeSelector, materialSelector, optionsSelector, promocodeSelector, resultSelector, formState) => {
  const sizeBlock = document.querySelector(sizeSelector),
        materialBlock = document.querySelector(materialSelector),
        optionsBlock = document.querySelector(optionsSelector),
        promocodeBlock = document.querySelector(promocodeSelector),
        resultBlock = document.querySelector(resultSelector),
        form = resultBlock.parentNode,
        selectArr = form.querySelectorAll('select');

  initSelect();

  function initSelect(){
    const result = getResourse('assets/db.json');

    result.then(res => {
      selectArr.forEach(select => {
        const options = res[select.id];

        options.forEach(option => {
          select.insertAdjacentHTML("beforeend", `
            <option value="${option.value}" title="${option.title}">${option.name}</option>
          `);
        });
      });
    }).catch(error => {
      console.log(error);
    });
  }

  const calcSum = e => {
    form.classList.add('loading');
    const result = getResourse('assets/db.json'),
          target = e.target;

    result.then(res => {      
      form.classList.remove('loading');

      e.target[target.selectedIndex].value = res[target.id][target.selectedIndex].value;
    
      formState.sum = (+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value);

      if (!sizeBlock.value || !materialBlock.value) {
        resultBlock.textContent = 'Выберите размер и материал';
      } else if (promocodeBlock.value) {
        formState.sum *= 0.7;
        resultBlock.textContent = formState.sum;
      } else {
        resultBlock.textContent = formState.sum;
      }
    }).catch(error => {
      console.log(error);
    }); 
  };

  sizeBlock.addEventListener("change", calcSum);
  materialBlock.addEventListener("change", calcSum);
  optionsBlock.addEventListener("change", calcSum);
  promocodeBlock.addEventListener("input", calcSum);
}

export default calcPrice;