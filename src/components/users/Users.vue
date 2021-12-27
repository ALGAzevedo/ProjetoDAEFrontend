<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ userToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Admin Users</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalUsers }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search"
             v-model="filterByName">
    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addUser">
        <i class="bi bi-xs bi-plus-circle"></i> Add User
      </button>
    </div>
  </div>
  <hr>
  <user-table
      :users="filteredUsers"
      :showId="false"
      @edit="editUser"
      @delete="deleteUser"
  ></user-table>
</template>

<script>
import UserTable from "./UserTable.vue"

export default {
  name: 'Users',
  components: {
    UserTable
  },
  data() {
    return {
      users: [],
      userToDelete: null,
      filterByName: null
    }
  },
  computed: {
    userToDeleteName() {
      return this.userToDelete
          ? `"${this.userToDelete.email}"` : ''
    },
    filteredUsers() {
      return this.users.filter(p => (!this.filterByName || p.name.indexOf(this.filterByName) != -1))
    },
    totalUsers() {
      return this.users.reduce((c, p) => (!this.filterByName || p.name.indexOf(this.filterByName) != -1) ? c + 1 : c, 0)
    }
  },
  methods: {
    loadUsers() {
      this.$axios.get('admin/users')
          .then((response) => {
            this.users = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addUser() {
      this.$router.push({name: 'NewUser'})
    },
    editUser(user) {
      this.$router.push({name: 'User', params: {id: user.id}})
    },
    deleteConfirmed() {
      this.$axios.delete('admin/users/' + this.userToDelete.id, this.user)
          .then(() => {
            this.loadUsers();
            this.$toast.success(`Account ${this.userToDelete.id} (${this.userToDelete.name}) was deleted successfully.`)
            this.$socket.emit('deleteAdmin', this.userToDelete)
          })
          .catch((error) => {
            this.$toast.success('There was an issue deleting this account')
            console.log(error)
          })
    },
    deleteUser(user) {
      if (user.id != this.$store.state.user.id) {
        this.userToDelete = user
        let dlg = this.$refs.confirmationDialog
        dlg.show()
      }
    },
  },
  mounted() {
    this.loadUsers()
  }
}
</script>

<style scoped>

.filter-div {
  min-width: 12rem;
}

.btn-adduser {
  margin-top: 1.85rem;
}
</style>
