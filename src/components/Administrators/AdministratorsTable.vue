<template>
  <table class="table">
    <thead>
    <tr>
      <th class="align-middle">#</th>
      <th class="align-middle">Name</th>
      <th class="align-middle">username</th>
      <th class="align-middle">email</th>
      <th class="align-middle">Super Admin</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="admin in admins" :key="admin.id">
      <td class="align-middle">{{ admin.id }}</td>
      <td class="align-middle">{{ admin.name }}</td>
      <td class="align-middle">{{ admin.username }}</td>
      <td class="align-middle">{{ admin.email }}</td>
      <td class="align-middle">{{ admin.isSuperAdmin }}</td>
      <td class="text-end align-middle" v-if="showEditButton">
        <div class="d-flex justify-content-end">
          <button class="btn btn-xs btn-light" @click="editClick(admin)" v-if="showEditButton">
            <i class="bi bi-xs bi-pencil"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="deleteClick(admin)" v-if="showDeleteButton">
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

  name: "AdministratorsTable",
  props: {
    admins: {
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
    editClick(admin) {
      this.$emit('edit', admin)
    },
    deleteClick(admin) {
      this.$emit('delete', admin)
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
