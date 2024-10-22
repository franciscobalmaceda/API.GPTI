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

let prompt;
switch (formato) {
  case 'mensaje':
    prompt = `\
      Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} Necesitamos que sea una propuesta atrayente y sin que inventes nada que no te digamos, solo escribe los detalles de manera atrayente.\
Este es una oferta para la empresa Chilena Falabella, muy seria y con mucha historia en el país.
Utiliza emojis que simbolicen cada punto importante dentro de la oferta.`
    break;
  case 'Linkedin':
    prompt = `\
      Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} Necesitamos que sea una propuesta atrayente y sin que inventes nada que no te digamos, solo escribe los detalles de manera atrayente.\
Este es una oferta para la empresa Chilena Falabella, muy seria y con mucha historia en el país.`
  case 'Mail':
    prompt = `\
      Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} Necesitamos que sea una propuesta atrayente y sin que inventes nada que no te digamos, solo escribe los detalles de manera atrayente.\
Este es una oferta para la empresa Chilena Falabella, muy seria y con mucha historia en el país.
Utiliza un lenguaje como si estuvieras tratando con la persona de tú a tú`
    break;
  case 'foro':
    prompt = `\
    Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} Necesitamos que sea una propuesta atrayente y sin que inventes nada que no te digamos, solo escribe los detalles de manera atrayente.\
Este es una oferta para la empresa Chilena Falabella, muy seria y con mucha historia en el país.
Utiliza emojis que simbolicen cada punto importante dentro de la oferta.`
      break;
  default:
    throw new Error('no calza formato');
}
  
    console.log("Accesing GPT");

    // Usamos el método correcto para el endpoint de chat
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Usar el modelo correcto de chat
      messages: [
        { role: "system", content: "Eres un asistente que ayuda a escribir ofertas laborales." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000
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
