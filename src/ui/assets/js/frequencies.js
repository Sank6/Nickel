let totalShift = 0;

function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

$(document).ready(() => {
    const frequency = require("../../tools/frequency.js");
    let f = frequency(localStorage.getItem('ciphertext'));

    let ctx = document.getElementById('frequencies').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(""),
            datasets: [
                {
                    label: 'Actual',
                    data: f.map(x => x.actualFrequency.count),
                    borderWidth: 1,
                    backgroundColor: "rgba(214, 214, 214, 0.5)",
                    borderColor: "rgba(214, 214, 214, 0.9)"
                },
                {
                    label: 'Caeser Shifted',
                    data: f.map(x => x.actualFrequency.count),
                    borderWidth: 1,
                    backgroundColor: "rgba(255, 54, 54, 0.5)",
                    borderColor: "rgba(255, 54, 54, 0.9)"
                },
                {
                    label: 'Expected',
                    data: f.map(x => x.expectedFrequency.count.toFixed(2)),
                    borderWidth: 1,
                    backgroundColor: "rgba(105, 177, 255, 0.5)",
                    borderColor: "rgba(105, 177, 255, 0.9)"
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                position: "right"
            },
            title: {
                display: true,
                text: "Frequncy Analysis",
                fontSize: 30
            }
        }
    });

    $("#left").click(() => {
        totalShift ++;
        chart.data.datasets[1].data = arrayRotate(f.map(x => x.actualFrequency.count), totalShift);
        chart.update();
        $("#count").text(String(totalShift % 26))
    });
    $("#right").click(() => {
        totalShift --;
        chart.data.datasets[1].data = arrayRotate(f.map(x => x.actualFrequency.count), totalShift);
        chart.update();
        $("#count").text(String(totalShift % 26))
    });
})