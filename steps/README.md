# Redux w/ TypeScript

The aim of this is to walk through adding types to a basic Redux example and then improving on those types as a means to explain a number of basic and advanced concepts in TypeScript.

---

## 0 - Humble Beginnings

This section shows the starting point of the Redux example as a plain JavaScript file.

### New Concepts

_None_

### Observations

- Basic implementation of Redux
  - Action type, action creator, initial state, reducer
- No types

---

## 1 - Enter TypeScript

This section changes the JavaScript file to TypeScript, enables "strict mode", and introduces us to our first compiler errors.

### New Concepts

- TypeScript's "Strict Mode" - `tsconfig.json`
- Compiler errors
- `any` type

### Observations

- Changed file to `.ts`
- No type annotations have yet been added
- Some errors show up:
  - 3 "implicit any" errors (`item`, `id`, and `action`)
  - 1 property access error (`item.id`) - `never[]`

---

## 2 - State & Item Interface

This section introduces Interfaces, and the concept of type annotations in our code.

### New Concepts

- Interface definitions
- Type annotation

### Observations

- Add first basic types
  - `Item` interface
  - `State` interface
- Add some type annotations to fix the property access error
  - State type annotation: `const initialState: State ...`
    - State param type is inferred by default param
  - Return type annotation: `const reducer = (...): State ...`

---

## 3 - Action Interface

This section adds a new interface definition, `Action`, which will represent a Redux Action object at the type-level (`{ type: "foo", payload: bar }`).

### New Concepts

_None_

### Observations

- Added `Action` interface
- Annotated the `action` parameter of the reducer function
  - It's not perfect
  - It reintroduces an issue on line 29
- Action creator return types are annotated as `Action`

---

## 4 - Action Creator Parameter Types

This section introduces `index access` as well as showing a flaw with the `Action` interface that shows a need for a more generic type.

### New Concepts

- Indexed property access on interfaces

### Observations

- Annotated the parameters of the action creators
  - `itemAdd` gets `(item: Item)`
  - `itemRemove` gets `(id: Item["id"])`
- A new error shows up with the return of `itemRemove` at `17:3`
  - Currently, `Action` doesn't handle differing payload shapes

---

## 5 - Generics

This section changes the definition of `Action` to make it generically handle different payload shapes, but introduces a new problem with our reducer's action parameter (`24:55`).

### New Concepts

- Generic types
- Type Parameters / Type arguments

### Observations

- Made `Action` generic
  - Use new parameter on `Action` to pass distinct payload shapes as type arguments
  - `itemRemove` works now
- NOTE: The usage of `Action` in `reducer` now requires an argument, but what?

---

## 6 - Union Type

This section introduces the `Union` type as a solution for handling a type that can be one of a set of types.

### New Concepts

- Union type

### Observations

- Add `ReducerAction` type that is a _Union_ of the two `Action` interfaces
- Change the `action` parameter annotation in `reducer` to be the new `ReducerAction` Union
- A new error is present in our reducer at `30:16` indicating that the  compiler doesn't know which payload should be present:
```
[ts]
Type '(string | Item)[]' is not assignable to type 'Item[]'.
  Type 'string | Item' is not assignable to type 'Item'.
    Type 'string' is not assignable to type 'Item'. [2322]
```

---

## 7 - Enum & Tagged Union

This section introduces `enum` and *Tagged Union*. This is also the first section with full type safety and no errors.

### New Concepts

- `enum`
- Tagged Union
- Type Parameter Constraint - `Type extends ActionType`

### Observations

- Change `ActionType` at line `5` to be a constant enum `const enum ActionType`
  - We use an `enum` to tie together code-level and type-level values
  - Usage does not change, however, ONLY this identifier can now be used (not a identical string)
- Change the `Action` interface to be generic by the `ActionType`
  - The second type parameter of `Action` is constrained by `ActionType`
    - Only `ActionType`, e.g. `ActionType.ITEM_ADD` or `ActionType.ITEM_REMOVE`, may be passed 
  - Changed usages of `Action` to include the correct `ActionType.type`
  - Fixes the error in the `reducer` function

---

## 8 - Improving the Types

This section focuses on cleaning up our types by reducing duplication and  introduces function annotation.

### New Concepts

- Function annotation

### Observations

- Defined new `ActionCreator` type alias that is generic by `ActionType`, `Payload`, and `Args`, used to define a function that takes `Args` and returns `Action<Payload, ActionType>`
- Uses `ActionCreator` to define `ActionCreatorItemAdd` and `ActionCreatorItemRemove`
- Uses these types to annotate `itemAdd` and `itemRemove` action creators.
  - Favoring single annotation vs inline

---

## 9 - Introducing ReturnType

This section further cleans up the types by using `ReturnType` to create the `Action` shapes used in the `ReducerAction` union.

### New Concepts

- `ReturnType`

### Observations

- Change `ReducerAction` to use `ReturnType` on the two action creator types
- Same type safety, less duplication

---

## 10 - Exhaustiveness Checking on Union

With TypeScript we can go beyond simply _describing_ our code (though beneficial) and make the compiler _enforce_ that we have accounted for various states that our code may be in. 

We add a function called `assertNever` that has two parameters, `action` of type `never` and `state` which is inferred based on usage. If all members of `ReducerAction` have been handled, the remaining type value is `never` (all Unions behave this way). This is compatible with our `assertNever` action argument and will not produce an error. If we forget to handle all members of `ReducerAction` then that member type is what will be passed to `assertNever`—`ActionCreator<ActionType.ITEM_ADD, Item, [Item]>` is not compatible with `never` and an error will be produced:

```
[ts] Argument of type 'Action<string, ActionType.ITEM_REMOVE>' 
is not assignable to parameter of type 'never'. [2345]
```

### New Concepts

- Exhaustiveness checking on Union
- Empty member on Union (`never`)
- Generic function parameter types
- Type inference (`assertNever` state parameter)

### Observations

- Added `assertNever` function that takes `action: never` and `state: A` and returns `A`
  - The makes the switch in the `reducer` function exhaustive
- Instead of defining `assertNever`'s state parameter concretely we opt to allow it to be inferred dynamically based on the type of state argument where called 
  - This allows greater reusability—multiple reducers
  - This argument does not need to be applied manually—but it could be

---