$( document ).ready(function() {
  $( "#tweet-input" ).keyup(function() {
    const $field = $(this);
    //if i use ES6 fat arrow, then i would need
    //var $field = $(event.target)
    //because this has a different context
    const inputLength = 140 - $field.val().length;
    const $textCounter = $field.siblings('.counter');
    $textCounter.text(inputLength);
    if (inputLength < 0) {
      $field.addClass('error');
      $textCounter.addClass('error');
    } else {
      $field.removeClass('error');
      $textCounter.removeClass('error');
    }
    //best practices:
    //add and remove a css class for reusability
  });
});
