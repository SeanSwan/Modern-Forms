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
const formBox = document.QuerySelector('#form-box');
const nextBtn = document.QuerySelector('#next-btn');
const prevBtn = document.QuerySelector('#prev-btn');
const inputGroup = document.QuerySelector('#input-group');
const inputField = document.QuerySelector('#input-field');
const inputLabel = document.QuerySelector('input-label');
const inputProgress = document.QuerySelector('#input-progress');
const progress = document.QuerySelector('#progress-bar');

//EVENTS

document.addEventListhener('DOMContentLoaded', getQuestion);

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
