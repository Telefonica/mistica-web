import {
  updateCollections,
  updateOrCreateModes,
  updateOrCreateVariables,
  updateOrCreateVariableModeValues,
  hasDefaultMode,
} from "./utils/figma-utils.mjs";

import {
  VARIABLE_TYPES,
  COLLECTION_NAMES,
  MODE_NAMES,
  VARIABLE_SCOPES,
} from "./utils/constants.mjs";

import {
  getFigmaData,
  postFigmaVariables,
} from "./utils/api-request.mjs";

import {
  getConstantVariables,
  getNonColorVariables,
} from "./variables.mjs";

import formatBrandName from "./utils/format-brand-name.mjs";

import {
  BRAND_KEY,
  MIDDLEWARE_KEY,
} from "./config.mjs";

const brandNames = Object.keys(BRAND_KEY);

async function updateModeCollection(
  jsonData,
  brand
) {
  try {
    const figmaData = await getFigmaData(
      MIDDLEWARE_KEY
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

    const modes = [
      MODE_NAMES.LIGHT,
      MODE_NAMES.DARK,
    ];

    // Create or update modes for the collection
    const defaultMode = modes[0];
    const defaultModeResult =
      await updateOrCreateModes({
        mode: { name: defaultMode },
        isDefault: true,
        targetCollectionName:
          COLLECTION_NAMES.COLOR_SCHEME,
        existingCollections: existingCollections,
      });
    newData.variableModes.push(defaultModeResult);

    const modeResults = await Promise.all(
      modes.slice(1).map(async (mode) => {
        return await updateOrCreateModes({
          mode: { name: mode },
          isDefault: false,
          targetCollectionName:
            COLLECTION_NAMES.COLOR_SCHEME,
          existingCollections:
            existingCollections,
        });
      })
    );
    newData.variableModes.push(...modeResults);

    // Get color variables using the imported function
    const colorVariables = getConstantVariables(
      jsonData,
      brand
    );

    const processedVariables = new Map();

    for (const variableGroup of colorVariables) {
      for (const variable of variableGroup.variables) {
        const prefixedName = `${brand}/${variable.name}`;

        // Only process if the variable hasn't been created yet
        if (
          !processedVariables.has(prefixedName)
        ) {
          // Create or update the variable
          const variableData =
            await updateOrCreateVariables({
              variable: {
                name: prefixedName,
                resolvedType:
                  VARIABLE_TYPES.COLOR,
                scopes: [],
              },
              targetCollectionName:
                COLLECTION_NAMES.COLOR_SCHEME,
              existingVariables:
                existingVariables,
              existingCollections:
                existingCollections,
            });

          newData.variables.push(variableData);
          processedVariables.set(
            prefixedName,
            variableData
          );

          // Find values for light and dark modes
          const lightValue = (
            jsonData[brand]?.light || []
          ).find(
            (v) => v.name === variable.name
          )?.value;
          const darkValue = (
            jsonData[brand]?.dark || []
          ).find(
            (v) => v.name === variable.name
          )?.value;

          // Handle light mode value
          if (lightValue) {
            const lightModeValueData =
              await updateOrCreateVariableModeValues(
                {
                  variable: {
                    name: prefixedName,
                    value: lightValue,
                    hasAlias: false,
                  },
                  targetModeName: hasDefaultMode(
                    COLLECTION_NAMES.COLOR_SCHEME,
                    existingCollections
                  )
                    ? MODE_NAMES.DEFAULT
                    : MODE_NAMES.LIGHT,
                  targetCollectionName:
                    COLLECTION_NAMES.COLOR_SCHEME,
                  existingCollections:
                    existingCollections,
                  existingVariables:
                    existingVariables,
                }
              );

            if (lightModeValueData) {
              newData.variableModeValues.push(
                lightModeValueData
              );
            }
          }

          // Handle dark mode value
          if (darkValue) {
            const darkModeValueData =
              await updateOrCreateVariableModeValues(
                {
                  variable: {
                    name: prefixedName,
                    value: darkValue,
                    hasAlias: false,
                  },
                  targetModeName: MODE_NAMES.DARK,
                  targetCollectionName:
                    COLLECTION_NAMES.COLOR_SCHEME,
                  existingCollections:
                    existingCollections,
                  existingVariables:
                    existingVariables,
                }
              );

            if (darkModeValueData) {
              newData.variableModeValues.push(
                darkModeValueData
              );
            }
          }
        }
      }
    }

    // Update the variables and modes in Figma
    await postFigmaVariables(
      MIDDLEWARE_KEY,
      newData
    );

    return newData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function updateBrandCollection(jsonData) {
  try {
    // Step 1: Fetch the existing data from Figma

    const figmaData = await getFigmaData(
      MIDDLEWARE_KEY
    );
    const existingCollections =
      figmaData.meta.variableCollections;

    const existingVariables =
      figmaData.meta.variables || {};

    // Step 2: Find the Theme and Brand collections

    const themeCollection = Object.values(
      existingCollections
    ).find(
      (collection) =>
        collection.name ===
        COLLECTION_NAMES.COLOR_SCHEME
    );

    const brandCollection = Object.values(
      existingCollections
    ).find(
      (collection) =>
        collection.name === COLLECTION_NAMES.SKIN
    );

    // Step 3: Filter variables to only include those from the "Mode" collection

    const existingModeVariables = Object.values(
      existingVariables
    ).filter(
      (variable) =>
        variable.variableCollectionId ===
        themeCollection.id
    );

    const existingBrandVariables = Object.values(
      existingVariables
    ).filter(
      (variable) =>
        variable.variableCollectionId ===
        brandCollection.id
    );

    // Step 4: Prepare new variables data for the Brand collection
    const newData = {
      variables: [],
      variableModeValues: [],
      variableModes: [],
    };

    // Step 5: Create or update modes based on the brands

    const firstBrand = brandNames[0];

    const firstModeResult =
      await updateOrCreateModes({
        mode: {
          name: formatBrandName(firstBrand),
        },
        isDefault: true,
        targetCollectionName:
          COLLECTION_NAMES.SKIN,
        existingCollections: existingCollections,
      });

    newData.variableModes.push(firstModeResult);

    brandNames.slice(1).forEach(async (brand) => {
      const formattedBrand =
        formatBrandName(brand);

      const modeResult =
        await updateOrCreateModes({
          mode: { name: formattedBrand },
          isDefault: false,
          targetCollectionName:
            COLLECTION_NAMES.SKIN,
          existingCollections:
            existingCollections,
        });

      newData.variableModes.push(modeResult);
    });

    // Step 6: Create a map for color variables from Mode collection

    const variableToBrandMap = new Map();

    existingModeVariables.forEach((variable) => {
      if (
        variable.resolvedType ===
        VARIABLE_TYPES.COLOR
      ) {
        const variableName = variable.name
          .split("/")
          .pop();
        if (
          !variableToBrandMap.has(variableName)
        ) {
          variableToBrandMap.set(
            variableName,
            {}
          );
        }
        const brand = variable.name.split("/")[0];
        variableToBrandMap.get(variableName)[
          brand
        ] = variable.id;
      }
    });

    for (let [
      variableName,
      brandMap,
    ] of variableToBrandMap) {
      // Return empty scopes in gradient variables, since they already have a style
      let scopes = [VARIABLE_SCOPES.ALL_SCOPES];

      const stopRegex = /-stop-\d+$/;

      if (stopRegex.test(variableName)) {
        scopes = [];
      }

      const variable = {
        name: variableName,
        resolvedType: VARIABLE_TYPES.COLOR,
        scopes: scopes,
        targetCollectionName:
          COLLECTION_NAMES.SKIN,
      };

      const variableData =
        await updateOrCreateVariables({
          variable,
          targetCollectionName:
            variable.targetCollectionName,
          existingVariables:
            existingBrandVariables,
          existingCollections:
            existingCollections,
        });

      newData.variables.push(variableData);

      // Step 8: Update mode values with the correct aliases for each brand
      for (const brand of brandNames) {
        const formattedBrand =
          formatBrandName(brand);

        // Call the helper function to create or update variable mode values
        const variableModeValuesData =
          await updateOrCreateVariableModeValues({
            variable: {
              name: variableName,
              hasAlias: true,
              value: brandMap[brand], // Alias to the Theme variable ID for the brand
            },

            targetModeName:
              hasDefaultMode(
                COLLECTION_NAMES.SKIN,
                existingCollections
              ) && brand === brandNames[0]
                ? MODE_NAMES.DEFAULT
                : formattedBrand,
            targetCollectionName:
              COLLECTION_NAMES.SKIN,
            existingCollections:
              existingCollections,
            existingVariables:
              existingBrandVariables,
          });

        if (variableModeValuesData) {
          newData.variableModeValues.push(
            variableModeValuesData
          );
        }
      }
    }

    // Loop through each brand to process its specific tokens
    for (const brand of brandNames) {
      const nonColorVariables =
        getNonColorVariables(jsonData, brand);

      for (const group of nonColorVariables) {
        const {
          variables,
          collectionName,
          resolvedType,
          variableScopes,
          hasAlias,
        } = group;

        for (const variable of variables) {
          // Update or create the variable in the collection
          const variableUpdateResult =
            await updateOrCreateVariables({
              variable: {
                ...variable,
                resolvedType: resolvedType,
                scopes: variableScopes,
                hasAlias: hasAlias,
              },
              targetCollectionName:
                collectionName,
              existingVariables:
                existingVariables,
              existingCollections:
                existingCollections,
            });

          if (!newData.variables) {
            newData.variables = [];
          }
          newData.variables.push(
            variableUpdateResult
          );

          // Find the mode for the current brand and set the mode values correctly
          const variableModeValuesUpdatedResult =
            await updateOrCreateVariableModeValues(
              {
                variable: {
                  ...variable,
                  resolvedType: resolvedType,
                  scopes: variableScopes,
                  hasAlias: hasAlias,
                },
                targetModeName:
                  hasDefaultMode(
                    collectionName,
                    existingCollections
                  ) && brand === brandNames[0]
                    ? MODE_NAMES.DEFAULT
                    : formatBrandName(brand),
                targetCollectionName:
                  collectionName,
                existingCollections:
                  existingCollections,
                existingVariables:
                  existingVariables,
              }
            );

          newData.variableModeValues.push(
            variableModeValuesUpdatedResult
          );
        }
      }
    }

    // Step 9: Send the data to update the Brand collection (POST)

    await postFigmaVariables(
      MIDDLEWARE_KEY,
      newData
    );

    return newData; // Returning newData for debugging
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function postCollections(brand) {
  const collectionNames = [
    COLLECTION_NAMES.SKIN,
    COLLECTION_NAMES.COLOR_SCHEME,
  ];

  try {
    const newData = await updateCollections(
      collectionNames,
      MIDDLEWARE_KEY
    );

    await postFigmaVariables(
      MIDDLEWARE_KEY,
      newData
    );
  } catch (error) {
    console.error(
      `Error creating collections for brand ${brand}:`,
      error
    );
  }
}

async function processBrand(jsonData, brand) {
  await postCollections(brand);
  await updateModeCollection(jsonData, brand);
}

async function processAllBrands(jsonData) {
  for (const brand of brandNames) {
    await processBrand(jsonData, brand);
  }
}

export async function updateMiddleware(jsonData) {
  await processAllBrands(jsonData);
  await updateBrandCollection(jsonData);
}
