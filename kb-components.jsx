/* global React */
const { useState } = React;

/* ---------- pressed-bloom medallion ---------- */
function Gem({ className = "", style = {} }) {
  return <span className={"gem " + className} style={style} aria-hidden="true" />;
}

/* ---------- copy helper ---------- */
function CopyButton({ text, label = "Copiar mensagem" }) {
  const [done, setDone] = useState(false);
  function copy() {
    const t = text || "";
    const flash = () => { setDone(true); setTimeout(() => setDone(false), 1800); };
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); flash();
      } catch (e) {}
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(flash, fallback);
    else fallback();
  }
  return <button className="btn btn-wine" onClick={copy}>{done ? "✓ Copiado" : label}</button>;
}

/* ---------- treatment lookup ---------- */
function findTreatment(id) {
  if (!id) return null;
  return (window.KB.treatments || []).find((t) => t.id === id) || null;
}

/* ---------- accordion (progressive disclosure) ---------- */
function Accordion({ label, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={"acc" + (open ? " open" : "")}>
      <button className="acc-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{label}</span>
        <span className="acc-chev">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="acc-body">{children}</div>}
    </div>
  );
}

/* ---------- structured response: mensagem primeiro, calmo ---------- */
function ResponseView({ entry, isFav, onToggleFav, onAskMore }) {
  const r = entry.answer || {};
  const treat = findTreatment(r.tratamento);
  const fromAI = entry.source === "ia";
  const hasSecondary = (Array.isArray(r.passos) && r.passos.length) || r.objecao || treat;

  return (
    <div className="response">
      <div className="resp-head">
        <div className="resp-meta">
          <div className={"resp-source" + (fromAI ? " ai" : "")}>
            <span className="dot" />
            {fromAI ? "Orientação para este caso" : "Da base de conhecimento"}
          </div>
          <p className="resp-q serif">“{entry.question}”</p>
        </div>
        <button
          className={"fav-btn" + (isFav ? " on" : "")}
          onClick={onToggleFav}
          title={isFav ? "Remover dos salvos" : "Salvar"}
        >
          {isFav ? "✦" : "✧"}
        </button>
      </div>

      {r.leitura && <p className="resp-strategy">{r.leitura}</p>}

      {r.conducao && (
        <div className="block script">
          <div className="block-kicker">
            <span className="k-label">Mensagem para enviar</span>
          </div>
          <p className="quote">{r.conducao}</p>
          <div className="script-actions">
            <CopyButton text={r.conducao} />
            <span className="composer-hint" style={{ alignSelf: "center" }}>
              Ajuste [dia] e [hora] antes de enviar.
            </span>
          </div>
        </div>
      )}

      {hasSecondary && (
        <div className="acc-group">
          {Array.isArray(r.passos) && r.passos.length > 0 && (
            <Accordion label="Próximos passos">
              <ul className="steps">
                {r.passos.map((p, i) => (
                  <li key={i}><span className="n serif">{i + 1}</span><span>{p}</span></li>
                ))}
              </ul>
            </Accordion>
          )}
          {r.objecao && (
            <Accordion label="Se houver objeção">
              <p>{r.objecao}</p>
            </Accordion>
          )}
          {treat && (
            <Accordion label="Tratamento a oferecer">
              <div className="treat">
                <span className="tgem" aria-hidden="true" />
                <div>
                  <h4>{treat.name}</h4>
                  <div className="promise serif">{treat.promise}</div>
                  <div className="meta">
                    <span>{treat.faixa}</span>
                    <span>{treat.duracao}</span>
                  </div>
                </div>
              </div>
            </Accordion>
          )}
        </div>
      )}

      <div className="resp-foot">
        <button className="btn btn-ghost" onClick={onAskMore}>Nova pergunta</button>
      </div>
    </div>
  );
}

/* ---------- thinking ---------- */
function Thinking({ label = "Refletindo sobre o melhor caminho…" }) {
  return (
    <div className="thinking">
      <span className="pulse-gem" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

Object.assign(window, { Gem, CopyButton, ResponseView, Thinking, findTreatment });
