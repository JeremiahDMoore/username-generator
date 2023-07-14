import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const food = req.body.food || '';
  if (food.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid food",
      }
    });
    return;
  }

  const character = req.body.character || '';
  if (character.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid character",
      }
    });
    return;
  }

  const color = req.body.color || '';
  if (color.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid color",
      }
    });
    return;
  }
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(food, character, color),
      temperature: 0.69,
      frequency_penalty: 0.69,
      presence_penalty: 0.69,
      top_p: 1,
      stop: ["\n"],


    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(food, character, color) {
  // const capitalizedAnimal =
  //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();

    return `generate a username for a ${color} ${food} ${character} in random order, using synonyms, letters a-z, digits 0-9, and _:
    
 `
  

}
