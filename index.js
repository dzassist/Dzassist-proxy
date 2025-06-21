const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("✅ DzAssist Proxy actif");
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur OpenAI :", error.response?.data || error.message);
    res.status(500).json({ error: "Erreur lors de l'appel à l'API OpenAI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
