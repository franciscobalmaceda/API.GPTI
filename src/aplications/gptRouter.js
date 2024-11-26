import { Router } from 'express';
import OpenAI from 'openai';
import getPromptByOrganizationName from './apps/getPromptByOrganizationName.js';
import addGeneratedPromptToOrganization from './apps/addGeneratedPromptToOrganization.js';

const gptRouter = Router();
// Configura OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// Private
gptRouter.post("/", async (req, res) => {
  try {
    const {tituloTrabajo, area, ubicacion, tipoEmpleo, responsabilidades, requisitos, beneficios, formato} = req.body;
    const _resp = responsabilidades.join('- ')
    const _req = requisitos.join('-')
    const _bene = beneficios.join('-')

    const ofertaLaboral = `\
Oferta de trabajo: ${tituloTrabajo}\
Área: ${area}\
Ubicación: ${ubicacion}\
Tipo de empleo: ${tipoEmpleo}\
\
Responsabilidades:\
- ${_resp}\
Requisitos:\
- ${_req}\
\
Beneficios:\
- ${_bene}\
`;

const _context = await getPromptByOrganizationName('Falabella')
const context = _context || 'Se Requiuere de personas interesantes para aportar en nuestro equipo de trabajo'

const _prompt = `Escribe una oferta laboral en base a los siguientes detalles ${ofertaLaboral} Necesitamos que sea una propuesta atrayente y sin que inventes nada que no te digamos, solo escribe los detalles de manera atrayente.\n\
Este es una oferta para la empresa Chilena Falabella, muy seria y con mucha historia en el país.
La siguiente información es relevante para como información de la organización y el perfíl de persona que se busca:\n
${context}\n` ;

let prompt;
switch (formato) {
  case 'mensaje':
    prompt = _prompt.concat(" ", 'Utiliza emojis que simbolicen cada punto importante dentro de la oferta.')
    break;
  case 'LinkedIn':
    prompt = _prompt
  case 'Mail':
    prompt = _prompt.concat(" ", 'Utiliza un lenguaje como si estuvieras tratando con la persona de tú a tú')
    break;
  case 'foro':
    prompt = _prompt.concat(" ", 'Utiliza emojis que simbolicen cada punto importante dentro de la oferta.')
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

    const generatedCV = response.choices[0].message.content.trim()

    // Extraer palabras clave del texto generado
    const keywordPrompt = `A partir del siguiente texto, identifica las palabras clave más importantes (máximo 10) en forma de lista, sin título y evita las palabras clave "Requsitos", "Beneficios" y "Responsabilidades":\n\n"${generatedCV}"`;
    const keywordResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente que identifica palabras clave en textos." },
        { role: "user", content: keywordPrompt }
      ],
      max_tokens: 2000
    });

    const keywords = keywordResponse.choices[0].message.content.trim().split("\n").map((kw) => kw.replace(/^-\s*/, '').trim());

    const generatedPrompt =  await addGeneratedPromptToOrganization('Falabella', {
        tituloTrabajo,
        area,
        ubicacion,
        tipoEmpleo,
        responsabilidades: _resp,
        requisitos: _req,
        beneficios: _bene,
        formato
      },
      generatedCV,
      keywords
    )

    res.send({
      prompt: prompt,
      response: generatedCV,
      keywords: keywords
    });
  } catch (err) {
    console.error('Error with OpenAI API:', err);
    res.status(500).send({
      error: 'Error generating response from GPT'
    });
  }
});

export default gptRouter;
