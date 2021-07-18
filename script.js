const employmentList = document.querySelector('#employment-list')
const form = document.querySelector('#add-employment-form')

function renderemployment(doc) {

    let li = document.createElement('li')
    let name = document.createElement('span')
    let dep = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    dep.textContent = doc.data().dep
    cross.textContent = 'x'

    li.appendChild(name)
    li.appendChild(dep)
    li.appendChild(cross)

    employmentList.appendChild(li)



    // Deleting Data
    cross.addEventListener('click', (e) => {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('employment').doc(id).delete()
    })
}


// Getting Data
// db.collection('employment').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderemployment(doc)
//     });
// })

// Saving Data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('employment').add({
        name: form.name.value,
        dep: form.dep.value
    });
    form.name.value = ''
    form.dep.value = ''
})

// Real Time Listener
db.collection('employment').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderemployment(change.doc)
        } else if (change.type == 'removed') {
            let li = employmentList.querySelector('[data-id=' + change.doc.id + ']')
            employmentList.removeChild(li)
        }

    })
})