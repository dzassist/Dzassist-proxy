const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Remplace ici par ta clé API OpenAI
const openai = new OpenAI({
  apiKey: "sk-proj-Wpc8eSJkB3RhCoMzIudEWzCT1A9pSErEdnKHaS5hwzEPOG15gxx29ud4U6_2KQnpDlTcoFZZlVT3BlkFJzcMlSVbs6x0G6hKS3Gf",
});

app.get("/", (req, res) => {
  res.send("✅ DzAssist Proxy actif !");
});

app.post("/chat",
