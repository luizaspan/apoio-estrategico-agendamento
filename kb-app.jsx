/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, TweakButton, Gem, ResponseView, Thinking, findTreatment */
const { useState, useEffect, useRef, useCallback } = React;
const KB = window.KB;

/* ============================================================
   persistence helpers
   ============================================================ */
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/* ============================================================
   curated matching
   ============================================================ */
function matchScenario(text) {
  const q = (text || "").toLowerCase();
  let best = null, bestScore = 0;
  for (const s of KB.scenarios) {
    let score = 0;
    for (const t of s.tags) { if (q.includes(t)) score += t.length > 6 ? 2 : 1; }
    if (score > bestScore) { bestScore = score; best = s; }
  }
  return bestScore >= 1 ? best : null;
}
function scenarioToAnswer(s) {
  return { leitura: s.leitura, conducao: s.conducao, passos: s.passos, objecao: s.objecao, tratamento: s.tratamento };
}

/* ============================================================
   IA para casos novos
   ============================================================ */
function extractJSON(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a === -1 || b === -1) return null;
  try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { return null; }
}

const TREAT_IDS = KB.treatments.map((t) => t.id).join(", ");

async function askAI(question) {
  const prompt = `Você é o "Apoio Estratégico de Agendamento" da Clínica Fernanda Cristófoli, em Florianópolis (bairro Estreito), especializada em harmonização facial, sempre em particular. A Dra. Fernanda preza pela NATURALIDADE: o resultado é sempre pensado para cada rosto, revelando a melhor versão da pessoa. O objetivo de toda conversa é converter o contato em uma AVALIAÇÃO agendada, com tom acolhedor, elegante e sem pressão. Quem entra no consultório fecha, então a avaliação é a venda real, não o procedimento.

Use o método de quatro etapas em toda conversa:
1. Acolher: ler o lead, usar o nome certo, responder rápido.
2. Conectar: abrir espaço com pergunta sobre desejo, nunca sobre defeito.
3. Ancorar: construir valor com o processo da Dra. antes do número.
4. Convidar: propor a avaliação com uma escolha simples (manhã ou tarde).

Princípio central: a objeção de preço quase sempre é sintoma de conexão que não foi construída antes do número aparecer.

Regras de ouro (NUNCA quebrar):
- Nunca nomeie o problema da pessoa (rugas, flacidez, papada) antes que ela mesma traga. Pergunte "o que você está pensando em cuidar", não "o que te incomoda".
- Dê sempre o valor cheio. Nunca apresente o preço já parcelado e nunca ofereça parcelamento sem ser perguntada.
- Um procedimento por vez, nunca a tabela toda. Se a pessoa cita vários, indique um ponto de partida.
- Nunca proponha videochamada de surpresa, nunca apague mensagens, nunca repita no follow-up a mesma pergunta que não foi respondida.
- Não cite marcas de laboratório para se defender do preço.

Preços reais (não invente outros): botox a partir de R$ 1.350 no terço superior; preenchimento labial a partir de R$ 1.500; bioestimulador a partir de R$ 2.200. Parcelamento em até 5x sem juros no cartão, mencionado apenas se perguntarem.

A atendente comercial descreveu esta situação:
"""${question}"""

Responda APENAS com um objeto JSON válido (sem texto antes ou depois), neste formato exato:
{
  "leitura": "leitura da situação em 2 ou 3 frases: o que está por trás do que a pessoa disse e qual etapa do método aplicar agora",
  "conducao": "mensagem pronta para a atendente copiar e enviar no WhatsApp, no tom da marca, calorosa e natural, com no máximo 1 emoji sutil; use [nome], [seu nome], [dia] e [hora] como espaços reservados quando fizer sentido",
  "passos": ["3 a 4 próximos passos curtos e acionáveis"],
  "objecao": "como contornar a principal objeção provável, ou o que evitar nesta situação",
  "tratamento": "um destes ids ou null: ${TREAT_IDS}"
}
Escreva em português do Brasil. Nunca use travessões (o caractere —); prefira vírgula, dois-pontos ou ponto. Escreva como uma consultora humana experiente, sem jargão técnico ou de inteligência artificial.`;

  const raw = await window.claude.complete({ messages: [{ role: "user", content: prompt }] });
  const parsed = extractJSON(raw);
  if (!parsed) throw new Error("parse");
  if (!Array.isArray(parsed.passos)) parsed.passos = parsed.passos ? [String(parsed.passos)] : [];
  return parsed;
}

