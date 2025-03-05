import fetch from "node-fetch";

import { FIGMA_TOKEN } from "../config.mjs";

async function getFigmaData(FILE_KEY) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching Figma data: ${response.statusText}`
    );
  }
  return await response.json();
}

async function postFigmaVariables(
  FILE_KEY,
  newData
) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables`,
    {
      method: "POST",
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error updating variables: ${response.statusText}. Response: ${errorText}`
    );
  }
  return await response.json();
}

export { getFigmaData, postFigmaVariables };
