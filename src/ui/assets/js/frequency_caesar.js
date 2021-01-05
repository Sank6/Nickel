const frequency = require("./assets/js/tools/frequency.js");
let totalShift = 0;

function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

$(document).ready(() => {
    let f = frequency(document.querySelector("#caesar-body").value);

    let ctx = document.getElementById('frequencies_small_caesar').getContext('2d');
    let chart_small = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split(""),
            datasets: [
                {
                    label: 'Actual',
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
                position: "top"
            },
        }
    });

    ctx = document.getElementById('frequencies_caesar').getContext('2d');
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
                    label: 'Caesar Shifted',
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
            }
        }
    });

    function update() {
        let f = frequency($("#caesar-body").val());
        chart_small.data.datasets[0].data = f.map(x => x.actualFrequency.count)
        chart_small.data.datasets[1].data = f.map(x => x.expectedFrequency.count.toFixed(2))
        chart_small.update();

        chart.data.datasets[0].data = f.map(x => x.actualFrequency.count)
        chart.data.datasets[1].data = f.map(x => x.actualFrequency.count)
        chart.data.datasets[2].data = f.map(x => x.expectedFrequency.count.toFixed(2))
        chart.update();
    }
    
    $("#caesar-body").on('change keyup paste', update)
    $("button").on('click', update)

    $("#left").click(() => {
        let f = frequency($("#caesar-body").val());
        totalShift ++;
        chart.data.datasets[1].data = arrayRotate(f.map(x => x.actualFrequency.count), totalShift);
        chart.update();
        $("#count").text(String(totalShift % 26))
    });
    $("#right").click(() => {
        let f = frequency($("#caesar-body").val());
        totalShift --;
        chart.data.datasets[1].data = arrayRotate(f.map(x => x.actualFrequency.count), totalShift);
        chart.update();
        $("#count").text(String(totalShift % 26))
    });
})