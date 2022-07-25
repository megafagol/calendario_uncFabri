<template>
  <div class="container col-xxl-12">
    
    <div class="container-1-linea row mb-4 col-12">
      <b-dropdown id="lista-horarios" name="Listado De Horarios" text="Tus Horarios" variant="outline-success" class="dropdown my-2 col-3">
           
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

      <div class="container-p ms-5 mt-3 col-2" >
        <p class="p" >Nuevo Horario:</p>
      </div>

      <div class="container-p mt-3 col-4">
        <input type="text" class="" v-model="nuevoHorario" v-on:keyup.enter="agregarHorario">
                          
          <b-button id="basic-addon" class="input-group-text bi bi-plus-circle-fill" variant="outline"
            @click="agregarHorario">
          </b-button>
      </div>

    </div>                
      
     

    <b-row class="">
      <b-col class=" ">
        <b-card>
          <b-row>
            <p class="h2">Titulo de la tabla</p>
            <b-col class="align-self-center">
              <div>
                <b-button v-b-modal.modal-Actividad variant="outline-info">Actividad</b-button>

                <b-modal id="modal-Actividad" centered title="Actividad">
                  <p class="my-4">agregue una actividad</p>
                  <div class="input-group mb-3">

                    <input type="text" class="form-control" v-model="nuevaActividad"
                      v-on:keyup.enter="agregarActividad">
                    <div class="input-group-prepend">
                      <b-button id="basic-addon" class="input-group-text bi bi-plus-circle-fill" variant="outline"
                        @click="agregarActividad">
                      </b-button>
                    </div>
                    <b-list>
                      <b-item v-for="(item, index) of actividades">
                        <div class="d-flex justify-content-between">
                          <div>
                            {{ index }} - {{ item.nombre }}
                          </div>
                          <div>
                            <b-button variant="danger" class="btn-sm" @click="eliminarActividad">X</b-button>
                            <!-- <b-button class="bi bi-pencil btn-sm" variant="info"></b-button> -->
                          </div>
                        </div>
                      </b-item>
                    </b-list>
                  </div>
                </b-modal>
              </div>


              <div>
                <b-button v-b-modal.modal-materia variant="outline-warning">Materia</b-button>

                <b-modal id="modal-materia" centered title="Seleccione una materia">
                  <p class="my-4">listado de materias</p>
                  <b-dropdown id="dropdown-Materia" text="Materia 1" variant="outline-success" class="m-2">
                    <b-dropdown-item href="#">Materia 1 </b-dropdown-item>
                  </b-dropdown>
                </b-modal>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col class="p-2 bg-light">
        <b-row>
          <b-col>

            <b-table :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left
              responsive="sm">
            </b-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </div>



</template>
  <script>
export default {
  data() {
    return {
      nuevoHorario: '',
      horarios: [],

      nuevaActividad: '',
      actividades: [],

      nuevaMateria: '',
      materias: [],

      tituloTabla: {},


      sortBy: 'cuatrimestre',
      sortDesc: false,
      name: '',
      nameState: null,
      submittedNames: [],
      fields: [
        { key: 'nombre', sortable: true },
        { key: 'tipo_de_actividad', sortable: true },
        { key: 'cuatrimestre', sortable: true },

      ],
      items: [
        { cuatrimestre: 1, nombre: 'Dickerson', tipo_actividad: 'Macdonald' },
      ],
    }
  },
  methods: {
    agregarHorario: function () {
      // console.log('diste click', this.nuevoHorario)
      this.horarios.push({
        nombre: this.nuevoHorario,
        estado: false
      });
      console.log(this.horarios);
      this.nuevoHorario = '';
    },
    agregarMateria: function () {
      //console.log('diste click' , this.nuevoHorario)
      this.materias.push({
        nombre: this.nuevaMateria,
        estado: false
      });
      console.log(this.materias);
      this.nuevaMateria = '';
    },
    agregarActividad: function () {
      this.actividades.push({
        nombre: this.nuevaActividad,
        estado: false
      });
      console.log(this.actividades);
      this.nuevaActividad = '';
    },
    eliminarHorario: function (index) {
      this.horarios.splice(index, 1)
    },
    eliminarActividad: function (index) {
      this.actividades.splice(index, 1)
    }
  },
}


</script> 

  <style>
 .container{  
    position: fixed;
    left:3%;
    top: 10%;
    background: rgb(245, 245, 245);
    box-shadow: 0px 1px 20px rgb(0 0 0 / 25%);
    border-radius: 10px;
 
    width:90%;
    height:80%;
 }

  </style>