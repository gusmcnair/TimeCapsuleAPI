<h1>Time Capsule</h1>

Time Capsule is an app for sending messages that can be accessed only by your future self, whether tomorrow, a month from now, or in five years. Use it to send reminders, pass encouragement to a future version of you, or just document what your life is like right now.
 

[Link to live app](https://timecapsule.now.sh/)

[Link to backend repo](https://github.com/gusmcnair/TimeCapsuleClient2)

[Link to API Documentation file](https://github.com/gusmcnair/TimeCapsuleAPI/blob/master/documentation/Capsules-Documentation.md)

<h2>How it works</h2>
The Time Capsule backend has two endpoints: api/capsules and api/capsules/:id. api/capsules accepts a GET method, which returns its title, buried date and open date, but not its contents. POST allows the data and returns this same data, confirming it was posted. api/capsules/:id has a GET method as well, allowing users to retrieve data for a specific time capsule (including its contents). It also allows users to DELETE specific, individual capsules.

<h2>Technologies used</h2>
<ul>
    <li>Node.js</li>
    <li>Moment.js</li>
    <li>Express.js</li>
    <li>JavaScript</li>
</ul>
