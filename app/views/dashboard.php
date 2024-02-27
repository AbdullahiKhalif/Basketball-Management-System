<?php
include '../layouts/protectedPage.php';
include '../layouts/sidebar.php';
include '../layouts/header.php';
?>
  <main class="content">
          <div class="container-fluid p-0">
            <div class="row mb-2 mb-xl-3">
              <div class="col-auto d-none d-sm-block">
                <h3>Dashboard</h3>
              </div>

              <div class="col-auto ms-auto text-end mt-n1">
                <div class="dropdown me-2 d-inline-block position-relative">
                  <a
                    class="btn btn-light bg-white shadow-sm dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                  >
                    <i class="align-middle mt-n1" data-feather="calendar"></i>
                    Today
                  </a>

                  <div class="dropdown-menu dropdown-menu-end">
                    <h6 class="dropdown-header">Settings</h6>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                  </div>
                </div>

                <button class="btn btn-primary shadow-sm">
                  <i class="align-middle" data-feather="filter">&nbsp;</i>
                </button>
                <button class="btn btn-primary shadow-sm">
                  <i class="align-middle" data-feather="refresh-cw">&nbsp;</i>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card illustration flex-fill">
                  <div class="card-body p-0 d-flex flex-fill">
                    <div class="row g-0 w-100">
                      <div class="col-6">
                        <div class="illustration-text p-3 m-1">
                          <h4 class="illustration-text">
                            Welcome Back, <?php echo $_SESSION['username']?>!
                          </h4>
                          <p class="mb-0">Basketball Dashboard</p>
                        </div>
                      </div>
                      <div class="col-6 align-self-end text-end">
                        <img
                          src="../../assets/img/illustrations/customer-support.png"
                          alt="Customer Support"
                          class="img-fluid illustration-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card flex-fill">
                  <div class="card-body py-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-grow-1">
                        <h3 class="mb-2" id="totalUsers">0</h3>
                        <p class="mb-2">Total Users</p>
                        
                      </div>
                      <div class="d-inline-block ms-3">
                        <div class="stat">
                          <i
                            class="fa fa-users fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card flex-fill">
                  <div class="card-body py-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-grow-1">
                        <h3 class="mb-2" id="totalTeams">0</h3>
                        <p class="mb-2">Total Team</p>
                        
                      </div>
                      <div class="d-inline-block ms-3">
                        <div class="stat">
                          <i
                            class="fa fa-users fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card flex-fill">
                  <div class="card-body py-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-grow-1">
                        <h3 class="mb-2" id="totalPlayers">0</h3>
                        <p class="mb-2">Total Players</p>
                        
                      </div>
                      <div class="d-inline-block ms-3">
                        <div class="stat">
                          <i
                            class="fa fa-users fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card flex-fill">
                  <div class="card-body py-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-grow-1">
                        <h3 class="mb-2" id="totalInjuries">0</h3>
                        <p class="mb-2">Total Injuries</p>
                        
                      </div>
                      <div class="d-inline-block ms-3">
                        <div class="stat">
                          <i
                            class="fa fa-users fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-sm-4 col-xxl-3 d-flex">
                <div class="card flex-fill">
                  <div class="card-body py-4">
                    <div class="d-flex align-items-start">
                      <div class="flex-grow-1">
                        <h3 class="mb-2" id="totalCoachStaffs">0</h3>
                        <p class="mb-2">Total Coach Staffs</p>
                        
                      </div>
                      <div class="d-inline-block ms-3">
                        <div class="stat">
                          <i
                            class="fa fa-users fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>



            <div class="card flex-fill">
              <div class="card-header">
                <div class="card-actions float-end">
                  <div class="dropdown position-relative">
                    <a
                      href="#"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                    >
                      <i
                        class="align-middle"
                        data-feather="more-horizontal"
                      ></i>
                    </a>

                    <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <h5 class="card-title mb-0">Schedule Game!</h5>
              </div>
              <table
                id="scheduleStatsReportTable"
                class="table table-striped my-0"
              >
                <thead>
                  <tr>
                    <th>Game Id</th>
                    <th class="d-none d-xl-table-cell">Game Date</th>
                    <th class="d-none d-xl-table-cell">Home Team</th>
                    <th>Score Home Team</th>
                    <th class="d-none d-md-table-cell">Away Team</th>
                    <th class="d-none d-md-table-cell">Score Awat Team</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </main>


<?php
include '../layouts/footer.php';
?>

<script src="../js/dashboard.js"></script>