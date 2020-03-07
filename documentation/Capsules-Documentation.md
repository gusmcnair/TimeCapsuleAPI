<h1>/api/capsules Endpoint Documentation</h1>

<h2>/api/capsules GET method</h2>

<p>**URL:** `/api/capsules`</p>

<p>**Auth required:** YES</p>

<p>**Query requirements:** None aside from auth</p> 

<p>**Response success status:** 200</p> 

<p>**Response success body:** A JSON object including id, title, bury date and open date.</p> 

<p>**Possible errors:**</p>
<p>403 Invalid Authorization: Indicates that the authorization provided was not correct.</p> 

<hr>

<h2>/api/capsules POST method</h2>

<p>**URL:** `/api/capsules`</p>

<p>**Auth required:** YES</p>

<p>**Query requirements:** Must include title, contents, bury date, and open date fields. Image url field is optional. </p> 

<p>**Response success status:** 201</p> 

<p>**Response success body:** An object including the just-posted data.</p> 

<p>**Possible errors:**</p>
<p>403 Missing Required Data: Indicates that not all of the required fields were included in the query.</p> 
<p>403 Invalid Authorization: Indicates that the authorization provided was not correct.</p> 

<hr>

<h2>/api/capsules/:id GET method</h2>

<p>**URL:** `/api/capsules/:id`</p>

<p>**Auth required:** YES</p>

<p>**Query requirements:** Must include a valid Moment.js date object, that is greater than or equal to the given object's bury date.</p> 

<p>**Response success status:** 200</p> 

<p>**Response success body:** A JSON object including the id, title, contents and imageurl (if there is one).</p> 

<p>**Possible errors:**</p>
<p>403 Invalid Authorization: Indicates that the authorization provided was not correct.</p> 
<p>403 This capsule is not ready to be opened: Indicates that the current date is before the open date.</p> 
<p>404 Invalid Capsule Id: No capsule was found that matches the given id.</p> 

<hr>

<h2>/api/capsules/:id DELETE method</h2>

<p>**URL:** `/api/capsules/:id`</p>

<p>**Auth required:** YES</p>

<p>**Query requirements:** Must include a valid Moment.js date object, that is greater than or equal to the given object's bury date.</p> 

<p>**Response success status:** 204</p> 

<p>**Response success body:** No body is included in a successful request, as the capsule with the url in the request has been deleted.</p> 

<p>**Possible errors:**</p>
<p>403 Invalid Authorization: Indicates that the authorization provided was not correct.</p> 
<p>403 This capsule is not ready to be opened: Indicates that the current date is before the open date.</p> 
<p>404 Invalid Capsule Id: No capsule was found that matches the given id.</p> 
