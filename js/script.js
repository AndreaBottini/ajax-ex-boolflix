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

//--MATERIALE HANDLEBARS NECESSARIO--
// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
//
// var context = { title: "My New Post", body: "This is my first post!" };
// var html = template(context);

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

var query = 'Rocky';
$(document).ready(function() {
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key: '8d266159d93c16994b091fb8d2846c24',
      query: query,
      language: 'it-IT'
    },
    success: function(data){
      console.log(data);
    },
    error: function(request, state, errors){
      console.log(errors);
    }
  })

});
