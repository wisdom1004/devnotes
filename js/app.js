/* ============================================================
   DevNotes · 应用逻辑
   - 答题 / 判分 / 解析
   - localStorage 进度、错题本、收藏、统计
   ============================================================ */

const ALL = QUESTION_BANK.questions;
const CATS = QUESTION_BANK.categories;
const STORE_KEY = 'java_quiz_progress_v1';

/* ---------- 状态存储 ---------- */
function freshState() {
  return { stats: {}, wrong: [], star: [], history: [], daily: { date: '', count: 0 }, streak: 0, lastPractice: '' };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return freshState();
    return Object.assign(freshState(), JSON.parse(raw));
  } catch (e) { return freshState(); }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}
let state = loadState();

const QUOTES = [
  '把知识装进卡片，一点点变强。',
  'final 的类不能继承，但你的实力可以。',
  '多态：同一个方法，不同的你。',
  '别让 NullPointerException 定义你的人生。',
  '每天几张卡片，积累会产生复利。',
  '构造方法都调用了，你还没开始？'
];

/* ---------- 工具 ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const byId = id => ALL.find(q => q.id === id);
const catName = id => (CATS.find(c => c.id === id) || {}).name || '其他';

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- 答题会话 ---------- */
let session = null;   // {mode, list, idx, answers:{}, exam, finished}
let curRange = 'all';
let curMode = 'order';

/* ---------- 视图切换 ---------- */
function switchView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#view-' + name).classList.add('active');
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === name));
  const titles = { home:'概览', practice:'练习模式', wrong:'待巩固', star:'收藏夹', stats:'数据面板' };
  $('#crumb').textContent = titles[name] || '';
  $('#sidebar').classList.remove('open');
  $('#overlay').classList.remove('show');
  if (name === 'home') renderHome();
  if (name === 'wrong') renderWrong();
  if (name === 'star') renderStar();
  if (name === 'stats') renderStats();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- 首页 ---------- */
function masteredCount() { return Object.values(state.stats).filter(s => s.right > 0).length; }
function totalAnswered() { return Object.values(state.stats).reduce((n,s) => n + s.right + s.wrong, 0); }
function accuracy() {
  const right = Object.values(state.stats).reduce((n,s) => n + s.right, 0);
  const total = totalAnswered();
  return total ? Math.round(right / total * 100) : 0;
}
function checkDaily() {
  if (state.daily.date !== today()) { state.daily = { date: today(), count: 0 }; saveState(); }
}

function renderHome() {
  checkDaily();
  $('#dailyQuote').textContent = QUOTES[Math.floor(Math.random()*QUOTES.length)];
  $('#streakNum').textContent = state.streak;
  const total = ALL.length;
  const stats = [
    { ico: '◈', cls: 'purple', num: total, label: '卡片总数' },
    { ico: '✅', cls: 'green', num: masteredCount(), label: '已掌握' },
    { ico: '✍️', cls: 'orange', num: totalAnswered(), label: '累计作答' },
    { ico: '🎯', cls: 'blue', num: accuracy() + '%', label: '正确率' }
  ];
  $('#homeStats').innerHTML = stats.map(s => `
    <div class="stat-card"><div class="stat-ico ${s.cls}">${s.ico}</div>
      <div><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div></div>`).join('');

  const icons = { edit:'✎', check:'✓', toggle:'⇄', code:'⌘' };
  const colors = { fill:['#fff1ec','#ff7a59'], choice:['#eef0ff','#5b5bd6'], judge:['#e6f9f2','#1bbd8a'], program:['#e6f2ff','#3b9ae1'] };
  $('#catGrid').innerHTML = CATS.map(c => {
    const count = ALL.filter(q => q.cat === c.id).length;
    const [soft, main] = colors[c.id] || ['#eef0ff','#5b5bd6'];
    return `<button class="cat-card" data-cat="${c.id}" style="--c-soft:${soft};--c:${main}">
      <div class="cat-ico">${icons[c.icon] || '▦'}</div>
      <h3>${c.name}</h3><p>${c.desc}</p><div class="cat-count"><b>${count}</b> 题</div></button>`;
  }).join('');
  $$('.cat-card').forEach(el => el.onclick = () => { curRange = el.dataset.cat; goPractice(); refreshRangeChips(); });

  const goal = Math.min(20, state.daily.count);
  $('#goalLabel').textContent = `${goal} / 20`;
  $('#goalFill').style.width = (goal/20*100) + '%';
  $('#goalTip').textContent = goal >= 20 ? '今日目标达成！你真的很棒 🎉' :
    state.daily.count === 0 ? '每天 20 张卡片，保持手感。今天还没开始哦～' : `再来 ${20-goal} 张就完成今日目标啦，冲！`;
  updateBadges();
}

