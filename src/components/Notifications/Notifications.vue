<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Notifications</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 v-if="totalNotifications" class="mt-4">Total: {{ totalNotifications }}</h5>
    </div>
  </div>
  <NotificationTable
      :notifications="notifications"
      @sendMoney="sendMoney"
      @deleteClick="deleteClick"
  ></NotificationTable>
</template>

<script>


import NotificationTable from "./NotificationTable";

export default {
  name: 'Notifications',
  components: {
    NotificationTable
  },

  computed: {
    notifications () {
      return this.$store.getters.notifications
    },
    totalNotifications () {
      return this.$store.getters.totalNotifications
    }

  },

  methods : {
    sendMoney(notification) {
      this.$router.push({ name: 'TransactionToPhoneNumber', params:  {phone_number: notification.source_phone, value:notification.amount} })
    },
    deleteClick(index) {
      this.$store.dispatch('deleteNotification', index)
    },

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
