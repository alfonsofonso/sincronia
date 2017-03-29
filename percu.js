
var bucleBombo="4n";
var bucleCharles="4n";
var bucleCaja="1m/2"
var velBombo=0.1;

var offsetBombo=0;
var offsetCharls=0.3;
var offsetSnare=0.56;

var duracionBombo="8n";

var notaBombo=25;
var notaCharles=32;
var notaCaja=-2;

var tiempos=["2m","1m","0:2","4n+8n","4n","4t","8n","8t","16n","16t","16n/2","16n/4","16n/8"];

var freqFilterBombo=555;
var freqFilterCharles=6555;
var freqFilterCaja=1555;

var lofreq=400;
var hifreq=2500;
var caja,charles;

var bomboVol=-20;
var charlesVol=-40;
var cajaVol=-80;
var sinteVol=-30;

///////    CACHARROS

var bombo=new Tone.MembraneSynth();
	bombo.volume.value=bomboVol;
	var bomb = new Tone.Loop(function(time){
	//triggered every eighth note.
	bombo.triggerAttackRelease(notaBombo, duracionBombo,time+offsetBombo,velBombo);
	Tone.Draw.schedule(function(){
	if(instVols[0]>-50){ ponVisual("b")}}, time+offsetBombo);

}, bucleBombo).start(0.005);


var charles= new Tone.NoiseSynth()
		charles.volume.value=charlesVol;
	var charls=new Tone.Loop(function(time){
		charles.triggerAttackRelease("1m",time+offsetCharls);
		Tone.Draw.schedule(function(){
			if(instVols[1]>-50){ponVisual("c")}}, time+offsetCharls);

},bucleCharles).start(0.007);


var caja=new Tone.Sampler("caja.mp3");
	caja.volume.value=cajaVol;
	var caj=new Tone.Loop(function(time){
	caja.triggerAttackRelease(notaCaja,"4n",time+offsetSnare)// (interval, duration[, time][, velocity])
	Tone.Draw.schedule(function(){
		if(instVols[2]>-50){ponVisual("s")}}, time+offsetSnare);
},bucleCaja).start(0.004);



pithBendArturia=function(d){
	var t=instLoops[inst-1];
	if(inst==4||inst==0){t= instLoops[0]}

	if(d>64){
		t.interval=tiempos[Math.round((d-63)/8)];
	}else if(d==64){
		t.interval="4n";
	}else{
		t.interval=tiempos[Math.round(d/16)];
	}
	console.log("resolution "+t.interval+ " "+d)
}


filtraBombo=function(a){
	freqFilterBombo+=a*2;
	if (freqFilterBombo<1) {freqFilterBombo=1}
	filtroBombo.frequency.value=freqFilterBombo;
	console.log("filtroBombo "+filtroBombo.frequency.value)
}

filtraCharles=function(a){
	freqFilterCharles+=a*10;
	if (freqFilterCharles<1) {freqFilterCharles=1}
	filtroCharles.frequency.value=freqFilterCharles;
	console.log("freqFilterCharles "+filtroCharles.frequency.value)
}

filtraCaja=function(a){
	freqFilterCaja+=a*2;
	if (freqFilterCaja<1) {freqFilterCaja=1}
	filtroCaja.frequency.value=freqFilterCaja;
	console.log("freqFilterCaja "+filtroCaja.frequency.value)
}

resuenaBombo=function(a){
	filtroBombo.Q.value+=a;
	if(filtroBombo.Q.value<0){filtroBombo.Q.value=0}
	console.log("resbombo "+filtroBombo.Q.value)
}

resuenaCharles=function(a){
	filtroCharles.Q.value+=a;
	if(filtroCharles.Q.value<0){filtroCharles.Q.value=0}
	console.log("resuenaCharles "+filtroCharles.Q.value)
}

resuenaCaja=function(a){
	filtroCaja.Q.value+=a;
	if(filtroCaja.Q.value<0){filtroCaja.Q.value=0}
	console.log("resSnare "+filtroCaja.Q.value)
}
