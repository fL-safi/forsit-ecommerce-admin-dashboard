<template>
      <div id="chart">
        <apexchart type="pie" width="470" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PieChartComponent',
  setup (props) {
    const series = ref([8, 5])
    const chartOptions = ref({
      labels: ['In Stock', 'Out of Stock'],
      colors: ['#F0743F', '#E74C3C'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    })

    return {
      series,
      chartOptions
    }
  }
})
</script>
<style scoped>
.apexcharts-legend{
  position: absolute;
  top: 24px;
  left: auto;
  right: 25px !important;
}
</style>
