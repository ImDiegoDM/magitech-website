$(document).ready(function(){
  const count = $('.banner-container .banner-item').length;
  let index = 0;

  window.addEventListener('resize',function(){
    $('.banner-container').scrollLeft(window.innerWidth * index);
  });

  function clearActiveClass(){
    $('.banner-icons-container .selected-icon').removeClass('active');
  }

  function selectItem(index){
    if(index===count-1){
      index=0;
    }
    const element = $('.banner-icons-container .selected-icon')[index];
    $(element).addClass('active');
    console.log();
  }

  function step(){
    clearActiveClass();
    if(index<count-1){
      index++;
    }else{
      $('.banner-container').scrollLeft(0);
      index=1;
    }
    selectItem(index);
    $('.banner-container').animate({ scrollLeft: window.innerWidth * index }, 600);
  }

  function stepBack(){
    clearActiveClass();
    if(index>0){
      index--;
    }else{
      $('.banner-container').scrollLeft(window.innerWidth * count);
      index=count-2;
    }
    selectItem(index);
    $('.banner-container').animate({ scrollLeft: window.innerWidth * index }, 600);
  }

  let timeout;
  selectItem(0);
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