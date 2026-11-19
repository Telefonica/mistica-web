import * as fs from 'node:fs';
import * as path from 'node:path';
import {Validator} from 'jsonschema';

/**
 * Validates the token files against the skin schema of the same mistica-design checkout, so a token file
 * that doesn't follow the schema stops the generation before any file is written.
 *
 * It uses the same library and options as the skin validator workflow of mistica-design, so a token file
 * passes here only if it passes there.
 *
 * @param tokensFolder - the tokens folder of mistica-design, which contains schema/skin-schema.json
 * @param tokenFiles - paths of the token files to validate
 *
 * @example
 * validateTokenFiles('/path/to/mistica-design/tokens', ['/path/to/mistica-design/tokens/movistar.json']);
 * // throws: Design tokens do not match .../skin-schema.json:
 * //   movistar.json: instance.light requires property "background"
 */
export const validateTokenFiles = (tokensFolder: string, tokenFiles: Array<string>): void => {
    const schemaPath = path.join(tokensFolder, 'schema', 'skin-schema.json');
    if (!fs.existsSync(schemaPath)) {
        throw new Error(`Missing ${schemaPath}. Run with --skip-validation to generate without it.`);
    }

    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validator = new Validator();

    const errors = tokenFiles.flatMap((tokenFile) => {
        const result = validator.validate(JSON.parse(fs.readFileSync(tokenFile, 'utf8')), schema);
        const fileName = path.relative(tokensFolder, tokenFile);
        return result.errors.map((error) => `  ${fileName}: ${error.stack}`);
    });

    if (errors.length > 0) {
        throw new Error(
            `Design tokens do not match ${schemaPath}:\n${errors.join('\n')}\n` +
                'Run with --skip-validation to generate anyway.'
        );
    }
};
