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


// export const showItems = async function(){

//   var tutors = document.getElementById("HeadsOfPeerTutor");
//   tutors.innerHTML = "";

//   var row = document.createElement("div");
//   row.setAttribute('class', "row");

//   var name = document.createElement("h1");
//   name.innerHTML = "Ms. Ruff";
//   row.appendChild(name);

//   row.appendChild(document.createElement("br"));

//   var image = document.createElement("img");
//   image.src = "https://abrown111.github.io/peer-tutoring/Photos/ms%20ruff.png";
//   row.appendChild(image);

//   row.appendChild(document.createElement("br"));

//   var contact = document.createElement("p");
//   contact.innerHTML = "Email: aruff@stab.org";

//   row.appendChild(contact);

//   tutors.appendChild(row);

//   var row_2 = document.createElement("div");
//   row_2.setAttribute('class', "row");

//   var name = document.createElement("h1");
//   name.innerHTML = "Jake Kapp";
//   row_2.appendChild(name);

//   row_2.appendChild(document.createElement("br"));

//   var image = document.createElement("img");
//   image.src = "https://abrown111.github.io/peer-tutoring/Photos/jacob.png";
//   row_2.appendChild(image);

//   row_2.appendChild(document.createElement("br"));

//   var contact = document.createElement("p");
//   contact.innerHTML = "Email: jkapp24@students.stab.org";

//   row_2.appendChild(contact);

//   tutors.appendChild(row_2);

// }

// showItems();

export const showItems = async function () {
  const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
  var tutors = document.getElementById("tutors");
  tutors.innerHTML = "";
  // let link = document.createElement('link');

  //       // set the attributes for link element
  //       link.rel = 'stylesheet';

  //       link.type = 'text/css';

  //       link.href = 'style.css';
  //     tutors.appendChild(link);

  databaseItems.forEach((item) => {
    if (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase())) { //search bar for Tutors
      if (item.data().isAdmin == true) {
        if (similar(category_list, item.data().teachList) || category_list.length == 0) { //category check-list for Tutors
          var row = document.createElement("div");
          row.setAttribute('class', "row");

          var name = document.createElement("h1");
          name.innerHTML = item.data().firstName + " " + item.data().lastName.substring(0, 1) + ".";
          name.for = item.id;
          row.appendChild(name);

          // console.log(item.data().img);
          if (item.data().img != "") {

            var image = document.createElement("img");
            image.src = item.data().img;
            row.appendChild(image);
          }

          row.appendChild(document.createElement("br"));



          var email = document.createElement("p");
          email.innerHTML = item.data().email;
          email.for = item.id;
          row.appendChild(email);

          tutors.appendChild(row);



        }
      }
    }

    console.log(item.id);
  });

}

showItems();
