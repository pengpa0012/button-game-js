const btns = document.querySelectorAll('.btn');
const text = document.querySelector('.text');
const body = document.querySelector('body');
const round = document.querySelector('.round-text');
const plusText = document.querySelector('.puzzle h3');


let lifeCount = 5;
let lifeBonus = 2;
let indexCount = 0;
let numArray = [
	3, 1, 0, 2
];

let roundScore = 1;
round.innerHTML = 'Round: ' + roundScore;

let passingScore = 0;

text.innerHTML = lifeCount;

const reset = document.querySelector('.reset-btn');
function clickBtn(){

	btns.forEach(btn => {
		btn.addEventListener('click', ()=>{

			if(btn === btns[numArray[indexCount]]){
				// go to next combination
				indexCount++;

				// add push animation
				btn.classList.add('active');

				// disabled button
				btn.disabled = true;

				// adding and removing style from body
				body.classList.add('correct');	
				body.classList.remove('wrong');	

				// increment passing score
				passingScore++;
				
				// make reset button appear
				if(passingScore === 4){
					reset.classList.add('active');
				}
			}else{
				text.innerHTML = --lifeCount;	
				body.classList.add('wrong');	
				body.classList.remove('correct');	
				if(lifeCount === 0){
					alert('you lose');

					// to reset life
					lifeCount = 5;
					text.innerHTML = lifeCount;	

					// to reset score
					passingScore = 0;

					// to reset round
					roundScore = 1;
					round.innerHTML = 'Round: ' + roundScore;

					// remove style from body
					body.classList.remove('wrong');
					body.classList.remove('correct');

					// remove class and disable on buttons
					for(i = 0; i < btns.length; i++){
						btns[i].classList.remove('active');
						btns[i].disabled = false;	
					}
				}
			}
		});
	});
}

function resetBtn(){

	reset.addEventListener('click', ()=>{
		// shuffle the combinations
		shuffle(numArray);

		// make reset button disappear
		reset.classList.remove('active');

		// reset passing score
		passingScore = 0;

		// add bonus life
		lifeCount += lifeBonus;
		text.innerHTML = lifeCount;

		// add plus life animation
		plusText.classList.add('active');

		// remove life text if animation ended 
		plusText.addEventListener('animationend', () => {
			plusText.classList.remove('active');
		});

		// increment round
		roundScore++;
		round.innerHTML = 'Round: ' + roundScore;

		// remove style from body
		body.classList.remove('wrong');
		body.classList.remove('correct');

		// remove disabled button and reset the index count
		btns.forEach(btn =>{
			btn.classList.remove('active');
			indexCount = 0;
			btn.disabled = false;
		});
	});
}


// this code below is from stackoverflow

function shuffle(array) {

  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}

clickBtn();
resetBtn();
