<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow mh-60">
    <div class="container-fluid px-lg-4">
      <router-link
          class="navbar-brand col-md-3 col-lg-2 me-0"
          :to="{ name: 'Home'}"
      >
        <img src="../../assets/cardiacos.svg" alt="" width="" height="32"
             class="d-inline-block align-text-center">
      </router-link>


      <button
          id="buttonSidebarExpandId"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link
                class="nav-link"
                :class="{active: $route.name === 'Login'}"
                :to="{ name: 'Login'}"
            ><i class="bi bi-person"></i>
              Login
            </router-link>
          </li>

          <li class="nav-item dropdown" v-if="isAuthenticated">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <img
                  :src="userPhotoUrl"
                  class="rounded-circle z-depth-0 avatar-img"
                  alt="avatar image"
              >
              <span class="avatar-text">{{authenticatedUsername}}</span>
            </a>
            <ul
                class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
            >
              <li v-if="isPatient">
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'EditPatient', params: { usernameIn: user.username }}"
                ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>
              <li v-if="isAdministrator">
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'EditAdministrator', params: { usernameIn: user.username }}"
                ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>
              <li v-if="isHealthcareProfessional">
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'EditHealthcareProfessional', params: { usernameIn: user.username }}"
                ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>

              <li>
                <a
                    class="dropdown-item"
                    @click.prevent="userLogout"
                ><i class="bi bi-arrow-right"></i>Logout</a>
              </li>

            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import userAvatar from  '../../assets/img/default-avatar.png';
export default {
  name: "AppHeader",
  props:{
    userPhotoUrl: {
      type: String,
      default: function () {
        return  userAvatar
      }
    }
  },

  methods:{
    userLogout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isAdministrator() {
      return this.isAuthenticated && this.user.userType == 'Administrator'
    },
    isPatient() {
      console.log(this.user)
      return this.isAuthenticated && this.user.userType == 'Patient'
    },
    isHealthcareProfessional() {
      return this.isAuthenticated && this.user.userType == 'HealthcareProfessional'
    },
    isAuthenticated() {
      return this.$store.state.user;
    },
    authenticatedUsername() {
      return this.$store.state.user.name;
    }
  },

}
</script>

<style scoped>

.mh-60{
  height: 60px;
}

</style>