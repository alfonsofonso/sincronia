//delayador

var tiemposD=["0:2","4n+8n","4n","4t","8n","8t","16n","16t","16n/2","16n/4","16n/8"];

var delayTimeBombo=1;
var delayTimeCharles=1;
var delayTimeCaja=1;
var delayTimeSinte=1;

var delayTimeBomboQ=tiempos[0];
var delayTimeCharlesQ=tiempos[0];
var delayTimeCajaQ=tiempos[0];
var delayTimeSinteQ=tiempos[0];

var feedbackBombo=0.1;
var feedbackCharles=0.1;
var feedbackSinte=0.1;
var feedbackCaja=0.1;

var wetDelayBombo=0;
var wetDelayCharles=0;
var wetDelayCaja=0;
var wetDelaySinte=0;

var delayBombo=new Tone.FeedbackDelay(delayTimeBomboQ, feedbackBombo);
	delayBombo.wet.value=0.01;
var delayCharles=new Tone.FeedbackDelay(delayTimeBomboQ, feedbackBombo);
	delayCharles.wet.value=0.01;
var delayCaja=new Tone.FeedbackDelay(delayTimeBomboQ, feedbackBombo);
	delayCaja.wet.value=0.01;
var delaySinte=new Tone.FeedbackDelay(delayTimeBomboQ, feedbackBombo);
	delaySinte.wet.value=0.01;

var reverbomb=new Tone.Freeverb(0);
	reverbomb.wet.value=0.01;
var reverCharls=new Tone.Freeverb(0);
	reverCharls.wet.value=0.01;
var reverCaj=new Tone.Freeverb(0);
	reverCaj.wet.value=0.01;
var reverbSinte=new Tone.Freeverb(0);
	reverbSinte.wet.value=0.01;



delaya=function(a){
		switch (inst) {
			case 0:
				pinta("delay time global ")
				break;
			case 1:
				delayTimeBombo+=a/1000;
				if(delayTimeBombo<0){  delayTimeBombo=0;  }else if (delayTimeBombo>1){delayTimeBombo=1}
				delayBombo.delayTime.value=delayTimeBombo;
				pinta("delay time drum: "+delayTimeBombo);
				break;
			case 2:
				delayTimeCharles+=a/1000;
				if(delayTimeCharles<0){delayTimeCharles=0}else if (delayTimeCharles>1){delayTimeCharles=1}
				delayCharles.delayTime.value=delayTimeCharles;
				pinta("delay time charles: "+delayTimeCharles);
				break;
			case 3:
				delayTimeCaja+=a/1000;
				if(delayTimeCaja<0){delayTimeCaja=0}else if (delayTimeCaja>1){delayTimeCaja=1}
				delayCaja.delayTime.value=delayTimeCaja;
				pinta("delay time snare: "+delayTimeCaja);
				break;
			case 4:
				delayTimeSinte+=a/1000;
				if(delayTimeSinte<0){delayTimeSinte=0}else if (delayTimeSinte>1){delayTimeSinte=1}
				delaySinte.delayTime.value=delayTimeSinte;
				pinta("delay time synth: "+delayTimeSinte);
				break;
			default:
				pinta("default delay time")
		}
}

delayaQ=function(a){
	switch (inst) {
		case 0:
			pinta("delaytimeTodosQ");
			break;
		case 1:

			if( a>0 &&tiemposD.indexOf(delayTimeBomboQ)+1<tiemposD.length){
					delayBombo.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeBomboQ)+1];
					delayTimeBomboQ=tiemposD[tiemposD.indexOf(delayTimeBomboQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeBomboQ)>0){
					delayBombo.delayTime.value=tiempos[tiemposD.indexOf(delayTimeBomboQ)-1];
					delayTimeBomboQ=tiemposD[tiemposD.indexOf(delayTimeBomboQ)-1];
			}
			pinta("delay timeQ: "+delayTimeBomboQ);
			break;
		case 2:
			if( a>0 &&tiemposD.indexOf(delayTimeCharlesQ)+1<tiemposD.length){
					delayCharles.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)+1];
					delayTimeCharlesQ=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeCharlesQ)>0){
					delayCharles.delayTime.value=tiempos[tiemposD.indexOf(delayTimeCharlesQ)-1];
					delayTimeCharlesQ=tiemposD[tiemposD.indexOf(delayTimeCharlesQ)-1];
			}
			pinta("delayCharles timeQ: "+delayTimeCharlesQ);
			break;
		case 3:
			if( a>0 &&tiemposD.indexOf(delayTimeCajaQ)+1<tiemposD.length){
					delayCaja.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeCajaQ)+1];
					delayTimeCajaQ=tiemposD[tiemposD.indexOf(delayTimeCajaQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeCajaQ)>0){
					delayCaja.delayTime.value=tiempos[tiemposD.indexOf(delayTimeCajaQ)-1];
					delayTimeCajaQ=tiemposD[tiemposD.indexOf(delayTimeCajaQ)-1];
			}
			pinta("delayCaja timeQ: "+delayTimeCajaQ);
			break;

		case 4:
			if( a>0 &&tiemposD.indexOf(delayTimeSinteQ)+1<tiemposD.length){
					delaySinte.delayTime.value=tiemposD[tiemposD.indexOf(delayTimeSinteQ)+1];
					delayTimeSinteQ=tiemposD[tiemposD.indexOf(delayTimeSinteQ)+1];

			}else if( a<0 &&tiemposD.indexOf(delayTimeSinteQ)>0){
					delaySinte.delayTime.value=tiempos[tiemposD.indexOf(delayTimeSinteQ)-1];
					delayTimeSinteQ=tiemposD[tiemposD.indexOf(delayTimeSinteQ)-1];
			}
			pinta("delaySinte timeQ: "+delayTimeSinteQ);
			break;
		default:
			pinta("delaytimeq def")
	}
}

