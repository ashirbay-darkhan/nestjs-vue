<template>
  <q-page padding v-if="isAuthenticated">
    <user-from
      :user="user"
      @update="updateUser"
    />
    <user-list
      :users="users"
      @remove="removePost"
      v-if="!isUsersLoading"
    />
    <div v-else>Loading...</div>
  </q-page>
  <h1 v-else>
    Unauthorized
  </h1>
</template>

<script>
import {defineComponent} from 'vue'
import UserList from "components/UserList";
import UserFrom from "components/UserForm";
import {mapGetters} from "vuex";
import {api} from "boot/axios";

export default defineComponent({
  components: {
    UserFrom, UserList
  },
  data() {
    let user;

    return {
      users: [],
      user,
      isUsersLoading: false,
    }
  },
  methods: {
    async updateUser(post) {
      try {
        await api.put(`/users/${post.id}`, post)
      } catch (e) {
        alert(e)
      }
    },

    async removePost(user) {
      try {
        await api.delete(`/users/${user.id}`)
      } catch (e) {
        alert(e)
      } finally {
        this.users = this.users.filter(p => p.id !== user.id)
      }
    },

    async fetchUsers() {
      try {
        this.isUsersLoading = true
        const response = await api.get("/users")
        this.users = response.data
      } catch (e) {
        alert(e)
      } finally {
        this.isUsersLoading = false
      }
    },

    async protected() {
      api.request({
        url: '/auth/protected',
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        this.user = res.data
      })
    },
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  mounted() {
    this.fetchUsers()
    this.protected()
  }
})
</script>

