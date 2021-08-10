const btnAddExperience = document.getElementById('add_experience_btn');
const experienceSection = document.getElementById('work-experience');



// Fr the workExperience object
// const companyName = document.getElementById('company-name');
// const role = document.getElementById('work-experience-role');
// const startDate = document.getElementById('job-date-start');
// const endDate = document.getElementById('job-date-end');
// const responsibilities = document.getElementById('obligations');



// const workExperience = {
//     jobId: "optional",
//     from: "", // start date
//     until: "", // end date
//     function: "", // role
//     description: "", // responsibilities
//       companyName: "" // company name
//   }

//   const updateCandidateExperience = () => {
// workExperience.from = startDate.value,
// workExperience.until = endDate.value, 
// workExperience.function = role.value,
// workExperience.description = responsibilities.value,
// workExperience.companyName = companyName.value
// }



const addExperience = (e) => {
 e.preventDefault();
let expNr =  experienceSection.childElementCount;

    /// Can't click on new 'add experience' buttons
    // console.log(workExperience)
    let div = document.createElement("div");
    div.innerHTML = `<br><br><fieldset id="work-experience">
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
btnAddMoreExperience.addEventListener('click', addExperience);
// updateCandidateExperience();
}

btnAddExperience.addEventListener('click', addExperience);

