$(function() {
	$("#results").hide();
  $(".form-generate").submit(function(e) {
    e.preventDefault()
    $("#again").show();
    var parameters = $("form").serialize()
    $.post('/account',parameters, function(data) {
    	console.log(data[0])
    	$('.form-generate').hide()
    	$("#results").show();
    	$('input.name').val('');
    	$('input.email').val('');
    	$('#name').html(data[0]["name"]);
      $('#email').html(data[0]["email"]);
      $('#id').html(data[0]["_id"]);
    });
  });
$("#again").click(function(e) {
  e.preventDefault()
  $(".form-generate").show();  
  $("#results").hide(); 
});
});
