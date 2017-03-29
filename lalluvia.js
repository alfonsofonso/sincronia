//cancion1
var tempoBPM=100;
var inst=0;
var instrumentos=[bombo,charles,caja,sinte];
var instLoops=[bomb,charls,caj]
var instVols=[bomboVol,charlesVol,cajaVol,sinteVol];
var sonando=0;
var quantization=["2n","4n","4t","8n","8t","16n","16t","32n","64n","128n"];
var delayando=true;
Tone.Transport.bpm.value=tempoBPM;

//set the attributes using the set interface
sinte.set("detune", -1200);


//////////////////////////////////////////     EFECTOS  excepto delays i reverbs  //////////
var limitador=new Tone.Limiter(-3).toMaster();
var limitBombo=new Tone.Limiter(-3);
var limitCharles=new Tone.Limiter(-3);
var limitCaja=new Tone.Limiter(-3);
var limitSinte=new Tone.Limiter(-3);
var filtroBombo=new Tone.Filter(freqFilterBombo);
var filtroCharles=new Tone.Filter(freqFilterCharles);
var filtroCaja=new Tone.Filter(freqFilterCaja);
var filtroSinte=new Tone.Filter(freqSinte)


//////////////////////////////////////////     CONEXIONES
sinte.connect(delaySinte);
delaySinte.connect(filtroSinte)
filtroSinte.connect(reverbSinte);
reverbSinte.connect(limitSinte);
limitSinte.connect(limitador);

charles.connect(delayCharles);
delayCharles.connect(filtroCharles);
filtroCharles.connect(reverCharls);
reverCharls.connect(limitCharles);
limitCharles.connect(limitador);

caja.connect(delayCaja);
delayCaja.connect(filtroCaja)
filtroCaja.connect(reverCaj);
reverCaj.connect(limitCaja);
limitCaja.connect(limitador);

bombo.connect(delayBombo);
delayBombo.connect(filtroBombo);
filtroBombo.connect(reverbomb);
reverbomb.connect(limitBombo);
limitBombo.connect(limitador);


var i =0;

var cancion=[Cm[5],Cm[3],Cm[0],Cm[6],Cm[5],Cm[3],Cm[0],Cm[6],Cm[5],cM[4],Cm[0],Cm[3],
Cm[7],cM[4],cM[0],cM[5],cM[2],cM[3],cM[4],cM[7]];


//////////////////////////////////////    FUNCIONES   ··················
//knob1
modVol=function(a){
	if(inst==0){
		console.log("afecta a todos");
	}else if(inst<5){

  	instrumentos[inst-1].volume.value+=a;
  	if(instrumentos[inst-1].volume.value>0){
			instrumentos[inst-1].volume.value=0;
		}else if(instrumentos[inst-1].volume.value<-100){
			instrumentos[inst-1].volume.value=-100}

		instVols[inst-1]=instrumentos[inst-1].volume.value;
		console.log(instrumentos[inst-1]+" "+instVols[inst-1])
	}else if(inst==5){
		console.log("vol menu struckt")
	}else if(inst==6){
		console.log("volumen menu visuals")
	}
}

modFreq=function(a){
	if(inst==0){
		console.log("Pitch afecta a todos");
	}else if(inst==1){
		notaBombo+=a;
    if(notaBombo<0){notaBombo=0}else if(notaBombo>880){notaBombo=880}
    console.log("notaBombo = "+notaBombo);
	}else if(inst==2){
		if(a<0){charles.set("noise.type", "brown");
		}else if(a>0){charles.set("noise.type", "pink");}
		console.log("color HiHat");
	}else if(inst==3){
		notaCaja+=a;
		if(notaCaja<-50){notaCaja=-50}else if(notaCaja>50){notaCaja=50}
		console.log("notaCaja = "+notaCaja);
	}else if(inst==4){
		cambiaOnda(a);
	}else if(inst==5){
		console.log("pitch menu struct")
	}else if(inst==6){
		console.log("visualPitch")
	}
}

filtra=function(a){
	switch (inst) {
		case 0:
			console.log("filtra todo")
			break;
		case 1:
			filtraBombo(a)
			break;
		case 2:
			filtraCharles(a);
			break;
		case 3:
			filtraCaja(a);
			break;
		case 4:
			filtraSinte(a);
			break;
		default:
			console.log("def filtr")
	}

}

resuena=function(a){
	switch (inst) {
		case 0:
			console.log("res all");
			break;
			case 1:
				resuenaBombo(a);
				break;
				case 2:
					resuenaCharles(a);
					break;
					case 3:
						resuenaCaja(a);
						break;
						case 4:
							resuenaSinte(a)
							break;
		default:
			console.log("def res")
	}
}

