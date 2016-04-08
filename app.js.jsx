var Site = React.createClass({
  render: function() {
    var link = "http://" + this.props.site.domain;
    return (
      <a href={ link }>
        <div className="site-row col-xs-12 col-md-6 col-md-offset-3">
          <div className="overlay">
            <h2>
              { this.props.site.name }
            </h2>
            <p>
              { this.props.site.domain }
            </p>
          </div>
          <iframe src={ link }></iframe>
        </div>
      </a>
    );
  }
})

var SiteList = React.createClass({

  getInitialState: function() {
    return ({
      sites: [],
    });
  },

  render: function() {

    var sites = _.filter(this.props.sites, function(site) {
      return site.name.toLowerCase() != "apps";
    });
    var siteNodes = sites.map(function(site) {
      return <Site site={site} />;
    });

    return (
      <div className="container">
      <div className="row">
        {siteNodes}
        </div>
      </div>
    );
  },
});

var App = React.createClass({

  getInitialState: function() {
    return ({
      sites: [],
    });
  },

  componentDidMount: function() {
    var t = this;

    $.ajax({
      url: "/i/sites.json",
      dataType: "json",
      success: function( sites ) {
        t.setState({
          sites: sites
        })
      }
    });
  },

  render: function() {
    var sites = this.state.sites;
    return (
      <SiteList sites={sites} />
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
