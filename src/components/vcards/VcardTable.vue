<template>
  <table class="table">
    <thead>
    <tr>
      <th>Phone Number</th>
      <th>Name</th>
      <th>E-Mail</th>
      <th>Balance</th>
      <th>Max Debit</th>
      <th v-if="showEditButton || showDeleteButton || showLockUnlockButton"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="vcard in vcards" :key="vcard.phone_number">
      <td>{{ vcard.phone_number }}</td>
      <td>{{ vcard.name }}</td>
      <td>{{ vcard.email }}</td>
      <td>{{ vcard.balance }}</td>
      <td>{{ vcard.max_debit }}</td>

      <td class="text-end" v-if="showEditButton || showDeleteButton || showLockUnlockButton">
        <div class="d-flex justify-content-end">
          <button class="btn btn-xs btn-light" @click="creditClick(vcard)">
            <i class="bi-xs bi bi-currency-exchange"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="vcard.blocked=='1' ? unlockClick(vcard) : lockClick(vcard)" v-if="showLockUnlockButton">
            <i :class="{'bi bi-xs bi-lock':vcard.blocked=='0','bi bi-xs bi-unlock':vcard.blocked=='1',}"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="editClick(vcard)" v-if="showEditButton">
            <i class="bi bi-xs bi-pencil"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="deleteClick(vcard)" v-if="showDeleteButton">
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

  name: "VcardTable",
  props: {
    vcards: {
      type: Array,
      default: () => [],
    },
    showLockUnlockButton: {
      type: Boolean,
      default: true,
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
  emits: [
    'edit',
    'delete',
    'lock',
    'unlock',
    'credit'
  ],
  methods: {
    creditClick(vcard){
      this.$emit('credit', vcard)
    },
    editClick(vcard) {
      this.$emit('edit', vcard)
    },
    deleteClick(vcard) {
      this.$emit('delete', vcard)
    },
    lockClick(vcard) {
      this.$emit('lock', vcard)
    },
    unlockClick(vcard) {
      this.$emit('unlock', vcard)
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
