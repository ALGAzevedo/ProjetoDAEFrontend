<template>
  <div class="table-responsive">
  <table class="table">
    <thead>
    <tr>
      <th class="align-middle">Name</th>
      <th class="align-middle">Username</th>
      <th class="align-middle">Email</th>
      <th v-if="showInstitutionalEmail" class="align-middle d-none d-block-xxl">Institutional email</th>
      <th class="align-middle">Phone</th>
      <th v-if="showInstitutionalPhoneNumber" class="align-middle d-none d-block-xxl">Institutional Phone</th>
      <th class="align-middle">Gender</th>
      <th v-if="showSocialSecurityNumber" class="align-middle">Social Security</th>
      <th v-if="showEmergencyPhoneNumber" class="align-middle">Emergency Phone</th>
      <th class="align-middle">Deleted</th>
      <th v-if="showIsSuperAdmin" class="align-middle">Super Admin</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.username">
      <td class="align-middle">{{ user.name }}</td>
      <td class="align-middle">{{ user.username }}</td>
      <td class="align-middle">{{ user.email }}</td>
      <td v-if="showInstitutionalEmail" class="align-middle d-none d-block-xxl">{{ user.institutionalEmail }}</td>
      <td class="align-middle">{{ user.phoneNumber }}</td>
      <td v-if="showInstitutionalPhoneNumber" class="align-middle d-none d-block-xxl">{{ user.institutionalPhone }}</td>
      <td class="align-middle">{{ user.gender }}</td>
      <td v-if="showSocialSecurityNumber" class="align-middle">{{ user.socialSecurityNumber }}</td>
      <td v-if="showEmergencyPhoneNumber" class="align-middle">{{ user.emergencyPhoneNumber }}</td>
      <td v-if="showIsSuperAdmin" class="align-middle">{{ user.isSuperAdmin }}</td>
      <td class="align-middle">{{ user.isDeleted ?? '' }}</td>
      <td class="text-end align-middle">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-dark" @click="makeSuper(user)" v-if="showMakeSuperAdmin">Make Super

          </button>
          <button class="btn btn-xs btn-light" @click="showDocumentsClick(user)" v-if="showDocumentsList">
            <i class="bi bi-file-earmark-pdf-fill"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="showPrcsClick(user)" v-if="showPrcList">
            <i class="bi bi-xs bi-card-list"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="editClick(user)" v-if="showEditButton">
            <i class="bi bi-xs bi-pencil"></i>
          </button>
          <button class="btn btn-xs btn-light" @click="deleteClick(user)" v-if="!user.isDeleted">
            <i class="bi bi-xs bi-x-square-fill"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {

  name: "UsersTable",
  props: {
    users: {
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
    showIsSuperAdmin: {
      type: Boolean,
      default: true,
    },
    showSocialSecurityNumber: {
      type: Boolean,
      default: true,
    },
    showEmergencyPhoneNumber: {
      type: Boolean,
      default: true,
    },
    showInstitutionalPhoneNumber: {
      type: Boolean,
      default: true,
    },
    showInstitutionalEmail: {
      type: Boolean,
      default: true,
    },
    showPrcList:{
      type: Boolean,
      default: true
    },
    showDocumentsList:{
      type: Boolean,
      default: true
    },
    showMakeSuperAdmin:{
      type: Boolean,
      default: true
    }
  },
  methods: {
    editClick(user) {
      this.$emit('edit', user)
    },
    deleteClick(user) {
      this.$emit('delete', user)
    },
    showPrcsClick(user){
      this.$emit('showPrcsList', user)
    },
    showDocumentsClick(user) {
      this.$emit('showDocumentsClick', user)
    },
    makeSuper(user) {
      this.$emit('makeSuper', user)
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
