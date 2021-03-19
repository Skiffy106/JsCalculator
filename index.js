class Calculator {
    constructor(prevOpTextElement, curOpTextElement) {
        this.prevOp = prevOpTextElement;
        this.curOp = curOpTextElement;
        this.clear();
    }

    clear() {
        this.curOp = '';
        this.prevOp = '';
        this.opp = undefined;
        curOpTextElement.innerText = '';
        prevOpTextElement.innerText = '';
    }

    delete() {
        this.curOp = this.curOp.toString().slice(0, -1);
    }

    appendNum(num) {
        if (num == '.' && this.curOp.includes('.')) return;
        this.curOp = this.curOp.toString() + num.toString();
    }

    chooseOpp(opp) {
        if (this.curOp == '') return;
        if (this.prevOp !== '') {
            this.compute();
        }
        this.opp = opp;
        this.prevOp = this.curOp;
        this.curOp = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOp);
        const cur = parseFloat(this.curOp);
        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.opp) {
            case '+':
                computation = prev + cur;
                break;
            case '-':
                computation = prev + cur;
                break;
            case '*':
                computation = prev * cur;
                break;
            case '÷':
                computation = prev / cur;
                break;
            default:
                return;
        }
        this.curOp = computation;
        this.opp = undefined;
        this.prevOp = '';
    }

    getDisplayNumber(num) {
        //const stringNum = num.toString();
        //const integerDig = parseFloat(stringNum.split('.')[0]);
        //const decimalDig = parseFloat(stringNum.split('.')[1]);
        const floatNum = parseFloat(num);
        if (isNaN(floatNum)) return '';
        return floatNum.toLocaleString('en');
    }

    updateDisplay() {
        curOpTextElement.innerText = this.getDisplayNumber(this.curOp);
        if (this.opp != null) {
            prevOpTextElement.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.opp}`;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOpTextElement = document.querySelector('[data-prev-op]');
const curOpTextElement = document.querySelector('[data-cur-op]');

const calc = new Calculator(prevOpTextElement, curOpTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText);
        calc.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOpp(button.innerText);
        calc.updateDisplay();
    })
});

equalsButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});
