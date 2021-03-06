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
    const element = $('.banner-container .carrousel-icons-container .selected-icon')[index];
    $('.banner-container .carrousel-icons-container .selected-icon .inner').css({backgroundColor:'transparent'});
    $(element).children().css({backgroundColor:$(element).children().attr('data-color')});
    console.log($(element).children());
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

  $('.banner-container .carrousel-buttons-container .left').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    stepBack();
  });

  $('.banner-container .carrousel-buttons-container .right').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    step();
  });
});