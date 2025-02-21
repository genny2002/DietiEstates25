import axios from 'axios';

export class EmailService {
    static async sendEmail(req, res) {
        const apiKey = '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'; // Sostituisci con la tua API Key
        const url = 'https://api.sendgrid.com/v3/mail/send';
        const { to, subject, text } = req.body;
        //console.log(req.body.text)

        const payload = {
            personalizations: [
                {
                    to: [{ email: to }],
                    subject: subject,
                },
            ],
            from: { email: 'gen.nappo@studenti.unina.it' }, // Cambia con un'email verificata
            content: [
                {
                    type: 'text/plain',
                    value: text,
                },
            ],
        };

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            return { success: true, message: 'Email inviata con successo!', data: response.data };
        } catch (error) {
            console.error("Errore durante l'invio dell'email:", error.response?.data || error.message);
            
            if (error.response?.data?.errors && error.response.data.errors[0]?.message.includes("Invalid email address")) {
                throw new Error("Indirizzo email non valido");
            }
            
            throw new Error("Impossibile inviare l'email");
        }
    }
}