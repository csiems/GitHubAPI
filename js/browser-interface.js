var User = require('./../js/user.js').User;

$(document).ready(function(){
  $('#submitUserName').click(function(){
    var userName = $('#userName').val();
    $('#avatarImage').empty();
    $('#userNameDisplay').empty();
    $('#userBio').empty();
    $('#repoInfo').empty();
    $('#userName').val("");
    $.get('https://api.github.com/users/' + userName, function(data) {
      var newUser = new User(data);
      $('#avatarImage').append(newUser.avatar_image);
      $('#userNameDisplay').append('<h2>' + newUser.username + '</h2>');
      if (newUser.bio) {
        $('#userBio').append('<h4>Bio:</h4><p> ' + newUser.bio + '</p>');
      }
      if (newUser.repos) {
        $.get(newUser.repos, function(repoData) {
          $('#userRepos').show();
          for (var index in repoData) {
            $('#repoInfo').append('<tr><td><a href="' + repoData[index].html_url + '">' + repoData[index].name + '</a></td><tr>');
          }
        });
      }
    });
  });
});
