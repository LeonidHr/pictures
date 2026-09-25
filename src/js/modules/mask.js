
const mask = (selector) => {
  
  const setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else {
      elem.selectionStart = elem.selectionEnd = pos;
    }
  };

  function createMask(event) {
    let matrix = '+38 (0__) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    if (!val.startsWith(def)) {
      val = normilizePhone(this.value);
    }

    this.value = matrix.replace(/./g, function(a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }
    });

    if (event.type === 'blur') {
      if (this.value.length === 4) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }

    console.log(this.value.length);
  }

  function normilizePhone(val) {
    let digits = val.replace(/\D/, '');
  
    if (digits.startsWith('0')) {
      digits = '38' + digits;
    }

    if (digits.length === 9) {
      digits = '380' + digits;
    }

    return digits;
  }

  const inputs = document.querySelectorAll(selector);

  inputs.forEach(inp => {
    inp.addEventListener("focus", createMask);
    inp.addEventListener("click", createMask);
    inp.addEventListener("input", createMask);
    inp.addEventListener("blur", createMask);
  });
}

export default mask;