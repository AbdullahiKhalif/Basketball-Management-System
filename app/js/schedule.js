$("#addNew").click(function () {
    $("#scheduleForm")[0].reset();
    // $("#showImage").attr("src", "");
    $("#scheduleModal").modal("show");
    $(".modal-title").html("Add new schedule 😍");
  });
  loadData();
  displayTeams();
  var btnAction = "Insert";
  
  function loadData() {
    $("#scheduleTable tbody").html("");
    var sendData = {
      action: "getAllSchedules",
    };
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/schedule.php",
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
                        <a class="update_info" id=${res["scheduleId"]}><i class="fa fa-edit fs-4 bg-primary text-light p-2 rounded"></i></a>
                        <a class="delete_info" id=${res["scheduleId"]}><i class="fa fa-trash bg-danger fs-4 p-2 text-light rounded"></i></a>
                        </td>`;
            tr += "</tr>";
          });
  
          $("#scheduleTable tbody").append(tr);
          $("#scheduleTable").DataTable();
        }
      },
    });
  }
  function displayTeams() {
    $("#scheduleTable tbody").html("");
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
  
  $("#scheduleForm").submit(function (e) {
    e.preventDefault();
    var scheduleId = $("#scheduleId").val();
    var homeTeamId = $("#homeTeamId").val();
    var awayTeamId = $("#awayTeamId").val();
    var scheduledDate = $("#scheduledDate").val();
    var location = $("#location").val();
  
    if (homeTeamId == 0) {
      displayMessage("error", "Home Team Is Empry! | Please Select a Home Team");
    } else if (awayTeamId == 0) {
      displayMessage("error", "Away Team Is Empry! | Please Select a Team");
    }else if (scheduledDate == "") {
      displayMessage("error", "Schedule Date Is Empry! | Please enter a Schedule Date");
    }else if (location == "") {
      displayMessage("error", "Location Is Empry! | Please enter a Location");
    }
     else {
      var sendData = new FormData($("#scheduleForm")[0]);
      if (btnAction == "Insert") {
        sendData.append("action", "registerSchedule");
      } else {
        sendData.append("action", "updateSchedule");
      }
  
      $.ajax({
        method: "POST",
        dataType: "json",
        url: "../api/schedule.php",
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
  function fetchScheduleInfo(id) {
    var SendingData = {
      action: "getScheduleInfo",
      "scheduleId": id,
    };
  
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/schedule.php",
      data: SendingData,
      success: (data) => {
        var status = data.status;
        var response = data.data;
  
        if (status) {
          btnAction = "Updated";
          $("#scheduleModal").modal("show");
          $(".modal-title").html("Update Schedule Info! 😍");
          $("#scheduleId").val(response[0].scheduleId);
          $("#homeTeamId").val(response[0].homeTeamId);
          $("#awayTeamId").val(response[0].awayTeamId);
          $("#scheduledDate").val(response[0].scheduledDate);
          $("#location").val(response[0].location);
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
        $("#scheduleForm")[0].reset();
        $("#showImage").attr("src", "");
        $("#scheduleModal").modal("hide");
      }, 3000);
    } else {
      error.classList = "alert alert-danger p-2";
      error.innerHTML = message;
      setTimeout(function () {
        error.classList = "alert alert-danger d-none";
      }, 5000);
    }
  };
  function deleteScheduleInfo(id) {
    let SendingData = {
      action: "deleteSchedule",
      "scheduleId": id,
    };
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "../api/schedule.php",
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
            text: "You cannot delete this schedule its connection another table as a foreign key ❌",
            icon: "error",
          });
        }
      },
      error: (data) => {
        Swal.fire({
          title: "Not Deleted!",
          text: "You cannot delete this schedule its connection another table as a foreign key ❌",
          icon: "error",
        });
      },
    });
  }
  
  $("#scheduleTable tbody").on("click", "a.update_info  ", function () {
    var id = $(this).attr("id");
    fetchScheduleInfo(id);
  });
  $("#scheduleTable tbody").on("click", "a.delete_info  ", function () {
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
        deleteScheduleInfo(id);
      }
    });
  });
  