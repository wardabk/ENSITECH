const chart1 = document.getElementById('chartPresence').getContext('2d');
const chartPresence = new Chart(chart1, {
  type: 'bar',
  data: {
    labels: ['Réseau et Télécommunication', 'Développement de logiciels',
             'Informatique embarquée', 'Développement Web Mobile'],

    datasets: [
    {
      label: 'la moyenne générale des classes en 2024',
      data: [14.5, 15.82 ,15.02,16],
      backgroundColor: 'rgba(54, 162, 235, 0.7)', // Couleur des barres
      borderColor: 'rgba(54, 162, 235, 1)', // Couleur de la bordure des barres
      borderWidth: 1
    }
      ]git a
  },
  options: {
    responsive:true,
   
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


  // Sélectionner l'élément canvas
  const chart2= document.getElementById('chartBranch').getContext('2d');
  // Créer un nouveau graphique de type 'pie'
  const chartBranch = new Chart(chart2, {
      type: 'pie',
       data: {
          labels: ['Developpement Web', 'Data Science','Marketing Digital','Réseau et communication','Informatique industrielle'],
          datasets: [{
              label: 'Genre des étudiants',
              data: [380,270,280,150,130], // Les valeurs des catégories
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
               'rgb(84, 223, 84)',
               'rgb(159, 152, 234)',
              ],
              
              borderWidth: 1
          }]
      }
      ,
       options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw ;
                    }
                }
            }
        }
    }
  });

                //statistiques notes etudiants
  const chart3 = document.getElementById('gradesChart1').getContext('2d');
    const gradesChart1 = new Chart(chart3, {
        type: 'bar',
        data: {
            labels: ['François', 'Abderahman', 'Myriam', 'Céline', 'Mohamed'],
            datasets: [{
                label: 'Notes de devoir de controle (développement web)  ',
                data: [14, 17, 10, 18, 15.5],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgb(54, 162, 235, 0.5)',
                  'rgb(255, 205, 86, 0.5)',
                  'rgb(84, 223, 84, 0.5)',
                  'rgb(159, 152, 234, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgb(54, 162, 235, 0.5)',
                  'rgb(255, 205, 86, 0.5)',
                  'rgb(84, 223, 84, 0.5)',
                  'rgb(159, 152, 234, 0.5)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    const chart4 = document.getElementById('gradesChart2').getContext('2d');
    const gradesChart2 = new Chart(chart4, {
        type: 'bar',
        data: {
            labels: ['HTML', 'CSS', 'Jvascript', 'PHP', 'MySQL'],
            datasets: [{
                label: 'Notes de devoir de controle',
                data: [16, 20, 14, 18, 17],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgb(54, 162, 235, 0.5)',
                  'rgb(255, 205, 86, 0.5)',
                  'rgb(84, 223, 84, 0.5)',
                  'rgb(159, 152, 234, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgb(54, 162, 235, 0.5)',
                  'rgb(255, 205, 86, 0.5)',
                  'rgb(84, 223, 84, 0.5)',
                  'rgb(159, 152, 234, 0.5)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });