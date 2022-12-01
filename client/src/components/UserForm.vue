<template>
  <q-form @submit.prevent  class="q-mt-md">
    <h4>Update user {{this.user.sub}}</h4>
    <q-input
      v-model="userPost.name"
      @input="userPost.name = $event.target.value"
      class="q-mb-md"
      type="text"
      placeholder="Name"
    />
    <q-input
      v-model="userPost.phone"
      @input="userPost.phone = $event.target.value"
      class="q-mb-md"
      type="text"
      placeholder="Phone"
    />
    <q-input
      v-model="userPost.address"
      @input="userPost.address = $event.target.value"
      class="q-mb-md"
      type="text"
      placeholder="Address"
    />
    <q-input
      v-model="userPost.info"
      @input="userPost.info = $event.target.value"
      class="q-mb-md"
      type="text"
      placeholder="Info"
    />
    <q-input
      v-model="userPost.email"
      @input="userPost.email = $event.target.value"
      class="q-mb-md"
      type="text"
      placeholder="Email"
    />
    <q-btn
      class="btn"
      @click="updateUser"
    >Update</q-btn>
  </q-form>
</template>

<script>

export default {
  name: "UserFrom",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userPost: {
        id: this.user.sub,
        name: this.user.name,
        phone: this.user.phone,
        address: this.user.address,
        info: this.user.info,
        email: this.user.email
      }
    }
  },
  methods: {
    updateUser() {
      this.$emit('update', this.userPost)
    }
  },
}
</script>



