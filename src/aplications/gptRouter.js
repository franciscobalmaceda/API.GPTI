import { Router } from 'express';
import OpenAI from 'openai';

const gptRouter = Router();
// Configura OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Private
gptRouter.post("/", async (req, res) => {
  const {tituloTrabajo, area, ubicacion, tipoEmpleo, responsabilidades, requisitos, beneficios, formato} = req.body;
  const ofertaLaboral = `
    Oferta de trabajo: ${tituloTrabajo}
    Área: ${area}
    Ubicación: ${ubicacion}
    Tipo de empleo: ${tipoEmpleo}

    Responsabilidades:
    - ${responsabilidades.join('\n- ')}

    Requisitos:
    - ${requisitos.join('\n- ')}

    Beneficios:
    - ${beneficios.join('\n- ')}

    Formato preferido: ${formato}
  `;

  const prompt = `
    Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} para la empresa Falabella.`;

  try {
    console.log("Accesing GPT");

    // Usamos el método correcto para el endpoint de chat
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Usar el modelo correcto de chat
      messages: [
        { role: "system", content: "Eres un asistente que ayuda a escribir ofertas laborales." },
        { role: "user", content: prompt }
      ],
      max_tokens: 100
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
