# Analytics

`@telefonica/mistica` comes with built in support for tracking to any analytics system (for example Google
Analytics).

Some components, like buttons, come with a special `trackingEvent` prop. Every time that the button is
pressed, an event is tracked with the data provided to the `trackingEvent` prop. This is the type of a
tracking event:

```js
type TrackingEvent = {
  category: string,
  action: string,
  label?: string,
  value?: number,
  ...
};
```

And here is an axample of a button with a tracking event:

```js
<ButtonPrimary
  href="/checkout"
  trackingEvent={{
    category: 'checkout',
    action: 'button_pressed',
  }}
>
  Comprar
</ButtonPrimary>
```

By default `@telefonica/mistica` won't do anything with that `trackingEvent`, but you setup the lib to call
your analytics system by setting up the `analytics` field in the [`theme` prop](./theme-config.md):

```js
<ThemeContextProvider
  theme={{
    skin: 'Movistar',
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    analytics: {
      // this function is called every time a button with trackingEvent is pressed
      logEvent(event: TrackingEvent): Promise<void> {
        const logFinished = yourAnalyticsSystem(event);
        // you can return a promise here and the lib will wait for the promise to
        // resolve before navigating to a diferent page.
        return logFinished;
      },
    },
  }}
>
  <App />
</ThemeContextProvider>
```
