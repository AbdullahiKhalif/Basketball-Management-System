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
								<i class="fa fa-users fs-4 text-primary"></i> <span class="card-title fs-4">Team DataTables</span>
									<h6 class="card-subtitle text-muted">You can add new team, update and delete also. fill free to use our system😍.</h6>
									<hr style="border: 1px solid #000;">
									<button type="button" class="btn btn-primary my-1 float-end" id="addNew">
									Add New Team
									</button>
									
								</div>
								<div class="card-body">
									<table id="teamTable" class="table table-striped DataTableResponsive" style="width:100%">
										<thead class="table">
											<tr>
												<th>#</th>
												<th>Team Name</th>
												<th>Coach Id</th>
												<th>Founded Year</th>
												<th>City</th>
												<th>Register Date</th>
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
				
									<div class="modal fade" id="teamModal" tabindex="-1" role="dialog" aria-hidden="true">
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
													<form id="teamForm" enctype="multipart/form-data">
														<div class="row">
															
															<div class="form-group">
																<!-- <label for="teamid" class="fw-bold text-dark">TeamId <span class="text-muted">*</span></label> -->
																<input type="hidden" name="teamId" id="teamId" class="form-control">
															</div>
															<div class="form-group">
																<label for="teamname" class="fw-bold text-dark">Team Name <span class="text-muted">*</span></label>
																<input type="text" name="teamName" id="teamName" class="form-control">
															</div>
															
															<div class="form-group">
																<label for="coachId" class="fw-bold text-dark">Coach ID <span class="text-muted">*</span></label>
																<select name="coachId" id="coachId" class="form-control">
																	
																</select>
															</div>
															<div class="form-group">
																<label for="status" class="fw-bold text-dark">Founded Yare <span class="text-muted">*</span></label>
																<select name="foundedYear" id="foundedYear" class="form-control">
																	<option value="0">Select Options</option>
																	<option value="2010">2010</option>
																	<option value="2011">2011</option>
																	<option value="2012">2012</option>
																	<option value="2013">2013</option>
																	<option value="2014">2014</option>
																	<option value="2015">2015</option>
																	<option value="2016">2016</option>
																	<option value="2017">2017</option>
																	<option value="2018">2018</option>
																	<option value="2019">2019</option>
																	<option value="2020">2020</option>
																	<option value="2021">2021</option>
																	<option value="2022">2022</option>
																	<option value="2023">2023</option>
																	<option value="2024">2024</option>
																	
																	
																</select>
															</div>

															<div class="form-group">
																<label for="city" class="fw-bold text-dark">City <span class="text-muted">*</span></label>
																<input type="city" name="city" id="city" class="form-control">
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
<script src="../js/team.js"></script>
