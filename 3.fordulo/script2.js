//Key detection
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
function onKeyDown(event) {setKeys(true, event.keyCode)}
function onKeyUp(event) {setKeys(false, event.keyCode)}

function setKeys(toggle, keyCode) {
    for (const key in PlayerControls) {
        if (PlayerControls[key].key === keyCode) {
            PlayerControls[key].toggle = toggle;
            break;
        }
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);

/*
We need to draw two circles
The circle is a cake
We need to have different cake decorations like a candle, flower, chocolate, marzipan, etc.

The left circle is a cake with randomly generated decorations
randomly generate coordinates and decoration type
the amount of decoration is based on difficulty level (easy, medium, hard)

The right circle is empty and the player needs to decorate it with the same decorations at nearly the same positions as the left one has


*/
const decorations = [];

// draw circle on the left side of the canvas

const decorationTypes = ["candle", "flower", "chocolate", "marzipan"];
const decorationColors = ["#FFD700", "#FF1493", "#A52A2A", "#FF4500"];

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const cakeSize = Math.min(canvasWidth, canvasHeight) * 0.9999; // 90% of the canvas size
const cakeCenterX = canvasWidth / 2; 
const cakeCenterY = canvasHeight / 2;

const decorationSize = cakeSize * 0.1;
const decorationMargin = cakeSize * 0.02;
const decorationX = cakeCenterX + cakeSize * 0.36 - decorationSize * 2 - decorationMargin * 2;
const decorationY = cakeCenterY - cakeSize * 0.35 - decorationSize - decorationMargin;

ctx.lineWidth = 3;

// Draw circle on the left side of the canvas
ctx.beginPath();
ctx.arc(cakeCenterX - cakeSize * 0.36, cakeCenterY, cakeSize * 0.35, 0, 2 * Math.PI);
ctx.stroke();

const numDecorations = 10;
const decorationRadius = cakeSize * 0.02;
const circleRadius = cakeSize * 0.35;

for (let i = 0; i < numDecorations; i++) {
    // Generate random angle and radius
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * circleRadius;

    // why do we need angle and radius?
    // to calculate the x and y coordinates of the decoration
    
    //could we do it without angle and radius?
    //yes, but it would be more complicated

    // Calculate x and y coordinates of the decoration
    const x = cakeCenterX - cakeSize * 0.36 + radius * Math.cos(angle);
    const y = cakeCenterY + radius * Math.sin(angle);

    // Generate random decoration type
    const type = decorationTypes[Math.floor(Math.random() * decorationTypes.length)];

    // Draw decoration at the position
    ctx.beginPath();
    ctx.arc(x, y, decorationRadius, 0, 2 * Math.PI);
    ctx.fillStyle = decorationColors[decorationTypes.indexOf(type)];
    ctx.fill();
    ctx.closePath();

    // Store decoration coordinates and type
    decorations.push({ x, y, type });
}

//draw circle on the right side of the canvas

ctx.beginPath();
ctx.arc(cakeCenterX + cakeSize * 0.36, cakeCenterY, cakeSize * 0.35, 0, 2 * Math.PI);
ctx.stroke();

//draw decorations at the top of the canvas where the player can choose from and drag and drop to the right circle to decorate it

/*
for (let i = 0; i < decorationTypes.length; i++) {
    const x = decorationX + (decorationSize + decorationMargin) * i;
    const y = decorationY;

    ctx.beginPath();
    ctx.arc(x, y, decorationSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = decorationColors[i];
    ctx.fill();
    ctx.closePath();
}
*/

// Draw decorations at the top of the canvas where the player can choose from and drag and drop to the right circle

let decorationsToUse = [];

for (let i = 0; i < decorationTypes.length; i++) {
    const x = decorationX + (decorationSize + decorationMargin) * i;
    const y = decorationY;

    ctx.beginPath();
    ctx.arc(x, y, decorationSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = decorationColors[i];
    ctx.fill();
    ctx.closePath();

    // Store decoration coordinates and type
    decorationsToUse.push({ x, y, type: decorationTypes[i] });
}

/*
// Add event listeners to canvas for drag and drop
canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is close to any decoration position
    for (const decoration of decorationsToUse) {
        const distance = Math.sqrt((decoration.x - x) ** 2 + (decoration.y - y) ** 2);
        if (distance < decorationRadius) {
        // Set data for drag and drop
        console.log(decoration.type);
        event.dataTransfer.setData("text/plain", decoration.type); // decoration type is stored in data 
        event.dataTransfer.dropEffect = "copy";
        break;
        }
    }
});

canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if drop is inside the right circle
    const distance = Math.sqrt((x - (cakeCenterX + cakeSize * 0.3)) ** 2 + (y - cakeCenterY) ** 2);
    if (distance < cakeSize * 0.35) {
        // Get decoration type from data
        const type = event.dataTransfer.getData("text/plain");

        // Draw decoration on right circle
        switch (type) {
            case "candle":
                ctx.beginPath();
                ctx.arc(x, y, decorationRadius, 0, 2 * Math.PI);
                ctx.fillStyle = "#FFD700";
                ctx.fill();
                ctx.closePath();
                break;
            case "flower":
                // Draw flower decoration
                
                break;
            case "chocolate":
                // Draw chocolate decoration
                break;
            case "marzipan":
                // Draw marzipan decoration
                break;
        }
    }
});
*/
