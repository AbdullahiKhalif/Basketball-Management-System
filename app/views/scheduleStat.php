<?php
include '../layouts/protectedPage.php';
include '../layouts/sidebar.php';
include '../layouts/header.php';
?>
<style>
	#showImage{
		height: 150px;
		width: 150px;
		border: 1px solid #000;
		border-radius : 50%;
		object-fit: cover;
	}
</style>
	<main class="content">
				<div class="container-fluid p-0">
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-header">
								<i class="fa fa-bars fs-4 text-primary"></i> <span class="card-title fs-4">Schedule Report</span>
									<h6 class="card-subtitle text-muted">You can Print or export All Schedule statistics😍.</h6>
									<hr style="border: 1px solid #000;">
                                    <form id="scheduleStatsReport">
                                    <button type="submit" class="btn btn-primary my-1 float-start" id="search">
									<i class="fa fa-search"></i> Search
									</button>
                                    </form>
									
									
								</div>
								<div class="card-body">
                                <div class="table-responsive" id="printArea">
								<img src="../../assets/img/logo.png" alt="Just Logo" class="img-fluid text-center" style="height: 150px; width:450px; margin-left: 15%; margin-bottom: 10px; margin-bottom: 10px;">
									<table id="scheduleStatsReportTable" class="table table-striped DataTableResponsive" style="width:100%">
										<thead class="table">
											
										</thead>
										<tbody style="font-size: 12px;"></tbody>
									</table>
                                </div>
                                <button class="btn btn-success" id="printStatement"><i class="fas fa-print text-light"></i> Print</button>
                                        <button class="btn btn-info" id="exportStatement"><i class="fas fa-file-excel text-light"></i> Export </button>
								</div>
							</div>
						</div>
					</div>

				</div>
				
									<div class="modal fade" id="playerModal" tabindex="-1" role="dialog" aria-hidden="true">
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
													<form id="playerForm" enctype="multipart/form-data">
														<div class="row">
															
															<div class="form-group">
																<!-- <label for="userid" class="fw-bold text-dark">UserId <span class="text-muted">*</span></label> -->
																<input type="hidden" name="playerId" id="playerId" class="form-control">
															</div>
															<div class="form-group">
																<label for="teamId" class="fw-bold text-dark">team ID <span class="text-muted">*</span></label>
																<select name="teamId" id="teamId" class="form-control">
																</select>
															</div>
															<div class="form-group">
																<label for="email" class="fw-bold text-dark">Playe Name <span class="text-muted">*</span></label>
																<input type="playername" name="playerName" id="playerName" class="form-control">
															</div>
															
															<div class="form-group">
																<label for="phone" class="fw-bold text-dark">Phone <span class="text-muted">*</span></label>
																<input type="phone" name="phone" id="phone" class="form-control">
															</div>
															<div class="form-group">
																<label for="text" class="fw-bold text-dark">Address <span class="text-muted">*</span></label>
																<input type="address" name="address" id="address" class="form-control">
															</div>
															<div class="form-group">
																<label for="date Of Birth" class="fw-bold text-dark">Date Of Birth <span class="text-muted">*</span></label>
																<input type="date" name="birthDate" id="birthDate" class="form-control">
															</div>

                                                            <div class="form-group">
																<label for="position" class="fw-bold text-dark">position<span class="text-muted">*</span></label>
																<select name="position" id="position" class="form-control">
                                                                    <option value="0">Select Option</option>
                                                                    <option value="Point Guard(PG)">Point Guard(PG)</option>
                                                                    <option value="Shooting Guard(SG)">Shooting Guard(SG)</option>
                                                                    <option value="Small Forward(SF)">Small Forward(SF)</option>
                                                                    <option value="Power Forward(PF)">Power Forward(PF)</option>
                                                                    <option value="Center(C)">Center(C)</option>
																</select>
															</div>
                                                            <div class="form-group">
																<label for="jerseyNumber" class="fw-bold text-dark">JerseyNumber<span class="text-muted">*</span></label>
																<input type="number" class="form-control" id="jerseyNumber" name="jerseyNumber">
															</div>
                                                            <div class="form-group">
																<label for="image" class="fw-bold text-dark">Image <span class="text-muted">*</span></label>
																<input type="file" name="image" id="image" class="form-control">
															</div>
															<div class="text-center mt-2 mb-2">
																<img class="img-fluid" id="showImage">
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
<script src="../js/scheduleStats.js"></script>
