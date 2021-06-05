let canvas = document.querySelector("canvas");

let {top : canvasTop} = canvas.getBoundingClientRect();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - canvasTop;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvasTop;
})

let ctx = canvas.getContext("2d");
ctx.lineCap = "round";

let isMouseDown = false;

canvas.addEventListener("mousedown", function(e) {
    isMouseDown = true;

    let x = e.clientX;
    let y = e.clientY - canvasTop;

    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener("mousemove", function(e) {
    let x = e.clientX;
    let y = e.clientY - canvasTop;

    if(isMouseDown) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", function(e) {
    isMouseDown = false;
});