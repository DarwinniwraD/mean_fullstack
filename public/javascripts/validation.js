$('#addReview').submit(function (e) {
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('input#rating').val() || !$('textarea#review').val()) {
		if ($('.alert.alert-danger').length) {
			$('.alert.alert-danger').show();
		} else {
			$(this).prepend('<div role="alert" class="alert alert-danger">All Fields Required, please try again</div>');
		}
	} else {
		return false;
	}
})