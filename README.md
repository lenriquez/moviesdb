moviesdb
========


Technologies Decisions:
=======================
This technologies were chosen over other technologies especially on the JavaScript side due to lack of time 

- It was chosen __Symfony__ because is one of the frameworks that is used in Alert Logic and I have experience with it.
- It was chosen __JQuery__ UI and __Bootstrap__ because I had used it before and is a very simple to use.

Architectural Decisions : 
=========================

On the Front-End (JavaScript) side:
- It was chosen to use __functional inheritance pattern__ to allow some type of encapsulation.
- The project is encapsulated inside of a __namespace__ to avoid problems with variables or functions without scope
- UI Event handelers were encapsulated inside of an object __controller__
- No other __model__ than the one inside of the __Bootstrap-Table__ seems to be necesary.

On the Back_End (PHP) side:
- Thanks to the framework guideness the project is encapsulate inside of a __bundle__.
- Using services that works as helper providing simpler access to the requested API.

Requirements
============

  - PHP 5.3.3+ compiled with the cURL extension.
  - Symfony 2.3

Folder structures:
==================

```
|-- DefaultBundle                       
|   |-- Controller                      
|   |   |-- DefaultControler.php        // Only controller necessay for the appliacation to function    
|   |-- Model
|   |   |-- TheMoviesDBAPIHelper.php    // Helper to access the API requested 
|   |-- Resources                       // Store front-end files.
|   |   |-- Public   
|   |       |-- js 
|   |           |-- vendor              // Necessary JS libraries
|   |           |-- controllers 
|   |           |-- main.js             // Start Javascript Execution
|   |           |-- constants.js        // Save constant 
|   |       |--css
|   |           |-- *                   // Requiere CSS
|   |-- util
|   |   |-- CurlHelper.php              // Helper the PHP standard Curl class 
```