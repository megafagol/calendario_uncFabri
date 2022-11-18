<template>
  <div class="vue-tempalte">
    <!-- Navigation -->

    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
      <p class="title2 col-2 h4">
        <b-link to="/"> UNC<span class="title-2">alendario</span> </b-link>
      </p>

      <div class="divnav col-4">
       
        <router-link class="rutaHorario" to="/horarios"> Horarios</router-link>
        <a class="cafecito2" href="https://cafecito.app/" target="_blank"
          ><b>¡Donaciones!</b></a
        >
      </div>
    </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <router-view />
      <div class="vertical-center">
        <div class="inner-block"></div>
      </div>
      </div>
  </div>
</template>

<style>
a:link, a:visited, a:active {
            text-decoration:none;
            color: #2c5f66 !important;
        }
.navbar {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100vw;
  height: 3em;
  background-color: #fff;
  outline: 1px solid #000;
}

.title2 {
  position: relative;
  top: 10%;
  left: 5%;
  color: #2c5f66 !important;
}
span {
  color: #ddc77a;
}

.divnav {
  bottom: 4em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
}

.rutaHome {
  text-align: center;
  position: relative;
  text-decoration: none;
  color: #2c5f66;
  background-color: #ddc77a;
  border: none;
  border-radius: 8%;
  width: 5em;
}

.rutaHorario {
  text-align: center;
  position: relative;
  right: 15%;
  text-decoration: none;
  color: #2c5f66;
  background-color: #ddc77a;
  border: none;
  z-index: 100;
  border-radius: 8%;
  width: 5em;
}

.cafecito2 {
  text-align: center;
  position: relative;
  right: 30%;
  text-decoration: none;
  color: #2c5f66;
  background-color: #ddc77a;
  border: none;
  z-index: 100;
  border-radius: 8%;
  width: 7em;
}
</style>