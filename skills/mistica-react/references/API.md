# API

This document guides agents on programmatic usage of the Mística library in React.

## 1. Install

# Yarn

```bash
yarn add @telefonica/mistica
```

# npm

```bash
npm install @telefonica/mistica
```

Import components and styles:

```tsx
import "@telefonica/mistica/css/mistica.css";
import {
  ThemeContextProvider,
  Form,
  Box,
  Stack,
  TextField,
  EmailField,
  ButtonLayout,
  ButtonPrimary,
  alert,
  getMovistarSkin,
} from "@telefonica/mistica";

const App = () => (
  <Form
    onSubmit={(formData) =>
      alert({
        title: "This is your data",
        message: JSON.stringify(formData, null, 2),
      })
    }
  >
    {" "}
    <Box padding={16}>
      {" "}
      <Stack space={16}>
        {" "}
        <TextField name="name" label="Name" />{" "}
        <EmailField name="email" label="Email" />{" "}
        <ButtonLayout
          primaryButton={<ButtonPrimary submit>Send</ButtonPrimary>}
        />{" "}
      </Stack>{" "}
    </Box>{" "}
  </Form>
);
```

## 2. Theme Setup (Mandatory)

Wrap your app with `<ThemeContextProvider>;`:

```tsx
const misticaTheme = {
  skin: getMovistarSkin(),
  i18n: { locale: "es-ES", phoneNumberFormattingRegionCode: "ES" },
};

<ThemeContextProvider theme={misticaTheme}>
  <App />
</ThemeContextProvider>;
```

Mandatory fields: skin and i18n

Extract outside component if static; use React.useMemo if dynamic

## 3. Helper functions:

`alert({title, message})` → shows an alert

`getMovistarSkin()` → returns default brand skin

## 4. Next.js

If using Next.js App Router:

`experimental: { optimizePackageImports: ['@telefonica/mistica'] }`
Improves tree shaking, reduces bundle size, speeds up builds

## Slots

Some components allow the use of slots (`slot`, `extra` `sideExtra`...), these slots enable inseting custom content

```tsx
<DataCard title="Title" description="description" slot={customContent} />
<HeaderLayout
  header={<Header title="Title" />}
  extra={<Placeholder />}
/>
<CoverHero
  backgroundImage="https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
  title="Title"
  button={<ButtonPrimary fake>Lo quiero</ButtonPrimary>}
  extra={<Placeholder />}
  sideExtra={<Placeholder />}
/>
```
