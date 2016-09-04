$(function() {
  // Get the data from the forums
  var topicArray = {};
  $.getJSON("http://momoperes.ca/proxy/forums_news.php", function(data) {
    var topics = data.topics;
    for (var i = 0; i < topics.length; i++) {
      var t = topics[i];
      var html = "";
      if (!t.deleted) {
        var api = "http://momoperes.ca/proxy/forums_post.php?slug=" + t.slug;
        $.ajax({
          dataType: "json",
          url: api,
          async: false,
          success: function(topic) {
            var topicurl = "https://forums.glowstone.net/topic/" + topic.slug;
            var timestamp = Number(topic.timestamp);
            var date = timeDifference(new Date().getTime(), timestamp);
            var author = topic.posts[0].user.username;
            var comments = topic.posts.length - 1;
            var content = topic.posts[0].content.replace("<\\n", "");
            var title = topic.title;
            topicArray['<div class="content box"><h2>' + title + ' <div style="float: right; color: gray">' + comments + ' <span class="fa fa-comment" style="margin-top: 1px;"></span></div><br><h5><a href="' + topicurl + '">Posted</a> by ' + author + ' <strong id="datetest">' + date + '</strong></h5></h2>' + content + '</div>'] = timestamp;
            console.log("Topiced.");
        }});
      }
    }

  }).complete(function() {
    console.log("Completed.");
    $("#announcements-loading").remove();
    for (var html in topicArray) {
      $("#announcements-parent").html($("#announcements-parent").html() + "<br>" + html);
    }

  });
});
