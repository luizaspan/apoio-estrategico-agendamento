/* ============================================================
   Mensagens padrão da clínica — versão corrigida
   Mesma forma de conversar, com as correções da auditoria
   aplicadas. Cada mensagem pode ter um ou mais canais.
   Tudo entre { } é variável substituída pelo sistema.
   ============================================================ */
window.MENSAGENS = {
  intro:
    "As mensagens padrão com as correções aplicadas, mantendo a mesma forma de conversar de sempre. É só editar o que quiser e copiar.",
  padroes: [
    { t: "Saudação única:", v: "{Primeiro nome do paciente}" },
    { t: "Assinatura única:", v: "— Equipe Clínica Dra. Fernanda Cristófoli" },
    { t: "Variáveis sempre entre", v: "{ }" },
    { t: "Linguagem", v: "neutra de gênero" },
  ],
  groups: [
    {
      id: "manuais",
      label: "Mensagens manuais",
      sub: "Enviadas pela equipe, caso a caso.",
      messages: [
        {
          name: "Mensagem com a chave PIX",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}!
Segue a nossa chave PIX para o pagamento no valor de {Valor}:

CNPJ 35.758.857/0001-50
Recebedor: Clínica Dra. Fernanda Cristófoli

Assim que concluir, pode nos enviar o comprovante por aqui?
Qualquer dúvida, estamos à disposição.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Primeiro nome no lugar do nome completo. Acrescentado o valor, o nome do recebedor (para o paciente confirmar que é a clínica certa) e o pedido de comprovante. Se não houver variável de valor, troque {Valor} por "no valor combinado".',
        },
        {
          name: "Não comparecimento no horário marcado",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}!
Sentimos a sua falta na consulta de hoje e esperamos que esteja tudo bem.
Quando quiser, podemos reservar um novo horário para dar continuidade ao seu tratamento.
Estamos à disposição.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Diferenciada da "Recuperação de horário cancelado" (esta é para o não comparecimento do mesmo dia). Tom menos de cobrança.',
        },
        {
          name: "Pós-atendimento",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}!
Esperamos que esteja tudo bem após o seu {Procedimento}.
Caso sinta qualquer desconforto ou tenha dúvidas sobre os cuidados, é só nos chamar — a nossa equipe acompanha o seu pós de perto.
Estamos à disposição.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            "Agora cita o {Procedimento} realizado. Não incluí orientações fixas de pós porque variam por procedimento — vale colar as específicas de cada caso.",
        },
        {
          name: "Pré-atendimento",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}, tudo bem?
Passando para lembrar que o seu agendamento de hoje, às {Hora do agendamento}, está confirmado.
Se possível, venha sem maquiagem e chegue com 15 minutos de antecedência.
Até logo!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Primeiro nome e assinatura padronizados. Atenção: esta mensagem se sobrepõe à automação "Lembrete de agendamento" — use só uma para o mesmo paciente.',
        },
        {
          name: "Recuperação de horário cancelado",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}!
