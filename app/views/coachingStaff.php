<?php
include '../layouts/protectedPage.php';
include '../layouts/sidebar.php';
include '../layouts/header.php';
?>
</style>
	<main class="content">
				<div class="container-fluid p-0">
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-header">
								<i class="fa fa-broken fs-4 text-primary"></i> <span class="card-title fs-4">Coaching Staff DataTables</span>
									<h6 class="card-subtitle text-muted">You can add new coaching Staff, update and delete also. fill free to use our system😍.</h6>
									<hr style="border: 1px solid #000;">
									<button type="button" class="btn btn-primary my-1 float-end" id="addNew">
									Add New Coaching Staff
									</button>
									
								</div>
								<div class="card-body">
									<table id="coachingStaffTable" class="table table-striped DataTableResponsive" style="width:100%">
										<thead class="table">
											<tr>
												<th>#</th>
												<th>Team Id</th>
												<th>Coach Id</th>
												<th>Staff Role</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody style="font-size: 12px;"></tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
				
									<div class="modal fade" id="coachingStaffModal" tabindex="-1" role="dialog" aria-hidden="true">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title fs-4">Default modal</h5>
													<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div class="modal-body m-1">
												<div class="alert alert-success p-2 d-none"role="alert">
																Successfully
															</div>
															<div class="alert alert-danger p-2 d-none"role="alert">
																Error
															</div>
													<form id="coachingStaffForm" enctype="multipart/form-data">
														<div class="row">
															
															<div class="form-group">
																<!-- <label for="injuryId" class="fw-bold text-dark">GameId <span class="text-muted">*</span></label> -->
																<input type="hidden" name="staffId" id="staffId" class="form-control">
															</div>
															
															
															<div class="form-group">
																<label for="teamId" class="fw-bold text-dark">Team Id <span class="text-muted">*</span></label>
																<select name="teamId" id="teamId" class="form-control">
																	
																</select>
															</div>
															<div class="form-group">
																<label for="coachId" class="fw-bold text-dark">coach Id <span class="text-muted">*</span></label>
																<select name="coachId" id="coachId" class="form-control">
																	
																</select>
															</div>
															<div class="form-group">
																<label for="status" class="fw-bold text-dark">Season Year <span class="text-muted">*</span></label>
																<select name="staffRole" id="staffRole" class="form-control">
                                                                    <option value="0">Select Option</option>
                                                                    <option value="Head Coach">Head Coach</option>
                                                                    <option value="Assitant Coach">Assitant Coach</option>
                                                                    <option value="Offensive Coordinator">Offensive Coordinator</option>
                                                                    <option value="Player Development Coach">Player Development Coach</option>
                                                                    <option value="Shooting Coach">Shooting Coach</option>
                                                                    <option value="Doctor Coach">Doctor Coach</option>
																		
																</select>
															</div>
															
														</div>
													
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="submit" class="btn btn-primary">Save changes</button>
												</div>
												</form
											</div>
										</div>
									</div>
			</main>
		
			


	
<?php
include '../layouts/footer.php';
?>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/coachingStaff.js"></script>
