// sinte
var sinte=new Tone.PolySynth(12,Tone.Synth);
var volSynth=-30;
var ondas=["sine", "square", "triangle", "sawtooth","pwm","pulse"];
var numOnda=0;
var freqSinte=555;
var portamentoOxygen=0;
var arrNotas=[];
var arrMotive=[];//porsiaca
var holding=false;
var recording=false;
var recStartTime;
var recStopTime;
var grabacion=["C4"];
var tiemposGrabacion=[];
var longitudNotaGrabacion="4n";

var grabacionSeq;

//var reb=new Tone.reberb()
//var reverb = new Tone.Freeverb(0.9,1000).connect(Tone.Master);
//connecting the synth to reverb through delay
//sinte.connect(reverb);

sinte.set({ "oscillator" : {
        "type" : "sine"  //)"modulationFrequency" : 0.2
}});
sinte.set({
	"envelope" : {
		"attack" : 0.0001,
		"decay": 0.5,
		"sustain":0.3,
		"release":0.01
}});
sinte.volume.value=volSynth;


tocanota=function(a,b){

	let n=Tone.Frequency(a, "midi").toNote();
	sinte.triggerAttack(n,Tone.Transport.now,b/254+0.5);

  console.log("play "+n+" velocity= "+(b/254+0.5))
	ponVisual(n);

  if(arrNotas.indexOf(n)==-1){ arrNotas.push(n)};

  if (recording){grabacion.push(n),tiemposGrabacion.push(Tone.Transport.now())}
}

paranota=function(a){

	let n=Tone.Frequency(a, "midi").toNote();
  if(arrMotive.indexOf(n)!=-1){return}//si la nota no está en arrMotive

  sinte.triggerRelease(n);
  arrNotas.splice(arrNotas.indexOf(n),1)
}

tocanotaAxiom=function(d){

	if (d[0]==144){
		if(d[2]>0){
			let n=Tone.Frequency(d[1], "midi").toNote();
			sinte.triggerAttack(n,Tone.Transport.now);
			ponVisual(n);
			console.log("toco "+n)
		} else {
			let n=Tone.Frequency(d[1], "midi").toNote();
			sinte.triggerRelease(n)
			console.log("intenta parar "+n)
		}
	}else if(d[0]==176){

	}
}

tocanotaOxygen=function(d){
  if (d[0]==144){
    let n=Tone.Frequency(d[1], "midi").toNote();
		if(d[2]>0){
      sinte.triggerAttack(n,Tone.Transport.now,(d[2]/127)*0.8+0.20);
      ponVisual(n);
      console.log("tocoxy "+n)
    } else {
      sinte.triggerRelease(n)

    }
  } else if(d[0]==176){
    switch (d[1]) {
      case 5:
        filtraSinte(d[2])
        break;
      case 6:
        resuenaSinte(d[2]);
        break;
      case 33:
        sinte.volume.value=(d[2]-127)/3;
        console.log("vol = "+sinte.volume.value)
        break;
      case 71:
        portamenta(d[2])
        break;
      case 21:
        cambiaOnda(-1)
        break;
      case 22:
        cambiaOnda(1)
        break;

      default:

        console.log("default Oxygen "+d);
    }

	}
};



cambiaOnda=function(a){
  sinte.volume.value=-50;
	if(a>0&&numOnda<ondas.length-1){
		numOnda++;
		sinte.set({
    	"oscillator" : {
        "type" : ondas[numOnda]}
    });
	}else if(a<0&&numOnda>0){
		numOnda--;
		sinte.set({
    	"oscillator" : {
        "type" : ondas[numOnda]}
  	});
	}
	console.log(ondas[numOnda]+" vol= "+volSynth);
  sinte.volume.exponentialRampToValue(volSynth,1);
}

filtraSinte=function(a){
	freqSinte+=a*40;
	if (freqSinte<1) {freqSinte=1}else if(freqSinte>20000){freqSinte=20000}
	filtroSinte.frequency.value=freqSinte;
	console.log("synth filter "+filtroSinte.frequency.value+" a= "+a)
}

resuenaSinte=function(a){
  filtroSinte.Q.value+=a;
  if(filtroSinte.Q.value<0){filtroSinte.Q.value=0}
  console.log("synth resonance "+filtroSinte.Q.value)
}

portamenta=function(a){
  if (a==undefined) { portamentoOxygen=0 }
  else { portamentoOxygen=a/12 }

  sinte.set({
    "portamento":portamentoOxygen
  });
  console.log("portamento: "+portamentoOxygen)
}


ataca=function(a){
  if(inst==5){
    controlaRayos(a)
  }else{
		var at=sinte.get(["envelope"]).envelope.attack+a/100; /////   attack
		if(at<0.001){at=0.001}else if(at>5){at=5}
		sinte.set({
    "envelope" : {
        "attack" : at
    	}
		});
		console.log("attack "+at)

  }
}

decae=function(a){
		var at=sinte.get(["envelope"]).envelope.decay+a/100; /////   attack
		if(at<0){at=0}else if(at>5){at=5}
		sinte.set({
    "envelope" : {
        "decay" : at
    	}
		});
		console.log("decay "+at)
}

sosten=function(a){
		var at=sinte.get(["envelope"]).envelope.sustain+a/100;
		if(at<0){at=0}else if(at>1){at=1}
		sinte.set({
    "envelope" : {
        "sustain" : at
    	}
		});
		console.log("sustain "+at)
}

relaja=function(a){
	var at=sinte.get(["envelope"]).envelope.release+a/100;
	if(at<0){at=0}else if(at>29){at=29}
	sinte.set({
	"envelope" : {
			"release" : at
		}
	});
	console.log("release "+at)
}


hold=function(){
  if(holding==false){
    holding=true;
    arrMotive=arrNotas.slice();
  }else{
    for(var i=0;i<arrMotive.length;i++){
      sinte.triggerRelease(arrMotive[i]);
    }
    arrMotive=[];
    holding=false;
  }
}

record=function(){
  grabacionSeq=new Tone.Sequence(function(time, note){
  	sinte.triggerAttackRelease(note,"8n",time);
    console.log(note);
    ponVisual("z");
  }, ["C4",["G3","A3"]],longitudNotaGrabacion).start();
  grabacionSeq.removeAll();
  grabacion=[];
  tiemposGrabacion=[];
  recording=true;
  recStartTime=Tone.Transport.now();
  console.log("record ");
}

stopRecord=function(){

  recStopTime=Tone.Transport.now();

  for(var i=0;i<grabacion.length;i++){
      grabacionSeq.at(i,grabacion[i]);
  }

  recording=false;

  console.log("stop recording");
}
