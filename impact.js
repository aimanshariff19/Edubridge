const ctx = document.getElementById('impactChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Students', 'Volunteers', 'Programs'],
        datasets: [{
            label: 'EduBridge Impact',
            data: [420, 68, 12],
            backgroundColor: [
                '#2563eb',
                '#16a34a',
                '#f59e0b'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
