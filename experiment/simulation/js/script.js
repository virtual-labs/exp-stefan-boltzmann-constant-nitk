const canvas = document.querySelector("#simscreen");
const ctx = canvas.getContext("2d");
const btnStart = document.querySelector(".btn-start");
const btnReset = document.querySelector(".btn-reset");
const voltageButtons = document.querySelectorAll(".voltage");
const vfspinner = document.querySelector("#vfspinner");
const temperature1 = document.querySelector("#temp1");
const temperature2 = document.querySelector("#temp2");
const temperature3 = document.querySelector("#temp3");
const temperature4 = document.querySelector("#temp4");
const temperature5 = document.querySelector("#temp5");
const btnCheck1 = document.querySelector(".btn-check1");
const btnCheck2 = document.querySelector(".btn-check2");
const taskTitle = document.querySelector(".task-title");

btnStart.addEventListener("click", initiateProcess);
btnReset.addEventListener("click", resetAll);
voltageButtons.forEach((voltage) =>
  voltage.addEventListener("click", () => setVoltage(voltage))
);

let steadyState = 0;
let currentVoltage = 0;
//controls section
var v = 0;
var vf = 0;

//timing section
let simTimeId = setInterval("", "1000");
let TimeInterval = setInterval("", "1000");
let TimeInterval1 = setInterval("", "1000");
let time = 0;
let time1 = 0;
let time2 = 0;

//point tracing section and initial(atmospheric section)
// var t1 = [27.5, 26.5, 27, 26.5];
var t1 = [26, 26, 26, 26, 26, 26, 26];
var th = [45, 45, 45, 45, 45];
var off = [10.2, 11, 15, 23.3];

//temporary or dummy variables for locking buttons
var temp = 0;
var temp1 = 2;
var temp2 = 0;

function displayDiv(ele) {
  const taskScreen = document.querySelectorAll(".task-screen");
  taskScreen.forEach((task) => {
    task.classList.add("hide");
  });
  if (ele.classList.contains("tool-objective")) {
    document.querySelector(".objective").classList.remove("hide");
    taskTitle.textContent = "Objective";
  }
  if (ele.classList.contains("tool-description")) {
    document.querySelector(".description").classList.remove("hide");
    taskTitle.textContent = "Description";
  }
  if (ele.classList.contains("tool-explore")) {
    document.querySelector(".explore").classList.remove("hide");
    document.querySelector(".extra-info").classList.add("hide");
    document.querySelector(".graph-table").classList.add("hide");
    taskTitle.textContent = "Experiment";

    if (temp2 !== 1) {
      drawModel();
      startsim();
      varinit();
    }
  }
  if (ele.classList.contains("tool-practice")) {
    document.querySelector(".practice").classList.remove("hide");
    document.querySelector(".extra-info").classList.remove("hide");
    document.querySelector(".graph-table").classList.remove("hide");
    taskTitle.textContent = "Solve";

    if (temp2 == 1) {
      temp1 = 1;
      validation();
      document.querySelector("#info").innerHTML = "Temperature Gradient";
    } else {
      document.querySelector("#info").innerHTML =
        "Perform the experiment to solve the questions";
      document.querySelector(".graph-div").classList.add("hide");
      document.querySelector(".questions").classList.add("hide");
      document.querySelector(".extra-info").classList.add("hide");
      document.querySelector(".graph-table").classList.add("hide");
    }
  }
}
//Change in Variables with respect to time
function varinit() {
  if (time2 > 0) {
    t1[0] += off[0];
  }
  if (time2 > 1) {
    t1[1] += off[1];
  }
  if (time2 > 2) {
    t1[2] += off[2];
  }
  if (time2 > 3) {
    t1[3] += off[3];
  }
  if (time2 > 4) {
    t1[4] += off[4];
  }

  // vfspinner.textContent = vf;

  $(document).ready(function () {
    if (t1[0] > 90 || t1[1] > 90 || t1[2] > 90 || t1[3] > 90) {
      t1 = [45, 40, 30, 10];
      return;
    } else {
      // t11=temperature1.value;
      // t22=temperature2.value;
      // t33=temperature3.value;
      // t44=temperature4.value;
      var average = (t1[0] + t1[1] + t1[2] + t1[3]) / 4;

      temperature1.textContent = t1[0].toFixed(2);
      temperature2.textContent = t1[1].toFixed(2);
      temperature3.textContent = t1[2].toFixed(2);
      temperature4.textContent = t1[3].toFixed(2);
      temperature5.innerHTML = average.toFixed(2);
    }
  });
}

//water temperature changes
// function watertemp() {
//   switch (vf) {
//     case 26:
//       t1[6] += 2.2;
//       break;
//     case 54:
//       t1[6] += 1.2;
//       break;
//     case 60:
//       t1[6] += 1.2;
//       break;
//   }
// }

