<template>
  <div class="body-horarios">
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

            <b-modal id="modal-Actividad" centered title="Actividad">
              <p class="my-4">Agregue una actividad</p>

              <div class="input-group mb-3" bg-secondary>
                <div class="input-group-prepend">
                  <input
                    type="text"
                    class="form-control"
                    v-model="nuevaActividad"
                    v-on:keyup.enter="agregarActividad"
                  />
                  Desde
                  <input type="time" class="form-control" />

                  Hasta
                  <input type="time" class="form-control" />
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
                      <div>{{ index }} - {{ item.nombre }}</div>

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
              </div>
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
              size="lg"
              centered
              title="Seleccione una carrera"
            >
              <!-- Selección de Carreras -->
            <b-row class="d-flex " cols-md="3">
              <p class="h6">Facultad</p>
              <b-form-select
                  :value="seleccionFacu"
                  :options="optionsFacu"
                  @change="changeSelectedFacultad"
                  size="sm"
                  class="mt-3 text-center"
                  style="background-color: beige"
                >
                </b-form-select>
                <!-- <div class="mt-3 mx-5">
                  Facultad
                  <strong class="mx-3">{{ seleccion }}</strong>
                </div> -->
            </b-row>
            <b-row cols="12">
              <div class="d-flex">
                <b-form-select
                  :value="seleccion"
                  :options="options"
                  @change="changeSelectedCareer"
                  size="m"
                  class="mt-3"
                  style="background-color: beige"
                >
                </b-form-select>
                <div class="mt-3 mx-5">
                  Código de Carrera:
                  <strong class="mx-3">{{ seleccion }}</strong>
                </div>
                <!-- Listado de Carreras -->

                <b-form-select
                  :value="seleccionSem"
                  :options="optionsSem"

                  size="sm"
                  class="mt-3"
                  style="background-color: beige"
                >
                </b-form-select>
                <div class="mt-3 mx-5">
                  Código de Carrera:
                  <strong class="mx-3">{{ seleccion }}</strong>
                </div>
              </div>
            </b-row>
              <!-- cierre Selección de Carreras -->
              <b-row>
                <div class="">
                  <p class="mt-3">Listado de materias</p>
                  <div class="">
                    <b-table
                      striped
                      hover
                      :items="listadoMaterias"
                      @row-clicked="materiaRowClicked"
                    >
                      <template slot="row-details">
                        <!-- <b-list-group v-for="com in comisionList" :key="com">
                          <b-list-group-item>{{ com }}</b-list-group-item> -->
                          <b-form-group>
                            <template #label>
                              <b-form-checkbox
                                v-model="allSelected"
                                :indeterminate="indeterminate"
                                aria-describedby="comisionList"
                                aria-controls="comisionList"
                                @change="toggleAll"
                              >
                                {{
                                  allSelected
                                    ? "Quitar seleccion"
                                    : "Seleccionar todo"
                                }}
                              </b-form-checkbox>
                            </template>

                            <template v-slot="{ ariaDescribedby }">
                              <b-form-checkbox-group
                                id="comisiones"
                                v-model="selected"
                                :options="comisionList"
                                :aria-describedby="ariaDescribedby"
                                name="comisiones"
                                class="ml-4 mx-2"
                                aria-label="Listado De Comisiones"
                                stacked
                              ></b-form-checkbox-group>
                            </template>
                          </b-form-group>
                        <!-- </b-list-group> -->
                      </template>
                    </b-table>
                  </div>
                </div>
              </b-row>
            </b-modal>
          </div>
          <!--cierre container materias--  -->
        </div>
      </div>

      <!-- cierre div container linea 1 -->

      <b-col class="p-2 bg-light">
        <p class="h2 text-capitalize text-center">
          {{ selectedHorario.nombre }}
        </p>
        <b-row class="border border-dark rounded justify-content-center">
          <b-row
            class="bg-light d-flex-row justify-content-center p-1 m-2 w-100"
          >
            <div>
              <b-table hover :items="dias"></b-table>
              <!-- <div>Selected: <strong>{{ selected }}</strong></div> -->
            </div>
          </b-row>

          <b-row>
            <blockquote class="blockquote text-end">
              <button class="boton-modal pdf col-4">PDF</button>
              <button class="boton-modal excel col-4 ms-4">EXCEL</button>
            </blockquote>
          </b-row>
        </b-row>
      </b-col>
    </div>

    <img
      alt="logo-UNC"
      id="unc1"
      src="@/assets/UNC2.svg"
      class="img-fluid col-5"
    />
  </div>
