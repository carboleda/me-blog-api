'use-strict'

const cors = require('cors')({
    origin: true
});
const functions = require('firebase-functions');
const meCv = require('./src/me-cv');
const slides = require('./src/slides');
const medium = require('./src/medium');

module.exports = {
    me: functions.https.onRequest((request, response) => {
        cors(request, response, async () => {
            try {
                response.send(await meCv.request());
            } catch (error) {
                console.error(error);
                response.status(500).send(error);
            }
        });
    }),
    slides: functions.https.onRequest((request, response) => {
        cors(request, response, async () => {
            try {
                response.send(await slides.request());
            } catch (error) {
                console.error(error);
                response.status(500).send(error);
            }
        });
    }),
    medium: functions.https.onRequest((request, response) => {
        cors(request, response, async () => {
            try {
                response.send(await medium.request(request.query.author));
            } catch (error) {
                console.error(error);
                response.status(500).send(error);
            }
        });
    })
}
