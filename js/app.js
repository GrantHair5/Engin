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
  //track.stop();
};

imageSender.onclick = function() {
  var base = cameraSensor.toDataURL();
  var sanitisedBase = base.replace("data:image/png;base64,", "");
  console.log(sanitisedBase);
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
