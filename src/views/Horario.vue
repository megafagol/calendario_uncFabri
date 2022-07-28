<template>

  <body class="body-horarios">

    <div class="container col-xxl-12">
    
      <div class="container-1-linea col-2">
      
        <div class="container-h2 mt-4 col-12" >
        <h3 class="h2" >Nuevo Horario:</h3>
        </div>

        <div class="container-input mt-2 col-12">
        <input type="text" class="col-9" v-model="nuevoHorario" v-on:keyup.enter="agregarHorario" placeholder="Titulo Horario">
                          
        <b-button id="basic-addon" class="input-group-text col-3 bi bi-plus-circle-fill" variant="outline"
            @click="agregarHorario">
        </b-button>
        </div>

        <b-dropdown id="lista-horarios" name="Listado De Horarios" text="Tus Horarios" class="my-4 col-12 boton-titulos">
           
          <b-dropdown-item v-for="(item, index) of horarios" @click="tituloTabla" v-on>
          <div class="d-flex justify-content-between">
                  
              <div>
                {{ index }} - {{ item.nombre }}
              </div>
                  
              <div>
                <b-button variant="danger" class="btn-sm" @click="eliminarHorario">X</b-button>
                <b-button class="bi bi-pencil btn-sm" variant="info"></b-button> 
              </div>
                
          </div>
          </b-dropdown-item> 

        </b-dropdown>

        <h3 class="h3-tabla mb-2 col-12">Titulo de la tabla<hr></h3>
      
      <div class="containerbotones mt-4 col-12">
            
        <h3 class="h3">Personalizá tus <br>actividades y <br>materias según<br>tus tiempos.</h3>
           
        <div class="containeract my-3">
            
          <button v-b-modal.modal-Actividad variant="outline-info" class="boton-horario col-12 mb-2">Nueva Actividad</button>

            <b-modal id="modal-Actividad" centered title="Actividad">
            
              <p class="my-4">agregue una actividad</p>
            
                <div class="input-group mb-3" bg-secondary>

                  <div class="input-group-prepend">
                    <input type="text" class="form-control" v-model="nuevaActividad" v-on:keyup.enter="agregarActividad">

                    Desde<input type="time" class="form-control" v-model="horarioInicio" v-on:keyup.enter="agregarActividad">
                    
                    Hasta<input type="time" class="form-control" v-model="horarioFin" v-on:keyup.enter="agregarActividad"> 
                    
                    <b-button id="basic-addon" class="input-group-text bi bi-plus-circle-fill" variant="outline"
                        @click="agregarActividad">
                    </b-button>
                  </div>
      
                  <b-list class="">
                      
                    <b-item v-for="(item, index) of actividades">
                        
                      <div class="d-flex justify-content-between">
                          
                        <div>
                            {{ index }} - {{ item.nombre }}
                        </div>

                        <div>
                            <b-button variant="danger" class="btn-sm" @click="eliminarActividad">X</b-button>
                        </div>

                      </div>
                    </b-item>

                  </b-list>

                </div>
            </b-modal>
        </div> 
          <!-- cierre container act -->
        <div class="containermateria mb-4">
                
          <button v-b-modal.modal-materia variant="outline-warning" class="boton-horario col-12">Nueva Materia</button>

          <b-modal id="modal-materia" centered title="Seleccione una materia">
                  
            <p class="my-4">listado de materias</p>
          
              <b-dropdown id="dropdown-Materia" text="Materia 1" class="boton-modal m-2">
          
                <b-dropdown-item href="#">Materia 1</b-dropdown-item>
          
              </b-dropdown>
          
          </b-modal>
        </div>
           <!--cierre container materias--  -->
        <div class="containerexportar">
                
          <button v-b-modal.modal-exportar variant="outline-warning" class="boton-horario col-12">Exportar a...</button>

          <b-modal id="modal-exportar" centered title="Seleccione una materia">
                  
            <p class="my-4 ms-5">Exportar a:</p>

            <button class="boton-modal pdf col-4">PDF</button>
            <button class="boton-modal excel col-4 ms-4">EXCEL</button>
          
          </b-modal>
        </div>
      
      </div>

      </div>
                
      

      <!-- cierre div container linea 1 -->
      <div class="calendario col-9">

        <b-table class="tabla" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left responsive="sm">
        </b-table>
      </div>
    
    </div>

    <!-- <div class="container-publi">
      <img alt="" src="" style="background-color: blue;">
      <img alt="" src="" style="background-color: red;">
    </div> -->
    <img alt="logo-UNC" id="unc" src="@/assets/UNC2.svg" class="img-fluid">
  </body>
