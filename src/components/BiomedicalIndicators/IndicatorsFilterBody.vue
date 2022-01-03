<template>
    <div class="row g-2">
      <div v-if="showName" class="col-12 col-md-3 text-start">
        <label for="InputNAme" class="form-label">Patient name</label>
        <input type="text" class="form-control" id="InputNAme"  v-model="filtersBody.patientName">
      </div>
      <div v-if="showUsername" class="col-12 col-md-3 text-start">
        <label for="inputUsername" class="form-label">Patient username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="filtersBody.patientUsername">
      </div>
      <div class="col-12 col-md-2 text-start">
        <label for="inputIndicator" class="form-label">Indicator name</label>
        <input type="text" class="form-control" id="inputIndicator" v-model="filtersBody.indicator">
      </div>
      <div class="col-12 col-md-2 text-start">
        <label for="inputType" class="form-label">Indicator type</label>
        <input type="text" class="form-control" id="inputType" v-model="filtersBody.type">
      </div>
      <div class="col-12 col-md-2 text-start">
        <label for="inputstartDate" class="form-label">Start date</label>
        <input type="date" class="form-control" id="inputstartDate" v-model="filtersBody.startDate">
      </div>
      <div class="col-12 col-md-2  text-start">
        <label for="inputendDate" class="form-label">End date</label>
        <input type="date" class="form-control" id="inputendDate" v-model="filtersBody.endDate">
      </div>

      <div class="col-12 col-md-2 d-flex justify-content-center align-items-end ">

        <button
            type="button"
            class="btn btn-success w-100"
            @click="filterInd"
        ><i class="bi-xs bi-search"></i>&nbsp; Filter</button>
      </div>


    </div>

</template>

<script>
export default {
  name: "IndicatorsFilterBody",
  data() {
    return {
      filtersBody : {},

    }
  },
  props: {
    showUsername: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
      'filter'
  ],
  methods: {
    filterInd() {
      this.$emit('filter', this.filtersBody)
    }


  },

}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}

.total-filtro {
  margin-top: 0.35rem;
}

.btn-addprjx {
  margin-top: 1.85rem;
}
</style>