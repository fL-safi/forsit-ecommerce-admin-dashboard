<template>
  <div class="mainLayoutPadding" >
    <div>
      <div class=" q-pt-lg">
        <div>
            <span class="text-main-text-color-3 markerprofileheading">{{ greetingMessage() }}</span>
        </div>
      </div>
      <div class="flex column justify-start items-start q-mb-lg">
          <div>
            <span class="text-main-text-color userProfileuserEmail">emanager@forsit.org</span>
          </div>
      </div>
    </div>

    <div class="q-mb-xl" >
      <div class="product-list-container-header text- main-text-color-3">
          <span>Summary</span>
        </div>

        <div class="markeravailabilitycontainer q-mt-sm ">
          <div class="inventry-setup-card q-pa-md">
  <div><span class="totalmarkingstatsheading">Total Products</span></div>
  <div><span class="totalmarkingstatsheadingnumber">{{ totalProductsCount }}</span></div>
</div>
<div class="inventry-setup-card q-pa-md ">
  <div><span class="totalmarkingstatsheading">In Stock</span></div>
  <div><span class="totalmarkingstatsheadingnumber">{{ inStockCount }}</span></div>
</div>
<div class="inventry-setup-card q-pa-md ">
  <div><span class="totalmarkingstatsheading">To ReStock</span></div>
  <div><span class="totalmarkingstatsheadingnumber">{{ toRestockCount }}</span></div>
</div>
        </div>
    </div>

    <div>
      <div class="refining-products" >
        <div class="searching-product q-px-md" >
          <label for="search"></label>
          <input v-model="search" id="search" placeholder="Search a product" />
        </div>
        <div class="sorting-product" >
          <label for="sort" class="q-px-sm" >Sort by:</label>
          <select v-model="sort" id="sort">
            <option value="title">Name</option>
            <option value="priceLowToHigh">Price Low to High</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="ratingLowToHigh">Rating Low to High</option>
            <option value="ratingHighToLow">Rating High to Low</option>
          </select>
        </div>
        <div class="filtering-product flex q-px-sm">
          <div class="q-px-md" >
            <label for="filterCategory" class="q-px-sm"  >Filter by</label>
            <select v-model="filterCategory" id="filterCategory">
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="" >
            <label for="filter"></label>
            <select v-model="filter" id="filter">
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>
    </div>

      <div class="product-lists-container">
        <div>
          <!-- Header for the product list -->
          <span class="product-list-container-header">
            Here you can find all of the products
          </span>
        </div>
        <div class="product-list-container">
          <div v-for="product in filteredProducts" :key="product.id" class="product-list q-my-md">
            <div class="title-section q-pl-sm">
              <div>
                <span class="product-title">{{ product.title }}</span>
              </div>
              <div class="q-mb-lg">
                <span class="product-description">{{ product.description }}</span>
              </div>
              <div class="product-details">
                <div class="product-price">
                  <span class="product-details-header">Price: <span class="product-details-content">${{ product.price }}</span></span>
                </div>
                <div class="product-category">
                  <span class="product-details-header">Category: <span class="product-details-content">{{ product.category }}</span></span>
                </div>
                <div class="product-rating">
                  <span class="product-details-header">Rating: <span class="product-details-content">{{ product.rating }}</span></span>
                </div>
                <div>
                  <span class="stock-status" v-if="product.inStock">Available in stock</span>
                  <span class="stock-status" v-else>Out of stock</span>
                </div>
              </div>
            </div>
            <div class="stock-section q-pr-xl">
              <div>
                <div>
                  <span>Change stock status:</span>
                </div>
                <div class="q-ml-md">
                  <select @change="changeStockStatus(product)">
                    <option value="inStock" :selected="product.inStock">In Stock</option>
                    <option value="outOfStock" :selected="!product.inStock">Out of Stock</option>
                  </select>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'ProductList',
  setup () {
    const products = ref([])
    const categories = ref([])
    const search = ref('')
    const sort = ref('title')
    const filterCategory = ref('all')
    const filter = ref('all')

    const filteredProducts = computed(() => {
      let filtered = [...products.value] // Create a copy to avoid modifying the original array

      if (filterCategory.value !== 'all') {
        filtered = filtered.filter(product => product.category === filterCategory.value)
      }

      if (filter.value === 'inStock') {
        filtered = filtered.filter(product => product.inStock)
      } else if (filter.value === 'outOfStock') {
        filtered = filtered.filter(product => !product.inStock)
      }

      if (search.value) {
        const searchQuery = search.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchQuery)
        )
      }

      if (sort.value === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sort.value === 'priceLowToHigh') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sort.value === 'priceHighToLow') {
        filtered.sort((a, b) => b.price - a.price)
      } else if (sort.value === 'ratingLowToHigh') {
        filtered.sort((a, b) => a.rating - b.rating)
      } else if (sort.value === 'ratingHighToLow') {
        filtered.sort((a, b) => b.rating - a.rating)
      }

      return filtered
    })

    const apiUrl = 'https://forsit-data-default-rtdb.firebaseio.com/'

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}.json`)
        const data = await response.json()

        const transformedData = Object.keys(data).map(key => ({
          id: key,
          title: data[key].title,
          price: data[key].price,
          description: data[key].description,
          category: data[key].category,
          rating: data[key].rating,
          inStock: data[key].inStock.inStock // Randomly assign availability (50% chance of being in stock)
        }))

        products.value = transformedData
        console.log(products.value)

        // Calculate total products, in stock, and to restock
        const totalProducts = transformedData.length
        const inStock = transformedData.filter(product => product.inStock).length
        const toRestock = totalProducts - inStock

        // Update the counts in the template
        totalProductsCount.value = totalProducts
        inStockCount.value = inStock
        toRestockCount.value = toRestock

        const categoriesResponse = await fetch('http://localhost:9000/category.json')
        categories.value = await categoriesResponse.json()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    // Before the return statement in the setup function
    const totalProductsCount = ref(0)
    const inStockCount = ref(0)
    const toRestockCount = ref(0)

    // Inside the setup function, before the return statement
    const updateStockStatus = async (productId, newStatus) => {
      try {
        const response = await fetch(`${apiUrl}/${productId}/inStock.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inStock: newStatus === 'inStock'
          })
        })

        if (!response.ok) {
          console.error('Error updating stock status:', response.statusText)
        }
      } catch (error) {
        console.error('Error updating stock status:', error)
      }
    }

    const changeStockStatus = (product) => {
      const newStatus = product.inStock ? 'outOfStock' : 'inStock'
      console.log(newStatus)

      // Assuming there is an API endpoint to update the stock status
      updateStockStatus(product.id, newStatus)

      // Update the local state immediately for a smooth UI experience
      product.inStock = !product.inStock
    }

    onMounted(async () => {
      fetchProducts()
    })

    const greetingMessage = () => {
      const time = new Date().getHours()
      let greeting
      if (time < 11) {
        greeting = 'Good Morning'
      } else if (time < 16) {
        greeting = 'Good Afternoon'
      } else if (time < 19) {
        greeting = 'Good Evening'
      } else {
        greeting = 'Good Night'
      }
      return greeting
    }

    return {
      greetingMessage,
      totalProductsCount,
      inStockCount,
      toRestockCount,
      products,
      categories,
      search,
      sort,
      filterCategory,
      filter,
      filteredProducts,
      changeStockStatus
    }
  }
}
</script>
<style scoped>
.sorting-product
select,
input,
textarea {
  width: 200px;
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 16px;
  box-sizing: border-box;
}

.filtering-product select,
input,
textarea {
  width: 200px;
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 16px;
  box-sizing: border-box;
}

</style>
