// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";


// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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


var userArray;
const user = localStorage.getItem("users");
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
}


// if(user==null){
//   window.location.href = "https://peer-tutor-app-1.timothygroves.repl.co/index.html";
// }else{
//    var userArray = user.split(" ");
// }

if(user!=null){
  var userArray = user.split(" ");
}

var databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));

// DELETE THIS VERY SOON
databaseItems.forEach((items) => {
  console.log(items);
});


async function removeTutor(id, name, isAdmins){
  let text = !isAdmins ? "Are you sure you want to remove " + name + " as a tutor?" : "Are you sure you want to remove " + name + " as an admin?"
  if(confirm(text)){
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isApproved: isAdmins ? true : false,
      isAdmin: false,
    });
    location.reload();
  }
}

async function promoteTutor(id, name){
  let text = "Are you sure you want to add " + name + " as an admin?"
  if(confirm(text)){
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isAdmin: true
    });
    location.reload();
  }
}


// show Tutors from firebase in the tiles on the screen
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
      if (item.data().isApproved == true) {
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


          var subject = document.createElement("p");
          subject.innerHTML = "Subject(s): " + item.data().subject;
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

          var calendar = document.createElement("button");
          calendar.innerText = "Calendar";
          calendar.addEventListener('click', () => {
            // if(!item.data().calendar.includes("https://www.") || !item.data().calendar.includes("https//")){
            //  window.location.href = "https://www." + item.data().calendar;
            // } else {
            window.location.href = item.data().calendar;
            // }
          });
          // if(!item.data().calendar.includes("https://www.") || !item.data().calendar.includes("https//")){
          // calendar.href = "https://www." + item.data().calendar;
          // } else {
          // calendar.href = item.data().calendar;
          // }
          // calendar.target = "_blank";
          row.appendChild(calendar);

          //row.appendChild(document.createElement("br"));

          // var experience = document.createElement("p");
          // experience.innerHTML = item.data().experience;
          // experience.for = item.id;
          // row.appendChild(experience);
          // row.appendChild(document.createElement("br"));

          var grade = document.createElement("p");
          grade.innerHTML = "Grade: " + item.data().grade;
          grade.for = item.id;
          row.appendChild(grade);

          if(admin){
            var remove = document.createElement("button");
            remove.innerText = !item.data().isAdmin ? "Remove tutor" : "Remove Admin";
            remove.addEventListener('click', () => {
              removeTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName), item.data().isAdmin);
            });
            var promote = document.createElement("button");
            promote.innerText = "Promote to Admin";
            promote.addEventListener('click', () => {
              promoteTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName), item.data().isAdmin);
            });
            row.appendChild(remove);
            if(!item.data().isAdmin){
              row.appendChild(promote);
            }
          }

          tutors.appendChild(row);



        }
      }
    }

    console.log(item.id + ", " + item.data().name);
  });

}

showItems();

//behind the scenes - checklist (creates a list that contains the clicked categories)
export const category_list_add = function () {
  category_list = []
  try {
    if (document.getElementById("math").checked) {
      category_list.push("Math")
    }
    if (document.getElementById("science").checked) {
      category_list.push("Science")
    }
    if (document.getElementById("language").checked) {
      category_list.push("Language")
    }
    if (document.getElementById("humanities").checked) {
      category_list.push("Humanities")
    }
    if (document.getElementById("computer science").checked) {
      category_list.push("Computer Science")
    }
  } catch (e) {
    console.log("error");
  }
  showItems();
}

// addDoc(collection(db, "peer-tutoring-signups"), {
//   username : "abrown24@students.stab.org",
//   password : "seanisntreal"
// });



category_list_add();


// rating_form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   console.log("hello");

//   let rating = document.getElementById("rate");


//   //creates tutor object from the above variables
//   submit_rate(rating);
// });

// export const submit_rate = function(rating) {
//   try{
//     const docRef = addDoc(collection(db, "peer-tutoring-signups"), {
//       rating: rating.value,
//     });
//   }
//   catch(e){
//     console.log("Error adding rating to the database: ", e);
//   }  
// }


//WIPES FIREBASE
//DO NOT RUN
// const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
//     var tutors = document.getElementById("tutors");
//     tutors.innerHTML="";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "peer-tutoring-signups", item.id));
//     });


function similar(list1, list2) {
  for (let i = 0; i < list1.length; i++) {

    // Loop for array2
    for (let j = 0; j < list2.length; j++) {

      // Compare the element of each and
      // every element from both of the
      // arrays
      if (list1[i] === list2[j]) {

        // Return if common element found
        return true;
      }
    }
  }

  // Return if no common element exist
  return false;
}