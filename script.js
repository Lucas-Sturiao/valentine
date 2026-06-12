/* ============================================
   FLOATING HEARTS
============================================ */
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💝', '🩷'];
const TOTAL_HEARTS = 10;

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-balloon');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = (Math.random() * 88 + 2) + 'vw';
  heart.style.fontSize = (1.8 + Math.random() * 2.2) + 'rem';

  const duration = 10 + Math.random() * 14;
  const delay = Math.random() * duration;
  heart.style.animationDuration = duration + 's';
  heart.style.animationDelay = '-' + delay + 's';

  heart.addEventListener('click', () => popHeart(heart));

  heartsContainer.appendChild(heart);
}

function popHeart(heart) {
  if (heart.classList.contains('popping')) return;
  heart.classList.add('popping');

  const rect = heart.getBoundingClientRect();
  spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

  setTimeout(() => {
    heart.remove();
    createHeart();
  }, 350);
}

function spawnParticles(x, y) {
  const count = 6;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('heart-particle');
    particle.textContent = '💗';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / count;
    const distance = 50 + Math.random() * 40;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.4)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => particle.remove(), 650);
  }
}

for (let i = 0; i < TOTAL_HEARTS; i++) {
  createHeart();
}

/* ============================================
   QUIZ DO CASAL
============================================ */
const quizQuestions = [
  {
    question: 'Qual seria o "programa perfeito" para um fim de semana a dois?',
    options: [
      'Maratona de séries no sofá, sem pressa de nada',
      'Uma viagem curta para um lugar novo',
      'Cozinhar juntos uma receita nova',
      'Sair para passear ao ar livre'
    ]
  },
  {
    question: 'Qual dessas frases combina mais com a gente?',
    options: [
      '"Faz carinho nas minhas costas?"',
      '"Bora resolver isso juntos"',
      '"Hoje o jantar é por minha conta"',
      '"Senta que lá vem história"'
    ]
  },
  {
    question: 'Se a gente pudesse teleportar agora, para onde iria?',
    options: [
      'Para a praia, só para ouvir o mar',
      'Para uma cidade que a gente nunca visitou',
      'Para a cama, descansar abraçadinhos',
      'Para aquele restaurante que a gente ama'
    ]
  },
  {
    question: 'Qual desses "mimos" você mais gosta de receber?',
    options: [
      'Um abraço apertado sem motivo',
      'Uma mensagem de bom dia carinhosa',
      'Um carinho ajudando em algo do dia a dia',
      'Um presentinho ou bilhetinho surpresa'
    ]
  },
  {
    question: 'No fim das contas, o que mais importa para a gente?',
    options: [
      'Rir juntos das bobagens do dia',
      'Saber que um pode contar com o outro',
      'Ter tempo de qualidade, mesmo que pouco',
      'Estar em paz, do jeito que a gente é'
    ]
  }
];

const quizQuestionEl = document.getElementById('quizQuestion');
const quizOptionsEl = document.getElementById('quizOptions');
const quizCounterEl = document.getElementById('quizCounter');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizResultEl = document.getElementById('quizResult');
const quizResultTitle = document.getElementById('quizResultTitle');
const quizResultText = document.getElementById('quizResultText');
const quizRestartBtn = document.getElementById('quizRestart');

let currentQuestion = 0;
let score = 0;

const resultMessages = [
  {
    min: 0,
    emoji: '🌱',
    title: 'Ainda descobrindo um ao outro',
    text: 'Toda história tem seu tempo. Cada resposta diferente é só mais um detalhe novo para conversarmos — e nos conhecermos ainda mais. 💬'
  },
  {
    min: 2,
    emoji: '💞',
    title: 'Sintonia que dá gosto de ver',
    text: 'Nós pensamos parecido em muita coisa, mas mantendo a graça das diferenças. É disso que as boas histórias são feitas. ✨'
  },
  {
    min: 4,
    emoji: '🔥',
    title: 'Almas gêmeas!',
    text: 'Você me conhece tão bem, que talvez saiba mais de mim do que eu mesmo. Feliz Dia dos Namorados! 💘'
  }
];

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  quizQuestionEl.textContent = q.question;
  quizCounterEl.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
  quizProgressBar.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;

  quizOptionsEl.innerHTML = '';
  q.options.forEach((optionText) => {
    const btn = document.createElement('button');
    btn.classList.add('quiz-option');
    btn.textContent = optionText;
    btn.addEventListener('click', () => selectOption(btn));
    quizOptionsEl.appendChild(btn);
  });
}

