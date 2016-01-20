---
layout: docs
title: Test
group: material-design
---


{% example html %}

<h2>Normal navbar</h2>
<nav class="navbar navbar-light bg-faded">
  <div class="container">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul class="nav navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
    <form class="form-inline pull-right">
      <input class="form-control" type="text" placeholder="Search">
      <button class="btn btn-success-outline" type="submit">Search</button>
    </form>
  </div>
</nav>
  
<br>
<br>
<br>
<h2>Flex navbar</h2>
With flex enabled on a navbar (and with compiled flex-enabled css), the nav elements do not inline.
 
<style>
.flexyflexflex {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-shrink: 0;
  justify-content: flex-start;
}

.flexyflexflex form {
  margin-left: auto;
}
</style>
 
<nav class="navbar navbar-light bg-faded flexyflexflex">
  <div class="container">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul class="nav navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
    </ul>
    <form class="form-inline">
      <input class="form-control" type="text" placeholder="Search">
      <button class="btn btn-success-outline" type="submit">Search</button>
    </form>
  </div>
</nav>    

{% endexample %}
