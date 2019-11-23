const editBtn = document.getElementById('editBtn');
const closeBtn = document.getElementById('closeBtn');
const deleteBtn = document.getElementsByClassName('delete');

(function loadUser(){
    refresh();
})();
// //Loading data to the modal
$('#editModal').on('show.bs.modal', async e=>{
    const nameT = e.relatedTarget.innerText;
    const name = document.getElementById('t_name');
    const country = document.getElementById('t_country');
    const director = document.getElementById('t_director');
    const captain = document.getElementById('t_captain');
    const league = document.getElementById('t_league');
    
    await fetch(`http://localhost:3000/viewSoccer/show/${nameT}`)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
            name.innerText = data.name;
            country.value = data.country;
            director.value = data.director;
            captain.value = data.captain;
            league.value = data.league;
    })
})
// //Editing the user
editBtn.addEventListener('click',async event=>{
    event.preventDefault();
    const name = document.getElementById('t_name').innerText;
    const country = document.getElementById('t_country');
    const director = document.getElementById('t_director');
    const captain = document.getElementById('t_captain');
    const league = document.getElementById('t_league');
    

    await fetch(`http://localhost:3000/viewSoccer/edit/${name}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            country: country.value,
            director: director.value,
            captain: captain.value,
            league: league.value
        })
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        country.value = data.country;
        director.value = data.director;
        captain.value = data.captain;
        league.value = data.league;
    })
});
//Close refresh
closeBtn.addEventListener('click', async event=>{
    event.preventDefault();
    refresh();
})
//Delete event in each button
function addDeleteEvent() {
    for(let item of deleteBtn) {
        const name = item.id;
        item.addEventListener('click', async event=>{
            event.preventDefault();
            console.log(name);
            
            await fetch(`http://localhost:3000/viewSoccer/delete/${name}`,{
                method: 'DELETE',
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            })
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                refresh();
            })
            .catch(err=>{
                console.log(err);
            });
        })
    }
}
//Loads all users
function refresh() {
    fetch(`http://localhost:3000/viewSoccer/fill`,{
        mode: 'no-cors'
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        let table_body = document.getElementById('table_body');
        table_body.innerHTML='';

        data.map((object,index)=>{
            let new_row = document.createElement('tr');
            
            new_row.innerHTML =  
            `<th scope = 'row' class='align-middle'>
                <a href='#' class='a-modal' data-toggle='modal' data-target='#editModal'>${object.name}</a>
            </th>
            <td class='align-middle'>${object.country}</td>
            <td class='align-middle'>${object.director}</td>
            <td class='align-middle'>${object.captain}</td>
            <td class='align-middle'>${object.league}</td>
            <td class='align-middle'>
                <a href='#' class='btn btn-danger delete' id=${object.name}>Delete</a>
            </td>`;
            table_body.appendChild(new_row);
        })
        addDeleteEvent();
    })
}