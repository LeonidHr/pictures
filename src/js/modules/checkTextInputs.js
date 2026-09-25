const checkTextInputs = (selector) => {
  const inputs = document.querySelectorAll(selector);

  inputs.forEach(inp => {
    inp.addEventListener("keydown", (e) => {
      if (e.key.length > 1) return;
      if (e.key.match(/[^а-яё 0-9]/ig)) {
        e.preventDefault();
      }
    });
 
    inp.addEventListener("input", e => {
      if (/[^а-яё 0-9]/ig.test(inp.value)) {
        inp.value = '';
        inp.focus;
      } 
    });
  });
}



export default checkTextInputs;