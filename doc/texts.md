# Customizable texts

Some components use some default texts that you can customize using [`theme` prop](./theme-config.md)

You can customize them in your page. For example:

```tsx
<ThemeContextProvider
  theme={{
    skin: getMovistarSkin(),
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

See the `Dictionary` type to known all the available texts.

If your application supports multi language, you may need to override all the texts and use localized
translation tokens depending on your user preferred language.

## Using Mística text tokens

You can use Mística tokens in your texts. The translate function `t` will translate the token using the
configured locale in the `ThemeContextProvider`.

Example:

```tsx
import {textTokens} from '@telefonica/mistica';

const MyComponent = () => {
  const {t} = useTheme();

  return <div>{t(textTokens.formCreditCardExpirationError)}</div>;
};
```
