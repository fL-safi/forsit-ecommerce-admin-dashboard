<template>
  <div id="chart">
    <apexchart v-if="isChartDataAvailable" ref="chartRef" type="area" height="350" :options="chartOptions" :series="chartData"></apexchart>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, watchEffect } from 'vue'
import { CHARTS_CONSTANT } from 'src/common/constants/chart'

const apiUrl = 'https://forsit-sales-and-revenue-default-rtdb.firebaseio.com/'

export default defineComponent({
  name: 'SalesChartComponent',
  setup (_, context) {
    const chartData = ref([])
    const chartOptions = CHARTS_CONSTANT.CHART_OPTION
    const isChartDataAvailable = ref(false)

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + '.json')
        const data = await response.json()

        const statsValues = Object.values(data)
        const revenueData = statsValues.map(item => item.revenue)
        const salesData = statsValues.map(item => item.sales)
        const dateData = statsValues.map(item => item.date)

        chartData.value = [
          {
            name: 'Sales',
            data: salesData
          },
          {
            name: 'Revenue',
            data: revenueData
          }
        ]

        chartOptions.xaxis.categories = dateData
        isChartDataAvailable.value = true
      } catch (error) {
        console.error('Error fetching data:', error)
        isChartDataAvailable.value = false
      }
    }

    const updateGraph = () => {
      const chart = context.chartRef

      if (chart) {
        chart.updateSeries(chartData.value)
        chart.updateOptions(chartOptions)
      }
    }

    onBeforeMount(async () => {
      await fetchData()
      updateGraph()
    })

    watchEffect(() => {
      updateGraph()
    })

    return {
      chartData,
      chartOptions,
      isChartDataAvailable,
      fetchData
    }
  }
})
</script>

<style scoped>
.apexcharts-legend {
  position: absolute;
  top: 24px;
  left: auto;
  right: 25px !important;
}
</style>
