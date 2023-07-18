var status="";
var array=[]
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
  }
  
  function modelLoaded() {
    console.log("¡Modelo cargado!")
    status = true;
  }
  
  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    array = results;
  }
  
  
  function draw() {
    image(video, 0, 0, 380,380);
    if(status!=""){
      objectDetector.detect(video, gotResult);
      for(var contador=0;contador<array.length; contador++){
        document.getElementById("status").innerHTML="deteccion_de_objetos"
        document.getElementById("numero_de_objetos").innerHTML="numero de objetos detectados: "+array.length
        fill("aqua");
        var seguridad=floor(array[contador].confidence*100)
        text(array[contador].label +"  " +seguridad+"%",array[contador].x+15,array[contador].y+15)
        noFill();
        stroke("aqua");
        rect(array[contador].x,array[contador].y,array[contador].width,array[contador].height)
      }
    }
  }
