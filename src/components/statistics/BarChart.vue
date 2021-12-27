<template>

    <canvas id="myChart" ref="myChart" width="100" height="100"></canvas>

</template>

<script>

import Chart from 'chart.js'

export default {
  name: "BarChart",
  props: {
    dataChart: {
      type: Array
    },
    label: {
      type: String
    },
  },


  data() {
    return {

      myChart: null,
      dataToFill: this.dataToFill


    }
  },
  methods: {
    loadChart() {
      this.myChart = new Chart(this.$refs.myChart, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: this.label,
            data: this.dataToFill,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(30, 159, 64, 0.2)',
              'rgba(150, 100, 64, 0.2)',
              'rgba(238, 130, 238, 0.2)',
              'rgba(255, 0, 0, 0.2)',
              'rgba(0, 255, 0, 0.2)',
              'rgba(151, 0, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(30, 159, 64, 1)',
              'rgba(150, 100, 64, 1)',
              'rgba(238, 130, 238, 1)',
              'rgba(255, 0, 0, 1)',
              'rgba(0, 255, 0, 1)',
              'rgba(151, 0, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    loadData(){
      this.dataToFill = this.dataChart;
    }

  },
  watch: {
    dataToFill(newData) {
      this.dataToFill = newData

      this.loadChart()
      //console.log(this.dataToFill[0])
    }

  },
  mounted() {
    this.loadChart()
    this.loadData()

  }

}
</script>

<style scoped>

</style>