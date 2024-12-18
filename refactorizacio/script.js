//Constants per definir la dinàmica del joc.
const NUM_JUGADES = 10;
const RUTA_IMG = "img";
const IMG = "penjat_X.jpg";

const PUNT_JOC_FINAL = 5;
const PUNT_ENCERTADA = 2;
const PUNT_NO_ENCERTADA = 1;

//crear buttons de forma dynamica


//Constants per definir els objectes HTML
const secretWordInput = document.getElementById("paraulaSecreta");
const secretWordObj = document.getElementById("paraula");
const imgPenjat = document.getElementById("imgPenjat");
const seccioParaulaObj = document.getElementById("seccio-paraula");
const btnComPartida = document.getElementById("comencar-partida");

const puntsPartidaActualObj = document.getElementById("punts-actuals");
const partidesGuanyadesObj = document.getElementById("partides-guanyades");
const totalPartidesObj = document.getElementById("total-partides");
const partidaMesPuntsObj = document.getElementById("partida-mes-punts");
const seccioboto = document.querySelectorAll(".alfabet");
//Variables del joc

//refactored
const info_Joc = {
  paraulaSecretaArray :[],
  paraulaSecretaActual :[],
  numJugadesActuals : 0,
  numJugadesEncertades :0
}

//refactored
const puntuacio = {
  puntsPartidaActual: 0,
  partidesGuanyades: 0,
  totalPartides: 0,
  partidaMesPunts: {
      data: new Date(), 
      punts: 0          
  },
  setPartides: function(){  
   this.totalPartides
  }
};


/*const puntsTotal = function(){

}*/

/*
  Funció que servirà per validar si la paraula introduïda té numbers
*/
function esParaulaSenseNumber(paraula) {
  for (let i = 0; i < paraula.length; i++) {
      if (!isNaN(paraula[i])) {
          return false;
      }
  }
  return true;
}

/*
  Reiniciem les variables amb els valors inicials de la partida.
  Canviem la imatge i el color de fons de la pantalla.
*/
function reiniciarValorsInicialsPartida(){
  numJugadesEncertades = 0;
  paraulaSecretaActual = [];
  numJugadesActuals = 0;
  puntuacio.puntsPartidaActual = 0;  //refactored
  puntsPartidaActualObj.textContent = puntuacio.puntsPartidaActual; //refactored
  const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
  imgPenjat.src = nomImg;
  seccioParaulaObj.style.backgroundColor = "rgb(200, 209, 243)";
}

//Pintarem la paraula actual
function pintarParaula() {
  secretWordObj.textContent = paraulaSecretaActual
    .toString()
    .replaceAll(",", "");
}

//Guardem a la paraula tants '_' com caracters té la paraula secreta
function inicialitzarParaula() {
  for (let i = 0; i < paraulaSecretaArray.length; i++) {
    paraulaSecretaActual.push("_");
  }
}

//Funció on actualitzem tots els caràctes de la paraula
function actualitzarTotsCaracters() {
  for (let i = 0; i < paraulaSecretaArray.length; i++) {
    paraulaSecretaActual[i] = paraulaSecretaArray[i];
  }
}

//Funció on actualitzem el color de fons segons el paràmetre d'entrada.
function canviarFons(color){
  seccioParaulaObj.style.backgroundColor = color;
}

/*
Funció per habilitar tots els botons.
S'aplica un color negre pel text i el border.
*/
function reiniciarButons() {
  let boto = "boto_";
  for (let i = 1; i < 27; i++) {
    let idBoto = boto + i;
    let botoObj = document.getElementById(idBoto);
    botoObj.style.color = "black";
    botoObj.style.border = "1px solid black";
    botoObj.disabled = false;
  }
}

/*
Funció per deshabilitar tots els botons.
S'aplica un color vermell pel text i el border.
*/
const llistaBoto = document.querySelectorAll(".alfabet > .button")

function bloquejarButons() {
 const llistaBotons = llistaBoto;
 for(let i=0; i < llistaBotons; i++){
  botoObj.style.color = "red";
  botoObj.style.border = "1px solid red";
  botoObj.disabled = true;

 }


/*let boto = "boto_";
for (let i = 1; i < 27; i++) {
  let idBoto = boto + i;
  let botoObj = document.getElementById(idBoto);
  botoObj.style.color = "red";
  botoObj.style.border = "1px solid red";
  botoObj.disabled = true;
}*/

}



/*
Funció per deshabilitar el botó que se li passa per paràmetre.
*/
function bloquejarBoto(obj){
  obj.style.color = "red";
  obj.style.border = "1px solid red";
  obj.disabled = true;
}

/*
Funció per canviar el formulari de tipus password a tipus text. 
Ens servirà per poder visualitzar la paraula.
*/
function mostrarParaula() {
  const form = document.getElementById("paraulaSecreta");
  form.type = "text";
}

/*
Funció per canviar el formulari de tipus text a tipus password. 
Ens servirà per poder ocular la paraula.
*/
function ocultarParaula() {
  const form = document.getElementById("paraulaSecreta");
  form.type = "password";
}

/*
Funció per borrar la paraula del formulari 
Ens servirà per habilitar/deshabilitar el boto 'començar partida' segons 
el paràmetre d'entrada desHabilitar.
*/
function deshabilitarControlPrincipal(desHabilitar){
  secretWordInput.value = "";
  btnComPartida.disabled = desHabilitar;
}

