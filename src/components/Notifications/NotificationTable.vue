<template>
  <table class="table">
    <thead>
    <tr>
      <th>Type</th>
      <th>From</th>
      <th>Message</th>
      <th>Amount</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(notification, i) in notifications" :key="i"
    >
      <td>{{notification.type}}</td>
      <td>{{ notification.source_phone}}</td>
      <td>{{ notification.msg }}</td>
      <td>{{ notification.amount }}</td>

      <td
          class="text-end"
      >
        <div  class="d-flex justify-content-end">
          <button   v-if="notification.type === 'Request' "
              class="btn btn-xs btn-light"
              @click="sendMoney(notification)"
          ><i class="bi bi-arrow-right"></i>
          </button>
          <button
              class="btn btn-xs btn-light"
              @click="deleteClick(i)"
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

  name: "NotificationTable",
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  emits: [
    'sendMoney',
    'deleteClick',
  ],
  methods: {
    sendMoney(notification) {
      this.$emit('sendMoney', notification)
    },
    deleteClick(index) {
      this.$emit('deleteClick', index)
    }
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
