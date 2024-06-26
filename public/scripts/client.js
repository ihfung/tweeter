/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const $tweet = $(`<article class="tweet">Hello world</article>`);



$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  //empty the tweet container before appending the new tweets

    $(".tweetContainer").empty();
    

    for (let tweet of tweets) {
      $(".tweetContainer").prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
  /* Your code for creating the tweet element */
    const agoTime = timeago.format(tweet.created_at);
    
    const $tweet = $(`<article class="tweet">
                  <header>
                  <div class="tweetName">
                  <span>
                    <img class="avatar" src="${escape(tweet.user.avatars)}"/> 
                  </span>
                  <h3 class="firstName">${escape(tweet.user.name)}</h3>
                  <span class="handle">${escape(tweet.user.handle)}</span>
                  </div>
                  </header>
                  
                  <section class="tweetContent">${escape(tweet.content.text)}</section>
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
  
  //button to bring the user to the compose tweet text area
  $(".postButton").on("click", function() {
    $(".new-tweet").focus();
    $("textArea").focus();
  });

  //function to load tweets from the database
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

  //function to validate the tweet
  //if the tweet is empty or more than 140 characters, it will show an error message
  const validateTweet = function(contentOfTweet) {
    $('.error').empty();
    $('.error').slideUp();

    if (contentOfTweet.length === 0 || contentOfTweet === null) {
      
      $('.error').append('<p><i class="fa-solid fa-triangle-exclamation"></i> Error! Please enter some characters <i class="fa-solid fa-triangle-exclamation"></i></p>').slideDown();
      setTimeout(() => {
        $('.error').slideUp();
      }
      , 5000);
      return false;
    }

    if (contentOfTweet.length > 140) {
      
      $('.error').append('<p><i class="fa-solid fa-triangle-exclamation"></i> Error! Too Long. Please be below 140 characters <i class="fa-solid fa-triangle-exclamation"></i></p>').slideDown();
      setTimeout(() => {
        $('.error').slideUp();
      } , 5000);
      return false;
    }
  
    return true;
  };

  //function to submit the tweet to the database from the form
  //validate the tweet before submitting
  //if the tweet is valid, it will be submitted to the database
  $("#tweetForm").on("submit", (event) => {
    event.preventDefault();
    const serializedData = $("#tweetForm").serialize();
    let contentTweet = $("textarea").val();
    contentTweet = contentTweet.trim();

    if (!validateTweet(contentTweet)) {
      return false;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
    }).then((response) => {
      loadTweets();
      $("textArea").val("");
      $(".counter").text("140");
    }).catch((error) => {
      console.log(error);
    });
 
  });
  loadTweets();
});