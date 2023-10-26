const startSelect = document.getElementById("start");
const endSelect = document.getElementById("end");
const map = document.getElementById("map");
const table = map.querySelector("table");
const cells = table.querySelectorAll("td");
const walls = table.querySelectorAll(".wall");
const rows = table.querySelectorAll("tr");
const numRows = rows.length;
const numCols = rows[0].querySelectorAll("td").length;

let startRow = 1;
let startCol = 1;
let endRow = 1;
let endCol = 8;

startSelect.addEventListener("change", () => {
    const [row, col] = startSelect.value.split(",");
    startRow = parseInt(row);
    startCol = parseInt(col);
});

endSelect.addEventListener("change", () => {
    const [row, col] = endSelect.value.split(",");
    endRow = parseInt(row);
    endCol = parseInt(col);
});

function findPath() {
    // Reset all cells to unvisited
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("visited");
    }

    // Create a queue for BFS
    const queue = [];

    // Mark the starting cell as visited and enqueue it
    const startCell = getCell(startRow, startCol);
    startCell.classList.add("visited");
    queue.push([startRow, startCol, []]);

    // BFS
    while (queue.length > 0) {
        const [row, col, path] = queue.shift();

        // Check if we reached the end cell
        if (row === endRow && col === endCol) {
            highlightPath(path);
            return;
        }

        // Check all neighbors
        const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];
        for (const [nRow, nCol] of neighbors) {
            if (isValidCell(nRow, nCol) && !isWall(nRow, nCol) && !isVisited(nRow, nCol)) {
                const nPath = [...path, [nRow, nCol]];
                const nCell = getCell(nRow, nCol);
                nCell.classList.add("visited");
                queue.push([nRow, nCol, nPath]);
            }
        }
    }
}

function isValidCell(row, col) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
}

function isWall(row, col) {
    const cell = getCell(row, col);
    return walls.includes(cell);
}

function isVisited(row, col) {
    const cell = getCell(row, col);
    return cell.classList.contains("visited");
}

function getCell(row, col) {
    return rows[row].querySelectorAll("td")[col];
}

function highlightPath(path) {
    for (const [row, col] of path) {
        const cell = getCell(row, col);
        cell.classList.add("path");
    }
}