import axios from 'axios';

export class EmailService {
    static async sendEmail(req, res) {
        const apiKey = process.env.EMAIL_API_KEY;
        const url = 'https://api.sendgrid.com/v3/mail/send';
        const { to, subject, text } = req.body;
        const payload = {
            personalizations: [
                {
                    to: [{ email: to }],
                    subject: subject,
                },
            ],
            from: { email: 'gen.nappo@studenti.unina.it' },
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
            
            if (EmailService.isEmailAddressInvalid(error)) {
                throw new Error("Indirizzo email non valido");
            }
            
            throw new Error("Impossibile inviare l'email");
        }
    }

    static isEmailAddressInvalid(error) {
        return this.isErrorResponseValid(error) && this.isErrorMessageInvalidEmail(error);
    }

    static isErrorResponseValid(error) {
        return error.response?.data?.errors;
    }
    
    static isErrorMessageInvalidEmail(error) {
        return error.response.data.errors[0]?.message.includes("Invalid email address");
    }
}