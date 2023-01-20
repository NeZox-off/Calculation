const anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

const anInitialFeeRange =   document.getElementById('an-initial-fee-range'),
      anInitialTermRange = document.getElementById('credit-term-range');  

const totalAmoutOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment');
        
const inputsRange = document.querySelectorAll('.input-range');


const assignValue = () => {
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = anInitialTermRange.value;
}

for(let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(anInitialFee.value, creditTerm.value);
    })
}

assignValue();

const btnOpenConfig = document.getElementById('open-configure'),
      wrapperModal = document.getElementById('wrapper-modal'),
      overlay = document.getElementById('overlay');

const saveConfig = document.getElementById('saveConfiguration'),
      cancelConfig = document.getElementById('cancelConfiguration');


btnOpenConfig.addEventListener('click', () => {
    wrapperModal.classList.add('active');
})

const closeModal = () => {
    wrapperModal.classList.remove('active');
}

overlay.addEventListener('click', closeModal);
saveConfig.addEventListener('click', closeModal);
cancelConfig.addEventListener('click', closeModal);



const cars = document.querySelectorAll('.car'),
      dots = document.querySelectorAll('.dot');


const currentPrecent = 8.7;

let totalPriceOfConfiguration = 0;
const additionalAmount = document.getElementById('additionalAmount');
additionalAmount.innerHTML = totalPriceOfConfiguration;

const priceOfAuto = 700000;
const priceOfAutoElement = document.getElementById('priceOfAuto');
priceOfAutoElement.innerHTML = priceOfAuto;

const pricesOfColors = {
    blue: 0,
    brown: 3000,
    orange: 4000,
    pink: 7000,
    red: 10000,
}

let currentPricesOfColor = pricesOfColors.blue;

const activeColor = color => {
    for(car of cars) {
        car.classList.remove('active');
    }
    for(dot of dots) {
        dot.classList.remove('active');
    }

    Array.from(cars).filter(item => {
        return item.dataset.color === color;
    }).forEach(item => {
        item.classList.add('active');
    });

    currentPricesOfColor = pricesOfColors[`${color}`];
    checkTotalPriceOfConfiguration();
};

for(dot of dots) {
    dot.addEventListener('click', e => {
        e.target.classList.add('active');
   });
};

const engine = document.getElementById('engine');
      complectation = document.getElementById('complectation');

const checkTotalPriceOfConfiguration = () => {
    totalPriceOfConfiguration = +(engine.value) + + (complectation.value) + currentPricesOfColor;
    additionalAmount.innerHTML = totalPriceOfConfiguration;
    calculation(anInitialFee.value, creditTerm.value);
}

engine.addEventListener('change', checkTotalPriceOfConfiguration);
complectation.addEventListener('change', checkTotalPriceOfConfiguration);
saveConfig.addEventListener('click', checkTotalPriceOfConfiguration);


const calculation = (anInitialFee = 100000, creditTerm = 1) => {

    const amountOfPrecents = (((priceOfAuto + totalPriceOfConfiguration) - anInitialFee) * currentPrecent) / 100;
    const totalPriceOfCredit = (priceOfAuto + totalPriceOfConfiguration) - anInitialFee + amountOfPrecents;

    const numbOfMonth = 12 * creditTerm;
    const monthlyPayment = totalPriceOfCredit / numbOfMonth;

    if(totalPriceOfCredit < 0) {
        return false;
    } else {
        totalAmoutOfCredit.innerHTML = Math.round(totalPriceOfCredit);
        totalMonthlyPayment.innerHTML = Math.round(monthlyPayment);
    }

}

calculation();
