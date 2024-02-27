$("#addNew").click(function () {
  $("#playerForm")[0].reset();
  $("#showImage").attr("src", "");
  $("#playerModal").modal("show");
  $(".modal-title").html("Add new player 😍");
});
loadData();
displayTeamName()
var btnAction = "Insert";
var fileImage = document.querySelector("#image");
var showImage = document.querySelector("#showImage");
const reader = new FileReader();
fileImage.addEventListener("change", (e) => {
  var selectedFile = e.target.files[0];
  reader.readAsDataURL(selectedFile);
});
reader.onload = (e) => {
  showImage.src = e.target.result;
};

function loadData() {
  $("#playerTable tbody").html("");
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
      var tr = "";
      if (status) {
        response.forEach((res) => {
          tr += "<tr>";
          for (let r in res) {
            if (r == "image") {
              tr += `<td> <img src="../uploads/players/${res[r]}" style="width:40px;height:40px;border:1px solid #f44547; border-radius:50%; object-fit:cover;"></td>`;
            } else {
              tr += `<td>${res[r]}</td>`;
            }
          }
          tr += `<td>
                      <a class="update_info" id=${res["playerId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                      <a class="delete_info" id=${res["playerId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                      </td>`;
          tr += "</tr>";
        });

        $("#playerTable tbody").append(tr);
        $("#playerTable").DataTable();
      }
    },
  });
}
function displayTeamName() {
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

$("#playerForm").submit(function (e) {
  e.preventDefault();
  var playerId = $("#playerId").val();
  var teamName = $("#teamName").val();
  var teamId = $("#teamId").val();
  var playerName = $("#playerName").val();
  var phone = $("#phone").val();
  var address = $("#address").val();
  var birthDate = $("#birthDate").val();
  var position = $("#position").val();
  var jerseyNumber = $("#jerseyNumber").val();
  var image = $("#image").val();

  if (teamId == 0) {
    displayMessage("error", "Team ID Is Empry! | Please select a team");
  } else if (teamName == "") {
    displayMessage("error", "Team Name Is Empry! |Please enter a Team Name");
  } else if (playerName == "") {
    displayMessage("error", "Player Name Is Empry! | Please enter a player Name");
  } else if (phone == "") {
    displayMessage("error", "Phone Is Empry! | Please enter a phone number");
  }else if (address == "") {
    displayMessage("error", "Address Is Empry! | Please enter an Address");
  } else if (birthDate == "") {
    displayMessage("error", "BirthDate Is Empry! | Please enter a Birth Date");
  } else if (position == 0) {
    displayMessage("error", "Position Is Empry! | Please Select a Position");
  } else if (jerseyNumber == "") {
    displayMessage("error", "Jersey Number Is Empry! | Please Select a Jersey Number");
  } else {
    var sendData = new FormData($("#playerForm")[0]);
    sendData.append("image", $("input[type=file]")[0].files[0]);
    if (btnAction == "Insert") {
      sendData.append("action", "registerPlayer");
    } else {
      sendData.append("action", "updatePlayer");
    }

    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/player.php",
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
function fetchUserInfo(id) {
  var SendingData = {
    action: "getPlayerInfo",
    "playerId": id,
  };

  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../api/player.php",
    data: SendingData,
    success: (data) => {
      var status = data.status;
      var response = data.data;

      if (status) {
        btnAction = "Updated";
        $("#playerModal").modal("show");
        $(".modal-title").html("Update Player Info! 😍");
        $("#playerId").val(response[0].playerId);
        $("#teamId").val(response[0].teamId);
        $("#playerName").val(response[0].playerName);
        $("#address").val(response[0].address);
        $("#phone").val(response[0].phone);
        $("#birthDate").val(response[0].birthDate);
        $("#position").val(response[0].position);
        $("#jerseyNumber").val(response[0].jerseyNumber);
        $("#showImage").attr("src", `../uploads/players/${response[0].image}`);
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
      $("#playerForm")[0].reset();
      $("#showImage").attr("src", "");
      $("#playerModal").modal("hide");
    }, 3000);
  } else {
    error.classList = "alert alert-danger p-2";
    error.innerHTML = message;
    setTimeout(function () {
      error.classList = "alert alert-danger d-none";
    }, 5000);
  }
};
function deleteUserInfo(id) {
  let SendingData = {
    action: "deletePlayer",
    playerId: id,
  };
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../api/player.php",
    data: SendingData,
    success: (data) => {
      var status = data.status;
      var response = data.data;

      if (status) {
        Swal.fire({
          title: "Deleted!",
          text: response,
          icon: "success",
        });
        loadData();
      } else {
        Swal.fire({
          title: "Not Deleted!",
          text: "You cannot delete this user its connection another table as a foreign key ❌",
          icon: "error",
        });
      }
    },
    error: (data) => {
      Swal.fire({
        title: "Not Deleted!",
        text: "You cannot delete this user its connection another table as a foreign key ❌",
        icon: "error",
      });
    },
  });
}

$("#playerTable tbody").on("click", "a.update_info  ", function () {
  var id = $(this).attr("id");
  fetchUserInfo(id);
});
$("#playerTable tbody").on("click", "a.delete_info  ", function () {
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
      deleteUserInfo(id);
    }
  });
});
