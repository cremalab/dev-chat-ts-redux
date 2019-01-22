/***************************************************************************************
 * CODE HERE 👇👇👇
 ***************************************************************************************/

const ActionType = {
  ITEM_ADD: "ITEM_ADD",
  ITEM_REMOVE: "ITEM_REMOVE",
}

export const itemAdd = (item: Item): Action<Item> /* 👈 CHANGE */ => ({
  type: ActionType.ITEM_ADD,
  payload: item,
})

export const itemRemove = (id: Item["id"]): Action<Item["id"]> /* 👈 CHANGE */ => ({
  type: ActionType.ITEM_REMOVE,
  payload: /* 👍 */ id,
})

const initialState: State = {
  items: [],
}

export const reducer = (state = initialState, action: Action /* 🚨 */): State => {
  switch (action.type) {
    case ActionType.ITEM_ADD:
      return { items: [...state.items, action.payload] }
    case ActionType.ITEM_REMOVE:
      return { items: state.items.filter(item => item.id !== action.payload) } /* 👍 */
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

interface Action<Payload> /* 👈 CHANGE */ {
  type: string
  payload: Payload /* 👈 CHANGE */
}
