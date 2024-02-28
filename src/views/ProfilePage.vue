<template>
      <div>
        <h1>Profile Page</h1>
        <div v-if="user">
          <p>Username: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
        </div>
      </div>
    </template>
    
    <script>
    import { mapGetters } from 'vuex';
    
    export default {
      computed: {
        ...mapGetters(['getUser']),
        user() {
          return this.getUser;
        },
      },
    };
    </script>
    