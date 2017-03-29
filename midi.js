// request MIDI access

var luces;
var ilu=false;
var hayMidi=true;
var entradas=[];
var salidas=[];
var botonesIluminados=[0,0,0,0,0,0,0,0]
var arturiaOut;
var launchpadOut;
var bcr;
var oxygen;
var axiom;
var haySinte=false;//si esta conectado el axiom o oxigen, arturia no tocanota


if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Object', midiAccess.inputs.size);
    if(midiAccess.inputs.size==0){hayMidi=false;return}
      midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
      inputs = midi.inputs.values();
      outputs= midi.outputs.values();
    if(midiAccess.inputs.size==0){hayMidi=false;return}
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        entradas.push(input);
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }

    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        salidas.push(output);
    }
    luces=salidas[0].value;

    for(var i=0;i<salidas.length;i++){
      if(salidas[i].value.manufacturer=="Arturia"){arturiaOut=salidas[i];apagoBotones();}
      else if(salidas[i].value.name=="Launchpad Mini"){launchpadOut=salidas[i]}
      else if(salidas[i].value.name=="BCR2000"){bcr=salidas[i]}
      else if(salidas[i].value.name=="USB Oxygen 8 v2"){oxygen=salidas[i]}
      else if(salidas[i].value.name=="Axiom 25 Axiom USB In"){axiom=salidas[i]}
      else{pinta("hay algo conectado a la caca de mi culo! ")}
    }
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}


function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
  //if(data[2]==0&&data[0]==144){return}//touch up
  if (message.target.name=="Launchpad Mini"){
    //escribeLaunchpad(data);

  }else if (message.target.name=="Arturia MINILAB"){//CASIO USB-MIDI

    if(data[0]==153){  /// arturia Buttons

      switch (data[1])
      {
        case 36:// boton 1
          inst=1;
          break;
        case 37:// boton 2
          inst=2;
          break;
        case 38:// boton 3
          inst=3;
          break;
        case 39:// boton 4
          inst=4;
          break;
        case 40:// boton 5
          inst=5;        //visuals
          break;
        case 41:// boton 6
          record()         //delays
        case 42:// boton 7
          hold();
          break;
        case 43:// boton 8
          dale();
          break;
        case 0:
          console.log("pitch");break;
        case 1:
          console.log("mod");break;
        default:
          console.log("default arturia button");
      }

    }else if(data[0]==137 && data[2]==0){//al soltar un boton
        //inst=0;
        if(data[1]==41){stopRecord();apagoBotones();//si es el de grabar (6)
        ///// si el boton esta encendido lo apago:
        }else if(botonesIluminados[data[1]-36]==1){apagoBotones();inst=0;//esto de inst=0... es opcional
          // si esta apagado lo enciendo pero apago los demas
        } else {apagoBotones();arturiaOut.value.send([144,data[1],1]);
          botonesIluminados[data[1]-36]=1;// el valor 144 puede variar a  145!!!
        }

    }else if(data[0]==144){
        if(!haySinte){tocanota(data[1],data[2]);}
    }else if(data[0]==128){
        if (!haySinte){paranota(data[1])}
    }else if(data[0]==176&&data[2]!=64) {///// arturia Knobs
      var d=data[2]-64;
      switch (data[1])  {// calls knob(d,num) // d=cantidad,sentido   num=qué knob
        case 7://knob1
          knob(d,1);break;
        case 74://knob2
          knob(d,2);break;
        case 71://knob3
          knob(d,3);break;
        case 76://knob4
          knob(d,4);break;
        case 77://knob5
          knob(d,5);break;
        case 93://knob6
          knob(d,6);break;
        case 73://knob7
          knob(d,7);break;
        case 75://knob8
          knob(d,8);break;

        case 114://knob9
            knob(d,9);break;
        case 18://knob10
            knob(d,10);break;
        case 19://knob11
            knob(d,11);break;
        case 16://knob12
            knob(d,12);break;
        case 17://knob13
            knob(d,13);break;
        case 91://knob14
            knob(d,14);break;
        case 79://knob15
            knob(d,15);break;
        case 72://knob16
            knob(d,16);break;
        case 1:
          portamenta(data[2]);break
        default:

          console.log("default midi en arturia knob "+data);
      }
    }else if(data[0]==224){
      pithBendArturia(data[2]);
    }

  }else if(message.target.name=="BCR2000"){
    pinta('bcr data '+ data);

  }else if(message.target.name=="USB Oxygen 8 v2"){
    tocanotaOxygen(data);
    //pinta('Oxygen data '+ data);

  }else if(message.target.name=="Axiom 25 Axiom USB In"){
    console.log('Axiom data', data, message);
    tocanotaAxiom(data);

  }
      //instr.send([data[0],data[1],data[2]])
    //// rojo:0x0f verde: 0x30 ambar:0x13 yellow: 127; verde suave: 0x18...
 //console.log('MIDI data', data, message); // MIDI data [144, 63, 73]
    //message.target.send( [0x92, 60, 127]);
}
////////////////////////////////////////////////////////////////////////////////
///    KNOB ASSIGN

var knob=function(a,num){

  switch (num){//knob
    case 1:
      modVol(a);
      break;
    case 2:
      limita(a)
      break;
    case 3:
      modFreq(a);
      break;
    case 4:
       mueve(a)
      break;

    case 5:
      ataca(a)
      break;
    case 6:
      decae(a)
      break;
    case 7:
      sosten(a)
      break;
    case 8:
      relaja(a);
      break;

    case 9:
      filtra(a);
      break;
    case 10:
      resuena(a)
      break;
    case 11:
      reverbera(a)
      break;
    case 12:
      reverbWET(a)
      break;
    case 13:
      delayando?delaya(a):combina(a);
      break;
    case 14:
      delayando?delayaQ(a):combina(a);
      break;
    case 15:
      delayando?retroalimenta(a):combina(a);
      break;
    case 16:
        delayando?moja(a):combina(a);
      break;
    default:
      console.log("default knob ");
  }// end switch knobs

} // end knob


var apagoBotones=function(){
  for(var i=0;i<botonesIluminados.length-sonando;i++){
    arturiaOut.value.send([145,36+i,0]);
    botonesIluminados[i]=0;
  }

}
