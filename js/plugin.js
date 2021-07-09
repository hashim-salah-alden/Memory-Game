/* remove start screen */

    let startButton = document.querySelector('.start-screen span');



    startButton.onclick = () => {

        let yourName = prompt('Enter Your Name');

            if (yourName == null || ''){

                document.querySelector('.name span').innerHTML = 'UnKnown';

            }else{

                document.querySelector('.name span').innerHTML = yourName;

            }

        document.querySelector('.start-screen').remove();


    }



/* the main vars */
    let    duration = 1000 ;

    let    blocksContainer = document.querySelector('.game-blocks');

    let    wrongTries  = document.querySelector('.tries span');

    let    blocks =  Array.from(blocksContainer.children);

    let    orderRange = [...Array(blocks.length).keys()];

    let    neworderRange = [];

    let    time    = 90;

    let    timerDiv = document.querySelector('.timer');



   //shuffle(orderRange);
   shuffle(orderRange);



    blocks.forEach ((block , index) => {

    // add the random order to blocks
        block.style.order = neworderRange[index]

    // add the filpped class to clicked block
        block.addEventListener('click',function () {

            filpped(block);

        });

    });

    // create filpped function
        function filpped(selctedBlock) {

            // add the filpped class
                selctedBlock.classList.add('is-filipped');

            // collect all fipped blocks
                let allFilppedBlocks = blocks.filter(block => block.classList.contains('is-filipped'));

                if(allFilppedBlocks.length === 2){

            // trigger the stop clicking function
                stopclicking();

            // trigger the has matched function
                hasMatced(allFilppedBlocks[0], allFilppedBlocks[1]);

                finshed()


                };

    };

    // create finshing function
        function finshed(){

            let allMatchedBlocks = blocks.filter(block => block.classList.contains('has-matched'));

            if(allMatchedBlocks.length === blocks.length){


                console.log('Good');

                clearInterval(timer);

            }
        }


    // create stop clicking function
        function stopclicking () {
            blocksContainer.classList.add('no-clicking');


            setTimeout(() => {

                // Remove Class No Clicking After The Duration
                blocksContainer.classList.remove('no-clicking');

              }, duration);

        };

    // create has matched function
        function hasMatced(firstBlock , secondBlock){
            if(firstBlock.dataset.technology == secondBlock.dataset.technology){

                firstBlock.classList.remove('is-filipped');
                secondBlock.classList.remove('is-filipped');

                firstBlock.classList.add('has-matched');
                secondBlock.classList.add('has-matched');

            }else{

                setTimeout(() => {

                    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1 ;

                    firstBlock.classList.remove('is-filipped');
                    secondBlock.classList.remove('is-filipped');


                },duration)
            }
        };

// another way to shuffling the Array
  function shuffle (array) {

    let randomArray = new Set();

    let current = array.length;

    while(randomArray.size < array.length){

    let  random = Math.floor(Math.random()  * current);

        randomArray.add(random);

         neworderRange = [...randomArray];

    }

      return array;
  }



    // create shuffle function
    /*    function shuffle (Array) {

            let current = Array.length ;

            let temp ,

            random;

            while( current > 0) {

                random = Math.floor(Math.random() * current) ;

                temp = Array[current] ;

                Array[current] = Array[random] ;

                Array[random] = temp ;

                current -- ;
            }

            return Array;
        };
   */

//create  the timer function
        function timePass() {

            let    minuts = Math.floor(time / 60)  ;

            let    seconds = time % 60 ;

            timerDiv.innerHTML = `${minuts} : ${seconds}` ;

            if(time > 0){

                time -- ;

            }if(seconds < 10 ){

                timerDiv.innerHTML = `${minuts} : 0 ${seconds}` ;

            }if(seconds == 0 && minuts == 0){

                clearInterval(timer);

                timerDiv.innerHTML = " 0 " ;

            }
        };

// call the timer function by setinterval evry 1 sec
        var timer = setInterval(function(){

            timePass();

        },1000);
