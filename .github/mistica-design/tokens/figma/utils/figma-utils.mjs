import { MODE_NAMES } from "./constants.mjs";
import { getFigmaData } from "./api-request.mjs";

export function generateTempModeId(
  targetMode,
  targetCollection
) {
  return `tempId_${targetCollection}_${targetMode}`;
}

export function hasDefaultMode(
  targetCollectionName,
  existingCollections
) {
  const collection = Object.values(
    existingCollections
  ).find(
    (collection) =>
      collection.name === targetCollectionName
  );

  if (!collection) {
    console.warn(
      `Collection ${targetCollectionName} not found.`
    );
    return false;
  }

  const existingModes = collection.modes || [];

  // Return true if a mode named "Default" exists, otherwise false
  return existingModes.some(
    (m) => m.name === MODE_NAMES.DEFAULT
  );
}

export async function updateCollections(
  collections,
  FILE_KEY
) {
  try {
    const figmaData = await getFigmaData(
      FILE_KEY
    );

    const newData = {
      variableCollections: [],
    };

    const existingCollections =
      figmaData.meta.variableCollections;

    function generateTempId(name) {
      return `tempId_${name}`;
    }

    function updateCollection(
      collectionName,
      existingCollections
    ) {
      // Find the existing collection by name
      const existingCollection = Object.values(
        existingCollections
      ).find(
        (collection) =>
          collection.name === collectionName
      );

      if (existingCollection) {
        // If the collection exists, update it
        newData.variableCollections.push({
          action: "UPDATE",
          id: existingCollection.id,
          name: collectionName,
        });
      } else {
        // If the collection doesn't exist, create it
        const tempId = generateTempId(
          collectionName
        );
        newData.variableCollections.push({
          action: "CREATE",
          id: tempId,
          name: collectionName,
        });
      }
    }

    // Process each collection name
    collections.forEach((collection) => {
      updateCollection(
        collection,
        existingCollections
      );
    });

    // Return the processed data for further use
    return newData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // rethrow the error to be handled later
  }
}

export async function updateOrCreateModes({
  mode,
  isDefault,
  targetCollectionName,
  existingCollections,
}) {
  const collection = Object.values(
    existingCollections
  ).find(
    (collection) =>
      collection.name === targetCollectionName
  );

  // Handle the case when the collection is not found
  if (!collection) {
    console.warn(
      `Collection ${targetCollectionName} not found.`
    );
    return null;
  }

  const collectionId = collection.id;
  const existingModes = collection.modes || [];

  // Look for the existing mode by name and the default mode
  const existingMode = existingModes.find(
    (m) => m.name === mode.name
  );
  const defaultMode = existingModes.find(
    (m) => m.name === MODE_NAMES.DEFAULT
  );

  // If it's the default mode, update or rename it
  if (isDefault && defaultMode) {
    return {
      action: "UPDATE",
      id: defaultMode.modeId,
      name: mode.name, // Rename or update "Default" mode to the target name
      variableCollectionId: collectionId,
    };
  }

  // If the mode does not exist, create it
  if (!existingMode) {
    return {
      action: "CREATE",
      id: generateTempModeId(
        mode.name,
        targetCollectionName
      ),
      name: mode.name, // Create the mode with the target name
      variableCollectionId: collectionId,
    };
  }

  // If the mode exists, update it
  return {
    action: "UPDATE",
    id: existingMode.modeId,
    name: mode.name, // Update the mode with the correct name
    variableCollectionId: collectionId,
  };
}

export async function updateOrCreateVariables({
  variable,
  targetCollectionName,
  existingVariables,
  existingCollections,
}) {
  const collectionId = Object.values(
    existingCollections
  ).find(
    (collection) =>
      collection.name === targetCollectionName
  ).id;

  //If exists retrieve the variable id
  const existingVariable = Object.values(
    existingVariables
  ).find(
    (v) =>
      v.name === variable.name &&
      v.variableCollectionId === collectionId
  );

  const tempId = `tempId_${targetCollectionName}_${variable.name}`;

  //Retrieve the variableCollectionId with the targetCollectionName

  if (!existingVariable) {
    // Create new variable
    return {
      action: "CREATE",
      id: tempId,
      name: variable.name,
      variableCollectionId: collectionId,
      resolvedType: variable.resolvedType,
      scopes: variable.scopes,
    };
  } else {
    // Update existing variable
    return {
      action: "UPDATE",
      id: existingVariable.id,
      name: variable.name,
      variableCollectionId: collectionId,
      resolvedType: variable.resolvedType,
      scopes: variable.scopes,
    };
  }
}

export async function updateOrCreateVariableModeValues({
  variable,
  targetModeName,
  targetCollectionName,
  existingCollections,
  existingVariables,
}) {
  // Find the mode for the given modeName, or use tempId if mode is being created

  const targetCollection = Object.values(
    existingCollections
  ).find(
    (collection) =>
      collection.name === targetCollectionName
  );

  if (!targetCollection) {
    console.warn(
      `Collection ${targetCollectionName} not found.`
    );
    return;
  }

  // Now access the modes from the found collection
  const existingModes =
    targetCollection.modes.find(
      (m) => m.name === targetModeName
    );

  const modeId = existingModes
    ? existingModes.modeId
    : generateTempModeId(
        targetModeName,
        targetCollectionName
      );

  if (!modeId) {
    console.warn(
      `Mode ${targetModeName} not found and no tempId provided.`
    );
    return;
  }

  const collectionId = Object.values(
    existingCollections
  ).find(
    (collection) =>
      collection.name === targetCollectionName
  )?.id;

  // Retrieve the variable id if exists
  const existingVariable = Object.values(
    existingVariables
  ).find(
    (v) =>
      v.name === variable.name &&
      v.variableCollectionId === collectionId
  );

  const tempId = `tempId_${targetCollectionName}_${variable.name}`;

  return {
    action: existingVariable
      ? "UPDATE"
      : "CREATE",
    variableId: existingVariable
      ? existingVariable.id
      : tempId, // Use existing variable ID or a temp one
    modeId: modeId,
    value: variable.hasAlias
      ? {
          type: "VARIABLE_ALIAS",
          id: variable.value,
        }
      : variable.value,
  };
}
