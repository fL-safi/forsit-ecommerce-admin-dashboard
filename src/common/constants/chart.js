// import toolIcon from "../../assets/filter.svg"
// const TIME_DIFFERENCE = 2332800000 // 27 Days to milliseconds Difference
// const TIME_ADDITION = 259200000 // 3 days addition
export const CHARTS_CONSTANT = Object.freeze({
  CHART_SERIES: [
    {
      name: 'CRQs',
      data: []
    },
    {
      name: 'MCqs',
      data: []
    },
    {
      name: 'Full Paper',
      data: []
    }
  ],
  CHART_OPTION: {
    chart: {
      id: 'Percentage',
      height: 380,
      width: '100%',
      type: 'area',
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
        drag: {
          enabled: false
        }

      },
      animations: {
        initialAnimation: {
          enabled: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    axisTicks: {
      show: false
    },
    colors: ['#F0743F', '#E74C3C', '#A40894'],
    xaxis: {
      type: 'datetime',
      categories: []
    },
    yaxis: {
      floating: false,
      labels: {
        style: {
          colors: ''
        }
      },
      title: {
        enabled: false
      }
    },
    title: {
      text: 'Percentage',
      align: 'left',
      offsetX: 14,
      style: {
        color: '',
        fontSize: '14px',
        fontFamily: 'Montserrat',
        fontWeight: 700,
        cssClass: 'text-main-text-color'

      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      labels: {
        colors: '#000'
      },
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10
    }
  }
})
