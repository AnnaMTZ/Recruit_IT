let apiobj = {
    "description": "A pretty good developer",
    "hobbies": "Eating shoe strings",
    "references": "A reference string"
}

let apiPerson = {
    "firstName": "Hans",
    "lastName": "Pannekoek",
    "age": 34,
    "address": {
        "street": "Coolstreet",
        "zipCode": "1236BB",
        "houseNumber": "999",
        "city": "Amsterdam",
        "country": "Netherlands"
    },
    "dateOfBirth": "19-02-1993",
    "phoneNumber": "068596358",
    "email": "hanspannekoek@capgemini.com",
    "driversLicense": false,
    "driversLicenseExtra": "nothing"
}

const candidateID = window.location.hash.replace("#", '');
statusText = document.getElementById("statusText");


let form = {
    firstName: document.getElementById("candidate-first-name"),
    lastName: document.getElementById("candidate-last-name"),
    profession: document.getElementById("candidate-profession"),
    city: document.getElementById("located"),

    saveButton: document.getElementById("saveCandidateButton")
}

let updatedCV = {
    "description": "Front End Developer",
    "hobbies": "A hobby string",
    "references": "A reference string"
}

let newData = {
    "firstName": "Jan",
    "lastName": "de Groot",
    "age": 34,
    "address": {
        "street": "Coolstreet",
        "zipCode": "1236BB",
        "houseNumber": "999",
        "city": "Amsterdam",
        "country": "Netherlands"
    },
    "dateOfBirth": "19-02-1993",
    "phoneNumber": "068596358",
    "email": "hanspannekoek@capgemini.com",
    "driversLicense": false,
    "driversLicenseExtra": "nothing"
}

let candidate;

form.saveButton.addEventListener('click', (e)=>{
    e.preventDefault();

    updateCandidate();
    updateCV();

    fetch(`https://cv-backend.ikbendirk.nl/cv/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(updatedCV),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


    fetch(`https://cv-backend.ikbendirk.nl/cv/${candidateID}/person`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(newData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        if(data.success === true){
            statusText.classList.add("success");
            statusText.classList.remove("no-success");
            statusText.innerHTML = "Changes have been saved!"
        }

        if(data.success === false){
            statusText.classList.add("no-success");
            statusText.classList.remove("success");
            statusText.innerHTML = data.error
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})

const updateCandidate = () => {
    newData.firstName = form.firstName.value
    newData.lastName = form.lastName.value
    newData.description = form.profession.value
    newData.address.city = form.city.value
}

const updateCV = () => {
    updatedCV.description = form.profession.value
    if(candidateID){ updatedCV.cvId = candidateID; }
    console.log(updatedCV)
}


/*Functions for getting Candidate info*/ 

const displayContent = (candidate) => {
    form.firstName.value = candidate.person.firstName
    form.lastName.value = candidate.person.lastName
    form.profession.value = candidate.description
    form.city.value = candidate.person.address.city
} 

const fetchCandidate = async () => {
    const res = await fetch(`https://cv-backend.ikbendirk.nl/cv/${candidateID}`)
        .then(res => res.json())
        .then(json => json.data)

    candidate = res;
    displayContent(candidate);
    console.log(candidate);
}


/*Fetch candidate info only when editing existing candidate*/ 

if(candidateID){
    console.log(candidateID)
    form.saveButton.innerHTML = "<i class='fas fa-save'></i>Save Changes"
    fetchCandidate()
} else {
    console.log("no candidate")
    form.saveButton.innerHTML = "<i class='fas fa-save'></i>Add Candidate"
}

//// Add competence

const addCompetenceBtn = document.getElementById('add_competence_btn');
const competences = document.getElementById('competences-list-choice');

let competencesArr = ["HTML", "CSS", "JavaScript", "Nodejs", "GraphQL"];

const addCompetence = (e) => {
    e.preventDefault();

competencesArr.push(competences.value);
console.log(competencesArr);
competences.value = '';
displayCompetences(competencesArr);

}

function displayCompetences(competences) {
    const htmlString = competences.map(competence => {
        return `
        <option value="${competence}">
        `;
    }).join('');
    document.getElementById("competences-list-dropdown").innerHTML = htmlString;
}

displayCompetences(competencesArr);

addCompetenceBtn.addEventListener('click', addCompetence)


