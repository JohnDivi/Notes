notesCount = 0;

// Load images
images = setupImages();

function setupListeners() {
    let restartButton = document.querySelector("#restart-button");
    let addNoteButton = document.querySelector("#add-note-button");
    let notesContainer = document.querySelector("#notes-container");

    restartButton.addEventListener("click", () => {
        Array.from(notesContainer.children).forEach((node) => {
            node.remove();
        });

        notesCount = 0;
    });

    addNoteButton.addEventListener("click", () => {
        notesCount++;
        notesContainer.appendChild(setupNote());
    });

}

function setupNote() {

    // Create div elements
    let note = document.createElement("div");
    let noteData = document.createElement("div");
    let noteOptions = document.createElement("div");
    let noteTitle = document.createElement("div");
    let noteDescription = document.createElement("div");
    let noteCreated = document.createElement("div");
    
    // Give classes to elements
    note.className = "note";
    noteData.className = "note-data";
    noteOptions.className = "note-options";
    noteTitle.className = "note-title";
    noteDescription.className = "note-description";
    noteCreated.className = "note-created";

    // Setup element children
    note.appendChild(noteData);
    note.appendChild(noteOptions);

    noteData.appendChild(noteTitle);
    noteData.appendChild(noteDescription);
    noteData.appendChild(noteCreated);

    noteOptions.appendChild(images.expandIcon.cloneNode());
    noteOptions.appendChild(images.shrinkIcon.cloneNode());
    noteOptions.appendChild(images.editIcon.cloneNode());
    noteOptions.appendChild(images.doneIcon.cloneNode());
    noteOptions.appendChild(images.deleteIcon.cloneNode());

    // Get date
    let today = new Date();
    let createdOn = `${String(today.getMonth() + 1).padStart(2, 0)}/
    ${String(today.getDate()).padStart(2, 0)}/${(today.getFullYear())}, 
    ${String(today.getHours()).padStart(2, 0)}:${String(today.getMinutes()).padStart(2, 0)}`;

    // Setup innerHTML
    noteTitle.innerHTML = `Note ${String(notesCount)}`;

    // Hidden note holder
    let noteDescHolder = document.createElement("div");
    noteDescHolder.className = "note-desc-holder";
    noteDescHolder.setAttribute("hidden", "true");
    noteDescHolder.innerHTML = `Note ${String(notesCount)} Description`;
    noteData.appendChild(noteDescHolder);
    
    // Note description
    noteDescription.innerHTML = noteDescHolder.innerHTML;
    
    noteCreated.innerHTML = `Created on ${createdOn}`;
    noteCreated.setAttribute("hidden", "true");

    // Setup expand and shrink buttons
    setupOptions(note);

    return note;
}

function setupImages() {
    imageMap = {
        expandIcon: document.createElement("img"),
        shrinkIcon: document.createElement("img"),
        editIcon: document.createElement("img"),
        doneIcon: document.createElement("img"),
        deleteIcon: document.createElement("img")
    };

    imageMap.expandIcon.className = "expand-button";
    imageMap.shrinkIcon.className = "shrink-button";
    imageMap.editIcon.className = "edit-button";
    imageMap.doneIcon.className = "done-button"
    imageMap.deleteIcon.className = "delete-button";

    imageMap.expandIcon.src = "images/down_icon.png";
    imageMap.shrinkIcon.src = "images/up_icon.png";
    imageMap.editIcon.src = "images/edit_icon.png";
    imageMap.doneIcon.src = "images/done_icon.png"
    imageMap.deleteIcon.src = "images/trash_icon.png";

    imageMap.expandIcon.width = 48;
    imageMap.shrinkIcon.width = 48;
    imageMap.editIcon.width = 48;
    imageMap.doneIcon.width = 48;
    imageMap.deleteIcon.width = 48;

    imageMap.expandIcon.height = 48;
    imageMap.shrinkIcon.height = 48;
    imageMap.editIcon.height = 48;
    imageMap.doneIcon.height = 48;
    imageMap.deleteIcon.height = 48;

    imageMap.shrinkIcon.setAttribute("hidden", "true");
    imageMap.doneIcon.setAttribute("hidden", "true");

    return imageMap;
}

function setupOptions(element) {
    let expandButton = element.querySelector(".expand-button");
    let shrinkButton = element.querySelector(".shrink-button");
    let editButton = element.querySelector(".edit-button");
    let doneButton = element.querySelector(".done-button");
    let deleteButton = element.querySelector(".delete-button");

    let noteCreated = element.querySelector(".note-created");

    expandButton.addEventListener("click", () => {
        expandButton.setAttribute("hidden", "true");
        shrinkButton.removeAttribute("hidden");
        
        let noteDescription = element.querySelector(".note-desc-holder").innerHTML;
        let notes = element.querySelector(".note-description");
        notes.innerHTML = noteDescription;

        noteCreated.removeAttribute("hidden");
    });

    shrinkButton.addEventListener("click", () => {
        shrinkButton.setAttribute("hidden", "true");
        expandButton.removeAttribute("hidden");

        let noteDescription = element.querySelector(".note-desc-holder").innerHTML;
        let notes = element.querySelector(".note-description");
        notes.innerHTML = fixDescription(noteDescription);

        noteCreated.setAttribute("hidden", "true");
    });

    editButton.addEventListener("click", () => {
        let title = element.querySelector(".note-title");
        let description = element.querySelector(".note-description");

        // Hold title and description innerHTML
        let titleText = title.innerHTML;
        let descriptionText = element.querySelector(".note-desc-holder").innerHTML;

        // Clear innerHTML of title and description, replace with the inputs
        title.innerHTML = "";
        description.innerHTML = "";

        // Change title to input
        let titleForm = document.createElement("form");
        let titleInput = document.createElement("input");
        titleInput.setAttribute("onkeypress", "return event.keyCode != 13");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("name", "title");
        titleInput.setAttribute("value", titleText);
        titleForm.appendChild(titleInput);

        // Change description to input
        let descriptionForm = document.createElement("form");
        let descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("onkeypress", "return event.keyCode != 13");
        descriptionInput.setAttribute("type", "text");
        descriptionInput.setAttribute("name", "description");
        descriptionInput.setAttribute("value", descriptionText);
        descriptionForm.appendChild(descriptionInput);

        title.appendChild(titleForm);
        description.appendChild(descriptionForm);

        // Hide edit button and show done button
        editButton.setAttribute("hidden", "true");
        doneButton.removeAttribute("hidden");
    });

    doneButton.addEventListener("click", () => {
        let title = element.querySelector(".note-title");
        let description = element.querySelector(".note-description");
        let descHolder = element.querySelector(".note-desc-holder");

        title.innerHTML = title.querySelector("input[name='title']").value;
        descHolder.innerHTML = description.querySelector("input[name='description']").value;
        description.innerHTML = fixDescription(descHolder.innerHTML);

        doneButton.setAttribute("hidden", "true");
        editButton.removeAttribute("hidden");
    });

    deleteButton.addEventListener("click", () => {
        notesCount--;
        element.remove();
    });

}

function fixDescription(description) {
    return description.length > 64 ?
    `${description.slice(0, 64)}...` :
    `${description}`;
}

setupListeners();
