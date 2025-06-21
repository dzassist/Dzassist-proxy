const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ─────────────────────────────────────────────────────────
// TA CLÉ API (celle que tu m’as donnée) – déjà insérée ici
// ─────────────────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: "sk-proj-Wpc8eSJkB3RhCoMzIudEWzCT1A9pSErEdnKHaS5hwzEPOG15gxx29ud4U6_2KQnpDlTcoFZZlVT3BlkFJzcMlSVbs6x0G6hKS3Gf",
});

// ─────────────────────────────────────────────────────────
// ROUTE DE TEST
// ─────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("✅ DzAssist Proxy actif !");
});

// ─────────────────────────────────────────────────────────
// ROUTE /chat  → proxy completions GPT-3.5-turbo
// ─────────────────────────────────────────────────────────
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json(response);
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    res.status(500).json({
      error: "Erreur lors de l'appel à l'API OpenAI.",
      details: error?.message || error,
    });
  }
});

// ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
