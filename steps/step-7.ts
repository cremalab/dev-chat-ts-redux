/***************************************************************************************
 * CODE HERE 👇👇👇
 ***************************************************************************************/

const enum ActionType /* 👈 CHANGE */ {
  ITEM_ADD = "ITEM_ADD" /* 👈 CHANGE */,
  ITEM_REMOVE = "ITEM_REMOVE" /* 👈 CHANGE */,
}

export const itemAdd = (
  item: Item
): Action<Item, ActionType.ITEM_ADD> /* 👈 CHANGE */ => ({
  type: ActionType.ITEM_ADD,
  payload: item,
})

export const itemRemove = (
  id: Item["id"]
): Action<string, ActionType.ITEM_REMOVE> /* 👈 CHANGE */ => ({
  type: ActionType.ITEM_REMOVE,
  payload: id,
})

const initialState: State = {
  items: [],
}

export const reducer = (state = initialState, action: ReducerAction): State => {
  switch (action.type) {
    case ActionType.ITEM_ADD:
      return { items: [...state.items, action.payload] } /* 👍 */
    case ActionType.ITEM_REMOVE:
      return { items: state.items.filter(item => item.id !== action.payload) }
    default:
      return state
  }
}

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

interface Action<Payload, Type extends ActionType /* 👈 CHANGE */> {
  type: Type /* 👈 CHANGE */
  payload: Payload
}

type ReducerAction =
  | Action<Item, ActionType.ITEM_ADD> /* 👈 CHANGE */
  | Action<string, ActionType.ITEM_REMOVE> /* 👈 CHANGE */
