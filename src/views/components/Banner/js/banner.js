$(document).ready(function(){
  const count = $('.banner-container .banner-item').length;
  let index = 0;

  window.addEventListener('resize',function(){
    $('.banner-container').scrollLeft(window.innerWidth * index);
  })

  function step(){
    if(index === count){
      $('.banner-container').scrollLeft(0);
      index=1;
    }
    $('.banner-container').animate({ scrollLeft: window.innerWidth * index }, 600);
    console.log(index);

    if(index<count){
      index++;
    }else{
      index=0;
    }
  }

  function animate(){
    step();
    setTimeout(() => {
      animate();
    }, 15000);
  }

  animate();
});