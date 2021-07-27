const competencesList = ["HTML", "CSS", "JavaScript", "Nodejs", "GraphQL"];
const candidateList = [
    {
        name: "Redmar",
        lastName: "Woest",
        profession: "Front End Developer",
        skills: ["HTML", "CSS", "JavaScript", "Nodejs"],
        lastUpdated: "13-05-2020"
    },

    {
        name: "Anna",
        lastName: "Mykhailenko",
        profession: "Business Analist",
        skills: ["CSS", "JavaScript", "Nodejs"],
        lastUpdated: "13-05-2020"
    },
    {
        name: "Ken",
        lastName: "Cheung",
        profession: "Data scientist",
        skills: ["HTML", "CSS", "JavaScript"],
        lastUpdated: "13-05-2020"
    },
    {
        name: "Firenzo",
        lastName: "Jorden",
        profession: "Back End Developer",
        skills: ["HTML", "JavaScript", "Nodejs", "GraphQL"],
        lastUpdated: "13-05-2020"
    }
]

const displayCandidates = (candidates) => {
    const htmlString = candidates.map((candidate) => {
        return `
            <li>
                <div class="candidate-picture">
                    <img src="static/img/placeholder-image.png" alt="profile picture">
                </div>
                <div class="candidate-information">
                    <h3>${candidate.name} ${candidate.lastName}</h3>
                    <p class="role">${candidate.profession}</p>
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
            console.log("wtf")
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

    checkProfession(searchString.replace(/\s?,\s/g, ',').split(","));
    checkName(searchString.replace(/\s?,\s/g, ',').split(","));
    checkSkills(searchString.replace(/\s?,\s/g, ',').split(","));

    console.log(Array.from(new Set(resultsArray)));
    displayCandidates(Array.from(new Set(resultsArray)));
})

displayCandidates(candidateList);