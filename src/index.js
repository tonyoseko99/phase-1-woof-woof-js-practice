document.addEventListener('DOMContentLoaded', ()=>{
    const dogBar = document.getElementById('dog-bar')
    const filterBtn = document.getElementById('good-dog-filter')
    const dogInfo = document.getElementById('dog-info')

    fetch('http://localhost:3000/pups')
    .then(resp=> resp.json())
    .then(data => {
        data.forEach((data)=>{
            updatedogBar(data)
        })
    })

    function updatedogBar(dog){
        let span = document.createElement('span')
        span.innerText = dog.name
        dogBar.appendChild(span)
        span.addEventListener('click', ()=>{
            pupInfo(dog)
        })
    }

    function pupInfo(dog){
        let info =`
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button>${dog.isGoodDog? 'Good dog': 'Bad dog'}!</button>
        `
        dogInfo.innerHTML = info
        let btn = dogInfo.querySelector('button')
        btn.addEventListener('click', ()=>{
            if(dog.isGoodDog){
                dog.isGoodDog = false
                btn.innerText = 'Bad dog'
            }else{
                dog.isGoodDog = true
                btn.innerText = 'Good dog'
            }
            updateStatus(dog)
        })
    }
    function updateStatus(dog){
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dog)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }
    filterBtn.addEventListener('click', ()=>{
        if (filterBtn.innerText.includes("OFF")){
            dogBar.innerHTML=''
            filterBtn.innerText = "Filter good dogs: ON"
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(data => {
                data.forEach(element => {
                    if(element.isGoodDog)
                    updatedogBar(element)
                });
            })
        } else {
            dogBar.innerHTML=''
            filterBtn.innerText = "Filter good dogs: OFF"
            fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(data => {
                data.forEach(element => {
                    updatedogBar(element)
                });
            })
        }
    })
    
})