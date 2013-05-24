function flash_message(message, type) {
	var $msg = $('<div/>').addClass('alert-fixed').addClass('alert').addClass('alert-'+type).text(message).hide();
	$('.container').prepend($msg);
	$msg.slideDown('fast', function () { setTimeout(function () { $msg.slideUp('fast', function () { $msg.remove(); }); }, 2500); });
}

function save_sets() {
	var sets = [];
	$('#domain_sets form').each(function (i, e) {
		var name = $(e).find('input').val();
		var domains = $(e).find('textarea').val().split("\n");
		sets.push({name: name, domains: domains});
	});

  localStorage.domain_sets = JSON.stringify(sets);

	flash_message('Saved!', 'success');
}

function restore_sets() {
  var sets = localStorage.domain_sets;
  if( ! sets ) { return; }
	$.each(JSON.parse(sets), function (i, e) {
		add_domain_set(e);
	});
}

function add_domain_set (set) {
	var $set = $('<div/>').html($('#domain_set_template').text());
	if( 'undefined' !== typeof set ) {
		$set.find('input').val(set.name);
		$set.find('textarea').val(set.domains.join("\n"));
	}
	$('#domain_sets').append($set);
}

$('#add_set').on('click', function () { add_domain_set(); });
$(document).on('click', '.delete_set', function () { $(this).closest('div').remove(); return false; });

document.addEventListener('DOMContentLoaded', restore_sets);
document.querySelector('#save').addEventListener('click', save_sets);
