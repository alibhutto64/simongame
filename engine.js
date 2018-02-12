$(function () {
	let input, rand, index, clickAllow;
	let strict = false;
  let wrong = document.createElement('audio');
  wrong.src = 'http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1';
	$('#start').click(function(){
		$('#game_name h1').text("SIMON");
		input = [];
		index = 0;
		clickAllow = false;
		nextTurn();
	});

	$('.btn').click(function(){
		let clickedBtn = $('span', this).text();
		if (clickAllow) {
      if (clickedBtn == input[index]) $('audio',this).get(0).play();
			$(this).addClass("animate").one("animationend", function(){
    			$(this).removeClass( "animate" );
    		})
			if(clickedBtn != input[index] && strict == true) {
        wrong.play();
				$('#screen p').text("- -");
				input = [];
				index = 0;
				$('#game_name h1').text("Try Again");
				clickAllow = false;
			}
			else if (clickedBtn != input[index] && strict == false){
        wrong.play();
				index = 0;
				clickAllow = false;
				setTimeout(()=>{
					gameAi(0);
					clickAllow = true;
				}, 1500);

			}
    		else if (index == input.length - 1 && clickedBtn == input[index]) {
				index = 0;
				clickAllow = false;
				if (input.length == 20){
					$('#game_name h1').text("You Won");
					input = [];
					$('#screen p').text("- -");
				}
				else setTimeout(()=>{nextTurn()}, 1500);
			}
			else index++;
		}
	});
	$('#strict').click(function(){
		$(this).toggleClass('green');
		strict = strict == false ? true : false;
	});
	function nextTurn() {
		if (input.length == 0) rand = Math.floor((Math.random() * 4) + 1).toString();
		else {
			do {
				rand = Math.floor((Math.random() * 4) + 1).toString();
			} while(input[input.length - 1] == rand);
		}
		input.push(rand);
		$('#screen p').text(input.length);
		setTimeout(function(){gameAi(0)}, 1500);
		
	};
	function gameAi(i){
		$(`#btn${input[i]} audio`).get(0).play();
		$(`#btn${input[i]}`).addClass("animate").one("animationend", function(){
    		$(`#btn${input[i]}`).removeClass( "animate" );
    		if(i == input.length - 1){
    			clickAllow = true;
    			return;
    		}
    		i++;
    		gameAi(i);
		});
	}
});