/* global React */
const { useState, useRef, useEffect } = React;

const SIM_PERSONAS = [
  {
    id: "mayara",
    name: "Mayara",
    perfil: "Procedimento específico · preenchimento labial",
    humor: "Veio no impulso, sem vocabulário técnico",
    objetivo: "Ancorar o valor com contexto e convidar para a avaliação. Sem termos técnicos como contorno ou volume.",
    abertura: "Oii quanto está o preenchimento labial?",
    turns: [
      {
        clienteGood: "Nossa que lindo saber! Como funciona essa avaliação? Posso ir essa semana?",
        clienteBad: "Hm, vi em outra clínica por R$ 1.200. Precisa mesmo fazer avaliação?",
        coachGood: "Você ancorô o valor no processo da Dra. antes do número. A Mayara aqueceu.",
        coachBad: "Dar o preço sem contexto vira comparação. Faltou conectar o valor ao diferencial antes do número.",
        detectGood: ["avaliação","avalia","processo","dra","diferente","natural","personaliz","antes de aplicar","antes de qualquer","como ela trabalha"],
        detectBad: ["parcelar","parcelado","parcelas","contorno","volume","tabela","outros procedimentos","preço especial"],
      },
      {
        clienteGood: "Ah, faz sentido! Tenho disponibilidade na quinta de manhã. Como agendo?",
        clienteBad: "Hmm, mas você não me disse o preço ainda, não quero gastar viagem.",
        coachGood: "Você usou a escolha simples (manhã ou tarde) e ela aceitou. Muito bem.",
        coachBad: "A escolha simples ainda não veio. Quando a cliente pergunta o preço de novo, é sinal que faltou o convite com opção.",
        detectGood: ["manhã","tarde","preferir","prefere","semana","horário","como agend","quinta","sexta","quando","agendar"],
        detectBad: ["parcelamento","mais barato","desconto","planeja","talvez","quando tiver"],
      },
      {
        clienteGood: "Perfeito! Me manda o endereço?",
        clienteBad: "Ok, mas ainda não sei se vou conseguir. Vou pensar e te falo.",
        coachGood: "Excelente condução! Ela pediu o endereço — conversa convertida.",
        coachBad: "Ela saiu com 'vou pensar'. Quando isso acontece, pergunte com leveza: foi uma questão de momento ou ficou alguma dúvida?",
        detectGood: ["endereço","confirmar","confirmado","anota","anotei","perfeito","combinado","até"],
        detectBad: [],
        finaliza: true,
      },
    ],
    errosComuns: [
      "Apresentar o preço parcelado sem ser perguntada",
      "Usar termos técnicos: contorno, volume, ácido",
      "Dar a tabela de procedimentos sem ser pedida",
      "Não convidar para a avaliação com uma escolha simples",
    ],
  },
  {
    id: "melissa",
    name: "Melissa",
    perfil: "Lead com história · pós-emagrecimento",
    humor: "Quer ser vista antes de ser atendida",
    objetivo: "Acolher a jornada antes de qualquer pergunta clínica. Um procedimento de entrada, nunca a tabela.",
    abertura: "Tive um emagrecimento muito grande e senti que meu rosto mudou, está com aspecto de derretimento. Queria saber o investimento para bioestimulador, botox e ácido hialurônico.",
    turns: [
      {
        clienteGood: "Exatamente isso. É difícil olhar no espelho e não me reconhecer, sabe? Já fiz botox uma vez, mas foi tudo muito impreciso.",
        clienteBad: "Hm, mas quanto custa cada um? Preciso calcular antes de qualquer coisa.",
        coachGood: "Você reconheceu a jornada antes de qualquer informação clínica. Ela se abriu.",
        coachBad: "Ela veio com uma história pesada e você foi direto para procedimento ou preço. Primeiro: reconheça a jornada.",
        detectGood: ["imagino","jornada","entendo","parabéns","mudança","se reconhece","me conta","experiência anterior","fez antes"],
        detectBad: ["bioestimulador custa","botox custa","ácido custa","valor de cada","preço de cada","tabela","parcela","quanto fica tudo"],
      },
      {
        clienteGood: "Nossa, gostei muito dessa abordagem. Quando posso agendar a avaliação?",
        clienteBad: "Mas se eu fizer tudo isso vai passar de R$ 5.000, não é? Não sei se tenho isso agora.",
        coachGood: "Você apresentou o bioestimulador como ponto de entrada, sem somar tudo. Ela não recuou.",
        coachBad: "Quando ela somou tudo e recuou, era hora de apresentar só um procedimento de entrada e dizer que o resto a Dra. avalia depois.",
        detectGood: ["bioestimulador","ponto de partida","entrada","a dra avalia","avaliação","não soma","um por vez"],
        detectBad: ["tudo junto","R$ 5","R$ 6","R$ 7","R$ 8","total","soma"],
      },
      {
        clienteGood: "Combinado! Manda o endereço e o horário disponível.",
        clienteBad: "Vou pensar, porque envolve investimento alto. Posso te chamar depois?",
        coachGood: "Conversa convertida. Você conduziu com empatia e uma entrada clara.",
        coachBad: "Ela saiu com 'vou pensar'. Não encerre. Pergunte: foi momento ou ficou alguma dúvida?",
        detectGood: ["avaliação","semana","horário","manhã","tarde","agendar","quando","combinar"],
        detectBad: [],
        finaliza: true,
      },
    ],
    errosComuns: [
      "Ir direto ao preço sem acolher a jornada",
      "Somar todos os procedimentos (passa de R$ 5.000 e ela recua)",
      "Fazer perguntas clínicas antes de criar conexão",
      "Não apresentar um procedimento de entrada claro",
    ],
  },
  {
    id: "karolina",
    name: "Karolina",
    perfil: "Pesquisando botox para a mãe",
    humor: "Objetiva, pergunta o preço direto",
    objetivo: "Descobrir que é para a mãe, valorizar o cuidado, ancorar o preço cheio sem parcelar.",
    abertura: "Bom dia! Qual o valor da consulta para botox?",
    turns: [
      {
        clienteGood: "Ah, que legal! Sim, é para minha mãe, ela nunca fez antes. Que diferencial bonito esse de avaliar antes.",
        clienteBad: "Mas é uma consulta paga? Não é o tratamento, só uma avaliação?",
        coachGood: "Você ancorô o valor e abriu espaço para ela contar que é para outra pessoa. Ótimo.",
        coachBad: "Você não perguntou para quem é — e isso importa muito. Tente: 'é para você ou para alguém especial?'",
        detectGood: ["para quem","para você","alguém especial","presente","avaliação","processo","dra avalia","antes de aplicar"],
        detectBad: ["parcelas","parcelado","consulta cobrada","R$ 1.350 em","desconto","promoção"],
      },
      {
        clienteGood: "Que carinho perguntar isso! Ela teve uma experiência ruim antes, ficou artificial. Quero que ela confie nessa dra.",
        clienteBad: "Quanto fica parcelado? Ela está com orçamento limitado.",
        coachGood: "Você valorizou o gesto e perguntou sobre a experiência anterior da mãe. Muito bem.",
        coachBad: "Quando falou de parcelamento, a resposta correta é simples: 'Parcelamos em até 5x sem juros'. Nunca ofereça antes de ser perguntada.",
        detectGood: ["que carinhosa","que cuidado","que gesto","experiência dela","ela fez antes","me conta mais","já fez","ficou satisfeita"],
        detectBad: ["R$ 270 por mês","R$ 225","parcelamos em","parcela em","pode parcelar"],
      },
      {
        clienteGood: "Adorei! Vou passar o contato da minha mãe para vocês. Quando vocês têm horário?",
        clienteBad: "Vou falar com ela e a gente vê. Obrigada pelas informações!",
        coachGood: "Converteu. Ela vai passar o contato da mãe — exatamente o que você queria.",
        coachBad: "'Obrigada pelas informações' é saída. Convide a mãe diretamente: 'ela pode falar com a gente ou você prefere que a gente entre em contato?'",
        detectGood: ["avaliação","horário","semana","manhã","tarde","sua mãe pode","ela pode vir","como ela entra","agendar"],
        detectBad: [],
        finaliza: true,
      },
    ],
    errosComuns: [
      "Não descobrir que é para a mãe cedo",
      "Oferecer parcelamento sem ser perguntada",
      "Não valorizar o gesto de quem pesquisa por carinho",
      "Não convidar a mãe para a avaliação diretamente",
    ],
  },
  {
    id: "anne",
    name: "Anne",
    perfil: "Lead genérico · veio de anúncio",
    humor: "Mandou mensagem no impulso, some fácil",
    objetivo: "Acolher e abrir espaço com uma pergunta leve sobre desejo. Nunca pergunte o que incomoda no rosto.",
    abertura: "Olá! Tenho interesse e gostaria de mais informações.",
    turns: [
      {
        clienteGood: "Que ótimo! Estava pensando em cuidar um pouco mais do rosto. Ainda não sei exatamente o quê.",
        clienteBad: "Hm, na verdade só estava curiosa mesmo. Obrigada!",
        coachGood: "Você abriu com pergunta sobre desejo, usou o nome e respondeu com leveza. Ela ficou.",
        coachBad: "Perguntar 'o que te incomoda?' ou ir direto para procedimento fecha a conversa. A pergunta certa é sobre desejo: 'o que você está pensando em cuidar?'",
        detectGood: ["o que você","o que te","pensando em cuidar","desejo","o que chamou","me conta","oi anne","olá anne","ficou feliz","prazer"],
        detectBad: ["o que te incomoda","o que te preocupa","tabela","procedimentos","botox","preenchimento","R$","preço"],
      },
      {
        clienteGood: "Nossa, adorei a forma que você falou! Me conta mais sobre essa avaliação.",
        clienteBad: "Entendi, mas posso ver os preços antes? Quero ter uma ideia.",
        coachGood: "Ela pediu mais sobre a avaliação. Você abriu espaço para conexão sem forçar procedimento.",
        coachBad: "Quando ela pede preço antes de qualquer conexão, ancore com o processo da Dra. e dê um valor — nunca a tabela toda.",
        detectGood: ["avaliação","dra fernanda","natural","resultado","avalia antes","processo","personaliz","me conta"],
        detectBad: ["tabela","todos os procedimentos","lista","opções são","oferecemos"],
      },
      {
        clienteGood: "Que bacana! Vou adorar. Pode me mandar quando tiver horário disponível?",
        clienteBad: "Legal, vou pensar. Se eu decidir te aviso.",
        coachGood: "Lead convertido. Você a conquistou sem empurrar nada.",
        coachBad: "'Vou te avisar' é sumida. Peça permissão: 'Que tal eu te chamar assim que abrir a agenda?'",
        detectGood: ["manhã","tarde","semana","horário","quando tiver","agendar","combinado"],
        detectBad: [],
        finaliza: true,
      },
    ],
    errosComuns: [
      "Perguntar o que incomoda no rosto",
      "Ir direto para a tabela de procedimentos",
      "Não usar o nome da pessoa",
      "Não pedir permissão para retomar o contato quando ela sai sem agendar",
    ],
  },
  {
    id: "cirineu",
    name: "Cirineu",
    perfil: "Fora do perfil · procura convênio",
    humor: "Não conhece a clínica",
    objetivo: "Encerrar com gentileza em uma única mensagem, deixar a porta aberta. Não ativar o script de qualificação.",
    abertura: "Boa tarde. Vocês atendem pelo plano SC Saúde?",
    turns: [
      {
        clienteGood: "Ah entendi, obrigado pela atenção! Se um dia eu quiser fazer algo estético, lembro de vocês.",
        clienteBad: "Ah, mas vocês têm alguma opção mais em conta? Queria cuidar de algo no rosto.",
        coachGood: "Perfeito. Uma mensagem, gentileza e porta aberta. Sem qualificação, sem desgaste.",
        coachBad: "Você tentou converter quem é fora do perfil. Uma mensagem gentil de encerramento basta.",
        detectGood: ["não atendemos","particular","harmonização","se um dia","à disposição","não atende convênio"],
        detectBad: ["mas posso","podemos oferecer","tem como","mas existe","opção mais","desconto","procedimento mais simples"],
        finaliza: true,
      },
    ],
    errosComuns: [
      "Tentar converter quem é fora do perfil",
      "Ativar o script de qualificação",
      "Mandar mais de uma mensagem de encerramento",
      "Não deixar a porta aberta com leveza",
    ],
  },
];

