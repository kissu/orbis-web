<template>
    <div class="clean-class">
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="clean-list">
        <li v-for="clean in cleanWithCleanImagesId" :key="clean.id">
          <div v-if="clean.images.blob || clean.cleanImagesId" class="clean-image-container">
    <img v-if="clean.images.blob" :src="`data:image/jpeg;base64,${clean.images.blob}`" alt="clean Image" class="clean-image" />
    <img :src="getImageUrl(clean.cleanImagesId)" alt="clean Image with cleanImagesId" class="invisible" />
    <img v-if="imageUrls[clean.cleanImagesId]" :src="imageUrls[clean.cleanImagesId]" alt="clean Image with cleanImagesId" class="clean-image" />
  </div>

  {{ clean.name }}
  <button @click="Clean(clean.id)">Clean</button>
</li>

      </ul>
    </div>
  </template>
  
  <script>
    import Lottie from 'vue-lottie/src/lottie.vue';
    import animationData from "@/assets/animations/loading.json";
    import { defineComponent } from 'vue';
    import axios from 'axios';

    export default defineComponent({
    components: {
        Lottie,
    },
    data() {
        return {
        defaultOptions: {
            animationData: animationData,
        },
        clean: [],
        cleanWithCleanImagesId: [],
        loading: true,
        imageUrls: {}, 
        test: []
        };
    },
    mounted() {
        this.getclean();
    },
    methods: {
      removeCleanFromList(id) {
      this.cleanWithCleanImagesId = this.cleanWithCleanImagesId.filter(clean => clean.id !== id);
    },
        async getclean() {
        try {
            const response = await fetch('/api/v1/Clean/all');
            const data = await response.json();
            this.clean = data;
            this.filtercleanWithCleanImagesId();
        } catch (error) {
            console.error('Error recovering clean:', error);
        } finally {
            this.loading = false;
        }
        },
        filtercleanWithCleanImagesId() {
    this.cleanWithCleanImagesId = this.clean.filter(clean => 
        clean.cleanImagesId !== null && 
        clean.cleanImagesId.length > 0 && 
        clean.cleanImagesId[0] !== 0 
    );
    },
    async getImageUrl(idOrArray) {
  if (Array.isArray(idOrArray)) {
    this.test = idOrArray
    await this.getImageUrlFromArray(idOrArray);
  } else {
    try {             
      const response = await axios.get(`/api/v1/Images/GetImageBlobById/${idOrArray}`);
      if (response.status === 200) {
        this.imageUrls[this.test] = `data:image/jpeg;base64,${response.data}`;
      } else {
        console.error('Failed to fetch image:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
},
async getImageUrlFromArray(array) {
  if (Array.isArray(array) && array.length > 0) {
    await this.getImageUrl(array[0]);
  } else {
    console.error('Invalid array or empty array provided.');
  }
},
      async Clean(id) {
      try {
          const response = await fetch(`/api/v1/Clean/CleanedValidate/${id}`, {
          method: 'PUT',
          });
          if (response.ok) {
            this.getclean();
            this.removeCleanFromList(id);
          console.log('clean cleaned up successfully');
            } else {
            console.error('Error cleaning up clean:', response.statusText);
            }
        } catch (error) {
            console.error('Error cleaning up clean:', error);
      }
      }
    }
    });
    </script>

<style>

.clean-image {
  width: 250px;
  height: 250px;
  margin-right: 50px;
}

.invisible {
  display: none;
}

.clean-class{
  text-align: center;
}

</style>
