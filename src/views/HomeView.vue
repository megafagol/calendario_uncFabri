<template>

  <body id="body">

      <div id="container1" class="container1 col-7 row px-2 py-2">

          <div class="container-input row col-12 pb-2">
              <h1 class="title">TUTORIAL</h1>

              <div class="container-i-1 col-12 ms-3 mb-2">

                  <p class="descripcion col-12">
                      Bienvenidos a UNCalendario.<br>
                      Es una herramienta que te permitirá crear tu horario en función de tus actividades y tiempo
                      disponible.
                      De manera que podrás gestionar las materias que deseas cursar este cuatrimestre y combinar sus
                      horarios para poder elaborar tu calendario de manera personalizada.
                      <br>Aquí te dejamos un video con la explicación de como funciona.
                  </p>

                  <iframe class="video col-12" src="" type="" preload="auto"></iframe>

              </div>

              <div id="container-button" class="container-button mx-0">

                  <a href="/Horarios">

                      <button type="button" id="button2" class="btn col-12" url="Horarios">
                          <router-link class="ruta" to="/Horarios"></router-link>
                          <b>Constuir Mi Horario</b>
                      </button>

                  </a>
              </div>

          </div>

      </div>

      <img alt="logo-UNC" id="unc1" src="@/assets/UNC2.svg" class="img-fluid col-5">

      <footer id="footer" class="footer col-12">
          <img src="@/assets/unc.png" id="unc2" class="img-fluid">
      </footer>

  </body>
</template>

<script>

</script> 

<style>
#body {
  margin: 0;
  background-color: rgb(255, 255, 255);
  font-family: 'public sans';
  padding: 0;
  box-sizing: border-box;
  height: 90vh;
  width: 100vw;
  z-index: -1;
}

.container1 {
  position: absolute;
  left: 10%;
  top: 10%;
  height: 77%;
  background: rgb(245, 245, 245);
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 0;
  z-index: 100;
}

.title {
  font-family: sans-serif;
  text-align: center;
  margin: 0;
  color: #2C5F66;
  text-align: center;
  position: relative;
  right: auto;
  left: auto;
  height: 10%;

}

.container-i-1 {
  height: 75%;
  margin: 0;
  padding: 1%;
  border: 3px solid #2C5F66;
  border-radius: 10px;
}

p {
  font-family: sans-serif;
}

.video {
  background-color: #DDC77A;
}



#unc1 {
  width: 33%;
  position: absolute;
  left: 59%;
  z-index: 50;
  margin: 1em 0 0 0;
}


#button2 {
  border: none;
  background-color: #DDC77A;
  color: #2C5F66;
  font-family: sans-serif;
}

button:hover {
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.5);
}

#button3 {
  position: relative;
  left: 66%;
  top: 10%;
  text-decoration: none;
  color: #2C5F66;
  background-color: #DDC77A;
  border: none;
  border-radius: 8%;
  width: 9em;
  height: 3em;
  font-size: 1em;
  font-family: sans-serif;
}

#footer {
  position: relative;
  top: 34em;
  background-color: #2C5F66;
  margin: 0;
  height: 4em;
  z-index: 100;
}

#unc2 {
  position: relative;
  left: 5%;
  top: 10%;
  width: 10em;
  z-index: 1;
}
</style>