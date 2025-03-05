import {
  updateCollections,
  updateOrCreateVariables,
  updateOrCreateVariableModeValues,
} from "./utils/figma-utils.mjs";

import {
  COLLECTION_NAMES,
  MODE_NAMES,
} from "./utils/constants.mjs";

import {
  getFigmaData,
  postFigmaVariables,
} from "./utils/api-request.mjs";

import { getPaletteVariables } from "./variables.mjs";

import { BRAND_KEY } from "./config.mjs";

const collectionNames = [
  COLLECTION_NAMES.PALETTE,
];

async function updatePalette(jsonData, brand) {
  const FILE_KEY = BRAND_KEY[brand];
  try {
    const figmaData = await getFigmaData(
      FILE_KEY
    );

    const existingVariables =
      figmaData.meta.variables;
    const existingCollections =
      figmaData.meta.variableCollections;

    const newData = {
      variableCollections: [],
      variableModes: [],
      variables: [],
      variableModeValues: [],
    };

    const paletteVariables = getPaletteVariables(
      jsonData,
      brand
    );

    for (const group of paletteVariables) {
      const {
        variables,
        collectionName,
        resolvedType,
        variableScopes,
        hasAlias,
      } = group;

      for (const variable of variables) {
        // Update or create the variable in the collection
        const variablesUpdateResult =
          await updateOrCreateVariables({
            variable: {
              ...variable,
              resolvedType: resolvedType,
              scopes: variableScopes,
              hasAlias: hasAlias,
            },
            targetCollectionName: collectionName,
            existingVariables: existingVariables,
            existingCollections:
              existingCollections,
          });

        newData.variables.push(
          variablesUpdateResult
        );

        // Find the mode for the current brand and set the mode values correctly
        const variableModeValuesUpdatedResult =
          await updateOrCreateVariableModeValues({
            variable: {
              ...variable,
              resolvedType: resolvedType,
              scopes: variableScopes,
              hasAlias: hasAlias,
            },
            targetModeName: MODE_NAMES.DEFAULT,
            targetCollectionName: collectionName,
            existingCollections:
              existingCollections,
            existingVariables: existingVariables,
          });

        newData.variableModeValues.push(
          variableModeValuesUpdatedResult
        );
      }
    }

    return newData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // rethrow the error to be handled later
  }
}

async function postCollections(brand) {
  const FILE_KEY = BRAND_KEY[brand];

  try {
    const newData = await updateCollections(
      collectionNames,
      FILE_KEY
    );

    await postFigmaVariables(FILE_KEY, newData);
  } catch (error) {
    console.error(
      `Error creating collections for for brand ${brand}:`,
      error
    );
  }
}

async function postPalette(jsonData, brand) {
  const FILE_KEY = BRAND_KEY[brand];
  try {
    const newData = await updatePalette(
      jsonData,
      brand
    );

    await postFigmaVariables(FILE_KEY, newData);
  } catch (error) {
    console.error(
      `Error updating palette for brand ${brand}:`,
      error
    );
  }
}

export async function updateSkinFiles(jsonData) {
  for (const brand of Object.keys(BRAND_KEY)) {
    await postCollections(brand);
    await postPalette(jsonData, brand);
  }
}
