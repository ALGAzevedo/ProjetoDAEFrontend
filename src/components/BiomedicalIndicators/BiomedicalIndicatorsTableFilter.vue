<template>
  <div class="container">
    <div class="row">
      <div class="col-3 text-start">
        <label for="inputIndicator" class="form-label">Indicator name</label>
        <input type="text" class="form-control" id="inputIndicator" v-model="filtersBody.indicator">
      </div>
      <div class="col-3 text-start">
        <label for="inputType" class="form-label">Indicator type</label>
        <input type="text" class="form-control" id="inputType" v-model="filtersBody.type">
      </div>
      <div class="mx-2 mt-2">
      <button
          type="button"
          class="btn btn-success px-4 btn-adduser"
          @click="filterInd"
      ><i class="bi bi-search"></i>&nbsp; Filter
      </button>

        <button type="button" class="btn btn-success px-4 btn-adduser" @click="addIndicator">
          <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
        </button>
      </div>
    </div>
    </div>


</template>

<script>
export default {
  name: "IndicatorsFilterBody",
  data() {
    return {
      filtersBody: {},

    }
  },
  emits: [
    'filter'
  ],
  methods: {
    filterInd() {
      this.$emit('filter', this.filtersBody)
    },
    addIndicator() {
      this.$emit('add')
    }
  },

}
</script>

<style scoped>

</style>