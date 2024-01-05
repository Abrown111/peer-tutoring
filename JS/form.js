// Import Firebase
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
 
var picture = "";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var category_list = []

// Allows access to the form from the html page
let form = document.getElementById("tutorform");
const user = localStorage.getItem("users");
const subjects = [ "math", "humanities", "computer science", "science", "language"];
const mathClasses = ["IM1", "IM2", "HIM2", "IM3", "HIM3", "IM4", "AB Calculus", "BC Calculus", "Multivariable Calculus", "Statistics"];
const scienceClasses = ["Advanced Physics", "Advanced Chemistry", "Advanced Biology", "AP Physics", "AP Chemistry", "Anatomy and Physiology"];
const languageClasses = ["Spanish 1", "Spanish 2", "Honors Spanish 2", "Spanish 3", "Honors Spanish 3", "Spanish 4", "AP Spanish", "Spanish 5", "Honors Spanish 5", "French 1", "French 2", "Honors French 2", "French 3", "Honors French 3", "French 4", "AP French", "French 5", "Honors French 5"];
const humanitiesClasses = ["English 9", "History 9", "Humanities 10", "American Studies", "Peer Writing"];
const csClasses = ["Computer Science Principles", "Data Structures"];
var userArray;
if(user==null){
  window.location.href = "https://peer-tutor-app-1.timothygroves.repl.co/index.html";
}else{
   userArray = user.split(" ");
}

let lastName = document.getElementById("lastName");
lastName.value = user[1];

  // alert("test");
  // let firstName = document.getElementById("firstName");
  // let lastName = document.getElementById("lastName");
  // firstName.value = "test";
  // lastName.value = user.displayName.split(" ")[1];

//runs the below code when form is submitted
  form.addEventListener("submit", (e) => {

    e.preventDefault();

//sets js variables from the form
  //let list1 = document.getElementById("subject");
    let subjectList = [];
    for(let i = 0; i < mathClasses.length; i++){
      if(document.getElementById(mathClasses[i].toString()).checked){
        subjectList.push(mathClasses[i]);
        
      }
    }

    for(let i = 0; i < scienceClasses.length; i++){
      if(document.getElementById(scienceClasses[i].toString()).checked){
        subjectList.push(scienceClasses[i]);

      }
    }

    for(let i = 0; i < languageClasses.length; i++){
      if(document.getElementById(languageClasses[i].toString()).checked){
        subjectList.push(languageClasses[i]);

      }
    }

    for(let i = 0; i < humanitiesClasses.length; i++){
      if(document.getElementById(humanitiesClasses[i].toString()).checked){
        subjectList.push(humanitiesClasses[i]);

      }
    }

    for(let i = 0; i < csClasses.length; i++){
      if(document.getElementById(csClasses[i].toString()).checked){
        subjectList.push(csClasses[i]);

      }
    }

    
    alert(subjectList);
    let subject = subjectList.join(", ");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let description = document.getElementById("description");
    let experience = document.getElementById("experience");
    let grade = document.getElementById("grade");

  //let isApproved = document.getElementById("isApproved");
    // firstName.value = user;
    // lastName.value = "";
    // email.value = "";
    // description.value = "";
    // experience.value = "";
    // grade.value = "";

  
  
  

  //creates tutor object from the above variables
  // addTutor(subject, firstName, lastName, email, description, experience, grade, false);
  addTutor(subject, firstName, lastName, email, description, experience, grade);
    // for(let i = 0; i < mathClasses.length; i++){
    //   document.getElementByID(mathClasses[i].toString()).checked = false;
    // }
    // for(let i = 0; i < scienceClasses.length; i++){
    //   document.getElementByID(scienceClasses[i].toString()).value = false;
    // }
    // for(let i = 0; i < humanitiesClasses.length; i++){
    //   document.getElementByID(humanitiesClasses[i].toString()).value = false;
    // }
    // for(let i = 0; i < languageClasses.length; i++){
    //   document.getElementByID(languageClasses[i].toString()).value = false;
    // }
    // for(let i = 0; i < csClasses.length; i++){
    //   document.getElementByID(csClasses[i].toString()).value = false;
    // }
    location.reload();
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    description.value = "";
    experience.value = "";
    grade.value = "";
  
}
                        );

//adds the tutor to the firebase
// export const addTutor = function(subject, firstName, lastName, email, description, experience, grade, isApproved){
export const addTutor = function(subject, firstName, lastName, email, description, experience, grade){
  try{
    const docRef = addDoc(collection(db, "peer-tutoring-signups"), {
      subject: subject,
      firstName: firstName.value,
      lastName:lastName.value,
      email: email.value,
      description: description.value,
      experience: experience.value,
      grade: grade.value,
      img: picture,
      isRequested: true,
      isApproved: false
    });
  }
  catch(e){
    alert("Error adding item to the database: ", e);
  }  

  
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
        });
    }
});
      