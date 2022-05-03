# Create a miniature version of mobile.de

mobile.de is Germany's largest automotive marketplace. The main reason why consumers come to mobile.de is that they want to find the car that best matches their needs. The main reason why dealers work with mobile.de is that they can list the cars they sell on the marketplace with the biggest reach.

We challenge you to create a miniature version of mobile.de from scratch. What this application is supposed to do is provide a RESTful backend for creating, retrieving and updating car listings, and a matching frontend.

"Bonus tasks" are additions that you can implement if you are adventurous and have too much time on your hands.

You have one week to finish this challenge.

## Tech Stack

- The backend of the application should be a RESTful service implemented in Spring Boot.
- Data is to be persisted in a local `mongodb` or any other in-memory database of your choice.
- The frontend of the application must make use of [React](https://reactjs.org/).

Apart from these constraints, you may use any kind of tool or library you wish.

Strive for a nice UI and UX.

Provide information on how to build and run the application.

## What is the application supposed to do?

There are three basic use cases in this application:

- create a car listing
- display an overview of all car listings
- display the details of one car listing

You should implement at least two of those use cases.

### Create a car listing

This use case should enable users to create a listing for a car that they want to sell. Here, users enter information about the car.

Mandatory fields are:

- The make of the car, which must be one of BMW, Peugeot, Fiat, Kia, Toyota or Chevrolet
- The model of the car, which is a free-form text of a minimum length of 2 and a maximum length of 32 characters
- The year when the car was built
- A free-form text description of the car
- The price of the car in €
- A formally valid contact email address

Optional fields are:

- A URL of an image of the car

Bonus task: It should not be possible to submit a URL to an image that does not exist.

### Overview

The overview use case is a list of all existing car listings. Every list item should display:

- The make of the car
- The model of the car
- The price of the car

A click on a list item results in the details view being shown.

Bonus task: With a growing number of listings, the length of the list may pose performance and UX issues. Find a solution for this.

Bonus task: Provide functionality to filter by price or make.

### Details view

The details view shows all information about the listing. Think about how you present the information to the user.
If an image was provided when creating the listing, this should be shown; otherwise show a placeholder.

Bonus task: show how often the details view has been shown so far so the user can see which cars are viewed often by other users.


Good Luck!
