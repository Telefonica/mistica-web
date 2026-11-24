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

Set `theme.analytics.trackEventsByDefault` to `true` in `ThemeContextProvider` to enable default events for
all components that support `trackEvent`. The setting defaults to `false`, so each component normally opts in
with `trackEvent`. Set `trackEvent={false}` on a component to suppress its default event. A custom
`trackingEvent` always takes precedence.

The following components support `trackEvent` and `theme.analytics.trackEventsByDefault`. Each event uses the
corresponding GA4 `component_type` and event copy described below.

- `ButtonPrimary`, `ButtonSecondary` and `ButtonDanger` track button presses with the corresponding
  `primary_button`, `secondary_button` or `danger_button` type and the button text.
- `ButtonLink` and `TextLink` track link presses with the `link` type (or the corresponding `ButtonLink`
  variant) and the link text.
- `IconButton` and `ToggleIconButton` track icon presses with the `icon` type and the current `aria-label` or
  text referenced by `aria-labelledby`.
- `Row` and `BoxedRow` track presses on their link or button with the `row` type and the row title.
- `Tabs` tracks tab presses with the `tab` type and the tab text.
- `AccordionItem` and `BoxedAccordionItem` track header presses to expand or collapse with the `accordion`
  type and the item title.
- `DataCard`, `MediaCard`, `CoverCard`, `NakedCard` and community `AdvancedDataCard` track presses on their
  link or button with the `card` type and the title, falling back to the pretitle and then `not_apply`.
- `Popover` tracks close button presses with the `icon` type and the close button label.
- `Touchable` generates `link` events when using `href` or `to`, and `button` events for `onPress`, using
  `aria-label`, text referenced by `aria-labelledby` or its text children as the event copy. Use
  `trackingComponentType` and `trackingComponentCopy` to override these values for a custom component.

For these new events, Universal Analytics uses `category: 'user_interaction'`,
`action: '<component_type>_tapped'` and `label` containing the event copy. GA4 uses
`name: 'user_interaction'`, `component_type` and `component_copy`.

For `Tabs`, set `trackEvent` on each entry in the `tabs` array. For an accordion, set it on the item. Card top
actions and a row's `iconButton` accept their own `trackEvent` setting. Buttons inside `Drawer`,
`ActionsSheet` and cards inherit the behavior of their corresponding button component.

Custom `trackingEvent` values, including event arrays, take precedence even when `trackEvent={false}`. An
empty array suppresses all events for that interaction. Row and card content events apply to their link or
button interactions.

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

When you set `eventFormat` to `'google-analytics-4'` and enable [default tracking](#default-tracking-events),
the tracked event will have this form:

```ts
{
  name: 'user_interaction',
  component_type: 'primary_button', // or the corresponding button type
  component_copy: '<the button copy>',
}
```

### TrackingConfig

You can also define an `eventFormat` for a specific part of your app, using the `TrackingConfig` context
provider:

```ts
<SomeComponent/>

<TrackingConfig eventFormat="google-analytics-4">
    <AnotherComponent/> // this will track using GA4 format
</TrackingConfig>

<SomeOtherComponent/>
```

A hook to obtain the tracking config is also available:

```ts
const {eventFormat} = useTrackingConfig();
```
