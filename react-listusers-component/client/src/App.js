import {Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import './style.css'

import logo from "./img/logo192.png"
import Display from './components/Display';

function SPA(){
    // In this component, we are returning a div that includes our nav and the structure of our SPA (single page application)
    const api = process.env.REACT_APP_API_URL + "/api/listAllUsers";
    return(
        // all returns must have a parent div that includes the rest of the JSX
        <div class="App">
            <div class = "nav">
                {/* 
                    Here we place a navbar logo and our two Links. Link is imported from React, and in simple terms is just 
                    a link within our nav bar. The "to" defines what page we want to render in our SPA
                */}
                <img src = {logo} alt = "Logo" height = "50" width = "50"/>
                <div class = "links">
                    <Link class = "link" to="/"> "HOME" </Link>
                    <Link class = "link" to="blog"> "BLOG" </Link>
                    <Link class = "link" to="display"> "ListAllUsers Component" </Link>
                    <a target="blank" href= {api}> "Web User API" </a>
                </div>
            </div>
            {/*
                The "routes" of React tell React what to render when we go to certain links, like above where they are 
                called inside our Link components. The "/" route is our home route, and blog is as indicated, our blog page.

                Notice element = { <NameOfPage /> } that we want to render.
            */}
            <Routes>
                <Route path = "/" element = { <Home /> } />
                <Route path = "blog" element = { <Blog /> } />
                <Route path = "display" element = { <Display /> } />
            </Routes>
        </div>
    );
}

// To access our component outside of this file, we must export it.
export default SPA;