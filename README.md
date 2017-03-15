# RESTProject
Webpage made with Python Flask framework, Javascript, Mongodb and Apache.


Front Page
![alt tag](https://cloud.githubusercontent.com/assets/15322769/23939493/91119b20-0969-11e7-80c0-c90168475b1c.png)

Developer page
![alt tag](https://cloud.githubusercontent.com/assets/15322769/23939488/8cbde7d6-0969-11e7-9a65-dc4355993c73.png)

![alt tag](https://cloud.githubusercontent.com/assets/15322769/23939491/8f052dce-0969-11e7-80a1-be476ecedf77.png)

Everything comes as JSON from the database. Same urls with different methods do different things. Requests to URL 
</v2/bar/Amarillo?key=2ad72c> with DELETE method would delete that specific bar, GET would return the bar info and POST would update the bar if you send parameters with it.

For example: 

Method GET to 

URL: /v2/bar/Boothill/prizes?key=2ad72c 

Returns: { "beerprize": "4.0", "jagermaister": "5.5" }

OR

URL: /v2/bar/Apollo?key=2ad72c 

Returns: { "_id": { "$oid": "58c15597efd717334c26bb10" }, "lat": "60.168802", "lon": "24.937463", "name": "Apollo", "openhours": "15:00-00:00", "prizes": { "beerprize": "7", "jagermaister": "8.5" } }

