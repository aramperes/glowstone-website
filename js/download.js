
function download(url) {
  console.log("Hello");
  if ($("#download-warning").is(":hidden")) {
    $("#download-warning").slideDown(500);
    window.open(url);
  } else {
    $("#download-warning").slideUp(500);
  }
}


$(function() {
  $("#download-latest").click(function() {
    download("https://bamboo.gserv.me/browse/GSPP-SRV/latest/artifact/shared/Version-Independent-Server-JAR/glowstone.jar");
  });
  $("#download-snapshot").click(function() {
    download("https://204-33457443-gh.circle-artifacts.com/0//tmp/circle-artifacts.qebqzFq/glowstone++-1.11-16w35a-SNAPSHOT.jar");
  });
});
