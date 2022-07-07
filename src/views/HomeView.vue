<template>
  <div class="fondo">
    <b-row class="abs-center">

      <b-card no-body style="max-width: 20rem;">
      <p class="h3">UNC Calendar</p>
      <div>
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Email"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input id="inline-form-input-username" placeholder="Username"></b-form-input>
    </b-input-group>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
<div>
  <b-form @submit.stop.prevent>
    <label for="text-password">Password</label>
    <b-form-input type="password" id="text-password" aria-describedby="password-help-block"></b-form-input>
    <b-form-text id="password-help-block">
     Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números y no debe contener espacios, caracteres especiales o emoji.
    </b-form-text>
   </b-form>
</div>
    <b-button variant="primary">Save</b-button>
  </b-form>
</div>
        <div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Ingrese usuario:" label-for="input-1"
              description="Nunca se compartirá su información">
              <b-form-input id="input-1" v-model="form.username" type="username" placeholder="Usuario..." required>
              </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="input-2">
              <b-form-input id="input-2" v-model="form.password" placeholder="Contraseña..." required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" :aria-describedby="ariaDescribedby">
                <b-form-checkbox value="me">Recuerdame</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="reset" variant="danger">Ingresar</b-button>
            <b-button type="submit" variant="primary">Registrarse</b-button>
            
            <!-- hay que moverlo a la derecha para acomodarlo -->

            <b-form-group id="input-group-3" label="Tengo un Horario:" label-for="input-3">
              <b-form-input id="input-2" v-model="form.id" placeholder="Ingrese un ID..." ></b-form-input>
            </b-form-group>
          </b-form>

          <b-card class="mt-3" header="Visualizar datos">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </div>
      </b-card>

      <img src="" class="w-75">
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        id: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script> 
<style>
.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.fondo {
  background: no-repeat url(../assets/EscudoUNC.svg);

}
</style>