{
  /* <script
  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
  
  
  
  var colors = new Array([62, 35, 255], [255, 35, 98], [255, 0, 255], [255, 128, 0]);
  
  var step = 0;
  //color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0, 1, 2, 3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient() {
    if ($ === undefined) return;
  
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
  
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
  
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
  
    $("#gradient-canvas")
      .css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))",
      })
      .css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)",
      });
  
    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
  
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }
  
  setInterval(updateGradient, 10); */
}

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circleCount = window.innerWidth / 9;
const mouse = { x: null, y: null };
const maxRadius = window.innerWidth / 6;

const Color = {
  vector: ["#6962f7", "#00d4ff", "#00d4ff", "#7000ff", "#ffba27", "#ef008f", "#7038ff", "#7038ff", "#96bf48"],
  getRandom: () => {
    return Color.vector[Math.floor(Math.random() * Color.vector.length)];
  },
};

function randomNumber(max, min = 0, exclude = []) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(num));
  return num;
}

class Circle {
  constructor(
    r_min = randomNumber(maxRadius * 0.9, 20),
    x = randomNumber(canvas.width, r_min),
    y = randomNumber(canvas.height, r_min),
    dx = randomNumber(1, -2, [0]) * 0.2,
    dy = randomNumber(1, -1, [0]) * 0.2,
    color = Color.getRandom()
  ) {
    this.r_min = r_min;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.r = r_min;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.r > canvas.width || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > canvas.height || this.y - this.r < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let circles = [];
for (let i = 0; i < circleCount; i++) {
  circles.push(new Circle());
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => circle.update());
}

animate();
