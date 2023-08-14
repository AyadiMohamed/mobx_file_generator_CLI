#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts'; // Import the prompts package
import mobxCodeGenerator from 'mobx_file_generator';

async function generateComponents() {
  try {
    // Prompt the user for input
    const userInput = await prompts([
      {
        type: 'text',
        name: 'projectPath',
        message: 'Enter the path to the project:',
        validate: (input) => {
          if (fs.existsSync(input) && fs.existsSync(path.join(input, 'package.json'))) {
            return true;
          }
          return 'Please provide a valid path to the project directory containing package.json.';
        },
      },
      {
        type: 'text',
        name: 'swaggerUrl',
        message: 'Enter the Swagger URL:',
      },
      {
        type: 'text',
        name: 'outputFolder',
        message: 'Enter the output folder path:',
      },
      {
        type: 'text',
        name: 'templatePath',
        message: 'Enter the optional template path (leave empty if none):',
      },
    ]);

    // Set the user-provided output folder in your library
    mobxCodeGenerator.setOutputFolder(path.join(userInput.projectPath, userInput.outputFolder));

    // Check dependencies from the user's package.json
    mobxCodeGenerator.checkDependencies(path.join(userInput.projectPath, 'package.json'));

    // Generate DTOs, services, and stores
    await Promise.all([
      mobxCodeGenerator.generateDto(userInput.swaggerUrl, userInput.templatePath),
      mobxCodeGenerator.generateService(userInput.swaggerUrl, userInput.templatePath),
      mobxCodeGenerator.generateStore(userInput.swaggerUrl),
    ]);
  } catch (error) {
    throw error;
  }
}

generateComponents();

