$(document).ready(function() {
  $( "form" ).submit(function(e){
     e.preventDefault();
    $.ajax({
        url:'https://script.google.com/macros/s/AKfycbxDMH-HoaLa5u2X9sey9cIRrwobARuvSxEaiQIHfg98h4ivirho/exec',
        type:'post',
        data:$(' form ').serialize(),
        success:function(){
            window.location.replace("/order-finish/");
        }
    });

  });
});