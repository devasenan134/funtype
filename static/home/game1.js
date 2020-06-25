
document.addEventListener('DOMContentLoaded', () => {


    function quote_api() {
        return fetch('http://api.quotable.io/random')
            .then(response => response.json())
            .then(data => data)
    }


    async function renderQuote() {

        data = await quote_api()

        const quote = data.content
        console.log(quote, data.author)
        text.innerHTML = ''
        const len = quote.length
        text_input.maxLength = len
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.className = 'characterSpan'
            characterSpan.innerHTML = character
            text.appendChild(characterSpan)
        })
        text_input.value = null;
    }


    function progressBar(index, len) {
        percent = ((index + 1) / len) * 100
        round_percent = Math.round(percent)
        progress.innerHTML = round_percent + '%'
        progress.style.width = percent + '%'
    }


    function addsAuthor() {
        author = data.author
        info_alert.className = 'alert alert-success'
        info_alert.innerHTML = `You just typed a quote of ${author}!`
    }


    function cal_accuracy() {

        // For accuracy
        if (event.keyCode === 8 || event.keyCode === 46) {
            b_count++
            console.log("Backspace or del pressed")
        }
    }



    function results() {

        if (last_time !== 0) {
            total_time.innerHTML = `Total time: ${time}s`
        } else {
            total_time.innerHTML = `Total time: ${time}s`
        }

        //Calculation for accuracy
        const arrayQuote = text.querySelectorAll('span')
        const len = arrayQuote.length
        accuracy_val = ((len - b_count) / len) * 100
        accuracy_val = accuracy_val.toFixed(1)

        if (last_accuracy !== 0) {
            accuracy.innerHTML = `Accuracy: ${accuracy_val}%`
        } else {
            accuracy.innerHTML = `Accuracy: ${accuracy_val}%`
        }


        //Calculation for wpm
        wpm_val = (len / 5) / (time / 60)
        wpm_val = wpm_val.toFixed(0)
        if (h_wpm < wpm_val) {
            h_wpm = wpm_val
            localStorage.setItem('h_wpm', h_wpm)
            hwpm.innerHTML = `Highest WPM: ${h_wpm}`
        }
        if (last_wpm !== 0) {
            wpm.innerHTML = `WPM: ${wpm_val}`
        } else {
            wpm.innerHTML = `WPM: ${wpm_val}`
        }
    }



    function spellCheck() {

        correct = true
        const arrayQuote = text.querySelectorAll('span')
        const len = arrayQuote.length
        const arrayValue = text_input.value.split('')


        info_alert.innerHTML = null
        info_alert.className = null

        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if (character == null) {
                characterSpan.style.color = 'black'
                correct = false
            }
            else if (character === characterSpan.innerHTML) {
                characterSpan.style.color = 'springgreen'
                progressBar(index, len)
            } else {
                characterSpan.style.color = 'red'
                correct = false
            }
        })

        // Changes every values
        if (correct) {

            watch = false
            results()
            next_btn = true

            try_again.className = 'btn btn-info'


            const arrayQuote = text.querySelectorAll('span')
            const len = arrayQuote.length
            arrayQuote.forEach((characterSpan, index) => {
                characterSpan.style.color = 'black'
            })

            text_input.value = null
            text_input.disabled = true
            text_input.focus = false

            addsAuthor()
        }
    }



    function resetValues() {

        time = -5
        last_time = 0
        total_time.innerHTML = 'Total time: 0s'

        wpm_val = 0
        last_wpm = 0
        wpm.innerHTML = 'WPM: 0'

        percent = 0
        progress.innerHTML = percent
        progress.style.width = percent + '%'

        accuracy_val = 0
        accuracy_val = accuracy_val.toFixed(1)
        last_accuracy = 0.0
        accuracy.innerHTML = `Accuracy: ${accuracy_val}%`
    }


    function lasttry(){

        l_try1 = true
        
        h5 = document.createElement('h5')
        temp1.appendChild(h5)
        h5.innerHTML = 'Last Try'
        
        th6 = document.createElement('h6')
        th6.style.fontSize = '15px'
        temp1.appendChild(th6)

        wh6 = document.createElement('h6')
        wh6.style.fontSize = '15px'
        temp2.appendChild(wh6)

        ah6 = document.createElement('h6')
        ah6.style.fontSize = '15px'
        temp2.appendChild(ah6)
        
    }


    function lastValues() {

        if(time >= 0){
            last_time = time
        } else {
            last_time = 0
        }
        
        th6.innerHTML = `Total time: ${last_time}s`
        total_time.innerHTML = `Total time: 0s`
        time = -5

        last_wpm = wpm_val
        wh6.innerHTML = `WPM: ${last_wpm}`
        wpm.innerHTML = `WPM: 0`

        progress.innerHTML = '0%'
        progress.style.width = '0%'

        last_accuracy = accuracy_val
        ah6.innerHTML = `Accuracy: ${last_accuracy}%`
        accuracy.innerHTML = `Accuracy: 0.0%`

    }


    function startTimer() {

        if(watch === true){
            time++
            timer.innerHTML = `Time: ${time}s`
            if(time === 0){
                text_input.disabled = false
            }
            try_again.className = 'btn btn-info'
        }

        /*if (text_input.disabled === false) {
                time++
                timer.innerHTML = `Time: ${time}s`
                try_again.className = 'btn btn-info'
        }*/
        else {
            timer.innerHTML = 'Time: 0s'
        }
    }


    function stopTimer() {
        document.querySelector('#time').innerHTML = `Time: ${time}s`
    }








    let data = '';
    let time = 0
    let correct 
    let l_try1 = false
    let l_try2 = false
    let next_btn = false
    let watch = false

    const text = document.querySelector('#text');
    const text_input = document.querySelector('#text_input');

    const try_again = document.querySelector('#try_again');
    const next = document.querySelector('#next');

    const accuracy = document.querySelector('#accuracy');
    const progress = document.querySelector('#progress');
    const total_time = document.querySelector('#total_time');
    const wpm = document.querySelector('#wpm');
    const hwpm = document.querySelector('#h_wpm');
    const temp1 = document.querySelector('#temp1');
    const temp2 = document.querySelector('#temp2');

    const info_alert = document.querySelector('#alert');
    const timer = document.querySelector('#time');

    if (!localStorage.getItem('h_wpm')) {
        localStorage.setItem('h_wpm', 0)
    }


    let b_count = 0;
    let wpm_val = 0;
    let accuracy_val = 0;
    let h_wpm = localStorage.getItem('h_wpm');
    let percent = 0;

    let last_accuracy = 0;
    let last_time = 0;
    let last_wpm = 0;

    function main() {

        text_input.disabled = false
        try_again.className = 'btn btn-info disabled'

        info_alert.className = 'alert alert-primary'
        info_alert.innerHTML = 'Click below to start the game!'

        renderQuote();

        hwpm.innerHTML = `Highest WPM: ${h_wpm}`


        // Event for starttimer
        text_input.addEventListener('focus', () => {
            if(time === 0){
                watch = true
                setInterval(startTimer, 1000)
            }
        })
        
        
        text_input.addEventListener('keydown', cal_accuracy)

        // Main input eventlistener
        text_input.addEventListener('input', spellCheck)

        // Event for next button
        next.onclick = () => {

            temp1.style.display = 'none'
            temp2.style.display = 'none'

            text_input.disabled =true

            resetValues()

            l_try2 = true

            text_input.value = null

            if(next_btn === true){
                info_alert.className = 'alert alert-danger'
                info_alert.innerHTML = `Click on the textarea when time is 0. And get ready!!`
            }


            if(text_input.disabled === true){
                setInterval(console.log('count'), 1000)
                //text_input.disabled = false
                watch = true
                }  
            renderQuote()
        }


        // Event for try again button
        try_again.onclick = () => {

            if(l_try1 === false){
                lasttry()
            }
        
            if (l_try2 === true) {
                temp1.style.display = 'block'
                temp2.style.display = 'block'
            }

            text_input.disabled = true

            lastValues()

            info_alert.className = 'alert alert-danger'
            info_alert.innerHTML = `Click on the textarea when time is 0. And get ready!!`
            

            const arrayQuote = text.querySelectorAll('span')
            arrayQuote.forEach((characterSpan, index) => {
                characterSpan.style.color = 'black'
            })

            text_input.value = null

            if (text_input.disabled === true) {
                setInterval(console.log('count'), 1000)
                //text_input.disabled = false
                watch = true
            }  
            //text_input.disabled = false
            text_input.focus = false    
        }
    }

    main();
})

