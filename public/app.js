// ARTICLE to JSON //

$.getJSON('/articles', function(data) {

  for (var i = 0; i<data.length; i++){

    // PAGE DISPLAY //

    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>');
  }
});

// A TAG CLICK //

$(document).on('click', 'a', function(){

  // EMPTY NOTE //

  $('#notes').empty();

  var thisId = $(this).attr('data-id');

  // AJAX CALL for ARTICLE //

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // NOTE  INFO to PAGE //

    .done(function( data ) {
      console.log(data);

      // TITLE //

      $('#notes').append('<h2>' + data.title + '</h2>'); 

      // NEW TITLE to NOTE //

      $('#notes').append('<input id="titleinput" name="title" >'); 

      // NEW NOTE BODY //

      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 

      // SUBMIT BUTTON //
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // NOTE on ARTICLE //

      if(data.note){

        // NOTE TITLE //

        $('#titleinput').val(data.note.title);

        // NOTE BODY //

        $('#bodyinput').val(data.note.body);
      }
    });
});

// SAVE NOTE BUTTON //

$(document).on('click', '#savenote', function(){
  // ARTICLE ID from SUBMIT BUTTON //

  var thisId = $(this).attr('data-id');

  // CHANGE NOTE //

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    // DONE //

    .done(function( data ) {
      console.log(data);

      $('#notes').empty();
    });

  // REMOVE INPUT VALUES //
  
  $('#titleinput').val("");
  $('#bodyinput').val("");
});
