/* global React, ScriptBox */
const { useState: useStateMsg } = React;

/* one message block: name + (channel tag) + one or more ScriptBoxes + note */
function MensagemBlock({ msg }) {
  const single = msg.variants.length === 1;
  return (
    <div className="msg-block">
      <div className="msg-name serif">
        {msg.name}
        {single && msg.variants[0].channel && (
          <span className="msg-chan">{msg.variants[0].channel}</span>
        )}
        {msg.tag && <span className="msg-chan">{msg.tag}</span>}
        {msg.critico && <span className="msg-chan crit">Corrigido</span>}
      </div>

      {msg.variants.map((v, i) => (
        <div key={i}>
          {!single && v.channel && <div className="msg-sub">{v.channel}</div>}
          <ScriptBox text={v.text} />
        </div>
      ))}

      {msg.ajuste && (
        <div className="msg-note">
          <span className="lab">Ajustes</span>
          <span>{msg.ajuste}</span>
        </div>
      )}
      {msg.decide && (
        <div className="msg-note decide">
          <span className="lab">Decisão de vocês</span>
          <span>{msg.decide}</span>
        </div>
      )}
    </div>
  );
}

function Mensagens() {
  const M = window.MENSAGENS;
  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Explorar</div>
      <h1 className="page-title">Mensagens padrão</h1>
      <p className="page-lead">{M.intro}</p>

      <div className="msg-padroes">
        {M.padroes.map((p, i) => (
          <span className="msg-padrao" key={i}>
            <span className="d" />
            {p.t} <b>{p.v}</b>
          </span>
        ))}
      </div>

      <p className="msg-legend">
        Tudo entre <span className="v">{"{ }"}</span> é variável: o sistema substitui
        automaticamente pelo dado do paciente.
      </p>

      {M.groups.map((g) => (
        <div key={g.id}>
          <div className="rule-mark"><span className="diamond" /></div>
          <div className="msg-group-head">
            <h2 className="serif">{g.label}</h2>
            <p>{g.sub}</p>
          </div>
          {g.messages.map((msg, i) => <MensagemBlock key={i} msg={msg} />)}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Mensagens, MensagemBlock });
