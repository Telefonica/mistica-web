import fs from "fs";
import path from "path";
import hexToRgba from "./hex-to-rgba.mjs";

export const extractSkinJsonData = (
  jsonFiles,
  directoryPath
) => {
  const allParsedContent = {}; // Initialize once to store all parsed content

  // First pass to gather allParsedContent
  jsonFiles.forEach((file) => {
    const filePath = path.resolve(
      directoryPath,
      file
    );
    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );
    const parsedContent = JSON.parse(fileContent);

    // Extract file name without extension to use as a key
    const fileName = file.split(".")[0];

    // Store the parsed content in the allParsedContent object
    allParsedContent[fileName] = parsedContent;
  });

  // Second pass to process each file
  return jsonFiles.reduce((accumulator, file) => {
    const filePath = path.resolve(
      directoryPath,
      file
    );
    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );
    const parsedContent = JSON.parse(fileContent);

    // Extract file name without extension
    const fileName = file.split(".")[0];

    function processColors(
      parsedContent,
      theme,
      allParsedContent
    ) {
      if (!["light", "dark"].includes(theme)) {
        throw new Error(
          `Invalid theme: ${theme}. Expected 'light' or 'dark'.`
        );
      }

      const themeColors = parsedContent[theme];

      function getPaletteName(value) {
        const regexMatch = value.match(
          /{palette\.(.*?)}/
        );
        if (regexMatch) {
          return regexMatch[1];
        }
        const rgbaMatch = value.match(
          /rgba\(\{palette\.(.*?)\},\s*\d*\.?\d*\)/
        );
        if (rgbaMatch) {
          return rgbaMatch[1];
        }
        throw new Error(
          `Unexpected color format: ${value}`
        );
      }

      function getPaletteValue(colorName) {
        const paletteValue =
          parsedContent.global.palette[colorName]
            ?.value;
        if (!paletteValue) {
          throw new Error(
            `Color ${colorName} not found in palette`
          );
        }
        return paletteValue;
      }

      function getMaxStopsAcrossBrands(
        allParsedContent,
        key,
        theme
      ) {
        let maxStops = 0;
        let isGradientInAnyBrand = false;

        Object.values(allParsedContent).forEach(
          (content) => {
            const colors = content[theme][key];
            if (
              colors &&
              colors.type === "linear-gradient"
            ) {
              isGradientInAnyBrand = true;
              maxStops = Math.max(
                maxStops,
                colors.value.colors.length
              );
            }
          }
        );

        return { maxStops, isGradientInAnyBrand };
      }

      return Object.keys(themeColors).flatMap(
        (key) => {
          const colorData = themeColors[key];
          const { value, type } = colorData;

          const {
            maxStops,
            isGradientInAnyBrand,
          } = getMaxStopsAcrossBrands(
            allParsedContent,
            key,
            theme
          );

          // Handle gradients first
          if (
            type === "linear-gradient" &&
            typeof value === "object"
          ) {
            // Map colors in gradient
            return Array.from(
              { length: maxStops },
              (_, index) => {
                if (index < value.colors.length) {
                  // Use the actual gradient stop color
                  const color =
                    value.colors[index];
                  const alphaMatch =
                    color.value.match(
                      /rgba\([^)]+,\s*([^)]+)\)/
                    );
                  const alpha = alphaMatch
                    ? alphaMatch[1]
                    : "1";
                  const baseColorName =
                    getPaletteName(color.value);

                  return alpha === "1"
                    ? {
                        name: `${theme}/${key}-stop-${
                          index + 1
                        }`,
                        value: baseColorName,
                        hasAlias: true,
                      }
                    : {
                        name: `${theme}/${key}-stop-${
                          index + 1
                        }`,
                        value: hexToRgba(
                          getPaletteValue(
                            baseColorName
                          ),
                          parseFloat(alpha)
                        ),
                        hasAlias: false,
                      };
                } else if (isGradientInAnyBrand) {
                  // If this brand does not have a gradient, repeat the base color to match stops
                  const baseColorName =
                    getPaletteName(
                      value.colors[0].value
                    );
                  return {
                    name: `${theme}/${key}-stop-${
                      index + 1
                    }`,
                    value: hexToRgba(
                      getPaletteValue(
                        baseColorName
                      )
                    ),
                    hasAlias: false,
                  };
                }
              }
            ).filter(Boolean);
          }

          // Handle solid colors or aliases when a gradient exists in other brands
          if (
            type !== "linear-gradient" &&
            isGradientInAnyBrand
          ) {
            const baseColorName =
              getPaletteName(value);
            // Repeat the solid color to match the gradient stops
            return Array.from(
              { length: maxStops },
              (_, index) => ({
                name: `${theme}/${key}-stop-${
                  index + 1
                }`,
                value: hexToRgba(
                  getPaletteValue(baseColorName)
                ),
                hasAlias: false,
              })
            );
          }

          // Handle solid colors or aliases normally
          if (
            typeof value === "string" &&
            !value.startsWith("rgba")
          ) {
            const baseColorName =
              getPaletteName(value);

            return {
              name: `${theme}/${key}`,
              value: hexToRgba(
                getPaletteValue(baseColorName)
              ),

              hasAlias: true,
            };
          }

          // Handle rgba colors
          if (
            typeof value === "string" &&
            value.startsWith("rgba")
          ) {
            const alphaMatch = value.match(
              /rgba\([^)]+,\s*([^)]+)\)/
            );
            const alpha = alphaMatch
              ? alphaMatch[1]
              : "1";
            const baseColorName =
              getPaletteName(value);

            return alpha === "1"
              ? {
                  name: `${theme}/${key}`,
                  value: baseColorName,
                  hasAlias: true,
                }
              : {
                  name: `${theme}/${key}`,
                  value: hexToRgba(
                    getPaletteValue(
                      baseColorName
                    ),
                    parseFloat(alpha)
                  ),
                  hasAlias: false,
                };
          }

          throw new Error(
            `Unexpected color format for key: ${key}`
          );
        }
      );
    }

    // Other token processing logic
    const paletteArray = Object.keys(
      parsedContent.global.palette
    ).map((key) => ({
      name: key,
      value: hexToRgba(
        parsedContent.global.palette[key].value
      ),
    }));

    const radiusArray = Object.keys(
      parsedContent.radius
    ).map((key) => ({
      name: key,
      value:
        typeof parsedContent.radius[key].value ===
        "string"
          ? parsedContent.radius[key].value ===
            "circle"
            ? 999 // If the value is "circle", set it to 999
            : parseFloat(
                parsedContent.radius[key].value
              ) // Otherwise, convert it to a float
          : parsedContent.radius[key].value, // If it's not a string, use the original value
    }));

    const fontWeightArray = Object.keys(
      parsedContent.text.weight
    ).map((key) => ({
      name: key,
      value: parsedContent.text.weight[key].value,
    }));

    const fontSizeArray = Object.keys(
      parsedContent.text.size
    ).flatMap((key) => {
      const value =
        parsedContent.text.size[key].value;

      // Check if the value is an object with mobile and desktop properties
      if (
        typeof value === "object" &&
        value !== null
      ) {
        return [
          {
            name: `mobile/${key}`,
            value: parseFloat(value.mobile),
          },
          {
            name: `desktop/${key}`,
            value: parseFloat(value.desktop),
          },
        ];
      }

      // If value is not an object, return a single entry
      return {
        name: key,
        value: parseFloat(value),
      };
    });

    const lineHeightArray = Object.keys(
      parsedContent.text.lineHeight
    ).flatMap((key) => {
      const value =
        parsedContent.text.lineHeight[key].value;

      // Check if the value is an object with mobile and desktop properties
      if (
        typeof value === "object" &&
        value !== null
      ) {
        return [
          {
            name: `mobile/${key}`,
            value: parseFloat(value.mobile),
          },
          {
            name: `desktop/${key}`,
            value: parseFloat(value.desktop),
          },
        ];
      }

      // If value is not an object, return a single entry
      return {
        name: key,
        value: parseFloat(value),
      };
    });

    // Accumulate results
    accumulator[fileName] = {
      light: processColors(
        parsedContent,
        "light",
        allParsedContent
      ),
      dark: processColors(
        parsedContent,
        "dark",
        allParsedContent
      ),
      palette: paletteArray,
      radius: radiusArray,
      fontWeight: fontWeightArray,
      fontSize: fontSizeArray,
      lineHeight: lineHeightArray,
    };

    return accumulator;
  }, {});
};

