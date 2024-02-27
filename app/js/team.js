$("#addNew").click(function () {
  $("#teamForm")[0].reset();
  $("#showImage").attr("src", "");
  $("#teamModal").modal("show");
  $(".modal-title").html("Add new team 😍");
});
loadData();
displayCoachs();
var btnAction = "Insert";

function loadData() {
  $("#teamTable tbody").html("");
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
      var tr = "";
      if (status) {
        response.forEach((res) => {
          tr += "<tr>";
          for (let r in res) {
            tr += `<td>${res[r]}</td>`;
          }
          tr += `<td>
                      <a class="update_info" id=${res["teamId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                      <a class="delete_info" id=${res["teamId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                      </td>`;
          tr += "</tr>";
        });

        $("#teamTable tbody").append(tr);
        $("#teamTable").DataTable();
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

$("#teamForm").submit(function (e) {
  e.preventDefault();
  var teamId = $("#teamId").val();
  var teamName = $("#teamName").val();
  var coachId = $("#coachId").val();
  var foundedYear = $("#foundedYear").val();
  var city = $("#city").val();

  if (teamName == "") {
    displayMessage("error", "Team Name Is Empry! | Please enter a team name");
  } else if (coachId == 0) {
    displayMessage("error", "CoachId Is Empry! | Please Select a Coach");
  } else if (foundedYear == 0) {
    displayMessage("error", "Founded Year Is Empry! | Please Select a Founded Year");
  }else if (city == "") {
    displayMessage("error", "City Is Empry! | Please Select a City");
  }
   else {
    var sendData = new FormData($("#teamForm")[0]);
    if (btnAction == "Insert") {
      sendData.append("action", "registerTeam");
    } else {
      sendData.append("action", "updateTeam");
    }

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/team.php",
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
function fetchTeamInfo(id) {
  var SendingData = {
    action: "getTeamInfo",
    "teamId": id,
  };

  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../api/team.php",
    data: SendingData,
    success: (data) => {
      var status = data.status;
      var response = data.data;

      if (status) {
        btnAction = "Updated";
        $("#teamModal").modal("show");
        $(".modal-title").html("Update Team Info! 😍");
        $("#teamId").val(response[0].teamId);
        $("#teamName").val(response[0].teamName);
        $("#coachId").val(response[0].coachId);
        $("#foundedYear").val(response[0].foundedYear);
        $("#city").val(response[0].city);
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
      $("#teamForm")[0].reset();
      $("#showImage").attr("src", "");
      $("#teamModal").modal("hide");
    }, 3000);
  } else {
    error.classList = "alert alert-danger p-2";
    error.innerHTML = message;
    setTimeout(function () {
      error.classList = "alert alert-danger d-none";
    }, 5000);
  }
};
function deleteTeamInfo(id) {
  let SendingData = {
    action: "deleteTeam",
    "teamId": id,
  };
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../api/team.php",
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
          text: "You cannot delete this team its connection another table as a foreign key ❌",
          icon: "error",
        });
      }
    },
    error: (data) => {
      Swal.fire({
        title: "Not Deleted!",
        text: "You cannot delete this team its connection another table as a foreign key ❌",
        icon: "error",
      });
    },
  });
}

$("#teamTable tbody").on("click", "a.update_info  ", function () {
  var id = $(this).attr("id");
  fetchTeamInfo(id);
});
$("#teamTable tbody").on("click", "a.delete_info  ", function () {
  var id = $(this).attr("id");
  Swal.fire({
    title: "Are you?",
    text: "Sure to able to deletet this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTeamInfo(id);
    }
  });
});
