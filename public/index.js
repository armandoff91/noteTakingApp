console.log("frontend script loaded")

document.querySelectorAll(".del").forEach((button) => {
    button.addEventListener("click", (event) => {
        console.log(`delete ${event.target.getAttribute("index")} clicked`)
        // DELETE, as well as GET requests should not have a payload (entity body),
        // so cannot carry formData
        fetch(`/notes/${event.target.getAttribute("index")}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                location.reload()
            }
        })
    })
})

document.querySelectorAll(".add").forEach((button) => {
    button.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(`add triggered`)
        let newEntry = event.target.querySelector('input[name="newEntry"]').value
        if (newEntry.length == 0) {
            return
        }
        var data = JSON.stringify({newEntry: newEntry})
        console.log(data)
        fetch(`/notes`,
        {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then((response) => {
            if (response.status === 200) {
                location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    })
})

document.querySelectorAll(".put").forEach((button) => {
    button.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(`put triggered`)
        let putEntry = event.target.querySelector('input[name="putEntry"]').value
        let index = event.target.querySelector('input[name="putEntry"]').getAttribute("index")
        if (putEntry == event.target.querySelector('input[name="putEntry"]').placeholder) {
            return
        }
        var data = JSON.stringify({
            putEntry: putEntry,
            index: index
        })
        console.log(data)
        fetch(`/notes/${index}`,
        {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then((response) => {
            if (response.status === 200) {
                location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    })
})