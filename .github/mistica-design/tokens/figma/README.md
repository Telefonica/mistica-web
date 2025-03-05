# Project overview

This project is designed to update Figma variables based on a JSON input, primarily focused on managing brand themes, colors, and other design tokens. The project retrieves existing variables from Figma, processes the provided JSON data, and updates or creates new variables in collections "Mode" and "Brand".

## Features

- **Fetch existing Figma data**: Retrieves the existing variables and collections from Figma.
- **Process JSON data**: Extracts theme and token data from provided JSON files for each brand.
- **Update or create variables**: Adds new variables or updates existing ones based on the brand's light and dark themes.
- **Handle variable modes**: Ensures each brand's mode (e.g., "Light", "Dark") is updated or created in the Figma "Brand" collection.
- **Support for multiple brands**: Processes multiple brands, mapping each brand's unique variables into Figma's collections.

## Setup

### Environment variables:

- `FIGMA_TOKEN`: The API token to authenticate with Figma.

### Dependencies:

- Node.js and packages such as `node-fetch`, `dotenv`, and `fs` are used to manage API requests, read local files, and load environment variables.

## Key functions

### `updateModeCollection(jsonData, brand)`

This function updates the color-scheme variables in Figma for a specific brand. It:

- Fetches the current variables from Figma.
- Updates modes and variables for `"Light"` and `"Dark"` color-schemes.
- Sends a POST request to update Figma with the new data.

### `updateBrandCollection(jsonData)`

This function focuses on updating color variables in the "Brand" collection. It:

- Maps color variables from the "Mode" collection to the "Brand" collection.
- Adds non-color variables for each brand.
- Creates or updates modes for each brand.
- Ensures proper aliasing of variables between collections.

## Usage

1. Navigate to the `tokens/figma` directory:

   ```bash
   cd tokens/figma

   ```

2. Run the script
   ```bash
   node index.mjs
   ```
