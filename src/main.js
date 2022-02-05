//import logMessage from './js/logger.js'  //Seamoss: commented out this original for the below.
import logMessage from './logger.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'jquery';
import './css/cover.css'
import regeneratorRuntime from "regenerator-runtime";
window.$ = window.jQuery = import("jquery");
import 'bootstrap/js/dropdown.js';
//import './index'; // Seamoss
//import './index.js'; // Seamoss]

// Seamoss: this main.js began with git repo 'namiwallettemplate' but is also integrating code that assumes a main.js from tutorial: https://stackabuse.com/a-sqlite-tutorial-with-node-js/
console.log('Entering SQLite portion of main.js');

const Promise = require('bluebird')
const AppDAO = require('../dao') // Seamoss: was ./dao, but the original namiwallettemplate repo has main.js under /src, so leaving it there and updating references.
const ProjectRepository = require('../project_repository')  //Seamoss: updating references
const TaskRepository = require('../task_repository')  //Seamoss: updating references
//////////////////// SQLite tutorial code continues
function mains() {
    const dao = new AppDAO('../database.sqlite3')
    const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' }
    const projectRepo = new ProjectRepository(dao)
    const taskRepo = new TaskRepository(dao)
    let projectId

    projectRepo.createTable()
        .then(() => taskRepo.createTable())
        .then(() => projectRepo.create(blogProjectData.name))
        .then((data) => {
            projectId = data.id
            const tasks = [
                {
                    name: 'Outline',
                    description: 'High level overview of sections',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Write',
                    description: 'Write article contents and code examples',
                    isComplete: 0,
                    projectId
                }
            ]
            return Promise.all(tasks.map((task) => {
                const { name, description, isComplete, projectId } = task
                return taskRepo.create(name, description, isComplete, projectId)
            }))
        })
        .then(() => projectRepo.getById(projectId))
        .then((project) => {
            console.log(`\nRetreived project from database`)
            console.log(`project id = ${project.id}`)
            console.log(`project name = ${project.name}`)
            return taskRepo.getTasks(project.id)
        })
        .then((tasks) => {
            console.log('\nRetrieved project tasks from database')
            return new Promise((resolve, reject) => {
                tasks.forEach((task) => {
                    console.log(`task id = ${task.id}`)
                    console.log(`task name = ${task.name}`)
                    console.log(`task description = ${task.description}`)
                    console.log(`task isComplete = ${task.isComplete}`)
                    console.log(`task projectId = ${task.projectId}`)
                })
            })
            resolve('success')
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}



//////////////////// SQLite tutorial code ends (for now)



// Log message to console
const curent = window.location.pathname;
logMessage(window.location.pathname);

async function getComponent() {
    if (curent === "/") {
        const nami_lib = await import('nami-wallet-api');
        console.log('At least we are in main.js instead of only index.ts');
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
    export default mains; //Seamoss added
    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component);
});

