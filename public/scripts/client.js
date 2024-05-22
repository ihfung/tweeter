/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const $tweet = $(`<article class="tweet">Hello world</article>`);

$(document).ready(function() {

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      $(".tweetContainer").prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
  /* Your code for creating the tweet element */
    const agoTime = timeago.format(tweet.created_at);
    
    const $tweet = $(`<article class="tweet">
                  <header>
                  <span>
                    <img class="avatar" src="${tweet.user.avatars}"/> 
                  </span>
                  <h3>${tweet.user.name}</h3>
                  </header>
                  <span>${tweet.user.handle}</span>
                  <section class="tweetContent">${tweet.content.text}</section>
                  <footer>
                    <div class="icons">
                      <span class="datePost"> ${agoTime} </span>
                        <div class="iconStyle">
                          <i name="flag" class="fas fa-flag"></i>
                          <i name="retweet" class="fas fa-retweet"></i>
                          <i name="heart" class="fas fa-heart"></i>
                        </div>
                    </div>
                  </footer>
              </article> `);
    // ...
    return $tweet;

  };
  //The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  //In order to test/drive the function, you can simply call it right after its definition. We do want to load the tweets on page load anyway, so this is fair.

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    }).then((response) => {
      renderTweets(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  const validateTweet = function(contentOfTweet) {
    if (contentOfTweet.length === 0) {
      alert("Error! Tweet is empty");
      return false;
    }
    if (contentOfTweet.length > 140) {
      alert("Error! Tweet is too long");
      return false;
    }
    return true;
  };

  //add an event listener that listens for the submit event
  //prevent the default behaviour of the submit event (data submission and page refresh)
  //create an AJAX POST request in client.js that sends the form data to the server.
  $("form").on("submit", (event) => {
    event.preventDefault();
    const serializedData = $("form").serialize();
    const contentTweet = $("textarea").val();
    contentTweet.trim();
    if (!validateTweet(contentTweet)) {
      return;
    }
    $.post("/tweets", serializedData, (response) => {
      $(".tweetContainer").empty();
      loadTweets();
    }).catch((error) => {
      console.log(error);
    });
    
  });
 
  loadTweets();
});
