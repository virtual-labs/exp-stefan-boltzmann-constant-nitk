//controls section
var v = 0;
var vf = 0;

//comments section
var commenttext="Some Text";
var calctext = "some Text";
var commentloc=0;

//graphics section
var canvas;
var ctx;

//timing section
var simTimeId = setInterval("",'1000');
var TimeInterval = setInterval("",'1000');
var TimeInterval1 = setInterval("",'1000');
var time=0;
var time1 = 0;
var time2 = 0;

//point tracing section and initial(atmospheric section)
var t1 = [27.5, 26.5, 27, 26.5];
var th = [45,45,45,45,45];
var off = [10.2,11,15,23.3];

//temporary or dummy variables for locking buttons 
var temp= 0;
var temp1 = 2;
var temp2 = 0;



function avg(){
let t1 = Number(document.getElementById('temp1').value) 
let t2 = Number(document.getElementById('temp2').value)
let t3 = Number(document.getElementById('temp3').value)
let t4 = Number(document.getElementById('temp4').value)
var average = (t1 + t2 + t3 + t4)/4;
    document.getElementById('avg').innerHTML = average.toFixed(2) + "&deg;C"
}

function switchscreen(){
  if(temp2==1){
      var imgfilename=document.getElementById('switchbutton').src;
      imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
      if(imgfilename=="bluefwddulls"){
        temp1 = 1;
        //printcomment("From the measured temperature T1 to T5 plot along the length of a rod with 200mm interval and calculate slope(dt/dx)",0);
        document.getElementById('switchbutton').src="./images//bluebkdulls.png";
        document.getElementById('calculation').style.visibility = "visible";
        document.getElementById('simscreen').style.visibility = "hidden";

        validation();
      }
    
      if(imgfilename=="bluebkdulls"){
        temp1 = 0;
       // printcomment("Click forward button for calculations", 1);
       // printcomment("Click restart button for doing experienment again", 2);
        document.getElementById('switchbutton').src = "./images//bluefwddulls.png";
        document.getElementById('calculation').style.visibility = "hidden";
        document.getElementById('simscreen').style.visibility = "visible";

        temp2 =1;
  
        $("#symbol1").attr("style", "visibility:hidden");
        $("#symbol2").attr("style", "visibility:hidden");
        $("#symbol3").attr("style", "visibility:hidden");
        $("#symbol4").attr("style", "visibility:hidden");
        content = '';
        $("#answer1").html(content);
        $("#answer2").html(content);
  
      } 
   }
}

