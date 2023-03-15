<template>
  <div class="body-horarios">
    <img
      alt="logo-UNC"
      id="unc1"
      src="@/assets/UNC2.svg"
      class="img-fluid col-5"
    />
    <div class="container col-xxl-12">
      <div class="container-1-linea col-2">
        <div class="container-h2 mt-4 col-12">
          <h3 class="h2">Nuevo Horario:</h3>
        </div>

        <div class="container-input mt-2 col-12">
          <input
            type="text"
            class="col-9 bg-light rounded"
            v-model="nuevoHorario"
            v-on:keyup.enter="agregarHorario"
            placeholder="  Agrega un Horario"
          />

          <b-button
            id="basic-addon"
            class="input-group-text col-3 bi bi-plus-circle-fill"
            variant="outline"
            @click="agregarHorario"
          >
          </b-button>
        </div>

        <b-dropdown
          id="lista-horarios"
          name="Listado De Horarios"
          text="Tus Horarios"
          class="my-4 col-12 boton-titulos"
        >
          <b-dropdown-item
            v-for="item of horarios"
            :key="item.id"
            @click="mostrarHorario(item)"
          >
            <div class="d-flex justify-content-between">
              <div>{{ item.id }} - {{ item.nombre }}</div>

              <div>
                <b-button
                  variant="danger"
                  class="btn-sm"
                  @click="eliminarHorario"
                  >X</b-button
                >
                <b-button class="bi bi-pencil btn-sm" variant="info"></b-button>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
        <!-- Nombre Tabla -->

        <p class="h3 text-capitalize">{{ selectedHorario.nombre }}</p>

        <hr />

        <div class="containerbotones col-12">
          <p class="h5">
            Personalizá tus actividades y materias según tus
            tiempos.
          </p>

          <div class="containeract my-3">
            <!-- creador de actividad -->
            <button
              v-b-modal.modal-Actividad
              variant="outline-info"
              class="boton-horario col-12 mb-2"
            >
              Nueva Actividad
            </button>

            <b-modal 
              id="modal-Actividad" 
              ref="modal-Actividad"
              size="lg"
              centered 
              title="Actividad"
            >
              <p class="h4">Agregue una actividad</p>
              <div class="input-group mb-3" bg-secondary>
                <div class="input-group-prepend">
                  <br>
                  <p class="h6"> Dia </p>
                  <b-form-select
                    :value="seleccionDia"
                    :options="diasSemana"
                    @change="changeSelectedDia"
                    size="sm"
                    class="mt-3 drowdown-items"
                  >
                  </b-form-select>
                  <br>
                  <br>
                  <p class="h6">Actividad</p>
                  <input
                    type="text"
                    class="form-control"
                    v-model="nuevaActividadMateria"
                    v-on:keyup.enter="agregarActividad"
                  />
                  <br>
                  <p class="h6">Descripcion</p>
                  <input
                    type="text"
                    class="form-control"
                    v-model="nuevaActividadAula"
                    v-on:keyup.enter="agregarActividad"
                  />
                  <br>
                  <p class="h5">Hora inicio</p>
                  <input 
                  v-model="nuevaActividadInicio" 
                  type="time"
                  class="form-control" />
                  <p class="h5">Hora fin</p>
                  <input 
                  v-model="nuevaActividadFin" 
                  type="time" 
                  class="form-control" />
                  <b-button
                    id="basic-addon"
                    class="input-group-text bi bi-plus-circle-fill"
                    variant="outline"
                    @click="agregarActividad"
                  >
                  </b-button>
                </div>

                <b-list class="">
                  <b-item v-for="item of actividades" :key="item.nombre">
                    <div class="d-flex justify-content-between">
                      <div>{{item.dia}} | {{ item.materia }} - {{item.aula}} - {{item.inicio}} - {{item.fin}}</div>

                      <div>
                        <b-button
                          variant="danger"
                          class="btn-sm"
                          @click="eliminarActividad"
                          >X</b-button
                        >
                      </div>
                    </div>
                  </b-item>
                </b-list>

                <!-- <b-list class="">
                  <b-item v-for="item of this.actividades" :key="item.nuevaActividadMateria">
                    <div class="d-flex justify-content-between">
                      <div>- {{ item.nuevaActividadMateria }}</div>
                      <div>
                        <b-button
                          variant="danger"
                          class="btn-sm"
                          @click="eliminarActividad"
                          >X</b-button
                        >
                      </div>
                    </div>
                  </b-item>
                </b-list> -->
              </div>
              <template #modal-footer>
                <button v-b-modal.modal-close_visit @click="hideModalActividad" class="btn btn-danger btn-sm m-1">Cancel</button>
                <button v-b-modal.modal-close_visit @click="confirmarActividadesSeleccionadas" class="btn btn-success btn-sm m-1">Ok</button>
              </template>
            </b-modal>
          </div>
          <!-- cierre container act -->
          <div class="containermateria mb-4">
            <button
              v-b-modal.modal-materia
              variant="outline-warning"
              class="boton-horario col-12"
            >
              Nueva Materia
            </button>
            <!-- acá va el modal de materias -->
            <b-modal
              id="modal-materia"
              ref="modal-materia"
              size="lg"
              centered
              title="Seleccione una carrera"
            >
              <!-- Selección de Carreras -->
              <b-row class="d-flex flex-column">
                <b-col class="d-flex" cols="12">
                  <p class="h6">Facultad</p>
                  <b-form-select
                    :value="seleccionFacu"
                    :options="optionsFacu"
                    @change="changeSelectedFacultad"
                    size="sm"
                    class="mt-3 drowdown-items"
                  >
                  </b-form-select>
                </b-col>

                <div class="d-flex flex-column">
                  <hr width="100%" style="color: #ddc77a" />
                  <b-col class="d-flex">
                    <p class="h6">Carrera</p>
                    <b-form-select
                      :value="seleccionCareer"
                      :options="optionsCareer"
                      @change="changeSelectedCareer"
                      id="selectCarrera"
                      size="sm"
                      class="mt-3 drowdown-items"
                    >
                    </b-form-select>
                  </b-col>

                  <hr width="100%" style="color: #ddc77a" />
                  <b-col class="d-flex" cols="12">
                    <!-- Listado de Carreras -->
                    <b-col class="d-flex">
                      <p class="h6">Semestre</p>
                      <b-form-select
                        :value="seleccionSem"
                        :options="optionsPeriodos"
                        @change="changeSelectedPeriodo"
                        size="sm"
                        id="selectPeriodo"
                        class="mt-3 drowdown-items"
                      >
                      </b-form-select>
                    </b-col>
                    <b-col class="d-flex">
                      <p class="h6">Año de Carrera</p>
                      <b-form-select
                        :value="seleccionAnios"
                        :options="optionsAnios"
                        @change="changeSelectedAnio"
                        size="sm"
                        id="selectAnio"
                        class="mt-3 drowdown-items"
                      >
                      </b-form-select>
                    </b-col>
                  </b-col>
                  <hr width="100%" style="color: #ddc77a" />
                </div>
              </b-row>
              <!-- cierre Selección de Carreras -->
              <b-row>
                <div class="">
                  <p class="mt-3">Listado de materias</p>
                  <div class="">



                    <template>
                      <v-treeview
                        selectable
                        color="warning"
                        @update:open="onOpenMateria"
                        @input="onSelectedMateria"
                        :items="itemsMateriasComisiones"
                      ></v-treeview>
                    </template>


                  </div>
                </div>
              </b-row>
              <template #modal-footer>
                <button v-b-modal.modal-close_visit @click="hideModalMateria" class="btn btn-danger btn-sm m-1">Cancel</button>
                <button v-b-modal.modal-close_visit @click="confirmarComisionesSeleccionadas" class="btn btn-success btn-sm m-1">Ok</button>
              </template>
            </b-modal>
          </div>
          <!--cierre container materias--  -->
        </div>
      </div>

      <!-- cierre div container linea 1 -->



      <b-col class="p-2 bg-light scrollable">
      
        <template>
          <div>
            <b-progress :value="valueBar" :max="maxBar" show-progress animated></b-progress>
          </div>
        </template>

        <p class="h2 text-capitalize text-center">
          Materias y comisiones seleccionadas
        </p>

        <br>
        <p class="h5">Margen minimo entre materias (minutos)</p>
        <!-- <template>
  <div>
      <label for="range-2">Example range with min and max</label>
        <b-form-input id="range-2" v-model="margenMinimo" type="range" min="0" max="500"></b-form-input>
        <div class="mt-2">margenMinimo: {{ margenMinimo }}</div>
          </div>
