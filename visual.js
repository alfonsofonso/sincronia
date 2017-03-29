//visual.js

arr=[];
var amp=0;
var alt=0;
var radio=0;
var margen=100;
var stage = new createjs.Stage("micanvas");
var funVisuals=[];////// visuales
var visualActivo=0;
var velSpacial=12000;
var percVel=300;
var noteVel=1000;
var destellar=true;
var rayos=[];
var numRayos=0;
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick", tick);


ponRayo=function(r){
  if(r=="z"){return}
  var  newDiv = document.createElement("div");
  newDiv.style.position="absolute";
  newDiv.style.backgroundColor="rgba(256,256,256,.8)";//getRandomColor();
  newDiv.style.width="3000px";
  newDiv.style.height="10px";
  //newDiv.style.zIndex="-1"
  newDiv.style.filter="blur(5px)";
  //  newDiv.style.animationDuration=girovelo*1000+"ms";
  //newDiv.style.animationDuration=Math.round(10000)+"ms";
  newDiv.style.top=Math.random()*90+"%";
  newDiv.style.left=Math.random()*500-1300+"px";
  document.body.appendChild(newDiv);
  rayos.push(newDiv);
  if(numRayos==rayos.length-1){
  numRayos++;}
}
controlaRayos=function(r){
  if (r<0&&numRayos>0){
      document.body.removeChild(rayos[numRayos-1]);
      numRayos--;
      console.log("quito rayo")
  }else if(r>0&&rayos.length>numRayos) {
      document.body.appendChild(rayos[numRayos]);
      numRayos++;
          console.log("pongoo rayo")
  }
}

ponEstrella=function(a){// es un circulo
  var vel;
  var ang= Math.random()*360;
  var r=radio+margen;
  var equis=(r/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  var igriega=(r/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang)) + alt/2;

  if(a=="b"||a=="c"||a=="s"||a=="z"){
    ponNave(a);return }
  else{
    vel=velSpacial;
    creaDestello(equis,igriega)
  }
  var circle = new createjs.Shape();
  circle.graphics.beginFill("white").drawCircle(2, 2, 2);
  circle.x = equis
  circle.y = igriega;
  stage.addChild(circle);

  var tamanyo=Math.random()*24;
  createjs.Tween.get(circle)
    .to({ x:r*Math.cos(ang)+amp/2,y:r*Math.sin(ang)+alt/2,
      scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
    .call(handleComplete, [circle]);
}

ponNave=function(a){
  var square = new createjs.Shape();
  var ang= Math.random()*360;
  var r=radio+margen;
  var dest=0;
  if(a=="b"){
      dest=alt/2;
    square.graphics.beginFill("grey").drawRect(-5, -5, 10,10)// x y width height
  }else if(a=="c"){//charles
    dest=-24;
    square.graphics.beginFill("grey").drawRect(-5, -5, 10,10)
  }else if(a=="s"){//if(a=="s"){ caja
    dest=alt+24;
    square.graphics.beginFill("white").drawRect(-6, -6, 12,12)
  }else{
    dest=alt
    square.graphics.beginFill("grey").drawRect(-1400, -1, 2800,2)
  }
  square.x = amp/2;
  square.y = alt/2;
  stage.addChild(square);
  var tamanyo=Math.random()*24;

  console.log(dest)
  createjs.Tween.get(square)
    .to({ y:dest,x:Math.random()*3000-1500,
      scaleX:tamanyo, scaleY:tamanyo},percVel, createjs.Ease.getPowIn(4))
    .call(handleComplete, [square]);
}

creaDestello=function(x,y){
  if(!destellar){return}
  var destello=new createjs.Shape();
  destello.graphics.beginFill("white").drawRect(-2000,1,4000,1);
  destello.graphics.beginFill("white").drawRect(1,-1000,1,2000);
  destello.x=x;destello.y=y;
  stage.addChild(destello);
  createjs.Tween.get(destello).to({visible:false }, 100).call(handleComplete, [destello]);
}

function handleComplete(a) {
  stage.removeChild(a);
}

ponVisual=function(a){
  funVisuals[visualActivo](a);
}

funVisuals=[ponEstrella,ponRayo];


/////     HELPERS

function tick(event) { stage.update() }
window.onresize = function(event) {
  ajustaCanvas()
}
ajustaCanvas=function(){
  var ctx = document.getElementById("micanvas");
  amp=ctx.width  = window.innerWidth;
  alt=ctx.height = window.innerHeight;
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);


}
escribe=function(t){
  console.log(t);
  var i=document.getElementById("consola");
  i.value="";
  eval(t);

}
////// on start
ajustaCanvas();
