<template>
  <div class="row" style="height: 90vh">
    <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
         class="col-6 col-md-6 flex content-center justify-center">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Register</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input label="Username" v-model="register.email">
            </q-input>
            <q-input label="Password" type="password" v-model="register.password">
            </q-input>
            <div>
              <q-btn class="full-width" color="primary" label="Register" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login">Забыли пароль?</router-link>
                <router-link class="text-white" to="/login">Завести аккаунт</router-link>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { mapActions } from 'vuex'

let $q

export default {
  name: "Register",
  data () {
    return {
      register: {
        email: 'asd@asd',
        password: 'asdasd'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doRegister']),
    async submitForm () {
      if (!this.register.email || !this.register.password) {
        $q.notify({
          type: 'negative',
          message: 'Введенные данные недействительны.'
        })
      } else if (this.register.password.length < 6) {
        $q.notify({
          type: 'negative',
          message: 'Пароль должен состоять из 6 и более символов.'
        })
      } else {
        try {
          await this.doRegister(this.register)
          const toPath = this.$route.query.to || '/'
          this.$router.push(toPath)
        } catch (err) {
          if (err.response.data.detail) {
            $q.notify({
              type: 'negative',
              message: err.response.data.detail
            })
          }
        }
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
}
</script>

<style scoped>

</style>