</template>
  <script>
import SaveComponent from '@/components/SaveComponent.vue';
export default {
    data() {
        return {
            nuevoHorario: "",
            horarios: [],
            nuevaActividad: "",
            actividades: [],
            nuevaMateria: "",
            materias: [],
            tituloTabla: {},
            sortBy: "cuatrimestre",
            sortDesc: false,
            name: "",
            nameState: null,
            submittedNames: [],
            fields: [
                { key: "Hora", sortable: true},
                { key: "Lunes" },
                { key: "Martes" },
                { key: "Miercoles" },
                { key: "Jueves" },
                { key: "Viernes" },
                { key: "Sabado" },
            ],
            items: [
                {Hora:"8:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"9:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"10:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"11:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"12:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"13:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"14:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
               
                {Hora:"15:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"16:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
               
                {Hora:"17:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"18:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"19:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"20:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},
                
                {Hora:"21:00", Lunes:"", Martes:"", Miercoles:"", Jueves:"", Viernes:"", Sabado:"",},                
            ],
        };
    },
    methods: {
        agregarHorario: function () {
            // console.log('diste click', this.nuevoHorario)
            this.horarios.push({
                nombre: this.nuevoHorario,
                estado: false
            });
            console.log(this.horarios);
            this.nuevoHorario = "";
        },
        agregarMateria: function () {
            //console.log('diste click' , this.nuevoHorario)
            this.materias.push({
                nombre: this.nuevaMateria,
                estado: false
            });
            console.log(this.materias);
            this.nuevaMateria = "";
        },
        agregarActividad: function () {
            this.actividades.push({
                nombre: this.nuevaActividad,
                estado: false
            });
            console.log(this.actividades);
            this.nuevaActividad = "";
        },
        eliminarHorario: function (index) {
            this.horarios.splice(index, 1);
        },
        eliminarActividad: function (index) {
            this.actividades.splice(index, 1);
        }
    },
    components: { SaveComponent }
}


</script> 

  <style>
 .container{  
    position: fixed;
    left:1%;
    top: 8%;
    background: rgb(245, 245, 245);
    box-shadow: 0px 1px 20px rgb(0 0 0 / 25%);
    border-radius: 10px;
    width:100vw;
    height:91vh;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
 }

 .container-1-linea{
  padding: 0 2%;
  width: 20%;
  position: relative;
  right:1%;
  border-radius: 10px;
  outline: 1px solid #2C5F66;
  background-color:#2C5F66;
  color:aliceblue;
 }

 h3{
  font-size:1.5em !important;
  font-family: sans-serif;
 }

 .boton-titulos{
  border:3px solid #DDC77A;
  border-radius:5px;
  background-color: #DDC77A !important;
  color: #2C5F66 !important;
 }

.boton-horario{
  height: 2.5em;
  border:none;
  border-radius:5px;
  background-color: #DDC77A;
  color: #2C5F66;
}

.boton-modal{
  height: 2em;
  border:none;
  border-radius:5px;
  background-color: #DDC77A;
  color: #2C5F66;
}
.input-group{
  display: flex;
  flex-direction: column;
}

.h3-tabla{
  text-align:center;
}
.tabla{
 font-size: .95em;
}
#unc{
    width: 38%;
    position: absolute;
    left: 62%;
    z-index: -1;
    margin: 1em 0 0 0;
}

  </style>