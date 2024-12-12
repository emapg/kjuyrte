import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, imageUrl, buttons } = req.body;

  const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

  try {
    // Send message with optional image and inline keyboard
    const data = {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: text || 'No text provided',
      reply_markup: buttons
        ? {
            inline_keyboard: buttons.map((btn) => [{ text: btn.label, url: btn.url }]),
          }
        : undefined,
    };

    // If an image is provided, send a photo message
    if (imageUrl) {
      await axios.post(`${telegramApiUrl}/sendPhoto`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        photo: imageUrl,
        caption: text || '',
        reply_markup: data.reply_markup,
      });
    } else {
      // Otherwise, send a regular text message
      await axios.post(`${telegramApiUrl}/sendMessage`, data);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
