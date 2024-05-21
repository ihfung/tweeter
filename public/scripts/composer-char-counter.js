
let result = 0;

$('.textArea').keyup(function() {
  // --- our code goes here ---
  const maxCharacters = 140;
  let characters = 0;
  characters = $(this).val().length;
  result = maxCharacters - characters;
  
  if (result < maxCharacters) {
    $(this).children('.counter').text(result);
  }
  if (result < 0) {
    $(this).children('.counter').css('color', 'red');
  }
  if (result >= 0) {
    $(this).children('.counter').css('color', 'black');
  }


  $(this).children('.counter').append(result);

});

