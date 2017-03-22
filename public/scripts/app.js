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
  return $(".new-tweet").after(newDOM);
}

$( document ).ready(function() {
  var form = $("form");
  form.on("submit", function(event) {
    event.preventDefault();

    const $errMsg = $("#errorMsg")
    const $submit = $("input");
    const $counter = parseInt($(".counter").text());

    const flashMsg = () => {
      $errMsg.css("visibility", "visible");
      setTimeout(function () { $errMsg.css("visibility", "hidden"); }, 2000);
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

      $("textarea").serialize();

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: form.serialize(),
        success: loadTweets
      });

      $('textarea').val('')

    }
  }); //prevents browser from leaving page when submit button is clicked

// {"user":{"name":"Descartes","avatars":{"small":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png","regular":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png","large":"https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"},"handle":"@rd"},"content":{"text":"Je pense , donc je suis"},"created_at":1461113959088}

  function loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  }

  loadTweets();

})
