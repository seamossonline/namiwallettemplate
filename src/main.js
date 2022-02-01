import logMessage from './js/logger.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'jquery';
import './css/cover.css'
import regeneratorRuntime from "regenerator-runtime";
window.$ = window.jQuery = import("jquery");
import 'bootstrap/js/dropdown.js';

// Log message to console
const curent = window.location.pathname;
logMessage(window.location.pathname);

async function getComponent() {
    if (curent === "/") {
        const nami_lib = await import('nami-wallet-api');
    }
    if (curent === "/buy.html") {
        const { default: single } = await import('./js/wallet/coinSelection.mjs');
        const { default: buy } = await import('./js/wallet/buy.mjs');
    }
    if (curent === "/mint.html") {
        const app = await import('./js/mint/app.mjs');
        async function activateCardano() {
            const promise = await cardano.nami.enable()
            $("#connectBtn").text('Connected');
            $("#connectBtn").attr('class', 'btn btn-success');
        }
        activateCardano();
        $("#mintbtn").on('click', async () => {
            console.log('mint');
        });
        console.log('this is mint.js');
    }
    if (curent === "/single.html") {
        const select = await import('./js/assets/select.mjs');
        const { default: app } = await import('./js/assets/app.mjs');
    }
    const element = document.createElement('script');
    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component);
});
