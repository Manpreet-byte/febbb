import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    q: "What's my favorite way to spend a Sunday?",
    options: ['Netflix & Cuddles', 'A Hiking Adventure', 'A Long Brunch Date', 'Sleeping In'],
    answer: 0,
  },
  {
    q: 'What did I say on our very first date?',
    options: ['"You look amazing"', '"I\'m so nervous"', '"Is this seat taken?"', '"I almost didn\'t come"'],
    answer: 2,
  },
  {
    q: 'What food could I eat every single day?',
    options: ['Pizza', 'Sushi', 'Tacos', 'Pasta'],
    answer: 1,
  },
  {
    q: 'What do I value most in our relationship?',
    options: ['Adventure', 'Trust & Honesty', 'Humor', 'Deep Conversations'],
    answer: 1,
  },
  {
    q: "What's my love language?",
    options: ['Words of Affirmation', 'Quality Time', 'Physical Touch', 'Acts of Service'],
    answer: 2,
  },
  {
    q: 'Where would I love for us to travel together?',
    options: ['Paris', 'Tokyo', 'Santorini', 'New York'],
    answer: 2,
  },
  {
    q: 'What song reminds me of you?',
    options: ['"Perfect" – Ed Sheeran', '"All of Me" – John Legend', '"Lucky" – Jason Mraz', '"Thinking Out Loud"'],
    answer: 1,
  },
];

const resultTiers = [
  { min: 0, max: 2, title: 'Just Getting Started', msg: 'More time together means more answers. Let us make memories.' },
  { min: 3, max: 4, title: 'Not Bad At All', msg: 'You know me well. But there is always more to discover...' },
  { min: 5, max: 6, title: 'You Really Know Me', msg: 'I am impressed. We are truly connected.' },
  { min: 7, max: 7, title: 'Soulmate Level', msg: 'You know me better than I know myself. We are meant to be.' },
];

function getResult(score) {
  return resultTiers.find((t) => score >= t.min && score <= t.max) || resultTiers[0];
}

export default function LoveQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAnswered(false);
  };

  const result = getResult(score);

  return (
    <section className="relative py-24 md:py-36 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="heading-ornament">♦</div>
        <h2 className="font-display text-4xl md:text-6xl text-white/95 mb-4">How Well Do You Know Me?</h2>
        <p className="text-rose-200/50 text-base md:text-lg max-w-md mx-auto">
          Let us see if you have been paying attention, my love
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 60, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -60, rotateY: -8 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-strong p-6 md:p-10"
            >
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 mb-6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-rose-400 to-rose-600 progress-shine"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <p className="text-rose-300/40 text-xs mb-3 uppercase tracking-widest">
                Question {current + 1} of {questions.length}
              </p>

              <h3 className="font-serif text-xl md:text-2xl text-white/90 mb-8">{q.q}</h3>

              <div className="flex flex-col gap-3">
                {q.options.map((opt, idx) => {
                  let bg = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-rose-400/30';
                  if (answered) {
                    if (idx === q.answer) bg = 'bg-emerald-500/20 border-emerald-400/50';
                    else if (idx === selected && idx !== q.answer) bg = 'bg-red-500/20 border-red-400/50';
                    else bg = 'bg-white/5 border-white/5 opacity-50';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!answered ? { scale: 1.02 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer ${bg}`}
                    >
                      <span className="text-sm md:text-base text-rose-100/80">{opt}</span>
                      {answered && idx === q.answer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="float-right text-emerald-400"
                        >
                          ✓
                        </motion.span>
                      )}
                      {answered && idx === selected && idx !== q.answer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="float-right text-red-400"
                        >
                          ✗
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.6, rotateZ: -5 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              className="glass-strong p-8 md:p-12 text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block font-display text-5xl md:text-6xl text-gold-400/40 mb-4"
              >
                ♥
              </motion.span>

              <h3 className="font-display text-3xl md:text-4xl text-white/95 mb-2">{result.title}</h3>

              <div className="my-6 flex items-center justify-center gap-2">
                <span className="font-display text-5xl md:text-6xl font-bold text-gold-400">{score}</span>
                <span className="text-rose-300/40 text-lg">/ {questions.length}</span>
              </div>

              {/* Score bar */}
              <div className="w-full h-3 rounded-full bg-white/10 mb-6 overflow-hidden max-w-xs mx-auto">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-rose-400 via-rose-500 to-rose-600 progress-shine"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questions.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>

              <p className="text-rose-200/60 text-sm md:text-base mb-8">{result.msg}</p>

              <button
                onClick={restart}
                className="px-8 py-3 rounded-xl bg-linear-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg hover:shadow-rose-500/30 transition-shadow cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
