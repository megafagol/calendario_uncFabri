<template>
  <div class="vue-tempalte">
    <!-- Navigation -->

    <nav class="navbar">

      <h4 class="title2 col-12 mb-5 mx-2">UNC<span class="title-2"> Calendario</span></h4>


      <div class="nav">

        <router-link  to="/">
          <button class="rutaHome">Home</button>
        </router-link>
        

        <router-link  to="/horarios">
          <button class="rutaHorario">Horarios</button>
        </router-link>
        
      </div>
    </nav>
    <!-- Main -->
    <div class="App">

      <div class="vertical-center">
        
        <div class="inner-block">
          <router-view />
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

.nav {
  bottom: 4.5em;
  width: 20em;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}

.rutaHome{
  position: relative;
  left:62em;
  bottom: 4.5em;
  text-decoration: none;
  color: #2C5F66;
  width: 30%;
  background-color:#DDC77A;
  border:none;
  border-radius: 8%;
  width: 6em;
}

.rutaHorario{
  position: relative;
  left:55em;
  bottom: 4.5em;
  text-decoration: none;
  color: #2C5F66;
  width: 30%;
  background-color:#DDC77A;
  border:none;
  z-index:100;
  border-radius: 8%;
  width: 6em;
}
</style>
