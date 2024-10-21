import { Router } from 'express';
import OpenAI from 'openai';

const gptRouter = Router();
// Configura OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Private
gptRouter.post("/", async (req, res) => {
  try {
    const {tituloTrabajo, area, ubicacion, tipoEmpleo, responsabilidades, requisitos, beneficios, formato} = req.body;
    const ofertaLaboral = `\
      Oferta de trabajo: ${tituloTrabajo}\
      Área: ${area}\
      Ubicación: ${ubicacion}\
      Tipo de empleo: ${tipoEmpleo}\
\
      Responsabilidades:\
      - ${responsabilidades.join('- ')}\

      Requisitos:\
      - ${requisitos.join('-')}\
\
      Beneficios:\
      - ${beneficios.join('-')}\
    `;

    const prompt = `\
      Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} para la empresa Falabella.\
       Necesito que pongas enfasis en los beneficios ofrecidos por la empresa y entregame un resultado en el siguiente formato ${formato}`;

  
    console.log("Accesing GPT");

    // Usamos el método correcto para el endpoint de chat
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Usar el modelo correcto de chat
      messages: [
        { role: "system", content: "Eres un asistente que ayuda a escribir ofertas laborales." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000
    });

    res.send({
      prompt: prompt,
      response: response.choices[0].message.content.trim(),
    });

    //TODO: GUARDAR PROMPT EN BDD
  } catch (err) {
    console.error('Error with OpenAI API:', err);
    res.status(500).send({
      error: 'Error generating response from GPT'
    });
  }
});

export default gptRouter;
