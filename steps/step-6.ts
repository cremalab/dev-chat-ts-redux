/***************************************************************************************
 * CODE HERE 👇👇👇
 ***************************************************************************************/

const ActionType = {
  ITEM_ADD: "ITEM_ADD",
  ITEM_REMOVE: "ITEM_REMOVE",
}

export const itemAdd = (item: Item): Action<Item> => ({
  type: ActionType.ITEM_ADD,
  payload: item,
})

export const itemRemove = (id: Item["id"]): Action<Item["id"]> => ({
  type: ActionType.ITEM_REMOVE,
  payload: id,
})

const initialState: State = {
  items: [],
}

export const reducer = (
  state = initialState,
  action: ReducerAction /* 👈 Change */
): State => {
  switch (action.type) {
    case ActionType.ITEM_ADD:
      return { items: [...state.items, action.payload] } /* 🤔 */
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

interface Action<Payload> {
  type: string
  payload: Payload
}

/* 🆕 START NEW */

type ReducerAction = Action<Item> | Action<Item["id"]>

/* 🆕 END NEW */
