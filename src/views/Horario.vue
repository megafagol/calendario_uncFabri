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
            class="col-9"
            v-model="nuevoHorario"
            v-on:keyup.enter="agregarHorario"
            placeholder="Agrega un Horario"
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

        <div class="containerbotones mt-4 col-12">
          <p class="h5">
            Personalizá tus <br />actividades y <br />materias según<br />tus
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
                  <input
                    type="time"
                    class="form-control"
                    v-model="horarioInicio"
                  />

                  Hasta
                  <input
                    type="time"
                    class="form-control"
                    v-model="horarioFin"
                  />
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
              title="Seleccione una materia"
            >
              <!-- Selección de Carreras -->

              <div class="d-flex">
                <!-- Listado de Carreras -->

                <b-form-select
                  :value="selected"
                  :options="options"
                  @change="changeSelectedCareer"
                  size="sm"
                  class="mt-3"
                >
                </b-form-select>
                <div class="mt-3 mx-5">
                  Código de Carrera:
                  <strong class="mx-3">{{ selected }}</strong>
                </div>
              </div>
              <!-- cierre Selección de Carreras -->
              <b-row>
                <div class="">
                  <p class="mt-3">Listado de materias</p>
                  <div class="accordion" role="tablist">
                    <b-card no-body class="mb-1">
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-1 variant="info"
                          >Accordion 1</b-button
                        >
                      </b-card-header>
                      <b-collapse
                        id="accordion-1"
                        visible
                        accordion="my-accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <b-card-text
                            >I start opened because <code>visible</code> is
                            <code>true</code></b-card-text
                          >
                          <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                  <div class="tableModal">
                    <b-table striped hover :items="listadoMaterias"></b-table>
                  </div>
                </div>
              </b-row>
            </b-modal>
          </div>
          <!--cierre container materias--  -->
          <div class="containerexportar">
            <button
              v-b-modal.modal-exportar
              variant="outline-warning"
              class="boton-horario col-12"
            >
              Exportar a...
            </button>

            <b-modal
              id="modal-exportar"
              centered
              title="Seleccione una materia"
            >
              <p class="my-4 ms-5">Exportar a:</p>

              <button class="boton-modal pdf col-4">PDF</button>
              <button class="boton-modal excel col-4 ms-4">EXCEL</button>
            </b-modal>
          </div>
        </div>
      </div>

      <!-- cierre div container linea 1 -->

      <b-col class="p-2 bg-light">
        <p class="h2 text-capitalize text-center">
          {{ selectedHorario.nombre }}
        </p>
        <b-button
          class="ms-2"
          v-for="materia in selectedMateriasArray"
          :key="materia"
          @click="selectMateria(materia)"
        >
          {{ materia }}</b-button
        >
        <b-row>
          <b-col>
            <b-table
              :items="selectedMateria"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              sort-icon-left
              responsive="sm"
            >
            </b-table>
          </b-col>
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
      text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,
      careerList: {},

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
      selectedHorario: {},
      selectedMateriasArray: [],
      selectedMateria: {},
      slectedComision: {},
      selected: null,
      selectedCareer: {},
      selectedCareerArray: [],
      options: [
        { value: null, text: "Por favor elija su Carrera" },
        { value: "I-COMP", text: "Ingeniería en Computación" },
      ],

      listadoMaterias: [],
      materiaDetails: {}, //detalla los datos de las materias comision-profesor, etc
    };
  },
  async created() {
    try {
      const horarios = await this.getHorarios();
      this.selectedHorario = horarios[0];
      this.selectedMateriasArray = Object.keys(this.selectedHorario.materias);
      this.selectedMateria =
        this.selectedHorario.materias[this.selectedMateriasArray[0]];
      const careerList = await this.getCareerList();
      this.careerList = careerList.data.carreras;
      this.options = Object.keys(this.careerList).map((key) => {
        return { value: key, text: this.careerList[key] };
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    changeSelectedCareer: async function (selected) {
      this.selected = selected;
      this.materiaList = await this.getMateriasList();

      this.optionsMaterias = this.materiaList.data.nombres.map((name) => {
        return { value: name, text: name };
      });

      this.optionsMaterias.unshift({
        value: null,
        text: "Por favor elija su Materia",
      });

      this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
        return { nombre: name };
      });
    },
    materiaDetails: async function (materiaDetailsList) {
      this.selectedHorario;
    },
    selectMateria: function (materia) {
      this.selectedMateria = this.selectedHorario.materias[materia];
    },
    getHorarios: async function () {
      const data = await horarios.get();
      this.horarios = data;
      return data;
    },
    getCareerList: async function () {
      const dataList = await http.get("/get-carreras");
      this.careerList = dataList;
      return dataList;
    },
    getMateriasList: async function () {
      if (!this.selected) return [];

      const dataMateria = await http.get(
        `/get-nombres-materias/${this.selected}`
      );

      return dataMateria;
    },
    mostrarHorario: function (horario) {
      this.selectedHorario = horario;
      this.selectedMateriasArray = Object.keys(horario.materias);
      this.selectedMateria = horario.materias[this.selectedMateriasArray[0]];
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
      //console.log('diste click' , this.nuevoHorario)
      this.materias.push({
        nombre: this.nuevaMateria,
        estado: false,
      });
      console.log(this.materias);
      this.nuevaMateria = "";
    },
    agregarActividad: function () {
      this.actividades.push({
        nombre: this.nuevaActividad,
        estado: false,
      });
      console.log(this.actividades);
      this.nuevaActividad = "";
    },
    eliminarHorario: function (index) {
      this.horarios.splice(index, 1);
    },
    eliminarActividad: function (index) {
      this.actividades.splice(index, 1);
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

.boton-titulos {
  border: 3px solid #ddc77a;
  border-radius: 5px;
  background-color: #ddc77a !important;
  color: #2c5f66 !important;
}

.boton-horario {
  height: 2.5em;
  border: none;
  border-radius: 5px;
  background-color: #ddc77a;
  color: #2c5f66;
}

.boton-modal {
  height: 2em;
  border: none;
  border-radius: 5px;
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
