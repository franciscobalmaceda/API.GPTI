import { Router } from 'express';
import updateOrganizationPromptByName from './apps/updateOrganizationPromptByName.js';
import getOrganizationPrompts from './apps/getOrganizationPrompts.js';
import getPromptByOrganizationName from './apps/getPromptByOrganizationName.js';

const organizationRouter = Router();

// Private
organizationRouter.post("/updateContextPrompt", async (req, res) => {
  try {
    const { organizationContext } = req.body;
    const organizationName = 'Falabella'


    const organization = await updateOrganizationPromptByName(organizationName, organizationContext)

    res.send({
      response: organization,
    });

  } catch (err) {
    console.error('Error with OpenAI API:', err);
    res.status(500).send({
      error: 'Error generating response from GPT'
    });
  }
});

organizationRouter.get("/contextPrompt", async (req, res) => {
  try {
    const organizationName = 'Falabella'

    const contextPrompt = await getPromptByOrganizationName(organizationName)

      const response = {
          contextPrompt
      }

    res.send(response);

  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: 'Error getting context prompt'
    });
  }
});

organizationRouter.get("/prompts", async (req, res) => {
    try {
      const organizationName = 'Falabella'
  
      const prompts = await getOrganizationPrompts(organizationName)

        const response = {
            prompts,
            amount: prompts.length
        }
  
      res.send(response);

    } catch (err) {
      console.error(err)
      res.status(500).send({
        error: 'Error getting prompts'
      });
    }
  });

export default organizationRouter;
