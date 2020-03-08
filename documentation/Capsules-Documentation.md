<h1>/api/capsules Endpoint Documentation</h1>

<h2>/api/capsules GET method</h2>

*The /api/capsules GET method returns the title, id and dates for all capsules, so they can be displayed on the main screen. It requires authentication, so that it only may be accessed by users of the Time Capsule client, but individual capsule open dates don't need to have passed.*

**URL:** `/api/capsules`

**Auth required:** YES

**Query input/requirements:** None aside from auth

**Response success status:** 200

**Response success body:** A JSON object including id, title, bury date and open date of ALL currently existing capsules.

**Possible errors:**
403 Invalid Authorization: Indicates that the authorization provided was not correct.

<hr>

<h2>/api/capsules POST method</h2>

*The /api/capsules POST method is used to send all new capsule data to the server. Only one capsule may be sent at a time.*

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

*The /api/capsules/:id GET method may only be used on capsules that have passed their open date. It returns the contents of a capsule and its photo, if there is one. Only info for one capsule, as identified by its ID, is returned using this method.*


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

*The /api/capsules/:id GET method may only be used on capsules that have passed their open date. It deletes an existing capsule, selected by its ID, and only returns a 204 status.*

**URL:** `/api/capsules/:id`

**Auth required:** YES

**Query requirements:** None aside from auth.

**Response success status:** 204

**Response success body:** No body is included in a successful request, as the capsule with the url in the request has been deleted.

**Possible errors:**
403 Invalid Authorization: Indicates that the authorization provided was not correct.

403 This capsule is not ready to be opened: Indicates that the current date is before the open date.

404 Invalid Capsule Id: No capsule was found that matches the given id.
