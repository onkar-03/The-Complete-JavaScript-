'use strict';

// All Selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Old way top Loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// As btnsOpenModal is a node list as we used .querySelectorAll, and a node list has a forEach method hence we use that
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////
// ---- Implementing Smooth Scrolling ----

// Event Listener
buttonScrollTo.addEventListener('click', e => {
  e.preventDefault();

  // OLD SCHOOL METHOD:
  // - Fetching the coordinates of the Section 1 on the Page
  // - For this we use the .getBoundingClientRect() method on Section 1
  // - The .getBoundingClientRect() relative to the current viewport width, all the x, y, top, bottom etc...
  // - It returns the DOMRect Object
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);

  // - To view the Current X & Y Coordinates
  // - They are properties of the Window interface in JavaScript that provide the number of pixels the document has been scrolled horizontally and vertically, respectively.
  // -They are commonly used to get the current scroll position of the document.
  console.log(`Current X/Y: ${window.pageXOffset} ${window.pageYOffset}`);

  // - To view the current height & width of the viewport
  console.log(
    `Height/Width of Viewport: ${document.documentElement.clientHeight}, ${document.documentElement.clientWidth}`
  );

  // Scrolling
  // - For that we use the window.scrollTo method
  // window.scrollTo(s1Coordinates.left, s1Coordinates.top); // ERROR: Scroll Issue

  // --- Scroll Issue with getBoundingClientRect() ---
  // - When using element.getBoundingClientRect() to obtain the position of an element on a webpage, the values returned are relative to the viewport, not the entire document
  // - This can lead to issues when trying to scroll to an element that is not currently within the initial view of the page
  // - If you are at the very start (top) of the page, the top value accurately reflects the element’s distance from the top of the document
  // -  However, if you are scrolled down, the top value only reflects the distance from the current viewport's top edge, not the document's top
  // - When you use this relative top value to scroll to an element, it doesn’t account for the current scroll position of the page. This causes scrolling inaccuracy

  // SOLUTION
  // - To correctly scroll to an element regardless of the current scroll position, you need to adjust the top value obtained from getBoundingClientRect() by adding the current vertical scroll position (window.pageYOffset).
  // window.scrollTo(
  //   s1Coordinates.left + window.pageXOffset,
  //   s1Coordinates.top + window.pageYOffset
  // );

  // MODERN METHOD
  // - It does the same job without the need to calculate manually all the values
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////////////////
// ---- Implementing Page Navigation ----

// Method 1 : (Inefficient)

// Selecting all of the Anchor Elements on the page
// Using .querySelectorAll() returns the node list
// We can now use forEach method to iterate over all of them and add an event listener
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // Prevent scrolling to the section on click
    e.preventDefault();

    // Retrieve the value of a specific attribute 'href'
    // Store it into a variable
    const id = this.getAttribute('href');
    // console.log(id);

    // Implement Smooth Scrolling to that section
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// Method 2 : Event Delegation

// Selecting common Parent 'nav__links'
// Adding event to This common parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // To know where the happened we used e.target
  // Matching strategy, to check if the anchor links were clicked by matching their class names
  // If they match retrieve their attribute 'href'
  // implement the Smooth scrolling to that href attribute that was retrieved
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////
// ---- DOM Traversing ----

// Selecting the H1 using .querySelector
const h1 = document.querySelector('h1');

// --- Going Downwards
// .querySelector works on both document & elements as well
// Selecting the 'highlight' class which are the children of h1 element, and it does not matter how deep they are in the h1 element
// Also h1.querySelectorAll selects only the highlight classes that are children of the h1 only
console.log(h1.querySelectorAll('.highlight'));

// To select the DirectNodes of h1 we can use
// Text Comments etc.. all are selected
// Gives us every single node of every single type that exists
console.log(h1.childNodes);

// To get the Direct Children HTML Elements only that are actually inside the h1 we use .children
console.log(h1.children);

// We can also select the First and Last element Child like this
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'yellow';
