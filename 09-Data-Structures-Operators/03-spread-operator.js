'use strict';
// ------------- Spread Operator :
// - Used to print / Retrieve the ELements Individually from Arrays, Objects etc..
// - Similar to destructuring as it also helps get elements out of the array
// - Difference is it takes all the elements form teh array and doesn't create new variables
// - As a consequence we can only use it at places where we want values separated by commas
// - Spread Operator works on all kinds of 'iterables'
// Iterables are Arrays, String, Maps, Sets but not Objects

// A) Using for Array Literals :
const arr = [7, 8, 9];

// - Now we want to create a new array based on this array 'arr' but with some new elements at the beginning
// - Methods :
// --- Method 1 : -> Loop and add

// --- Method 2 :
// const brr = [1, 2, arr[0], arr[1], arr[2]];

// --- Method 3 :
// - Using the Spread Operator '...'
// - What spread operator does is it takes all elements out of the array and places them in the array as if we did it manually
const newArr = [1, 2, ...arr];
console.log(newArr); // [1, 2, 7, 8, 9]

// - Printing Elements of array individually
console.log(...newArr); // 1 2 7 8 9

// Object
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // - Destructuring the Object Received via function call
  orderDelivery: function ({ time, place, mainIndex, starterIndex }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${place} at ${time}`
    );
  },
};

// B) Using for Arrays declared in Objects :
// - Printing Elements of Objects Individually
console.log(...restaurant.mainMenu, 'Donuts');

// C) Using for creating shallow copies & merge 2 arrays :
// - Shallow Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// - Join 2 Arrays
const joinArray = [...restaurant.mainMenu, ...restaurant.mainMenu];
console.log(joinArray);

// D) Using it on Strings
const str = 'Onkar';
const letters = [...str, '', 'S'];
console.log(letters);
console.log(...str);

// - Trying to use it in template literal
// - ERROR
// - As in template literals ${} this does not take multiple values
// - console.log(`${...str} hello`);
