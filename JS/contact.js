// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";


// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkMRH4q98KMR8oZvqlT1mIKpWFm8qnVMM",
  authDomain: "peer-tutoring-4337a.firebaseapp.com",
  projectId: "peer-tutoring-4337a",
  storageBucket: "peer-tutoring-4337a.appspot.com",
  messagingSenderId: "289661482327",
  appId: "1:289661482327:web:5ff58469a93a0f83087a12"
};

var userArray;
const user = localStorage.getItem("users");
if(user!=null){
  userArray = user.split(" ");
}
const userDoc = await getDoc(doc(db, "peer-tutoring-signups", userArray[2]));
var admin = false;
if(userDoc.data().isAdmin){
  admin = true;
  var nav = document.getElementsByClassName("menu")[0];
  var newLine = document.createElement("li");
  var newLink = document.createElement("a");
  newLink.href = "requests.html";
  newLink.innerHTML = "Requests";
  newLine.appendChild(newLink);
  nav.appendChild(newLine);
}

export const showItems = async function(){

  var tutors = document.getElementById("HeadsOfPeerTutor");
  tutors.innerHTML = "";

  var row = document.createElement("div");
  row.setAttribute('class', "row");

  var name = document.createElement("h1");
  name.innerHTML = "Ms. Ruff";
  row.appendChild(name);

  row.appendChild(document.createElement("br"));

  var image = document.createElement("img");
  image.src = "https://abrown111.github.io/peer-tutoring/Photos/ms%20ruff.png";
  row.appendChild(image);

  row.appendChild(document.createElement("br"));

  var contact = document.createElement("p");
  contact.innerHTML = "Email: aruff@stab.org";

  row.appendChild(contact);

  tutors.appendChild(row);

  var row_2 = document.createElement("div");
  row_2.setAttribute('class', "row");

  var name = document.createElement("h1");
  name.innerHTML = "Jake Kapp";
  row_2.appendChild(name);

  row_2.appendChild(document.createElement("br"));

  var image = document.createElement("img");
  image.src = "https://abrown111.github.io/peer-tutoring/Photos/jacob.png";
  row_2.appendChild(image);

  row_2.appendChild(document.createElement("br"));

  var contact = document.createElement("p");
  contact.innerHTML = "Email: jkapp24@students.stab.org";

  row_2.appendChild(contact);

  tutors.appendChild(row_2);

}

showItems();
