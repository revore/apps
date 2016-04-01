var Site = React.createClass({
  render: function() {
    var link = "http://" + this.props.site.stub + ".paulmckellar.com"
    return (
      <div className="row site-row">
        <div className="col-sm-6 col-sm-offset-3">
          <h2>
            <a href={ link }>
              { this.props.site.name }
            </a>
          </h2>
        </div>
      </div>
    );
  }
})

var AppList = React.createClass({

  getInitialState: function() {
    return ({
      sites: [],
    });
  },

  render: function() {
    var appNodes = this.props.sites.map(function(site) {
      return <Site site={site} />;
    });

    return (
      <div className="container">
        {appNodes}
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
      url: "/i/sites",
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
      <AppList sites={sites} />
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
