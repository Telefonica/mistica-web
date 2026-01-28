# Sheet

Mística provides a sheet component that can be used to display a modal-like content from over the main content
of the screen.

## Predefined sheets

Some predefined sheets are available: `RadioListSheet`, `ActionsListSheet`, `InfoSheet` and `ActionsSheet`.
You can see examples in Storybook.

To use them, first you must configure the `SheetRoot` component in your app:

```jsx
import {SheetRoot} from '@telefonica/mistica';

export const App = () => {
  return (
    <SheetRoot>
      <MyApplication />
    </SheetRoot>
  );
};
```

Then you can call `showSheet` from anywhere:

```jsx
import {showSheet} from '@telefonica/mistica';

const MyComponent = () => {
  return (
    <ButtonPrimary
      onPress={() =>
        showSheet({
          type: 'RADIO_LIST',
          props: {
            title: 'Select an fruit',
            items: [
              {id: '1', title: 'Apple'},
              {id: '2', title: 'Banana'},
              {id: '3', title: 'Orange'},
            ],
          },
        }).then((result) => {
          // The promise is resolved when the sheet is closed
          console.log(result);
        })
      }
    >
      show sheet
    </ButtonPrimary>
  );
};
```

### Native implementation

If your app is served inside a webview and uses the `webview-bridge` library, the native implementation of the
predefined sheets will be used.

```tsx
import {bottomSheet, isWebViewBridgeAvailable} from '@tef-novum/webview-bridge';

// ...

<SheetRoot nativeImplementation={isWebViewBridgeAvailable() ? bottomSheet : undefined}>
```

When possible, always use the native implementation, as it provides a better user experience.

## Custom sheets

You can show any content you want inside the sheet by passing it as a child of the component.

```jsx
import {Sheet} from 'mistica';

const MyComponent = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <>
      <ButtonPrimary onPress={() => setShowSheet(true)}>show sheet</ButtonPrimary>
      {showSheet && (
        <Sheet onClose={() => setShowSheet(false)}>
          <Placeholder />
        </Sheet>
      )}
    </>
  );
};
```

The sheet will close when the user does the swipe down gesture, when the background overlay is touched, or by
using the visible dismiss button (close icon) that appears in the top-right corner aligned with the title. The
`onClose` callback is called when the closing animation finishes, that's the right place to unmount the sheet
as shown in the example above.

### Dismiss button

When using the predefined sheets (`RadioListSheet`, `ActionsListSheet`, `InfoSheet`, `ActionsSheet`) or the
`SheetBody` component with a title, a visible dismiss button (close icon) is automatically shown in the
top-right corner, aligned with the title. The dismiss button is accessible via keyboard navigation and
includes proper ARIA labels for screen readers, using the translation token `modalClose` (defaults to "Cerrar"
in Spanish or "Close" in English).

The dismiss button is positioned using a flex layout with `justifyContent: space-between` to ensure it's
always aligned with the title on both mobile and desktop screens. It uses the `InternalIconButton` component
which provides built-in keyboard support (Tab navigation, Enter/Space activation).

You can also close the sheet programmatically using the render prop:

```jsx
import {Sheet} from 'mistica';

const MyComponent = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <>
      <ButtonPrimary onPress={() => setShowSheet(true)}>show sheet</ButtonPrimary>
      {showSheet && (
        <Sheet onClose={() => setShowSheet(false)}>
          {({closeModal, modalTitleId}) => (
            <>
              <Title1 id={modalTitleId}>My sheet</Title1>
              <Placeholder />
              <ButtonPrimary onPress={closeModal}>Close</ButtonPrimary>
            </>
          )}
        </Sheet>
      )}
    </>
  );
};
```
