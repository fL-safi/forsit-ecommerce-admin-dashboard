<template>
    <div class="mainLayoutPadding">
      <div>
        <div class=" q-pt-lg">
          <div>
            <span class="text-main-text-color-3 markerprofileheading">{{ greetingMessage() }}</span>
          </div>
        </div>

        <div class="flex column justify-start items-start ">
          <div>
            <span class="text-main-text-color userProfileuserEmail">emanager@forsit.org</span>
          </div>
        </div>

        <div class="markingSummaryContainer q-pt-lg">
          <div class="totalmarkingcard q-pa-md q-mr-md">
            <div class="flex justify-between items-end">
              <div class="">
                <div>
                  <div><span class="totalmarkingstatsheading"> Total Revenue</span></div>
                  <div><span class="totalmarkingstatsheadingnumber">${{ totalRevenue }}</span></div>
                </div>
                <div class="q-pt-md">
                  <img src="../assets/totalmarking.svg" alt="totalmarking">
                </div>
              </div>
              <div>
                <img src="../assets/down.svg" alt="down">
                <span class="markingstatspercent">45%</span>
              </div>
            </div>
          </div>
          <div class="selfassesmentcard q-pa-md q-mr-md">
            <div class="flex justify-between items-end">
              <div class="">
                <div>
                  <div><span class="totalmarkingstatsheading">Total Sales</span></div>
                  <div><span class="totalmarkingstatsheadingnumber">{{ totalSales }}</span></div>
                </div>
                <div class="q-pt-md">
                  <img src="../assets/totalmarking.svg" alt="totalmarking">
                </div>
              </div>
              <div>
                <img src="../assets/up.svg" alt="up">
                <span class="markingstatspercent">36%</span>
              </div>
            </div>
          </div>
          <div class="selfassesmentcard q-pa-md q-mr-md">
            <div class="flex justify-between items-end">
              <div class="">
                <div>
                  <div><span class="totalmarkingstatsheading">Total Spents</span></div>
                  <div><span class="totalmarkingstatsheadingnumber">231</span></div>
                </div>
                <div class="q-pt-md">
                  <img src="../assets/totalmarking.svg" alt="totalmarking">
                </div>
              </div>
              <div>
                <img src="../assets/down.svg" alt="down">
                <span class="markingstatspercent">21%</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="markeravailabilitytext text- main-text-color-3 q-pt-xl ">
            <span>Deliverables</span>
          </div>

          <div class="markeravailabilitycontainer q-mt-sm ">
            <div class="markeravailibilitycard q-pa-md">
              <div><span class="totalmarkingstatsheading">Stock Availability</span></div>
              <div><span class="totalmarkingstatsheadingnumber">1532</span></div>
            </div>
            <div class="markeravailibilitycard q-pa-md ">
              <div><span class="totalmarkingstatsheading">Revenue Target</span></div>
              <div><span class="totalmarkingstatsheadingnumber">252</span></div>
            </div>
            <div class="markeravailibilitycard q-pa-md ">
              <div><span class="totalmarkingstatsheading">Sales Target</span></div>
              <div><span class="totalmarkingstatsheadingnumber">1320</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="markeravailabilitytext text- main-text-color-3 q-pt-xl ">
        <span>Stock comparison & Revenue by Category</span>
      </div>
      <div class="stock-and-revenue-category-container q-my-lg" >

        <div class="stock-count-chart" >
          <div class="q-ma-md" >
            <span class="stock-comparison-chart-heading" >Stock Comparison</span>
          </div>
          <div>
            <PieChartComponentVue />
          </div>
        </div>
        <div class="revenue-by-category q-pa-md" >
          <div class="" >
            <span class="stock-comparison-chart-heading" >Filter Revenue by Category</span>
          </div>
          <div class="filtering-product q-pt-md">
            <label for="filterCategory"></label>
            <select v-model="filterCategory" id="filterCategory" @change="updateFilteredData">
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
          </div>
          <div>
            <div class="q-mt-lg">
              <span class="revenue-by-catgeory-title">{{ filterCategory === 'all' ? 'All Categories' : filterCategory }}</span>
            </div>
            <div class="q-mt-lg">
              <span class="revenue-by-catgeory-value">${{ getRevenueByCategory(filterCategory) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="markeravailabilitytext text- main-text-color-3 q-pt-md q-mb-lg">
        <span>Overall sales & revenue</span>
      </div>

      <div class="sales-and-revenue-area-chart-container q-pa-lg" >
        <div class="" >
          <span class="stock-comparison-chart-heading" >Sales & Revenue</span>
        </div>
        <div class="q-my-lg" >
          <SalesRevenueChartVue />
        </div>
      </div>

      <div class="markeravailabilitytext text- main-text-color-3 q-pt-xl ">
        <span>Stock comparison & Revenue by Category</span>
      </div>
      <div class="stock-and-revenue-category-container q-my-lg" >

        <div class="stock-count-chart" >
          <div class="q-ma-md" >
            <span class="stock-comparison-chart-heading" >Filter sales by category</span>
          </div>
          <div>
            <SalesByCategoryChartVue />
          </div>
        </div>
        <div class="revenue-by-category q-pa-md" >
          <div class="" >
            <span class="stock-comparison-chart-heading" >Filter revenue by category</span>
          </div>
          <div>
            <RevenueByCategoryChartVue />
          </div>
        </div>
      </div>

    </div>
  </template>

<script>
import { onMounted, ref } from 'vue'
import PieChartComponentVue from 'src/components/PieChartComponent.vue'
import SalesRevenueChartVue from 'src/components/SalesRevenueChart.vue'
import SalesByCategoryChartVue from 'src/components/SalesByCategoryChart.vue'
import RevenueByCategoryChartVue from 'src/components/RevenueByCategoryChart.vue'

export default {
  components: {
    PieChartComponentVue,
    SalesRevenueChartVue,
    RevenueByCategoryChartVue,
    SalesByCategoryChartVue
  },
  setup (props) {
    const apiUrl = 'https://forsit-sales-and-revenue-default-rtdb.firebaseio.com/'
    const data = ref(null)
    const totalSales = ref(0)
    const totalRevenue = ref(0)
    const salesData = ref([])
    const categories = ref([])
    const filterCategory = ref('all')
    const filteredData = ref([])

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + '.json')
        const data = await response.json()

        console.log('Firebase Response:', data)

        for (const key in data) {
          const item = data[key]
          totalSales.value += item.sales
          totalRevenue.value += item.revenue

          if (!categories.value.includes(item.category)) {
            categories.value.push(item.category)
          }
        }

        salesData.value = Object.values(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const updateFilteredData = () => {
      if (filterCategory.value === 'all') {
        filteredData.value = salesData.value
      } else {
        filteredData.value = salesData.value.filter(item => item.category === filterCategory.value)
      }
    }

    const getRevenueByCategory = category => {
      if (category === 'all') {
        return totalRevenue.value
      } else {
        return filteredData.value
          .filter(item => item.category === category)
          .reduce((acc, curr) => acc + curr.revenue, 0)
      }
    }

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

    onMounted(async () => {
      fetchData()
    })

    return {
      greetingMessage,
      data,
      totalSales,
      totalRevenue,
      categories,
      filterCategory,
      filteredData,
      updateFilteredData,
      getRevenueByCategory

    }
  }
}
</script>

  <style>
  .drawertoggleicon {
    cursor: pointer;
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
