$(document).ready(function(){
  const count = $('.banner-container .banner-item').length;
  let index = 0;

  window.addEventListener('resize',function(){
    $('.banner-container').scrollLeft(window.innerWidth * index);
  })

  function step(){
    console.log('step');
    if(index<count-1){
      index++;
    }else{
      $('.banner-container').scrollLeft(0);
      index=1;
    }
    $('.banner-container').animate({ scrollLeft: window.innerWidth * index }, 600);
  }

  function stepBack(){
    console.log('stepBack');

    if(index>0){
      index--;
    }else{
      $('.banner-container').scrollLeft(window.innerWidth * count);
      index=count-2;
    }
    $('.banner-container').animate({ scrollLeft: window.innerWidth * index }, 600);
  }

  let timeout;

  function animate(){
    timeout = setTimeout(() => {
      step();
      animate();
    }, 15000);
  }

  animate();

  $('.banner-buttons .left').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    stepBack();
  });

  $('.banner-buttons .right').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    step();
  });
});