var Query = require('./../js/query.js');

$(function() {
    $.get('https://api.github.com/users/daneden', function(data) {
      console.log(data);
    });
  });

});