function selectOption(selectedBtn) {
  const allOptions = quizOptionsEl.querySelectorAll('.quiz-option');
  allOptions.forEach((btn) => (btn.disabled = true));
  selectedBtn.classList.add('selected');

  score++;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 350);
}

function showResult() {
  quizProgressBar.style.width = '100%';
  quizQuestionEl.style.display = 'none';
  quizOptionsEl.style.display = 'none';
  quizCounterEl.textContent = 'Resultado';

  let result = resultMessages[0];
  for (const r of resultMessages) {
    if (score >= r.min) result = r;
  }

  document.querySelector('.quiz-result-emoji').textContent = result.emoji;
  quizResultTitle.textContent = result.title;
  quizResultText.textContent = result.text;
  quizResultEl.classList.add('show');
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizQuestionEl.style.display = '';
  quizOptionsEl.style.display = '';
  quizResultEl.classList.remove('show');
  loadQuestion();
}

quizRestartBtn.addEventListener('click', restartQuiz);
loadQuestion();

/* ============================================
   ENVELOPE / CARTA + TYPING
============================================ */
const envelope = document.getElementById('envelope');
const letterFly = document.getElementById('letterFly');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const typedLetterEl = document.getElementById('typedLetter');

let isOpen = false;
let typingTimeout = null;

const letterScript = [
  { text: '> inicializando carta_de_amor.exe ...\n' },
  { text: '> carregando memórias compartilhadas ... ' },
  { text: 'OK\n', accent: true },
  { text: '> compilando sentimentos ... ' },
  { text: 'OK\n\n', accent: true },
  { text: 'Meu amor,\n\n' },
  { text: 'Hoje é só um lembrete de algo que eu sinto\ntodos os dias: a sorte de ter você.\n\n' },
  { text: 'Cada conversa boba, cada plano feito\nde última hora, cada silêncio confortável\nao seu lado — tudo isso vira memória\nque eu guardo com carinho.\n\n' },
  { text: 'Você é o tipo de pessoa que faz os dias\nnormais virarem dias bons, e os dias bons\nvirarem inesquecíveis.\n\n' },
  { text: 'Feliz Dia dos Namorados! ' },
  { text: '💕\n\n', accent: true },
  { text: '> status: ' },
  { text: 'amor_eterno = true', accent: true },
  { text: '\n> fim_do_arquivo_' }
];

function openEnvelope() {
  if (isOpen) return;
  isOpen = true;

  envelope.classList.add('open');

  setTimeout(() => {
    letterFly.classList.add('flying');
  }, 250);

  setTimeout(() => {
    modalOverlay.classList.add('show');
    startTyping();
  }, 1100);
}

function closeModal() {
  modalOverlay.classList.remove('show');
  letterFly.classList.remove('flying');
  envelope.classList.remove('open');

  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  typedLetterEl.innerHTML = '';

  setTimeout(() => {
    isOpen = false;
  }, 500);
}

function startTyping() {
  typedLetterEl.innerHTML = '';

  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  typedLetterEl.appendChild(cursor);

  let segmentIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (segmentIndex >= letterScript.length) {
      return;
    }

    const segment = letterScript[segmentIndex];
    const text = segment.text;

    if (charIndex < text.length) {
      const char = text.charAt(charIndex);

      let target;
      if (segment.accent) {
        if (charIndex === 0) {
          target = document.createElement('span');
          target.className = 'accent';
          segment._span = target;
          typedLetterEl.insertBefore(target, cursor);
        } else {
          target = segment._span;
        }
        target.textContent += char;
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        typedLetterEl.insertBefore(span, cursor);
      }

      charIndex++;

      const delay = char === '\n' ? 90 : 18 + Math.random() * 35;
      typingTimeout = setTimeout(typeNextChar, delay);

      typedLetterEl.scrollTop = typedLetterEl.scrollHeight;
    } else {
      segmentIndex++;
      charIndex = 0;
      typingTimeout = setTimeout(typeNextChar, 60);
    }
  }

  typeNextChar();
}

envelope.addEventListener('click', openEnvelope);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) closeModal();
});
