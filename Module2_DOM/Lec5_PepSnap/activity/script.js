let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let recordingState = false;
let constraints = {video:true};
let recordedData;
let mediaRecorder;

(async function() {
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    
    // let mediaStream = await navigator.mediaDevices.enumerateDevices();
    // console.log(mediaStream);

    videoPlayer.srcObject = mediaStream;

    let mediaRecorder = new MediaRecorder(mediaStream);
    
    mediaRecorder.onstart = function(e) {
        // console.log("Inside on start");
    }

    mediaRecorder.onstop = function(e) {
        // console.log("Inside on stop");
    }

    mediaRecorder.ondataavailable = function(e) {
        recordedData = e.data;
        saveVideoToFs();
    }
    // console.log(mediaRecorder);

    recordButton.addEventListener("click", function() {
        if(recordingState) {
            mediaRecorder.stop();
            recordButton.innerHTML = "Record";
        }
        else {
            mediaRecorder.start();
            recordButton.innerHTML = "Recording";
        }

        recordingState = !recordingState;
    });

    photoButton.addEventListener("click", capturePhotos);
})();

function saveVideoToFs(){
    console.log("Saving Video");
    // file object in recordedData
    let videoUrl = URL.createObjectURL(recordedData);
    console.log(videoUrl);

    let aTag = document.createElement("a");
    aTag.download = "video.mp3";
    aTag.href = videoUrl;

    aTag.click(); 
    aTag.remove();
}

function capturePhotos() {
    console.log("Saving Photo ....");

    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(videoPlayer, 0, 0);

    let aTag = document.createElement("a");
    let imageUrl = canvas.toDataURL("image/jpg");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;
    aTag.click();
}