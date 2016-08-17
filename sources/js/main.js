
window.onload = function() {
  
   //Модальная форма

  function toggleModal () {
    document.getElementById('modal').classList.toggle('modal_open');
  }
  document.getElementById('toggle_form').addEventListener('click', toggleModal);
  document.getElementById('modal__close').addEventListener('click', toggleModal);
  //Таймер

  const finalDate = new Date('2016/10/01 00:00:00');
  let timer= new CountdownTimer('countdown',finalDate,'');
  timer.countDown();
  
  //Выбор цвета страницы и модалки 

  class Colorize {
    constructor(arr) {
      this.colorsInitial = arr;
      this.colors = [];
       
      this.checkNoColors();

      this.targets = document.querySelectorAll('.colorized');
      this.setColors();
    }
    checkNoColors() {
      if (this.colors.length === 0) {
        this.colors = this.colorsInitial.map((color)=> color);
      }
    }
    getRandomColor() {
      const randomColorPosition = Math.round(Math.random() * (this.colors.length - 1));
      const randomColor = this.colors[randomColorPosition];
      console.log(randomColor + " " + randomColorPosition);
      this.colors.splice(randomColorPosition, 1);
      this.checkNoColors();
      return randomColor;
    }
    setColors() {
      //Возможно перепилить для уникального цвета каждому блоку
      const length = this.targets.length;
      const color = this.getRandomColor();
      for (let i = 0; i < length; i++){
        this.setColor(this.targets[i], color);
      }
    }
    setColor(element, color) {   
      element.style.backgroundColor = color;
      if(color === '#facc13' || color === '#ccdc2a') {
        element.classList.add('gray-text');
      }else {
        element.classList.remove('gray-text');
      }
    }
  }
  let colorize = new Colorize(['#4b4a9e', '#3da2db', '#ef5d67', '#facc13', '#ccdc2a']);
  
  // Дискотека

  // setInterval(colorize.setColors.bind(colorize), 5000);

  //Движуха. По свободе отрефакторить
  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      color = 'rgba(255, 255, 255, .3)';

  let header = document.getElementById('header-wraper');

  var w = canvas.parentNode.offsetWidth;
  var h = canvas.parentNode.offsetHeight;
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = color;
  ctx.lineWidth = .1;
  ctx.strokeStyle = color;

  var mousePosition = {
    x: 10 * w / 100,
    y: 10 * h / 100
  };

  function linesListener (e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  }
  
 
  header.addEventListener('mousemove', linesListener);
  
  header.addEventListener('mouseleave', (e)=> {
    mousePosition.x = w / 2;
    mousePosition.y = h / 2;
  })

  var dots = {
    num: 100,
    distance: 200,
    d_radius: 150,
    velocity: -.9,
    array: []
  };

  function Dot(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.vx = dots.velocity + Math.random();
    this.vy = dots.velocity + Math.random();

    this.radius = Math.random() * 2;
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function() {
      for(let i = 0; i < dots.num; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > h){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > w){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function() {
      for(let i = 0; i < dots.num; i++){
        for(let j = 0; j < dots.num; j++){
          let i_dot = dots.array[i];
          let j_dot = dots.array[j];

          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
                   ctx.bezierCurveTo(i_dot.x, (h / 2), (w / 2), i_dot.y, j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots(){
    ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < dots.num; i++){
      dots.array.push(new Dot());
      var dot = dots.array[i];
      dot.create();
    }
    dot.line();
    dot.animate();
  }
  
  //Отрефакторил из соображений производительности
  
  
  (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  function step() {
    ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < dots.num; i++){
      dots.array.push(new Dot());
      var dot = dots.array[i];
      dot.create();
    }
    dot.line();
    dot.animate();
    requestAnimationFrame(step);
  }
  
  step();

  window.addEventListener('resize', function() {
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = color;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;
  });

}
