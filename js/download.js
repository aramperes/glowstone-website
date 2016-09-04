$(function() {
  $("#download-latest").click(function() {
    if ($("#download-warning").is(":hidden")) {
      $("#download-warning").slideDown(500);
      window.location.href = "https://bamboo.gserv.me/browse/GSPP-SRV/latest/artifact/shared/Version-Independent-Server-JAR/glowstone.jar";
    } else {
      $("#download-warning").slideUp(500);
    }
  });
});
