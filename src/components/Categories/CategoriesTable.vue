<template>
  <table class="table">
    <thead>
    <tr>
      <th v-if="showId">ID</th>
      <th v-if="showName">Name</th>
      <th v-if="showType">Type</th>
      <th v-if="showCreatedAt">Created At</th>
      <th v-if="showUpdatedAt">Updated At</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="category in categories"
        :key="category.id"
    >
      <td v-if="showId">{{ category.id }}</td>
      <td v-if="showName">{{ category.name }}</td>
      <td v-if="showType">{{ type(category) }}</td>
      <td v-if="showCreatedAt">{{ category.created_at }}</td>
      <td v-if="showUpdatedAt">{{  category.updated_at }}</td>

      <td
          class="text-end"
          v-if="showEditButton || showDeleteButton"
      >
        <div class="d-flex justify-content-end">
          <button
              class="btn btn-xs btn-light"
              @click="editClick(category)"
              v-if="showEditButton"
          ><i class="bi bi-xs bi-pencil"></i>
          </button>

          <button
              class="btn btn-xs btn-light"
              @click="deleteClick(category)"
              v-if="showDeleteButton"
          ><i class="bi bi-xs bi-x-square-fill"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "CategoriesTable",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showType: {
      type: Boolean,
      default: true,
    },
    showCreatedAt: {
      type: Boolean,
      default: false,
    },
    showUpdatedAt: {
      type: Boolean,
      default: false,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    }
  },
  emits: [
    'edit',
    'delete',
  ],
  methods: {
    editClick(category) {
      this.$emit('edit', category)
    },
    deleteClick(category) {
      this.$emit('delete', category)
    },
    type(category) {
      return category.type === 'C' ? 'Credit' : 'Debit'
    },

  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
