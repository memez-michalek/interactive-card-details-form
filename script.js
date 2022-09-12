cardNumberRegex =  /\d{4}\W\d{4}\W\d{4}\W\d{4}/;
button = document.querySelector('.button');
console.log('chuj');

function blankErrorHandler(error){
    let errors = new Map([
        ['cardholder-name-input', 'cardholder-name-input-error'],
        ['cardnumber-input', 'cardnumber-input-error'],
        ['expiration-month', 'expiration-month-error'],
        ['expiration-year', 'expiration-year-error'],
        ['form-cvv', 'form-cvv-error'],
    ])
    if(error === 'expiration-year' && document.getElementById('expiration-month-error-text').style.display === 'block'){
        errorFieldName = errors.get(error);
        document.getElementById(error).parentElement.id = errorFieldName;
        errorFieldName = errorFieldName + '-text'
    }else{
        errorFieldName = errors.get(error);
        document.getElementById(error).parentElement.id = errorFieldName;
        errorFieldName = errorFieldName + '-text'
        document.getElementById(errorFieldName).style.display = 'block';
    }
}
function cardNumberErrorHandler(error){
    console.log(error);
    document.getElementById(error).parentElement.id = 'cardnumber-input-error';
    document.getElementById('cardnumber-input-value-error-text').style.display = 'block';
    document.getElementById('cardnumber-input-error-text').style.display = 'none';

}



function setValues(){
    cardNameComponent = document.querySelector('.card-name');
    cardNumberComponent = document.querySelector('.card-number');
    cardYearComponent = document.querySelector('.card-year');
    cardMonthComponent = document.querySelector('.card-month');
    cardCvvComponent = document.querySelector('.card-cvv');

    formValues = document.getElementsByTagName('input');
    errorCount = 0;
    for (let i=0; i<formValues.length; i++){
        switch (formValues[i].id){
            case 'cardholder-name-input':
                cardNameComponent.textContent = formValues[i].value;
                if (formValues[i].value === ""){
                    errorCount += 1;
                    blankErrorHandler(formValues[i].id);
                }else if(formValues[i].parentElement.id === 'cardholder-name-input-error'){
                    formValues[i].parentElement.id = 'input-border';
                    document.getElementById('cardholder-name-input-error'+'-text').style.display = 'none';
                    errorCount -= 1;
                }
                break;
            
            case 'cardnumber-input':
                cardNumberComponent.textContent = formValues[i].value;
                console.log(formValues[i].value);
                console.log(cardNumberRegex.test(formValues[i].value));
                console.log(formValues[i].parentElement.id);
                if (formValues[i].value === ""){
                    errorCount += 1;
                    blankErrorHandler(formValues[i].id);
                }else if(cardNumberRegex.test(formValues[i].value) === false){
                    errorCount += 1;
                    cardNumberErrorHandler(formValues[i].id);
                }else if(formValues[i].parentElement.id === 'cardnumber-input-error' ||
                        formValues[i].parentElement.id === 'cardnumber-input-value-error-text' &&
                        cardNumberRegex.test(formValues[i].value) === true){
                            formValues[i].parentElement.id = 'input-border';
                            document.getElementById('cardnumber-input-value-error-text').style.display = 'none';
                            document.getElementById('cardnumber-input-error-text').style.display = 'none';
                }
                break;
                
            case 'expiration-month':
                cardMonthComponent.textContent = formValues[i].value;
                if (formValues[i].value === ""){
                    errorCount += 1;
                    blankErrorHandler(formValues[i].id);
                }else if(formValues[i].parentElement.id === 'expiration-month-error'){
                    formValues[i].parentElement.id = 'expiration-border';
                    document.getElementById('expiration-month-error'+'-text').style.display = 'none';
                    errorCount -= 1;
                }
                break;
            case 'expiration-year':
                cardYearComponent.textContent = formValues[i].value;
                if (formValues[i].value === ""){
                    errorCount += 1;
                    blankErrorHandler(formValues[i].id);
                }else if(formValues[i].parentElement.id === 'expiration-year-error'){
                    formValues[i].parentElement.id = 'expiration-border';
                    document.getElementById('expiration-year-error'+'-text').style.display = 'none';
                    errorCount -= 1;
                }
                break;
                
            
            case 'form-cvv':
                cardCvvComponent.textContent = formValues[i].value;
                if (formValues[i].value === ""){
                    errorCount += 1;
                    blankErrorHandler(formValues[i].id);
                }else if(formValues[i].parentElement.id === 'form-cvv-error'){
                    formValues[i].parentElement.id = 'cvv-border';
                    document.getElementById('form-cvv-error'+'-text').style.display = 'none';
                    errorCount -= 1;
                }
                break;
            
            default:
                errorCount = 0;
            
        }
    }
    
    nameError = document.getElementById('cardholder-name-input-error')
    cardnumberError = document.getElementById('cardnumber-input-error')
    monthError = document.getElementById('expiration-month-error')
    yearError = document.getElementById('expiration-year-error')
    cvvError = document.getElementById('form-cvv-error')
    console.log(nameError)
    if(nameError === null && cardnumberError === null && monthError === null && yearError === null && cvvError === null){
        return true;
    }else{
        console.log('jebany chieef keef dobre gowno tworzy')
        return false;
    }

}


button.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(e);
    if (setValues() === true){
        document.getElementById('details-container').style.display = 'none';
        document.getElementById('thanks').style.display = 'flex';
    }

})

