<template>
    <div class="donut-chart-container">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </template>  
  
  <script>
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement)
  
  export default {
    name: 'DonutChart',
    components: { Doughnut },
    data() {
      return {
        chartData: {
          labels: ['Activities', 'Delivraid', 'Donation', 'Blind', 'Clean', 'SOS', 'Gone'],
          datasets: [{
            data: [98, 67, 30, 48, 70, 14, 30],
            backgroundColor: ['#DC5D56', '#F1CB3B', '#0D95F8', '#0D35F5', '#0CA224', '#FD1103', '#F93507']
          }]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .donut-chart-container {
    max-width: 500px;  
    max-height: 500px; 
    margin: auto;     
  }
  </style>