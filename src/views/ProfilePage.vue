<template>
  <div>
    <h1>Profile Page</h1>
    <div v-if="user">
      <p>Username: {{ user.userName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Admin: {{ user.admin }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/logout');
    }
  }
});
</script>
