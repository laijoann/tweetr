function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
} //to prevent cross-site scripting

function createTweetElement (tweetObject) {
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
      ${new Date(tweetObject.created_at)}
    </footer>
  </article>`;
  return $tweet;
}

function renderTweets (tweetData) {
  let newDOM = "";
  tweetData.forEach((tweet) => {
    newDOM += createTweetElement(tweet);
  })
  return $('.container').append(newDOM);
}

$( document ).ready(function() {

  $("form").on("submit", function(event) {
    event.preventDefault();

    const $errMsg = $("#errorMsg")
    const $submit = $("input");
    const $counter = parseInt($(".counter").text());

    let errorCheck = true;
    if ($counter === 140) {
      errorCheck = "empty";
    } else if ($counter < 0) {
      errorCheck = "tooLong";
    }
    if (errorCheck === "empty") {
      $errMsg.css("visibility", "visible");
      $errMsg.text("FUck your empty tweet");
      setTimeout(function () {$errMsg.css("visibility", "hidden")}, 2000);
    } else if (errorCheck === "tooLong") {
      $errMsg.css("visibility", "visible");
      $errMsg.text("too fuking long u idiot")
      setTimeout(function () {$errMsg.css("visibility", "hidden")}, 2000);
    } else {
      $("textarea").serialize();
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

})
