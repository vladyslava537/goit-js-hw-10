import { PREP_TIME } from './js/menu'

const forma = document.querySelector('.form');
const list = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
};

const addOrderRow = (drink) => {
    const newItem = document.createElement('li');
    newItem.classList.add('row-pending');
    newItem.textContent = `⏳${drink} · у роботі`;

    list.append(newItem);
    return newItem;
};

forma.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const drink = formData.get('drink');
    const state = formData.get('state');

    const delay = PREP_TIME[drink];
    const shouldResolve = state === "fulfilled";
    const row = addOrderRow(drink);

    makeOrder(delay, shouldResolve)
        .then((delay) => {
            row.classList.replace('row-pending', 'row-ok');
            row.textContent = `✅ ${drink} · готове · ${delay} ms`;
        })
        .catch((delay) => {
            row.classList.replace('row-pending', 'row-err');
            row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
        })
        .finally(() => {
            row.textContent += ` · ${new Date().toLocaleTimeString("uk-UA")}`;
        }) 
})