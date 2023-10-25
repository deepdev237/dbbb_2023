let decorations = [];

var canvas = document.getElementById("canvas"); //Get canvas
var ctx = canvas.getContext("2d"); //2d context for drawing

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

const submitButtonWidth = 150;
const submitButtonHeight = 75;
const submitButtonX = canvasWidth / 2 - submitButtonWidth / 2;
const submitButtonY = canvasHeight - submitButtonHeight - 20;

const generateButtonWidth = 150;
const generateButtonHeight = 75;
const generateButtonX = cakeCenterX - cakeSize * 0.36 - generateButtonWidth / 2;
const generateButtonY = cakeCenterY + cakeSize * 0.35 + 20;

const resetButtonWidth = 150;
const resetButtonHeight = 75;
const resetButtonX = cakeCenterX + cakeSize * 0.36 - resetButtonWidth / 2;
const resetButtonY = cakeCenterY + cakeSize * 0.35 + 20;

//const numDecorations = 10;
const decorationRadius = cakeSize * 0.04;
const circleRadius = cakeSize * 0.35;

function generateCake(amount) {
    decorations = [];
    usedDecorations = [];
    matchingDecorations = [];

    for (let i = 0; i < amount; i++) {
        let x, y, type;
    
        // Generate random coordinates and type until a non-overlapping decoration is found
        do {
            let angle = Math.random() * 2 * Math.PI;
            let radius = Math.random() * (circleRadius - decorationRadius * 2) + decorationRadius;
            // Generate random x and y coordinates
            x = cakeCenterX - cakeSize * 0.36 + radius * Math.cos(angle);
            y = cakeCenterY + radius * Math.sin(angle);
        
            // Generate random decoration type
            type = decorationTypes[Math.floor(Math.random() * decorationTypes.length)];
        } while (decorations.some(decoration => Math.sqrt((decoration.x - x) ** 2 + (decoration.y - y) ** 2) < decorationRadius * 2) || Math.sqrt((x - cakeCenterX) ** 2 + (y - cakeCenterY) ** 2) < circleRadius + decorationRadius);
    
        // Store decoration coordinates and type
        decorations.push({ x, y, type });
    }
}

//draw decorations at the top of the canvas where the player can choose from and drag and drop to the right circle to decorate it

const decorationsToUse = [];
let usedDecorations = [];
let matchingDecorations = [];

