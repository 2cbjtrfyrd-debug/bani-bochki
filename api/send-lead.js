export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    const BOT_TOKEN = "8740212168:AAEEntaI6Q5mJocfGhuAPG83eklNTrSMl10";
    const CHAT_ID = "2027115152";

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        // Читаем ответ от Телеграма
        const telegramAnswer = await response.json();

        if (response.ok) {
            res.status(200).json({ success: true });
        } else {
            // Если Телеграм недоволен, выводим причину в логи Vercel
            console.error("Ошибка от Телеграма:", telegramAnswer);
            res.status(500).json({ error: 'Telegram rejected', details: telegramAnswer });
        }
    } catch (error) {
        console.error("Системная ошибка:", error);
        res.status(500).json({ error: 'Server error' });
    }
}
