<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow mh-60">
    <div class="container-fluid px-lg-4">
      <a class="navbar-brand col-md-3 col-lg-2 me-0" href="#">
        <img src="../../assets/cardiacos.svg" alt="" width="" height="32"
             class="d-inline-block align-text-center"></a>
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
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped>

.mh-60{
  height: 60px;
}

</style>