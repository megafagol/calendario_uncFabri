<template>
  <b-container fluid class="text-center">
    <b-row>
      <b-col cols="6" class="d-flex">
        <b-col cols="6">
          <b-dropdown id="dropdown-left" text="Horario 1" variant="outline-success" class="m-2">
            <b-dropdown-item href="#">Horario 1</b-dropdown-item>
            <b-dropdown-item href="#">Horario 2</b-dropdown-item>
            <b-dropdown-item href="#">Agregar</b-dropdown-item>
          </b-dropdown>

        </b-col>
        <b-col cols="6" class="bg-warning">
          <p>Horario 1
             <i class="bi bi-pencil"></i>
          </p>
          
        </b-col>
      </b-col>
      <b-col class="bg-secondary">
        <h1>TEXTO 2</h1>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col class="p-2  ">
        <b-card>
          <b-col class="">
            <p class="h5 d-flex justify-content-between">
              <b-button variant="success" class="text-center">
                Materia
              </b-button>
              <b-button variant="success" class="text-center">
                Actividad
              </b-button>
            </p>
          </b-col>
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
  </b-container>

</template>
<script>
export default {
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'tipo_actividad', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'age', sortable: true },

      ],
      items: [
        { age: 40, first_name: 'Dickerson', tipo_actividad: 'Macdonald' },
        { age: 21, first_name: 'Larsen', tipo_actividad: 'Shaw' },
        { age: 89, first_name: 'Geneva', tipo_actividad: 'Wilson' },
        { age: 38, first_name: 'Jami', tipo_actividad: 'Carney' }
      ]
    }
  }
}
</script>
<style>
.btn-circle {
  max-width: 30px;
  width: 100%;

  max-height: 30px;
  height: 100%;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 15px;
  text-shadow: 1px 1px 1px black;
  line-height: 50%;
}
</style>