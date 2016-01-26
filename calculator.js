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

$(document).ready(function() {
  update();
  window.addEventListener('resize', update);
    
  clear();
  $(".num").click(function() {
    if (solved) {
      clear();
      $(".top-row").html("");
      $(".bottom-row").html("0");
    }
    if (!op) {
      n1.push($(this).html());
    } else {
      n2.push($(this).html());
    }
    $(".top-row").append($(this).html());
  });

  $(".op").click(function() {
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
    op = $(this).html();
    $(".top-row").append(op);
  });
  
  $(".eql").click(function() {
    solved = true;
    res = result(n1, n2, op);
    $(".bottom-row").html(res);
  });

  $(".cl").click(function() {
    clear();
    $(".top-row").html("");
    $(".bottom-row").html("0");
  });
});

