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

const CLIENT_ID = '193920940178-62d8gll3mdr1nqis39ikher0map18abe.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBe4Ldpan-rsUgfFLKJiXRGRBB433fCMts';

const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest', 'https://sheets.googleapis.com/$discovery/rest?version=v4', 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOC,
  });
  gapiInited = true;
}

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '' // defined later
  });
  gisInited = true;
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
  };
  tokenClient.requestAccessToken({ prompt: '' });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var category_list = []
var tracker;
var userArray;
const user = localStorage.getItem("users");
var userDoc;
if (user != null) {
  userArray = user.split(" ");
  userDoc = await getDoc(doc(db, "peer-tutoring-signups", userArray[2]));
}
var admin = false;
if (userDoc.data().isAdmin) {
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
  document.getElementById("form").innerHTML = "New Admin";
  document.getElementById("formDrop").innerHTML = "New Admin";
}

if (window.innerWidth < 600) {
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

window.onclick = function (event) {
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

var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

async function sendEmail(to, subject, message) {
  return await Email.send({
    Host: "smtp.elasticemail.com",
    Username: "peertutoring@stab.org",
    Password: "4B3FA102498ED1223BDD852771B6127ECF3B",
    To: to,
    From: "peertutoring@stab.org",
    Subject: subject,
    Body: message
  });
}


if (user != null) {
  var userArray = user.split(" ");
}

async function removeTutor(id, name) {
  let text = "Are you sure you want to remove " + name + " as a tutor?"
  if (confirm(text)) {
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isApproved: false,
      isAdmin: false
    });
    var msg = "Dear " + name.split(" ")[0] + ", you have been removed from the peer tutoring website. If this is the end of the year and you are a \
    senior, please ignore this email as you are graduating soon. If not, please fill out the peer tutoring request form again in order to become a tutor again next year!";
    await sendEmail(id, "Removed as Peer Tutor", msg);
  }
  location.reload();
}

async function demoteTutor(id, name) {
  let text = "Are you sure you want to remove " + name + " as an admin?";
  if (confirm(text)) {
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isApproved: true,
      isAdmin: false
    });
    var msg = "Dear " + name.split(" ")[0] + ", thank you for all you've done with and for the peer tutoring program. Unfortunately, your admin privileges have been revoked.\
     If you wish to restore your former privileges or believe that there is a mistake, reach out to the faculty head of peer tutoring to have your permissions restored. Thanks."
    await sendEmail(id, "Removed as admin from Peer Tutoring", msg);
  }
  location.reload()
}

async function promoteTutor(id, name) {
  let text = "Are you sure you want to add " + name + " as an admin?"
  if (confirm(text)) {
    await updateDoc(doc(db, "peer-tutoring-signups", id), {
      isAdmin: true
    });
    var msg = "Dear " + name.split(" ")[0] + "\r\n, Congratulations on becoming the new head of peer tutoring! You have been promoted to admin, meaning you will now be able to review potential tutors and either accept or deny their ability to become a tutor.\n\n\
    If you look on the main page, you will see new options on each tutor. When you press these buttons, you will see the options to remove other admins, remove tutors, as well as promote new admins. Also, by clicking on their names, you will be taken to a \
    google sheet which details their work as a peer tutor for this year. Finally, a new tab on the navigation bar has been added for you. By clicking this link, “requests”, you have the ability to process all incoming tutors’ requests and either approve or \
    deny them. Thank you for taking on this role and good luck."

    await sendEmail(id, "Promotion to Head Peer Tutor", msg);
  }
  location.reload();
}

async function listEvents(startTime, endTime) {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': '2024-04-11T13:47:26+0000',
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    var badError = await err.message;
    console.log(badError);
    return;
  }
  console.log(response);
  const events = response.result.items;
  if (!events || events.length == 0) {
    console.log("no events");
    return;
  }
  console.log(events[0]);
  var newestEvents = [];
  for (let i = 0; i < events.length; i++) {
    var outputList;
    try {
      var organizerDoc = getDoc(doc(db, "peer-tutoring-signups", events[i].organizer.email));
      var tutorName = organizerDoc.data().firstName + " " + organizerDoc.data().lastName;
    } catch {
      var tutorName = events[i].organizer.email;
    }
    var startTime = parseInt(events[i].start.dateTime.split("T")[1].split(':')[0]) + parseInt(events[i].start.dateTime.split("T")[1].split(':')[1]) / 60;
    var endTime = parseInt(events[i].end.dateTime.split("T")[1].split(':')[0]) + parseInt(events[i].end.dateTime.split("T")[1].split(':')[1]) / 60;
    var totalTime = (endTime - startTime).toString();
    var studentName = events[i].summary.split("(")[1].split(")")[0];
    outputList = [tutorName, studentName, events[i].start.dateTime.split("T")[0], totalTime];
    newestEvents.push(outputList);
  }
  // Flatten to string to display
  return newestEvents;
}

