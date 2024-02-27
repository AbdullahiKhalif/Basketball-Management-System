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
								<i class="fa fa-football fs-4 text-primary"></i> <span class="card-title fs-4">Games DataTables</span>
									<h6 class="card-subtitle text-muted">You can add new game, update and delete also. fill free to use our system😍.</h6>
									<hr style="border: 1px solid #000;">
									<button type="button" class="btn btn-primary my-1 float-end" id="addNew">
									Add New Game
									</button>
									
								</div>
								<div class="card-body">	
									<table id="gameTable" class="table table-striped DataTableResponsive" style="width:100%">
										<thead class="table">
											<tr>
												<th>#</th>
												<th>Home Team ID</th>
												<th>Away Team ID</th>
												<th>Game Date</th>
												<th>Result</th>
												<th>Score Home</th>
												<th>Scrore Away</th>
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
				
									<div class="modal fade" id="gameModal" tabindex="-1" role="dialog" aria-hidden="true">
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
													<form id="gameForm" enctype="multipart/form-data">
														<div class="row">
															
															<div class="form-group">
																<!-- <label for="gameId" class="fw-bold text-dark">GameId <span class="text-muted">*</span></label> -->
																<input type="hidden" name="gameId" id="gameId" class="form-control">
															</div>
															
															
															<div class="form-group">
																<label for="homeTeam" class="fw-bold text-dark">Home Team <span class="text-muted">*</span></label>
																<select name="homeTeamId" id="homeTeamId" class="form-control">
																	
																</select>
															</div>
															<div class="form-group">
																<label for="status" class="fw-bold text-dark">Away Team <span class="text-muted">*</span></label>
																<select name="awayTeamId" id="awayTeamId" class="form-control">				
																</select>
															</div>

															<div class="form-group">
																<label for="date" class="fw-bold text-dark">Game Date <span class="text-muted">*</span></label>
																<input type="date" name="gameDate" id="gameDate" class="form-control">
															</div>

                                                            <div class="form-group">
																<label for="result" class="fw-bold text-dark">Game Result <span class="text-muted">*</span></label>
																<select name="result" id="result" class="form-control">
                                                                    <option value="0">Select Option</option>
                                                                    <option value="win">Win</option>
                                                                    <option value="loss">Loss</option>
                                                                    <option value="draw">Draw</option>
                                                                </select>
															</div>
                                                            <div class="form-group">
																<label for="scroreHomeTeam" class="fw-bold text-dark">Score Home Team<span class="text-muted">*</span></label>
																<input type="number" name="scoreHomeTeam" id="scoreHomeTeam" class="form-control">
															</div>
                                                            <div class="form-group">
																<label for="scoreHomeTeam" class="fw-bold text-dark">Score Away Team<span class="text-muted">*</span></label>
																<input type="number" name="scoreAwayTeam" id="scoreAwayTeam" class="form-control">
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
<script src="../js/game.js"></script>
