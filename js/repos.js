var Repo = function(searchData) {
  this.repoName = searchData.name;
  this.html_url = searchData.html_url;
};

exports.Repo = Repo;
