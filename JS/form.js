// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

var picture = "";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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

// Allows access to the form from the html page
let form = document.getElementById("tutorform");

const mathClasses = ["IM1", "IM2", "HIM2", "IM3", "HIM3", "IM4", "AB Calculus", "BC Calculus", "Multivariable Calculus", "Statistics"];
const scienceClasses = ["Advanced Physics", "Advanced Chemistry", "Advanced Biology", "AP Physics", "AP Chemistry", "Anatomy and Physiology"];
const languageClasses = ["Spanish 1", "Spanish 2", "Honors Spanish 2", "Spanish 3", "Honors Spanish 3", "Spanish 4", "AP Spanish", "Spanish 5", "Honors Spanish 5", "French 1", "French 2", "Honors French 2", "French 3", "Honors French 3", "French 4", "AP French", "French 5", "Honors French 5"];
const humanitiesClasses = ["English 9", "History 9", "Humanities 10", "American Studies", "Peer Writing"];
const csClasses = ["Computer Science Principles", "Data Structures"];
var user = localStorage.getItem("users");
var userArray;
if(user==null){
  window.location.href = "https://abrown111.github.io/peer-tutoring/HTML/index.html";
}else{
   userArray = user.split(" ");
}

let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
if(userArray[1] != 'undefined'){
  lastName.value = userArray[1];
}
firstName.value = userArray[0];

if (Math.floor(Math.random() * 1000) == 1) {
  document.body.style.background = "url(https://raw.githubusercontent.com/Abrown111/peer-tutoring/main/Photos/STAB%20Alumni2.JPG) no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
} else {
  document.body.style.background = "url(https://abrown111.github.io/peer-tutoring/Photos/Sunset.JPG) no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
}


var expandedOptions = false;
var expandedMath = false;
var expandedScience = false;
var expandedLanguage = false;
var expandedHumanities = false;
var expandedCs = false;

document.getElementById("options").addEventListener("click", showOptions);
document.getElementById("mathButton").addEventListener("click", showMath);
document.getElementById("scienceButton").addEventListener("click", showScience);
document.getElementById("languageButton").addEventListener("click", showLanguage);
document.getElementById("humanitiesButton").addEventListener("click", showHumanities);
document.getElementById("csButton").addEventListener("click", showComputerScience);

function showOptions() {
  var checkboxes = document.getElementById("checkboxes");
  var math = document.getElementById("math");
  var science = document.getElementById("science");
  var language = document.getElementById("language");
  var humanities = document.getElementById("humanities");
  var cs = document.getElementById("computer science");
  if (!expandedOptions) {
    math.style.display = "none";
    science.style.display = "none";
    language.style.display = "none";
    humanities.style.display = "none";
    cs.style.display = "none";
    checkboxes.style.display = "block";
    expandedOptions = true;

  } else {
    checkboxes.style.display = "none";

    expandedOptions = false;
  }
}

function showMath() {
  var math = document.getElementById("math");
  if (!expandedMath) {
    math.style.display = "block";
    expandedMath = true;
  } else {
    math.style.display = "none";
    expandedMath = false;
  }
}

function showScience() {
  var science = document.getElementById("science");
  if (!expandedScience) {
    science.style.display = "block";
    expandedScience = true;
  } else {
    science.style.display = "none";
    expandedScience = false;
  }
}

function showLanguage() {
  var language = document.getElementById("language");
  if (!expandedLanguage) {
    language.style.display = "block";
    expandedLanguage = true;
  } else {
    language.style.display = "none";
    expandedLanguage = false;
  }
}

function showHumanities() {
  var humanities = document.getElementById("humanities");
  if (!expandedHumanities) {
    humanities.style.display = "block";
    expandedHumanities = true;
  } else {
    humanities.style.display = "none";
    expandedHumanities = false;
  }
}

function showComputerScience() {
  var cs = document.getElementById("computer science");
  if (!expandedCs) {
    cs.style.display = "block";
    expandedCs = true;
  } else {
    cs.style.display = "none";
    expandedCs = false;
  }
}


//Runs the below code when form is submitted
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  let mathTeach = false;
  let scienceTeach = false;
  let humanitiesTeach = false;
  let languageTeach = false;
  let csTeach = false;


  //sets js variables from the form
  let subjectList = [];
  for (let i = 0; i < mathClasses.length; i++) {
    if (document.getElementById(mathClasses[i].toString()).checked) {
      subjectList.push(mathClasses[i]);
      mathTeach = true;
    }
  }

  for (let i = 0; i < scienceClasses.length; i++) {
    if (document.getElementById(scienceClasses[i].toString()).checked) {
      subjectList.push(scienceClasses[i]);
      scienceTeach = true;
    }
  }

  for (let i = 0; i < languageClasses.length; i++) {
    if (document.getElementById(languageClasses[i].toString()).checked) {
      subjectList.push(languageClasses[i]);
      languageTeach = true;
    }
  }

  for (let i = 0; i < humanitiesClasses.length; i++) {
    if (document.getElementById(humanitiesClasses[i].toString()).checked) {
      subjectList.push(humanitiesClasses[i]);
      humanitiesTeach = true;
    }
  }

  for (let i = 0; i < csClasses.length; i++) {
    if (document.getElementById(csClasses[i].toString()).checked) {
      subjectList.push(csClasses[i]);
      csTeach = true;
    }
  }
  let teachList = [];
  if (mathTeach) {
    teachList.push("Math");
  }

  if (scienceTeach) {
    teachList.push("Science");

  }
  if (languageTeach) {
    teachList.push("Language");

  }
  if (humanitiesTeach) {
    teachList.push("Humanities");

  }
  if (csTeach) {
    teachList.push("Computer Science");

  }

  //alert(teachList);
  let subject = subjectList.join(", ");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let description = document.getElementById("description");
  let calendar = document.getElementById("calendar");
  let grade = document.getElementById("grade");

  //creates tutor object from the above variables
  await addTutor(subject, firstName, lastName, description, calendar, grade, teachList);
  window.location.href = "https://abrown111.github.io/peer-tutoring/HTML/main_page.html";

});

//adds the tutor to the firebase
async function addTutor(subject, firstName, lastName, description, calendar, grade, teachList) {
  await setDoc(doc(db, "peer-tutoring-signups", userArray[2]), {
    subject: subject,
    firstName: firstName.value,
    lastName: lastName.value,
    email: userArray[2],
    description: description.value,
    calendar: calendar.value,
    grade: grade.value,
    img: picture,
    isRequested: true,
    isApproved: false,
    teachList: teachList
  });
}



const fileInput = document.getElementById('file');

// Lister to the change event on the <input> element
fileInput.addEventListener('change', (event) => {
  // Get the selected image file
  const imageFile = event.target.files[0];

  if (imageFile) {
    const reader = new FileReader();

    // Convert the image file to a string
    reader.readAsDataURL(imageFile);

    // FileReader will emit the load event when the data URL is ready
    // Access the string using result property inside the callback function
    reader.addEventListener('load', () => {
      // Get the data URL string
      picture = reader.result;
      document.getElementById("output").src = picture;
    });
  }
});