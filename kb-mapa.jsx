/* global React */
const { useState, useRef, useEffect } = React;

/* ---------- editable, copyable script ---------- */
function ScriptBox({ text }) {
  const [val, setVal] = useState(text);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  function grow() {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
  useEffect(() => { grow(); }, [val]);

  function copy() {
    const t = val || "";
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

  return (
    <div className="scriptbox">
      <div className="scriptbox-label">
        <span className="k-label">Mensagem pronta</span>
        <span className="scriptbox-hint">edite o que precisar antes de copiar</span>
      </div>
      <textarea
        ref={ref}
        className="scriptbox-ta serif"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div className="scriptbox-actions">
        <button className="btn btn-wine" onClick={copy}>{done ? "✓ Copiado" : "Copiar mensagem"}</button>
        {val !== text && (
          <button className="btn btn-ghost" onClick={() => setVal(text)}>Restaurar original</button>
        )}
      </div>
    </div>
  );
}

/* ---------- one leaf item ---------- */
function MapaItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"mitem" + (open ? " open" : "")}>
      <button className="mitem-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="mitem-tick" />
        <span className="mitem-label">{item.label}</span>
        <span className="mitem-chev">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mitem-body">
          <p className="mitem-exp">{item.explanation}</p>
          <ScriptBox text={item.script} />
        </div>
      )}
    </div>
  );
}

/* ---------- one stage (branch) ---------- */
function Stage({ stage, open, onToggle }) {
  return (
    <div className={"stage" + (open ? " open" : "")}>
      <button className="stage-node" onClick={onToggle} aria-expanded={open}>
        <span className="stage-num serif">{stage.n}</span>
        <span className="stage-title serif">{stage.title}</span>
        <span className="stage-chev">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="stage-body">
          <p className="stage-resumo">{stage.resumo}</p>
          {stage.groups
            ? stage.groups.map((g) => (
                <div className="mgroup" key={g.label}>
                  <div className="mgroup-label">{g.label}</div>
                  {g.items.map((it, i) => <MapaItem key={i} item={it} />)}
                </div>
              ))
            : stage.items.map((it, i) => <MapaItem key={i} item={it} />)}
        </div>
      )}
    </div>
  );
}

/* ---------- the map screen ---------- */
function Mapa() {
  const M = window.MAPA;
  const [openId, setOpenId] = useState(M.stages[0].id);
  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Atender</div>
      <h1 className="page-title">Mapa do atendimento</h1>
      <p className="page-lead">{M.intro}</p>

      <div className="mapa-root"><span className="mapa-root-dot" />{M.root}</div>

      <div className="mapa-spine">
        {M.stages.map((s) => (
          <Stage
            key={s.id}
            stage={s}
            open={openId === s.id}
            onToggle={() => setOpenId(openId === s.id ? null : s.id)}
          />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Mapa, MapaItem, Stage, ScriptBox });
