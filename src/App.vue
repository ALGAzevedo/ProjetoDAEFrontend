<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
    <div class="container-fluid">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        <img src="./assets/vCard-logo.png" alt="" width="30" height="30"
             class="d-inline-block align-text-center"> My VC@rd</a>
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
          <li class="nav-item">
          </li>
          <li class="nav-item" >

          </li>
          <li  class="nav-item">

          </li>
          <li class="nav-item dropdown">
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
              <span class="avatar-text">User Name</span>
            </a>
            <ul
                class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
            >
              <li>

              </li>
              <li>

              </li>
              <li>

              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <a
                    class="dropdown-item"
                    @click.prevent="logout"
                ><i class="bi bi-arrow-right"></i>Logout</a>
              </li>

            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu"  class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'Administrators'}"
                  :to="{ name: 'Administrators'}"><i class="bi bi-house"></i>
                Administrators
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'HealthcareProfessionals'}"
                  :to="{ name: 'HealthcareProfessionals'}"><i class="bi bi-house"></i>
                Healthcare Professionals
              </router-link>

            </li>
            <li class="nav-item" >
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'Patients'}"
                  :to="{ name: 'Patients'}"><i class="bi bi-house"></i>
                Patients
              </router-link>

            </li>
            <li  class="nav-item">
              <router-link
                  class="nav-link"
                  :class="{active: $route.name === 'BiomedicalIndicators'}"
                  :to="{ name: 'BiomedicalIndicators'}"><i class="bi bi-house"></i>
                BiomedicalIndicators
              </router-link>

            </li>
            <li  class="nav-item">

            </li>
            <!-- VCard Item Menu -->
            <li  class="nav-item">

            </li>
            <!-- Administrators Item Menu -->
            <li  class="nav-item d-flex justify-content-between align-items-center pe-3">


            </li>
            <!-- "bi bi-bar-chart-line" -->
            <li class="nav-item">


            </li>
          </ul>
          <div class="d-block d-md-none">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>User</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" >

              </li>
              <li class="nav-item"
                  >

              </li>
              <li  class="nav-item">

              </li>
              <li class="nav-item dropdown"
                  >
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                  <img
                      :src="notImplementedYet"
                      class="rounded-circle z-depth-0 avatar-img"
                      alt="avatar image"
                  >
                  <span class="avatar-text">Username</span>
                </a>
                <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink2"
                >
                  <li>

                  </li>
                  <li>

                  </li>
                  <li>

                  </li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li>
                    <a class="dropdown-item" @click.prevent="logout"><i class="bi bi-arrow-right"></i>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>


export default {
  name: 'RootComponent',

  computed: {

  },
  created () {

  },
  methods: {
  },

  mounted () {

  },


}
</script>

<style lang="css">
@import "./assets/css/dashboard.css";

.avatar-img {
  margin: -1.2rem 0.8rem -2rem 0.8rem;
  width: 3.3rem;
  height: 3.3rem;
}

.avatar-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.dropdown-item {
  font-size: 0.875rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

#sidebarMenu {
  overflow-y: auto;
}


</style>
