//For color choices, having 8 colors tends to have some improper displays when using displayRange
var c = ["orange", "#E3D985", "#BCD8C1"];
var winterc = ["#ffffff","#cdced3","#c9c8bd","#bf874c","#669297","#1b3338","#151a1d"];
var springc = ["#147f73","#60b520","#c7f473","#edff7a","#ffbb32","#d32c13"];
var fallc = ["#aba7a5","#f0c866","#c66632","#cc5500","#82291a","#3b3923","#111520"];
var summerc = ["#fde74c","#ffbb32",  "#fa7921", "#f93416","#ff1654","#f3ffbd","#b2dbbf","#247ba0","#06d6a0"];
var colors = [c,springc,summerc,fallc,winterc];
var selectedIndex = 2;


function clearDisplayColors(colorArray){

  for (var i = 1;i <= colorArray.length;i++){
    $("#color" + i).css("background-color","RGB(0,0,0,0)");
  }
  $("#rangeDisplay").css("opacity","0");
}

//When document has loaded
$(document).ready(function(){
  //Colors to be selected
  
  function randomColor(){
    $(".page").css("background-color",colors[selectedIndex][Math.round(Math.random(0,1) * colors[selectedIndex].length)]);
  }
  randomColor();
  
  //If first time user uses website, display arrow telling user to click bottom of page to see options button
  var dist = 70;
  var arrowAnimation;
  $("#downArrow").css("transform","translate(0," + 0 + "px)");
  dist = 70;
  arrowAnimation = window.setInterval(function(){
    $("#downArrow").css("transform","translate(0," + dist + "px)");
    if (dist == 70){
      dist = 0;
    }
    else {
      dist = 70;
    }
  },500)
  
  
  
  //Delete old div and append new one with new colors
  function displayRange(colorArray){
    var myNode = document.getElementById("rangeDisplay");
    while (myNode.firstChild) {

        myNode.removeChild(myNode.firstChild);
    }
    for (var i = 1; i <= colorArray.length; i++){
      $("#rangeDisplay").append("<div class=\"dispC\" id=\"color" + i + "\"></div>")
      $("#color" + i).css("left",((i-1) / colorArray.length) * 100 +"%");
      $("#color" + i).css("width",100/colorArray.length + "%");
    }
          
    for (var i = 1; i <= colorArray.length; i++){
      $("#color" + i).css("background-color",colorArray[i-1]);
      $("#rangeDisplay").css("opacity","1");
    }
  }
  
  //Hover over color pallete choices and temporarily display the range of colors
  $("#spring").hover(function(){
    displayRange(springc);
  }, function(){clearDisplayColors(springc)});
  $("#winter").hover(function(){
    displayRange(winterc)
  }, function(){clearDisplayColors(winterc)});
  $("#fall").hover(function(){
    displayRange(fallc)
  }, function(){clearDisplayColors(fallc)});
  $("#summer").hover(function(){
    displayRange(summerc)
  }, function(){clearDisplayColors(summerc)});
  
  //toggle full screen from anywhere
  $(".page").on("click",function(){
    toggleFullScreen();
  });
  
  
  //Select color pallete
  $("#spring").click(function(){
    selectedIndex = 1;
    randomColor();
  });
  $("#summer").click(function(){
    selectedIndex = 2;
    randomColor();
  });
  $("#fall").click(function(){
    selectedIndex = 3;
    randomColor();
  });
  $("#winter").click(function(){
    selectedIndex = 4;
    randomColor();
  });
  
  
  
  //Rotate background colors
  window.setInterval(function(){
    randomColor();
  },3000)

  var tst = false;
  var timer;
  $("#options").on("click",function(){
    if (tst == false){
      tst = true;
      $("#optionsPage h4").css("display","inline-block");
      $("#optionsPage h4").css("border","2px dashed RGBA(255,255,255,1)");
      $("#optionsPage h4").css("color","RGBA(255,255,255,1)");
      $("#optionsPage").css("z-index","10");
      $("#maple path").css("fill","RGBA(255,255,255,1)");
      //$("#optionsPage h4 img").css("opacity","1");
      
      clearTimeout(timer);
      window.setTimeout(function(){
        
      }, 1000);
    }
    else {
      tst = false;
      //$("#optionsPage h4 img").css("opacity","0");
      $("#maple path").css("fill","RGBA(255,255,255,0)");
      $("#optionsPage h4").css("border","2px dashed RGBA(255,255,255,0)");
      $("#optionsPage h4").css("color","RGBA(255,255,255,0)");
      clearTimeout(timer);
      timer = window.setTimeout(function(){
        $("#optionsPage").css("z-index","0");
      }, 1000);
    }
  });
  
  //From stackoverflow, the below function replaces each image with class .svg into a inline svg
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');  
  });
  //when mouse moves, if it moves to bottom part of page, do stuff
  $(document).mousemove(function(e){
    var C = [0,0]    
    C[0] = e.pageX; 
    C[1] = e.pageY; 
    var height = window.innerHeight;
    if (e.pageY >= height - 150){
      $(".footer").css("transform","translate(0,0px)");
      $("#options").css("border","2px dashed RGBA(50,50,50,1)");
      $("#options").css("color","RGBA(50,50,50,1)");

      $("#downArrow").css("opacity","0");
    }
    else {
      $(".footer").css("transform","translate(0,30px)");
      $("#options").css("border","2px dashed RGBA(50,50,50,0)");
      $("#options").css("color","RGBA(50,50,50,0)");
    }
  });
  
});
function keyEvent(){
  $(".page").css("background-color",colors[selectedIndex][Math.round(Math.random(0,1) * colors[selectedIndex].length)]);
}



function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}