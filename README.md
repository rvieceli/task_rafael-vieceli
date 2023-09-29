# Instructions

## Confidentiality statement
Please be aware that all the information and data contained in this communication are to be used solely by the recipient of this email and only within the scope of this job application.

Any information breach or sharing of information with non-authorized third parties will be prosecuted by MindEarth to the extent permitted.

## Goals
 - keep simple
 - develop a web application that interacts with geolocalized maps
 - find library for displaying geolocalized maps
 - focus on front-end app

## Input data


The provided files represent the dump of a past street-level survey database sample. The survey has been performed using six backpacks developed in-house by a crowd of 12 users (mappers). 

The database is voluntarily redundant and has a limited number of collections to ease up the development.

The dump has been taken using the `JSON` output format from a `MongoDB` installation.
A set of `GPX v1.0` files in the `data/` subfolder completes the data available for the task.

### Structure
Here we detail some of the attributes of each collection, leaving some of the interpretation to you. Note that the survey has been carried out in the central area of Milan.

There are three collections:
- The `users` collection is self-explanatory, contains the activated users (mappers) with their `id`
- The `routes` collection contains the “missions” the mappers are supposed to undertake. The most relevant properties needing an explanation are:
  - `expire_date` and `final_date` are the `UTC` timestamps of the 12:00pm of the day from which a mission can be reserved and the 23:59 of the last day when a mission can be accomplished, respectively;
  - `position`, `latlonStart` and `pointStart` are redundant representations of the starting point of the mission in latitude and longitude using the `WGS:84 EPSG 3246` projection;
  
- The `missions` collection is the key one, as it contains the output of the “missions” actually performed by the mappers. Here we provide an explanation for these relevant properties:
  - The `locations` field contains an array of the positions of the user recorded via the phone GPS. The values of each array element are
```
	["UTC_time": 0, "latitude": 0.0, "longitude": 0.0,  "surveying": 0/1, 
	 “accuracy”: 0.0, “heading”: 0.0, “altitude”: 0.0, “speed”: 0.0]
```
  The `altitude` and `accuracy` are in meters, `speed` is km/h while `heading` is in degrees, being 0 the north-ward direction and then increasing clock-wise). 
  - Similarly, the `pictures` field contains the `timestamp`, `latitude`, `longitude` and `heading` of the positions where the pictures have been actually taken;

The other fields should be self-explanatory,

## Task
The task is to create a meaningful (though not extensive) web dashboard reporting the key geographical and/or statistical properties of the survey. It is up to you to choose the relevant metrics/visualizations to put and to later justify your choice at the interview time.

The dashboard can be produced with any web framework of your choice, deploying it either locally or on a cloud instance and using the web server that best fits your needs.
These technical choices will be scrutinized and discussed during the call.
