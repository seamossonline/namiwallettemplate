declare const window: any;
//const Blockfroster = require('@blockfrost/blockfrost-js');
//import { BlockFrostAPI } from '@blockfrost/blockfrost-js/lib' // using import syntax
console.log('index.ts import start');
import { NamiWalletApi } from 'nami-wallet-api'
import * as WASM_lib from '@emurgo/cardano-serialization-lib-browser'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'jquery';
import './css/cover.css'
import './css/style.css'
window.$ = window.jQuery = import("jquery");
import 'bootstrap/js/dropdown.js';
console.log('index.ts import end');
//import './main.js'; // Seamoss: this is important but running into errors pointint to package.json

//import './main.js';
// The request './main' failed to resolve only because it was resolved as fully specified


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
await Nami.enable()

let namiAddy = await Nami.getAddress();


console.log('Entering Blockfrost testing');
/*
const Blockfrost = require('@blockfrost/blockfrost-js');
// import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; // using import syntax

const API = new Blockfrost.BlockFrostAPI({
    projectId: 'mainnetqmneXXRBONof2IEtLePeDtNikLzRComX', // see: https://blockfrost.io
});

async function runExample() {
    try {
        const latestBlock = await API.blocksLatest();
        const networkInfo = await API.network();
        const latestEpoch = await API.epochsLatest();
        const health = await API.health();
        const address = await API.addresses(
            'addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz',
        );
        const pools = await API.pools({ page: 1, count: 10, order: 'asc' });

        console.log('pools', pools);
        console.log('address', address);
        console.log('networkInfo', networkInfo);
        console.log('latestEpoch', latestEpoch);
        console.log('latestBlock', latestBlock);
        console.log('health', health);
    } catch (err) {
        console.log('error', err);
    }
}

runExample();







let bfAssetsbyID = bfObject.assetsById('asset123ruftr0ph88c2klld54t9frzfn5xa4lyzwjjj');

console.log('bfUserAgent: ' + bfAssetsbyID);

//const Blockfrost = require('@blockfrost/blockfrost-js');



const BFAPI = new BlockFrostAPI({
    projectId: 'mainnetqmneXXRBONof2IEtLePeDtNikLzRComX', // see: https://blockfrost.io
});

console.log("Testing: Blockfrost metadata for Nami address.");
console.log(BFAPI.txsMetadata(namiAddy));
*/



/* ------------- Blockfrost API 
const Blockfrost = require('@blockfrost/blockfrost-js');
// import { BlockFrostAPI } from '@blockfrost/blockfrost-js'; // using import syntax

const API = new Blockfrost.BlockFrostAPI({
  projectId: 'YOUR API KEY HERE', // see: https://blockfrost.io
});
----------------------------------------------------------------------------  */

/* --------------- Blockfrost IPFS
const Blockfrost = require('@blockfrost/blockfrost-js');
// import { BlockFrostIPFS } from '@blockfrost/blockfrost-js'; // using import syntax

const IPFS = new Blockfrost.BlockFrostIPFS({
  projectId: 'YOUR IPFS KEY HERE', // see: https://blockfrost.io
});
----------------------------------------------------------------------------- */

async function toggleNami() {
    await Nami.enable()
    let nUTXOs = await Nami.getUtxos();
    console.log('Nami UTXOs: ', nUTXOs)
    printNami();
    alert('Nami ' + Nami + 'has been enabled.');
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
        let nAvailable = document.getElementById('walletInfoBox_avail');
        let nLocked = document.getElementById('walletInfoBox_locked');
        let nAssets = await Nami.getAssets();
        //let nAddress = await Nami.getAddress();
        nftPrint.innerHTML = "<h3>My Address</h3>";
        nftPrint.innerHTML += namiAddy;
        //nftPrint.innerHTML += "<h3>Balance</h3>"
        let nUTXOs = await Nami.getUtxos();
        let myBalance = nUTXOs[0].amount[0].quantity;
        let myLockedBalance = 0;
        let mCounter = 0;
        for (let utxoEntry of nUTXOs) {
            console.log(utxoEntry.amount[0].quantity + ' of ' + utxoEntry.amount[0].unit);
            //nftPrint.innerHTML += utxoEntry.amount[0].quantity;
            //nftPrint.innerHTML += utxoEntry.amount[0].unit + "(unit) <br />";
            if (mCounter != 0) {
                myLockedBalance += parseInt(utxoEntry.amount[0].quantity);
            }
            mCounter++;
        }
        nAvailable.innerHTML = (parseInt(myBalance) / 1000000).toFixed(4).toString();
        nLocked.innerHTML = (myLockedBalance / 1000000).toFixed(4).toString();
        // nftPrint.innerHTML += "Available: " + (parseInt(myBalance) / 1000000) + "<br />";
        // nftPrint.innerHTML += "Locked: " + (myLockedBalance / 1000000) + "<br />";

        nftPrint.innerHTML += "<h3>Iterate Assets</h3>";
        //let nftArray = [];
        for (let entry of nAssets) {
            console.log(entry); // 1, "string", false
            nftPrint.innerHTML += entry.unit.split('.')[1];
            nftPrint.innerHTML += "<br />"
        }
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