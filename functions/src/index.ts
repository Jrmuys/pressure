import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

const lat = 41.654282;
const lon = -91.568222;

export const scheduledWeatherData = functions.pubsub
  .schedule('*/5 * * * *')
  .onRun(async (context) => {
    const db = admin.firestore();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    try {
      let res = await axios.get(url);
      functions.logger.info(res);
      let data = res.data;
      functions.logger.log('Data:', data);
      await db.collection('weather').add(data);

      functions.logger.log(`Logged data correctly on ${new Date()}`);
      return null;
    } catch (error) {
      functions.logger.log(`Error logging data: ${error}`);
      return null;
    }
  });
