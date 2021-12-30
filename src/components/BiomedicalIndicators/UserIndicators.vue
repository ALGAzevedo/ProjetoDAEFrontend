<template>
  <div class="container m-0">
    <div class="row mt-5">
      <div class="col">
        Biomedical Indicators History

      </div>
    </div>
    <div class="row mt-5">
      <div class="text-end" v-if="indicators">
        Last Insertion {{LastInsertion}}

      </div>
    </div>
    <div class="row mt-5">
      <div class="text-end mx-2 mt-2">
        <button type="button" class="btn btn-success px-4 btn-adduser" @click="addNewIndicator">
          <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-5">
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Go to Full list</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="indicator in indicatorsName"
              :key="indicator.id"
          >
            <td>{{ indicator}}</td>
            <td class="text-end">
              <div class="d-flex justify-content-end">
                <button
                    class="btn btn-xs btn-light"
                    @click="goToIndicator(indicator)"
                ><i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2">
        <!-- espaço livre propositadamente !-->
      </div>
      <div class="col-5" v-if="selectedIndicator">
        <table class="table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="indicator in selectedIndicator"
              :key="indicator.id"
          >
            <th>{{ indicator.date }}</th>
            <th>{{ indicator.value }}</th>
            <th>{{ indicator.description }}</th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserIndicators",

  data () {
    return {
      indicators: [],
      indicatorsName : [],
      selectedIndicator : undefined
    }
  },
  computed : {
    LastInsertion() {
      return "not implemented yet"

    },
  },
  methods: {
    addNewIndicator() {
      this.$router.push('UserNewMeasure')
    },
    goToIndicator(indicator) {
      if(this.selectedIndicator)
        this.selectedIndicator = undefined
      else
        this.selectedIndicator = this.indicators.filter(e => e.indicator == indicator)

    },
    loadIndicators() {
      this.$axios.get('patients/' + this.$store.state.user.username + '/biomedicalRegisters')
          .then((response) => {

            this.indicators = response.data
            //distinct names
            this.indicatorsName = [...new Set(this.indicators.map(item => item.indicator))];

          })
          .catch((error) => {
            console.log(error)
          })

    }
  },
  mounted() {
    this.loadIndicators()
  }

}
</script>

<style scoped>

</style>