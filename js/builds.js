$(function() {
  $.getJSON(getURL("https://bamboo.gserv.me/rest/api/latest/result/GSPP-SRV.json?expand=results.result.artifacts&max-result=10"), function(data) {
    var results = data.results.result;
    var base =
    '<table class="table">' +
      '<thead>' +
        '<tr>' +
          '<th><span class="icon"><i class="fa fa-server"></i></span></th>' +
          '<th>Date</th>' +
          '<th>Reason</th>' +
          '<th>Commit</th>' +
          '<th><span class="icon"><i class="fa fa-download"></i></span></th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>{builds}' +
      '</tbody>' +
    '</table>';
    var model =
    '<tr>' +
      '<td>{buildnumber}</td>' +
      '<td>{date}</td>' +
      '<td>{reason}</td>' +
      '<td>{commit}</td>' +
      '<td><a href="{download}"><span class="icon"><i class="fa fa-download"></i></span></a></td>' +
    '</tr>';
    var content = "";
    for (var i = 0; i < results.length; i++) {
      var b = results[i];
      var buildnumber = '<a href="https://bamboo.gserv.me/browse/GSPP-SRV-' + b.buildNumber.toString() + '">#' + b.buildNumber.toString() + '</a>';
      var date = b.buildRelativeTime;
      var reason = b.buildReason;
      var commit = '<a href="https://github.com/GlowstoneMC/Glowstone/commit/' + b.vcsRevisionKey + '"><code>' + b.vcsRevisionKey + '</code></a>';
      var download = b.artifacts.artifact[0].link.href;
      content += model.replace("{buildnumber}", buildnumber).replace("{date}", date).replace("{reason}", reason).replace("{commit}", commit).replace("{download}", download);
    }
    $("#builds-parent").html(base.replace("{builds}", content));
  });
});
