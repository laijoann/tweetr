$( document ).ready(function() {

  $( "#tweet-input" ).keyup(function() {

    const $field = $(this);
    const $submit = $("input");
    const charRemain = 140 - $field.val().length;
    const $textCounter = $field.siblings(".counter");

    $textCounter.text(charRemain);

    if (charRemain === 140) {
    } else if (charRemain < 0) {
      $textCounter.addClass("error");
    } else {
      $textCounter.removeClass("error");
    }

  }); //tweet character counter feature

});
