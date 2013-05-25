var UI = {
	flash_message: function (type, message) {
		var $msg = $('<div/>').addClass('alert-fixed').addClass('alert').addClass('alert-'+type).text(message).hide();
		$('.container').prepend($msg);
		$msg.slideDown('fast', function () { setTimeout(function () { $msg.slideUp('fast', function () { $msg.remove(); }); }, 2500); });
	},

	add_domain_set: function (set) {
		var $set = $('<div/>').html($('#domain_set_template').text());
		if( 'undefined' !== typeof set ) {
			$set.find('input').val(set.name);
			$set.find('textarea').val(set.domains.join("\n"));
		}
		$('#domain_sets').append($set);
	},

	restore_sets: function () {
		var sets = Storage.load();
		for( var i in sets ) {
			UI.add_domain_set(sets[i]);
		}
	},

	save_sets: function () {
		var sets = [];
		$('#domain_sets form').each(function (i, e) {
			sets.push(new DomainSet($(e).find('input').val(), $(e).find('textarea').val().split("\n")));
		});
		Storage.store(sets);
		UI.flash_message('success', 'Saved!');
	}
};
