$("#addNew").click(function () {
    $("#actionForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#actionModal").modal("show");
    $(".modal-title").html("Add new action 😍");
});
loadData();
displayLinks();
// displayCoachs();
var btnAction = "Insert";

function loadData() {
    $("#actionTable tbody").html("");
    var sendData = {
        action: "getAllAction",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/action.php",
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
                        <a class="update_info" id=${res["id"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["id"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#actionTable tbody").append(tr);
                $("#actionTable").DataTable();
            }
        },
    });
}
function displayLinks() {
    $("#actionTable tbody").html("");
    var sendData = {
        action: "getAllLink",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/link.php",
        data: sendData,
        success: (data) => {
            var status = data.status;
            var response = data.data;
            var html = "";
            if (status) {
                html += `<option value="0">Select Option</option>`;
                response.forEach((res) => {
                    html += `<option value="${res["id"]}">${res["linkName"]}</option>`;
                });
                $("#linkId").append(html);
            }
        },
    });
}
$("#actionForm").submit(function (e) {
    e.preventDefault();
    var actionId = $("#actionId").val();
    var actionName = $("#actionName").val();
    var acutal_action = $("#acutal_action").val();
    var linkId = $("#linkId").val();
    var ties = $("#ties").val();
    if (actionName == "") {
        displayMessage("error", "ActionName Is Empry! | Please enter a ActionName");
    }else if(acutal_action == 0) {
        displayMessage("error", "Action Is Empry! | Please enter a Action");
    }else if(linkId == 0) {
        displayMessage("error", "LinkId Is Empry! | Please Select a LinkId");
    } 
    else {
        var sendData = {};
        if (btnAction == "Insert") {
            sendData = {
                actionName, acutal_action,linkId,
                "action": "registerAction"
            }
        } else {
            sendData = {
                "id": actionId,
                actionName, acutal_action,linkId,
                "action": "updateAction"
            }
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/action.php",
            data: sendData,
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
function fetchActionInfo(id) {
    var SendingData = {
        action: "getActionInfo",
        "id": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/action.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#actionModal").modal("show");
                $(".modal-title").html("Update Action Info! 😍");
                $("#actionId").val(response[0].id);
                $("#actionName").val(response[0].actionName);
                $("#acutal_action").val(response[0].action);
                $("#linkId").val(response[0].linkId);
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
            // $("#actionForm")[0].reset();
            $("#showImage").attr("src", "");
            // $("#actionModal").modal("hide");
        }, 1000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deleteActionInfo(id) {
    let SendingData = {
        action: "deleteAction",
        "id": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/action.php",
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
                    text: "You cannot delete this action its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this action its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#actionTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchActionInfo(id);
});
$("#actionTable tbody").on("click", "a.delete_info  ", function () {
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
            deleteActionInfo(id);
        }
    });
});
