/* ============================================================
   Mapa do atendimento (baseado no mapa mental da clínica)
   Cada item traz uma explicação curta e uma mensagem pronta
   para a atendente copiar e customizar.
   ============================================================ */
window.MAPA = {
  root: "Processo de agendamento na harmonização facial",
  intro: "O caminho completo, do primeiro oi ao horário confirmado. Toque em cada etapa para ver o que fazer e copiar a mensagem pronta.",
  stages: [
    {
      id: "recepcao",
      n: "01",
      title: "Recepção e triagem inicial",
      resumo: "O primeiro contato define o tom de toda a relação. O que importa aqui é velocidade, descobrir de onde a pessoa veio e acolher com calor antes de falar de qualquer procedimento.",
      items: [
        {
          label: "Atendimento ágil (resposta em até 5 minutos)",
          explanation: "Responder rápido é o que mais aumenta a chance de agendar. Tenha mensagens prontas e priorize quem acabou de chamar.",
          script: "Oi, [nome]! Que alegria receber você na Clínica Fernanda Cristófoli. 🌷 Sou a [seu nome] e vou cuidar do seu atendimento. Me conta: como posso te ajudar hoje?",
        },
        {
          label: "Identificação da origem (anúncio ou indicação)",
          explanation: "Saber de onde a pessoa veio personaliza o discurso. Quem chega por indicação já confia; quem vem de anúncio precisa de mais contexto.",
          script: "Pra eu te atender do jeitinho certo, posso saber como você chegou até a gente? Foi por indicação de alguém ou nos encontrou pelo Instagram?",
        },
        {
          label: "Diagnóstico do nível de consciência",
          explanation: "Descubra se a pessoa já sabe o que quer ou só está pesquisando. Isso define se você educa ou conduz direto ao agendamento.",
          script: "Você já tem em mente algum cuidado específico que gostaria de fazer, ou prefere que a Dra. Fernanda avalie e te oriente sobre o que faz mais sentido pra você?",
        },
        {
          label: "Humanização do primeiro contato",
          explanation: "Use o nome da pessoa, fale como gente e demonstre cuidado genuíno. Ela precisa sentir que fala com alguém, não com um sistema.",
          script: "Fico muito feliz que você pensou em se cuidar, [nome]. 💛 Aqui cada detalhe é pensado pra você se sentir acolhida. Fique à vontade pra perguntar o que quiser, vou te explicar tudo com calma.",
        },
      ],
    },
    {
      id: "rapport",
      n: "02",
      title: "Rapport e conexão (arquétipo Amante)",
      resumo: "A marca fala a linguagem do cuidado e da exclusividade. Crie conexão antes de oferecer: faça a pessoa sentir que este é um espaço só dela.",
      items: [
        {
          label: "Linguagem sensorial e afetiva",
          explanation: "Descreva sensações e sentimentos, não só técnica. Fale em leveza, luminosidade, sentir-se bem no espelho.",
          script: "Imagina se olhar no espelho e se sentir descansada, leve e ainda mais você. 🌿 É exatamente essa sensação que a gente cultiva aqui, com naturalidade e cuidado em cada detalhe.",
        },
        {
          label: "Foco na exclusividade e valorização individual",
          explanation: "Reforce que o atendimento é restrito e personalizado. A pessoa não é mais uma, é única.",
          script: "Aqui o atendimento é restrito e totalmente individual, [nome]. A Dra. Fernanda desenha um plano pensado só pra você, respeitando a sua beleza e o seu tempo.",
        },
        {
          label: "Voz confiante e acolhedora",
          explanation: "Transmita segurança e calma. Você é a especialista de confiança que conduz com tranquilidade.",
          script: "Pode deixar que eu te guio em cada passo. 💫 Qualquer dúvida, por menor que pareça, estou aqui pra te responder com todo o cuidado.",
        },
        {
          label: "Transformação da consulta em refúgio de beleza",
          explanation: "Posicione a visita como uma experiência e um momento de pausa, não uma ida ao médico.",
          script: "Mais do que uma consulta, o seu horário aqui é um momento só seu, num ambiente pensado pra te acolher com privacidade e conforto. Um verdadeiro refúgio. 🤍",
        },
      ],
    },
    {
      id: "qualificacao",
      n: "03",
      title: "Qualificação e alinhamento",
      resumo: "Antes de oferecer, entenda. Boas perguntas revelam o desejo real, o impacto na autoestima e o momento certo, e ainda fazem a pessoa se sentir ouvida.",
      items: [
        {
          label: "Mapeamento de queixas e desejos",
          explanation: "Pergunte o que a pessoa gostaria de suavizar ou realçar. Foque no desejo, não no procedimento.",
          script: "Me conta, [nome]: quando você se olha no espelho, o que mais gostaria de suavizar ou realçar? A partir do que você sente, a Dra. Fernanda monta o plano ideal.",
        },
        {
          label: "Exploração do impacto na autoestima",
          explanation: "Entenda como isso afeta o dia a dia e a confiança da pessoa. Aumenta o valor percebido do cuidado.",
          script: "E como você se sente em relação a isso no seu dia a dia? Pergunto porque, quando a gente cuida de algo que incomoda, a autoestima muda de um jeito lindo.",
        },
        {
          label: "Validação do histórico de procedimentos",
          explanation: "Saiba o que a pessoa já fez. Evita repetições, ajusta expectativas e demonstra cuidado técnico.",
          script: "Você já fez algum procedimento estético antes? Se sim, me conta o quê e quando, assim a Dra. Fernanda já chega com tudo alinhado pra você.",
        },
        {
          label: "Urgência e datas especiais",
          explanation: "Descubra se há um evento ou data. Ajuda a priorizar e a montar um plano com tempo hábil.",
          script: "Tem alguma data especial chegando, como uma viagem, casamento ou aniversário? Assim consigo organizar o seu plano com o tempo certo pra você chegar radiante. ✨",
        },
      ],
    },
    {
      id: "diretrizes",
      n: "04",
      title: "Diretrizes de agendamento por perfil",
      resumo: "Novo paciente e paciente recorrente pedem condutas diferentes. Um precisa entender o valor da avaliação; o outro, agilidade e continuidade.",
      groups: [
        {
          label: "Novo paciente (prospecção)",
          items: [
            {
              label: "Cobrança da consulta de avaliação",
              explanation: "A avaliação é cobrada, e isso faz parte do valor. Apresente como o investimento no diagnóstico, com naturalidade.",
              script: "A avaliação com a Dra. Fernanda tem o valor de [valor] e inclui um diagnóstico completo do seu rosto, com um plano personalizado. É o primeiro passo pra fazer tudo com segurança e do jeito certo pra você.",
            },
            {
              label: "Educação sobre o valor do diagnóstico",
              explanation: "Explique que o diagnóstico é o que garante naturalidade e segurança. Sem ele, não existe plano sério.",
              script: "Esse momento é o coração de tudo: é nele que a Dra. Fernanda entende o seu rosto, seus desejos e desenha um plano sob medida. É o que garante um resultado natural e seguro, sem fórmulas prontas.",
            },
            {
              label: "Empilhamento de benefícios da avaliação",
              explanation: "Liste o que está incluso na avaliação para aumentar o valor percebido.",
              script: "Na sua avaliação você tem: análise completa da face, plano personalizado da Dra. Fernanda, orientação sobre prioridades e todas as suas dúvidas respondidas com calma. Tudo isso num só encontro. 💛",
            },
            {
              label: "Seleção de pacientes comprometidos",
              explanation: "A cobrança também valoriza a agenda da Dra. e reserva o tempo para quem está realmente decidido.",
              script: "A gente reserva esse tempo exclusivo da Dra. Fernanda só pra você, por isso a avaliação é confirmada com antecedência. Assim garantimos um atendimento tranquilo e sem correria.",
            },
          ],
        },
        {
          label: "Paciente recorrente (fidelização)",
          items: [
            {
              label: "Agendamento sem taxa de reserva",
              explanation: "Para quem já é da casa, o processo é mais leve, sem cobrança de reserva.",
              script: "Que bom te ver de volta, [nome]! 🌷 Pra você, que já é da nossa casa, o agendamento é direto, sem taxa de reserva. Me diz o melhor dia e horário que eu já organizo.",
            },
            {
              label: "Foco na manutenção e resultados contínuos",
              explanation: "Reforce a importância da continuidade para manter o resultado bonito ao longo do tempo.",
              script: "Pra manter aquele resultado lindo e natural, o ideal é seguirmos com a sua manutenção no tempo certo. Já está chegando a sua janela. Quer que eu reserve um horário?",
            },
            {
              label: "Fluxo de alta agilidade e conveniência",
              explanation: "Ofereça praticidade: horários flexíveis, confirmação rápida, lembrete.",
              script: "Pra facilitar a sua rotina, já deixo duas opções de horário: [dia] às [hora] ou [dia] às [hora]. Você confirma num toque e eu cuido do resto. 💫",
            },
          ],
        },
      ],
    },
    {
      id: "objecoes",
      n: "05",
      title: "Superação de objeções",
      resumo: "Objeção é sinal de interesse. Acolha o sentimento por trás, reduza o medo e traduza preço em valor, sempre sem pressão.",
      items: [
        {
          label: "Dúvida sobre a cobrança: por que pagar?",
          explanation: "Mostre que a avaliação é um diagnóstico de verdade, não uma conversa de vendas. O valor está no plano personalizado.",
          script: "Entendo a sua dúvida! A avaliação é cobrada porque é uma consulta de verdade: a Dra. Fernanda dedica um tempo exclusivo pra analisar o seu rosto e montar um plano só seu. Não é uma conversa de vendas, é o início do seu cuidado.",
        },
        {
          label: "Medo de aspecto artificial ou exagero",
          explanation: "Acolha o medo e reforce a filosofia da naturalidade. O objetivo é revelar, não transformar.",
          script: "Fico feliz que você pense assim, porque é exatamente a nossa filosofia. 🌿 Aqui o objetivo nunca é te mudar, e sim revelar a sua melhor versão, com naturalidade. O resultado é você, descansada e no seu melhor.",
        },
        {
          label: "Aversão à dor e a agulhas",
          explanation: "Tranquilize sobre conforto e técnicas que minimizam o incômodo. Demonstre cuidado com o bem-estar.",
          script: "Te entendo totalmente! 💛 A Dra. Fernanda usa técnicas pensadas pra deixar tudo o mais confortável possível, com cuidado em cada detalhe pelo seu bem-estar. Muita gente se surpreende com o quanto é tranquilo.",
        },
        {
          label: "Barreira de preço: investimento em amor-próprio",
          explanation: "Reposicione o preço como investimento em si mesma, com condições facilitadas, sem desconto que barateie a clínica.",
          script: "Eu entendo, [nome]. Gosto de pensar que é um investimento em você, no seu bem-estar e na sua confiança. Pra deixar mais leve, temos boas condições de parcelamento. Quer que eu te explique?",
        },
      ],
    },
    {
      id: "fechamento",
      n: "06",
      title: "Condução do pagamento e fechamento",
      resumo: "O fechamento precisa ser simples e seguro. Reduza o atrito do pagamento, confirme na hora e tire qualquer risco da decisão.",
      items: [
        {
          label: "Gatilho de impulso via link de pagamento",
          explanation: "Envie o link no momento do sim, enquanto o desejo está quente. Facilite ao máximo.",
          script: "Maravilha, [nome]! Pra já garantir o seu horário, vou te enviar o link de pagamento agora mesmo. Assim que confirmar, o seu momento de cuidado já fica reservado. 💫",
        },
        {
          label: "Uso do PIX para confirmação imediata",
          explanation: "O PIX confirma na hora. Ofereça como o caminho mais rápido e prático.",
          script: "Se preferir, pode ser por PIX, que confirma na hora. A nossa chave é o CNPJ 35.758.857/0001-50 (Clínica Dra. Fernanda Cristófoli). Me manda o comprovante aqui que eu reservo o seu horário no mesmo instante. 🌷",
        },
        {
          label: "Política de reagendamento gratuito (risco zero)",
          explanation: "Tire o medo de se comprometer. Imprevistos acontecem e ela pode remarcar sem custo.",
          script: "E pode ficar tranquila: se surgir qualquer imprevisto, é só me avisar com antecedência que a gente remarca sem nenhum custo. O seu cuidado é prioridade, sem pressão.",
        },
        {
          label: "Garantia de reserva e fixação de valor",
          explanation: "A confirmação garante o horário e congela o valor atual, protegendo a pessoa de reajustes.",
          script: "Confirmando hoje, eu garanto o seu horário e fixo o valor atual pra você, mesmo que haja reajuste depois. É o seu lugar guardado com todo o cuidado. 🤍",
        },
      ],
    },
  ],
};
