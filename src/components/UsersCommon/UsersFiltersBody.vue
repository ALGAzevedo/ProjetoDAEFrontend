<template>
  <div class="container">
    <div class="row">
      <div v-if="showName" class="col-3 text-start">
        <label for="InputNAme" class="form-label">Name</label>
        <input type="text" class="form-control" id="InputNAme"  v-model="filtersBody.patientName">
      </div>
      <div v-if="showUsername" class="col-3 text-start">
        <label for="inputUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="filtersBody.patientUsername">
      </div>
      <div v-if="showEmail" class="col-3 text-start">
        <label for="inputEmail" class="form-label">Email</label>
        <input type="text" class="form-control" id="inputEmail" v-model="filtersBody.email">
      </div>
      <div class="col-3 text-start">
        <label for="inputPhone" class="form-label">Phone</label>
        <input type="text" class="form-control" id="inputPhone" v-model="filtersBody.phoneNumber">
      </div>
      <div v-if="showInstitutionalEmail" class="col-3 text-start">
        <label for="inputistEmail" class="form-label">Institutional email</label>
        <input type="text" class="form-control" id="inputistEmail" v-model="filtersBody.institutionalEmail">
      </div>
      <div v-if="showInstitutionalPhone" class="col-3 text-start">
        <label for="inputstartDate" class="form-label">Institutional phone</label>
        <input type="text" class="form-control" id="inputstartDate" v-model="filtersBody.institutionalPhone">
      </div>
      <div v-if="showSocialSecurityNumber" class="col-3 text-start">
        <label for="inputendSSN" class="form-label">Social Security Number</label>
        <input type="text" class="form-control" id="inputendSSN" v-model="filtersBody.socialSecurityNumber">
      </div>
      <div class="text-end">
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
    showEmail: {
      type: Boolean,
      default: true,
    },
    showInstitutionalEmail: {
      type: Boolean,
      default: true,
    },
    showInstitutionalPhone: {
      type: Boolean,
      default: true,
    },
    showSocialSecurityNumber: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'filter',
    'add'
  ],
  methods: {
    filterInd() {
      this.$emit('filter', this.filtersBody)
    },
    addPatient() {
      this.$emit('add')
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

.btn-addprj {
  margin-top: 1.85rem;
}
</style>