function main() {
    //Main loop
    window.requestAnimationFrame(main); //Request next frame

    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 3;

    // Draw circle on the left side of the canvas
    ctx.beginPath();
    ctx.arc(cakeCenterX - cakeSize * 0.36, cakeCenterY, cakeSize * 0.35, 0, 2 * Math.PI);
    ctx.stroke();

    //draw circle on the right side of the canvas

    ctx.beginPath();
    ctx.arc(cakeCenterX + cakeSize * 0.36, cakeCenterY, cakeSize * 0.35, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw randomly generated decorations on the left circle
    for (const decoration of decorations) {
        ctx.beginPath();
        ctx.arc(decoration.x, decoration.y, decorationRadius, 0, 2 * Math.PI);
        ctx.fillStyle = decorationColors[decorationTypes.indexOf(decoration.type)];
        ctx.fill();
        ctx.closePath();
    }

    for (const decoration of usedDecorations) {
        ctx.beginPath();
        ctx.arc(decoration.x, decoration.y, decorationRadius, 0, 2 * Math.PI);
        ctx.fillStyle = decorationColors[decorationTypes.indexOf(decoration.type)];
        ctx.fill();
        ctx.closePath();
    }

    for (let i = 0; i < decorationTypes.length; i++) {
        const x = decorationX + (decorationSize + decorationMargin) * i - 200;
        const y = decorationY + 50;
    
        ctx.beginPath();
        ctx.arc(x, y, decorationRadius, 0, 2 * Math.PI);
        ctx.fillStyle = decorationColors[decorationTypes.indexOf(decorationTypes[i])];
        ctx.fill();
        ctx.closePath();
    
        decorationsToUse.push({ x, y, type: decorationTypes[i] });
    }

    //draw temporary decoration on the cursor position

    if (selectedDecoration) {
        ctx.beginPath();
        ctx.arc(selectedDecoration.x, selectedDecoration.y, decorationRadius, 0, 2 * Math.PI);
        ctx.fillStyle = decorationColors[decorationTypes.indexOf(selectedDecoration.type)];
        ctx.fill();
        ctx.closePath();
    }

    //draw submit button on the bottom of the canvas

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(submitButtonX, submitButtonY, submitButtonWidth, submitButtonHeight);
    ctx.closePath();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Kiértékelés", submitButtonX + submitButtonWidth / 2, submitButtonY + submitButtonHeight / 2);
    ctx.closePath();

    //draw generate button below the left circle on the canvas

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(generateButtonX, generateButtonY, generateButtonWidth, generateButtonHeight);
    ctx.closePath();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Generálás", generateButtonX + generateButtonWidth / 2, generateButtonY + generateButtonHeight / 2);
    ctx.closePath();

    //draw reset button below the right circle on the canvas

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(resetButtonX, resetButtonY, resetButtonWidth, resetButtonHeight);
    ctx.closePath();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Újra", resetButtonX + resetButtonWidth / 2, resetButtonY + resetButtonHeight / 2);
    ctx.closePath();

    //draw square on matchingDecorations 

    for (const decoration of matchingDecorations) {
        ctx.beginPath();
        ctx.rect(decoration.x - decorationRadius, decoration.y - decorationRadius, decorationRadius * 2, decorationRadius * 2);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
    }



}
window.requestAnimationFrame(main); //Start the main loop

//draw decorations at the top of the canvas where the player can choose from and drag and drop to the right circle

let selectedDecoration = null;

canvas.addEventListener("mousedown", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    for (const decoration of decorationsToUse) {
        if (Math.sqrt((decoration.x - x) ** 2 + (decoration.y - y) ** 2) < decorationSize / 2) {
            selectedDecoration = decoration;
            break;
        }
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (selectedDecoration) {
        // Update selected decoration position to cursor position
        selectedDecoration.x = event.clientX - canvas.offsetLeft;
        selectedDecoration.y = event.clientY - canvas.offsetTop;
    }
});

canvas.addEventListener("mouseup", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (selectedDecoration) {
        // Check if selected decoration is inside the right circle
        const distance = Math.sqrt((selectedDecoration.x - (cakeCenterX + cakeSize * 0.36)) ** 2 + (selectedDecoration.y - cakeCenterY) ** 2);
        if (distance < circleRadius - decorationRadius) {
          // Add selected decoration to usedDecorations array
          usedDecorations.push({ x: selectedDecoration.x, y: selectedDecoration.y, type: selectedDecoration.type });
        }
    
        // Put selected decoration back to the top of the canvas
        selectedDecoration.x = cakeCenterX + cakeSize * 0.36 - decorationSize * 2 - decorationMargin * 2 + (decorationSize + decorationMargin) * usedDecorations.length;
        selectedDecoration.y = cakeCenterY - cakeSize * 0.35 - decorationSize - decorationMargin;
    }

    selectedDecoration = null;

    

    if (x >= submitButtonX && x <= submitButtonX + submitButtonWidth && y >= submitButtonY && y <= submitButtonY + submitButtonHeight) {
        // Submit button clicked
        console.log("Submit button clicked!");

        matchingDecorations = [];

        for (let i = 0; i < usedDecorations.length; i++) {
            const usedDecoration = usedDecorations[i];

            for (let j = 0; j < decorations.length; j++) {
            const decoration = decorations[j];

            if (decoration.type === usedDecoration.type) {
                const distance = Math.sqrt((decoration.x - usedDecoration.x) ** 2 + (decoration.y - usedDecoration.y) ** 2);

                console.log(distance);
                console.log(decorationRadius * 30);
                if (distance < decorationRadius * 30) {
                    matchingDecorations.push(decoration);
                }
            }
            }
        }

        console.log(matchingDecorations);
    }

    if (x >= generateButtonX && x <= generateButtonX + generateButtonWidth && y >= generateButtonY && y <= generateButtonY + generateButtonHeight) {
        // Generate button clicked
        console.log("Generate button clicked!");
        generateCake(2);
    }

    if (x >= resetButtonX && x <= resetButtonX + resetButtonWidth && y >= resetButtonY && y <= resetButtonY + resetButtonHeight) {
        // Reset button clicked
        console.log("Reset button clicked!");
        usedDecorations = [];
        matchingDecorations = [];
    }
});
