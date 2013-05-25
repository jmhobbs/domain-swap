$('#add_set').on('click', function () { UI.add_domain_set(); });
$(document).on('click', '.delete_set', function () { $(this).closest('div').remove(); return false; });

document.addEventListener('DOMContentLoaded', UI.restore_sets);
document.querySelector('#save').addEventListener('click', UI.save_sets);
