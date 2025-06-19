const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstname = form.elements.firstname.value;
    const lastname = form.elements.lastname.value;
    const birthdate = form.elements.birthday.value;
    const gender = form.elements.radio.value;
    const country = form.elements.country.value;
    const city = form.elements.city.value;
    const skills = form.elements.skills;
    const result = document.querySelector(".result");

    skillsValues = [];

    skills.forEach((item, _) => {
        if (item.checked) {
            skillsValues.push(item.value);
        }
    })


    if (skillsValues.length === 0) {
        skillsValues = "No skills selected";
    };
    if (firstname === "" || lastname === "" || birthdate === "" || gender === "" || country === "" || city === "") {
        alert("Please fill in all fields.");
        return;
    }

    result.innerHTML = `<label>Result:</label>
            <table>
                <tbody>
                    <tr>
                        <td><span>Firstname</span></td>
                        <td><span>${firstname}</span></td>
                    </tr>
                    <tr>
                        <td><span>Lastname</span></td>
                        <td><span>${lastname}</span></td>
                    </tr>
                    <tr>
                        <td><span>Birthday</span></td>
                        <td><span>${birthdate}</span></td>
                    </tr>
                    <tr>
                        <td><span>Gender</span></td>
                        <td><span>${gender}</span></td>
                    </tr>
                    <tr>
                        <td><span>Country</span></td>
                        <td><span>${country}</span></td>
                    </tr>
                    <tr>
                        <td><span>City</span></td>
                        <td><span>${city}</span></td>
                    </tr>
                    <tr>
                        <td><span>Skills</span></td>
                        <td><span>${skillsValues}</span></td>
                    </tr>
                </tbody>
            </table>`;




    // console.log(`First Name: ${firstname}, Last Name: ${lastname}, Birthdate: ${birthdate}, Gender: ${gender}, Country: ${country}, City: ${city}, Skills: ${skills}`);
})