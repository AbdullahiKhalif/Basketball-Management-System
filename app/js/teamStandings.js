$("#addNew").click(function () {
    $("#teamStandingsForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#teamStandingsModal").modal("show");
    $(".modal-title").html("Add new teamStandings 😍");
});
loadData();
displayTeams();
var btnAction = "Insert";

function loadData() {
    $("#teamStandingsTable tbody").html("");
    var sendData = {
        action: "getAllTeamStandings",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/teamStandings.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            var tr = "";
            if (status) {
                response.forEach((res) => {
                    tr += "<tr>";
                    for (let r in res) {
                        tr += `<td>${res[r]}</td>`;
                    }
                    tr += `<td>
                        <a class="update_info" id=${res["standingId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["standingId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#teamStandingsTable tbody").append(tr);
                $("#teamStandingsTable").DataTable();
            }
        },
    });
}
function displayTeams() {
    $("#teamStandingsTable tbody").html("");
    var sendData = {
        action: "getAllTeams",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/team.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            var html = "";
            if (status) {
                html += `<option value="0">Select Option</option>`;
                response.forEach((res) => {
                    html += `<option value="${res["teamId"]}">${res["teamName"]}</option>`;
                });
                $("#teamId").append(html);
            }
        },
    });
}

$("#teamStandingsForm").submit(function (e) {
    e.preventDefault();
    var standingId = $("#standingId").val();
    var teamId = $("#teamId").val();
    var seasonYear = $("#seasonYear").val();
    var wins = $("#wins").val();
    var losses = $("#losses").val();
    var ties = $("#ties").val();
    if (teamId == 0) {
        displayMessage("error", "TeamId Empry! | Please Select a TeamId");
    }else if(seasonYear == 0) {
        displayMessage("error", "Season Years Is Empry! | Please Select a Season Year");
    } else if (wins == "") {
        displayMessage("error", "Wins Is Empry! | Please enter total number of wins");
    } else if (losses == "") {
        displayMessage("error", "Losses Is Empry! | Please enter total number of Losses");
    } else if (ties == "") {
        displayMessage("error", "Ties Is Empry! | Please enter total number of Ties");
    }
    else {
        var sendData = new FormData($("#teamStandingsForm")[0]);
        if (btnAction == "Insert") {
            sendData.append("action", "registerTeamStandings");
        } else {
            sendData.append("action", "updateTeamStandings");
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/teamStandings.php",
            data: sendData,
            processData: false,
            contentType: false,
            success: (data) => {
                var status = data.status;
                var reponse = data.data;

                if (status) {
                    displayMessage("success", reponse);
                    loadData();
                    btnAction = "Insert";
                } else {
                    displayMessage("error", reponse);
                }
            },
        });
    }
});
function fetchTeamStandingsInfo(id) {
    var SendingData = {
        action: "getTeamStandingsInfo",
        "standingId": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/teamStandings.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#teamStandingsModal").modal("show");
                $(".modal-title").html("Update TeamStandings Info! 😍");
                $("#standingId").val(response[0].standingId);
                $("#teamId").val(response[0].teamId);
                $("#seasonYear").val(response[0].seasonYear);
                $("#wins").val(response[0].wins);
                $("#losses").val(response[0].losses);
                $("#ties").val(response[0].ties);
            }
        },
    });
}

const displayMessage = (type, message) => {
    var success = document.querySelector(".alert-success");
    var error = document.querySelector(".alert-danger");

    if (type == "success") {
        error.classList = "alert alert-danger d-none";
        success.classList = "alert alert-success p-2";
        success.innerHTML = message;

        setTimeout(() => {
            success.classList = "alert alert-success d-none";
            $("#teamStandingsForm")[0].reset();
            $("#showImage").attr("src", "");
            $("#teamStandingsModal").modal("hide");
        }, 3000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deleteTeamStandingsInfo(id) {
    let SendingData = {
        action: "deleteTeamStandings",
        "standingId": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/teamStandings.php",
        data: SendingData,
        success: (data) => {
            var foundedYear = data.status;
            var response = data.data;

            if (foundedYear) {
                Swal.fire({
                    title: "Deleted!",
                    text: response,
                    icon: "success",
                });
                loadData();
            } else {
                Swal.fire({
                    title: "Not Deleted!",
                    text: "You cannot delete this teamStandings its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this teamStandings its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#teamStandingsTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchTeamStandingsInfo(id);
});
$("#teamStandingsTable tbody").on("click", "a.delete_info  ", function () {
    var id = $(this).attr("id");
    Swal.fire({
        title: "Are you?",
        text: "Sure to able to deletet this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((location) => {
        if (location.isConfirmed) {
            deleteTeamStandingsInfo(id);
        }
    });
});