function ScoreBar({ score }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:16 }}>
      <span className="label" style={{ whiteSpace:"nowrap" }}>Condução</span>
      <div style={{ flex:1, height:5, background:"var(--line)", borderRadius:999, overflow:"hidden" }}>
        <div style={{ height:"100%", width:score+"%", borderRadius:999,
          background:"linear-gradient(90deg,var(--crystal),var(--gold))", transition:"width .6s ease" }} />
      </div>
      <span style={{ fontFamily:"var(--serif)", fontSize:17, color:"var(--gold)", fontWeight:600, width:36, textAlign:"right" }}>
        {score}
      </span>
    </div>
  );
}

function SimChat({ persona, onBack }) {
  const [chat, setChat] = useState([{ who:"client", text: persona.abertura }]);
  const [draft, setDraft] = useState("");
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(50);
  const [erros, setErros] = useState([]);
  const [ended, setEnded] = useState(false);
  const [won, setWon] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chat]);

  function send() {
    if (ended || !draft.trim()) return;
    const text = draft.trim();
    setDraft("");
    const newChat = [...chat, { who:"me", text }];
    setChat(newChat);

    const t = persona.turns[turn];
    const lower = text.toLowerCase();
    const isGood = t.detectGood.some(kw => lower.includes(kw));
    const isBad  = t.detectBad.some(kw => lower.includes(kw));

    let outcome = "neutral";
    let nextScore = score;
    if (isGood && !isBad) { outcome = "good"; nextScore = Math.min(100, score + 18); }
    else if (isBad)       { outcome = "bad";  nextScore = Math.max(0, score - 22); }
    else                  {                   nextScore = Math.max(0, score - 6); }

    setScore(nextScore);
    if (outcome === "bad") setErros(e => [...e, t.coachBad]);

    setTimeout(() => {
      const clienteText = outcome === "good" ? t.clienteGood : t.clienteBad;
      const coachText   = outcome === "good" ? t.coachGood   : t.coachBad;
      setChat(c => [...c,
        { who:"client", text: clienteText },
        { who:"coach",  text: coachText, good: outcome === "good" },
      ]);

      const nextTurn = turn + 1;
      if (t.finaliza || nextTurn >= persona.turns.length) {
        setEnded(true);
        setWon(nextScore >= 60);
      } else {
        setTurn(nextTurn);
      }
    }, 700);
  }

  function restart() {
    setChat([{ who:"client", text: persona.abertura }]);
    setDraft(""); setTurn(0); setScore(50);
    setErros([]); setEnded(false); setWon(false);
  }

  return (
    <div className="canvas-inner">
      <button className="back-link" onClick={onBack}>← Escolher outra persona</button>

      <div className="eyebrow page-eyebrow">Simulação · {persona.perfil}</div>
      <h1 className="page-title" style={{ fontSize:34 }}>{persona.name}</h1>
      <p className="page-lead" style={{ marginTop:8, fontStyle:"italic" }}>"{persona.humor}"</p>

      <div style={{ display:"inline-flex", alignItems:"center", gap:9, background:"var(--gold-soft)",
        border:"1px solid var(--gold-line)", borderRadius:999, padding:"8px 16px 8px 12px",
        fontSize:13, color:"var(--ink-2)", marginTop:12, lineHeight:1.45 }}>
        <strong style={{ color:"var(--ink)", fontWeight:500 }}>Objetivo:</strong>&nbsp;{persona.objetivo}
      </div>

      <ScoreBar score={score} />

      <div className="rule-mark" style={{ marginTop:28 }}><span className="diamond" /></div>

      {/* chat */}
      <div className="chat" style={{ marginTop:0 }}>
        {chat.map((m, i) => {
          if (m.who === "coach") return (
            <div key={i} className="coach" style={m.good
              ? { background:"var(--gold-soft)", borderColor:"var(--gold-line)" }
              : { background:"rgba(90,46,56,.07)", borderColor:"rgba(90,46,56,.22)" }}>
              <b style={m.good ? {} : { color:"var(--wine)" }}>Coach</b>{m.text}
            </div>
          );
          return (
            <div key={i} className={"bubble " + m.who}>
              <div className="who">{m.who === "client" ? persona.name : "Você"}</div>
              {m.text}
            </div>
          );
        })}

        {ended && (
          <div className="block" style={{ marginTop:18, borderColor:"var(--gold-line)" }}>
            <div style={{ fontFamily:"var(--serif)", fontSize:28, fontWeight:600,
              color: won ? "var(--wine)" : "var(--ink-2)", marginBottom:6 }}>
              {won ? "Avaliação agendada." : "Ela saiu sem agendar."}
            </div>
            <div style={{ fontFamily:"var(--serif)", fontSize:48, color:"var(--gold)", fontWeight:600, lineHeight:1 }}>{score}</div>
            <div className="label" style={{ marginTop:4 }}>pontos de condução</div>
            <p style={{ color:"var(--ink-2)", fontSize:14.5, lineHeight:1.65, marginTop:14 }}>
              {won
                ? "Você conduziu bem: acolheu, ancorô o valor e convidou com clareza."
                : "A conversa não converteu desta vez. Revise os pontos abaixo e tente de novo."}
            </p>
            {erros.length > 0 && (
              <div style={{ marginTop:18 }}>
                <div className="label" style={{ color:"var(--wine)", marginBottom:8 }}>Pontos para revisar</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                  {erros.map((e, i) => (
                    <li key={i} style={{ color:"var(--ink-2)", fontSize:14, lineHeight:1.6, paddingLeft:14, position:"relative" }}>
                      <span style={{ position:"absolute", left:4, color:"var(--wine)" }}>·</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ marginTop:18 }}>
              <div className="label" style={{ color:"var(--ink-3)", marginBottom:8 }}>Erros mais comuns nessa persona</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                {persona.errosComuns.map((e, i) => (
                  <li key={i} style={{ color:"var(--ink-2)", fontSize:14, lineHeight:1.6, paddingLeft:14, position:"relative" }}>
                    <span style={{ position:"absolute", left:4, color:"var(--gold)" }}>·</span>{e}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:22, flexWrap:"wrap" }}>
              <button className="btn btn-primary" onClick={restart}>Tentar de novo</button>
              <button className="btn btn-ghost" onClick={onBack}>Outras personas</button>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* compose */}
      {!ended && (
        <div className="sim-compose" style={{ marginTop:22 }}>
          <textarea
            ref={taRef}
            className="sim-compose"
            style={{ flex:1, border:"1px solid var(--line)", background:"var(--paper-2)", borderRadius:16,
              padding:"13px 16px", fontFamily:"var(--sans)", fontSize:15, resize:"none", outline:"none",
              color:"var(--ink)", minHeight:48, lineHeight:1.4 }}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); send(); } }}
            placeholder="Escreva sua resposta… (Ctrl+Enter para enviar)"
            rows={2}
          />
          <button className="btn btn-primary" onClick={send} disabled={!draft.trim()}>Enviar →</button>
        </div>
      )}
    </div>
  );
}

function Simulacao() {
  const [persona, setPersona] = useState(null);
  if (persona) return <SimChat persona={persona} onBack={() => setPersona(null)} />;
  return (
    <div className="canvas-inner">
      <div className="eyebrow page-eyebrow">Simulação de casos</div>
      <h1 className="page-title">Treine com<br />clientes fictícias.</h1>
      <p className="page-lead">
        Escolha uma persona e conduza a conversa de verdade. A cliente reage ao que você escreve
        e o coach comenta cada resposta.
      </p>
      <div className="sim-personas" style={{ marginTop:28 }}>
        {SIM_PERSONAS.map(p => (
          <div key={p.id} className="persona-card card" onClick={() => setPersona(p)}>
            <div className="pname serif">{p.name}</div>
            <div className="pperfil">{p.perfil}</div>
            <div className="phumor">"{p.humor}"</div>
          </div>
        ))}
      </div>
    </div>
  );
}
