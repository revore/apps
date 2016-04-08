var Site = React.createClass({
  render: function() {
    var link = "http://" + this.props.site.domain;
    return (
      <a href={ link }>
        <div className="site-row col-xs-12">
          <div className="overlay">
            <div className="title">
              <h2>
                { this.props.site.name }
              </h2>
              <p>
                { this.props.site.domain }
              </p>
            </div>
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
          <div className='col-md-8 col-md-offset-2 col-xs-12'>
            <div className="row">
              {siteNodes}
            </div>
          </div>
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
