<template>
    <div>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const apiUrl = '/api/v1/users/RecoverWithEmailPassword';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'email': this.email,
          'password': this.password,
        }),
      });
  
      if (response.ok) {
        const user = await response.json();
  
        alert("yes");
  
        this.$store.dispatch('setUser', user);
        this.$router.push('/profile'); 
        
        return { success: true };
      } else {
        alert("No");
        const errorData = await response.json();
        console.error('API Error:', errorData);
  
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      return { success: false, error: error.message };
    }
      },
    },
  };
  </script>