function updateBadges() {
  const w = $('#wrongBadge'), s = $('#starBadge');
  w.textContent = state.wrong.length; w.classList.toggle('has', state.wrong.length > 0);
  s.textContent = state.star.length; s.classList.toggle('has', state.star.length > 0);
}

/* ---------- 练习设置 ---------- */
function refreshRangeChips() {
  const wrap = $('#rangeChips');
  wrap.innerHTML = `<button class="range-chip ${curRange==='all'?'selected':''}" data-range="all">全部题目 (${ALL.length})</button>` +
    CATS.map(c => `<button class="range-chip ${curRange===c.id?'selected':''}" data-range="${c.id}">${c.name} (${ALL.filter(q=>q.cat===c.id).length})</button>`).join('');
  $$('.range-chip', wrap).forEach(el => el.onclick = () => {
    curRange = el.dataset.range; refreshRangeChips(); updateCount();
  });
  updateCount();
}
function updateCount() {
    const n = curRange === 'all' ? ALL.length : ALL.filter(q => q.cat === curRange).length;
  $('#setupCount').textContent = `共 ${n} 张 · 当前方式：${ {order:'顺序',random:'随机',exam:'模拟测验'}[curMode] }`;
}
function goPractice() {
  switchView('practice');
  $('#practiceSetup').classList.remove('hidden');
  $('#quizArea').classList.add('hidden');
  $('#resultArea').classList.add('hidden');
  refreshRangeChips();
}

/* ---------- 开始答题 ---------- */
function startSession() {
  let list = curRange === 'all' ? ALL.slice() : ALL.filter(q => q.cat === curRange);
  if (curMode === 'random' || curMode === 'exam') list = shuffle(list);
  session = { mode: curMode, list, idx: 0, answers: {}, exam: curMode === 'exam', finished: false };
  $('#practiceSetup').classList.add('hidden');
  $('#resultArea').classList.add('hidden');
  $('#quizArea').classList.remove('hidden');
  renderQuestion();
}

function recordDaily() {
  checkDaily();
  state.daily.count++;
  if (!state.lastPractice || state.lastPractice !== today()) {
    const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    state.streak = (state.lastPractice === y) ? state.streak + 1 : 1;
    state.lastPractice = today();
  }
  saveState();
}

function saveAnswer(q, right) {
  if (!state.stats[q.id]) state.stats[q.id] = { right:0, wrong:0 };
  state.stats[q.id][right ? 'right' : 'wrong']++;
  if (right) state.wrong = state.wrong.filter(x => x !== q.id);
  else if (!state.wrong.includes(q.id)) state.wrong.push(q.id);
  saveState();
}

