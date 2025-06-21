const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Remplace ici par ta vraie clé API
const openai = new OpenAI({
  apiKey: "sk-proj-Wpc8eSJkB3RhCoMzIudEWzCTl9ApSEFdnkHAs5hvzEPOG1Sgxz9aud4U6_2KQnnDlTc7oFZZIVT3BlkFJzcMISVbsGxOG6hKS3GT_Cqo8TzEtL3IMtFGOd2DhJi9ETdCNxu_0NZ5Jgm4FOHXk5H15ayMSUA"
});

app.get("/", (req, res) => {
  res.send("✅ DzAssist Proxy actif");
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    res.json(response);
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    res.status(500).json({
      error: "Erreur lors de l'appel à l'API OpenAI.",
      details: error?.message || error,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
