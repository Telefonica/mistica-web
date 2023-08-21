# Sheet

Mística provides a sheet component that can be used to display a modal-like content from over the main content
of the screen.

## Basic usage

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

The sheet will close when the user does the swipe down gesture or when the background overlay is touched. The
`onClose` callback is called when the closing animation finishes, that's the right place to unmount the sheet
as shown in the example above.

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

## Sheet with predefined content

Mística predefines some common sheet patterns for you to use: `RadioListSheet`, `ActionsListSheet`,
`InfoSheet` and `ActionsSheet`. You can see examples in the storybook.

## `showSheet` imperative api

Instead of using React components, there is an alternative way to show a sheet: using the `showSheet`
function. For this to work, you need to render a `<SheetRoot/>` somewhere in your app, typically where you
render the mistica `<ThemeContextProvider/>`, but it could be anywhere.

```jsx
import {SheetRoot} from '@telefonica/mistica';

export const App = () => {
  return (
    <>
      <SheetRoot />
      <RestOfYourApp />
    </>
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

### native implementation

If you are using mistica inside Novum app, you can configure `showSheet` to use the native sheet
implementation with the webview bridge.

```jsx
import {SheetRoot} from '@telefonica/mistica';
import * as webviewBridge from '@tef-novum/webview-bridge';

const nativeImplementation = createNativeSheetImplementationFromWebviewBridge(webviewBridge);

export const App = () => {
  return (
    <>
      <SheetRoot nativeImplementation={nativeImplementation} />
      <RestOfYourApp />
    </>
  );
};
```

Then when you call `showSheet`, if the code is running inside a webview, it will use the native implementation
instead of the web one.
