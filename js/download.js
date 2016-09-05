
function download(url, warning) {
  if ($("#download-warning").is(":hidden") && warning) {
    $("#download-warning").slideDown(500);
  }
  window.open(url);
}


$(function() {
  $("#download-snapshot").removeAttr("href");
  $("#download-snapshot").click(function() {
    download("https://204-33457443-gh.circle-artifacts.com/0//tmp/circle-artifacts.qebqzFq/glowstone++-1.11-16w35a-SNAPSHOT.jar", true);
  });
});
