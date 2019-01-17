$(document).ready(function(){

  const count = $('#portfolio .carrousel-iten').length;
  let index = 0;
  let width = $('#portfolio .carrousel-scroller').innerWidth();

  window.addEventListener('resize',function(){
    width = $('#portfolio .carrousel-scroller').innerWidth();
    $('#portfolio .carrousel-scroller').scrollLeft(width * index);
  });

  function selectItem(index){
    if(index===count-1){
      index=0;
    }
    const element = $('#portfolio .carrousel .carrousel-icons-container .selected-icon')[index];
    $('#portfolio .carrousel .carrousel-icons-container .selected-icon .inner').css({backgroundColor:'transparent'});
    $(element).children().css({backgroundColor:$(element).children().attr('data-color')});
    console.log($(element).children());
  }

  function step(){
    if(index<count-1){
      index++;
    }else{
      $('#portfolio .carrousel-scroller').scrollLeft(0);
      index=1;
    }
    selectItem(index);
    $('#portfolio .carrousel-scroller').animate({ scrollLeft: width * index }, 600);
  }

  function stepBack(){
    if(index>0){
      index--;
    }else{
      $('#portfolio .carrousel-scroller').scrollLeft(width * count);
      index=count-2;
    }
    selectItem(index);
    $('#portfolio .carrousel-scroller').animate({ scrollLeft: width * index }, 600);
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

  $('#portfolio .carrousel .carrousel-buttons-container .left').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    stepBack();
  });

  $('#portfolio .carrousel .carrousel-buttons-container .right').click(function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      animate();
    }, 15000);
    step();
  });
});