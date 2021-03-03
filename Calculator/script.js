class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand =''
        this.previousOperand=''
        this.operation = undefined

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendnumber(number){
        if (number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
            
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // if (isNAN(prev) || isNAN(current)) return;

        switch(this.operation){
            case'+':
                computation = prev + current
                break

            case'-':
                computation = prev - current
                break

            case'/':
                computation = prev / current
                break

            case'*':
                computation = prev * current
                break

            default: 
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        // console.log('previous operand' +this.previousOperand)
        // console.log('compute function works')


    }

    updateDisplay(){

        this.currentOperandText.innerText = this.currentOperand

        if(this.operation != null) {
            this.previousOperandText.innerText =  
            this.previousOperand +' ' +this.operation
        }

        else 
        this.previousOperandText.innerText =  
        this.previousOperand

    }
}


const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => { button.addEventListener('click', () => {
    calculator.appendnumber(button.innerText)
    calculator.updateDisplay()
})

})


operationButtons.forEach(button => { button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})

})

equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button=>{ 
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button=> {
    calculator.delete()
    calculator.updateDisplay()
})