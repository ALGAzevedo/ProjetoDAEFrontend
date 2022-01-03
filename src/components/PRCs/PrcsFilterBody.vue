<template>
  <div class="container">
    <div class="row">
      <div v-if="showName" class="col-3 text-start">
        <label for="InputName" class="form-label">PRC Name</label>
        <input type="text" class="form-control" id="InputName"  v-model="filtersBody.prcName">
      </div>
      <div v-if="showUsername" class="col-3 text-start">
        <label for="inputUsername" class="form-label">Patient Username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="filtersBody.patientUsername">
      </div>
      <div class="row py-2">
        <div class="col w-100">
          <div class="form-group col-12 col-md-12">
            <label for="inputStartDate" class="form-label fs-5 fw-bold">Start Date</label>
            <input type="Date" class="form-control" id="inputStartDate" placeholder=""
                   required v-model="filtersBody.startDate">
            <field-error-message :errors="errors" fieldName="startDate"></field-error-message>
          </div>
        </div>
        <div class="col w-100">
          <div class="form-group col-12 col-md-12">
            <label for="inputEndDate" class="form-label fs-5 fw-bold">End Date</label>
            <input type="Date" class="form-control" id="inputEndDate" placeholder=""
                   required v-model="filtersBody.endDate">
            <field-error-message :errors="errors" fieldName="endDate"></field-error-message>
          </div>
        </div>
      </div>
      <div class="col-3 text-start">
        <button
            type="button"
            class="btn btn-success px-4 btn-addprj"
            @click="filterInd"
        ><i class="bi bi-search"></i>&nbsp; Filter</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PrcsFilterBody",
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
    'filter',

  ],
  methods: {
    filterInd() {
      console.log(this.filtersBody)
      this.$emit('filter', this.filtersBody)
    },
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

.btn-addprj {
  margin-top: 1.85rem;
}
</style>