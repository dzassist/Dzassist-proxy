const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("✅ DzAssist Proxy fonctionne");
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur OpenAI :", error.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de l’appel à l’API OpenAI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
