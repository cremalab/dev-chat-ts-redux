/***************************************************************************************
 * CODE HERE 👇👇👇
 ***************************************************************************************/

const ActionType = {
  ITEM_ADD: "ITEM_ADD",
  ITEM_REMOVE: "ITEM_REMOVE",
}

export const itemAdd = item => ({
  type: ActionType.ITEM_ADD,
  payload: item,
})

export const itemRemove = id => ({
  type: ActionType.ITEM_REMOVE,
  payload: id,
})

const initialState: State /* 👈 NEW */ = {
  items: [],
}

export const reducer = (state = initialState, action): State /* 👈 NEW */ => {
  switch (action.type) {
    case ActionType.ITEM_ADD:
      return { items: [...state.items, action.payload] }
    case ActionType.ITEM_REMOVE:
      return { items: state.items.filter(item => item.id !== action.payload) }
    default:
      return state
  }
}

/***************************************************************************************
 * TYPE DEFINITIONS HERE 👇👇👇
 ***************************************************************************************/

// START NEW

interface Item {
  name: string
  id: string
}

interface State {
  items: Item[]
}

// END NEW