Como o seu último horário não pôde acontecer, gostaríamos de ajudar a reagendar e dar continuidade ao seu tratamento.
Tem algum dia ou turno que funcione melhor para você? A partir daí, encontramos o horário ideal.
Estamos à disposição.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Reescrita para não ficar idêntica à de "Não comparecimento": aqui o foco é convidar o paciente a indicar a melhor disponibilidade.',
        },
        {
          name: "Recuperação de paciente inativo",
          variants: [
            {
              text:
`Olá, {Primeiro nome do paciente}!
Sentimos a sua falta por aqui.
Temos novidades que você vai gostar — novos tratamentos e cuidados pensados para os nossos pacientes. Que tal marcarmos um horário para você conhecer?
Estamos à disposição.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Primeiro nome, assinatura padrão e espaço extra removido ao final de "Sentimos sua falta".',
        },
      ],
    },
    {
      id: "sistema",
      label: "Mensagens do sistema",
      sub: "Automações disparadas pela plataforma.",
      messages: [
        {
          name: "Automação — Feliz aniversário",
          tag: "WhatsApp · 9h",
          variants: [
            {
              text:
`{Primeiro nome do paciente}, feliz aniversário!
Hoje celebramos não apenas mais um ano de vida, mas a sua jornada — com toda a sua força e beleza.
Que este novo ciclo seja repleto de saúde, conquistas e momentos felizes ao lado de quem você ama.
Um dia especial para você!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            "Correção mais importante: agora chama o paciente pelo nome. Texto enxugado e assinatura padronizada.",
        },
        {
          name: "Automação — Boas-vindas",
          tag: "WhatsApp",
          variants: [
            {
              text:
`Seja bem-vindo(a), {Primeiro nome do paciente}!
É um prazer ter você na Clínica Dra. Fernanda Cristófoli.
O seu cadastro foi concluído com sucesso e, a partir de agora, você acompanha todas as atualizações e informações dos seus tratamentos por aqui.
Estamos felizes em fazer parte do seu cuidado!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            "Acrescentada a assinatura que faltava — a mensagem antes terminava no ar.",
        },
        {
          name: "Automação — Lembrete de retorno",
          variants: [
            {
              channel: "SMS",
              text:
`{Primeiro nome do paciente}, já faz {Dias para reconsulta} dias desde a sua última consulta na {Nome da clínica}. Vamos agendar um novo horário?`,
            },
            {
              channel: "E-mail",
              text:
`Olá, {Primeiro nome do paciente}. Tudo bem?
Vimos aqui no seu cadastro que a sua última consulta foi há {Dias para reconsulta} dias. Para alcançarmos os resultados que esperamos, está na hora de uma nova sessão de {Procedimento}.
Você tem disponibilidade em algum dia da próxima semana?
Aguardamos o seu retorno para darmos andamento ao tratamento!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Espaço extra removido e assinatura padronizada (antes era "Com carinho, {Nome da clínica}").',
        },
        {
          name: "Automação — Lembrete de agendamento",
          variants: [
            {
              channel: "WhatsApp",
              text:
`Olá, {Primeiro nome do paciente}, tudo bem?
Estamos entrando em contato para confirmar a sua consulta no dia {Data do agendamento}, às {Hora do agendamento}.
Se possível, venha sem maquiagem e chegue com 15 minutos de antecedência.
Endereço: Rua Dr. Heitor Blum, 310 – Sala 712, Estreito, Florianópolis. O prédio conta com estacionamento rotativo.
Esperamos por você!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
            {
              channel: "SMS",
              text:
`Lembrete: a sua consulta na Clínica Dra. Fernanda Cristófoli é {Data do agendamento}, às {Hora do agendamento}. Esperamos por você!`,
            },
            {
              channel: "E-mail",
              text:
`Olá, {Primeiro nome do paciente}! Tudo bem?
A sua próxima consulta na Clínica Dra. Fernanda Cristófoli está marcada para {Data do agendamento}, às {Hora do agendamento}. Essa sessão faz parte do seu tratamento com {Procedimento}.
Podemos manter esse horário para você?
Para confirmar ou cancelar a sua presença, é só clicar no link abaixo:
{Link de confirmação}
A sua confirmação é fundamental para deixarmos tudo pronto para receber você.
Agradecemos a atenção.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'WhatsApp: nome incluído e espaço antes de "Endereço" removido. SMS: "recebê-la" trocado por "esperamos por você" (neutro). E-mail: corrigida a chave quebrada {Primeiro nome do paciente{ e inserido o link que antes não existia.',
        },
        {
          name: "Automação — Agendamento criado",
          tag: "WhatsApp",
          variants: [
            {
              text:
`{Primeiro nome do paciente}, o seu horário com a Dra. Fernanda está agendado para o dia {Data do agendamento}, às {Hora do agendamento}.
Pedimos que chegue com 15 minutos de antecedência, para que o seu atendimento comece com tranquilidade.
Contamos com a sua presença! Caso precise remarcar ou cancelar, pedimos que avise com até 48 horas de antecedência, para que possamos oferecer o horário a outro paciente.
Esperamos por você.
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          decide:
            "Removi a ameaça de taxa de R$ 300 (que, pela sua observação, nunca foi cobrada) e troquei por um pedido gentil de aviso com 48h. Se vocês decidirem cobrar de verdade, é só acrescentar a frase da taxa de volta — aí ela passa a ter peso. Anunciar e nunca cumprir é o que enfraquece a comunicação.",
        },
        {
          name: "Automação — Agendamento alterado",
          tag: "WhatsApp",
          variants: [
            {
              text:
`{Primeiro nome do paciente}, o seu horário foi alterado com sucesso para o dia {Data do agendamento}, às {Hora do agendamento}.
Nos vemos em breve!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            "Assinatura padronizada (antes usava hífen). Texto já estava correto.",
        },
        {
          name: "Automação — Agendamento confirmado",
          tag: "WhatsApp",
          critico: true,
          variants: [
            {
              text:
`{Primeiro nome do paciente}, o seu atendimento foi confirmado para o dia {Data do agendamento}, às {Hora do agendamento}.
Estamos esperando por você!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            'Correção crítica: as três variáveis ganharam as chaves { } que faltavam — antes o sistema enviaria "Primeiro nome do paciente" como texto literal.',
        },
        {
          name: "Automação — Agendamento cancelado",
          tag: "WhatsApp",
          critico: true,
          variants: [
            {
              text:
`{Primeiro nome do paciente}, conforme solicitado, o seu atendimento marcado para o dia {Data do agendamento}, às {Hora do agendamento}, foi cancelado.
Quando quiser, podemos reservar um novo horário. Estamos à disposição!
— Equipe Clínica Dra. Fernanda Cristófoli`,
            },
          ],
          ajuste:
            "Correção crítica: mesmas chaves { } aplicadas às três variáveis que estavam soltas no texto.",
        },
      ],
    },
  ],
};