/*
Funció associada amb el botó 'Començar partida'.
Agafarem el valor de l'input, el passem a majuscules (toUpperCase())
i el guardem en un array(split("")).
*/
function comencarPartida() {
  reiniciarValorsInicialsPartida();
  const paraulaSecreta = secretWordInput.value;
  if (paraulaSecreta) {
    if(paraulaSecreta.length > 3){
      if (!Number(paraulaSecreta)) {
        if(esParaulaSenseNumber(paraulaSecreta)){
          paraulaSecretaArray = paraulaSecreta.toUpperCase().split("");
          inicialitzarParaula();
          pintarParaula();
          reiniciarButons();
          deshabilitarControlPrincipal(true);
        }
        else{
          alert("La paraula no pot contenir valors numèric");
        }
      } else {
        alert("La paraula no pot ser numèric");
      }
    }
    else{
      alert("La paraula no pot ser inferior a 4 caràcters");
    }
  } else {
    alert("Has d'afegir una paraula per poder començar");
  }
}

/*
Funció associada amb als botons de les lletres.
Tindrà tota la dinàmica del joc.
El paràmetre d'entrada és l'objecte que s'ha seleccionat.
*/
function jugar(obj) {
  const charSelected = obj.textContent;

  if (paraulaSecretaArray.indexOf(charSelected) != -1) {
    //Has encertat la lletra
    numJugadesEncertades++;
    let puntsJugadaActual = 0;
    for (let i = 0; i < paraulaSecretaArray.length; i++) {
      if (paraulaSecretaArray[i] === charSelected) {
        paraulaSecretaActual[i] = charSelected;
        puntsJugadaActual++;
      }
    }
    pintarParaula();

    puntuacio.puntsPartidaActual += puntsJugadaActual * numJugadesEncertades;
    puntsPartidaActualObj.textContent = puntuacio.puntsPartidaActual;

    if (paraulaSecretaActual.indexOf("_") === -1) {
      //Has encertat la paraula
      puntuacio.totalPartides++;
      totalPartidesObj.textContent = puntuacio.totalPartides;
      puntuacio.partidesGuanyades++;
      const pcGuanyat = Math.round((puntuacio.partidesGuanyades * 100) / puntuacio.totalPartides);
      partidesGuanyadesObj.textContent = puntuacio.partidesGuanyades + "(" + pcGuanyat + "%)";

      if (puntuacio.puntsPartidaActual >= puntuacio.partidaMesPunts) {
        puntuacio.partidaMesPunts = puntuacio.puntsPartidaActual;
        const currentData = new Date();

        const data = currentData.toLocaleDateString();
        const time = currentData.toLocaleTimeString();
        partidaMesPuntsObj.textContent = data + " " + time + " - " + puntuacio.partidaMesPunts + " punts";
      }
      canviarFons("rgba(197, 246, 106, 0.6)");
      bloquejarButons();
      deshabilitarControlPrincipal(false);
    }
  } else {
    numJugadesEncertades = 0;
    numJugadesActuals++;
    puntuacio.puntsPartidaActual = puntuacio.puntsPartidaActual > 0 ? --puntuacio.puntsPartidaActual : 0;

    puntsPartidaActualObj.textContent = puntuacio.puntsPartidaActual;
    //Si el caràcter no existeix
    if (numJugadesActuals < NUM_JUGADES) {
      //Podem continuar jugant però canviem la imatge
      const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
      imgPenjat.src = nomImg;
    } else {
      //S'ha acabat la partida
      const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
      imgPenjat.src = nomImg;
      actualitzarTotsCaracters();
      pintarParaula();
      canviarFons("red");
      bloquejarButons();
      deshabilitarControlPrincipal(false);
      puntuacio.totalPartides++;
      totalPartidesObj.textContent = puntuacio.totalPartides;
      const pcGuanyat = Math.round((puntuacio.partidesGuanyades * 100) / puntuacio.totalPartides);
      partidesGuanyadesObj.textContent = puntuacio.partidesGuanyades + "(" + pcGuanyat + "%)";
    }
  }
}

const loadBoto= function(){
  let alfabet = " ";
 /* for(let i =0; i<letters.length;i++){
    const boto = document.createElement("button");
    boto.className="button";
    boto.textContent =letters[i];
    boto.addEventListener("click", () => jugar ())
    console.log(boto) */
  //fetch
    const petition = fetch("http://127.0.0.1:5500/alfabet.json")
    .then(function(reposta){

      return reposta.json();

    })
     .then(function(data){
      alfabet = data.alfabet;
      console.log(data);
      for(let i =0; i<alfabet.length;i++){
        const boto = document.createElement("button");
        boto.className="button";
        boto.textContent =alfabet[i];
        boto.addEventListener("click", () => jugar ())
        console.log(boto);
        //seccioboto.appendChild(boto);
      }
     })
     ;

    const petition2 = fetch("http://127.0.0.1:5500/exemple.json")
    .then(function(resposta2){
      return resposta2.json();
    })
    .then(function(data2){

      console.log(data2);
    });

     //returns a promise can use .then directly. const not needed                                      
    /* console.log(petition);

    const reposta = petition.then(function(valuePromesa1){
      return valuePromesa1.json();

    });
    const dataFinal = reposta.then(function (data){
      console.log(data);

    }
    )
    console.log(reposta);*/
  } 
loadBoto();

// Crida de la funció per deshabilitar inicialment el botons del joc.
bloquejarButons();