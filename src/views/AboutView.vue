<template>
  <b-container fluid class="text-center">
    <b-row class="">
      <b-col cols="6" class="d-flex">
        <b-col cols="6">
          <b-dropdown id="dropdown-left" text="Horario 1" variant="outline-success" class="m-2">
            <b-dropdown-item href="#">Horario 1</b-dropdown-item>
          </b-dropdown>

        </b-col>
        <b-col cols="6" class="my-auto mx-auto">
          <div class="input-group mb-3">

            <input type="text" class="form-control" placeholder="Horario..." aria-label="Username"
              aria-describedby="basic-addon1">
            <div class="input-group-prepend">
              <span class="input-group-text" @click="create" id="basic-addon"><i
                  class="bi bi-plus-circle-fill"></i></span>
              <span class="input-group-text" @click="edit" id="basic-addon1"><i class="bi bi-pencil"></i></span>
            </div>
          </div>
        </b-col>
      </b-col>
      <b-col class="bg-secondary">
        <p class="h4">Horario 1</p>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col class=" ">
        <b-card>
          <b-row class="justify-content-around">
            <b-col class="align-self-center">
              <b-button variant="success" class="text-center">Actividad</b-button>
            </b-col>
            <b-col class="align-self-center">
              <b-button variant="success" class="text-center">Materia</b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col>

              <b-table :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left
                responsive="sm">
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col class="p-2 bg-success">
        <h2>SUBTEXTO2</h2>
      </b-col>
    </b-row>



    <footer class="bg-success">
    <img src="../assets/unc.png" class="justify-self-end" alt="">
  </footer>
 
  </b-container>

</template>
<script>
export default {
  data() {
    return {
      timetable: [],

      sortBy: 'cuatrimestre',
      sortDesc: false,
      fields: [
        { key: 'tipo_actividad', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'cuatrimestre', sortable: true },

      ],
      items: [
        { cuatrimestre: 1, first_name: 'Dickerson', tipo_actividad: 'Macdonald' },
        { cuatrimestre: 1, first_name: 'Larsen', tipo_actividad: 'Shaw' },
        { cuatrimestre: 3, first_name: 'Geneva', tipo_actividad: 'Wilson' },
        { cuatrimestre: 5, first_name: 'Jami', tipo_actividad: 'Carney' }
      ]
    }
  },
  methods: {
    create() {
      if (this.hasValidInput()) {
        const timetableName = `${this.last}, ${this.first}`
        if (!this.timetable.includes(timetableName)) {
          this.timetable.push(timetableName)
          this.first = this.last = ''
        }
      }
    },
    update() {
      if (this.hasValidInput() && this.selected) {
        const i = this.timetable.indexOf(this.selected)
        this.timetable[i] = this.selected = `${this.last}, ${this.first}`
      }
    },
    del() {
      if (this.selected) {
        const i = this.timetable.indexOf(this.selected)
        this.timetable.splice(i, 1)
        this.selected = this.first = this.last = ''
      }
    },
    hasValidInput() {
      return this.first.trim() && this.last.trim()
    }
  }
}
</script>
  
}
</script>
<style>
.basic-addon1 {
  color: green;
}
</style>