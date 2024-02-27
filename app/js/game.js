$("#addNew").click(function () {
    $("#gameForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#gameModal").modal("show");
    $(".modal-title").html("Add new game 😍");
  });
  loadData();
  displayTeams();
  var btnAction = "Insert";
  
  function loadData() {
    $("#gameTable tbody").html("");
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
        var tr = "";
        if (status) {
          response.forEach((res) => {
            tr += "<tr>";
            for (let r in res) {
              tr += `<td>${res[r]}</td>`;
            }
            tr += `<td>
                        <a class="update_info" id=${res["gameId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["gameId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
            tr += "</tr>";
          });
  
          $("#gameTable tbody").append(tr);
          $("#gameTable").DataTable();
        }
      },
    });
  }
  function displayTeams() {
    $("#gameTable tbody").html("");
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
          $("#homeTeamId").append(html);
          $("#awayTeamId").append(html);
        }
      },
    });
  }
  
  $("#gameForm").submit(function (e) {
    e.preventDefault();
    var gameId = $("#gameId").val();
    var homeTeamId = $("#homeTeamId").val();
    var awayTeamId = $("#awayTeamId").val();
    var gameDate = $("#gameDate").val();
    var result = $("#result").val();
    var scoreHomeTeam = $("#scoreHomeTeam").val();
    var awayHomeTeam = $("#awayHomeTeam").val();

  
    if (homeTeamId == 0) {
      displayMessage("error", "Home Team Is Empry! | Please Select a Home Team");
    } else if (awayTeamId == 0) {
      displayMessage("error", "Away Team Is Empry! | Please Select a Team");
    }else if (gameDate == "") {
      displayMessage("error", "Game Date Is Empry! | Please enter a Game Date");
    }else if (result == 0) {
      displayMessage("error", "Game Result Is Empry! | Please enter a Game Result");
    } else if (scoreHomeTeam == "") {
      displayMessage("error", "Score Home Team Is Empry! | Please enter a Score Home Team");
    }
    else if (awayHomeTeam == "") {
        displayMessage("error", "Score Away Team Is Empry! | Please enter a Score Away Team");
      }
     else {
      var sendData = new FormData($("#gameForm")[0]);
      if (btnAction == "Insert") {
        sendData.append("action", "registerGame");
      } else {
        sendData.append("action", "updateGame");
      }
  
      $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/game.php",
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
  function fetchGameInfo(id) {
    var SendingData = {
      action: "getGameInfo",
      "gameId": id,
    };
  
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/game.php",
      data: SendingData,
      success: (data) => {
        var status = data.status;
        var response = data.data;
  
        if (status) {
          btnAction = "Updated";
          $("#gameModal").modal("show");
          $(".modal-title").html("Update Game Info! 😍");
          $("#gameId").val(response[0].gameId);
          $("#homeTeamId").val(response[0].homeTeamId);
          $("#awayTeamId").val(response[0].awayTeamId);
          $("#gameDate").val(response[0].gameDate);
          $("#result").val(response[0].result);
          $("#scoreHomeTeam").val(response[0].scoreHomeTeam);
          $("#scoreAwayTeam").val(response[0].scoreAwayTeam);
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
        $("#gameForm")[0].reset();
        $("#showImage").attr("src", "");
        $("#gameModal").modal("hide");
      }, 3000);
    } else {
      error.classList = "alert alert-danger p-2";
      error.innerHTML = message;
      setTimeout(function () {
        error.classList = "alert alert-danger d-none";
      }, 5000);
    }
  };
  function deleteGameInfo(id) {
    let SendingData = {
      action: "deleteGame",
      "gameId": id,
    };
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/game.php",
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
            text: "You cannot delete this game its connection another table as a foreign key ❌",
            icon: "error",
          });
        }
      },
      error: (data) => {
        Swal.fire({
          title: "Not Deleted!",
          text: "You cannot delete this game its connection another table as a foreign key ❌",
          icon: "error",
        });
      },
    });
  }
  
  $("#gameTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchGameInfo(id);
  });
  $("#gameTable tbody").on("click", "a.delete_info  ", function () {
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
        deleteGameInfo(id);
      }
    });
  });
  