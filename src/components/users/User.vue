<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <user-detail
      :user="user"
      :errors="errors"
      :operationType="operation"
      @save="save"
      @cancel="cancel"
  ></user-detail>
</template>

<script>
import UserDetail from "./UserDetail.vue"

export default {
  name: 'User',
  components: {
    UserDetail
  },
  props: {
    id: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      user: this.newUser(),
      errors: null,
    }
  },
  computed: {
    operation() {
      return (!this.id || this.id == 0) ? 'insert' : 'update'
    },
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler(newValue) {
        this.loadUser(newValue)
      }
    },
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.user)
    },
    newUser() {
      return {
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      }
    },
    loadUser(id) {
      if (!id || (id < 0)) {
        this.user = this.newUser()
        this.originalValueStr = this.dataAsString()
      } else {
        this.$axios.get('admin/users/' + id)
            .then((response) => {
              this.user = response.data.data
              this.originalValueStr = this.dataAsString()
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    save() {
      this.errors = null
      if (this.operation == 'insert') {
        this.$axios.post('admin/users', this.user)
            .then((response) => {
              this.$toast.success('User "' + response.data.data.email + '" was created successfully.')
              this.user = response.data.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 422) {
                this.$toast.error('User was not created due to validation errors!')
                this.errors = error.response.data.errors
              } else {
                this.$toast.error('User was not created due to unknown server error!')
              }
            })
      } else {
        this.$axios.put('admin/users/' + this.id, this.user)
            .then((response) => {
              this.$toast.success('User "' + response.data.data.email + '" was updated successfully.')
              let jsonToSend = {}
              jsonToSend.id = this.user.id
              jsonToSend.type = "update"
              jsonToSend.value = -1
              jsonToSend.name = this.user.name
              this.$socket.emit('editAdmin', jsonToSend)
              this.user = response.data.data
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('User #' + this.id + ' was not updated due to validation errors!')
                this.errors = error.response.data.errors
              } else {
                this.$toast.error('User #' + this.id + ' was not updated due to unknown server error!')
              }
            })
      }
    },
    cancel() {
      this.$router.back()
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null
    let newValueStr = this.dataAsString()
    if (this.operation == 'update' && this.originalValueStr != newValueStr
    ) {
      this.nextCallBack = next
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    } else {
      next()
    }
  }
}
</script>
