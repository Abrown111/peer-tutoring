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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var category_list = []
var username;
var encrypted_password;


const user = localStorage.getItem("users");
var admin = false;
if(user!=null){
  var userArray = user.split(" ");
}
if(user == 'Alex Brown alex.brown.6147@gmail.com'){
  admin = true;
  var nav = document.getElementsByClassName("menu")[0];
  var newLine = document.createElement("li");
  var newLink = document.createElement("a");
  newLink.href = "requests.html";
  newLink.innerHTML = "Requests";
  newLine.appendChild(newLink);
  nav.appendChild(newHeader);
}

// show Tutors from firebase in the tiles on the screen
export const showItems = async function () {
  const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
  // var tutor_requests = document.getElementById("tutor_requests");
  // tutor_requests.innerHTML = "";

  databaseItems.forEach(async (item) => {
    console.log(item.data().lastName);
    console.log(item.data().isRequested);
    if (item.data().isRequested && !item.data().isApproved) {
      console.log(item.data().firstName);

      var row = document.createElement("div");
      row.setAttribute('class', "row");

      var name = document.createElement("h1");
      name.innerHTML = item.data().firstName + " " + item.data().lastName;
      name.for = item.id;
      row.appendChild(name);


      var image = document.createElement("img");
      image.src = item.data().img;
      row.appendChild(image);

      row.appendChild(document.createElement("br"));


      var subject = document.createElement("p");
      subject.innerHTML = "Subject: " + item.data().subject;
      subject.for = item.id;
      row.appendChild(subject);
      //row.appendChild(document.createElement("br"));

      var description = document.createElement("p");
      description.innerHTML = "Bio: " + item.data().description;
      description.for = item.id;
      row.appendChild(description);
      //row.appendChild(document.createElement("br"));

      var email = document.createElement("p");
      email.innerHTML = "Email: " + item.data().email;
      email.for = item.id;
      row.appendChild(email);

      var calendar = document.createElement("a");
      calendar.innerHTML = "Calendar";
      calendar.href = item.data().calendar;
      row.append(calendar);


      var grade = document.createElement("p");
      grade.innerHTML = "Grade: " + item.data().grade;
      grade.for = item.id;
      row.appendChild(grade);

      tutor_requests.appendChild(row);

      var approveButton = document.createElement("button");
      approveButton.innerHTML = "Approve";
      approveButton.onclick = async function () {

        await handleApproval(item.id);
      };
      row.appendChild(approveButton);

      var denyButton = document.createElement("button");
      denyButton.innerHTML = "Deny";
      denyButton.onclick = async function () {

        await handleDenial(item.id);
      };
      row.appendChild(denyButton);

      tutor_requests.appendChild(row);
    }
  });
}

async function handleApproval(itemId) {
  //main page only displays things with isApproved = true
  await updateDoc(doc(db, "peer-tutoring-signups", itemId), {
    isApproved: true,
    isRequested: false
  });
  location.reload();

}


async function handleDenial(itemId) {
  // deleteDoc(doc(db, "peer-tutoring-signups", itemId));
  await updateDoc(doc(db, "peer-tutoring-signups", itemId), {
    isApproved: false,
    isRequested: false
  });
  location.reload();

}

showItems();
