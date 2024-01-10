// Import Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

import { getAuth, getRedirectResult, signInWithRedirect,  GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc, getDocFromCache} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
var category_list = []
var userStuff;





// setDoc(doc(db, "peer-tutoring-signups", "alex.brown.6147@gmail.com"), {
//     subject: '',
//     firstName: 'Alex',
//     lastName: 'Brown',
//     email: 'alex.brown.6147@gmail.com',
//     description: '',
//     experience: '',
//     grade: '',
//     img: '',
//     isRequested: false,
//     isApproved: false
// });


var form = document.getElementById("form");
// var databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));

var loginForm = document.getElementById("form");

export const signIn = async function(){
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(getDocData(user.email));
      var me = getDocData(user.email);
      var info = String(user.displayName.split(" ")[0])+" " +String(user.displayName.split(" ")[1])+" "+String(user.email);
      var c;
      me.then(
        function(value){
          console.log(value);
          if(value){
            c = 1;
            localStorage.setItem("users", info);
            console.log(value);
          }else{
            c = 0;
            // if(user.email.split("@")[1] != "students.stab.org" || user.email.split("@")[1] != "stab.org"){
            //   alert('Invalid email. Please sign in using a valid STAB email address');
            // }else{
            localStorage.setItem("users", info);
            setDoc(doc(db, "peer-tutoring-signups", user.email), {
              subject: '',
              firstName: user.displayName.split(" ")[0],
              lastName: user.displayName.split(" ")[1],
              email: user.email,
              description: '',
              experience: '',
              grade: '',
              img: '',
              isRequested: false,
              isApproved: false
            // });
            //   c = 1;
          });
          }
          if(c == 1){
            window.location.href = "https://abrown111.github.io/peer-tutoring/HTML/main_page.html";
            }
          
        },
        function(error){
          alert("Error in retrieving data");
        }
      );
      
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      alert(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}

async function getDocData(user){
  var d = await getDoc(doc(db, "peer-tutoring-signups", user));
  return d.exists();
}




// export const login = async function(){
//   var lock = false;
//   var uname = document.getElementById("username");
//   var psswd = document.getElementById("password");
//   alert(uname.value);

  
  
//   if(!lock){
//     form.reset();
//   }
//   return false;
// }


// show Tutors from firebase in the tiles on the screen
// export const showItems = async function(){
//     const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
//     var tutors = document.getElementById("tutors");
//      // tutors.innerHTML="";
//   // let link = document.createElement('link');
         
//   //       // set the attributes for link element
//   //       link.rel = 'stylesheet';
             
//   //       link.type = 'text/css';
             
//   //       link.href = 'style.css';
//   //     tutors.appendChild(link);

//     databaseItems.forEach((item) => {
//             // if (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){ //search bar for Tutors
//                 if(category_list.includes(item.data().subject) || category_list.length==0 ){ //category check-list for Tutors
//                     var row = document.createElement("div");
//                     row.setAttribute('class', "row");
                      
//                       var name = document.createElement("h1");
//                       name.innerHTML = item.data().firstName + " " + item.data().lastName;
//                       name.for = item.id;
//                       row.appendChild(name);
//                       // row.appendChild(document.createElement("br"));

                      
//                       var image = document.createElement("img");
//                       image.src = item.data().img;
//                       row.appendChild(image);

//                       row.appendChild(document.createElement("br"));
                      
                      
//                       var subject = document.createElement("p");
//                       subject.innerHTML = "Subject: " + item.data().subject;
//                       subject.for = item.id;
//                       row.appendChild(subject);
//                       //row.appendChild(document.createElement("br"));
              
//                       var description = document.createElement("p");
//                       description.innerHTML = "Bio: " + item.data().description;
//                       description.for = item.id;
//                       row.appendChild(description);
//                       //row.appendChild(document.createElement("br"));
                    
//                       var email = document.createElement("p");
//                       email.innerHTML = "Email: " + item.data().email;
//                       email.for = item.id;
//                       row.appendChild(email);
//                       //row.appendChild(document.createElement("br"));
                      
//                       // var experience = document.createElement("p");
//                       // experience.innerHTML = item.data().experience;
//                       // experience.for = item.id;
//                       // row.appendChild(experience);
//                       // row.appendChild(document.createElement("br"));
                    
//                       var grade = document.createElement("p");
//                       grade.innerHTML = "Grade: " + item.data().grade;
//                       grade.for = item.id;
//                       row.appendChild(grade);                      


    //               // var form = document.createElement("form");
    //               // form.setAttribute("id", "rating_form");

    //               var rate = document.createElement("div");
    //               rate.setAttribute("class", "rate");
                  
    //               var star5 = document.createElement("input");
    //               star5.setAttribute("type", "radio");
    //               star5.setAttribute("value", "5");
    //               star5.setAttribute("name", "rate");
    //               star5.setAttribute("id", "star5");
    //               var text5 = document.createElement("label");
    //               text5.setAttribute("for", "star5");
    //               text5.setAttribute("title", "text");
    //               text5.innerHTML = "5 stars";
                  
    //               var star4 = document.createElement("input");
    //               star4.setAttribute("type", "radio");
    //               star4.setAttribute("value", "4");
    //               star4.setAttribute("name", "rate");
    //               star4.setAttribute("id", "star4");
    //               var text4 = document.createElement("label");
    //               text4.setAttribute("for", "star4");
    //               text4.setAttribute("title", "text");
    //               text4.innerHTML = "4 stars";

    //               var star3 = document.createElement("input");
    //               star3.setAttribute("type", "radio");
    //               star3.setAttribute("value", "3");
    //               star3.setAttribute("name", "rate");
    //               star3.setAttribute("id", "star3");
    //               var text3 = document.createElement("label");
    //               text3.setAttribute("for", "star3");
    //               text3.setAttribute("title", "text");
    //               text3.innerHTML = "3 stars";

    //               var star2 = document.createElement("input");
    //               star2.setAttribute("type", "radio");
    //               star2.setAttribute("value", "2");
    //               star2.setAttribute("name", "rate");
    //               star2.setAttribute("id", "star2");
    //               var text2 = document.createElement("label");
    //               text2.setAttribute("for", "star2");
    //               text2.setAttribute("title", "text");
    //               text2.innerHTML = "2 stars";

    //               var star1 = document.createElement("input");
    //               star1.setAttribute("type", "radio");
    //               star1.setAttribute("value", "1");
    //               star1.setAttribute("name", "rate");
    //               star1.setAttribute("id", "star1");
    //               var text1 = document.createElement("label");
    //               text1.setAttribute("for", "star1");
    //               text1.setAttribute("title", "text");
    //               text1.innerHTML = "1 star";

    //               var submit_rating = document.createElement("button");
    //               submit_rating.innerHTML = "Submit";
    //               submit_rating.setAttribute("type", "submit");
    //               submit_rating.setAttribute("id", "submit_rating");
    //               submit_rating.setAttribute("onclick", "submit_rate()");

                  
    //               rate.appendChild(star5);
    //               rate.appendChild(text5);
    //               rate.appendChild(star4);
    //               rate.appendChild(text4);
    //               rate.appendChild(star3);
    //               rate.appendChild(text3);
    //               rate.appendChild(star2);
    //               rate.appendChild(text2);
    //               rate.appendChild(star1);
    //               rate.appendChild(text1);
                  
                  // form.appendChild(rate);
                  // form.appendChild(submit_rating);
                  
                  // row.appendChild(rate);

                  // row.appendChild(form);
                  
                  // row.appendChild(submit_rating);
                  
                  //tutors.appendChild(row);
                
                //}
                
            // }
        
//         console.log(item.id + ", " + item.data().name);
// });

// }

//showItems();

//behind the scenes - checklist (creates a list that contains the clicked categories)
// export const category_list_add = function(){
//     category_list = []
//   try{
//     if (document.getElementById("math").checked) {
//         category_list.push("math")
//     }
//     if (document.getElementById("science").checked) {
//         category_list.push("science")
//     }
//     if (document.getElementById("language").checked) {
//         category_list.push("language")
//     }
//     if (document.getElementById("humanities").checked) {
//         category_list.push("humanities")
//     }
//     if (document.getElementById("computer science").checked) {
//         category_list.push("computer science")
//     }
//     console.log(category_list);
//   }catch(e){
//     console.log("error");
//   }
//   showItems();
// }

// addDoc(collection(db, "peer-tutoring-signups"), {
//   username : "abrown24@students.stab.org",
//   password : "seanisntreal"
// });



//category_list_add();


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
//     var tutor_requests = document.getElementById("tutor_requests");
//     tutor_requests.innerHTML = "";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "peer-tutoring-signups", item.id));
//     });
