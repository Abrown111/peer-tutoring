// Import Firebase
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
 

// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyBkMRH4q98KMR8oZvqlT1mIKpWFm8qnVMM",
  authDomain: "peer-tutoring-4337a.firebaseapp.com",
  projectId: "peer-tutoring-4337a",
  storageBucket: "peer-tutoring-4337a.appspot.com",
  messagingSenderId: "289661482327",
  appId: "1:289661482327:web:5ff58469a93a0f83087a12"
  };

export const showItems = async function(){

    var tutors = document.getElementById("HeadsOfPeerTutor");
    tutors.innerHTML="";

    var row = document.createElement("div");
    row.setAttribute('class', "row");

    var name = document.createElement("h1");
    name.innerHTML = "Ms. Ruff";
    // name.for = "Ruff";
    row.appendChild(name);

    row.appendChild(document.createElement("br"));

    var contact = document.createElement("h1");
    contact.innterHTML = "Email: aruff@stab.org";
    // contact.for = "Ruff";

    row.appendChild(contact);

    row.appendChild(document.createElement("br"));

    var image = document.createElement("img");
    image.src = "https://abrown111.github.io/peer-tutoring/Photos/ms%20ruff.png";
    row.appendChild(image);

    

    tutors.appendChild(row);

    var row_2 = document.createElement("div");
    row_2.setAttribute('class', "row");

    var name = document.createElement("h1");
    name.innerHTML = "Jake Kapp";
    // name.for = "Jake";
    row_2.appendChild(name);

    row_2.appendChild(document.createElement("br"));

    var contact = document.createElement("h1");
    contact.innterHTML = "Email: jkapp24@students.stab.org";
    // contact.for = "Jake";

    row_2.appendChild(contact);

    row_2.appendChild(document.createElement("br"));

    var image = document.createElement("img");
    image.src = "https://abrown111.github.io/peer-tutoring/Photos/jacob.png";
    row_2.appendChild(image);

    

    tutors.appendChild(row_2);

  }

  showItems();
