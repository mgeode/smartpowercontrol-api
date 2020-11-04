//$( "input[type='checkbox']" ).change(function() {
//    alert( $( this ).val() );
//});
//$(document).ready(function(){
//    $('#id').click(function(){
//      //  window.location.reload('http://localhost:3200/?id='+$( this ).val()); // link of your desired page.
//        alert("tets");
//    });
//});
$('#id').click(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1337/LEDon'
    });
});