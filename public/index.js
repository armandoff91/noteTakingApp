console.log("frontend script loaded")

var notesTemplate = Handlebars.compile(
    `
        <div class="accordion col" id="noteGroup">
            {{#each data as |value key|}}
            <div class="card">
                <div class="card-header" id="heading{{key}}">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse{{ key }}" aria-expanded="false" aria-controls="collapse{{key}}">
                            {{value}}
                        </button>
                        <button type="button" index="{{key}}"class="del btn btn-warning float-right">Delete</button>
                    </h5>
                </div>
                <div id="collapse{{key}}" class="collapse" aria-labelledby="heading{{key}}" data-parent="#noteGroup">
                    <form class="put">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-lg">Change here</span>
                            </div>
                            <textarea type="text" class="form-control" index="{{key}}" name="putEntry" aria-label="With textarea" aria-describedby="" placeholder="{{value}}">{{value}}</textarea>
                            <input type="submit">
                        </div>
                    </form>
                </div>
            </div>
            {{/each }}
        </div>
    `
);

const observer = new MutationObserver(() => {
    console.log("dom changed")
});

observer.observe(document, {attributes: false, childList: true, subtree: false})
  
const reloadNotes = (notes) => {
    console.log("RELOADING");
    console.log(notes);
    document.querySelector("#noteContainer").innerHTML = notesTemplate({ data: notes })
    // the delete and put events are removed along with the elements when the note container gets re-rendered, hence the function below is called to add them back again
    // bad practice?
    addDeleteEvents()
    addPutEvents()
};

const addDeleteEvents = () => {
    document.querySelectorAll(".del").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault()
            console.log(`delete ${event.target.getAttribute("index")} clicked`)
            // DELETE, as well as GET requests should not have a payload (entity body),
            // so cannot carry formData
            fetch(`/notes/${event.target.getAttribute("index")}`, {
                method: 'DELETE',
            })
            .then((response) => {
                return response.json()
            })
            .then(parsedJSON => {
                reloadNotes(parsedJSON.data)
            })
            .catch((err) => {
                console.error(err)
            })
        })
    })
}

document.querySelectorAll(".add").forEach((button) => {
    button.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(`add triggered`)
        let newEntry = event.target.querySelector('textarea[name="newEntry"]').value
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
            return response.json()
        })
        .then(parsedJSON => {
            reloadNotes(parsedJSON.data)
            event.target.querySelector('textarea[name="newEntry"]').value = ""
        })
        .catch((err) => {
            console.log(err)
        })
    })
})

const addPutEvents = () => {
    document.querySelectorAll(".put").forEach((button) => {
        button.addEventListener("submit", (event) => {
            event.preventDefault()
            console.log(`put triggered`)
            let putEntry = event.target.querySelector('textarea[name="putEntry"]').value
            let index = event.target.querySelector('textarea[name="putEntry"]').getAttribute("index")
            if (putEntry == event.target.querySelector('textarea[name="putEntry"]').placeholder) {
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
                return response.json()
            })
            .then(parsedJSON => {
                console.log(parsedJSON.data)
                reloadNotes(parsedJSON.data)
            })
            .catch((err) => {
                console.log(err)
            })
        })
    })
}

addDeleteEvents()
addPutEvents()