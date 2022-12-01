<template>
  <q-card>
    <q-card-section class="flex content-center justify-center">
      <div><strong>Email: </strong>{{ post.email }}</div>
      <q-btn @click="$emit('remove', post)">Delete</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    },
  }
}
</script>
