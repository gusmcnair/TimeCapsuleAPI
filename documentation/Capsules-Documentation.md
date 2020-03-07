<h1>/api/capsules Endpoint Documentation</h1>

<h2>/api/capsules GET method</h2>

**URL:** `/api/capsules`

**Auth required:** YES

**Query input/requirements:** None aside from auth

**Response success status:** 200

**Response success body:** A JSON object including id, title, bury date and open date of ALL currently existing capsules.

**Possible errors:**
403 Invalid Authorization: Indicates that the authorization provided was not correct.

<hr>

<h2>/api/capsules POST method</h2>

**URL:** `/api/capsules`

**Auth required:** YES

**Query requirements:** Must include title, contents, bury date, and open date fields. Image url field is optional.

**Response success status:** 201

**Response success body:** An object including the just-posted data, confirming the existence of the new capsule.

**Possible errors:**
403 Missing Required Data: Indicates that not all of the required fields were included in the query.
403 Invalid Authorization: Indicates that the authorization provided was not correct.

<hr>

<h2>/api/capsules/:id GET method</h2>

**URL:** `/api/capsules/:id`

**Auth required:** YES

**Query requirements:** None aside from auth.

**Response success status:** 200

**Response success body:** A JSON object including the id, title, contents and imageurl (if there is one) for the capsule with the specified ID.

**Possible errors:**
403 Invalid Authorization: Indicates that the authorization provided was not correct.

403 This capsule is not ready to be opened: Indicates that the current date is before the open date.

404 Invalid Capsule Id: No capsule was found that matches the given id.

<hr>

<h2>/api/capsules/:id DELETE method</h2>

**URL:** `/api/capsules/:id`

**Auth required:** YES

**Query requirements:** None aside from auth.

**Response success status:** 204

**Response success body:** No body is included in a successful request, as the capsule with the url in the request has been deleted.

**Possible errors:**
403 Invalid Authorization: Indicates that the authorization provided was not correct.

403 This capsule is not ready to be opened: Indicates that the current date is before the open date.

404 Invalid Capsule Id: No capsule was found that matches the given id.
