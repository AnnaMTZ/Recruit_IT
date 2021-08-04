const saveCandidateBtn = document.getElementById('saveCandidateBtn');

const addCandidate = (e) => {
  e.preventDefault();
    fetch('https://cv-backend.ikbendirk.nl/cv', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          "description": "godfather",
          "hobbies": "mafia",
          "references": "sicily"
        })
          
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}


saveCandidateBtn.addEventListener('click', addCandidate)