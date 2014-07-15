CommandCenter
=============

Command Center app publishes channels (URLs) to distributed locations for operational monitoring


IIS Setup
=========

* Install the IIS URL Rewrite module from http://www.iis.net/downloads/microsoft/url-rewrite
* Install iisnode from https://github.com/tjanczuk/iisnode
* To run Command Center in its own application in IIS:
  * Setup an application in IIS
  * Map the application to the /src folder inside of Command Center
