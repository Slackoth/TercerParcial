const editBtn = document.getElementById('editBtn');
const closeBtn = document.getElementById('closeBtn');
const deleteBtn = document.getElementsByClassName('delete');
(function loadUser(){
    refresh();
})();
//Loading data to the modal
$('#editModal').on('show.bs.modal', async e=>{
    const username = e.relatedTarget.innerText;
    const user = document.getElementById('username');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('userEmail');
    
    await fetch(`http://localhost:3000/viewUser/show/${username}`)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
            user.innerText = data.username;
            first_name.value = data.first_name;
            last_name.value = data.last_name;
            email.value = data.email;
    })
})
//Editing the user
editBtn.addEventListener('click',async event=>{
    event.preventDefault();
    const user = document.getElementById('username').innerText;
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('userEmail');
    const pass = document.getElementById('pass');

    await fetch(`http://localhost:3000/viewUser/edit/${user}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: pass.value
        })
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        first_name.value = data.first_name;
        last_name.value = data.last_name;
        email.value = data.email;
        pass.value = '';
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
        const username = item.id;
        item.addEventListener('click', async event=>{
            event.preventDefault();
            await fetch(`http://localhost:3000/viewUser/delete/${username}`,{
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
    fetch(`http://localhost:3000/viewUser/fill`)
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
                <a href='#' class='a-modal' data-toggle='modal' data-target='#editModal'>${object.username}</a>
            </th>
            <td class='align-middle'>${object.first_name}</td>
            <td class='align-middle'>${object.last_name}</td>
            <td class='align-middle'>${object.email}</td>
            <td class='align-middle'>
                <a href='#' class='btn btn-danger delete' id=${object.username}>Delete</a>
            </td>`;
            table_body.appendChild(new_row);
        })
        addDeleteEvent();
    })
}