<template>
  <div class="product-registration">
    <div>
      <div class="product-registration-title q-mb-lg">
        <h2>Product Registration</h2>
        <span>Please fill the form to add to the product.</span>
      </div>
      <form @submit.prevent="addProduct" class="product-form">
        <label>Title:</label>
        <input v-model="newProduct.title" required />

        <label>Category:</label>
        <select v-model="newProduct.category" required>
          <option value="" disabled>Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelry">Jewelry</option>
          <option value="mens-clothing">Men's Clothing</option>
          <option value="womens-clothing">Women's Clothing</option>
        </select>

        <label>Rating:</label>
        <input v-model="newProduct.rating" type="number" step="0.1" max="5" required />

        <label>Price:</label>
        <input v-model="newProduct.price" type="number" step="0.01" required />

        <label>Image Link:</label>
        <input v-model="newProduct.image" type="text" required />

        <label>Description:</label>
        <textarea v-model="newProduct.description" required></textarea>

        <div class="flex no-wrap radio-button">
          <label>In Stock:</label>
          <input v-model="newProduct.inStock" type="checkbox" />
        </div>

        <button type="submit" class="submit-button">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    const newProduct = {
      id: null,
      title: '',
      category: '',
      rating: 0,
      price: 0,
      inStock: false,
      image: '',
      description: ''
    }

    const addProduct = async () => {
      try {
        newProduct.id = Date.now()

        const response = await fetch('https://forsit-data-default-rtdb.firebaseio.com/.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        })

        if (response.ok) {
          console.log('Product added successfully!')
          // Optionally, you can clear the form or perform other actions after adding the product.
          clearForm()
        } else {
          console.error('Failed to add product:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Error adding product:', error)
      }
    }

    const clearForm = () => {
      // Reset form fields
      Object.assign(newProduct, {
        id: null,
        title: '',
        category: '',
        rating: 0,
        price: 0,
        inStock: false,
        image: '',
        description: ''
      })
    }

    return { newProduct, addProduct }
  }
}
</script>

<style scoped>
.product-registration {
  display: flex;
  justify-content: flex-start;
  margin: auto;
  padding: 4%;
  background-color: white;
  font-family: 'Montserrat', sans-serif;
}

.product-registration-title h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  line-height: 20%;
}

.product-form {
  display: grid;
  gap: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select,
input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 16px;
  box-sizing: border-box;
}

.radio-button input {
  color: #FF5106;
  width: 10% !important;
}

.submit-button {
  background: linear-gradient(128.55deg, #FF5106 16.54%, #A40894 143.61%);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  font-family: 'Montserrat', sans-serif;
}

.submit-button:hover {
  filter: brightness(1.1);
}
</style>
