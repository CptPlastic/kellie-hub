(function () {
  // November 2026 calendar (same events as the Home Hub page)
  var events = [
    ["2026-11-03", "Lowe's paid off ✅", "money"],
    ["2026-11-06", "Grocery shop (Aldi Yukon)", "home"],
    ["2026-11-06", "Bronco wash (skip if rainy)", "home"],
    ["2026-11-07", "Work set starts", "work"],
    ["2026-11-12", "Payday", "pay"],
    ["2026-11-14", "Off week starts", "off"],
    ["2026-11-15", "Liberty Mutual (~$470)", "money"],
    ["2026-11-16", "Boy Raccoon's first check", "pay"],
    ["2026-11-19", "Mortgage (~$2,291)", "money"],
    ["2026-11-21", "Work set starts", "work"],
    ["2026-11-26", "Payday", "pay"],
    ["2026-11-26", "Thanksgiving", "home"]
  ];
  var TODAY = 6; // Nov 6, 2026 (date the hub was last updated)
  var now = new Date();
  if (now.getFullYear() === 2026 && now.getMonth() === 10) TODAY = now.getDate();

  var byDay = {};
  events.forEach(function (e) {
    var d = parseInt(e[0].slice(8), 10);
    (byDay[d] = byDay[d] || []).push(e);
  });

  var cal = document.getElementById("cal");
  if (cal) {
    var html = "";
    ["S", "M", "T", "W", "T", "F", "S"].forEach(function (d) { html += '<div class="dow">' + d + "</div>"; });
    var first = new Date(2026, 10, 1).getDay(); // Sunday = 0
    for (var i = 0; i < first; i++) html += '<div class="day empty"></div>';
    for (var day = 1; day <= 30; day++) {
      var ev = byDay[day] || [];
      var cls = "day" + (day === TODAY ? " today" : "") + (ev.length ? " has" : "");
      var dots = ev.map(function (e) { return '<i class="dot ' + e[2] + '"></i>'; }).join("");
      html += '<div class="' + cls + '"><span>' + day + "</span><b>" + dots + "</b></div>";
    }
    cal.innerHTML = html;
  }

  var agenda = document.getElementById("agenda");
  if (agenda) {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    agenda.innerHTML = events.map(function (e) {
      var d = parseInt(e[0].slice(8), 10);
      var wd = days[new Date(2026, 10, d).getDay()];
      var past = d < TODAY ? " past" : "";
      return '<li class="' + e[2] + past + '"><span class="lead">' + wd + " Nov " + d +
        '</span><span class="title"><i class="dot ' + e[2] + '"></i>' + e[1] + "</span></li>";
    }).join("");
  }

  // Segmented switchers (grocery categories, chore weeks)
  document.querySelectorAll(".seg").forEach(function (seg) {
    var panels = document.getElementById(seg.getAttribute("data-target"));
    var buttons = seg.querySelectorAll("button");
    function show(v) {
      buttons.forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-v") === v ? "true" : "false"); });
      panels.querySelectorAll("[data-p]").forEach(function (p) { p.hidden = p.getAttribute("data-p") !== v; });
    }
    buttons.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-v")); }); });
    show(buttons[0].getAttribute("data-v"));
  });
})();
