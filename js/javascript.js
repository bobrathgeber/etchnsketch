var $wrapper = $('#content-wrapper');

$(document).ready(function(){
  generateGrid(25);
});

$(document).on('mouseenter', '.colored-square', function(){
  var newColor = increase_brightness(rgb2hex($(this).css('background-color')), 25);
  //console.log(newColor + " " + $(this).css('background-color'));
  $(this).css('background-color', newColor);
})

$( "#set-grid" ).submit(function( event ) {
  generateGrid($('input[name=size_input]').val());
  alert( $('input[name=size_input]').val() );
  event.preventDefault();
});


var generateGrid = function(size){
  var n = $wrapper.css("width");
  var width = n.split("px")[0];
  if(size > width) {
    return;
  }
  $wrapper.empty();
  var cellwidth = width / size;

  for (var i = 0; i < size*size; i++) {
    createSquare(i);
  }
  $('.colored-square').css('height', cellwidth);
  $('.colored-square').css('width', cellwidth);
}

var createSquare = function(num, size){
  $('#content-wrapper').append("<div class='colored-square'></div>");
}

function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }
    console.log(hex);

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) + "" +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) + "" +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }
