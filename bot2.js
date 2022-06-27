const fs = require('fs'),
  path = require('path'),
  Twit = require('twit'),
  config = require(path.join(__dirname, 'config.js'));

const T = new Twit(config);

let image = ["./images/Amor.webp", 
"./images/Arena.webp", 
"./images/Aro.webp", 
"./images/Atravesar.webp", 
"./images/Borrar.webp",
"./images/Bosque.webp",
"./images/Brillo.webp",
"./images/Burbujas.webp",
"./images/Cambio.webp",
"./images/Cancion.webp",
"./images/Candado.webp",
"./images/Creacion.webp"];

let desc = ["amor. \n \nComo su nombre lo indica representa el amor y la amistad. Es un buen momento para que lo pases entre amigos y familiares.",
"arena. \n \nCarta vinculada directamente con el Sol. Es un buen momento para que te sientas segurx y tomes las cosas con tranquilidad.", 
"aro. \n \nHoy es un día para que seas perseverante ante el cambio, tenes la capacidad de alterar tu realidad y ajustarte.",
"atravesar. \n \nEs momento de realizar cambios en tu vida.",
"borrar. \n \nEl día de hoy es un buen momento para reflexionar, olvidar y perdonar.",
"bosque. \n \nCarta de agua. Es momento de dominar e integrarte con la naturaleza.",
"brillo. \n \nComo su nombre lo indica, representa la iluminación. Vinculada directamente con el poder del Sol.",
"burbujas. \n \nSimboliza la multitud, la unión, el camuflaje. Vinculada con el poder de la Luna. Habla de que sos una persona animada, aunque a veces te salís de control.",
"cambio. \n \nCuando veas esta carta, algo se va a activar. Ya sea un cambio en tu apareciencia o en la posibilidad de mejorar situaciones.",
"canción. \n \nSimboliza el trabajo duro, la entrega y la pasión por las cosas que hagamos, especialmente en la música; representa la paz, la tranquilidad y la alegría.",
"candado. \n \nSimboliza la soledad, la ignorancia, el misterio.",
"creación. \n \nSimboliza la creación, la imaginación, el desafío. También significa el poder y la mentalidad que tiene una persona al crear algo fantástico."]


function tweetRandom() {
  let index = Math.floor(image.length * Math.random());
  var b64content = fs.readFileSync(image[index], { encoding: 'base64' })

  // first we must post the media to Twitter
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Carta de Sakura";
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: "La carta del día de hoy es: " + desc[index], media_ids: [mediaIdStr] }

        T.post('statuses/update', params, function (err, data, response) {
          console.log(data)
        })
      }
    })
  })
}

//setInterval( function(){
tweetRandom();
  //}, 10000 );