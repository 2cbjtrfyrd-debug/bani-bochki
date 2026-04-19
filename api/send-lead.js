export default async function handler(req, res) {
    // Разрешаем только POST-запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    // Твои ключи теперь скрыты на сервере и в полной безопасности
    const BOT_TOKEN = "8740212168:AAGw2J8bXJclrGVLB4rRWwkm2pllX6Y5HgE";
    const CHAT_ID = "2027115152";

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        // Сервер Vercel (США/Европа) сам стучится в Телеграм
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

        if (response.ok) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ error: 'Telegram API error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
