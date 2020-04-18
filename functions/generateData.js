'use-strict'

const meCv = require('./src/me-cv');
const slides = require('./src/slides');
const medium = require('./src/medium');

async function generate() {
    try {
        console.log('AUTHOR', process.env.AUTHOR);
        await meCv.generateData();
        await slides.generateData();
        await medium.generateData(process.env.AUTHOR);
    } catch (error) {
        console.error(error);
    }
}

generate();