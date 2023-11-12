<template>
      <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SalesByCategoryhartComponent',
  setup (props) {
    const series = ref([{
      name: 'Sales',
      data: [11600, 13100, 15000, 5100]
    }])
    const chartOptions = ref({
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['electronics', 'jewelery', "men's clothing", "women's clothing"]
      },
      colors: ['#F0743F', '#2DB674', '#A40894'],
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands'
          }
        }
      }
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