function renderQuestion() {
  const q = session.list[session.idx];
  const total = session.list.length;
  $('#qIndex').textContent = `第 ${session.idx + 1} / ${total} 张`;
  $('#quizProgressFill').style.width = ((session.idx + 1) / total * 100) + '%';
  const done = Object.keys(session.answers).length;
  $('#qScoreHint').textContent = session.exam ? `已作答 ${done}/${total}` : '';
  const starred = state.star.includes(q.id);
  $('#starBtn').textContent = starred ? '★' : '☆';
  $('#starBtn').classList.toggle('starred', starred);

  const ans = session.answers[q.id];
  const typeName = { blank:'填空题', single:'单选题', judge:'判断题' }[q.type];
  let body = '';

  if (q.type === 'blank') {
    const vals = (ans && ans.vals) || q.blanks.map(() => '');
    body = `<div class="blank-inputs">${q.blanks.map((_, i) => {
      let mark = '';
      if (ans) {
        const one = { blanks: [q.blanks[i]], accept: q.accept ? [q.accept[i]] : undefined };
        mark = judgeBlank(one, [vals[i]]) ? 'right' : 'wrong';
      }
      return `<input class="blank-field ${mark}" data-blank="${i}" placeholder="第 ${i+1} 空" value="${esc(vals[i]||'')}" ${ans ? 'disabled' : ''}>`;
    }).join('')}</div>`;
    if (!ans) body += `<button class="btn primary q-submit" id="submitBlank">提交答案</button>`;
  } else {
    const pairs = q.type === 'judge'
      ? [['T','✔ 正确'], ['F','✘ 错误']]
      : Object.entries(q.options).map(([k,v]) => [k, k + '. ' + v]);
    body = `<div class="q-options">${pairs.map(([k, text]) => {
      let cls = '';
      if (ans) {
        if (session.exam) cls = (ans.sel === k) ? 'selected' : '';
        else if (k === q.answer) cls = 'correct';
        else if (k === ans.sel) cls = 'wrong';
        else cls = 'disabled';
      }
      return `<button class="q-option ${cls}" data-key="${k}" ${ans ? 'disabled' : ''}>
        <span class="opt-key">${k}</span><span>${esc(text)}</span></button>`;
    }).join('')}</div>`;
  }

  let analysisHtml = '';
  if (ans && !session.exam) {
    const ok = ans.right;
    const ansText = q.type === 'blank' ? q.blanks.map((b,i) => (q.accept?.[i] || [b])[0]).join('、')
      : (q.type === 'judge' ? (q.answer === 'T' ? '正确' : '错误') : q.answer);
    analysisHtml = `<div class="analysis-box">
      <div class="analysis-title">${ok ? '🎉 答对了' : '💡 正确答案与解析'}</div>
      <div class="analysis-answer">正确答案：<span class="ans-tag ${ok?'':'no'}">${esc(ansText)}</span>${ok?'':'　你答错了，已加入待巩固'}</div>
      <div class="analysis-text">${esc(q.analysis)}</div></div>`;
  }

  $('#quizCard').innerHTML = `
    <div class="q-meta"><span class="q-type">${typeName}</span><span class="q-tag"># ${q.id} · ${esc(q.tag||'')}</span></div>
    <div class="q-stem">${esc(q.stem)}</div>
    ${q.code ? `<pre class="q-code">${esc(q.code)}</pre>` : ''}
    ${body}${analysisHtml}`;

  // 事件绑定
  if (q.type === 'blank') {
    const btn = $('#submitBlank');
    if (btn) btn.onclick = () => submitBlank();
  } else {
    $$('.q-option').forEach(el => el.onclick = () => submitChoice(el.dataset.key));
  }
  $('#prevBtn').disabled = session.idx === 0;
  $('#nextBtn').textContent = (session.idx === total - 1) ? (session.exam ? '交卷 →' : '查看结果 →') : '下一题 →';
}

