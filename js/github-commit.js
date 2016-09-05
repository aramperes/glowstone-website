$(function() {
  $.getJSON("https://api.github.com/repos/GlowstoneMC/Glowstone/commits", function(data) {
    var commit = data[0].commit;
    var author = commit.author.name;
    var sha = commit.url.replace("https://api.github.com/repos/GlowstoneMC/Glowstone/git/commits/", "");
    var message = commit.message;
    var link = "https://github.com/GlowstoneMC/Glowstone/commit/" + sha;
    $("#commit-parent").attr("href", link);
    $("#commit-details").html('<span class="fa fa-github"></span>&nbsp;&nbsp; Latest commit:&nbsp;<strong>' + author + '</strong>&nbsp;pushed commit&nbsp;<i>' + sha.substr(0, 7) + '</i>: ' + message);
  }).error(function(err){
    $("#commit-details").html('<span class="fa fa-warning"></span> &nbsp; Unable to fetch latest commit.');
  });
});
