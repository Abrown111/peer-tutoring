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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var category_list = []
var username;
var password;

var uname = document.getElementById("username");
var psswd = document.getElementById("password");
var form = document.getElementById("form");

const user = localStorage.getItem("users");
// if(user==null){
//   window.location.href = "https://peer-tutor-app-1.timothygroves.repl.co/index.html";
// }else{
//    var userArray = user.split(" ");
// }

if(user!=null){
  var userArray = user.split(" ");
}

var databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
databaseItems.forEach((items)=>{
  console.log(items);
});

export const login = async function(){
  uname = document.getElementById("username");
  console.log(uname.value);
  
  var databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
  var lock = false;
  alert("here");

  databaseItems.forEach((item)=>{
    if(item.data().username == uname.value){
      if(item.data().password == psswd.value){
        lock = true;
        username = uname.value;
        password = psswd.value;
        window.location.href="https://peer-tutor-app-1.timothygroves.repl.co/main_page.html";
      }
    }
  });
  if(!lock){
    form.reset();
  }
}




// show Tutors from firebase in the tiles on the screen
export const showItems = async function(){
    const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
    var tutors = document.getElementById("tutors");
      tutors.innerHTML="";
  // let link = document.createElement('link');
         
  //       // set the attributes for link element
  //       link.rel = 'stylesheet';
             
  //       link.type = 'text/css';
             
  //       link.href = 'style.css';
  //     tutors.appendChild(link);

    databaseItems.forEach((item) => {
            if (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase())){ //search bar for Tutors
              if( item.data().isApproved == true){
                if(similar(category_list,item.data().teachList) || category_list.length==0 ){ //category check-list for Tutors
                    var row = document.createElement("div");
                    row.setAttribute('class', "row");
                      
                      var name = document.createElement("h1");
                      name.innerHTML = item.data().firstName + " " + item.data().lastName.substring(0, 1) + ".";
                      name.for = item.id;
                      row.appendChild(name);

                      if(item.data().img != null){
                      
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

                      var calendar = document.createElement("a");
                    calendar.innerHTML = "Calendar";
                  // if(!item.data().calendar.includes("https://www.") || !item.data().calendar.includes("https//")){
                  // calendar.href = "https://www." + item.data().calendar;
                  // } else {
                    calendar.href = item.data().calendar;
                  // }
                  calendar.target = "_blank";
                  row.append(calendar);
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


                  
                  tutors.appendChild(row);
                
                }
              }
            }
        
        console.log(item.id + ", " + item.data().name);
  });

}

showItems();

//behind the scenes - checklist (creates a list that contains the clicked categories)
export const category_list_add = function(){
    category_list = []
  try{
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
    console.log(category_list);
  }catch(e){
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


function similar(list1, list2){
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