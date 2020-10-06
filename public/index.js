console.log("frontend script loaded")

document.querySelectorAll(".del").forEach((button) => {
    button.addEventListener("click", (event) => {
        console.log(`modify ${event.target.getAttribute("index")} clicked`)
        // DELETE, as well as GET requests should not have a payload (entity body). 
        // let formData = new FormData();
        // formData.append("noteIndex", event.target.getAttribute("index"))
        // console.log(formData.get("noteIndex"))
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