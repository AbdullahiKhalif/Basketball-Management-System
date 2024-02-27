$("#addNew").click(function () {
    $("#injuriesForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#injuriesModal").modal("show");
    $(".modal-title").html("Add new injuries 😍");
});
loadData();
displayPlayers();
var btnAction = "Insert";

function loadData() {
    $("#injuriesTable tbody").html("");
    var sendData = {
        action: "getAllInjuries",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/injuries.php",
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
                        <a class="update_info" id=${res["injuryId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["injuryId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#injuriesTable tbody").append(tr);
                $("#injuriesTable").DataTable();
            }
        },
    });
}
function displayPlayers() {
    $("#injuriesTable tbody").html("");
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

$("#injuriesForm").submit(function (e) {
    e.preventDefault();
    var injuryId = $("#injuryId").val();
    var playerId = $("#playerId").val();
    var injuryDate = $("#injuryDate").val();
    var injuryType = $("#injuryType").val();
    var recoveryTime = $("#recoveryTime").val();
    if (playerId == 0) {
        displayMessage("error", "PlayerId Empry! | Please Select a PlayerId");
    }else if(injuryDate == "") {
        displayMessage("error", "Injury Date Is Empry! | Please enter a Input Date");
    } else if (injuryType == 0) {
        displayMessage("error", "Injury Type Is Empry! | Please select an Injury Type");
    } else if (recoveryTime == "") {
        displayMessage("error", "RecoveryTime Is Empry! | Please enter a RecoveryTime");
    }
    else {
        var sendData = new FormData($("#injuriesForm")[0]);
        if (btnAction == "Insert") {
            sendData.append("action", "registerInjuries");
        } else {
            sendData.append("action", "updateInjuries");
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/injuries.php",
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
function fetchInjuriesInfo(id) {
    var SendingData = {
        action: "getInjuriesInfo",
        "injuryId": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/injuries.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#injuriesModal").modal("show");
                $(".modal-title").html("Update Injuries Info! 😍");
                $("#injuryId").val(response[0].injuryId);
                $("#playerId").val(response[0].playerId);
                $("#injuryDate").val(response[0].injuryDate);
                $("#injuryType").val(response[0].injuryType);
                $("#recoveryTime").val(response[0].recoveryTime);
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
            $("#injuriesForm")[0].reset();
            $("#showImage").attr("src", "");
            $("#injuriesModal").modal("hide");
        }, 3000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deleteInjuriesInfo(id) {
    let SendingData = {
        action: "deleteInjuries",
        "injuryId": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/injuries.php",
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
                    text: "You cannot delete this injuries its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this injuries its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#injuriesTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchInjuriesInfo(id);
});
$("#injuriesTable tbody").on("click", "a.delete_info  ", function () {
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
            deleteInjuriesInfo(id);
        }
    });
});
