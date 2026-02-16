document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- TYPEWRITER ---------------- */

  const roles = ["Full Stack Developer ", "Software Developer ", "MERN Stack Developer ", "AI/ML Enthusiast "];
  let i = 0, j = 0, current = '', isDeleting = false;

  function type() {
    const element = document.getElementById("typewriter");
    if (!element) return;

    if (!isDeleting && j <= roles[i].length) {
      current = roles[i].slice(0, j++);
    } else if (isDeleting && j >= 0) {
      current = roles[i].slice(0, j--);
    }

    element.textContent = current;

    if (j === roles[i].length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 40 : 100);
    }
  }

  type();




  /* ---------------- AI VOICE BOT ---------------- */

  const bot = document.getElementById("aiBot");
  if (!bot) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech Recognition not supported.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

 bot.addEventListener("click", () => {

  if (bot.classList.contains("listening")) return;

  bot.classList.add("listening");

  try {
    recognition.start();
  } catch (error) {
    console.log("Recognition already started");
  }

});


  recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  console.log("User said:", transcript);

  const reply = getBotReply(transcript);

  setTimeout(() => {
    speak(reply);
  }, 300);
};


  recognition.onend = function() {
    bot.classList.remove("listening");
  };

  recognition.onerror = function() {
    bot.classList.remove("listening");
    speak("Sorry, I couldn't hear you properly.");
  };

function speak(text) {
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 0.95;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}


  function getBotReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("name")) {
      return "Hi, I am Nahida Athanikar Nadaf.";
    }

    if (msg.includes("tell me about yourself") || msg.includes("about you")) {
    return "I am Nahida Athanikar Nadaf, a final year Computer Science and Engineering student with strong expertise in full stack development and artificial intelligence. I build scalable web applications using the MERN stack and integrate AI into real world solutions.";
  }

  if (msg.includes("skills") || msg.includes("technologies")) {
    return "My technical skills include React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Supabase, and AI API integrations. I also work with tools like Git, Postman, Render and Vercel.";
  }

  if (msg.includes("projects")) {
    return "My key projects include RK Motors, an AI powered car marketplace, WanderNest travel booking platform, and an AI Code Reviewer that provides real time intelligent feedback.";
  }

  if (msg.includes("")) {
    return "My current CGPA is 8 point 6 in Information Technology.";
  }

  if (msg.includes("hire") || msg.includes("why should we")) {
    return "You should consider hiring me because I combine strong technical foundations with practical AI driven project experience and a focus on clean scalable development.";
  }

  if (msg.includes("strength")) {
    return "My strongest area is building full stack applications enhanced with artificial intelligence features.";
  }

  if (msg.includes("future") || msg.includes("goal")) {
    return "My goal is to grow as a software engineer specializing in intelligent systems and scalable application development.";
  }

  if (msg.includes("contact")) {
    return "You can connect with me through LinkedIn or email, both available in my portfolio.";
  }

  return "Thank you for your question. Please explore my portfolio to learn more about my work and experience.";
}

});
