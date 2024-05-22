/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const $tweet = $(`<article class="tweet">Hello world</article>`);


// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
                      <span class="datePost"> ${new Date(tweet.created_at).toLocaleString()} </span>
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

  renderTweets(data);

  //Add an Event Listener and Prevent the Default Behaviour
  $("form").on("submit", (event) => {
    event.preventDefault();
    const serializedData = $("form").serialize();
    //Use the jQuery library to submit a POST request that sends the serialized data to the server
    $.post("/tweets", serializedData)
      .done(function() {
        console.log("success");
      });
  });

});
