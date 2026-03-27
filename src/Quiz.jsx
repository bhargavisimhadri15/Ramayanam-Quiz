import { useState } from "react";
import { quizData } from "./data";
import { t } from "./i18n";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Quiz({ lang = "en" }) {
  const [sessionQuestions, setSessionQuestions] = useState(() => shuffle(quizData));
  const [answers, setAnswers] = useState(() => []);
  const [index, setIndex] = useState(0);
  const [quit, setQuit] = useState(false);
  const [userName, setUserName] = useState("");

  const current = sessionQuestions[index];
  const selected = answers[index]?.selected || "";
  const isCorrect = selected && selected === current.answer;
  const feedback = selected ? (isCorrect ? "Correct" : "Wrong") : "";
  const answeredCount = answers.filter(Boolean).length;
  const score = answers.reduce((sum, item) => sum + (item?.isCorrect ? 1 : 0), 0);
  const percent = answeredCount ? Math.round((score / answeredCount) * 100) : 0;
  const level = percent >= 80 ? "Expert" : percent >= 50 ? "Intermediate" : "Beginner";

  const selectAnswer = (ans) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = { selected: ans, isCorrect: ans === current.answer };
      return next;
    });
  };

  const nextQuestion = () => {
    setIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= sessionQuestions.length) {
        const random = quizData[Math.floor(Math.random() * quizData.length)];
        setSessionQuestions((q) => [...q, random]);
      }
      return nextIndex;
    });
  };

  const prevQuestion = () => setIndex((prev) => Math.max(prev - 1, 0));

  const quitQuiz = () => setQuit(true);

  const restartQuiz = () => {
    setSessionQuestions(shuffle(quizData));
    setAnswers([]);
    setIndex(0);
    setQuit(false);
    setUserName("");
  };

  const downloadCertificate = () => {
    const name = userName.trim();
    if (!name || answeredCount === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fffaf2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#d4a017";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    const drawText = (text, y, size = 28, weight = "400") => {
      ctx.font = `${weight} ${size}px Georgia`;
      ctx.fillStyle = "#2d2a32";
      const metrics = ctx.measureText(text);
      ctx.fillText(text, (canvas.width - metrics.width) / 2, y);
    };

    drawText(t(lang, "certHeading"), 140, 36, "600");
    drawText(t(lang, "certSubtitle"), 190, 28, "500");
    ctx.fillStyle = "#555";
    drawText(t(lang, "presentedTo"), 250, 20);
    ctx.fillStyle = "#1f1b24";
    drawText(name, 300, 34, "600");
    ctx.fillStyle = "#555";
    drawText(`${t(lang, "correctAnswers")}: ${score}`, 360, 22, "500");
    drawText(`${t(lang, "level")}: ${level} (${percent}%)`, 400, 20, "500");
    drawText(`${t(lang, "date")}: ${new Date().toLocaleDateString()}`, 440, 20, "400");
    drawText(t(lang, "explore"), 500, 20, "400");

    const link = document.createElement("a");
    link.download = `${name}-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (quit) {
    return (
      <div className="quiz">
        <h2>{t(lang, "quizEnded")}</h2>
        <p className="score">
          {t(lang, "finalScore")}: {score} {t(lang, "correctAnswers").toLowerCase()} | {t(lang, "level")}: {level} ({percent}%)
        </p>
        <div className="cert">
          <input
            className="name-input"
            placeholder={t(lang, "namePlaceholder")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="nav-btn" onClick={downloadCertificate} disabled={!userName.trim()}>
            {t(lang, "downloadCert")}
          </button>
        </div>
        <button className="nav-btn restart-btn" onClick={restartQuiz}>
          {t(lang, "restart")}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="question-row">
        <h3>
          Q {index + 1}: {current.question}
        </h3>
      </div>
      <p className="score">
        {t(lang, "score")}: {score} {t(lang, "correctAnswers")}
      </p>
      <p className="level">
        {t(lang, "level")}: {level} ({percent}%)
      </p>
      {feedback && (
        <p className={`feedback ${isCorrect ? "good" : "bad"}`}>{feedback}</p>
      )}
      {current.options.map((opt, i) => {
        const status =
          opt === current.answer && selected
            ? "correct"
            : selected === opt
            ? "wrong"
            : "";
        return (
          <button
            key={i}
            className={`answer ${status}`}
            onClick={() => selectAnswer(opt)}
          >
            {opt}
          </button>
        );
      })}
      <div className="nav">
        <button className="nav-btn" onClick={prevQuestion} disabled={index === 0}>
          {t(lang, "previous")}
        </button>
        <button className="nav-btn" onClick={nextQuestion}>
          {t(lang, "next")}
        </button>
      </div>
      <button className="nav-btn danger quit-btn" onClick={quitQuiz}>
        {t(lang, "quit")}
      </button>
    </div>
  );
}
