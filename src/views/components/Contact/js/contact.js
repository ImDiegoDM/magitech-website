$(document).ready(function(){
  $('.contact form').submit(function(event){
    event.preventDefault();
    let name = $('.contact input[name=name]').val();
    let email = $('.contact input[name=email]').val();
    let message = $('.contact textarea[name=message]').val();

    $('.contact form').css({'display':'none'});
    $('.contact #sended-mail').css({'display':'block'});


    $.post('./api/v1/mail/website-contact',{
      name:name,
      email:email,
      message:message,
    },function(data, status){
      $('.contact #sended-mail').css({'display':'none'});
      $('.contact #sucess-mail').css({'display':'block'});
    });
    
  })
});