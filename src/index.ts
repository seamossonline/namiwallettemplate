declare const window: any;

import { NamiWalletApi } from 'nami-wallet-api'
import * as WASM_lib from '@emurgo/cardano-serialization-lib-browser'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'jquery';
import './css/cover.css'
import './css/style.css'
window.$ = window.jQuery = import("jquery");
import 'bootstrap/js/dropdown.js';

/*
const getNaddressData = {
    address: 'addr_test1qpg2ee7ctk6r07kdujuc95wcy2uggsmf3yu54ed5pwthr3drpt7vh9vv0yjgvv5llax4xyp3rmgnzdc9yz6mhanv92aqd4nw5n',
    amount: 1
}
*/ // Seamoss: no longer using to auth

let Nami = await NamiWalletApi(  //Seamoss: was const not let //Seamoss: was global, not nested in toggleNami
    window.cardano,
    "mainnetqmneXXRBONof2IEtLePeDtNikLzRComX",
    WASM_lib
)

async function toggleNami() {
    await Nami.enable()
    let nUTXOs = Nami.getUtxos();
    console.log('Nami UTXOs: ', nUTXOs)
    printNami();
    alert('Nami has been enabled.');
    console.log('nami isEnabled', await Nami.isEnabled())
    console.log('Nami', Nami)
    console.log('Nami.getUtxos', await Nami.getUtxos())
    getNaddress();
    isNamiBtnOn();
}


async function isNamiBtnOn() {
    if (await Nami.isEnabled()) {
        const activatedButton = document.getElementById('namiBtn1')
        activatedButton?.classList.add('linkerButton-connected');
        activatedButton?.classList.remove('linkerButton');
    }
}

async function getNaddress() {
    let txHash = await Nami.getAddress();
    console.log('User tx address: ', txHash);
}


async function getNAssets() {
    let nAssets = await Nami.getAssets();
    console.log('User assets: ', nAssets);
    alert(nAssets);
}


const namiButton = document.getElementById('namiBtn1')
namiButton?.addEventListener('click', toggleNami);

const showAssButton = document.getElementById('showAssBtn')
showAssButton?.addEventListener('click', getNAssets);

isNamiBtnOn(); // initial button color change if already connected

async function printNami() {
    if (Nami.isEnabled()) { //print assets
        const nftPrint = document.getElementById('walletInfoBox_assets');
        let nAssets = await Nami.getAssets();
        let nAddress = await Nami.getAddress();
        nftPrint.innerHTML = "<h3>Assets</h3>";
        nftPrint.innerHTML += nAssets;
        nftPrint.innerHTML += "<h3>My Address</h3>";
        nftPrint.innerHTML += nAddress;
    }
}

if (Nami.isEnabled()) {
    printNami();
}


/*
let walletProfileBoxData = document.getElementById('walletInfoBox')
walletProfileBoxData.innerHTML = '<b>TEST HTML INJECTION AREA</b><ul>';
if (await Nami.isEnabled()) {
    walletProfileBoxData?.innerHTML += '<li>Nami enabled: True: </li>';
}
walletProfileBoxData?.innerHTML += '</ul>';
*/

async function getComponent() {
    const element = document.createElement('script');
    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component);
});