<template>
  <div class="vue-tempalte">
    <!-- Navigation -->

    <nav
      class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
    >
      <h6 class="title2 col-12 mb-5 mx-2">UNC <span class="title-2">Calendar</span></h6>


      <ul class="nav navbar-nav flex-row float-right">

        <li class="nav-item">
          <router-link class="ruta" to="/">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link class="ruta" to="/horarios">Horarios</router-link>
        </li>
      </ul>
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
nav {
  margin: 0;
  padding: 0;
  position: fixed;
  width: 100%;
  height: 7%;
}

h6{
  position: relative;
  top: 80%;
  left: 5%;
  font-size:3em;
}
span{
    color: #DDC77A;
}

ul {
  list-style: none;
  position: relative;
  right: 10%;
}
li {
  list-style: none;
  height:10%;
  width:5em;
}
.ruta{

  text-decoration: none;
  color: #2C5F66;
}
</style>
