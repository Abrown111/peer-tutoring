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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const user = localStorage.getItem("users");
var userArray;
var userDoc;
if(user!=null){
  userArray = user.split(" ");
  userDoc = await getDoc(doc(db, "peer-tutoring-signups", userArray[2]));
}
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
  var drop = document.getElementById("myDropdown");
  var link = document.createElement("a");
  link.href = "requests.html";
  link.innerHTML = "Requests";
  drop.appendChild(link);
}

if(window.innerWidth < 600) {
  document.getElementsByClassName("dropdownnav")[0].style.display = "inline-block";
  document.getElementsByClassName("navbar")[0].style.visibility = "hidden";
} else {
  document.getElementsByClassName("navbar")[0].style.display = "flex";
  document.getElementsByClassName("dropdownnav")[0].style.visibility = "hidden";
}

document.getElementById("dropbutton").addEventListener("click", showDropdown);

function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

async function removeTutor(id, name){
  let text = "Are you sure you want to remove " + name + "'s profile?";
  if(confirm(text)){
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isApproved: false,
      isAdmin: false
    });
    location.reload();
  }
}

export const showItems = async function () {
  const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
  var tutors = document.getElementById("tutors");
  tutors.innerHTML = "";
  databaseItems.forEach((item) => {
      if (item.data().isAdmin == true && item.data().email!='peertutoring@stab.org') {
          var row = document.createElement("div");
          row.setAttribute('class', "row");
          var name = document.createElement("h1");
          name.innerHTML = item.data().firstName + " " + item.data().lastName.substring(0, 1) + ".";
          name.for = item.id;
          row.appendChild(name);
          if (item.data().img != "") {
            var image = document.createElement("img");
            image.src = item.data().img;
            row.appendChild(image);
          }
          row.appendChild(document.createElement("br"));

          var email = document.createElement("a");
          email.innerHTML = item.data().email;
          email.for = item.id;
          email.href = "mailto:" + item.data().email;
          row.appendChild(email);

          if(admin && item.data().home == false){
            row.appendChild(document.createElement("br"));
            row.appendChild(document.createElement("br"));
            var remove = document.createElement("button");
            remove.innerText =  "Remove profile";
            remove.addEventListener('click', () => {
              removeTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName));
            });
            row.appendChild(remove);
          }
          tutors.appendChild(row);
    }
  });
}

showItems();
