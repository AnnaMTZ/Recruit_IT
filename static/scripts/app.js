const radioButtons = document.querySelectorAll("input[type='radio']")
const outDatedCvLink = document.getElementById("link-to-outdated-cvs");
const outDatedCvText = document.getElementById("cv-up-to-date-status");

const competencesList = ["HTML", "CSS", "JavaScript", "Nodejs", "GraphQL", "ReactJS", "VueJS", "Angular"];

let candidateList;
let searchString;
let resultsArray = [];

const fetchCandidates = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/cvs')
        .then(res => res.json())
        .then(json => json.data)

    candidateList = Object.entries(res);
    for(i=Math.round((candidateList.length - 1) / 4); i<candidateList.length; i+=6){
        console.log(i)
        candidateList[i][1].outdated = true;
    }
    console.log(candidateList)
    candidateList = Object.entries(res);
    resultsArray = candidateList;
    displayCandidates(candidateList);
    showCvNumbers();
    console.log(candidateList);
    
}

const hasFirstName = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.hasOwnProperty("firstName"))
const hasLastName = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.hasOwnProperty("lastName"))

const insertFirstName = (candidateInfo) => hasFirstName(candidateInfo) ?  candidateInfo.person.firstName : "Kees"
const insertLastName = (candidateInfo) => hasLastName(candidateInfo) ?  candidateInfo.person.lastName : "van Straten"

const hasCity = (candidateInfo) => (candidateInfo.hasOwnProperty("person") && candidateInfo.person.address.hasOwnProperty("city"))
                // <div class="candidate-picture">
                //      <img src="static/img/placeholder-image.png" alt="profile picture">
                // </div>

function displayCandidates (candidates)  {
    const htmlString = candidates.reverse().map(([key, candidateInfo]) => {
        return `
            <li>

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
    searchString = e.target.value;
    filterSearchBarInit(searchString);

    // console.log(Array.from(new Set(resultsArray)));
    // displayCandidates(Array.from(new Set(resultsArray)));

    if(document.querySelector("input[type='radio']:checked")){
        filterWillingnessToWorkAbroad(document.querySelector("input[type='radio']:checked").value)
    }
    
})

function filterSearchBarInit(searchString){
    // resultsArray = [];
    console.log(searchString)
    if(searchString ==="!OUTDATED"){
        searchBar.classList.add("specialCommand")
        showOutdatedcvs();
    } else if(searchString !== undefined) {
        searchBar.classList.remove("specialCommand")

        let strippedInput = searchString.replace(/\s?,\s/g, ',').split(",")

        filterProfession(strippedInput);
        filterName(strippedInput);
        filterSkills(strippedInput);
        filterCity(strippedInput);
    } else if(searchString == undefined){
        resultsArray = candidateList;
    }

    console.log(Array.from(new Set(resultsArray)));
    displayCandidates(Array.from(new Set(resultsArray)));
}


outDatedCvLink.addEventListener("click", ()=>{
    showOutdatedcvs();
    displayCandidates(Array.from(new Set(resultsArray)) );
})

function showOutdatedcvs(){
    resultsArray =[]
    searchBar.value = "!OUTDATED";
    searchBar.classList.add("specialCommand")
    const filteredCandidates = candidateList.filter(([key, value]) => {
        return  value.outdated === true
    })
    console.log(filteredCandidates)
    resultsArray = resultsArray.concat(filteredCandidates);
}

function showCvNumbers(){
    let allOutdatedCvs = candidateList.filter(([key, value]) => {
        return  value.outdated === true
    })
    let numberofoutdatedcvs = allOutdatedCvs.length;

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


console.log(document.querySelectorAll("input[type='radio']"))


function filterWillingnessToWorkAbroad(region){
    console.log(region.toLowerCase());
    console.log(resultsArray);

    const peopleWillingToWorkAbroad = resultsArray.filter(([key, value]) => {
        if(value.person){
            if(value.person.willingnessToWorkAbroad){
                console.log(key, value.person.willingnessToWorkAbroad)
                if(region.toLowerCase() == "netherlands"){
                    return true
                } else if(region.toLowerCase() == "benelux"){
                    return  value.person.willingnessToWorkAbroad == "benelux" || 
                            value.person.willingnessToWorkAbroad == "europe" ||
                            value.person.willingnessToWorkAbroad == "global"
                } else if(region.toLowerCase() == "europe"){
                            return value.person.willingnessToWorkAbroad == "europe" || 
                            value.person.willingnessToWorkAbroad == "global"
                } else if(region.toLowerCase() == "global"){
                    return value.person.willingnessToWorkAbroad == "global";
                }
            } else {
                return false;
            }
        }
    })
    resultsArray = peopleWillingToWorkAbroad;
    console.log(Array.from(new Set(resultsArray)));
    displayCandidates(Array.from(new Set(resultsArray)));
}

radioButtons.forEach(element => {
    element.addEventListener("change", ()=>{
        console.log(searchBar.value);
        if(searchBar.value ==="!OUTDATED" || searchString==="!OUTDATED"){
            searchBar.value = "";
            searchString="";
            searchBar.classList.remove("specialCommand")
        }
        filterSearchBarInit(searchString);
        filterWillingnessToWorkAbroad(document.querySelector("input[type='radio']:checked").value)
    })
});