</template> -->
        <input 
        v-model="margenMinimo" 
        type="number"
        class="form-control" />
        <br>

        <p class="h5">Mostrar actividades en el excel final</p>
        <input type="checkbox" id="checkbox" v-model="mostrarActividadesCheckbox">
        
        <b-row>
            <blockquote class="blockquote text-center">
              <!-- <button class="boton-modal pdf col-4">PDF</button> -->
              <button class="boton-modal excel col-4 ms-4 " @click="descargarExcel">DESCARGAR EXCEL</button>

            </blockquote>

            
        </b-row>

       

        <template>
          <v-treeview
            :items="itemsMateriasComisionesSeleccionadas"
          ></v-treeview>
        </template>



        <!-- <b-row class="border border-dark rounded justify-content-center">
          <b-row
            class="bg-light d-flex-row justify-content-center p-1 m-2 w-100"
          >
            <div>
              <b-table hover :items="dias"></b-table>
              
            </div>
          </b-row>

          <b-row>
            <blockquote class="blockquote text-end">
              <button class="boton-modal pdf col-4">PDF</button>
              <button class="boton-modal excel col-4 ms-4">EXCEL</button>
            </blockquote>
          </b-row>
        </b-row> -->
      </b-col>
    </div>


  </div>
</template>

<script>
import * as horarios from "@/api/horarios";
import { http } from "../utils/axios";

