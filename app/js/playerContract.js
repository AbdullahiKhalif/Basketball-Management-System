$("#addNew").click(function () {
    $("#playerContractForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#playerContractModal").modal("show");
    $(".modal-title").html("Add new playerContract 😍");
});
loadData();
displayPlayers();
var btnAction = "Insert";

function loadData() {
    $("#playerContractTable tbody").html("");
    var sendData = {
        action: "getAllPlayerContracts",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/playerContract.php",
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
                        <a class="update_info" id=${res["contractId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["contractId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#playerContractTable tbody").append(tr);
                $("#playerContractTable").DataTable();
            }
        },
    });
}
function displayPlayers() {
    $("#playerContractTable tbody").html("");
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

$("#playerContractForm").submit(function (e) {
    e.preventDefault();
    var contractId = $("#contractId").val();
    var playerId = $("#playerId").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var salary = $("#salary").val();
    if (playerId == 0) {
        displayMessage("error", "PlayerId Empry! | Please Select a PlayerId");
    }else if(startDate == "") {
        displayMessage("error", "Start Date Is Empry! | Please enter a start date");
    } else if (endDate == "") {
        displayMessage("error", "End Date Is Empry! | Please enter a end date");
    } else if (salary == "") {
        displayMessage("error", "Salary Is Empry! | Please enter a Salary");
    }
    else {
        var sendData = new FormData($("#playerContractForm")[0]);
        if (btnAction == "Insert") {
            sendData.append("action", "registerPlayerContract");
        } else {
            sendData.append("action", "updatePlayerContract");
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/playerContract.php",
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
function fetchPlayerContractInfo(id) {
    var SendingData = {
        action: "getPlayerContractInfo",
        "contractId": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/playerContract.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#playerContractModal").modal("show");
                $(".modal-title").html("Update PlayerContract Info! 😍");
                $("#contractId").val(response[0].contractId);
                $("#playerId").val(response[0].playerId);
                $("#startDate").val(response[0].startDate);
                $("#endDate").val(response[0].endDate);
                $("#salary").val(response[0].salary);
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
            $("#playerContractForm")[0].reset();
            $("#showImage").attr("src", "");
            $("#playerContractModal").modal("hide");
        }, 3000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deletePlayerContractInfo(id) {
    let SendingData = {
        action: "deletePlayerContract",
        "contractId": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/playerContract.php",
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
                    text: "You cannot delete this playerContract its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this playerContract its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#playerContractTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchPlayerContractInfo(id);
});
$("#playerContractTable tbody").on("click", "a.delete_info  ", function () {
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
            deletePlayerContractInfo(id);
        }
    });
});
