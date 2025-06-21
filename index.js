const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-proj-n5RkSASQEfWkJH-WlPHtUJ1gUoNBiLGuEsuFJz9Ub0qH0K08" // 🔐 Ta clé ici
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erreur proxy:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: "Erreur serveur proxy" },
    });
  }
});

app.listen(port, () => {
  console.log(`DzAssist proxy actif sur le port ${port}`);
});
