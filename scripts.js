console.clear();

const PUZZLES = [
  {
    title: "Tree",
    fill: "green",
    dots: 35,
    svg: '<svg fill="#000000" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20,17a1,1,0,0,0,.813-1.581L16.943,10H18a1,1,0,0,0,.759-1.651l-6-7a1.033,1.033,0,0,0-1.518,0l-6,7A1,1,0,0,0,6,10H7.057l-3.87,5.419A1,1,0,0,0,4,17h7v4H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V17ZM9.813,9.581A1,1,0,0,0,9Z"></path></svg>',
  },
  {
    title: "Star",
    fill: "gold",
    dots: 30,
    svg: '<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8615 6.80542L14.5461 10.3356L20 11.0939L16 15.2887L17.0922 21L12 18.7113L6.90783 21L8 15.2887L4 11.0939L9.45391 10.3356L11.1385 6.80542M12.8615 6.80542C13.5349 6.48354 14 5.7961 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 5.7961 10.4651 6.48354 11.1385 6.80542M12.8615 6.80542C12.6006 6.93014 12.3085 7 12 7C11.6915 7 11.3994 6.93014 11.1385 6.80542" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  },
  {
    title: "Bauble",
    fill: "red",
    dots: 15,
    svg: '<svg fill="none" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  d="M12,23A8.994,8.994,0,0,0,15,5.525V4A3,3,0,0,0,9,4V5.525A8.994,8.994,0,0,0,12,23ZM5.085Z"></path></svg>',
  },
  {
    title: "Bell",
    fill: "gold",
    dots: 30,
    svg: '<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.04283 5.1757C8.59546 4.75121 9.24946 4.43224 10.0136 4.23441C10.0046 4.15752 10 4.0793 10 4C10 2.89543 10.8955 2 12 2C13.1046 2 14 2.89543 14 4C14 4.0793 13.9954 4.15752 13.9864 4.23441C14.7506 4.43224 15.4046 4.75121 15.9572 5.1757C16.933 5.92519 17.4981 6.93095 17.8325 7.93362C18.1644 8.92891 18.2842 9.96595 18.3426 10.8395C18.3663 11.1941 18.3806 11.5351 18.3932 11.8357L18.4018 12.0385C18.4175 12.3994 18.433 12.6684 18.4596 12.8673C18.6553 14.329 18.8982 15.3543 19.2438 16.1741C19.5816 16.9754 20.0345 17.6202 20.7071 18.2929C20.9931 18.5789 21.0787 19.009 20.9239 19.3827C20.7691 19.7564 20.4045 20 20 20H13.7325C13.9026 20.2942 14 20.6357 14 21C14 22.1046 13.1046 23 12 23C10.8955 23 10 22.1046 10 21C10 20.6357 10.0974 20.2942 10.2676 20H4.00003C3.59557 20 3.23093 19.7564 3.07615 19.3827C2.92137 19.009 3.00692 18.5789 3.29292 18.2929C3.96694 17.6189 4.4186 16.9787 4.75553 16.1809C5.1004 15.3642 5.3434 14.3395 5.54043 12.8673C5.56706 12.6684 5.58255 12.3994 5.59827 12.0385L5.60687 11.8357C5.61945 11.5351 5.63371 11.1941 5.65744 10.8395C5.7159 9.96595 5.83561 8.92891 6.16756 7.93362C6.50196 6.93095 7.06705 5.92519 8.04283 5.1757ZM6.06869 18C6.26568 17.6741Z" ></path></svg>',
  },
];
const puzzleContainer = document.getElementById("dot-to-dot");
const btnRandom = document.getElementById("btn-random");
const btnUndo = document.getElementById("btn-undo");
const btnReset = document.getElementById("btn-reset");
const messageDiv = document.getElementById("message");

let currentPuzzleIndex = 1;

// get random puzzle on load
//currentPuzzleIndex = getRandomPuzzle();
let currentPuzzle = PUZZLES[currentPuzzleIndex];

btnRandom.addEventListener("click", () => {
  // set the current puzzle index and item
  currentPuzzleIndex = getRandomPuzzle();
  currentPuzzle = PUZZLES[currentPuzzleIndex];
  loadSVG();
});

// get random puzzle from array - must not repeat current
function getRandomPuzzle() {
  let randomIndex;

  // ensure the random index is different from the last one
  do {
    randomIndex = Math.floor(Math.random() * PUZZLES.length);
  } while (randomIndex === currentPuzzleIndex);
  return randomIndex;
}

// load the randomly selected SVG into the DOM then set up the dots
function loadSVG() {
  puzzleContainer.innerHTML = currentPuzzle.svg;
  setupDotToDot();
}

// add the dots, numbers and event listeners
function setupDotToDot() {
  const svg = puzzleContainer.querySelector("svg");
  const path = svg.querySelector("path"); // Preserve the original path element
  const numPoints = currentPuzzle.dots;

  // Track lines and previous dot
  let lines = [];
  let previousDot = null;
  let correctOrder = 0;
  let dotPositions = [];

  // get points from path
  function getPointsFromPath(path, numPoints) {
    const length = path.getTotalLength();
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const point = path.getPointAtLength((length / numPoints) * i);
      points.push([point.x, point.y]);
    }

    return points;
  }

  // clear previous dots and numbers
  function clearDotsAndNumbers() {
    lines.forEach((line) => svg.removeChild(line));
    lines = [];
    const dots = svg.querySelectorAll(".dot, .dot-number");
    dots.forEach((dot) => dot.remove());
  }

  // create dots and numbers from path points
  function createDotsAndNumbers() {
    dotPositions = getPointsFromPath(path, numPoints);

    dotPositions.forEach(([x, y], index) => {
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", 0.5);
      dot.setAttribute("class", "dot");
      dot.setAttribute("data-index", index);
      svg.appendChild(dot);

      // Create number label
      const number = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      number.setAttribute("x", x);
      number.setAttribute("y", y + 1);
      number.setAttribute("class", "dot-number");
      number.textContent = index + 1;
      svg.appendChild(number);
    });
  }

  // event listener for connecting dots
  svg.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      const currentDot = e.target;
      const currentIndex = parseInt(currentDot.getAttribute("data-index"), 10);

      // check if the user clicked the correct dot or the final dot to complete the loop
      if (
        currentIndex === correctOrder ||
        (correctOrder === dotPositions.length && currentIndex === 0)
      ) {
        if (previousDot) {
          drawLine(previousDot, currentDot);
          previousDot.classList.remove("active-dot");
        }
        currentDot.classList.add("active-dot");
        previousDot = currentDot;

        // increment correctOrder or complete the loop
        if (currentIndex === 0 && correctOrder === dotPositions.length) {
          puzzleCompleted();
        } else {
          correctOrder++;
        }
      } else {
        messageDiv.textContent = "Oops! Connect the dots in the correct order.";
      }
    }
  });

  // Draw a line between two dots
  function drawLine(dot1, dot2) {
    const x1 = dot1.getAttribute("cx");
    const y1 = dot1.getAttribute("cy");
    const x2 = dot2.getAttribute("cx");
    const y2 = dot2.getAttribute("cy");

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", "line");

    svg.appendChild(line);
    lines.push(line);
  }

  // puzzle completed - show message and the original SVG path. Remove dots and lines
  function puzzleCompleted() {
    path.style.color = currentPuzzle.fill;
    clearDotsAndNumbers();
    messageDiv.textContent = `Congratulations! You have drawn a ${currentPuzzle.title}`;
    btnUndo.disabled = true; // disable undo button after completion
  }

  // reset
  btnReset.addEventListener("click", () => {
    clearDotsAndNumbers();
    createDotsAndNumbers();

    lines = [];
    previousDot = null;
    correctOrder = 0;
    messageDiv.textContent = "";
    path.style.color = "transparent";
    btnUndo.disabled = false;
  });

  // undo the last click
  btnUndo.addEventListener("click", () => {
    if (lines.length > 0) {
      const lastLine = lines.pop();
      svg.removeChild(lastLine);
      if (previousDot) {
        previousDot.classList.remove("active-dot");
      }
      correctOrder--;
    }
  });

  // Initialize the dots with the default slider value
  createDotsAndNumbers();
}

// intal load
loadSVG();