export default {
  data() {
    return {
      valueBar : 0,
      maxBar : 100,
      nuevoHorario: "",
      horarios: [],
      facultadesList:{},
      careerList: {}, //variable auxiliar
      nuevaActividad: "",
      actividades: [],
      materiasList: [],
      name: "",
      idDescargaPDF:"",
      actividadesBody:{},
      nuevaActividadMateria:"",
      nuevaActividadAula:"",
      nuevaActividadInicio:"",
      nuevaActividadFin:"",
      selectedHorario: {},
      parentAndChilds: {},
      idComisionesSelected : [],
      selectedMateriasArray: [],
      diasSemana: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
      seleccionDia: null,
      selectedMateria: null,
      seleccionSem: null,
      seleccionAnios: null,
      seleccionFacu: null,
      seleccionCareer: null,
      seleccionPeriodo: null,
      seleccionAnio: null,
      seleccionComision: null,
      selected: [],
      seleccion: null,
      optionsCareer: [{ value: "null", text: "Seleccione su Carrera" }],//materias
      optionsFacu: [{ value: "null", text: "Seleccione su Facultad" }],//facultades
      optionsPeriodos: [{ value: "null", text: "Seleccione un Semestre" }],//semestres
      listadoMaterias: [], 
      nameComision: [],
      detailsComision: {},
      itemsMateriasComisionesParent:{},
      comisionList: [],
      allSelected: false,
      indeterminate: false,
      items: [],
      itemsFacultades: [],
      id:[],
      periodosList:{},
      periodos:{},  
      optionsAnios: [{ value: "1", text: "1ro" },
                    { value: "2", text: "2ro" },
                    { value: "3", text: "3ro" },
                    { value: "4", text: "4ro" },
                    { value: "5", text: "5ro" },
                    { value: "6", text: "6ro" }],
      itemsMateriasComisionesSeleccionadas: [],
      itemsComTest : [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],

      itemsMateriasComisiones: []




    };
  },
  computed: {
    dias() {
      return [
        {
          hora: "8:00",
          lunes: "FISICA 1-Aula 203",
          martes: "",
          miercoles: "AMI-Aula 205",
          jueves: "",
          viernes: "",
          sabado: "",
        },
        {
          hora: "9:00",
          lunes: "FISICA 1-Aula 203",
          martes: "",
          miercoles: "AMI-Aula 205",
          jueves: "",
          viernes: "AMI-Aula 205",
          sabado: "",
        },
        {
          hora: "10:00",
          lunes: "ALGEBRA-Aula 504",
          martes: "REP ASISTIDA-Aula 500",
          miercoles: "AMI-Aula 205",
          jueves: "",
          viernes: "AMI-Aula 205",
          sabado: "",
        },
        {
          hora: "11:00",
          lunes: "ALGEBRA-Aula 504",
          martes: "REP ASISTIDA-Aula 500",
          miercoles: "",
          jueves: "QUIMICA-Aula 228",
          viernes: "AMI-Aula 205",
          sabado: "",
        },
        {
          hora: "12:00",
          lunes: "ALGEBRA-Aula 504",
          martes: "REP ASISTIDA-Aula 500",
          miercoles: "",
          jueves: "QUIMICA-Aula 228",
          viernes: "AMI-Aula 205",
          sabado: "",
        },
      ];
    },
  },

  async created() {
    try {
      // para los horarios
      const horarios = await this.getHorarios();
      this.selectedHorario = horarios[0];
      this.selectedMateriasArray = Object.keys(this.selectedHorario.materias);
      this.selectedMateria =
        this.selectedHorario.materias[this.selectedMateriasArray[0]];
      // Cierre funcion horarios
      const facultadesList = await this.getFacultadesList();
      this.facultadesList = facultadesList
      console.log(facultadesList.data)
      //this.optionsFacu = Object.keys(this.facultadesList).map((key) => {
      //  return { value: key, text: this.facultadesList[key] };
      //});
      // const careerList = await this.getCareerList();
      // this.careerList = careerList.data.carreras;
      
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.comisionList.slice() : [];
    },

    changeValueBar(valueBar) {
        this.valueBar = valueBar;
      },

    descargarExcel : async function(){
      console.log("Generando horarios y descargando excel");
      var valueBar = 10;



      console.log("margen minimo:" + this.margenMinimo);
      if(this.margenMinimo == undefined){
        console.log("margen minimo:" + this.margenMinimo);

        this.margenMinimo = 15;

        console.log("margen minimo:" + this.margenMinimo);
      }
      console.log("mostrarActividadesCheckbox:" + this.mostrarActividadesCheckbox);

      var body = {materias:[], actividades: this.actividadesBody, cantSolucionesBuscadas: 15, margenMinimo: this.margenMinimo, mostrarActividades: this.mostrarActividadesCheckbox};

      let dictMateriasAux = {};

      let comisionesAux = [];

      for(let idPadre in this.parentAndChilds){
              
        valueBar = valueBar + 10;
        for(let i = 0; i <  this.parentAndChilds[idPadre].length; i++){ //recorremos cada comision de 1 materia

          comisionesAux.push(this.parentAndChilds[idPadre][i].child.name); 
          
        }

          dictMateriasAux[this.parentAndChilds[idPadre][0].child.materia] = comisionesAux;
          comisionesAux = [];
      }

      body.materias.push({facultad: this.seleccionFacu, carrera: this.seleccionCareer, anio: this.seleccionAnio, periodo: this.seleccionPeriodo, dictMaterias: dictMateriasAux});

      

      console.log(body);

      

      /*
        parentAndChilds = {
          1: [{id:4, child:{info...}},{id:5 , child:{info...}}],
          2: [{id: 3, objeto}]
        }

        child:{
          materia:,
          name,
          info:{},
          pid,
        }

        parentFacultad = {   // CAMBIAR PARA VARIAS FACULTADES
          1: {facultad: , carrera, periodo anio}
          2: {facultad: , carrera, periodo anio}
        }

      */

      valueBar = 95
      this.changeValueBar(valueBar);

      const res = await http.post('/horario', body);


      console.log(res);

      if(res.data.soluciones.length == 0){
        alert("No se encontraron soluciones con los parametros ingresados");
      } else{

        const idDescarga = res.data.id;

        this.idDescargaPDF = idDescarga;
        valueBar = 100;
        this.changeValueBar(valueBar);



          http.post("/downloadExcel/" + idDescarga + "/horarios", {
              file_name: "horarios"
          }, {
              responseType: 'blob'
          }).then((response) => {
              const url = URL.createObjectURL(new Blob([response.data], {
                  type: 'application/vnd.ms-excel'
              }))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', "horarios")
              document.body.appendChild(link)
              link.click()
          });

        console.log(res);

      }

      // Limpio las variables para no tener que hacer F5

      this.parentAndChilds = {};
      this.itemsMateriasComisiones = [];
      this.itemsMateriasComisionesParent = [];
      this.itemsMateriasComisionesSeleccionadas = [];
      this.seleccionFacu = "";
      this.seleccionCareer = "";
      this.seleccionAnio = "";
      this.seleccionPeriodo = "";
      this.seleccionDia = "";
      this.actividadesBody = {};
      this.actividades = [];


      valueBar = 0;
      this.changeValueBar(valueBar);
    },


    confirmarComisionesSeleccionadas: function(){

      this.parentAndChilds = {};
      
      for(let i=0; i< this.idComisionesSelected.length; i++){ //length = 3
        let child = this.itemsMateriasComisionesParent[this.idComisionesSelected[i]]; // this.idComisionesSelected[i] = 2 , child = {}

        if(this.parentAndChilds[child.pid] == undefined){
          this.parentAndChilds[child.pid] = [];
        }
        this.parentAndChilds[child.pid].push({id: this.idComisionesSelected[i], child: child});

      }

      /*
      parentAndChilds = {
        1: [{id:4, child:{info...}}{id:5 , objeto}],
        2: [{id: 3, objeto}]
      }


      */

      let idLista = 1;

      for(let idPadre in this.parentAndChilds){
        let children = this.parentAndChilds[idPadre];

        /*
        children=[
                  "child": {info: {"dias":{"lunes": [], "martes": []}
                  pid: 2
                  name: com1
                  materia},

                  {info: {"dias":{"lunes": [], "martes": []}
                  pid: 2
                  name: com1
                  materia},

        ]
        */

        console.log("children: " + children);



        let idListaAux = idLista;
        
        idLista += 1;
        let childrenIdName = [];

        for(let j = 0; j < children.length; j++){

          console.log("children[j]", children[j]);
          console.log("children[j].child", children[j].child);

          let infoComision = "Comision: " + children[j].child.name + " -> "; 


          for(let dia in children[j].child.info.dias){

            for(let i = 0; i < children[j].child.info.dias[dia].length; i++){

              infoComision += dia + " | Inicio: " + children[j].child.info.dias[dia][i].inicio +
              "- Fin: " + children[j].child.info.dias[dia][i].fin + " | Aula: " + 
              children[j].child.info.dias[dia][i].aula + " | Modalidad: " +
              children[j].child.info.dias[dia][i].modalidad;

              childrenIdName.push({id: idLista,  name: infoComision});

              }
          }

          idLista += 1;
        }

        this.itemsMateriasComisionesSeleccionadas.push({id: idListaAux, name: this.parentAndChilds[idPadre][0].child.materia,
        children : childrenIdName});

        console.log(this.itemsMateriasComisionesSeleccionadas);

        
      }


            /*
      {
        1: [{id:4, objeto}{id:5 , objeto}],
        2: [{id: 3, objeto}]
      }
      
      options tree view

      [
        {
          id:1,
          name: FISICA
          children:[
            {
              id, name
              id, name
            }
          ]
        }
      ]
      
      */


      console.log("OK CLICKED");
      console.log(this.idComisionesSelected);




      
      this.hideModalMateria();
    },

    confirmarActividadesSeleccionadas: function(){

      let idLista = 50;

      let idListaAux = idLista;

      idLista += 1;

      var childrenDia = []; // Lunes {}
      var childrenActividad = []; // {inicio, fin}

      for(let dia in this.actividadesBody){

        let idListaAux1 = idLista;

        idLista += 1;
        
        for(let i = 0; i< this.actividadesBody[dia].length; i++){
          childrenActividad.push({id: idLista, name: this.actividadesBody[dia][i].materia + " | " + this.actividadesBody[dia][i].aula + " | Inicio: "+ this.actividadesBody[dia][i].inicio 
          + " - Fin: " + this.actividadesBody[dia][i].fin});
          
          idLista +=1;
        }

        childrenDia.push({id: idListaAux1, name: dia, children : childrenActividad});

        childrenActividad = [];

        idLista +=1;

      }


      this.itemsMateriasComisionesSeleccionadas.push({
        id:idListaAux,
        name: "Actividades",
        children: childrenDia
      });

    //  this.itemsMateriasComisionesSeleccionadas.push({
    //       id: 50,
    //       name: 'Applications :',
    //       children: [
    //         { id: 51, name: 'Calendar : app' },
    //         { id: 52, name: 'Chrome : app' },
    //         { id: 53, name: 'Webstorm : app' },
    //       ],
    //     })

      this.hideModalActividad();

    },

    hideModalMateria() {
        this.$refs['modal-materia'].hide()
      },

    hideModalActividad() {
        this.$refs['modal-Actividad'].hide()
    },


    onOpenMateria: function(e){

      //console.log('toggle arrow clicked', e)

    },

    onSelectedMateria: function(e){

      this.idComisionesSelected = e;  //[2,3,5]

      
      /*
      {
        1: [{id:4, objeto}{id:5 , objeto}],
        2: [{id: 3, objeto}]
      }
      
      options tree view

      [
        {
          id:1,
          name: FISICA
          children:[
            {
              id, name
              id, name
            }
          ]
        }
      ]
      
      */
      
      //console.log('checkbox clicked', this.idComisionesSelected);

    },


    allSelectedOptionsReadyToListMaterias: function() {
      var selectCarrera = document.getElementById("selectCarrera");
      var selectPeriodo = document.getElementById("selectPeriodo");
      var selectAnio = document.getElementById("selectAnio");
      
      if(selectCarrera.options[selectCarrera.selectedIndex] == undefined ||
        selectPeriodo.options[selectPeriodo.selectedIndex] == undefined ||
        selectAnio.options[selectAnio.selectedIndex] == undefined){
        return false;
      }else{
        return true;
      }
    },

    fillMateriasYComisionesList: async function() {
      this.materiaList = await this.getMateriasList();
      this.materiaList = this.materiaList.data;
      this.itemsMateriasComisiones = [];

      //[]

      var idLista = 1;
      for(let keyMateria in this.materiaList){

        let idListaAux = idLista;

        idLista += 1;

        let childrenComision = [];

        for(let keyComision in this.materiaList[keyMateria]){

          let infoComision = "Comision: " + keyComision + " -> "; 
          
          
          for(let dia in this.materiaList[keyMateria][keyComision].dias){

      
            for(let i = 0; i < this.materiaList[keyMateria][keyComision]["dias"][dia].length; i++){

              infoComision += dia + " | Inicio: " + this.materiaList[keyMateria][keyComision]["dias"][dia][i].inicio +
               "- Fin: " + this.materiaList[keyMateria][keyComision]["dias"][dia][i].fin + " | Aula: " + 
               this.materiaList[keyMateria][keyComision]["dias"][dia][i].aula + " | Modalidad: " +
               this.materiaList[keyMateria][keyComision]["dias"][dia][i].modalidad;
            }
          }
          
          childrenComision.push({id : idLista, name: infoComision,
               info: this.materiaList[keyMateria][keyComision]});

          this.itemsMateriasComisionesParent[idLista] = {materia:  keyMateria, pid: idListaAux, name: keyComision, info: this.materiaList[keyMateria][keyComision]};
        
          idLista += 1;
        }

        this.itemsMateriasComisiones.push({id: idListaAux, name: keyMateria, children: childrenComision });

      }


      console.log(this.itemsMateriasComisionesParent);
      console.log(this.itemsMateriasComisiones);


      this.listadoMaterias = Object.keys(this.materiaList.data).map((key) => {
        return { materia: key }; 
      });


      console.log(this.listadoMaterias);

    },



    changeSelectedFacultad: async function (seleccion) {
      this.seleccionFacu = seleccion;
      this.itemsFacultades.seleccionFacu = seleccion;
      await this.getCareerList();
      await this.getPeriodoList();
      },

    changeSelectedDia: function (seleccion){
      this.seleccionDia = seleccion;
    },
    changeSelectedCareer: async function (seleccion) {
      this.seleccionCareer = seleccion;
      this.items.selected = seleccion;
      //this.materiaList = await this.getMateriasList();
      // this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
      //   return { nombre: name };
      // });

      if(this.allSelectedOptionsReadyToListMaterias()){
        console.log("Todos los campos de selection estan listos");

        this.fillMateriasYComisionesList();

      } else{
        console.log("Algun campo de selection no esta listo");
      }

    },

    changeSelectedPeriodo: async function (seleccion) {
      this.seleccionPeriodo = seleccion;
      // this.seleccion = seleccion;
      // this.items.selected = seleccion;
      // this.materiaList = await this.getMateriasList();
      // this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
      //   return { nombre: name };
      // });

      if(this.allSelectedOptionsReadyToListMaterias()){
        console.log("Todos los campos de selection estan listos");

        this.fillMateriasYComisionesList();


      } else{
        console.log("Algun campo de selection no esta listo");
      }

    },

    changeSelectedAnio: async function (seleccion) {
      this.seleccionAnio = seleccion;
      // this.seleccion = seleccion;
      // this.items.selected = seleccion;
      // this.materiaList = await this.getMateriasList();
      // this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
      //   return { nombre: name };
      // });

      if(this.allSelectedOptionsReadyToListMaterias()){

        this.fillMateriasYComisionesList();

        console.log("Todos los campos de selection estan listos");
      } else{
        console.log("Algun campo de selection no esta listo");
      }

    },
    
    getHorarios: async function () {
      const data = await horarios.get();
      this.horarios = data;
      return data;
    },
    
    getFacultadesList: async function (item) {
      // if (this.seleccionFacu == "") return "";
      const dataFacList = await http.get("/facultades");
      this.facultadesList = dataFacList.data;
      console.log(this.facultadesList);


      this.facultadesList = Object.keys(this.facultadesList).map((key) => {
        return { value: key, text: this.facultadesList[key] };
      });

      this.optionsFacu = this.facultadesList;


      return dataFacList;
    },
    getCareerList: async function () {
      if (this.seleccion == "") return "";
      const dataList = await http.get(`/carreras/${this.seleccionFacu}`);
      console.log(dataList);
      this.careerList = dataList.data;
      this.carreras = Object.keys(this.careerList).map((key) => {
        return { value: key, text: this.careerList[key] };
      });
      this.optionsCareer = this.carreras;
      return dataList;
    },

    getPeriodoList: async function () {
      if (this.seleccion == "") return "";
      const dataList = await http.get(`/periodo/${this.seleccionFacu}`);
      this.periodosList = dataList.data;
      this.periodos = Object.keys(this.periodosList).map((key) => {
        return { value: key, text: this.periodosList[key] };
      });
      this.optionsPeriodos = this.periodos;
      return dataList;
    },

    
    getMateriasList: async function () {
      if (!this.seleccionFacu || !this.seleccionCareer || !this.seleccionPeriodo || !this.seleccionAnio) return [];

      const dataMateria = await http.get(
        `/comisiones/${this.seleccionFacu}/${this.seleccionCareer}/${this.seleccionAnio}/${this.seleccionPeriodo}`
      );
      return dataMateria;
    },
    agregarHorario: async function () {
      await horarios.post({
        nombre: this.nuevoHorario,
        estado: false,
      });
      this.getHorarios();
      this.nuevoHorario = "";
    },
    agregarMateria: function () {
      this.materias.push({
        nombre: this.nuevaMateria,
        estado: false,
      });
      this.nuevaMateria = "";
    },
    agregarActividad: function () {
      this.actividades.push({
        dia: this.seleccionDia,
        materia: this.nuevaActividadMateria,
        inicio: this.nuevaActividadInicio,
        fin: this.nuevaActividadFin,
        modalidad: "",
        aula: this.nuevaActividadAula,
        comision: "NO USAR",
        nombre: this.nuevaActividadMateria,
        estado: false
      });

      if(this.actividadesBody[this.seleccionDia] == undefined){
        this.actividadesBody[this.seleccionDia] = [];
      }
      
      this.actividadesBody[this.seleccionDia].push({
        materia: this.nuevaActividadMateria,
        inicio: this.nuevaActividadInicio+":00",
        fin: this.nuevaActividadFin+":00",
        modalidad: "",
        aula: this.nuevaActividadAula,
        comision: "NO USAR"})

      console.log(this.actividadesBody);
      console.log(this.actividades);

      this.nuevaActividadMateria = "";
      this.nuevaActividadAula = "";
      this.nuevaActividadInicio = "";
      this.nuevaActividadFin = "";
    },
    eliminarHorario: function (index) {
      this.horarios.splice(index, 1);
    },
    eliminarActividad: function (index) {
      this.actividades.splice(index, 1);
    },
    materiaRowClicked: async function (observer) {
      let nombreMateria = observer.materia;

      // 28823957ahjsdhsaj : FISICA 1

      // const comisionResponse = await http.get(
      //   `/get-comisiones/${this.seleccion}/${this.nameComision}`
      // );
      
      let comisiones = this.materiaList.data[nombreMateria];
      console.log(comisiones);


      /*
      Materia 1
            comision 1
            Lunes 8:00-10:00  13:00-16:00  *
            Martes 8:00-10:00

            comision 2
            Lunes 8:00-10:00
            Martes 8:00-10:00

            comision 3
            Lunes 8:00-10:00
            Martes 8:00-10:00
            
      Materia 2
            comision 1 
            Lunes 8:00-10:00    *
            Martes 8:00-10:00

            comision 2
            Lunes 8:00-10:00
            Martes 8:00-10:00

            comision 3
            Lunes 8:00-10:00
            Martes 8:00-10:00
      */
      //nombre materia
      //nombre comision
      //seleccionFacultad
      //seleccionCareer
      //seleccionAnio
      //seleccionPeriodo 
      //this.comisionList = Object.keys(comisiones);



      this.comisionList = Object.keys(comisiones).map((key) => {
        return { materia: nombreMateria, text: key, value: nombreMateria + "-" + key  };
      });
      
      this.$set(observer, "_showDetails", !observer._showDetails);
      // let allComisionDetails = Object.entries(comisiones);




      // for(let[key, value] of Object.entries(allComisionDetails)){
      //   console.log(`${key}: ${value}`);d
      // }
      // console.log(allComisionDetails.find(value=>value.value))
    },
    // facultadRowClicked: async function (observer) {
    //   this.nameComision = observer.nombre;

    //   const comisionResponse = await http.get(
    //     `/get-comisiones/${this.seleccion}/${this.nameComision}`
    //   );

    //   this.comisionList = Object.keys(comisionResponse.data)
    //     .map((key) => key)
    //     .filter((el) => el !== "Materia");
    //   this.$set(observer, "_showDetails", !observer._showDetails);
    //   let allComisionDetails = Object.entries(comisionResponse.data);
    //   for(let[key, value] of Object.entries(allComisionDetails)){
    //     console.log(`${key}: ${value}`);d
    //   }
    //   console.log(allComisionDetails.find(value=>value.value))
    // },
    datosComisiones: async function (observer) {},
  },
  // seleccionartodo, selecciona todo con un checkbox
  watch: {
    selected(newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.comisionList.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },
};
</script>

<style>
.container {
  position: fixed;
  left: 1%;
  top: 8%;
  background: rgb(245, 245, 245);
  box-shadow: 0px 1px 20px rgb(0 0 0 / 25%);
  border-radius: 10px;
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* volver a colocar width a 20% */
.container-1-linea {
  padding: 0 2%;
  width: 30%;
  position: relative;
  right: 1%;
  border-radius: 10px;
  outline: 1px solid #2c5f66;
  background-color: #2c5f66;
  color: aliceblue;
}

h3 {
  font-size: 1.5em !important;
  font-family: sans-serif;
}
.drowdown-items {
  background-color: #ddc87a62;
  width: 75%;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0.5px 20px rgb(0 0 0 / 15%);
}
.boton-titulos {
  border: 3px solid #ddc77a;
  border-radius: 5px;
  background-color: #ddc77a;
  color: #2c5f66;
}

.scrollable {
   overflow-y: scroll;
}

.boton-horario {
  height: 2.5em;
  border: none;
  border-radius: 5px;
  background-color: #ddc77a;
  color: #2c5f66;
}

.boton-modal {
  height: 1.5em;
  border: none;
  border-radius: 4px;
  background-color: #ddc77a;
  color: #2c5f66;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.h3-tabla {
  text-align: center;
}

.tabla {
  font-size: 0.95em;
}

.tableModal {
  height: 50vh;
  overflow-y: scroll;
}

.v-treeview-node__label{
  white-space: normal !important;
}

</style>
