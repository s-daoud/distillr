const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Link = ReactRouter.Link;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <div>Hello world!</div>,
    document.getElementById('content')
  );
});
