$( document ).ready(function() {

  $( "#compose" ).click(function() {
    if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown();
      $('textarea').focus();
    }

});

  var form = $("form");
  form.on("submit", function(event) {
    event.preventDefault();

    const $errMsg = $("#errorMsg")
    const $submit = $("input");
    const $counter = parseInt($(".counter").text());

    const flashMsg = () => {
      $errMsg.css("visibility", "visible");
      setTimeout(function () { $errMsg.css("visibility", "hidden"); }, 1500);
    }

    let errorCheck = true;
    if ($counter === 140) {
      errorCheck = "empty";
    } else if ($counter < 0) {
      errorCheck = "tooLong";
    }
    if (errorCheck === "empty") {
      $errMsg.text("FUck your empty tweet");
      flashMsg();
    } else if (errorCheck === "tooLong") {
      $errMsg.text("too long u idiot")
      flashMsg();
    } else {

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: form.serialize(),
        success: loadTweets
      });

      $('textarea').val('')

    }
  }); //prevents browser from leaving page when submit button is clicked

  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  }

  loadTweets();

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } //to prevent cross-site scripting

  function createTweetElement (tweetObject) {
    let $date = new Date(tweetObject.created_at);
    let $today = new Date();
    let $date_posted = parseInt(Math.abs(($date - $today) / 86400000))
    let $tweet = `<article>
      <header>
        <img src="${tweetObject.user.avatars.small}">
        <h2>${tweetObject.user.name}</h2>
        <div>${tweetObject.user.handle}</div>
      </header>
      <body>
        <p>
          ${escape(tweetObject.content.text)}
        </p>
      </body>
      <footer>
        ${$date_posted} day(s) ago
      </footer>
    </article>`;
    return $tweet;
  }

  function renderTweets (tweetData) {
    let newDOM = "";
    tweetData.forEach((tweet) => {
      newDOM += createTweetElement(tweet);
    })
    return $(".new-tweet").after(newDOM);
  }
})
