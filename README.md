# Card Recommender MTG

This project is a card recommender application for building a commander deck for Magic: The Gathering. It is developed using Svelte, TypeScript, and Vite.

## Installation

After cloning the project, run the following command to install the dependencies:

npm install

## Starting the Development Server

To start the development server, run the following command:

npm run dev

This command will run the project on a local server and automatically open it in your browser.

## Configuration

The project stores API keys and other configuration settings in the .env file. You can use the .env.development file to set configuration settings for the development environment.

## Project Structure

The project has the following file structure:

.env
.env.development
.gitignore
.vscode/
    extensions.json
index.html
LICENSE
package.json
postcss.config.js
public/
    chevron-down.svg
    loading.svg
README.md
src/
    ai/
        groq.ts
    app.css
    App.svelte
    components/
        Autocomplete.svelte
        Filter.svelte
        FilterCards.svelte
        ListCards.svelte
        SelectedCommander.svelte
    icons/
    labels.ts
    main.ts
    stores/
        common.ts
    types/
    utils/
    vite-env.d.ts
svelte.config.js
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts

## Important Files and Folders

- src/ai/groq.ts: Interacts with the Groq API.
- src/components: Contains the Svelte components of the application.
- src/utils/fetch.ts: Contains helper functions for API requests.
- src/utils/debounce.ts: Contains the debounce function.
- src/types/commander.ts: Contains TypeScript type definitions.
- src/stores/common.ts: Contains Svelte stores.
- tailwind.config.ts: Tailwind CSS configuration file.
- svelte.config.js: Svelte configuration file.
- vite.config.ts: Vite configuration file.

## Usage

The application allows you to get card recommendations by entering a commander name and using filters. Filters include card type, card color, and aggressiveness type.

## License

This project is licensed under the Apache License 2.0.