const outDatedCvLink = document.getElementById("link-to-outdated-cvs");
const outDatedCvText = document.getElementById("cv-up-to-date-status");

const competencesList = ["HTML", "CSS", "JavaScript", "Nodejs", "GraphQL", "ReactJS", "VueJS", "Angular"];
// const candidateList = [
//     {
//         name: "Redmar",
//         lastName: "Woest",
//         profession: "Front end developer",
//         skills: ["HTML", "CSS", "JavaScript", "Nodejs"],
//         lastUpdated: "13-05-2020",
//         outdated: true
//     },

//     {
//         name: "Anna",
//         lastName: "Mykhailenko",
//         profession: "Lead front end developer",
//         skills: ["CSS", "JavaScript", "Nodejs"],
//         lastUpdated: "13-05-2020",
//         outdated: false
//     },
//     {
//         name: "Ken",
//         lastName: "Cheung",
//         profession: "Data scientist",
//         skills: ["HTML", "CSS", "JavaScript"],
//         lastUpdated: "13-05-2020",
//         outdated: false
//     },
//     {
//         name: "Firenzo",
//         lastName: "Jorden",
//         profession: "Back end developer",
//         skills: ["HTML", "JavaScript", "Nodejs", "GraphQL"],
//         lastUpdated: "13-05-2020",
//         outdated: true
//     }
// ]

let candidateList;

const fetchCandidates = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/cvs')
        .then(res => res.json())
        .then(json => json.data)

    candidateList = Object.entries(res);
    displayCandidates(candidateList);
    showCvNumbers();
    console.log(candidateList);
    
}

const hasFirstName = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.hasOwnProperty("firstName"))
const hasLastName = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.hasOwnProperty("lastName"))

const insertFirstName = (candidateInfo) => hasFirstName(candidateInfo) ?  candidateInfo.person.firstName : "Kees"
const insertLastName = (candidateInfo) => hasLastName(candidateInfo) ?  candidateInfo.person.lastName : "van Straten"

const hasCity = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.address.hasOwnProperty("city"))

function displayCandidates (candidates)  {
    const htmlString = candidates.reverse().map(([key, candidateInfo]) => {
        return `
            <li>
                <div class="candidate-picture">
                     <img src="static/img/placeholder-image.png" alt="profile picture">
                </div>

                <div class="candidate-information">
                    <h3>
                        ${insertFirstName(candidateInfo)}
                        ${insertLastName(candidateInfo)}
                    </h3>
                    <p class="role">${candidateInfo.description}</p>
                    <a href="cv-page.html#${key}" class="button">View candidate <i class="fas fa-chevron-right"></i></a>
                </div>
            </li>
        `;
    }).join('');
    document.getElementById("results").innerHTML = htmlString;
}


const searchBar = document.getElementById("searchCandidates");
let resultsArray = [];

function filterName(str){
    str.forEach(i => {

        const filteredCandidates = candidateList.filter(([key,candidate]) => {
            if(hasFirstName(candidate) && hasLastName(candidate)){
                // console.log(candidate.person.firstName.toLowerCase().concat(" ", candidate.person.lastName.toLowerCase()));
                //Return alle matches op basis van "Voornaam + Achternaam ongeacht of er een spatie wordt vergeten of niet"
                return  candidate.person.firstName.toLowerCase().concat(" ", candidate.person.lastName.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.person.firstName.toLowerCase().concat(candidate.person.lastName.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.person.lastName.toLowerCase().concat(" ", candidate.person.firstName.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.person.lastName.toLowerCase().concat(candidate.person.firstName.toLowerCase()).includes(i.toLowerCase())
            } else {
                return false;
            }
        })
        resultsArray = resultsArray.concat(filteredCandidates);
    });
}

function filterCity(str){
    str.forEach(i => {
        const filteredCandidates = candidateList.filter(([key,candidate]) => {
            if(hasCity(candidate)){
                return  candidate.person.address.city.toLowerCase().includes(i.toLowerCase())
            } else {
                return false;
            }
        })
        resultsArray = resultsArray.concat(filteredCandidates);
    });
}

function filterProfession(str){
    str.forEach(i => {
        const filteredCandidates = candidateList.filter(([key, candidate]) => {
            console.log(key)
            console.log(candidate)
            return candidate.description.toLowerCase().includes(i.toLowerCase())
        })
        resultsArray = resultsArray.concat(filteredCandidates);
    });
}

function filterSkills(str){
    let competencesSearchTerms = [];
    const competencesListLowerCase = competencesList.map(competence => competence.toLowerCase());
    str.forEach(i => {
        competencesSearchTerms = str.filter(searchTerm => {
            return competencesListLowerCase.includes(searchTerm.toLowerCase())
        })
    });

    competencesSearchTerms = competencesSearchTerms.map(competence => competence.toLowerCase());

    competencesListLowerCase.forEach((element, index) => {
        if(element.toLowerCase().includes(str[str.length -1].toLowerCase())){
            console.log(competencesListLowerCase[index])
            if(competencesSearchTerms.indexOf(element) == -1){
                competencesSearchTerms.push(competencesListLowerCase[index]);
            }
        }
    });

    console.log(candidateList);

    if(competencesSearchTerms.length !== 0){
        const filteredCandidates = candidateList.filter(([candidateID, value]) => {
            let arrayWithCompetences = []
            if(value.skills){
                Object.entries(value.skills).forEach(([candidateSkillID, value]) => {
                    if(value.name){
                        arrayWithCompetences.push(value.name);
                    }
                });
            }
            const candidateSkills = arrayWithCompetences.map(skill => skill.toLowerCase());
            console.log(candidateID, arrayWithCompetences);
            console.log(competencesSearchTerms);
            let candidateSkillsMatches = competencesSearchTerms.every((val,i)=>{
                console.log(val);
                return (candidateSkills.indexOf(val) !== -1)
            })
            console.log(candidateSkillsMatches);
            return candidateSkillsMatches;
        });
        resultsArray = resultsArray.concat(filteredCandidates); 
    }
}

searchBar.addEventListener('input', (e) => {
    resultsArray = [];
    let searchString = e.target.value;

    if(searchString ==="!OUTDATED"){
        searchBar.classList.add("specialCommand")
        // showOutdatedcvs();
    } else {
        searchBar.classList.remove("specialCommand")

        let strippedInput = searchString.replace(/\s?,\s/g, ',').split(",")

        filterProfession(strippedInput);
        filterName(strippedInput);
        filterSkills(strippedInput);
        filterCity(strippedInput);
    }

    console.log(Array.from(new Set(resultsArray)));
    displayCandidates(Array.from(new Set(resultsArray)));
})


outDatedCvLink.addEventListener("click", ()=>{
    showOutdatedcvs();
    displayCandidates(Array.from(new Set(resultsArray)) );
})

function showOutdatedcvs(){
    resultsArray =[]
    searchBar.value = "!OUTDATED";
    searchBar.classList.add("specialCommand")
    const filteredCandidates = candidateList.filter(candidate => {
        return  candidate.outdated === true
    })
    console.log(filteredCandidates)
    resultsArray = resultsArray.concat(filteredCandidates);
}

function showCvNumbers(){
    let numberofoutdatedcvs = 0;

    if(numberofoutdatedcvs <= 0){
        outDatedCvLink.innerHTML = ``
        outDatedCvText.innerHTML = `All ${candidateList.length} CV's are up to date`
    }

    if(numberofoutdatedcvs > 0){
        outDatedCvLink.innerHTML = `${numberofoutdatedcvs} out of ${candidateList.length}`
        outDatedCvText.innerHTML = " CV's are not up to date"
    }
}
fetchCandidates();