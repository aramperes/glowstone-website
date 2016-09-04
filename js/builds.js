$(function() {
  $.getJSON(getURL("https://bamboo.gserv.me/rest/api/latest/result/GSPP-SRV.json?expand=results.result.artifacts&max-result=10"), function(data) {
    var results = data.results.result;
    var base =
    '<table class="table">' +
      '<thead>' +
        '<tr>' +
          '<th><span class="icon"><i class="fa fa-server"></i></span></th>' +
          '<th>Status</th>' +
          '<th>Date</th>' +
          '<th>Trigger</th>' +
          '<th><span class="icon"><i class="fa fa-github"></i></span></th>' +
          '<th><span class="icon"><i class="fa fa-download"></i></span></th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>{builds}' +
      '</tbody>' +
    '</table>';
    var model =
    '<tr>' +
      '<td>{buildnumber}</td>' +
      '<td>&nbsp;&nbsp;{state}</td>' +
      '<td>{date}</td>' +
      '<td>{reason}</td>' +
      '<td>{commit}</td>' +
      '<td>{download}</td>' +
    '</tr>';
    var content = "";
    for (var i = 0; i < results.length; i++) {
      var b = results[i];
      var buildnumber = '<a href="https://bamboo.gserv.me/browse/GSPP-SRV-' + b.buildNumber.toString() + '">#' + b.buildNumber.toString() + '</a>';
      var state = b.state.toLowerCase();
      var stateIcon = '<span class="icon" style="color: #fce473;"><i class="fa fa-bolt"></i></span>';
      if (state == "successful") {
        stateIcon = '<span class="icon" style="color: #97cd76;"><i class="fa fa-check"></i></span>';
      } else if (state == "failed") {
        stateIcon = '<span class="icon" style="color: #ed6c63;"><i class="fa fa-cross"></i></span>';
      }
      var commit = '<a class="is-disabled"><span class="icon" style="color: lightgray;"><i class="fa fa-github"></i></span></a>';
      var reason = b.buildReason;
      var date = b.buildRelativeTime;
      if ("vcsRevisionKey" in b) {
        reason = 'Commit &nbsp;<code>' + b.vcsRevisionKey.substr(0, 7) + '</code>&nbsp;&nbsp;by&nbsp;' + b.buildReason.replace("Changes by ", "");
        commit = '<a href="https://github.com/GlowstoneMC/Glowstone/commit/' + b.vcsRevisionKey + '"><span class="icon"><i class="fa fa-github"></i></span></a>';
      }
      var download = '<a class="is-disabled"><span class="icon" style="color: lightgray;"><i class="fa fa-download"></i></span></a>';
      if (b.artifacts.artifact.length > 0) {
        download = '<a href="' + b.artifacts.artifact[0].link.href + '"><span class="icon"><i class="fa fa-download"></i></span></a>';
      }
      content += model.replace("{buildnumber}", buildnumber).replace("{state}", stateIcon).replace("{date}", date).replace("{reason}", reason).replace("{commit}", commit).replace("{download}", download);
    }
    $("#builds-parent").html(base.replace("{builds}", content));
  });
});
