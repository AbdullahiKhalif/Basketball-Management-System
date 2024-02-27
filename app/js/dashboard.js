loadTotalUsers();
loadTotalPlayers();
loadTotalInjuries();
loadTotalTeams();
loadTotalCoachStaff();
loadScheduleTable();
function loadTotalUsers() {
    var sendData = {
        "action": "getTotalPlayers"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/statistics.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            if (status) {
                $("#totalPlayers").html(response[0].total);
            } else {
                console.log(response);
            }
        }
    })
}
function loadTotalPlayers() {
    var sendData = {
        "action": "getTotalUsers"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/statistics.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            if (status) {
                $("#totalUsers").html(response[0].total);
            } else {
                console.log(response);
            }
        }
    })
}
function loadTotalTeams() {
    var sendData = {
        "action": "getTotalTeams"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/statistics.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            if (status) {
                $("#totalTeams").html(response[0].total);
            } else {
                console.log(response);
            }
        }
    })
}
function loadTotalCoachStaff() {
    var sendData = {
        "action": "getTotalInjuries"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/statistics.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            if (status) {
                $("#totalInjuries").html(response[0].total);
            } else {
                console.log(response);
            }
        }
    })
}
function loadTotalInjuries() {
    var sendData = {
        "action": "getTotalCoachStaffs"
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/statistics.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            if (status) {
                $("#totalCoachStaffs").html(response[0].total);
            } else {
                console.log(response);
            }
        }
    })
}

function loadScheduleTable() {
    $("#scheduleStatsReportTable tbody").html("");
    var SendingData = {
        "action": "getScheduleStatement",
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/reports.php",
        data: SendingData,

        success: (data) => {
            var status = data.status;
            var response = data.data;
            var tr = '';
            var th = '';

            if (status) {
                response.forEach(item => {

                    tr += "<tr>";
                    for (let i in item) {
                        tr += `<td>${item[i]}</td>`;

                    }


                    tr += "</tr>";
                })
                $("#scheduleStatsReportTable tbody").append(tr);
            }
        }
    })
}