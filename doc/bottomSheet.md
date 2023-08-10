# BottomSheet

Mística provides a bottom sheet component that can be used to display a modal-like content from over the main
content of the screen.

## Basic usage

You can show any content you want inside the bottom sheet by passing it as a child of the component.

```jsx
import {BottomSheet} from 'mistica';

const MyComponent = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <>
      <ButtonPrimary onPress={() => setShowSheet(true)}>show bottom sheet</ButtonPrimary>
      {showSheet && (
        <BottomSheet onClose={() => setShowSheet(false)}>
          <Placeholder />
        </BottomSheet>
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
import {BottomSheet} from 'mistica';

const MyComponent = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <>
      <ButtonPrimary onPress={() => setShowSheet(true)}>show bottom sheet</ButtonPrimary>
      {showSheet && (
        <BottomSheet onClose={() => setShowSheet(false)}>
          {({closeModal, modalTitleId}) => (
            <>
              <Title1 id={modalTitleId}>My sheet</Title1>
              <Placeholder />
              <ButtonPrimary onPress={closeModal}>Close</ButtonPrimary>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
};
```

## Sheet with predefined content

Mística predefines some common bottom sheet patterns for you to use: `RadioListBottomSheet`,
`ActionsListBottomSheet`, `InfoBottomSheet` and `ActionsBottomSheet`. You can see examples in the storybook.

## `showBottomSheet` imperative api

Instead of using React components, there is an alternative way to show a bottom sheet: using the
`showBottomSheet` function. For this to work, you need to render a `<BottomSheetRoot/>` somewhere in your app,
typically where you render the mistica `<ThemeContextProvider/>`, but it could be anywhere.

```jsx
import {BottomSheetRoot} from '@telefonica/mistica';

export const App = () => {
  return (
    <>
      <BottomSheetRoot />
      <RestOfYourApp />
    </>
  );
};
```

Then you can call `showBottomSheet` from anywhere:

```jsx
import {BottomSheet} from 'mistica';

const MyComponent = () => {
  return (
    <ButtonPrimary
      onPress={() =>
        showBottomSheet({
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
      show bottom sheet
    </ButtonPrimary>
  );
};
```

### native implementation

If you are using mistica inside Novum app, you can configure `showBottomSheet` to use the native sheet
implementation with the webview bridge.

```jsx
import {BottomSheetRoot} from '@telefonica/mistica';
import * as webviewBridge from '@tef-novum/webview-bridge';

const nativeImplementation = createNativeSheetImplementationFromWebviewBridge(webviewBridge);

export const App = () => {
  return (
    <>
      <BottomSheetRoot nativeImplementation={nativeImplementation} />
      <RestOfYourApp />
    </>
  );
};
```

Then when you call `showBottomSheet`, if the code is running inside a webview, it will use the native
implementation instead of the web one.
