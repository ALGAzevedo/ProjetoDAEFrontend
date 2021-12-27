<template>
  <table class="table">
    <thead>
    <tr>
      <th class="align-middle">#</th>
      <th class="align-middle">name</th>
      <th class="align-middle">Type</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="indicator in indicators" :key="indicator.id">
      <td class="align-middle">{{ indicator.id }}</td>
      <td class="align-middle">{{ indicator.name }}</td>
      <td class="align-middle">{{ indicator.type }}</td>

      <td class="text-end align-middle" v-if="showEditButton">
        <div class="d-flex justify-content-end">
          <button class="btn btn-xs btn-light" @click="editClick(indicator)" v-if="showEditButton">
            <i class="bi bi-xs bi-pencil"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="deleteClick(indicator)" v-if="showDeleteButton">
            <i class="bi bi-xs bi-x-square-fill"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "IndicatorsTable",
  props: {
    indicators: {
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
    editClick(indicator) {
      this.$emit('edit', indicator)
    },
    deleteClick(indicator) {
      this.$emit('delete', indicator)
    }
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
