/***************************************************************************************
 * CODE HERE 👇👇👇
 ***************************************************************************************/

const enum ActionType {
  ITEM_ADD = "ITEM_ADD",
  ITEM_REMOVE = "ITEM_REMOVE",
}

export const itemAdd: ActionCreatorItemAdd = item => ({
  type: ActionType.ITEM_ADD,
  payload: item,
})

export const itemRemove: ActionCreatorItemRemove = id => ({
  type: ActionType.ITEM_REMOVE,
  payload: id,
})

const initialState: State = {
  items: [],
}

export const reducer = (state = initialState, action: ReducerAction): State => {
  switch (action.type) {
    case ActionType.ITEM_ADD:
      return { items: [...state.items, action.payload] }
    case ActionType.ITEM_REMOVE:
      return { items: state.items.filter(item => item.id !== action.payload) }
    default:
      return assertNever(action, state) /* 👈 CHANGE */
  }
}

/* 🆕 START NEW */

const assertNever: AssertNever = (_, state) => state

/* 🆕 END NEW */

/***************************************************************************************
 * TYPE DEFINITIONS HERE 👇👇👇
 ***************************************************************************************/

interface Item {
  name: string
  id: string
}

interface State {
  items: Item[]
}

interface Action<Payload, Type extends ActionType> {
  type: Type
  payload: Payload
}

type ReducerAction = ReturnType<ActionCreatorItemAdd> | ReturnType<ActionCreatorItemRemove>

type ActionCreator<Type extends ActionType, Payload = never, Args extends any[] = []> = (
  ...args: Args
) => Action<Payload, Type>

type ActionCreatorItemAdd = ActionCreator<ActionType.ITEM_ADD, Item, [Item]>

type ActionCreatorItemRemove = ActionCreator<
  ActionType.ITEM_REMOVE,
  Item["id"],
  [Item["id"]]
>

/* 🆕 START NEW */

type AssertNever = <A>(action: never, state: A) => A

/* 🆕 END NEW */
