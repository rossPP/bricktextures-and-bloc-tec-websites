# Integration Notes

This file is the canonical place for website-only integration notes that are not currently shown on the public Integration page.

## Archived: PostMessage integration content

The Integration page previously included a card for passing configuration from iframe to parent. That public-facing content was removed because this capability is being considered for deprecation/discontinuation.

### What the removed content covered

- Feature intent: viewer button posts current configuration data from iframe to host page.
- Visibility conditions:
  - account config enables `modules.postMessage=true`
  - viewer is running inside an iframe
  - `canPost` is not explicitly disabled
- Button label/icon source:
  - `modules.postMessageSettings.name`
  - `modules.postMessageSettings.icon`
- Payload shape:
  - `samples[]`, `layoutVariation`, `layout`, `jointFill`, `angle`, `thicknesses[]`, `link`, `image`
- `image` details:
  - `data:image/jpeg;base64,...`
  - generated around `1200x800` before JPEG compression
  - snapshot of current visible configuration at click time
- Host handling:
  - listen for `window.message`
  - validate origin
  - parse payload
  - route into sample/download workflow

### App code references (source of truth)

- `App/src/components/viewer/ViewerPage/ViewerPage.tsx`
  - command-bar button visibility logic for postMessage button
  - `onGetPostMessageButtonClick()` posting payload to parent window
- `App/src/classesRendering/BlockCanvas.ts`
  - `getSelectProductJson()` payload field composition
- `App/src/data/Data.Account.ts`
  - `canPost` query parsing and postMessage settings loading
- `App/public/data/accounts/tobermore.json`
  - example account where `modules.postMessage=true`

## Website follow-up notes

- Replace temporary share-reference links with a real client-configured live example URL if/when one is approved for publication.
