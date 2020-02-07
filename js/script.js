// alert('funziona?')
// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

// --CHIAVE API--
//Chiave API generata: 8d266159d93c16994b091fb8d2846c24

//VALORI CHE MI SERVONO PER LA RICERCA
// "page": 1,
//     "total_results": 202,
//     "total_pages": 11,
//     "results": [
//         {
//             "popularity": 17.529,
//             "id": 1366,
//             "video": false,
//             "vote_count": 4280,
//             "vote_average": 7.7,
//             "title": "Rocky",
//             "release_date": "1976-11-21",
//             "original_language": "en",
//             "original_title": "Rocky",
//             "genre_ids": [
//                 18
//             ],
//             "backdrop_path": "/2kkyt0FLROrXt41IgSdE7goCFNQ.jpg",
//             "adult": false,
//             "overview": "Rocky Balboa vivacchia a Filadelfia, riscuotendo i crediti di un usuraio italo-americano e vincendo qualche piccolo incontro come pugile dilettante. Con l'aiuto di un saggio allenatore accetta per amore di Adriana e per una borsa di 150000 dollari la sfida del nero Apollo Creed, campione dei pesi massimi, proponendosi non di vincere, ma di arrivare alla 15a ripresa.",
//             "poster_path": "/84f5S28ITlbzo6rxiTHgwTVo8Sh.jpg"
//         },

// var query = 'Rocky';

$(document).ready(function() {
  $('.button_research').click(function() {
    console.log('proviamo il click');
    // creo una variabile per l'impostazione della ricerca e le attribuisco il nome fieldResearch e poi inserisco il nome della variabile nella query.

    // inserisco un confronto per invitare a scrivere qualcosa nel campo ricerca
    var fieldResearch = $('.field_input').val();
    if (fieldResearch.length == 0) {
      alert('Utilizza l\'input dedicato alla ricerca')
    }
    else {
      ajaxCall(fieldResearch)
    };
    resetSearch()
  });
});

// **************FUNZIONI*******************
//Mi permette di stampare i film all'interno dell'API e di inserirli in un array attraverso un ciclo for e riportarli poi sull'HTML tramite Handlebars.
function printFilmsSearch (allFilms){
  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < allFilms.length; i++) {
    var thisFilm = allFilms[i];
    // qui sopra ottengo la posizione del singolo film
    console.log(thisFilm);

    var printFlag = thisFilm.original_language;
    console.log(printFlag);

    var context = {
      title: thisFilm.title,
      original_title: thisFilm.original_title,
      original_language: thisFilm.original_language,
      country: printFlag,
      vote_average: printStars(thisFilm.vote_average)
     };
    var html = template(context);
    $('.covers').append(html)
  };
};
//Mi permette di far partire la chiamata Ajax per ricevere la lista di titoli FILM di mio interesse in base alla chiave API inserita. All'interno di questa funzione, vado anache a richiamare la funzione stampa tutti i film (QUI SOPRA).

function ajaxCall(fieldResearch) {
  var url = 'https://api.themoviedb.org/3/search/movie';
  var api_key = '8d266159d93c16994b091fb8d2846c24';
  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: fieldResearch,
      language: 'it-IT'
    },
    success: function(data){
      console.log(data);
      var allFilms = data.results;
      console.log(allFilms);
      //Qui sopra ottengo l'array e lo passo poi alla funzione che vado a costruire
      if (allFilms == 0) {
        console.log('Il film non esiste');
        $('.covers').append('La tua ricerca non ha prodotto risultati')
      }
      printFilmsSearch(allFilms)
    },
    error: function(request, state, errors){
      alert("E' avvenuto un errore.")
      console.log(errors);
    }
  });
}

//Qui sotto creo la variabile per trasformare i decimali in votazione da 1 a 5. Uso la proprietà Math.round e divido per 2.
//ciclo per il calcolo della votazione. Per ottenerlo,
//creo un ciclo che calcola le stelline ottenute in precedenza con la variabile printStar. PrintStar infatti, mi da la votazione da uno a 5, di conseguenza, effettuo il confronto e gli dico che se una stella è minore della votazione, allora deve stampare il numero di stelline corrispondente. Per fare ciò, inserisco una stringa con fontawsome e poi sposto tutto in una funzione.
function printStars(voteFilm) {
  var printStar = Math.round(voteFilm/2);
  console.log(printStar);
  var stars = '';
  for (var i = 1; i <= 5; i++) {
    if (i < printStar) {
      var star = '<i class="fas fa-star yellow"></i>';
    }
    else {
      var star = '<i class="far fa-star"></i>';
    }
    stars += star;
  };
  return stars;
};

function resetSearch() {
// imposto fuori dalla chiamata ajax il comando per svuotare il campo di ricerca.
$('.field_input').val('');
// imposto fuori dalla chiamata ajax il comando per svuotare la pagina se effettuo una nuova ricerca.
$('.covers').text('');
}
