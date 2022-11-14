# Simple Demo:
![Gif](https://media.giphy.com/media/oLG0KzMWbV6erMG3uK/giphy.gif)

The Single Page Application (SPA) consists of three pages.

# Structure
Within our src folder, we have App.js, and our 3 "content" pages: Home.js, Blog.js, and About.js

App.js imports Link, Routes, and Route from React, which allows us to create a nav that renders pages we import, without actually completely moving pages. An import of a JS component created by us looks something like:

```import Home from './Home';```

Then, when referencing Home to render it (see App.js), we simply create a route based on the page we want to render:

```<Route path = "/" element = { <Home /> } />```

The "Link" component we imported from React is similar to a list item, which lets us decide what is displayed to the user and what route is called: 

```<Link class = "link" to="/">HOME</Link>```
