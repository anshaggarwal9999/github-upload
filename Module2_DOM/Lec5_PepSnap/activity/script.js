let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let zoomIn = document.querySelector(".in");
let zoomOut = document.querySelector(".out");
let recordingState = false;
let constraints = {video:true};
let recordedData;
let mediaRecorder;
let maxZoom = 3;
let minZoom = 1;
let curZoom = 1;

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
            // recordButton.innerHTML = "Record";
            recordButton.querySelector("div").classList.remove("record-animate");
        }
        else {
            mediaRecorder.start();
            // recordButton.innerHTML = "Recording";
            recordButton.querySelector("div").classList.add("record-animate");
        }

        recordingState = !recordingState;
    });

    photoButton.addEventListener("click", capturePhotos);

    zoomIn.addEventListener("click", function() {
        // if(curZoom >= minZoom && curZoom < maxZoom) {
        //     curZoom += 0.1;
        //     videoPlayer.style.transform = `scale(${curZoom})`;
        // }
        if(curZoom + 0.1 <= maxZoom){
            curZoom += 0.1;
            videoPlayer.style.transform = `scale(${curZoom})`;
          }
    });

    zoomOut.addEventListener("click", function() {
    //     if(curZoom == 3 && curZoom > 1) {
    //         curZoom += 0.1;
    //         videoPlayer.style.transform = `scale(${curZoom})`;
    //     }
        if(curZoom - 0.1 >= minZoom){
            curZoom -= 0.1;
            videoPlayer.style.transform = `scale(${curZoom})`;
        }
    });
})();


function saveVideoToFs() {
    console.log("Saving Video");
    // file object in recordedData
    let videoUrl = URL.createObjectURL(recordedData); // convert Blob object into Blob Url
    // console.log(videoUrl);
  
    let iv = setInterval( function(){
      if(db){
        saveMedia("Video" , videoUrl);
        clearInterval(iv);
      }
    }  , 100 );
    // let aTag = document.createElement("a");
    // aTag.download = "video.mp4";
    // aTag.href = videoUrl;
  
    // console.log(aTag);
    // aTag.click(); // download start for video
  }
  
  function capturePhotos() {
    photoButton.querySelector("div").classList.add("capture-animate");
    // async
    setTimeout(function(){
      photoButton.querySelector("div").classList.remove("capture-animate");
    } , 1000);
  
    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    let ctx = canvas.getContext("2d");
  
    // canvas is scaled according to currZoom
    if(curZoom != 1){
      ctx.translate(canvas.width/2 , canvas.height/2);
      ctx.scale(curZoom , curZoom);
      ctx.translate(-canvas.width/2 , -canvas.height/2)
    }
  
    ctx.drawImage(videoPlayer, 0, 0);
    let imageUrl = canvas.toDataURL("image/jpg"); //canvas object => file url String
  
    let iv = setInterval( function(){
      if(db){
        saveMedia("image" , imageUrl);
        clearInterval(iv);
      }
    }  , 100 );
    
  
    // skip the downloading part !!!
    // let aTag = document.createElement("a");
    // aTag.download = "photo.jpg";
    // aTag.href = imageUrl;
    // aTag.click();
  }