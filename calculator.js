var cf = 1000000; //correction factor for floating point
var calc = {
  '+': function (a, b) { return ((a*cf)+(b*cf))/cf; },
  '-': function (a, b) { return ((a*cf)-(b*cf))/cf; },
  '*': function (a, b) { return ((a*cf)*(b*cf))/(cf*cf); },
  '/': function (a, b) { return (a*cf)/(b*cf); },
}
function round_number(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
function result(n1, n2, op) {
  num1 = parseFloat(n1.join(""), 10);
  num2 = parseFloat(n2.join(""), 10);
  return round_number(calc[op](num1, num2), 12);
}
var op = null; var n1 = []; var n2 = []; var solved = false;

function clear() {
  n1 = []; n2 = []; op = null; solved = false;
}

function update() {
  ir = 1366/914;
  w = window.innerWidth;
  h = window.innerHeight;
  sr = w/h;
    if (ir < sr) {
   $(".blur").css("background-size", w+'px '+'auto');
    } else {
   $(".blur").css("background-size", 'auto '+h+'px');
    }
  var blur = document.getElementById("blur");
  x = blur.getBoundingClientRect().left;
  y = blur.getBoundingClientRect().top;
  $(".blur").css("background-position", -x+'px '+ -y+'px');
}

function number(no){
  if (solved) {
    clear();
    $(".top-row").html("");
    $(".bottom-row").html("0");
  }
  if (!op) {
    if (no === '.' && n1.indexOf('.') !== -1) return; 
    n1.push(no);
  } else {
    if (no === '.' && n2.indexOf('.') !== -1) return; 
    n2.push(no);
  }
  $(".top-row").append(no);
}

function operator(operator){
  if (solved) {
    $(".top-row").html(res);
    clear();
    n1.push(res);
  }
  if (n2.length === 0){
    $(".top-row").html(n1);
  } else {
    if (op) {
      res = result(n1, n2, op);
      n1 = []; n2 = [];
      n1.push(res);
    }      
  }
  if (n1.length === 0){
    n1.push(operator);
  } else {
    op = operator;
  }
  $(".top-row").append(operator);
}
function equal(){
  if (n2.length === 0) return;
  solved = true;
  res = result(n1, n2, op);
  $(".bottom-row").html(res);
}

function reset(){
  clear();
  $(".top-row").html("");
  $(".bottom-row").html("0");
}

$(document).ready(function() {
  update();
  window.addEventListener('resize', update);
  
  clear();
  $(".num").click(function(ev) {
    $(this).blur();
    number($(this).html());
  });

  $(".op").click(function(ev) {
    $(this).blur();
    operator($(this).html());
  });
  
  $(".eql").click(function(ev) {
    $(this).blur();
    equal();
  });

  $(".cl").click(function(ev) {
    $(this).blur();
    reset();
  });

  $("body").keydown(function(e){
    char = e.key;
    switch (char){
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.':
        number(char);
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        operator(char);
        break;
      case 'Enter':
        equal();
        break;
      case 'Delete':
        reset();
        break;
    }
    });
});