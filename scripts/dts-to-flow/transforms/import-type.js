const types = [
    'AutoComplete',
    'ButtonElement',
    'CardOptions',
    'ClickOptions',
    'CommonFormFieldProps',
    'ElementHandle',
    'ElementHandle',
    'FieldValidator',
    'FormCreditCardExpirationFieldProps',
    'FormCvvFieldProps',
    'FormDateFieldProps',
    'FormDateFieldProps',
    'FormDecimalFieldProps',
    'FormDecimalFieldProps',
    'FormEmailFieldProps',
    'FormEmailFieldProps',
    'FormIntegerFieldProps',
    'FormIntegerFieldProps',
    'FormPasswordFieldProps',
    'FormPasswordFieldProps',
    'FormPhoneNumberFieldProps',
    'FormPhoneNumberFieldProps',
    'FormSelectProps',
    'FormTextFieldProps',
    'Locale',
    'Location',
    'Page',
    'PhoneInputType',
    'RegionCode',
    'ScreenshotOptions',
    'ScreenSizeContextType',
    'SelectProps',
    'Skin',
    'TextFieldProps',
    'TextProps',
    'Theme',
    'ThemeConfig',
    'TrackingEvent',
];

/**
 * This codemod adds "type" to selected imports
 *
 * https://astexplorer.net/#/gist/46d90ec7ab0f17eafa5bfcc61b963731/d2b6ce4f7c8e951bc18ddcabb988d4c122cb9a08
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.ImportSpecifier)
        .forEach((path) => {
            if (types.includes(path.node.imported.name)) {
                path.node.importKind = 'type';
            }
        })
        .toSource();
};

module.exports.parser = 'flow';
