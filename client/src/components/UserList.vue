<template>
  <div v-if="users.length > 0">
    <h3>Users list</h3>
    <user-item
      v-for="user in users"
      :key="user.id"
      :post="user"
      @remove="$emit('remove', user)"
    />
  </div>
  <h2 v-else>
    user list are empty
  </h2>
</template>

<script>
import UserItem from "components/UserItem";
export default {
  components: {UserItem},
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  name: "UserList"
}
</script>

<style scoped>

</style>
