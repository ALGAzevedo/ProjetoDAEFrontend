<template>
  <div>
  <QualitativeChart  v-if="state.isLoaded"  v-bind:chartData="this.state.chartData" v-bind:chartOptions="this.state.chartOptions" />
    </div>

</template>

<script>
import { defineComponent } from 'vue'
import QualitativeChart from './QualitativeChart'

export default defineComponent({
  name: 'PatientBiomedicalChart',
  components: {
    QualitativeChart
  },
  props: {
    username: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      state: {
        isLoaded: false,

        chartData: {
          datasets: [
            {
              label: '',
              data: [],
              backgroundColor: ['#36a2eb', '#ff6384'],
            }
          ],
          labels: []
        },
        chartOptions: {
          responsive: false,
          plugins: {
          datalabels: {
            display: true,
          },
        }
        }
      }
    }
  },
  mounted() {
    this.state.isLoaded = true
    this.fetchStatistics();

  },
  watch: {
    username: function () { // watch it
      this.fetchStatistics()
    },
  },
  methods:{
    fetchStatistics() {
      this.state.isLoaded = false
      this.state.chartData.datasets[0].data =[];
      this.$axios.get("patients/" + this.username+ "/biomedicalRegisters")
          .then((response) => {
            let responseData = response.data
            let chartData = []

            var obj = {};

            if (responseData) {
            responseData.forEach(function(item){
              if(item.indicatorType === "QUALITATIVE")
                obj[item.indicator] ? obj[item.indicator]++ : obj[item.indicator]=1;
            });

            for (var item in obj) {
              chartData.push(obj[item])
              this.state.chartData.labels.push(item)
            }
            this.state.chartData.datasets[0].data = chartData;
            this.state.isLoaded = true
            }

          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
    },
  }
})
</script>

<style>

</style>

<!--<template>-->
<!--  <QuantitativeChart v-bind:chartData="state.chartData" />-->
<!--</template>-->

<!--<script>-->
<!--import { defineComponent } from 'vue'-->
<!--import QuantitativeChart from './QuantitativeChart'-->

<!--export default defineComponent({-->
<!--  name: 'App',-->
<!--  components:{-->
<!--    QuantitativeChart-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      state: {-->
<!--        chartData: {},-->
<!--        chartOptions: {-->
<!--          responsive: true,-->

<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  beforeMount () {-->
<!--    //this.fillData()-->
<!--  },-->
<!--  mounted() {-->
<!--    this.fetchStatistics()-->
<!--  },-->
<!--  methods: {-->
<!--    fetchStatistics() {-->
<!--      this.$axios.get("patients/" + this.$store.state.user.username+ "/biomedicalRegisters")-->
<!--          .then((response) => {-->
<!--            let responseData = response.data-->
<!--            let tempchartData = []-->

<!--            let chartData = []-->
<!--            let chartLabels = []-->

<!--            var obj = {-->
<!--              label: '',-->
<!--              borderColor:'',-->
<!--              backgroundColor: 'rgba(0, 0, 0,0)',-->
<!--              data: []-->
<!--            };-->

<!--            if (responseData) {-->
<!--              responseData.forEach(function(item){-->

<!--                if(item.indicatorType === "QUANTITATIVE"){-->
<!--                  tempchartData.push(item)-->
<!--                }-->

<!--              });-->

<!--              const result = {};-->

<!--              for(const {indicator,value} of tempchartData) {-->
<!--                if(!result[indicator]) result[indicator] = [];-->
<!--                result[indicator].push(value);-->
<!--              }-->

<!--             // console.log(result)-->

<!--              for (const item in result) {-->
<!--              // console.log(item,result[item])-->

<!--                obj.label = item;-->
<!--                obj.borderColor = '#f87979';-->
<!--                obj.backgroundColor = 'rgba(0, 0, 0,0)';-->
<!--                obj.data = result[item]-->

<!--                chartData.push(obj)-->
<!--                chartLabels.push(item)-->

<!--                obj = {};-->

<!--              }-->

<!--              chartData.forEach(function(item){-->
<!--                console.log(item)-->
<!--              });-->



<!--                //this.state.chartData.labels = chartLabels;-->
<!--             this.state.chartData.datasets = chartData;-->
<!--/*-->
<!--              console.log("Labels: " +chartData[0]);-->

<!--              this.state.chartData = {-->
<!--                labels: chartLabels,-->
<!--                datasets: chartData-->
<!--              }-->
<!--*/-->
<!--            //  this.fillData(chartLabels, chartData)-->

<!--            }-->

<!--          })-->
<!--          .catch((error) => {-->
<!--            console.error(error)-->
<!--            //this.$toast.error(error.response.data.message);-->
<!--          });-->
<!--    },-->
<!--    fillData (chartLabels, chartData) {-->
<!--      this.state.chartData = {-->
<!--        labels: chartLabels,-->
<!--        datasets: chartData-->
<!--      }-->
<!--    },-->
<!--},-->
<!--})-->
<!--</script>-->