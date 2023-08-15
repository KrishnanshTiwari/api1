const admin = require("firebase-admin");
const serviceAccount ={
  "type": "service_account",
  "project_id": "laserpay-ab8f5",
  "private_key_id": process.env.KEY_ID,
  "private_key": process.env.KEY_VAL,
  "client_email": "firebase-adminsdk-mz5h9@laserpay-ab8f5.iam.gserviceaccount.com",
  "client_id": "102066734901470735469",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mz5h9%40laserpay-ab8f5.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "laserpay-ab8f5.appspot.com",
  databaseURL: "https://laserpay-ab8f5.firebaseio.com" 
});

const storage = admin.storage();
const bucket = storage.bucket();
const db = admin.firestore();

module.exports = { bucket,db };
