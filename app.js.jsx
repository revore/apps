var AppList = React.createClass({

  getInitialState: function() {
    return ({
      apps: [],
    });
  },

  render: function() {
    var appNodes = this.props.apps.map(function(story) {
      return <div>{ story.name }</div>;
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
      apps: [],
    });
  },

  componentDidMount: function() {
    var t = this;

    $.ajax({
      url: "/i/sites",
      dataType: "json",
      success: function( apps ) {
        t.setState({
          apps: apps
        })
      }
    });
  },

  render: function() {
    var apps = this.state.apps;
    console.log(apps);
    return (
      <AppList apps={apps} />
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
