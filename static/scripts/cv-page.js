const candidateID = window.location.hash.replace("#", '');
console.log(window.location)
statusText = document.getElementById("statusText");

let form = {
    firstName: document.getElementById("candidate-first-name"),
    lastName: document.getElementById("candidate-last-name"),
    profession: document.getElementById("candidate-profession"),
    introduction: document.getElementById("candidate-introduction"),
    country: document.getElementById("nationality"),
    city: document.getElementById("located"),
    dateOfBirth: document.getElementById("date-of-birth"),
    abroad: {
        netherlands: document.getElementById("work-netherlands"),
        benelux: document.getElementById("work-benelux"),
        europe: document.getElementById("work-europe"),
        global: document.getElementById("work-global")
    },

    mobile: document.getElementById("mobile-number"),
    email: document.getElementById("email"),

    gender: document.getElementById("gender"),

    saveButton: document.getElementById("saveCandidateButton"),
    deleteButton: document.getElementById("deleteCandidate"),
}

const links = {
    introductionText: document.getElementById("introduction-text-link"),
    workExperience: document.getElementById("work-experience-link"),
    competences: document.getElementById("competences-link"),
    personalData: document.getElementById("personal-data-link")
}

const sections = {
    introductionText: document.getElementById("introduction-text"),
    workExperience: document.getElementById("work-experience"),
    competences: document.getElementById("competences"),
    personalData: document.getElementById("personal-data")
}

let updatedCV = {
    "description": "Front End Developer",
    "hobbies": "A hobby string",
    "references": "A reference string",
    "availability": false,
    "introduction": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim."
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
    "driversLicenseExtra": "nothing",
    "gender": "male",
    "willingnessToWorkAbroad": "netherlands"
}

let candidate;

const createCV = () => {
    fetch(`https://cv-backend.ikbendirk.nl/cv/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(updatedCV),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        createPerson(data.id);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const createPerson = (newPersonID) => {
    console.log(newData)
    fetch(`https://cv-backend.ikbendirk.nl/cv/${candidateID || newPersonID }/person`, {
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
            if(window.location.hash === ""){
                deleteCV(newPersonID);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const deleteCV = (CvId) => {
    fetch(`https://cv-backend.ikbendirk.nl/cv/${CvId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',}
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if(window.location.hash != ""){
            window.location.href = window.location.pathname;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

form.saveButton.addEventListener('click', (e)=>{
    e.preventDefault();
    updateCVData();
    updatePersonData();
    createCV();
})

form.deleteButton.addEventListener('click', (e)=>{
    e.preventDefault();
    deleteCV(candidateID);
})

const updatePersonData = () => {
    newData.firstName = form.firstName.value || " ";
    newData.lastName = form.lastName.value || " ";
    newData.description = form.profession.value || " ";
    newData.address.country = form.country.value || " ";
    newData.address.city = form.city.value || " ";
    newData.phoneNumber = form.mobile.value || " ";
    newData.email = form.email.value || " ";
    newData.gender = form.gender.value || "";
    newData.willingnessToWorkAbroad = document.querySelector("input[type='radio']:checked").value || " ";
    newData.dateOfBirth = `${form.dateOfBirth.value.split("-")[2]}-${form.dateOfBirth.value.split("-")[1]}-${form.dateOfBirth.value.split("-")[0]}` || " " // 0=year 1=month  2=day
}

const updateCVData = () => {
    updatedCV.description = form.profession.value
    updatedCV.introduction = form.introduction.value || " "
    if(candidateID){ 
        updatedCV.cvId = candidateID;
    }
    console.log(updatedCV)
}

/*---------------------------------------------------

//     FUNCTIONS FOR DISPLAYING CANDIDATE INFO

---------------------------------------------------*/

const displayNameAndProfession = (candidate) => {
    form.firstName.value = candidate.person.firstName
    form.lastName.value = candidate.person.lastName
    form.profession.value = candidate.description
}

const displayIntroductionText = (candidate) => {
    if(candidate.introduction === undefined) {
        form.introduction.value = ""
    } else {
        form.introduction.value = candidate.introduction
    }
}

const displayWillingnessToWorkAbroad = (candidate) => {
    if(candidate.person.willingnessToWorkAbroad){
        form.abroad[candidate.person.willingnessToWorkAbroad].checked = true
    }
}

const displayGender = (candidate) => {
    document.querySelectorAll("select#gender option").forEach((element, i) => {
        if(candidate.person.gender === element.value){
            form.gender.selectedIndex = i;
        }
    });
}

const displayCountry = (candidate) => {
    document.querySelectorAll("select#nationality option").forEach((element, i) => {
        if(candidate.person.address.country === element.value){
            form.country.selectedIndex = i;
        }
    });
}

const displayDateOfBirth = (candidate) => {
    let dateArray = candidate.person.dateOfBirth.split("-");
    form.dateOfBirth.value = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}` //[2] = year;  [1] = month;  [0] = day;
}

const displayContent = (candidate) => {
    console.log(candidate);
    displayNameAndProfession(candidate);
    displayIntroductionText(candidate);
    displayWillingnessToWorkAbroad(candidate);

    form.city.value = candidate.person.address.city
    form.mobile.value = candidate.person.phoneNumber
    form.email.value = candidate.person.email
    displayCountry(candidate);

    displayGender(candidate);
    displayDateOfBirth(candidate)
} 

/*---------------------------------------------------

//     FUNCTION FOR GETTING CANDIDATE INFO

---------------------------------------------------*/

const fetchCandidate = async () => {
    const res = await fetch(`https://cv-backend.ikbendirk.nl/cv/${candidateID}`)
        .then(res => res.json())
        .then(json => json.data)

    candidate = res;
    displayContent(candidate);
    console.log(candidate);
}

/*---------------------------------------------------

//      CHECK IF EDITING OR ADDING NEW CANDIDATE

---------------------------------------------------*/

if(candidateID){
    console.log(candidateID)
    form.saveButton.innerHTML = "<i class='fas fa-save'></i>Save Changes"
    fetchCandidate()
} else {
    console.log("no candidate")
    form.saveButton.innerHTML = "<i class='fas fa-save'></i>Add Candidate"
    form.deleteButton.classList.add("hide")
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
        console.log(competence);
        return `
        <option value="${competence}">
        `;
    }).join('');
    document.getElementById("competences-list-dropdown").innerHTML = htmlString;
}

displayCompetences(competencesArr);

addCompetenceBtn.addEventListener('click', addCompetence)


/*---------------------------------------------------*/
//              Scroll to sections
/*---------------------------------------------------*/

links.introductionText.addEventListener('click', (e) => {
    e.preventDefault();
    sections.introductionText.scrollIntoView({behavior:"smooth"})
})

links.workExperience.addEventListener('click', (e) => {
    e.preventDefault();
    sections.workExperience.scrollIntoView({behavior:"smooth"})
})

links.competences.addEventListener('click', (e) => {
    e.preventDefault();
    sections.competences.scrollIntoView({behavior:"smooth"})
})

links.personalData.addEventListener('click', (e) => {
    e.preventDefault();
    sections.personalData.scrollIntoView({behavior:"smooth"})
})


document.getElementById("date-of-birth").addEventListener("input", (e)=>{
    console.log(e.target.value);
    date = new Date(e.target.value);
    console.log(`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`);
})