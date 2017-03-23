/* the submit.prop("disabled" ...) lines are my personal preferred UX for indicating to users that their tweets are invalid. But for the purpose of fulfilling this project's functional requirements, I have implemented the required flash messages in app.js instead */
$( document ).ready(function() {
  $( "#tweet-input" ).keyup(function() {
    const $field = $(this);
    const $submit = $("input");
    const charRemain = 140 - $field.val().length;
    const $textCounter = $field.siblings(".counter");
    $textCounter.text(charRemain);
    if (charRemain === 140) {
      //$submit.prop("disabled", true);
    } else if (charRemain < 0) {
      $field.addClass("error");
      $textCounter.addClass("error");
      //$submit.prop("disabled", true);
    } else {
      $field.removeClass("error");
      $textCounter.removeClass("error");
      //$submit.prop("disabled", false);
    }
  });
});
