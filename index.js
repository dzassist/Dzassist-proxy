const express = require("express");
const axios = require("axios");
const app = express();
const port = 10000;

const OPENAI_API_KEY = "sk-proj-..."; // <- remplace ici ta vraie clé

app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 10000,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erreur OpenAI →", error?.response?.data || error.message);
    res.status(500).send("Erreur proxy");
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy prêt sur http://localhost:${port}`);
});
