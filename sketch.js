const resolution = 20;
let cols, rows;
let game;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = round(width/resolution);
    rows = round(height/resolution);
    game = new Game();
    frameRate(10);
}

function draw() {
    game.step();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cols = round(width/resolution);
    rows = round(height/resolution);
    game = new Game();
}

function mousePressed() {
    fullscreen(!fullscreen());
}

class Game {
    constructor(chances=0.1) {
        this.chances = chances;
        this.grid = this.array2d(cols, rows);
        this.newGrid = this.array2d(cols, rows);
        this.fillGrid = this.fillGrid.bind(this);
        this.step = this.step.bind(this);
        this.render = this.render.bind(this);
        this.fate = this.fate.bind(this);
        this.swap = this.swap.bind(this);
        this.fillGrid();
    }
    array2d(w, h) {
        let arr = new Array(w);
        for (var i = 0; i < w; i++) {
          arr[i] = new Array(rows);
        }
        return arr;
    }
    fillGrid() {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.grid[i][j] = random() < this.chances ? 1 : 0;
            }
        }
    }
    step() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.newGrid[i][j] = this.fate(i, j);
            }
        }
        this.swap();
        this.render();
    }
    swap() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j] = this.newGrid[i][j];
            }
        }
    }
    fate(i, j) {
        let sum = 0;
        for (let w = -1; w <= 1; w++) {
            for (let o = -1; o <= 1; o++) {
                if (i+w < 0 || i+w >= this.grid.length || j+o < 0 || j+o >= this.grid[0].length) {
                    continue;
                }
                sum += this.grid[i+w][j+o];
            }
        }
        sum -= this.grid[i][j];
        if (sum == 3) return 1;
        if (sum == 2) return this.grid[i][j];
        return 0;
    }
    render() {
        background(51);
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j] == 1 ? fill(255) : noFill();
                rect(i * resolution, j * resolution, resolution, resolution, resolution/5);
            }
        }
    }
}