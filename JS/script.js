// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc, getDocFromCache } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkMRH4q98KMR8oZvqlT1mIKpWFm8qnVMM",
  authDomain: "peer-tutoring-4337a.firebaseapp.com",
  projectId: "peer-tutoring-4337a",
  storageBucket: "peer-tutoring-4337a.appspot.com",
  messagingSenderId: "289661482327",
  appId: "1:289661482327:web:5ff58469a93a0f83087a12"
};

const CLIENT_ID = '193920940178-62d8gll3mdr1nqis39ikher0map18abe.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBe4Ldpan-rsUgfFLKJiXRGRBB433fCMts';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest', 'https://sheets.googleapis.com/$discovery/rest?version=v4', 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];


// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';


let tokenClient;
let gapiInited = false;
let gisInited = false;

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOC,
  });
  gapiInited = true;
}

export const gapiLoaded = function () {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after Google Identity Services are loaded.
 */
export const gisLoaded = function () {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
var userStuff;


var form = document.getElementById("form");

var loginForm = document.getElementById("form");

export const signIn = async function () {
  const auth = getAuth();
  var d = 0;
  var result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  console.log(await getDocData(user.email));
  var me = await getDocData(user.email);
  var info = String(user.displayName.split(" ")[0]) + " " + String(user.displayName.split(" ")[1]) + " " + String(user.email);
  var c;

  if (me) {
    c = 1;
    localStorage.setItem("users", info);
  } else {
    c = 1;
    localStorage.setItem("users", info);
    await setUserData(user);
  }
  if (c == 1) {
    if (localStorage.getItem("users").split(" ")[2] == 'peertutoring@stab.org') {
      handleAuthClick();
      d = 1;
    } else {
      window.location.href = "https://abrown111.github.io/peer-tutoring/HTML/main_page.html";
    }
  }
  if (d == 1) {
    setTimeout(() => { window.location.href = "https://abrown111.github.io/peer-tutoring/HTML/main_page.html" }, 1000);
  }
}

async function getDocData(user) {
  var d = await getDoc(doc(db, "peer-tutoring-signups", user));
  return d.exists();
}

async function setUserData(user) {
  var lastName;
  if (user.displayName.split(" ")[1] == undefined) {
    lastName = '';
  } else {
    lastName = user.displayName.split(" ")[1];
  }

  await setDoc(doc(db, "peer-tutoring-signups", user.email), {
    subject: '',
    firstName: user.displayName.split(" ")[0],
    lastName: lastName,
    email: user.email,
    description: '',
    experience: '',
    grade: '',
    img: '',
    isRequested: false,
    isApproved: false,
    isAdmin: false
  });
  return user;
}