const admin = require("firebase-admin");
const serviceAccount ={
  "type": "service_account",
  "project_id": "laser-59e50",
  "private_key_id": process.env.KEY_ID,
  "private_key": process.env.KEY_VAL,
  "client_email": "firebase-adminsdk-4c1ot@laser-59e50.iam.gserviceaccount.com",
  "client_id": "112737924148974684464",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4c1ot%40laser-59e50.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "laserpay-59e50.appspot.com",
  databaseURL: "https://laserpay-59e50.firebaseio.com" 
});

const auth = admin.auth();
const storage = admin.storage();
const bucket = storage.bucket();
const db = admin.firestore();

module.exports = {auth, bucket,db };
