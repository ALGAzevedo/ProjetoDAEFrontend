<template>
  <div class="table-responsive">
  <table class="table">
    <thead>
    <tr>
      <th class="align-middle">Name</th>
      <th class="align-middle">Start Date</th>
      <th class="align-middle">End Date</th>
      <th class="align-middle">Patient</th>
      <th class="align-middle">Active</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="prc in prcs" :key="prc.code">
      <td class="align-middle">{{ prc.name }}</td>
      <td class="align-middle">{{ prc.startDate }}</td>
      <td class="align-middle">{{ prc.endDate }}</td>
      <td class="align-middle">{{ prc.patientUsername }}</td>
      <td class="align-middle">{{ prc.isActive }}</td>
      <div class="d-flex justify-content-end">
        <button class="btn btn-xs btn-light" @click="editClick(prc)" v-if="showEditButton">
          <i class="bi bi-xs bi-pencil"></i>
        </button>
        <button class="btn btn-xs btn-light" @click="deleteClick(prc)" v-if="showDeleteButton">
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

  name: "UsersTable",
  props: {
    prcs: {
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
    editClick(prc) {
      this.$emit('edit', prc)
    },
    deleteClick(prc) {
      this.$emit('delete', prc)
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