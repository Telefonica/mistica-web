# Analytics

`@telefonica/mistica` comes with built in support for tracking to any analytics system (for example Google
Analytics).

Some components, like buttons, come with a special `trackingEvent` prop. Every time that the button is
pressed, an event is tracked with the data provided to the `trackingEvent` prop. This type is defined by the
[webview-bridge](https://github.com/Telefonica/webview-bridge). **At the time of writing this documentation**,
this is the type of a tracking event:

```ts
type TrackingEvent = Readonly<{
  category: string;
  action: string;
  label?: string;
  value?: number;
  screenName?: string;
  [key: string]: any;
}>;
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

## Default tracking events

Some components, like `Button` or `TextLink` have default tracking event that you can opt in to use.

Instead of:

```ts
<ButtonPrimary
  to="/dashboard"
  trackingEvent={{
    category: 'user_interaction',
    action: 'primary_button_tapped',
    label: 'Go to dashboard',
  }}
>
  Go to dashboard
</ButtonPrimary>
```

you can just write:

```ts
<ButtonPrimary to="/dashboard" trackEvent>
  Go to dashboard
</ButtonPrimary>
```

Take into account that you need to set the `trackEvent` boolean prop, if you don't set it the button won't
track any event.

## Firebase / Google Analytics 4 events

Firebase and the new Google Analytics 4 events have a different shape. Instead of `category`, `action`,
`label` and `value`, you only need a mandatory `name` and any number of optional attributes. For example:

```ts
{
  name: 'user_interaction',
  component_type: 'row',
}
```

You can use this event format with mistica components too, but you need to change the
`theme.analytics.eventFormat` config:

```ts
  analytics: {
    eventFormat: 'google-analytics-4'
    logEvent(event) {
      // do something
    },
  }
```

`eventFormat` can be `'google-analytics-4'` or `'universal-analytics'` (default).

When you set the `eventFormat` to `'google-analytics-4'` and use the
[`trackEvent` boolean prop](#default-tracking-events), the tracked event will have this form:

```ts
{
  name: 'user_interaction',
  component_type: 'primary_button', // or the corresponding button type
  component_copy: '<the button copy>',
}
```
