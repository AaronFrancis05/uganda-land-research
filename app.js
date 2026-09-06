(function(){
  "use strict";
  var cfg = window.LT_CONFIG || {};
  var TRACKS = window.LT_TRACKS;
  var ORDER = window.LT_TRACK_ORDER;
  var sb = null;
  try {
    if (window.supabase && cfg.SUPABASE_URL) {
      sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    }
  } catch (e) { sb = null; }

  var state = { track:null, answers:{}, serial:null };
  var findingsTrack = "native";

  function $(s, r){ return (r||document).querySelector(s); }
  function $all(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }

  /* ---------- routing ---------- */
  function show(view){
    $all("[data-view]").forEach(function(m){ m.classList.remove("active"); });
    var el = $('[data-view="'+view+'"]');
    if (el) el.classList.add("active");
    $all(".mast-nav a").forEach(function(a){ a.classList.toggle("on", a.getAttribute("data-nav")===view); });
    window.scrollTo(0,0);
    if (view === "findings") renderFindings();
    if (view === "home") refreshTotal();
  }
  function route(){
    var h = (location.hash || "#/").replace("#","");
    if (h === "/findings") return show("findings");
    if (h === "/about") return show("about");
    return show("home");
  }
  window.addEventListener("hashchange", route);

  /* ---------- serial ---------- */
  function makeSerial(){
    var n = Math.floor(1000 + Math.random()*9000);
    var l = "ABCDEFGHJKMNPQRSTUVWXYZ";
    return "LT/2026/" + l[Math.floor(Math.random()*l.length)] + n;
  }

  /* ---------- start a survey ---------- */
  function startSurvey(track){
    state = { track:track, answers:{}, serial:makeSerial() };
    var t = TRACKS[track];
    $("[data-survey-track]").textContent = t.label;
    $("[data-survey-track]").style.color = t.color;
    $("[data-survey-serial]").textContent = state.serial;
    $("[data-survey-title]").textContent = t.title;
    $("[data-survey-sub]").textContent = t.sub;
    buildForm(t);
    show("survey");
  }

  function buildForm(t){
    var form = $("[data-survey-form]");
    form.innerHTML = "";
    t.questions.forEach(function(q, i){
      var fs = document.createElement("fieldset");
      fs.className = "q"; fs.setAttribute("data-q", q.id);
      var leg = document.createElement("legend");
      leg.innerHTML = '<span class="qn">'+(i+1)+'</span><span>'+q.prompt+'</span>';
      fs.appendChild(leg);
      if (q.hint){ var h=document.createElement("p"); h.className="qhint"; h.textContent=q.hint; fs.appendChild(h); }

      if (q.type === "single" || q.type === "multi"){
        var wrap = document.createElement("div"); wrap.className="opts";
        q.options.forEach(function(opt){
          var lab = document.createElement("label"); lab.className="opt";
          var inp = document.createElement("input");
          inp.type = q.type === "single" ? "radio" : "checkbox";
          inp.name = q.id; inp.value = opt;
          inp.addEventListener("change", function(){
            if (q.type === "single"){
              state.answers[q.id] = opt;
              $all(".opt", wrap).forEach(function(o){ o.classList.remove("on"); });
              lab.classList.add("on");
            } else {
              if (!Array.isArray(state.answers[q.id])) state.answers[q.id] = [];
              if (inp.checked){ state.answers[q.id].push(opt); lab.classList.add("on"); }
              else { state.answers[q.id] = state.answers[q.id].filter(function(v){return v!==opt;}); lab.classList.remove("on"); }
            }
            fs.classList.remove("bad"); meter(t);
          });
          lab.appendChild(inp);
          var sp=document.createElement("span"); sp.textContent=opt; lab.appendChild(sp);
          wrap.appendChild(lab);
        });
        fs.appendChild(wrap);
      }

      if (q.type === "scale"){
        var sc = document.createElement("div"); sc.className="scale";
        for (var n=1;n<=5;n++){ (function(val){
          var b=document.createElement("button"); b.type="button"; b.className="scale-b"; b.textContent=val;
          b.addEventListener("click", function(){
            state.answers[q.id]=val;
            $all(".scale-b", sc).forEach(function(x){ x.classList.remove("on"); });
            b.classList.add("on"); fs.classList.remove("bad"); meter(t);
          });
          sc.appendChild(b);
        })(n); }
        fs.appendChild(sc);
        var ends=document.createElement("div"); ends.className="scale-ends";
        ends.innerHTML="<span>"+q.labels[0]+"</span><span>"+q.labels[1]+"</span>";
        fs.appendChild(ends);
      }

      if (q.type === "text"){
        var ta=document.createElement("textarea");
        ta.placeholder = q.optional ? "Optional" : "Your answer";
        ta.addEventListener("input", function(){ state.answers[q.id]=ta.value.trim(); fs.classList.remove("bad"); meter(t); });
        fs.appendChild(ta);
      }

      var err=document.createElement("p"); err.className="qerr"; err.textContent="Please answer this, or leave it blank if it's optional."; fs.appendChild(err);
      form.appendChild(fs);
    });

    var foot=document.createElement("div"); foot.className="form-foot";
    foot.innerHTML = '<span class="note">Answers save to the shared study pool when you submit.</span>';
    var btn=document.createElement("button"); btn.type="button"; btn.className="btn primary"; btn.textContent="Submit response";
    btn.addEventListener("click", function(){ submit(t, btn); });
    foot.appendChild(btn);
    form.appendChild(foot);
    meter(t);
  }

  function meter(t){
    var req = t.questions.filter(function(q){ return !q.optional; });
    var done = req.filter(function(q){
      var v = state.answers[q.id];
      return Array.isArray(v) ? v.length>0 : (v!==undefined && v!=="");
    });
    $("[data-meter]").style.width = Math.round(done.length/req.length*100) + "%";
  }

  /* ---------- submit ---------- */
  function submit(t, btn){
    var firstBad = null;
    t.questions.forEach(function(q){
      if (q.optional) return;
      var v = state.answers[q.id];
      var missing = Array.isArray(v) ? v.length===0 : (v===undefined || v==="");
      var fs = $('[data-q="'+q.id+'"]');
      if (missing){ fs.classList.add("bad"); if(!firstBad) firstBad=fs; }
      else fs.classList.remove("bad");
    });
    if (firstBad){ firstBad.scrollIntoView({behavior:"smooth", block:"center"}); return; }

    btn.disabled = true; btn.textContent = "Saving…";
    saveResponse(t).then(function(){
      $("[data-thanks-track]").textContent = t.label.toUpperCase();
      $("[data-thanks-track]").style.color = t.color;
      $("[data-thanks-track]").style.borderColor = t.color;
      $("[data-thanks-serial]").textContent = state.serial;
      show("thanks");
      btn.disabled = false; btn.textContent = "Submit response";
    }).catch(function(e){
      console.error(e);
      btn.disabled = false; btn.textContent = "Submit response";
      alert("We couldn't save your response just now. Please check your connection and try again.");
    });
  }

  function saveResponse(t){
    // Fallback if Supabase client failed to load: keep the UX working locally.
    if (!sb){
      try {
        var key = "lt_local_" + Date.now();
        localStorage.setItem(key, JSON.stringify({track:state.track, answers:state.answers}));
      } catch(e){}
      return Promise.resolve();
    }
    var regionVal = state.answers.region || state.answers.institution || null;
    return sb.from("survey_responses").insert({
      track: state.track,
      answers: state.answers,
      region: regionVal,
      user_agent: navigator.userAgent.slice(0,240)
    }).select("id").single().then(function(res){
      if (res.error) throw res.error;
      var rid = res.data.id;
      var rows = [];
      t.questions.forEach(function(q){
        var v = state.answers[q.id];
        if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) return;
        if (q.type === "text") return; // free text stays in the jsonb, not the tallied table
        if (Array.isArray(v)) v.forEach(function(opt){ rows.push({response_id:rid, track:state.track, question_id:q.id, answer_value:String(opt)}); });
        else rows.push({response_id:rid, track:state.track, question_id:q.id, answer_value:String(v)});
      });
      if (!rows.length) return;
      return sb.from("survey_answers").insert(rows).then(function(r2){ if (r2.error) throw r2.error; });
    });
  }

  /* ---------- totals ---------- */
  function refreshTotal(){
    var el = $("[data-total]"); if (!el) return;
    if (!sb){ el.textContent = "—"; return; }
    sb.from("metrics_track_totals").select("total_responses").then(function(res){
      if (res.error || !res.data){ el.textContent = "—"; return; }
      var sum = res.data.reduce(function(a,r){ return a + (r.total_responses||0); }, 0);
      el.textContent = sum;
    });
  }

  /* ---------- findings ---------- */
  function renderFindings(){
    buildTotalsStrip();
    buildSwitch();
    var body = $("[data-findings-body]");
    if (!sb){ body.innerHTML = '<p class="emptyq">The results database isn\'t reachable from here. Once the site is deployed with its Supabase connection, live tallies appear on this sheet.</p>'; return; }
    body.innerHTML = '<p class="muted">Loading the record…</p>';

    Promise.all([
      sb.from("metrics_track_totals").select("*"),
      sb.from("metrics_option_counts").select("*")
    ]).then(function(r){
      var totals = (r[0].data)||[];
      var counts = (r[1].data)||[];
      paintTotals(totals);
      paintQuestions(counts);
    }).catch(function(){
      body.innerHTML = '<p class="emptyq">Couldn\'t load results just now. Try refreshing.</p>';
    });
  }

  function buildTotalsStrip(){
    var strip = $("[data-totals-strip]");
    strip.innerHTML = ORDER.map(function(k){
      return '<div class="tcell" data-total-'+k+'><b>—</b><span>'+TRACKS[k].title+'</span></div>';
    }).join("");
  }
  function paintTotals(totals){
    ORDER.forEach(function(k){
      var row = totals.filter(function(t){return t.track===k;})[0];
      var cell = $('[data-total-'+k+'] b');
      if (cell) cell.textContent = row ? row.total_responses : 0;
    });
  }
  function buildSwitch(){
    var sw = $("[data-track-switch]");
    sw.innerHTML = ORDER.map(function(k){
      return '<button class="tsw'+(k===findingsTrack?' on':'')+'" data-sw="'+k+'">'+TRACKS[k].title+'</button>';
    }).join("");
    $all(".tsw", sw).forEach(function(b){
      b.addEventListener("click", function(){ findingsTrack = b.getAttribute("data-sw"); renderFindings(); });
    });
  }

  function paintQuestions(counts){
    var body = $("[data-findings-body]");
    var t = TRACKS[findingsTrack];
    var mine = counts.filter(function(c){ return c.track===findingsTrack; });
    if (!mine.length){
      body.innerHTML = '<p class="emptyq">No responses in this track yet. Be the first. Pick this instrument from the tracks page.</p>';
      return;
    }
    var html = "";
    t.questions.forEach(function(q){
      if (q.type === "text") return; // free text isn't tallied to protect anonymity
      html += '<div class="qblock"><h4>'+q.prompt+'</h4>';
      var rows, total;
      if (q.type === "scale"){
        rows = [1,2,3,4,5].map(function(n){
          var r = mine.filter(function(c){return c.question_id===q.id && String(c.answer_value)===String(n);})[0];
          return { label: n + (n===1?" · "+q.labels[0]:(n===5?" · "+q.labels[1]:"")), count: r?r.responses:0 };
        });
      } else {
        rows = q.options.map(function(opt){
          var r = mine.filter(function(c){return c.question_id===q.id && c.answer_value===opt;})[0];
          return { label: opt, count: r?r.responses:0 };
        });
      }
      total = rows.reduce(function(a,r){return a+r.count;},0);
      rows.forEach(function(r){
        var pct = total ? Math.round(r.count/total*100) : 0;
        html += '<div class="bar"><div class="bar-l">'+esc(r.label)+'</div>'
              + '<div class="bar-t"><div class="bar-f" style="width:'+pct+'%;background:'+t.color+';"></div></div>'
              + '<div class="bar-c">'+r.count+'</div></div>';
      });
      html += '</div>';
    });
    html += '<p class="emptyq">Open-text answers are stored with each response but are not shown here, to keep individual responses anonymous.</p>';
    body.innerHTML = html;
  }

  function esc(s){ return String(s).replace(/[&<>]/g, function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); }

  /* ---------- wire up ---------- */
  document.addEventListener("click", function(e){
    var row = e.target.closest("[data-track]");
    if (row){ startSurvey(row.getAttribute("data-track")); return; }
    var nav = e.target.closest("[data-nav]");
    if (nav){
      var target = nav.getAttribute("data-nav");
      var want = target === "findings" ? "#/findings" : (target === "about" ? "#/about" : "#/");
      if (location.hash === want || (want === "#/" && (location.hash === "" || location.hash === "#/"))){
        e.preventDefault(); route();
      }
    }
  });

  route();
  refreshTotal();
})();