function drawGradient(){

  ctx.fillStyle = "skyblue";
  ctx.fillRect(130, 65, 73, 97);

  //heater simulation
  var h = 80*time1;
  //create gradient
  var grd1 = ctx.createLinearGradient(0, 0,0 ,h)
  grd1.addColorStop(0,"white");
  grd1.addColorStop(1,"skyblue");
  // Fill with gradient
  ctx.fillStyle = grd1;
  ctx.fillRect(130, 65, 73, 97);


  //water simulation
  var w = 150*time1;
  //create gradient
  var grd2 = ctx.createLinearGradient(0, 0, 0,w )
  grd2.addColorStop(1,"white");
  grd2.addColorStop(0,"#00bbff");
  // Fill with gradient
  ctx.fillStyle = grd2;
  ctx.fillRect(191, 233, 175, 85);
  ctx.beginPath();
  ctx.arc(228, 280, 5, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(260, 255, 5, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(300, 255, 5, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(335, 280, 5, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(283, 318, 65, 0, Math.PI,true);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  var background2 = new Image();
  background2.src = "./images//model2nobg.png";
  ctx.drawImage(background2, 0, 0, 550, 400);

  ctx.stroke();
}


function drawModel()
{
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,550,400);  //clears the complete canvas#simscreen everytime
  
  var background = new Image();
  background.src = "./images//model2.png";

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
    ctx.drawImage(background, 0, 0, 550, 400); 
    drawGradient();

    ctx.beginPath();
    ctx.arc(228, 280, 5, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(260, 255, 5, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(300, 255, 5, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(335, 280, 5, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(445, 50,4, 0, 2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.fillText("Thermocouples",450,55);

  }
}


function comment1(){
    time = 0;
    temp = 1;
  }

function startsim()
{
	simTimeId=setInterval("time=time+0.1; comment1(); ",'100');
}

// switches state of simulation between temp 0:Playing & 1:Paused
function simstate()
{
  if (temp == 1){

    var imgfilename=document.getElementById('playpausebutton').src;
    imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
      if (imgfilename=="blueplaydull")
      {
        time=0;	
        document.getElementById('playpausebutton').src="./images//bluepausedull.png";
        temp = 0;
        temp1 = 1;
      
        TimeInterval = setInterval("time1=time1+.1; simperiod();",'100'); 
        TimeInterval1 = setInterval("time2=time2+1; varinit()", '1000');
    } 
  }
}

//restart simulation temp1 == 0: can restart experienment and variable initilization
function rotstate(){
  if(temp1==0)
    {
      temp2 = 0; temp1 = 2;
      t1 = [27.5, 27, 27, 26.5, 27.5, 27, 26.8];
      th = [45,45,45,45,45];

      startsim();
      varinit();
      drawModel();
      ctx.clearRect(0,0,550,400);
    }
} 

//stops simulations
function simperiod(){
  if(time1 >= 5.0){
    clearInterval(TimeInterval);
    clearInterval(TimeInterval1);
    time1 = 0;
    time2 = 0;
    temp1 = 0;
    temp2 = 1;
    document.getElementById('playpausebutton').src="./images//blueplaydull.png";
    watertemp();
    //printcomment("Click forward button for calculations", 1);
    //printcomment("Click restart button for doing experienment again", 2);
    ctx.clearRect(460, 300, 70, 25);
  }
  else{
    drawGradient();
  }
}

function varinit(){
  varchange();
  if(time2 > 0){ t1[0] += off[0];};
  if(time2 > 1){ t1[1] += off[1];};
  if(time2 > 2){ t1[2] += off[2];};
  if(time2 > 3){ t1[3] += off[3];};
  if(time2 > 4){ t1[4] += off[4];};
 
  $(document).ready(function() {
    if(t1[0]>90 ||t1[1]>90||t1[2]>90||t1[3]>90)
    {
      t1=[45,40,30,10];
      return;
    }
    else{
      $('#temp1').val(t1[0].toFixed(2));
      $('#temp2').val(t1[1].toFixed(2));
      $('#temp3').val(t1[2].toFixed(2));
      $('#temp4').val(t1[3].toFixed(2));
    }
  });
}

  function varchange(){
    $(document).ready(function() {
      $("#temp1").val(t1[0]);
      $("#temp2").val(t1[1]);
      $("#temp3").val(t1[2]);
      $("#temp4").val(t1[3]);
    });
}
  
function openobservation() {
  document.getElementById("IBobservation").style.display = 'block';
}

function closeobservation() {
  document.getElementById("IBobservation").style.display = 'none';
}

function validation(){

  $("#qvalue").click(function(){
    $("#symbol2").attr("style", "visibility:hidden");
    $("#symbol1").attr("style", "visibility:hidden");

    if($("#slopevalue").val()<= 0.022 && $("#slopevalue").val()>=0.0206){
      $("#symbol2").attr("style", "visibility:visible; color: #028102;");
      var content = '';
    }
    else{
      $("#symbol1").attr("style", "visibility:visible; color:red;");
      var content = '<p><span style=" color: #028102;">Answer</span> <span style="color: #e7722b;">Q= 0.0209 W</span> ';
        
    }
    $("#answer1").html(content);
  });

  $("#ksubmit").click(function(){
    $("#symbol4").attr("style", "visibility:hidden");
    $("#symbol3").attr("style", "visibility:hidden");

    if($("#kvalue").val()<=1.2 && $("#kvalue").val()>=1.18){
      $("#symbol4").attr("style", "visibility:visible; color:#028102;");
      var content = '';
    }
    else{
      $("#symbol3").attr("style", "visibility:visible; color:red;");
      var  content = '<p><span style=" color: #028102;">Answer</span> <span style="color: #e7722b;"> σ =1.185x10<sup>-8</sup>W/m<sup>2</sup>k<sup>4</sup></span> ';
    }
    $("#answer2").html(content);
  });
}
