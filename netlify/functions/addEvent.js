const admin = require('firebase-admin');
const serviceAccount = require('./netlify/functions/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.handler = async (event, context) => {
    const eventData = JSON.parse(event.body);
    const { month, day, hour, eventName, color } = eventData;

    try {
        await db.collection('events').add({
            month,
            day,
            hour,
            eventName,
            color
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Evento creado exitosamente' })
        };
    } catch (error) {
        console.error('Error al guardar el evento:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al guardar el evento' })
        };
    }
};
