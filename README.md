# Redux w/ TypeScript

## Setup

- `npm i`
- Add the tslint plugin to your editor
- Add TypeScript language support (if not VS Code)

## How to read example steps

- First: [Open this link and follow along in the TypeScript Playground](http://www.typescriptlang.org/play/index.html#src=%2F***************************************************************************************%0A%20*%20CODE%20HERE%20👇👇👇%0A%20***************************************************************************************%2F%0A%0Aconst%20ActionType%20%3D%20%7B%0A%20%20ITEM_ADD%3A%20%22ITEM_ADD%22%2C%0A%20%20ITEM_REMOVE%3A%20%22ITEM_REMOVE%22%2C%0A%7D%0A%0Aexport%20const%20itemAdd%20%3D%20(item)%20%3D%3E%20(%7B%0A%20%20type%3A%20ActionType.ITEM_ADD%2C%0A%20%20payload%3A%20item%2C%0A%7D)%0A%0Aexport%20const%20itemRemove%20%3D%20(id)%20%3D%3E%20(%7B%0A%20%20type%3A%20ActionType.ITEM_REMOVE%2C%0A%20%20payload%3A%20id%2C%0A%7D)%0A%0Aconst%20initialState%20%3D%20%7B%0A%20%20items%3A%20%5B%5D%2C%0A%7D%0A%0Aexport%20const%20reducer%20%3D%20(state%20%3D%20initialState%2C%20action)%20%3D%3E%20%7B%0A%20%20switch%20(action.type)%20%7B%0A%20%20%20%20case%20ActionType.ITEM_ADD%3A%0A%20%20%20%20%20%20return%20%7B%20items%3A%20%5B...state.items%2C%20action.payload%5D%20%7D%0A%20%20%20%20case%20ActionType.ITEM_REMOVE%3A%0A%20%20%20%20%20%20return%20%7B%20items%3A%20state.items.filter(item%20%3D%3E%20item.id%20!%3D%3D%20action.payload)%20%7D%0A%20%20%20%20default%3A%0A%20%20%20%20%20%20return%20state%0A%20%20%7D%0A%7D%0A%0A%2F***************************************************************************************%0A%20*%20TYPE%20DEFINITIONS%20HERE%20👇👇👇%0A%20***************************************************************************************%2F%0A%0A%2F*%20No%20types%20for%20you!!!%20(yet)%20*%2F%0A)
- `./steps` contains files that represent a sequence of change over time
- `./steps/README.md` contains sections that correspond to each file and describes the overall intent, new concepts, and observations.
- In each file, code is located at the top and type definitions are located at the bottom.
- Additions and changes are annotated using comments
- Some files contain intentional type errors and if your editor is configured correctly you should expect to see these (though they eventually get fixed).