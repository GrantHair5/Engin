// Set constraints for the video stream
var constraints = {
  video: {
    facingMode: "environment"
  },
  audio: false
};
var track = null;
var tracks = [];
var buttonOuter = {};
var button = {};

// Define constants
const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger"),
  imageSender = document.getElementById("image--sender"),
  imageCancel = document.getElementById("image--cancel"),
  loader = document.getElementById("loader"),
  input = document.querySelector('input[type="range"]');

// Access the device camera and stream to cameraView
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
      track = mediaStream.getVideoTracks()[0];
      cameraView.srcObject = mediaStream;
    })
    .catch(function(error) {
      console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  document.getElementById("camera--output").style.display = "block";
  cameraOutput.classList.add("taken");
  cameraTrigger.classList.add("camera--trigger__clicked");
  document
    .getElementById("camera--trigger__outer")
    .classList.add("camera--outer__clicked");
  imageSender.classList.add("image--sender__button__visible");
  imageCancel.classList.add("image--cancel__button__visible");
  track.stop();
};

imageSender.onclick = function() {
    track.stop();
    loader.classList.add("loader--visible");
    cameraOutput.classList.add("frosty")
  var base = cameraSensor.toDataURL();
  var sanitisedBase = base.replace("data:image/png;base64,", "");
  postData(`http://dev.engin.aftersales.arnoldclark.com/api/Engin`, {
    image: sanitisedBase
  })
    .then(data => {
      var url = "https://www.arnoldclark.com/used-cars/search?"
        var response = JSON.stringify(data);
        var responseObject = JSON.parse(response); 
        window.location.href = url + "make=" + responseObject.make + "&model=" + responseObject.model.split(" ")[0] + "&photos_only=true&unreserved_only=true";
    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
};

imageCancel.onclick = function() {
  location.reload();
};

function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json()); // parses response to JSON
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
