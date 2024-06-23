const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.handler = async function (event, context) {
    const data = JSON.parse(event.body);
    const { month, day, hour, name, color } = data;

    try {
        const db = admin.firestore();
        await db.collection('events').add({
            month,
            day,
            hour,
            name,
            color
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event added successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to add event', error: error.message })
        };
    }
};

