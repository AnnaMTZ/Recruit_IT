const competencesList = ["HTML", "CSS", "JavaScript", "Nodejs", "GraphQL"];
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

const fetchCandidates = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/cvs')
        .then(res => res.json())
        .then(json => json.data)

    displayCandidates(Object.entries(res));
    // console.log(res);
    // console.log(Object.entries(res));
}


function displayCandidates (candidates)  {
    const htmlString = candidates.map(([key, candidateInfo]) => {
        return `
            <li>
                <div class="candidate-picture">
                    <img src="static/img/placeholder-image.png" alt="profile picture">
                </div>
                <div class="candidate-information">
                
                    <h3>${key} ${key}</h3>
                    <p class="role">${key}</p>
                    <a href="#" class="button">View candidate <i class="fas fa-chevron-right"></i></a>
                </div>
            </li>
        `;
    }).join('');
    document.getElementById("results").innerHTML = htmlString;
}


const searchBar = document.getElementById("searchCandidates");
let resultsArray = [];



searchBar.addEventListener('input', (e) => {
    resultsArray = [];
    let searchString = e.target.value;
    
    function getOnlyOutdatedCvs(str){
        resultsArray = [];
        const filteredCandidates = candidateList.filter(candidate => {
            return  candidate.outdated === true
        })
        console.log(filteredCandidates)
        resultsArray = resultsArray.concat(filteredCandidates);
    }

    function checkProfession(str){
        str.forEach(i => {
            const filteredCandidates = candidateList.filter(candidate => {
                return  candidate.profession.toLowerCase().includes(i.toLowerCase()) ||
                        candidate.profession.toLowerCase().includes(i.toLowerCase())
            })
            resultsArray = resultsArray.concat(filteredCandidates);
        });
    }

    function checkName(str){
        str.forEach(i => {
            const filteredCandidates = candidateList.filter(candidate => {
                console.log(candidate.name.toLowerCase().concat(" ", candidate.lastName.toLowerCase()));
                return  candidate.name.toLowerCase().concat(" ", candidate.lastName.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.name.toLowerCase().concat(candidate.lastName.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.lastName.toLowerCase().concat(" ", candidate.name.toLowerCase()).includes(i.toLowerCase()) ||
                        candidate.lastName.toLowerCase().concat(candidate.name.toLowerCase()).includes(i.toLowerCase())
            })
            resultsArray = resultsArray.concat(filteredCandidates);
        });
    }

    function checkSkills(str){
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

        console.log(competencesSearchTerms);

        if(competencesSearchTerms.length !== 0){
            const filteredCandidates = candidateList.filter(candidate => {
                const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
                let candidateSkillsMatches = competencesSearchTerms.every((val,i)=>{
                    console.log(val);
                    return (candidateSkills.indexOf(val) !== -1)
                })
                console.log(candidateSkillsMatches);
                return candidateSkillsMatches;
            })
    
            resultsArray = resultsArray.concat(filteredCandidates);   
        }
    }

    if(searchString ==="!OUTDATED"){
        searchBar.classList.add("specialCommand")
        getOnlyOutdatedCvs(e.target.value);
    } else {
        searchBar.classList.remove("specialCommand")
        // checkProfession(searchString.replace(/\s?,\s/g, ',').split(","));
        checkName(searchString.replace(/\s?,\s/g, ',').split(","));
        // checkSkills(searchString.replace(/\s?,\s/g, ',').split(","));
    }

    console.log(Array.from(new Set(resultsArray)));
    displayCandidates(Array.from(new Set(resultsArray)));
});


document.getElementById("link-to-outdated-cvs").addEventListener("click", ()=>{
    showOutdatedcvs()
})

// is niet netjes, I know

function showOutdatedcvs(){
    resultsArray =[]
    searchBar.value = "!OUTDATED";
    searchBar.classList.add("specialCommand")
    const filteredCandidates = candidateList.filter(candidate => {
        return  candidate.outdated === true
    })
    console.log(filteredCandidates)
    resultsArray = resultsArray.concat(filteredCandidates);
    displayCandidates(Array.from(new Set(resultsArray)));
}

fetchCandidates();

