<template>
  <div class="vue-tempalte">
    <!-- Navigation -->

    <nav class="navbar col-12">

      <h4 class="title2 col-2">UNC<span class="title-2">alendario</span></h4>

      <div class="divnav col-4">

        <router-link class="rutaHome" to="/">Home</router-link>

        <router-link  class="rutaHorario" to="/horarios"> Horarios</router-link>

        <a class="cafecito2" href="https://cafecito.app/" target="_blank"><b>¡Donaciones!</b></a>

      </div>
    </nav>
    <!-- Main -->
    <div class="App">
<router-view />
      <div class="vertical-center">

        <div class="inner-block">
          
        </div>
      
      </div>
    </div>
  
  </div>
</template>

<style>
.navbar {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100vw;
  height: 3em;
  background-color: #fff;
  outline: 1px solid #000;
}

h4{
  position: relative;
  top: 10%;
  left: 5%;
  color:#2C5F66 !important;
}
span{
    color: #DDC77A;
}

.divnav {
  bottom: 4em;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  z-index: 100;
}

.rutaHome{
  text-align:center;
  position: relative;
  text-decoration: none;
  color: #2C5F66;
  background-color:#DDC77A;
  border:none;
  border-radius: 8%;
  width: 5em;
}

.rutaHorario{
  text-align:center;
  position: relative;
  right: 15%;
  text-decoration: none;
  color: #2C5F66;
  background-color:#DDC77A;
  border:none;
  z-index:100;
  border-radius: 8%;
  width: 5em;
}

.cafecito2{
  text-align:center;
  position: relative;
  right: 30%;
  text-decoration: none;
  color: #2C5F66;
  background-color:#DDC77A;
  border:none;
  z-index:100;
  border-radius: 8%;
  width: 7em;
}

</style>