/* ============================================================
   NAV
   ============================================================ */
const NAV = [
  { id: "consulta", label: "Consulta", group: "Atender" },
  { id: "mapa", label: "Mapa do atendimento", group: "Atender" },
  { id: "guia", label: "Guia", group: "Explorar" },
  { id: "mensagens", label: "Mensagens", group: "Explorar" },
  { id: "salvos", label: "Salvos", group: "Explorar" },
];

function Sidebar({ mode, setMode, counts }) {
  const groups = [...new Set(NAV.map((n) => n.group))];
  return (
    <aside className="sidebar">
      <div className="brand">
        <Gem />
        <div>
          <div className="brand-name serif">Apoio<br />Estratégico</div>
          <div className="brand-sub">de agendamento</div>
        </div>
      </div>
      <nav className="nav">
        {groups.map((g) => (
          <React.Fragment key={g}>
            <div className="label nav-eyebrow">{g}</div>
            {NAV.filter((n) => n.group === g).map((n) => (
              <button
                key={n.id}
                className={"nav-item" + (mode === n.id ? " active" : "")}
                onClick={() => setMode(n.id)}
              >
                <span className="nav-dot" />
                {n.label}
                {counts[n.id] != null && <span className="count">{counts[n.id]}</span>}
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="foot-clinic serif">{KB.clinic.name}</div>
        <div className="foot-wpp">{KB.clinic.whatsapp}</div>
      </div>
    </aside>
  );
}

function TabBar({ mode, setMode }) {
  const tabs = [
    { id: "consulta", label: "Consulta" },
    { id: "mapa", label: "Mapa" },
    { id: "guia", label: "Guia" },
    { id: "mensagens", label: "Mensagens" },
    { id: "salvos", label: "Salvos" },
  ];
  return (
    <div className="tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={"tab" + (mode === t.id ? " active" : "")} onClick={() => setMode(t.id)}>
          <span className="tdot" />
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   CONSULTA
   ============================================================ */
function Consulta({ onSaveHistory, favorites, toggleFav, seed, clearSeed }) {
  const [draft, setDraft] = useState("");
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const taRef = useRef(null);

  const run = useCallback(async (text) => {
    const question = (text || "").trim();
    if (!question || loading) return;
    setError(null); setEntry(null); setLoading(true);
    const matched = matchScenario(question);
    try {
      let answer, source;
      if (matched) {
        answer = scenarioToAnswer(matched); source = "curado";
        await new Promise((r) => setTimeout(r, 480));
      } else {
        answer = await askAI(question); source = "ia";
      }
      const e = { id: uid(), question, answer, source, ts: Date.now() };
      setEntry(e); onSaveHistory(e);
    } catch (err) {
      setError("Não consegui gerar a resposta agora. Tente novamente em instantes.");
    } finally { setLoading(false); }
  }, [loading, onSaveHistory]);

  // seed from history/favorites re-open or starter
  useEffect(() => {
    if (seed) {
      if (seed.entry) { setEntry(seed.entry); setDraft(""); }
      else if (seed.text) { setDraft(seed.text); run(seed.text); }
      clearSeed();
    }
  }, [seed]);

  function submit(e) { e && e.preventDefault(); run(draft); }
  function reset() { setEntry(null); setDraft(""); setError(null); if (taRef.current) taRef.current.focus(); }

  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Consulta</div>
      <h1 className="page-title">Descreva a situação.<br />Receba o caminho.</h1>
      <p className="page-lead">
        Conte o que a cliente disse. Você recebe a leitura da situação e a mensagem pronta para enviar.
      </p>

      {!entry && !loading && (
        <>
          <form className="composer" onSubmit={submit}>
            <div className="composer-shell">
              <textarea
                ref={taRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ex.: A cliente perguntou o preço da harmonização e disse que ia pensar…"
                onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e); }}
              />
              <div className="composer-bar">
                <span className="composer-hint">⌘ / Ctrl + Enter para enviar</span>
                <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
                  Consultar <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </form>

          <div className="eyebrow chips-eyebrow">Situações frequentes</div>
          <div className="chips">
            {KB.starters.map((s, i) => (
              <button key={i} className="chip" onClick={() => { setDraft(s); run(s); }}>{s}</button>
            ))}
          </div>
        </>
      )}

      {loading && <Thinking label={matchScenario(draft) ? "Buscando o protocolo certo…" : "Refletindo sobre o melhor caminho…"} />}

      {error && (
        <div className="block" style={{ borderColor: "var(--gold-line)" }}>
          <p style={{ color: "var(--wine)" }}>{error}</p>
          <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={() => run(draft)}>Tentar de novo</button>
        </div>
      )}

      {entry && !loading && (
        <ResponseView
          entry={entry}
          isFav={favorites.some((f) => f.id === entry.id)}
          onToggleFav={() => toggleFav(entry)}
          onAskMore={reset}
        />
      )}
    </div>
  );
}

/* ============================================================
   GUIA DE ESTUDO
   ============================================================ */
function Guia({ openScenario }) {
  const [topic, setTopic] = useState(null);
  if (topic) {
    const scns = topic.scenarios.map((id) => KB.scenarios.find((s) => s.id === id)).filter(Boolean);
    return (
      <div className="canvas-inner">
        <button className="back-link" onClick={() => setTopic(null)}>← Guia de estudo</button>
        <div className="eyebrow page-eyebrow">Tema</div>
        <h1 className="page-title">{topic.label}</h1>
        <p className="page-lead">{topic.desc}</p>
        <div className="scn-list">
          {scns.map((s) => (
            <div key={s.id} className="scn-row card" onClick={() => openScenario(s)}>
              <span className="scn-d" />
              <h4 className="serif">{s.title}</h4>
              <span className="go">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Guia de estudo</div>
      <h1 className="page-title">Navegue pelos<br />fundamentos.</h1>
      <p className="page-lead">
        Estude no seu ritmo. Cada tema reúne os cenários mais comuns do atendimento, com a leitura estratégica
        e o roteiro pronto. Abra um cenário para ver a resposta completa.
      </p>
      <div className="grid">
        {KB.topics.map((t) => (
          <div key={t.id} className="topic-card card arch" onClick={() => setTopic(t)}>
            <h3 className="serif">{t.label}</h3>
            <p>{t.desc}</p>
            <div className="label tcount">{t.scenarios.length} cenários ·</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   HISTÓRICO & FAVORITOS
   ============================================================ */
function timeAgo(ts) {
  const d = Date.now() - ts, m = Math.floor(d / 60000), h = Math.floor(m / 60), day = Math.floor(h / 24);
  if (m < 1) return "agora";
  if (m < 60) return m + " min";
  if (h < 24) return h + "h";
  if (day < 7) return day + "d";
  return new Date(ts).toLocaleDateString("pt-BR");
}
function tagFor(entry) {
  const t = findTreatment(entry.answer && entry.answer.tratamento);
  return t ? t.name : (entry.source === "ia" ? "Caso novo" : "Cenário");
}

function SalvosView({ history, favorites, openEntry }) {
  const [filter, setFilter] = useState("tudo");
  const items = filter === "favoritos" ? favorites : history;
  const emptyMsg = filter === "favoritos"
    ? "Marque uma resposta com ✧ para guardá-la aqui."
    : "Suas consultas aparecerão aqui.";
  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Meu acervo</div>
      <h1 className="page-title">Salvos</h1>
      <p className="page-lead">
        Suas consultas ficam guardadas aqui. Marque com ✦ as abordagens que quer ter sempre à mão.
      </p>
      <div className="seg">
        <button className={filter === "tudo" ? "on" : ""} onClick={() => setFilter("tudo")}>
          Tudo <span>{history.length}</span>
        </button>
        <button className={filter === "favoritos" ? "on" : ""} onClick={() => setFilter("favoritos")}>
          Favoritos <span>{favorites.length}</span>
        </button>
      </div>
      {items.length === 0 ? (
        <div className="empty">
          <div className="egem" />
          <p>{emptyMsg}</p>
        </div>
      ) : (
        <div className="scn-list" style={{ marginTop: 22 }}>
          {items.map((e) => (
            <div key={e.id} className="hist-item card" onClick={() => openEntry(e)}>
              <div className="hq serif">“{e.question}”</div>
              <div className="hmeta">
                <span className="tag">{tagFor(e)}</span>
                <span>·</span>
                <span>{timeAgo(e.ts)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flor": "#C58D88",
  "fechado": "#5A2E38",
  "corners": "suaves",
  "grain": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [mode, setMode] = useState("consulta");
  const [history, setHistory] = useState(() => load("kb_history", []));
  const [favorites, setFavorites] = useState(() => load("kb_favorites", []));
  const [seed, setSeed] = useState(null);

  useEffect(() => { save("kb_history", history); }, [history]);
  useEffect(() => { save("kb_favorites", favorites); }, [favorites]);

  // apply tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement.style;
    const flor = t.flor || "#C58D88";
    root.setProperty("--crystal", flor);
    root.setProperty("--crystal-deep", shade(flor, -0.22));
    root.setProperty("--crystal-soft", shade(flor, 0.5));
    const fechado = t.fechado || "#5A2E38";
    root.setProperty("--wine", fechado);
    root.setProperty("--wine-2", shade(fechado, 0.12));
    root.setProperty("--arch", t.corners === "clássicos" ? "26px" : "130px");
    const grainEl = document.body;
    grainEl.style.setProperty("--_grain", t.grain ? "0.5" : "0");
  }, [t]);
  // grain toggle via body::before opacity
  useEffect(() => {
    let el = document.getElementById("__grain_style");
    if (!el) { el = document.createElement("style"); el.id = "__grain_style"; document.head.appendChild(el); }
    el.textContent = `body::before{opacity:${t.grain ? .5 : 0}!important}`;
  }, [t.grain]);

  function addHistory(e) {
    setHistory((h) => [e, ...h.filter((x) => x.question !== e.question)].slice(0, 50));
  }
  function toggleFav(entry) {
    setFavorites((f) => f.some((x) => x.id === entry.id) ? f.filter((x) => x.id !== entry.id) : [entry, ...f]);
  }
  function openEntry(entry) { setSeed({ entry }); setMode("consulta"); }
  function openScenario(s) {
    const e = { id: uid(), question: s.title, answer: scenarioToAnswer(s), source: "curado", ts: Date.now() };
    addHistory(e); setSeed({ entry: e }); setMode("consulta");
  }

  const counts = { salvos: history.length };

  return (
    <div className="app">
      <Sidebar mode={mode} setMode={setMode} counts={counts} />
      <main className="main">
        <div className="canvas">
          {mode === "consulta" && (
            <Consulta
              onSaveHistory={addHistory}
              favorites={favorites}
              toggleFav={toggleFav}
              seed={seed}
              clearSeed={() => setSeed(null)}
            />
          )}

          {mode === "mapa" && <Mapa />}
          {mode === "guia" && <Guia openScenario={openScenario} />}
          {mode === "mensagens" && <Mensagens />}
          {mode === "salvos" && (
            <SalvosView history={history} favorites={favorites} openEntry={openEntry} />
          )}
        </div>
      </main>
      <TabBar mode={mode} setMode={setMode} />

      <TweaksPanel>
        <TweakSection label="Cor & atmosfera" />
        <TweakColor label="Flor" value={t.flor}
          options={["#C58D88", "#B07C8E", "#94A085", "#C8A06A"]}
          onChange={(v) => setTweak("flor", v)} />
        <TweakColor label="Tom fechado" value={t.fechado}
          options={["#5A2E38", "#46303A", "#4A3A2C", "#3A3340"]}
          onChange={(v) => setTweak("fechado", v)} />
        <TweakSection label="Formas" />
        <TweakRadio label="Cantos dos cartões" value={t.corners}
          options={["suaves", "clássicos"]}
          onChange={(v) => setTweak("corners", v)} />
        <TweakToggle label="Textura de papel" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />
      </TweaksPanel>
    </div>
  );
}

/* tint/shade a hex color toward white (amt>0) or black (amt<0) */
function shade(hex, amt) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!m) return hex;
  let [r, g, b] = [1, 2, 3].map((i) => parseInt(m[i], 16));
  const f = (c) => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  const h = (c) => f(c).toString(16).padStart(2, "0");
  return "#" + h(r) + h(g) + h(b);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
