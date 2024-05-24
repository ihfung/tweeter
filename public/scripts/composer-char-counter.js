$('.textArea').on('input', function() { // input event listener for changes in textarea
  const maxCharacters = 140;
  let characters = $(this).val().length; // get the length of the text in the textarea
  let result = maxCharacters - characters;
  
  // the counter result will go to the span called class counter but it will first go to the sibling which is div class sectionPostTweet
  let counter = $(this).siblings('.sectionPostTweet').children('.counter');
  counter.text(result);

  // if the result is less than 0, the counter will turn red, otherwise it will stay black
  if (result < 0) {
    counter.css('color', 'red');
  } else {
    counter.css('color', 'black');
  }
});
