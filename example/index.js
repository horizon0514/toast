var toast = new Toast();

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

btn1.addEventListener('click', function(){
  toast.info('this is a toast !!!', 3000);
})

btn2.addEventListener('click', function(){
  toast.loading('loading', 0);
})

btn3.addEventListener('click', function(){
  toast.hide();
})