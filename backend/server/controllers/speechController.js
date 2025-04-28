import SpeechService from '../services/speech.service.js';

const speechController = {
  // Transcription audio -> texte (pour sourds, sous-titres, classroom)
  async transcribe(req, res) {
    try {
      const { audioBase64 } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ message: 'Audio manquant.' });
      }
      const text = await SpeechService.transcribeAudio(audioBase64);
      res.json({ text });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur transcription audio.' });
    }
  },

  // Synthèse vocale texte -> audio (pour aveugles, accessibilité)
  async synthesize(req, res) {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ message: 'Texte manquant.' });
      }
      const audioBase64 = await SpeechService.textToSpeech(text);
      res.json({ audioBase64 });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur synthèse vocale.' });
    }
  },

  // Détection d’émotion dans la voix (optionnel)
  async detectEmotion(req, res) {
    try {
      const { audioBase64 } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ message: 'Audio manquant.' });
      }
      const emotion = await SpeechService.detectEmotion(audioBase64);
      res.json({ emotion });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Erreur détection émotion.' });
    }
  }
};

export default speechController;