export const extractMiddlewareJsonData = (
  jsonFiles,
  directoryPath
) => {
  const allParsedContent = {}; // Initialize once to store all parsed content

  // First pass to gather allParsedContent
  jsonFiles.forEach((file) => {
    const filePath = path.resolve(
      directoryPath,
      file
    );
    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );
    const parsedContent = JSON.parse(fileContent);

    // Extract file name without extension to use as a key
    const fileName = file.split(".")[0];

    // Store the parsed content in the allParsedContent object
    allParsedContent[fileName] = parsedContent;
  });

  // Second pass to process each file
  return jsonFiles.reduce((accumulator, file) => {
    const filePath = path.resolve(
      directoryPath,
      file
    );
    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );
    const parsedContent = JSON.parse(fileContent);

    // Extract file name without extension
    const fileName = file.split(".")[0];

    function processColors(
      parsedContent,
      theme,
      allParsedContent
    ) {
      if (!["light", "dark"].includes(theme)) {
        throw new Error(
          `Invalid theme: ${theme}. Expected 'light' or 'dark'.`
        );
      }

      const themeColors = parsedContent[theme];

      function getPaletteName(value) {
        const regexMatch = value.match(
          /{palette\.(.*?)}/
        );
        if (regexMatch) {
          return regexMatch[1];
        }
        const rgbaMatch = value.match(
          /rgba\(\{palette\.(.*?)\},\s*\d*\.?\d*\)/
        );
        if (rgbaMatch) {
          return rgbaMatch[1];
        }
        throw new Error(
          `Unexpected color format: ${value}`
        );
      }

      function getPaletteValue(colorName) {
        const paletteValue =
          parsedContent.global.palette[colorName]
            ?.value;
        if (!paletteValue) {
          throw new Error(
            `Color ${colorName} not found in palette`
          );
        }
        return paletteValue;
      }

      function getMaxStopsAcrossBrands(
        allParsedContent,
        key
      ) {
        let maxStops = 0;
        let isGradientInAnyBrand = false;

        // Loop through each brand
        Object.values(allParsedContent).forEach(
          (content) => {
            // Check both 'light' and 'dark' themes
            ["light", "dark"].forEach((theme) => {
              const colors =
                content[theme]?.[key];
              if (
                colors &&
                colors.type === "linear-gradient"
              ) {
                isGradientInAnyBrand = true;
                maxStops = Math.max(
                  maxStops,
                  colors.value.colors.length
                );
              }
            });
          }
        );

        return { maxStops, isGradientInAnyBrand };
      }

      return Object.keys(themeColors).flatMap(
        (key) => {
          const colorData = themeColors[key];
          const { value, type } = colorData;

          const {
            maxStops,
            isGradientInAnyBrand,
          } = getMaxStopsAcrossBrands(
            allParsedContent,
            key,
            theme
          );

          // Handle gradients first
          if (
            type === "linear-gradient" &&
            typeof value === "object"
          ) {
            // Map colors in gradient
            return Array.from(
              { length: maxStops },
              (_, index) => {
                if (index < value.colors.length) {
                  // Use the actual gradient stop color
                  const color =
                    value.colors[index];
                  const alphaMatch =
                    color.value.match(
                      /rgba\([^)]+,\s*([^)]+)\)/
                    );
                  const alpha = alphaMatch
                    ? alphaMatch[1]
                    : "1";
                  const baseColorName =
                    getPaletteName(color.value);

                  return alpha === "1"
                    ? {
                        name: `${key}-stop-${
                          index + 1
                        }`,
                        value: hexToRgba(
                          getPaletteValue(
                            baseColorName
                          ),
                          parseFloat(alpha)
                        ),
                        hasAlias: true,
                        description:
                          baseColorName,
                      }
                    : {
                        name: `${key}-stop-${
                          index + 1
                        }`,
                        value: hexToRgba(
                          getPaletteValue(
                            baseColorName
                          ),
                          parseFloat(alpha)
                        ),
                        hasAlias: false,
                        description:
                          baseColorName,
                      };
                } else if (isGradientInAnyBrand) {
                  // If this brand does not have a gradient, repeat the base color to match stops
                  const baseColorName =
                    getPaletteName(
                      value.colors[0].value
                    );
                  const alpha = 1;
                  return {
                    name: `${key}-stop-${
                      index + 1
                    }`,
                    value: hexToRgba(
                      getPaletteValue(
                        baseColorName
                      ),
                      parseFloat(alpha)
                    ),

                    hasAlias: false,
                    description: baseColorName,
                  };
                }
              }
            ).filter(Boolean);
          }

          // Handle solid colors or aliases when a gradient exists in other brands
          if (
            type !== "linear-gradient" &&
            isGradientInAnyBrand
          ) {
            const baseColorName =
              getPaletteName(value);
            const alpha = 1;
            // Repeat the solid color to match the gradient stops
            return Array.from(
              { length: maxStops },
              (_, index) => ({
                name: `${key}-stop-${index + 1}`,
                value: hexToRgba(
                  getPaletteValue(baseColorName),
                  parseFloat(alpha)
                ),
                hasAlias: false,
                description: baseColorName,
              })
            );
          }

          // Handle solid colors or aliases normally
          if (
            typeof value === "string" &&
            !value.startsWith("rgba")
          ) {
            const baseColorName =
              getPaletteName(value);
            const alpha = 1;
            return {
              name: `${key}`,
              value: hexToRgba(
                getPaletteValue(baseColorName),
                parseFloat(alpha)
              ),

              hasAlias: true,
              description: baseColorName,
            };
          }

          // Handle rgba colors
          if (
            typeof value === "string" &&
            value.startsWith("rgba")
          ) {
            const alphaMatch = value.match(
              /rgba\([^)]+,\s*([^)]+)\)/
            );
            const alpha = alphaMatch
              ? alphaMatch[1]
              : "1";
            const baseColorName =
              getPaletteName(value);

            return alpha === "1"
              ? {
                  name: `${key}`,
                  value: baseColorName,
                  hasAlias: true,
                  description: baseColorName,
                }
              : {
                  name: `${key}`,
                  value: hexToRgba(
                    getPaletteValue(
                      baseColorName
                    ),
                    parseFloat(alpha)
                  ),
                  hasAlias: false,
                  description: baseColorName,
                };
          }

          throw new Error(
            `Unexpected color format for key: ${key}`
          );
        }
      );
    }

    // Other token processing logic
    const paletteArray = Object.keys(
      parsedContent.global.palette
    ).map((key) => ({
      name: key,
      value: hexToRgba(
        parsedContent.global.palette[key].value
      ),
    }));

    const radiusArray = Object.keys(
      parsedContent.radius
    ).map((key) => ({
      name: `radii/${key}`,
      value:
        typeof parsedContent.radius[key].value ===
        "string"
          ? parsedContent.radius[key].value ===
            "circle"
            ? 999 // If the value is "circle", set it to 999
            : parseFloat(
                parsedContent.radius[key].value
              ) // Otherwise, convert it to a float
          : parsedContent.radius[key].value, // If it's not a string, use the original value
    }));

    const fontWeightArray = Object.keys(
      parsedContent.text.weight
    ).map((key) => ({
      name: `fontWeight/${key}`,
      value: parsedContent.text.weight[key].value,
    }));

    const fontSizeArray = Object.keys(
      parsedContent.text.size
    ).flatMap((key) => {
      const value =
        parsedContent.text.size[key].value;

      // Check if the value is an object with mobile and desktop properties
      if (
        typeof value === "object" &&
        value !== null
      ) {
        return [
          {
            name: `fontSize/mobile/${key}`,
            value: parseFloat(value.mobile),
          },
          {
            name: `fontSize/desktop/${key}`,
            value: parseFloat(value.desktop),
          },
        ];
      }

      // If value is not an object, return a single entry
      return {
        name: key,
        value: parseFloat(value),
      };
    });

    const lineHeightArray = Object.keys(
      parsedContent.text.lineHeight
    ).flatMap((key) => {
      const value =
        parsedContent.text.lineHeight[key].value;

      // Check if the value is an object with mobile and desktop properties
      if (
        typeof value === "object" &&
        value !== null
      ) {
        return [
          {
            name: `lineHeight/mobile/${key}`,
            value: parseFloat(value.mobile),
          },
          {
            name: `lineHeight/desktop/${key}`,
            value: parseFloat(value.desktop),
          },
        ];
      }

      // If value is not an object, return a single entry
      return {
        name: key,
        value: parseFloat(value),
      };
    });

    const themeVariantArray = Object.keys(
      parsedContent.themeVariant
    ).map((key) => ({
      name: `themeVariant/${key}`,
      value:
        parsedContent.themeVariant[key].value,
    }));

    // Accumulate results
    accumulator[fileName] = {
      light: processColors(
        parsedContent,
        "light",
        allParsedContent
      ),
      dark: processColors(
        parsedContent,
        "dark",
        allParsedContent
      ),
      palette: paletteArray,
      radius: radiusArray,
      fontWeight: fontWeightArray,
      fontSize: fontSizeArray,
      lineHeight: lineHeightArray,
      themeVariant: themeVariantArray,
    };

    return accumulator;
  }, {});
};
