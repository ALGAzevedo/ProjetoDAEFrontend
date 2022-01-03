<template>
  <div class="container">
    <div class="row">
      <div class="row">
        <div class="col text-start">
          <label for="InputName" class="form-label">Treatment Name</label>
          <input type="text" class="form-control" id="InputName" v-model="filtersBody.treatmentName">
        </div>
        <div class="col text-start">
          <label for="inputUsername" class="form-label">Healthcare Professional Username</label>
          <input type="text" class="form-control" id="inputUsername"
                 v-model="filtersBody.healthcareProfessionalUsername">
        </div>
        <div class="col w-100">
          <div class="dropdown">
            <button
                class="btn btn-primary dropdown-toggle"
                type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false">
              Treatment Types: {{value}}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
              <li v-for="option in treatmentTypeValues" :key="option">
                <a class="dropdown-item" @click="value = option" href="javascript:void(0)">{{option}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row py-2">
        <div class="col w-100">
          <div class="form-group col-12 col-md-12">
            <label for="inputStartDate" class="form-label fs-5 fw-bold">Start Date</label>
            <input type="Date" class="form-control" id="inputStartDate" placeholder=""
                   required v-model="filtersBody.startDate">
          </div>
        </div>
        <div class="col w-100">
          <div class="form-group col-12 col-md-12">
            <label for="inputEndDate" class="form-label fs-5 fw-bold">End Date</label>
            <input type="Date" class="form-control" id="inputEndDate" placeholder=""
                   required v-model="filtersBody.endDate">
          </div>
        </div>
      </div>
      <div class="col-3 text-start">
        <button
            type="button"
            class="btn btn-success px-4 btn-addprj"
            @click="filterInd"
        ><i class="bi bi-search"></i>&nbsp; Filter
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "TreatmentTypesFilterBody",
  data() {
    return {
      filtersBody: {},
      treatmentTypeValues: [],
      value: null
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
      this.$emit('filter', this.filtersBody, this.value)
    },
    loadTreatmentTypeValues(){
      this.$axios.get('behaviours/treatmentTypeValues')
          .then((response) => {
            //we need to take type of dto of admin data
            this.treatmentTypeValues = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },

  },
  mounted() {
    this.loadTreatmentTypeValues();
  }

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