$( document ).ready(function() {

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

  $("form").on("submit", function(event) {
    event.preventDefault();
    $("textarea").serialize();
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