//stops simulations
function simperiod() {
  if (time1 >= 5.0) {
    clearInterval(TimeInterval);
    clearInterval(TimeInterval1);
    time1 = 0;
    time2 = 0;
    temp1 = 0;
    temp2 = 1;
    // watertemp();

    ctx.clearRect(460, 300, 70, 25);
    // t1[6] = t1[6].toFixed(1);
    // ctx.font = "15px Comic Sans MS";
    //ctx.fillText(t1[5]+" \u00B0C", 470, 170);
    // ctx.fillText(t1[6] + " \u00B0C", 650, 500);
    // printcomment("", 2);
  } else {
    drawGradient();
    steadyState = 5 - Math.round(time1);
    document.querySelector(
      ".comment"
    ).innerHTML = `Wait for  ${steadyState} seconds for steady state`;
    btnReset.setAttribute("disabled", true);
    if (steadyState === 0) {
      temp2 = 0;
      document.querySelector(
        ".comment"
      ).innerHTML = `The steady state is achieved
`;
      btnReset.removeAttribute("disabled");
    }
    printcomment(
      "Wait for " + (5 - Math.round(time1)) + " seconds for steady state",
      2
    );
  }
}
//draw gradient w.r.t. time in thermometer water flow and heater
function drawGradient() {
  ctx.fillStyle = "skyblue";
  ctx.fillRect(130, 65, 73, 97);

  //heater simulation
  var h = 80 * time1;
  //create gradient
  var grd1 = ctx.createLinearGradient(0, 0, 0, h);
  grd1.addColorStop(0, "white");
  grd1.addColorStop(1, "skyblue");
  // Fill with gradient
  ctx.fillStyle = grd1;
  ctx.fillRect(130, 65, 73, 97);

  //water simulation
  var w = 150 * time1;
  //create gradient
  var grd2 = ctx.createLinearGradient(0, 0, 0, w);
  grd2.addColorStop(1, "white");
  grd2.addColorStop(0, "#00bbff");
  // Fill with gradient
  ctx.fillStyle = grd2;
  ctx.fillRect(191, 233, 175, 85);
  ctx.beginPath();
  ctx.arc(228, 280, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(260, 255, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(300, 255, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(335, 280, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(283, 318, 65, 0, Math.PI, true);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  var background2 = new Image();
  background2.src = "./images//model2nobg.png";
  ctx.drawImage(background2, 0, 0, 550, 400);

  ctx.stroke();
}

// initial model
function drawModel() {
  ctx.clearRect(0, 0, 450, 500); //clears the complete canvas#simscreen everytime

  var background = new Image();
  background.src = "./images//model22.png";

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function () {
    ctx.drawImage(background, 0, 0, 550, 400);
    drawGradient();

    ctx.beginPath();
    ctx.arc(228, 280, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(260, 255, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(300, 255, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(335, 280, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(395, 50, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.fillText("Thermocouples", 400, 55);
  };
}

function comment1() {
  // if (currentVoltage != 0) {
  time = 0;
  temp = 1;
  // $("#vspinner").spinner({disabled : true});
  // //$("#vfspinner").spinner({disabled : true});
  // $("#vslider").slider({disabled : true});
  // $("#vfslider").slider({disabled : true});
  clearInterval(simTimeId);
  //printcomment("start simulation", 0);
  // if (currentVoltage == 10) {
  //   vf = 26;
  // } else if (currentVoltage == 20) {
  //   vf = 54;
  // } else if (currentVoltage == 30) {
  //   vf = 60;
  // }
  // offset();
  // }
}

//offset for thermometer and temp change
// function offset() {
//   if (currentVoltage == 10) {
//     //path = "./images//currentVoltage1.jpg";
//     off[0] = 19.1;
//     off[1] = 18.25;
//     off[2] = 18;
//     off[3] = 17.75;
//     off[4] = 15.5;
//   } else if (currentVoltage == 20) {
//     //path = "./images//currentVoltage2.jpg";
//     off[0] = 21.1;
//     off[1] = 20;
//     off[2] = 19.33;
//     off[3] = 18.75;
//     off[4] = 16.5;
//   } else if (currentVoltage == 30) {
//     //path = "./images//currentVoltage3.jpg";
//     off[0] = 23.7;
//     off[1] = 22.5;
//     off[2] = 22;
//     off[3] = 21.25;
//     off[4] = 18.5;
//   }
//   // temp1 = 0;
//   // temp2 = 1;
// }
function setVoltage(ele) {
  currentVoltage = Number(ele.value);
  btnStart.removeAttribute("disabled");
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; comment1(); ", "100");
}
function initiateProcess() {
  btnStart.setAttribute("disabled", true);
  btnReset.setAttribute("disabled", true);
  simstate();
}

function simstate() {
  if (temp == 1) {
    temp = 0;
    temp1 = 1;
    TimeInterval = setInterval("time1=time1+.1; simperiod();", "100");
    TimeInterval1 = setInterval("time2=time2+1; varinit()", "1000");
  }
}

//Calculations of the experienment
function validation() {
  var xValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  var yValues = [
    34.9, 35.2, 35.7, 35.9, 36, 36.8, 38.1, 38.8, 39.3, 39.7, 40.2,
  ];

  // Define Data
  var data = [
    {
      x: xValues,
      y: yValues,
      type: "scatter",
    },
  ];

  // Define Layout
  var layout = {
    margin: { t: 0, l: 35, r: 0, b: 30 },
    autosize: true,

    xaxis: {
      title: "Time(s)",
      range: [0, 56],
      fixedrange: true,
    },
    yaxis: {
      title: "Temp(&deg;C)",
      range: [33, 42],
      fixedrange: true,
    },
  };

  // Display using Plotly
  document.querySelector(".graph-div").classList.remove("hide");
  document.querySelector(".questions").classList.remove("hide");
  Plotly.newPlot("graph", data, layout, { displayModeBar: false });

  // drawgraph("graph", datapoints, "Length in meter", "Temperature in degree C");
  // if (currentVoltage == 10) {
  //   tempslope = slope[0];
  //   tempk = k[0];
  // } else if (currentVoltage == 20) {
  //   tempslope = slope[1];
  //   tempk = k[1];
  // } else if (currentVoltage == 30) {
  //   tempslope = slope[2];
  //   tempk = k[2];
  // }
  btnCheck1.addEventListener("click", () => validateAnswer1());
  btnCheck2.addEventListener("click", () => validateAnswer2());
}

function validateAnswer1() {
  const correctAnswer = document.querySelector(".correct-answer1");
  const unit = document.querySelector(".question-unit1");
  unit.innerHTML = `W`;
  let userEnteredValue = Number(
    document.querySelector(".question-input1").value
  );
  let answer =
    userEnteredValue <= 0.022 && userEnteredValue >= 0.0206 ? true : false;
  if (!userEnteredValue) return;
  if (!answer) {
    correctAnswer.classList.remove("hide");
    unit.innerHTML += " <span class='wrong'>&#x2717;</span>";
    correctAnswer.innerHTML = `<span class='correct'>Correct Answer </span>Q= 0.0209 W`;
  } else if (answer) {
    correctAnswer.classList.add("hide");
    unit.innerHTML += " <span class='correct'>&#x2713;</span>";
  }
}
function validateAnswer2() {
  const correctAnswer = document.querySelector(".correct-answer2");
  const unit = document.querySelector(".question-unit2");
  unit.innerHTML = `x10<sup>-8</sup>W/m<sup>2</sup>k<sup>4</sup>`;
  let userEnteredValue = Number(
    document.querySelector(".question-input2").value
  );
  let answer =
    userEnteredValue <= 1.0137 && userEnteredValue >= 1.0111 ? true : false;
  if (!userEnteredValue) return;
  if (!answer) {
    correctAnswer.classList.remove("hide");
    unit.innerHTML += " <span class='wrong'>&#x2717;</span>";
    correctAnswer.innerHTML = `<span class='correct'>Correct Answer </span> σ =1.185x10<sup>-8</sup>W/m<sup>2</sup>k<sup>4</sup>`;
  } else if (answer) {
    correctAnswer.classList.add("hide");
    unit.innerHTML += " <span class='correct'>&#x2713;</span>";
  }
}

function validateNearToAnswer(exactAnswer, userAnswer) {
  const tolerance = 0.01; // Define the tolerance level
  const lowerBound = exactAnswer - tolerance;
  const upperBound = exactAnswer + tolerance;

  if (userAnswer < lowerBound || userAnswer > upperBound) {
    return false; // Answer is outside the tolerance range
  } else {
    return true; // Answer is within the tolerance range
  }
}
function resetAll() {
  btnStart.removeAttribute("disabled");
  btnReset.setAttribute("disabled", true);
  document.querySelector(".comment").innerHTML = "";
  // if (temp1 == 0) {
  temp2 = 0;
  temp1 = 2;
  // t1 = [27.5, 27, 27, 26.5, 27.5, 27, 26.8];
  t1 = [26, 26, 26, 26, 26, 26, 26];
  th = [45, 45, 45, 45, 45];
  // currentVoltage = 0;
  // vf = 0;
  document.querySelector(".correct-answer1").innerHTML = "";
  document.querySelector(".question-unit1").innerHTML = `W`;
  document.querySelector(".question-input1").value = "";
  document.querySelector(".correct-answer2").innerHTML = "";
  document.querySelector(
    ".question-unit2"
  ).innerHTML = `x10<sup>-8</sup>W/m<sup>2</sup>k<sup>4</sup>`;
  document.querySelector(".question-input2").value = "";
  varinit();
  startsim();
  drawModel();
}

function movetoTop() {
  practiceDiv.scrollIntoView();
}
