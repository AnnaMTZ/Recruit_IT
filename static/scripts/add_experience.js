const btnAddExperience = document.getElementById('add_experience_btn');
const experienceSection = document.getElementById('work-experience');
const saveCandidateBtn = document.getElementById('saveCandidateButton');

const allExperiences = [];

 function updateCandidateExperience (expSection) {
const companyName = expSection.querySelector('#company-name');
const role = expSection.querySelector('#work-experience-role');
const startDate = expSection.querySelector('#job-date-start');
const endDate = expSection.querySelector('#job-date-end');
const responsibilities = expSection.querySelector('#obligations');

  let workExperience = {
    jobId: "optional",
    from: startDate.value, // start date
    until: endDate.value, // end date
    function: role.value, // role
    description: responsibilities.value, // responsibilities
      companyName: companyName.value // company name
  }

allExperiences.push(workExperience);
}


const saveChanges = (e) => {
    e.preventDefault();
expArr.forEach(experience => {
    updateCandidateExperience(experience);
})
console.log(allExperiences); /// array with objects with all the added experiences
}

let expArr = [experienceSection];

const addExperience = (e) => {
 e.preventDefault();
let expNr =  experienceSection.childElementCount;

    let div = document.createElement("div");
    div.innerHTML = `<br><br><fieldset id="work-experience${expNr}">
 <legend><h2>Work experience</h2></legend>

    <div class="work-experience-part">
        <label for="company-name">Company name:</label>
        <input type="text" id="company-name" placeholder="e.g. RecruitIT">
    </div>

    <div class="work-experience-part">
        <label for="work-experience-role">Role:</label>
        <input type="text" id="work-experience-role" placeholder="e.g. front end developer">
    </div>

    <div class="work-experience-job-date">
        <div class="work-experience-part">
            <label for="job-date-start">Start date:</label>
            <input type="date" id="job-date-start">
        </div>
        <div class="work-experience-part">
            <label for="job-date-end">End date:</label>
            <input type="date" id="job-date-end">
        </div>
        <div class="work-experience-part present-day">
            <input type="checkbox" name="until-present-day" id="until-present-day">
            <label for="until-present-day">Still in service</label>
        </div>
    </div>

    <div class="work-experience-part">
        <label for="obligations">Responsibilities:</label>
        <textarea id="obligations" name="obligations"></textarea>
    </div>

    <button class="btn orange" id="add_experience_btn${expNr}"> <i class="fas fa-plus"></i> Add experience
</button>
</fieldset>`

// experienceSection.innerHTML += experienceSection.innerHTML;
experienceSection.appendChild(div);
const btnAddMoreExperience = document.getElementById(`add_experience_btn${expNr}`);
const newExperienceSection = document.getElementById(`work-experience${expNr}`);
expArr.push(newExperienceSection);
btnAddMoreExperience.addEventListener('click', addExperience);

}

btnAddExperience.addEventListener('click', addExperience);
saveCandidateBtn.addEventListener('click', saveChanges)