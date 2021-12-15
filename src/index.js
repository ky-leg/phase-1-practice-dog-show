document.addEventListener('DOMContentLoaded', () => {
    const dogURL = 'http://localhost:3000/dogs'
    fetchDogs();
    submission();

async   function fetchDogs(){
         await fetch(dogURL)
        .then((resp) => resp.json())
        .then((arr) => addDogsToDOM(arr))
    }

    function addDogsToDOM(arr){
        const tbody = document.getElementById('table-body')
        for (const key in arr){
            const id = arr[key].id
            const name = arr[key].name
            const breed = arr[key].breed
            const sex = arr[key].sex
            
            const tr = document.createElement('tr')
            tr.id = id
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            const btn = document.createElement('button')
            btn.id = id
            td1.innerText = name
            td2.innerText = breed
            td3.innerText = sex
            btn.innerText = 'Edit Dog'
            btn.setAttribute('class', `${id}`)
            btn.addEventListener('click', e => addDetailsToEditor(e))
            td4.append(btn)

            tr.append(td1, td2, td3, td4)
            tbody.appendChild(tr)
        }
    }

    function addDetailsToEditor(e){
        const className = e.target.className
        const info = document.getElementById(`${className}`).querySelectorAll("*")
        const name = info[0].innerText
        const breed = info[1].innerText
        const sex = info[2].innerText
        const form = document.getElementById('dog-form')

        form[0].value = name
        form[0].id = e.target.id
        form[1].value = breed
        form[2].value = sex
     
    }

    function submission(){
        
        const submit = document.getElementById('dog-form')
        submit.addEventListener('submit', e => {
            e.preventDefault();
            const form = document.getElementById('dog-form')
            const id = form[0].id
            const name = form[0].value
            const breed = form[1].value
            const sex = form[2].value

            const tr = document.getElementById(id)
            tr.innerText = ""
            
            patch(id, name, breed, sex);
            const tbody = document.getElementById('table-body')
            tbody.innerText = "" 
            fetchDogs();
        })
    }

function patch(id, name, breed, sex){
        const url = `${dogURL}/${id}`
        
fetch(`${url}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            body: JSON.stringify({
                "name": `${name}`,
                "breed": `${breed}`,
                "sex": `${sex}` 
            })
        })
    }

})