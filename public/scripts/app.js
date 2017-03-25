$( document ).ready(function() {

  $(".container").on("click", "i.fa-heart-o", function(e) {
    let tweetID = $(e.target).data('id');
    console.log(e.target);
    console.log(tweetID)
    $.ajax({
      url: `/tweets/${tweetID}`,
      type: "POST",
      success: getLikeNum(tweetID)
    });
    $(e.target).addClass("liked")
  });

//TODO: send a username along with the tweetID

  function getLikeNum (tweetID) {
    console.log("getLikeNum triggered on client side")
    $.ajax({
      url: `/tweets/${tweetID}`,
      type: "GET",
      success: renderLikeNum
    });
  } //
  function renderLikeNum(tweetData) {
    debugger
    //console.log(tweetData[0]["likes"])
    return; //TODO: get only the like array
  }


  $( "#compose" ).click(function() {
    if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp();
    } else {
      $(".new-tweet").slideDown();
      $("textarea").focus();
      $(document).scrollTop(0);
    }
  });

  var form = $("form");
  form.on("submit", function(event) {
    event.preventDefault();

    const $errMsg = $("#errorMsg");
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
        success: loadLastTweet
      });

      $("textarea").val("");

    }
  }); //prevents browser from leaving page when submit button is clicked, and validates the tweet before adding tweet to page

  function renderTweets (tweetData) {
    let newDOM = "";
    tweetData.reverse().forEach((tweet) => {
      newDOM += createTweetElement(tweet);
    })
    return $(".new-tweet").after(newDOM);
  }

  function loadTweets () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: renderTweets
    });
  } //for the first page load

  loadTweets();

  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  } //to prevent cross-site scripting

  function createTweetElement (tweetObject) {
    let $date = new Date(tweetObject.created_at);
    let $today = new Date();
    let $datePosted = parseInt(Math.abs(($date - $today) / 86400000))
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
        ${$datePosted} day(s) ago
        <div class="icons">
          <i class="fa fa-flag-o" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i data-id="${tweetObject._id}" class="fa fa-heart-o" aria-hidden="true"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  }

  function renderLastTweet (tweetData) {
    let newDOM = "";
    newDOM += createTweetElement(tweetData[tweetData.length-1]);
    return $(".new-tweet").after(newDOM);
  }
  function loadLastTweet () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: renderLastTweet
    });
  } //to load up just the latest submitted tweet
})