retroalimenta=function(a){
	switch (inst) {
		case 0:
			pinta("feedback all")
			break;
		case 1:
			if(a>0&&delayBombo.feedback.value<1){
				delayBombo.feedback.value+=0.01;
			}else if(a<0&&delayBombo.feedback.value>0){
				delayBombo.feedback.value-=0.01;
			}
			pinta("drum feedback: "+delayBombo.feedback.value)
			break;
		case 2:
			if(a>0&&delayCharles.feedback.value<1){
				delayCharles.feedback.value+=0.01;
			}else if(a<0&&delayCharles.feedback.value>0){
				delayCharles.feedback.value-=0.01;
			}
			pinta("charls feedback: "+delayCharles.feedback.value)
			break;
		case 3:
			if(a>0&&delayCaja.feedback.value<1){
				delayCaja.feedback.value+=0.01;
			}else if(a<0&&delayCaja.feedback.value>0){
				delayCaja.feedback.value-=0.01;
			}
			pinta("snare feedback: "+delayCaja.feedback.value)
			break;
		case 4:
			if(a>0&&delaySinte.feedback.value<1){
				delaySinte.feedback.value+=0.01;
			}else if(a<0&&delaySinte.feedback.value>0){
				delaySinte.feedback.value-=0.01;
			}
			pinta("synth feedback: "+delaySinte.feedback.value)
			break;

		default:
			pinta("def feedback")
	}

}

moja=function(a){
	switch (inst) {
		case 0:
			pinta("wet all");
			break;
		case 1:
			wetDelayBombo+=a/100;
			if(wetDelayBombo<0){wetDelayBombo=0}else if(wetDelayBombo>1){wetDelayBombo=1}
				delayBombo.wet.value=wetDelayBombo;
			pinta("wet drum= "+wetDelayBombo);
			break;
		case 2:
			wetDelayCharles+=a/100;
			if(wetDelayCharles<0){wetDelayCharles=0}else if(wetDelayCharles>1){wetDelayCharles=1}
				delayCharles.wet.value=wetDelayCharles;
			pinta("wet charles= "+wetDelayCharles);
			break;
		case 3:
			wetDelayCaja+=a/100;
			if(wetDelayCaja<0){wetDelayCaja=0}else if(wetDelayCaja>1){wetDelayCaja=1}
				delayCaja.wet.value=wetDelayCaja;
			pinta("wet snare= "+wetDelayCaja);
			break;
		case 4:
			wetDelaySinte+=a/100;
			if(wetDelaySinte<0){wetDelaySinte=0}else if(wetDelaySinte>1){wetDelaySinte=1}
				delaySinte.wet.value=wetDelaySinte;
			pinta("wet synth= "+wetDelaySinte);
			break;
		default:
			pinta("def wet")
	}
}

reverbera=function(a){
	switch (inst) {
		case 0:
			break;
			case 1:
				var r=reverbomb.roomSize.value+a/100;
				if(r<0){r=0}else if(r>1){r=1}
				reverbomb.roomSize.value=r;
				pinta("reberbDrum: "+reverbomb.roomSize.value)
				break;
			case 2:
			var r=reverCharls.roomSize.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverCharls.roomSize.value=r;
			pinta("reberbHiHat: "+reverCharls.roomSize.value)
				break;
			case 3:
			var r=reverCaj.roomSize.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverCaj.roomSize.value=r;
			pinta("reberbSnare: "+reverCaj.roomSize.value)
				break;
			case 4:
				var r=reverbSinte.roomSize.value+a/100;
				if(r<0){r=0}else if(r>1){r=1}
				reverbSinte.roomSize.value=r;
				pinta("reberb: "+reverbSinte.roomSize.value)
				break;
			case 5:
				pinta("reverbera structura")
				break;
			case 6:
				pinta("reverbera visuales")
				break;
		default:
			pinta("default reverbera")
	}
}

reverbWET=function(a){
	switch (inst) {
		case 0:
			console.log("case 0 wet")
			break;
		case 1:
			var r=reverbomb.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverbomb.wet.value=r;
			pinta("drum wet: "+reverbomb.wet.value);
			break;
		case 2:
			var r=reverCharls.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverCharls.wet.value=r;
			pinta("HiHat Wet: "+reverCharls.wet.value)
			break;
		case 3:
			var r=reverCaj.wet.value+(a/100);
			if(r<0){r=0}else if(r>1){r=1}
			reverCaj.wet.value=r;
			pinta("snare wet: "+reverCaj.wet.value)
			break;
		case 4:
			var r=reverbSinte.wet.value+a/100;
			if(r<0){r=0}else if(r>1){r=1}
			reverbSinte.wet.value=r;
			pinta("reberb Wet: "+reverbSinte.wet.value)
			break;
		case 5:
			pinta("reverbWet structura")
			break;
		case 6:
			pinta("reverbWet visuales")
			break;
		default:
			pinta("default reverbWET")
	}
}
