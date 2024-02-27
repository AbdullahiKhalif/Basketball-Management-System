$("#addNew").click(function () {
    $("#statsForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#statsModal").modal("show");
    $(".modal-title").html("Add new stats 😍");
});
loadData();
displayPlayerName();
displayGames();
var btnAction = "Insert";

function loadData() {
    $("#statsTable tbody").html("");
    var sendData = {
        action: "getAllStats",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/stats.php",
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
                        <a class="update_info" id=${res["statsId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["statsId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#statsTable tbody").append(tr);
                $("#statsTable").DataTable();
            }
        },
    });
}
function displayGames() {
    $("#statsTable tbody").html("");
    var sendData = {
        action: "getAllGame",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/game.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            var html = "";
            if (status) {
                html += `<option value="0">Select Option</option>`;
                response.forEach((res) => {
                    html += `<option value="${res["gameId"]}">${res["gameId"]}</option>`;
                });
                $("#gameId").append(html);
            }
        },
    });
}
function displayPlayerName() {
    $("#statsTable tbody").html("");
    var sendData = {
        action: "getAllPlayers",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/player.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            var html = "";
            if (status) {
                html += `<option value="0">Select Option</option>`;
                response.forEach((res) => {
                    html += `<option value="${res["playerId"]}">${res["playerName"]}</option>`;
                });
                $("#playerId").append(html);
            }
        },
    });
}

$("#statsForm").submit(function (e) {
    e.preventDefault();
    var statsId = $("#statsId").val();
    var playerId = $("#playerId").val();
    var gameId = $("#gameId").val();
    var pointsScored = $("#pointsScored").val();
    var rebounds = $("#rebounds").val();
    var assists = $("#assists").val();
    var steals = $("#steals").val();
    var blocks = $("#blocks").val();


    if (playerId == 0) {
        displayMessage("error", "PlayerId Is Empry! | Please Select a PlayerId");
    } else if (gameId == 0) {
        displayMessage("error", "GameId Is Empry! | Please Select a GameId");
    } else if (pointsScored == "") {
        displayMessage("error", "pointsScored Is Empry! | Please enter a pointsScored");
    } else if (rebounds == 0) {
        displayMessage("error", "Rebounds Is Empry! | Please enter a Rebounds");
    } else if (assists == "") {
        displayMessage("error", "assists Is Empry! | Please enter an assists");
    }
    else if (steals == "") {
        displayMessage("error", "Ssteals Is Empry! | Please enter a Ssteals ");
    }
    else if (blocks == "") {
        displayMessage("error", "block Is Empry! | Please enter a Score Away Team");
    }
    else {
        var sendData = new FormData($("#statsForm")[0]);
        if (btnAction == "Insert") {
            sendData.append("action", "registerStats");
        } else {
            sendData.append("action", "updateStats");
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/stats.php",
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
function fetchStatsInfo(id) {
    var SendingData = {
        action: "getStatsInfo",
        "statsId": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/stats.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#statsModal").modal("show");
                $(".modal-title").html("Update Stats Info! 😍");
                $("#statsId").val(response[0].statsId);
                $("#playerId").val(response[0].playerId);
                $("#gameId").val(response[0].gameId);
                $("#pointsScored").val(response[0].pointsScored);
                $("#rebounds").val(response[0].rebounds);
                $("#assists").val(response[0].assists);
                $("#steals").val(response[0].steals);
                $("#blocks").val(response[0].blocks);
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
            $("#statsForm")[0].reset();
            $("#showImage").attr("src", "");
            $("#statsModal").modal("hide");
        }, 3000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deleteStatsInfo(id) {
    let SendingData = {
        action: "deleteStats",
        "statsId": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/stats.php",
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
                    text: "You cannot delete this stats its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this stats its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#statsTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchStatsInfo(id);
});
$("#statsTable tbody").on("click", "a.delete_info  ", function () {
    var id = $(this).attr("id");
    Swal.fire({
        title: "Are you?",
        text: "Sure to able to deletet this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((rebounds) => {
        if (rebounds.isConfirmed) {
            deleteStatsInfo(id);
        }
    });
});
