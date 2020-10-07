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


        // let formData = new FormData();
        // formData.append("noteIndex", event.target.getAttribute("index"))
        // console.log(formData.get("noteIndex"))
    
document.querySelectorAll(".add").forEach((button) => {
    button.addEventListener("submit", (event) => {
        console.log(`add clicked`)
        let newEntry = document.querySelector('input[name="newEntry"]').value
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