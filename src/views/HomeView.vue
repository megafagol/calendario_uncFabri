<template>
  <body id="body">
    <div id="container1" class="container1 col-7 row px-2 py-2">
      <div class="container-input row col-12 pb-2">
        <h1 class="title">
          Bienvenidos a UNC<span class="title-2">alendario</span>
        </h1>

        <div class="container-i-1 col-12 ms-3 mb-2">
          <p class="descripcion col-12">
            <br />
            UNCalendario es una herramienta que te permitirá crear tu horario en
            función de tus actividades y tiempo disponible. De manera que podrás
            gestionar las materias que deseas cursar este cuatrimestre y
            combinar sus horarios para poder elaborar tu calendario de manera
            personalizada.
            <br />Aquí te dejamos un video con la explicación de como funciona.
          </p>
          <div col-12>
            <iframe
              class="tutorialVid"
              src="https://www.youtube.com/embed/kH4BhWgh3Nk"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div id="container-button" class="container-button mx-0">
          <a href="/Horarios">
            <button
              type="button"
              id="button2"
              class="btn col-12"
              url="Horarios"
            >
              <router-link class="ruta" to="/Horarios"></router-link>
              <b>Constuir Mi Horario</b>
            </button>
          </a>
        </div>
      </div>
    </div>

    <img
      alt="logo-UNC"
      id="unc1"
      src="@/assets/UNC2.svg"
      class="img-fluid col-5"
    />

    <footer id="footer" class="footer col-12">
      <img src="@/assets/unc.png" id="unc2" class="img-fluid" />
    </footer>
  </body>
</template>

<script>
</script> 

<style>
#body {
  margin: 0;
  background-color: rgb(255, 255, 255);
  font-family: "public sans";
  box-sizing: border-box;
  min-height: 95vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr auto;
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
  color: #2c5f66;
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
  border: 3px solid #2c5f66;
  border-radius: 10px;
}

p {
  font-family: sans-serif;
}

.video {
  background-color: #ddc77a;
}
.tutorialVid {
  width: 100%;
  max-width: 560;
  height: 100%;
  max-height: 315;
}

#unc1 {
  width: 100%;
  max-width: 75vh;
  position: relative;
  left: 54%;
  margin: 1em 0 0 0;
  opacity: 15%;
}

#button2 {
  border: none;
  background-color: #ddc77a;
  color: #2c5f66;
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
  color: #2c5f66;
  background-color: #ddc77a;
  border: none;
  border-radius: 8%;
  width: 9em;
  height: 3em;
  font-size: 1em;
  font-family: sans-serif;
}

#footer {
  background-color: #2c5f66;
  height: 100%;
  max-height: 4em;
  max-width: 100%;
}

#unc2 {
  position: relative;
  left: 5%;
  top: 10%;
  max-width: 10em;
  width: 75%;
 
}
</style>