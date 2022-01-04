<template>
 <AppHeader />

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu"  class="col-md-3 col-lg-2 d-md-block sidebar collapse" v-if="isAuthenticated">
        <div class="position-sticky pt-4">
          <ul class="nav flex-column">
            <li class="nav-item" v-if="isAdministrator">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'Administrators'}"
                  :to="{ name: 'Administrators'}"><i class="bi bi-person"></i>
                Administrators
              </router-link>
            </li>
            <li class="nav-item" v-if="isAdministrator || isHealthcareProfessional">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'HealthcareProfessionals'}"
                  :to="{ name: 'HealthcareProfessionals'}"><i class="bi bi-house"></i>
                Healthcare Professionals
              </router-link>

            </li>
            <h6 class="sidebar-heading nav-link mt-3 mb-1">
              <span>Patients</span>
                </h6>
            <li  class="nav-item">
            <h6 class="sidebar-heading nav-link mt-3 mb-1">
              <span>Patients</span>
            </h6>
            </li>
            <li class="nav-item" v-if="isAdministrator || isHealthcareProfessional" >
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'Patients'}"
                  :to="{ name: 'Patients'}"><i class="bi bi-house"></i>
                Patients
              </router-link>
            </li>

            <li class="nav-item" v-if="isAdministrator || isHealthcareProfessional" >
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'BiomedicalIndicators'}"
                  :to="{ name: 'BiomedicalIndicators'}"><i class="bi bi-house"></i>
                BiomedicalIndicators
              </router-link>
            </li>

            <li  class="nav-item">
            <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'Prcs'}"
                  :to="{ name: 'Prcs'}"><i class="bi bi-house"></i>
                PRCs
              </router-link>
            </li>
            <li class="nav-item" v-if="isPatient" >
            <router-link
                class="nav-link"
                :class="{active: $route.name === 'UserIndicators'}"
                :to="{ name: 'UserIndicators'}"><i class="bi bi-house"></i>
              Indicators
            </router-link>
            </li>
            <li class="nav-item" v-if="isHealthcareProfessional" >
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'HealthcareProfessionalIndicators'}"
                  :to="{ name: 'HealthcareProfessionalIndicators'}"><i class="bi bi-house"></i>
                Patients Indicators
              </router-link>
                </li>
            <li  class="nav-item" v-if="isPatient">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'PatientPrcs'}"
                  :to="{ name: 'PatientPrcs', params: {usernameIn: userName}}"><i class="bi bi-house"></i>
                My PRCs
              </router-link>
            </li>
          </ul>
          <div class="d-block d-md-none nav-profile">
            <div class="dropdown-divider"></div>
            <!-- Unauthenticated user -->
            <div class="nav-item pb-3" v-if="!isAuthenticated">
              <h6 class="sidebar-heading nav-link mt-3 mb-1">
                <span>Unauthenticated</span>
              </h6>
              <div class="nav-link">
                <router-link
                    class="btn btn-primary btn-sm btn-block d-block w-100"
                    :class="{active: $route.name === 'Login'}"
                    :to="{ name: 'Login'}"
                ><i class="bi bi-person"></i>
                  Login
                </router-link>
              </div>
            </div>

            <!-- Authenticated user -->
            <div class="nav-item pb-3" v-if="isAuthenticated">
              <h6 class="sidebar-heading nav-link mt-3 mb-1">
                <span>Authenticated User</span>
              </h6>
              <div class="nav-link">
                <h6>{{authenticatedName}}</h6>
              </div>
              <div class="nav-link">
                <a class=" btn btn-danger btn-sm btn-block d-block w-100"
                    @click.prevent="userLogout"
                ><i class="bi bi-power"></i>Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main class="col-12  p-md-4" :class="{'ms-sm-auto col-md-9  col-lg-10': isAuthenticated}">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>



export default {
  name: 'RootComponent',
  //components: {AppHeader},
  computed: {
    user() {
      return this.$store.state.user
    },
    userName() {
      return this.$store.state.user ? this.$store.state.user.username : ''
    },
    isAdministrator() {
      return this.isAuthenticated && this.user.userType == 'Administrator'
    },
    isPatient() {
      return this.isAuthenticated && this.user.userType == 'Patient'
    },
    isHealthcareProfessional() {
      return this.isAuthenticated && this.user.userType == 'HealthcareProfessional'
    },

    isAuthenticated() {
      if (this.user)
        return true
      return false
    },
    authenticatedName() {
      return this.$store.state.user.name;
    }
  },
  created () {
      document.title = "Home | Cardiacos Monitoring System"
  },
  methods: {
    userLogout() {
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    }
  },

  mounted () {
    this.$store.dispatch('restoreToken')
        .then((token) => {
          if (token) {
            this.$store.dispatch('refresh')
            this.$router.push('/')
          }
        })
  },


}
</script>

<style >


</style>