</template>

<script>
import * as horarios from "@/api/horarios";
import { http } from "../utils/axios";

export default {
  data() {
    return {
      nuevoHorario: "",
      horarios: [],
      facultadesList:{},
      careerList: {},
      nuevaActividad: "",
      actividades: [],
      name: "",
      selectedHorario: {},
      selectedMateriasArray: [],
      selectedMateria: null,
      seleccionSem: null,
      seleccionFacu: null,
      selected: [],
      seleccion: null,
      options: [{ value: "null", text: "Seleccione su Carrera" }],//materias
      optionsFacu: [{ value: "null", text: "Seleccione su Facultad" }],//facultades
      optionsSem: [{ value: "null", text: "Seleccione un Semestre" }],//semestres
      listadoMaterias: [],
      nameComision: [],
      detailsComision: {},
      comisionList: [],
      allSelected: false,
      indeterminate: false,
      items: [],
      id:[],
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
      const careerList = await this.getCareerList();
      this.careerList = careerList.data.carreras;
      this.options = Object.keys(this.careerList).map((key) => {
        return { value: key, text: this.careerList[key] };
      });
    } catch (error) {
      console.log(err);
    }
  },

  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.comisionList.slice() : [];
    },
    changeSelectedFacultad: async function (seleccion) {
      this.seleccionFacu = seleccion;
      this.items.seleccionFacu = seleccion;
      this.factuladesList = await this.getMateriasList();
      this.listadoMaterias = this.factuladesList.data.nombres.map((name) => {
        return { nombre: name };
      });
    },
    changeSelectedCareer: async function (seleccion) {
      this.seleccion = seleccion;
      this.items.selected = seleccion;
      this.materiaList = await this.getMateriasList();
      this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
        return { nombre: name };
      });
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

      var values = [];
      for (let key in this.facultadesList){
        values.push(this.facultadesList[key]);
      }

      console.log("values: " + values);

      this.optionsFacu = values;

      this.facultadesList = Object.keys(this.facultadesList).map((key) => {
        return { value: key, name: this.facultadesList[key] };
      });



      return dataFacList;
    },
    // getCareerList: async function (item) {
    //   if (this.seleccion == "") return "";
    //   const dataList = await http.get("/get-carreras");
    //   this.careerList = dataList;
    //   this.carreras = Object.keys(this.careerList).map((key) => {
    //     return { value: key, name: this.careerList[key] };
    //   });
    //   return dataList;
    // },
    
    getMateriasList: async function () {
      if (!this.seleccion) return [];

      const dataMateria = await http.get(
        `/get-nombres-materias/${this.seleccion}`
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
        nombre: this.nuevaActividad,
        estado: false,
      });

      this.nuevaActividad = "";
    },
    eliminarHorario: function (index) {
      this.horarios.splice(index, 1);
    },
    eliminarActividad: function (index) {
      this.actividades.splice(index, 1);
    },
    materiaRowClicked: async function (observer) {
      this.nameComision = observer.nombre;

      const comisionResponse = await http.get(
        `/get-comisiones/${this.seleccion}/${this.nameComision}`
      );

      this.comisionList = Object.keys(comisionResponse.data)
        .map((key) => key)
        .filter((el) => el !== "Materia");
      this.$set(observer, "_showDetails", !observer._showDetails);
      let allComisionDetails = Object.entries(comisionResponse.data);
      for(let[key, value] of Object.entries(allComisionDetails)){
        console.log(`${key}: ${value}`);d
      }
      console.log(allComisionDetails.find(value=>value.value))
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

.boton-titulos  {
  border: 3px solid #ddc77a ;
  border-radius: 5px;
  background-color: #ddc77a ;
  color: #2c5f66 ;
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

.social-icon {
  color: black;
  text-align: center;
}

.social-icon:hover {
  color: grey;
  display: inline;
}

.tableModal {
  height: 50vh;
  overflow-y: scroll;
}

#unc {
  width: 38%;
  position: absolute;
  left: 62%;
  z-index: -1;
  margin: 1em 0 0 0;
}

#unc1 {
  width: 38%;
  position: absolute;
  left: 62%;
  z-index: 50;
  margin: 1em 0 0 0;
  z-index: -1;
}
</style>
