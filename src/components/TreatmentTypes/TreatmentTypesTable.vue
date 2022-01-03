<template>
  <div class="table-responsive">
  <table class="table">
    <thead>
    <tr>
      <th class="align-middle">Name</th>
      <th class="align-middle">Start Date</th>
      <th class="align-middle">End Date</th>
      <th class="align-middle">Healthcare Professional</th>
      <th class="align-middle">PRC</th>
      <th class="align-middle">Treatment Type</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="treatment in treatmentTypes" :key="treatment.code">
      <td class="align-middle">{{ treatment.name }}</td>
      <td class="align-middle">{{ treatment.startDate }}</td>
      <td class="align-middle">{{ treatment.endDate }}</td>
      <td class="align-middle">{{ treatment.healthcareProfessional.name }}</td>
      <td class="align-middle">{{ treatment.prc.name }}</td>
      <td class="align-middle">{{ treatment.treatmentType.toUpperCase() }}</td>
      <div class="d-flex justify-content-end">
        <button class="btn btn-xs btn-light" @click="editClick(treatment)" v-if="showEditButton">
          <i class="bi bi-xs bi-pencil"></i>
        </button>
        <button class="btn btn-xs btn-light" @click="deleteClick(treatment)" v-if="showDeleteButton">
          <i class="bi bi-xs bi-x-square-fill"></i>
        </button>
      </div>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: "TreatmentTypesTable",
  props: {
    treatmentTypes: {
      type: Array,
      default: () => [],
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    editClick(treatment) {
      this.$emit('edit', treatment)
    },
    deleteClick(treatment) {
      this.$emit('delete', treatment)
    },
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}

.img_photo {
  width: 3.2rem;
  height: 3.2rem;
}
</style>