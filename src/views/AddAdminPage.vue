<template>
    <div>
      <h1>Set User as Admin</h1>
      <input v-model="email" type="email" placeholder="User's email">
      <button @click="setAdmin">Set as Admin</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '', 
      };
    },
    methods: {
      async setAdmin() {
        try {
            const response = await fetch(`/api/v1/Users/SetAdminByEmail/${this.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            alert("Successfuly added");
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la requête de mise à jour du statut de l\'utilisateur:', error);
        }
      }
    }
  }
  </script>
  