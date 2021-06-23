# Customizable texts

Some components use some default texts that you can customize using [`theme` prop](./theme-config.md)

These are the customizable texts and their default values:

- `expirationDatePlaceholder`: `'MM/AA'`
- `togglePasswordVisibilityLabel`: `'Mostrar u ocultar contraseña'`
- `loading`: `'Cargando'`
- `linkOpensInNewTab`: `'Se abre en ventana nueva'`
- `modalClose`: `'Cerrar'`
- `dialogCancelButton`: `'Cancelar'`
- `dialogAcceptButton`: `'Aceptar'`
- `formFieldOptionalLabelSuffix`: `'opcional'`
- `formFieldErrorIsMandatory`: `'Este campo es obligatorio'`
- `formCreditCardNumberLabel`: `'Número de tarjeta'`
- `formCreditCardExpirationLabel`: `'Caducidad'`
- `formCreditCardCvvLabel`: `'CVV'`
- `formCreditCardCvvError`: `'CVV incorrecto'`
- `formCreditCardCvvTooltipVisaMcButton`: `'Mostrar ayuda CVV'`
- `formCreditCardCvvTooltipVisaMc`: `'El CVV son los 3 últimos dígitos del reverso de tu tarjeta'`
- `formCreditCardCvvTooltipAmex`: `'Si es American Express, añade los 4 dígitos del anverso'`
- `formCreditCardExpirationError`: `'Fecha no válida'`
- `formCreditCardNumberError`: `'No es un número de tarjeta válido'`
- `formEmailError`: `'Email incorrecto'`
- `closeButtonLabel`: `'Cerrar'`

You can customize them in your page. For example:

```js
<ThemeContextProvider
  theme={{
    skin: 'Movistar',
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    texts: {
      formCreditCardExpirationError: 'Fecha incorrecta',
      // ...
    },
  }}
>
  <App />
</ThemeContextProvider>
```

If your application supports multi language, you may need to override all the texts and use localized
translation tokens depending on your user preferred language.
