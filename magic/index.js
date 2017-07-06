/*variables*/
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getChannelInfo() {
    channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";
          html = '<div class="channels animated fadeInUp ' + 
          status + '"><div id="icon"><img width="50" src="' + 
          logo + '" class="logo"></div><div id="name"><a href="' + 
          data.url + '" target="_blank">' + 
          name + '</a></div><div id="streaming"> '+ 
          game + '<span>' + 
          description + '</span></div></div>';
        status === "online" ? $(".list").prepend(html) : $(".list").append(html);
      });
    });
  });
};

$(document).ready(function(){
    $(".main").addClass("animated fadeInUp");
    $(".head").addClass("animated fadeInDown");
    $("#all").addClass("active1");
    $("#all").click(function(){
        $(".channels").removeClass("hidden");
        $("#all").addClass("active1");
        $("#online").removeClass("active1");
        $("#offline").removeClass("active1");
    });
    
    $("#online").click(function(){
        $(".online").removeClass("hidden")
        $(".offline").addClass("hidden");
        $("#online").addClass("active1");
        $("#all").removeClass("active1");
        $("#offline").removeClass("active1");
    });
    
    $("#offline").click(function(){
        $(".online").addClass("hidden");
        $(".offline").removeClass("hidden");
        $("#offline").addClass("active1");
        $("#online").removeClass("active1");
        $("#all").removeClass("active1");
    });
    getChannelInfo();
});