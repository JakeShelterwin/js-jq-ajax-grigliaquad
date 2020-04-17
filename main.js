// DESCRIZIONE:
// Griglia 6x6,
// ad ogni click (su ogni rettangolino) parte una richiesta AJAX che prende un numero random da 1 a 9 (primo end-point della API in slide).
// Se il num ritornato è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato
// BONUS: (ma solo se il resto è fatto)
// se utente clicca 2 volte sullo stesso rettangolo lo mando a ca… gli dico che non si può;
// generare dinamicamente la griglia dei quadrati;
// Curo per bene l’output, creando un layout carino;
// varie che vi vengono in mente per sperimentare;

$(document).ready(function(){

//genero le celle del documento
for(var i=0; i<36; i++){
  // append() - Inserts content at the end of the selected elements
  $(".tablecontainer").append("<div class='square'></div>");
  // console.log("quadrato");
}

//COMPORTAMENTO CHE I DIV CON LA CLASSE SQUARE TENGONO QUANDO VENGONO CLICCATI
  $('.square').click(
    function () {
      //Salvo in una variabile la casella cliccata per chiamarla in ajax (il this richiamerebbe axaj)
      var square = $(this);

      //se ho già cliccato la cella, non succede stampo in console che è già stata cliccata
      if(square.hasClass('active')){
        console.log("OH! l'hai già cliccato!");
      } else {
        //altrimenti faccio una chiamata ajax per trovare un numero a caso fra 1 e 9
        $.ajax({
            url : "https://flynn.boolean.careers/exercises/api/random/int",
            method : "GET",
            // se la chiamata ha successo eseguo questi comandi
            success : function (data,stato) {
              console.log(data.response, data.success);
              var numRandom = data.response;
              //se il numero è inferiore a 5, compare una rana e il numero trovato
              //altrimenti mostro solo il numero trovato
              if(numRandom < 5){
                square.css(
                          {'background': 'url("img/Pocket_Frogs.png',
                           'background-size': 'contain',
                           'border': "none" }
                         );
                square.addClass('active');
                square.append('<span class="numeroRandomBianco">'+numRandom+'</span> ');
              } else {
                square.css( {'background': "none",
                             'border': "none"}
                           );
                square.addClass('active');
                square.append('<span class="numeroRandomNero">'+numRandom+'</span> ');
              }

            },
            error : function (richiesta,stato,errori) {
              console.log("E' avvenuto un errore. " + errori, "stato " + stato, richiesta);
            }
        });
      }

    }
  );

  // GESTISCO IL COMPORTAMENTO DEL BOTTONE PER RICOMINCIARE IL GIOCO
  $(".ricomincia").on({
  //quando rilascio il bottone del mouse resetto il gioco
  mouseup: function(){
    //tolgo a tutti gli square le classi active
    $('.square').removeClass("active");
    //tolgo tutti gli elementi che hanno la classe numeroRandomNero e Bianco (gli span col numero)
    $(".numeroRandomNero").remove();
    $(".numeroRandomBianco").remove();
    //rendo a tutti gli square il background di partenza
    $('.square').css( {'background': "none",
                       'border': "1px solid rgba(0, 44, 130, 1)"}
                     );
  }
  });


});
