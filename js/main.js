// Questions Array
const questions = [
  { question: 'Enter Your First Name'},
  { question: 'Enter Your Last Name'},
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/},
  { question: 'Create A Password', type: 'password'},
];


//  Transition Times
const ShakeTime = 100 // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init Dom Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//EVENTS

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
  nextBtn.addEventListener('click', validate);

  // Input Field Enter Click
  inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
      validate();
    }
  });


//FUNCTIONS

// Get Question From Array & Add to Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  //Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus  On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = postion ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

//Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.stle.border = null;
  
}

// Transform To Create Shake Motion
function Transform(x,y) {
  // console.log(x,y);
  formBox.style.Transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Patter Matches If There IS One
  if (!inputField.value.match(questions[position].pattern || /.+/)
  ){
    inputFail();
  } else {
    inputPass();
  }

}

// Field Input Fail
  function inputFail() {
    formBox.className = 'error';
    // Repeat Shake Motion - Set i to number of shakes
    for(let i = 0; i < 7; i++) {
      setTimeout(transform, ShakeTime * i,((i % 2) * 2 -1) * 20,
      0);
      setTimeout(transform, ShakeTime * 6, 0, 0);
      inputField.focus();
    }
  }

  // Field Input Passed 
  function inputPass() {
      formBox.className = '';
      setTimeout(transform, ShakeTime * 0, 0 ,10);
      setTimeout(transform, ShakeTime * 1, 0 ,0);

      // Store Answer In Array
      questions[position].answer = inputField.value;
      
      // Increment Position
      position++;

      // If New Question, Hide Current and Get Next
      if(questions[position]) {
        hideQuestion();
        getQuestion();
      } else {

      }

  }

  // All Fields Complete
  function formComplete() {
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0]
      .answer} You are registered and will get an email shortly`));
      
      
      setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1),50);
      },1000);
  }