function normalize(s) { return String(s).toLowerCase().replace(/[\s，。、,.;；：:（）()"'·]/g, ''); }
function judgeBlank(q, vals) {
  return q.blanks.every((b, i) => {
    const accept = (q.accept && q.accept[i]) || [b];
    const v = normalize(vals[i] || '');
    return accept.some(a => { const n = normalize(a); return v === n || (n.length >= 2 && v.includes(n)); });
  });
}
function submitChoice(key) {
  const q = session.list[session.idx];
  if (session.answers[q.id]) return;
  const right = key === q.answer;
  session.answers[q.id] = { sel: key, right };
  if (!session.exam) { saveAnswer(q, right); recordDaily(); }
  renderQuestion();
}
function submitBlank() {
  const q = session.list[session.idx];
  if (session.answers[q.id]) return;
  const vals = $$('.blank-field').map(el => el.value);
  const right = judgeBlank(q, vals);
  session.answers[q.id] = { vals, right };
  if (!session.exam) { saveAnswer(q, right); recordDaily(); }
  renderQuestion();
}
function nextQuestion() {
  const total = session.list.length;
  if (session.idx < total - 1) { session.idx++; renderQuestion(); }
  else finishSession();
}
function prevQuestion() { if (session.idx > 0) { session.idx--; renderQuestion(); } }
function finishSession() {
  // 模拟测验：交卷时统一判分并记入统计
  if (session.exam) {
    session.list.forEach(q => {
      const a = session.answers[q.id];
      if (a) { a.right = a.sel === q.answer; saveAnswer(q, a.right); }
      else { a.right = false; saveAnswer(q, false); }
    });
    recordDaily();
  }
  session.finished = true;
  const done = session.list.length;
  const right = session.list.filter(q => session.answers[q.id] && session.answers[q.id].right).length;
  const pct = Math.round(right / done * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 75 ? '🎉' : pct >= 60 ? '💪' : pct >= 40 ? '📖' : '🔥';
  const title = pct >= 90 ? '状态绝佳，继续保持！' : pct >= 75 ? '不错哦，继续保持！' : pct >= 60 ? '基础扎实，再巩固一轮！' : '别急，待巩固列表已经帮你记好了';
  const wrongList = session.list.filter(q => !(session.answers[q.id] && session.answers[q.id].right));
  $('#quizArea').classList.add('hidden');
  $('#resultArea').classList.remove('hidden');
  $('#resultArea').innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${emoji}</div>
      <h1>${title}</h1>
      <p>本轮练习已结束 · ${ {order:'顺序练习',random:'随机练习',exam:'模拟测验'}[session.mode] }</p>
      <div class="result-score">${pct}<span>分</span></div>
      <div class="result-detail">
        <div><b>${done}</b><small>总题数</small></div>
        <div><b style="color:var(--green)">${right}</b><small>答对</small></div>
        <div><b style="color:var(--red)">${done-right}</b><small>答错/未答</small></div>
      </div>
      <div class="result-actions">
        <button class="btn primary" id="againBtn">再来一轮</button>
        <button class="btn ghost" id="backHomeBtn">返回首页</button>
      </div>
      ${wrongList.length ? `<div class="review-list"><h3 style="text-align:left;font-size:15px;margin-bottom:12px">📝 本轮待巩固回顾</h3>${wrongList.map(q => `
        <div class="review-item"><div class="ri-head"><span class="ri-badge no">${q.id}</span>${esc(q.stem.slice(0,60))}${q.stem.length>60?'…':''}</div>
        <p><b>正确答案：</b>${esc(q.type==='blank' ? q.blanks.map((b,i)=>(q.accept?.[i]||[b])[0]).join('、') : q.type==='judge' ? (q.answer==='T'?'正确':'错误') : q.answer)}　${esc(q.analysis.slice(0,90))}…</p></div>`).join('')}</div>` : ''}
    </div>`;
  state.history.unshift({ date: new Date().toLocaleString('zh-CN', { hour12:false }), total: done, correct: right, mode: session.mode });
  state.history = state.history.slice(0, 20);
  saveState();
  $('#againBtn').onclick = () => startSession();
  $('#backHomeBtn').onclick = () => goPractice();
  updateBadges();
}

/* ---------- 错题本 / 收藏 ---------- */
function renderList(container, ids, isWrong) {
  const el = $(container);
  if (!ids.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-ico">${isWrong?'🎯':'⭐'}</div>
      <h3>${isWrong?'待巩固列表是空的':'还没有收藏任何卡片'}</h3>
      <p>${isWrong?'继续练习，答错的题会自动收进这里～':'练习时点击右上角 ☆ 就能收藏卡片'}</p>
      <button class="btn primary" data-go="practice">去练习</button></div>`;
    bindGo(); return;
  }
  el.innerHTML = ids.map(id => {
    const q = byId(id); if (!q) return '';
    const ansText = q.type === 'blank' ? q.blanks.map((b,i) => (q.accept?.[i]||[b])[0]).join('、')
      : q.type === 'judge' ? (q.answer === 'T' ? '正确' : '错误') : q.answer;
    return `<div class="ql-item">
      <div class="ql-top"><span class="q-type">${catName(q.cat)}</span><span class="q-tag"># ${q.id} · ${esc(q.tag||'')}</span></div>
      <div class="ql-stem">${esc(q.stem)}</div>
      <div class="ql-ans">正确答案：<b>${esc(ansText)}</b></div>
      <div class="ql-analysis"><b>解析：</b>${esc(q.analysis)}</div>
      <div class="ql-actions"><button data-remove="${q.id}">${isWrong?'✓ 已掌握，移出':'☆ 取消收藏'}</button></div>
    </div>`;
  }).join('');
  $$('[data-remove]', el).forEach(b => b.onclick = () => {
    const id = b.dataset.remove;
    if (isWrong) state.wrong = state.wrong.filter(x => x !== id);
    else state.star = state.star.filter(x => x !== id);
    saveState(); updateBadges();
    isWrong ? renderWrong() : renderStar();
    toast('已移除');
  });
  bindGo();
}
function renderWrong() { renderList('#wrongList', state.wrong, true); }
function renderStar() { renderList('#starList', state.star, false); }

/* ---------- 学习报告 ---------- */
function renderStats() {
  checkDaily();
  $('#streakNum').textContent = state.streak;
  const right = Object.values(state.stats).reduce((n,s) => n+s.right, 0);
  const s = [
    { ico:'📚', cls:'purple', num:ALL.length, label:'卡片总数' },
    { ico:'✅', cls:'green', num:masteredCount(), label:'已掌握' },
    { ico:'✍️', cls:'orange', num:totalAnswered(), label:'累计作答' },
    { ico:'🎯', cls:'blue', num:accuracy()+'%', label:'总正确率' }
  ];
  $('#statsGrid').innerHTML = s.map(x => `<div class="stat-card"><div class="stat-ico ${x.cls}">${x.ico}</div><div><div class="stat-num">${x.num}</div><div class="stat-label">${x.label}</div></div></div>`).join('');

  $('#catStats').innerHTML = CATS.map(c => {
    const qs = ALL.filter(q => q.cat === c.id);
    const done = qs.filter(q => state.stats[q.id] && (state.stats[q.id].right + state.stats[q.id].wrong) > 0).length;
    const rate = qs.length ? Math.round(done / qs.length * 100) : 0;
    return `<div class="cat-stat-row"><span class="cs-name">${c.name}</span><div class="cat-stat-bar"><div class="cat-stat-fill" style="width:${rate}%"></div></div><span class="cat-stat-rate">${done}/${qs.length}</span></div>`;
  }).join('');

  $('#historyList').innerHTML = state.history.length ? state.history.map(h => `
    <div class="history-item"><span>${ {order:'顺序练习',random:'随机练习',exam:'模拟测验'}[h.mode] || '练习' }</span>
      <span class="h-score">${Math.round(h.correct/h.total*100)} 分</span>
      <span>${h.correct}/${h.total} 题</span><span class="h-date">${esc(h.date)}</span></div>`).join('')
    : '<p style="font-size:12.5px;color:var(--text-3)">还没有练习记录，先去刷一套吧～</p>';
}

/* ---------- 事件初始化 ---------- */
function bindGo() {
  $$('[data-go]').forEach(b => b.onclick = () => b.dataset.go === 'practice' ? goPractice() : switchView(b.dataset.go));
}

function init() {
  $$('.nav-item').forEach(n => n.onclick = () => switchView(n.dataset.view));
  bindGo();

  $('#menuBtn').onclick = () => { $('#sidebar').classList.add('open'); $('#overlay').classList.add('show'); };
  $('#overlay').onclick = () => { $('#sidebar').classList.remove('open'); $('#overlay').classList.remove('show'); };

  // 主题
  const savedTheme = localStorage.getItem('java_quiz_theme') || 'light';
  document.documentElement.dataset.theme = savedTheme;
  $('#themeBtn').onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    localStorage.setItem('java_quiz_theme', t);
  };

  // 模式选择
  $$('.mode-card').forEach(el => el.onclick = () => {
    $$('.mode-card').forEach(x => x.classList.remove('selected'));
    el.classList.add('selected'); curMode = el.dataset.mode; updateCount();
  });
  $('#startBtn').onclick = startSession;
  $('#quitBtn').onclick = goPractice;
  $('#nextBtn').onclick = nextQuestion;
  $('#prevBtn').onclick = prevQuestion;
  $('#starBtn').onclick = () => {
    const id = session.list[session.idx].id;
    if (state.star.includes(id)) state.star = state.star.filter(x => x !== id);
    else state.star.push(id);
    saveState(); updateBadges(); renderQuestion();
    toast(state.star.includes(id) ? '已加入收藏' : '已取消收藏');
  };

  $('#clearWrong').onclick = () => {
    if (!state.wrong.length) return toast('待巩固列表是空的');
    if (confirm('确定清空错题本吗？')) { state.wrong = []; saveState(); updateBadges(); renderWrong(); toast('已清空'); }
  };
  $('#clearHistory').onclick = () => {
    if (confirm('确定清空练习记录吗？')) { state.history = []; saveState(); renderStats(); toast('已清空'); }
  };

  document.addEventListener('keydown', e => {
    if (!session || $('#quizArea').classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') nextQuestion();
    if (e.key === 'ArrowLeft') prevQuestion();
    if (['1','2','3','4'].includes(e.key)) {
      const q = session.list[session.idx];
      if (q.type !== 'blank' && !session.answers[q.id]) submitChoice(Object.keys(q.options || {T:1,F:2})[+e.key-1]);
    }
  });

  refreshRangeChips();
  renderHome();
}

document.addEventListener('DOMContentLoaded', init);
