fetch("https://api.openai.com/v1/models", {
  headers: {
    "Authorization": "Bearer sk-proj-n5RkSASQEwfKJH-WlPHtUX5ffmDS3Sy2zwKramMjeaxh9dKAuS-8sVGhQd9zvmM0Uc0y9q1o6T3RlbkEJ8KNfiHYaSDu9RLz5u85QoWGmNeGG6DcHOvGpATvG9-wn1gKOm... (tronqué volontairement ici pour la sécurité)"
  }
})
  .then(res => res.json())
  .then(data => console.log("✅ CONNECTÉ : ", data))
  .catch(err => console.error("❌ ECHEC : ", err));