async function updateSheet() {
  var currentDate = new Date();
  var generatedEvents = await listEvents(userDoc.data().lastTimeSignedIn, userDoc.data().previousTimeSignedIn);
  for (var i = 0; i < generatedEvents.length; i++) {
    var request = {
      spreadsheetId: '1rRxor92TQ5sxzjl1vkrTvKF8xoTJBA6n-DsT3qV8NUU',
      range: "Sheet1",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      includeValuesInResponse: true,
      resource: {
        values: [generatedEvents[i]]
      },
    };
    var response = await gapi.client.sheets.spreadsheets.values.append(request);
    console.log(response);
  }
  console.log(generatedEvents);
  await updateDoc(doc(db, "peer-tutoring-signups", "peertutoring@stab.org"), {
    previousTimeSignedIn: userDoc.data().lastTimeSignedIn,
    lastTimeSignedIn: currentDate.toISOString()
  });
}

// show Tutors from firebase in the tiles on the screen
export const showItems = async function () {
  const databaseItems = await getDocs(collection(db, "peer-tutoring-signups"));
  var tutors = document.getElementById("tutors");
  tutors.innerHTML = "";
  if (userDoc.data().email == "peertutoring@stab.org" && tracker != 1) {
    var navBarHeader = document.getElementById("PeerTutoring");
    var newButton = document.createElement("button");
    newButton.innerText = 'Update Tutor Document';
    newButton.addEventListener('click', () => {
      gapiLoaded();
      gisLoaded();
      handleAuthClick();
      setTimeout(() => { updateSheet() }, 1000);
    });
    navBarHeader.appendChild(newButton);
    tracker = 1;
  }


  databaseItems.forEach((item) => {
    if (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase())) { //search bar for Tutors
      if (item.data().isApproved && (item.data().home == true || item.data().home != false)) {
        if (similar(category_list, item.data().teachList) || category_list.length == 0) { //category check-list for Tutors
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

          var subject = document.createElement("p");
          subject.innerHTML = "Subject(s): " + item.data().subject;
          subject.for = item.id;
          row.appendChild(subject);

          var description = document.createElement("p");
          description.innerHTML = "Bio: " + item.data().description;
          description.for = item.id;
          row.appendChild(description);

          var grade = document.createElement("p");
          grade.innerHTML = "Grade: " + item.data().grade;
          grade.for = item.id;
          row.appendChild(grade);

          var email = document.createElement("p");
          email.innerHTML = "Email: " + item.data().email;
          email.for = item.id;
          row.appendChild(email);

          var calendar = document.createElement("button");
          calendar.innerText = "Calendar";
          calendar.addEventListener('click', () => {
            if (!item.data().calendar.includes("//")) {
              window.open("//" + item.data().calendar);
            } else {
              window.open(item.data().calendar, "_blank");
            }
          });
          row.appendChild(calendar);

          if (admin) {
            row.appendChild(document.createElement("br"));
            row.appendChild(document.createElement("br"));
            var remove = document.createElement("button");
            remove.innerText = "Remove tutor";
            remove.addEventListener('click', () => {
              removeTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName));
            });
            var demote = document.createElement("button");
            demote.innerText = "Remove Admin";
            demote.addEventListener('click', () => {
              demoteTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName));
            });
            var promote = document.createElement("button");
            promote.innerText = "Promote to Admin";
            promote.addEventListener('click', () => {
              promoteTutor(item.id, String(item.data().firstName) + ' ' + String(item.data().lastName));
            });
            row.appendChild(remove);
            if (!item.data().isAdmin) {
              row.appendChild(document.createElement("br"));
              row.appendChild(document.createElement("br"));
              row.appendChild(promote);
            } else {
              row.appendChild(document.createElement("br"));
              row.appendChild(document.createElement("br"));
              row.appendChild(demote);
            }
          }

          tutors.appendChild(row);

        }
      }
    }
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

category_list_add();

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