var User = function(searchData) {
  this.avatar_image = '<img src="' + searchData.avatar_url + '" alt="Profile for ' + this.username + '" />';
  this.username = searchData.name;
  this.bio = searchData.bio;
  this.repos = searchData.repos_url;
};

exports.User = User;
