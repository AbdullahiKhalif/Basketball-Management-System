$("#addNew").click(function () {
    $("#coachingStaffForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#coachingStaffModal").modal("show");
    $(".modal-title").html("Add new coaching Staff 😍");
});
loadData();
displayTeams();
displayCoachs();
var btnAction = "Insert";

function loadData() {
    $("#coachingStaffTable tbody").html("");
    var sendData = {
        action: "getAllCoachingStaff",
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/coachingStaff.php",
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
                        <a class="update_info" id=${res["staffId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["staffId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
                    tr += "</tr>";
                });

                $("#coachingStaffTable tbody").append(tr);
                $("#coachingStaffTable").DataTable();
            }
        },
    });
}
function displayTeams() {
    $("#coachingStaffTable tbody").html("");
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
function displayCoachs() {
    $("#teamTable tbody").html("");
    var sendData = {
      action: "getAllCoachs",
    };
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/user.php",
      data: sendData,
      success: (data) => {
        var status = data.status;
        var response = data.data;
        var html = "";
        if (status) {
          html += `<option value="0">Select Option</option>`;
          response.forEach((res) => {
            html += `<option value="${res["userId"]}">${res["username"]}</option>`;
          });
          $("#coachId").append(html);
        }
      },
    });
  }
$("#coachingStaffForm").submit(function (e) {
    e.preventDefault();
    var staffId = $("#staffId").val();
    var teamId = $("#teamId").val();
    var coachId = $("#coachId").val();
    var staffRole = $("#staffRole").val();
    var ties = $("#ties").val();
    if (teamId == 0) {
        displayMessage("error", "TeamId Empry! | Please Select a TeamId");
    }else if(coachId == 0) {
        displayMessage("error", "Coach Id Is Empry! | Please Select a Coach Id");
    }else if(staffRole == 0) {
        displayMessage("error", "Staff Role Is Empry! | Please Select a Staff Role");
    } 
    else {
        var sendData = new FormData($("#coachingStaffForm")[0]);
        if (btnAction == "Insert") {
            sendData.append("action", "registerCoachingStaff");
        } else {
            sendData.append("action", "updateCoachingStaff");
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            url: "../api/coachingStaff.php",
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
function fetchCoachingStaffInfo(id) {
    var SendingData = {
        action: "getCoachingStaffInfo",
        "staffId": id,
    };

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/coachingStaff.php",
        data: SendingData,
        success: (data) => {
            var status = data.status;
            var response = data.data;

            if (status) {
                btnAction = "Updated";
                $("#coachingStaffModal").modal("show");
                $(".modal-title").html("Update CoachingStaff Info! 😍");
                $("#staffId").val(response[0].staffId);
                $("#teamId").val(response[0].teamId);
                $("#coachId").val(response[0].coachId);
                $("#staffRole").val(response[0].staffRole);
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
            $("#coachingStaffForm")[0].reset();
            $("#showImage").attr("src", "");
            $("#coachingStaffModal").modal("hide");
        }, 3000);
    } else {
        error.classList = "alert alert-danger p-2";
        error.innerHTML = message;
        setTimeout(function () {
            error.classList = "alert alert-danger d-none";
        }, 5000);
    }
};
function deleteCoachingStaffInfo(id) {
    let SendingData = {
        action: "deleteCoachingStaff",
        "staffId": id,
    };
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/coachingStaff.php",
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
                    text: "You cannot delete this coachingStaff its connection another table as a foreign key ❌",
                    icon: "error",
                });
            }
        },
        error: (data) => {
            Swal.fire({
                title: "Not Deleted!",
                text: "You cannot delete this coachingStaff its connection another table as a foreign key ❌",
                icon: "error",
            });
        },
    });
}

$("#coachingStaffTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchCoachingStaffInfo(id);
});
$("#coachingStaffTable tbody").on("click", "a.delete_info  ", function () {
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
            deleteCoachingStaffInfo(id);
        }
    });
});
