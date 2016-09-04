// Proxy utility

var proxy = "https://momoperes.ca/proxy/get.php";

function needsProxy() {
  var host = window.location.hostname;
  return !(host == "www.glowstone.net" || host == "momothereal.github.io" || host == "glowstonemc.github.io");
}

function getURL(url, cache) {
  if (!needsProxy() && !cache) {
    return url;
  } else if (!cache) {
    return proxy + "?cache=false&url=" + btoa(url);
  } else {
    return proxy + "?url=" + btoa(url) + "";
  }
}
