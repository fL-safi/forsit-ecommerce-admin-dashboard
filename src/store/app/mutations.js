export function SET_SIDE_NAV_ITEMS_ACTIVE (state, navItem) {
  state.SIDE_NAV_ITEMS.forEach((item) => {
    item.active = (item.id === navItem.id)
  })
}

export function ADD_PRODUCT (state, product) {
  state.products.push(product)
}
