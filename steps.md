# Redux from scratch with Typescript

The aim of this is to walk through adding types to a basic Redux example and then improve on those types as a means to explain a number of basic and advanced concepts in Typescript.

---

## 0 - Humble Beginnings

This section shows the starting point of the Redux example a plain Javascript file.

### New Concepts

_None_

### Observations

- Basic implementation of Redux
- No types

---

## 1 - Enter Typescript

This section changes the Javascript file to Typescript and talks about the errors that now appear.

### New Concepts

- compiler errors
- any
- strict mode

### Observations

- Change file to `.ts`
- No types yet
- Some errors show up
  - 3 implicit any errors (`item`, `id`, and `action`)
  - 1 property access error (`item.id`)

---

## 2 - State / Item Interface

This section introduces interfaces, and the concept of annotating types.

### New Concepts

- interface definitions
- type annotations

### Observations

- Add first basic types
  - `Item` interface
  - `State` interface
- Add some type annotations to fix the property access error
  - `const initialState: State ...`
  - `const reducer = (...): State ...`

---

## 3 - Action Interface

This section adds a new interface definition for `Action` to start working towards no errors from Typescript.

### New Concepts

_None_

### Observations

- Add `Action` interface
- Annotate the `action` parameter of the reducer function
  - It's not perfect
  - It reintroduces an issue with line 29
- Annotate the return of the action creators

---

## 4 - Action Creator Parameter Types

This section introduces `index access` as well as showing a flaw with the `Action` interface that sets up the introduction for generics.

### New Concepts

- indexed property access

### Observations

- Annotate the parameters of the action creators
  - `itemAdd` gets `(item: Item)`
  - `itemRemove` gets `(id: Item["id"])`
- A new error shows up with the return of `itemRemove`
  - The `Action` interface can't handle different payloads

---

## 5 - Generics

This section changes the definition of the `Action` interface to make it generically handle different payload shapes, but setups up a problem with the reducer function that a `Union` type will solve.

### New Concepts

- generic types
- type arguments

### Observations

- Make `Action` generic
  - Fix the two uses of `Action` in the action creators
  - `itemRemove` works now
  - The usage of `Action` in `reducer` needs something, but what?

---

## 6 - Union Type

This section introduces `Union` types as a solution for how to handle a type that can be one of a set of types, and also set up the need for an enum type.

### New Concepts

- union types

### Observations

- Add `ReducerAction` type that is a union of the two `Action` interfaces
- Change the `action` parameter annotation in `reducer` to be the new union
  - This introduces where Typescript doesn't know which type to choose in the union

---

## 7 - Enum Type

This section introduces constant enums and also the idea of tagged unions. This is also the fist section with full type safety and no errors.

### New Concepts

- enums
- tagged unions

### Observations

- Change `const ActionType` to be a constant enum `const enum ActionType`
  - A constant enum is both code and type at the same time
  - Don't have to change the usage of it
- Change the `Action` interface to be generic by the `ActionType` as well
  - Also change the usages of `Action` to include the correct enum
  - This will fix the error in the `reducer` function

---

## 8 - Improving the Types

This section focuses on cleaning up the types by reducing duplication, it also introduces function interfaces.

### New Concepts

- function interfaces / function type aliases

### Observations

- Make new `ActionCreator` function type alias that is generic by the `ActionType`, `Payload`, and `Args` that takes `Args` and returns `Action<...>`
- Make the type aliases for `itemAdd` and `itemRemove`
- Use the new type aliases instead of the in-line annotations

---

## 9 - Introducing ReturnType

This section further cleans up the types by using `ReturnType` to create the `Action` shapes used in the `ReducerAction` union.

### New Concepts

- ReturnType

### Observations

- Change `ReducerAction` to use `ReturnType` on the two action creator types
- Same type safety, less duplication

---

## 10 - Exhaustive Switch

This section makes the Typescript even more helpful in the `reducer` function by enforcing that the switch statement is exhaustive.

### New Concepts

- never
- exhaustiveness w/ tagged unions

### Observations

- Add `handleDefaultReducerCase` that takes `action: never` and `state: DefaultState` and returns `state`
  - The makes the switch in the `reducer` function exhaustive

---