//knob 5
attack=function(a){
	switch (inst) {
						case 4:
							ataca(a);
							break;
							case 5:
								console.log("struckt Atack")
								break;
								case 6:
									velSpacial+=a;if(velSpacial<0){velSpacial=0}else if(velSpacial>12){velSpacial=12}
									break;
		default:
		console.log("def attack")
	}
}
decay=function(a){
	switch (inst) {

						case 4:
							decae(a);
							break;
							case 5:
								console.log("struckt decay")
								break;
		default:
		console.log("def decay")
	}
}
sustain=function(a){
	switch (inst) {

						case 4:
							sustain(a);
							break;
							case 5:
								console.log("struckt sustain")
								break;
		default:
		console.log("def sustain")
	}
}
release=function(a){
	switch (inst) {
						case 4:
							relaja(a);
							break;
							case 5:
								console.log("struct release")
								break;
		default:
		console.log("def release")
	}
}

//knob 9
mueve=function(a){
	switch (inst) {
		case 0:
			console.log("mueve todo")
			break;
		case 1:
			if(offsetBombo!=="number"){offsetBombo=Tone.Time(offsetBombo).eval()}
			offsetBombo+=a/1000;
			if(offsetBombo<0){offsetBombo=0}else if(offsetBombo>1){offsetBombo=1}
			console.log("offsetBombo: "+offsetBombo)
			break;
		case 2:
			if(offsetCharls!=="number"){offsetCharls=Tone.Time(offsetCharls).eval()}
				offsetCharls+=a/1000;
				if(offsetCharls<0){offsetCharls=0}else if(offsetCharls>1){offsetCharls=1}
				console.log("offsetCharls: "+offsetCharls)
			break;
		case 3:
			if(offsetSnare!=="number"){offsetSnare=Tone.Time(offsetSnare).eval()}
			offsetSnare+=a/1000;
			if(offsetSnare<0){offsetSnare=0}else if(offsetSnare>1){offsetSnare=1}
			console.log("offsetSnare: "+offsetSnare)
			break;
		case 4:
			console.log("mueve sinz?")
			break;
		case 5:
			console.log("mueve struckt")
			break;
		case 7:
			console.log("mueve visuals")
			break;
		default:

	}
}
//knob 10
limita=function(a){
	switch (inst) {
		case 0:
			if(a>0&&limitador.threshold.value<0){limitador.threshold.value++}
			else if(a<0&&limitador.threshold.value>-50){limitador.threshold.value--}
			console.log("limita todo: "+limitador.threshold.value);
			break;
		case 1:
			if(a>0&&limitBombo.threshold.value<0){limitBombo.threshold.value++}
			else if(a<0&&limitBombo.threshold.value>-100){limitBombo.threshold.value--}
			console.log("limit drum: "+limitBombo.threshold.value);
			break;
		case 2:
			if(a>0&&limitCharles.threshold.value<0){limitCharles.threshold.value++}
			else if( a<0 && limitCharles.threshold.value>-100){limitCharles.threshold.value--}
			console.log("limit charls: "+limitCharles.threshold.value);
			break;
		case 3:
			if(a>0&&limitCaja.threshold.value<0){limitCaja.threshold.value++}
			else if(a<0&&limitCaja.threshold.value>-100){limitCaja.threshold.value--}
			console.log("limit snare: "+limitCaja.threshold.value);
			break;
		case 4:
			if(a>0&&limitSinte.threshold.value<0){limitSinte.threshold.value++}
			else if(a<0&&limitSinte.threshold.value>-100){limitSinte.threshold.value--}
			console.log("limit synth: "+limitSinte.threshold.value);
			break;
		case 5:
			console.log("limit structure");
			break;
		case 6:
			console.log("limit visuals");
			break;
		default:
			console.log("def limit")
	}

}
//sigue en delayador
combina=function(a){console.log("combino")};

dale=function(){
	if(!sonando){
		Tone.Transport.start();
		sonando=1;
	}else{
		Tone.Transport.stop();
		sonando=0;
	}
}

tempo=function(a){
	tempoBPM=a;
	if (tempoBPM<1) {
		tempoBPM=1
	}else if(tempoBPM>1000){tempoBPM=4000}
	Tone.Transport.bpm.value=tempoBPM;
	console.log("tempoBPM= "+tempoBPM)

}

pinta=function(t){
	console.log(t);//+" "+arguments.callee.caller.toString());
}
