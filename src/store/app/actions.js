export async function setSideNavItemsActive ({ commit }, navItem) {
  commit('SET_SIDE_NAV_ITEMS_ACTIVE', navItem)
}

export async function addProduct ({ commit }, product) {
  return fetch('http://localhost:9000/products.json', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((json) => {
      commit('ADD_PRODUCT', json)
      return json // Return the added product
    })
}
