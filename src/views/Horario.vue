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
              title="Seleccione una Carrera"
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
                  style="background-color: beige;"
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
                  <div class="">
                    <b-table
                      striped
                      hover
                      :items="listadoMaterias"
                      @row-clicked="myRowClickHandler"
                    >
                      <template slot="row-details">{{ allOpenRows }} </template>
                    </b-table>
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
              title="Usted puede exportar a:"
            >
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
        <v-treeview
          selectable
          item-disabled="locked"
          :items="items"
          open-on-click

        >{{}}</v-treeview>
        <!-- 
        <b-button
          class="ms-2"
          v-for="materia in selectedMateriasArray"
          :key="materia"
          @click="selectMateria(materia)"
        >
          {{ materia }}</b-button
        > -->
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
      careerList: {},
      detailComisionList: {},
      nuevaActividad: "",
      actividades: [],
      tituloTabla: {},
      name: "",
      selectedHorario: {},
      selectedMateriasArray: [],
      selectedMateria: null,
      selectedCareer: {},
      selectedComision: {},
      selected: null,
      options: [{ value: "null", text: "Por favor elija su Carrera" }],
      optionsComision: [],
      comisionDetails: {},
      listadoComisiones: [],
      listadoMaterias: [],
      nameComision: [],
      allOpenRows: [],
      items: [
        {
          id:'',
          selected: '',
          locked: false,
          children: [
            { id: '', name: '' },
          ],
        },
      ],
    };
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
    changeSelectedCareer: async function (selected) {
      this.selected = selected;
      this.items.selected = selected;
      this.materiaList = await this.getMateriasList();
      this.listadoMaterias = this.materiaList.data.nombres.map((name) => {
        return { nombre: name };
      });
    },
    showDetailsComision: async function (selectedComision) {
      this.selectedComision = selectedComision;
      console.log(selectedComision);
      this.details = await this.myRowClickHandler(comisionList);
      this.optionsComision = Object.keys(comisionList.data).map((key) => {
        return { text: key };
      });
      console.log(optionsComision);
      return details;
    },
    getHorarios: async function () {
      const data = await horarios.get();
      this.horarios = data;
      return data;
    },
    getCareerList: async function () {
      if (this.selected == "") return "";
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
    myRowClickHandler: async function (observer) {
      this.nameComision = observer.nombre;
      var comisionList = await http.get(
        `/get-comisiones/${this.selected}/${this.nameComision}`
      );
      console.log(comisionList);
      this.allOpenRows = [];
      this.$set(observer, "_showDetails", !observer._showDetails);

      this.allOpenRows.push(
        Object.keys(comisionList).map((key) => {
          if (key == "data") {
            if (key != "Materia") {
              return {
                text: comisionList[key],
              };
            }
          }
        })
      );
      return comisionList.data;
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
