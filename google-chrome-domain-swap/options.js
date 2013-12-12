/**
 * Show a message next to the form actions.
 *
 * TODO: This is a bit dodgy, we need a better notification system.
 */
function flash_message (message) {
	document.querySelector('#message').innerText = message;
	setTimeout(function () { document.querySelector('#message').innerText = ''; }, 2500);
}

/**
 * add_domain_set and save_sets make some assumptions about the template for domain sets.
 * If you modify the template, keep these assumptions in mind:
 *
 * 1) There is only one input, and it contains the name.
 * 2) There is only one textarea, and it contains the domains, one to a line.
 * 3) There is a delete button, whose parent is the container form.
 */

/**
 * Append a new domain set from a template to the target, optionally 
 * pre-filling it with data from a DomainSet object.
 */
function add_domain_set (target, template, set) {
	var tmp_div = document.createElement('div');
	tmp_div.innerHTML = template.textContent;
	if( 'undefined' !== typeof set ) {
		tmp_div.querySelector('input').value = set.name;
		tmp_div.querySelector('textarea').value = set.domains.map(function (s) { return s.host + s.path; }).join("\n");
	}
	tmp_div.querySelector('button.delete_set').addEventListener('click', function (e) { e.preventDefault(); this.parentNode.remove(); });
	target.appendChild(tmp_div.querySelector('form'));
}

/**
 * Extract and save the DomainSet data from a NodeList of forms.
 */
function save_sets (forms) {
	var i, form, sets = [];
	for (i = 0; i < forms.length; ++i) {
		form = forms[i];
		sets.push(new DomainSet(form.querySelector('input').value, form.querySelector('textarea').value.split("\n")));
	}
	Storage.store(sets);
	flash_message('Saved!');
}

/**
 * Load DomainSets from storage and add their forms to the document.
 */
function restore_sets (target, template) {
	var sets = Storage.load();
	sets.forEach(function (set, set_i) {
		add_domain_set(target, template, set);
	});
}

document.addEventListener('DOMContentLoaded', function () { restore_sets(document.querySelector('#domain_sets'), document.querySelector('#domain_set_template')); });
document.querySelector('#save').addEventListener('click', function (e) { e.preventDefault(); save_sets(document.querySelectorAll('#domain_sets form')); });
document.querySelector('#add_set').addEventListener('click', function (e) { e.preventDefault(); add_domain_set(document.querySelector('#domain_sets'), document.querySelector('#domain_set_template')); });
