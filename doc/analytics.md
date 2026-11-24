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

The following components support `trackEvent` and `theme.analytics.trackEventsByDefault`:

`Touchable` also supports these settings. It generates `link` events when using `href` or `to`, and `button`
events for `onPress`, using `aria-label` or its text children as the event copy.

| Component                                                                       | Tracked interaction                | GA4 `component_type`                                  | Event copy                                                   |
| ------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `ButtonPrimary`, `ButtonSecondary`, `ButtonDanger`                              | Button press                       | `primary_button`, `secondary_button`, `danger_button` | Button text                                                  |
| `ButtonLink` and `TextLink`                                                     | Link press                         | `link` (or the corresponding `ButtonLink` variant)    | Link text                                                    |
| `IconButton`, `ToggleIconButton`                                                | Icon press                         | `icon`                                                | Current `aria-label` or text referenced by `aria-labelledby` |
| `Row`, `BoxedRow`                                                               | Press on the row's link or button  | `row`                                                 | Row title                                                    |
| `Tabs`                                                                          | Tab press                          | `tab`                                                 | Tab text                                                     |
| `AccordionItem`, `BoxedAccordionItem`                                           | Header press to expand or collapse | `accordion`                                           | Item title                                                   |
| `DataCard`, `MediaCard`, `CoverCard`, `NakedCard`, community `AdvancedDataCard` | Press on the card's link or button | `card`                                                | Title, falling back to pretitle                              |
| `Popover`                                                                       | Close button press                 | `icon`                                                | Close button label                                           |

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
