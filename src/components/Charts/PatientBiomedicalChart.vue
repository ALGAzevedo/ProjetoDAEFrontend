<!--<template>-->
<!--  <h1>Biomedical Chart</h1>-->
<!--  <QualitativeChart  v-if="state.isLoaded"  v-bind:chartData="this.state.chartData" v-bind:chartOptions="this.state.chartOptions" />-->
<!--</template>-->

<!--<script>-->
<!--import { defineComponent } from 'vue'-->
<!--import QualitativeChart from './QualitativeChart'-->

<!--export default defineComponent({-->
<!--  name: 'PatientBiomedicalChart',-->
<!--  components: {-->
<!--    QualitativeChart-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      state: {-->
<!--        isLoaded: false,-->
<!--        chartData: {-->
<!--          datasets: [-->
<!--            {-->
<!--              label: 'GitHub Commits',-->
<!--              data: [],-->
<!--              backgroundColor: ['#36a2eb', '#ff6384'],-->
<!--            }-->
<!--          ],-->
<!--          labels: []-->
<!--        },-->
<!--        chartOptions: {-->
<!--          responsive: false,-->
<!--          datalabels: {-->
<!--            display: true,-->
<!--          },-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.state.isLoaded = false-->
<!--    this.fetchStatistics();-->

<!--  },-->
<!--  methods:{-->
<!--    fetchStatistics() {-->
<!--      this.$axios.get("patients/" + this.$store.state.user.username+ "/biomedicalRegisters")-->
<!--          .then((response) => {-->
<!--            let responseData = response.data-->
<!--            let chartData = []-->

<!--            var obj = {};-->
<!--            responseData.forEach(function(item){-->
<!--              if(item.indicatorType === "QUALITATIVE")-->
<!--                obj[item.indicator] ? obj[item.indicator]++ : obj[item.indicator]=1;-->
<!--            });-->

<!--            for (var item in obj) {-->
<!--              chartData.push(obj[item])-->
<!--              this.state.chartData.labels.push(item)-->
<!--            }-->
<!--            this.state.chartData.datasets[0].data = chartData;-->

<!--            console.log(this.state.chartData.datasets[0].data,this.state.chartData.labels)-->

<!--            this.state.isLoaded = true-->

<!--          })-->
<!--          .catch((error) => {-->
<!--            this.$toast.error(error.response.data.message);-->
<!--          });-->
<!--    },-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
<template>
  <QuantitativeChart v-bind:chartData="state.chartData" />
  <button v-on:click="fillData">Randomize</button>
</template>

<script>
import { defineComponent } from 'vue'
import QuantitativeChart from './QuantitativeChart'

export default defineComponent({
  name: 'App',
  components:{
    QuantitativeChart
  },
  data () {
    return {
      state: {
        chartData: {},
        chartOptions: {
          responsive: false
        }
      }
    }
  },
  beforeMount () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.state.chartData = {
        labels: ['Label 1', 'Label 2','Label 2','Label 2','Label 2'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (10 - 5 + 1)) + 10
    }
  },
})
</script>