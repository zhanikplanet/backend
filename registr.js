const usernameIn = document.querySelector('#nameuser');
const emailIn = document.querySelector('#email');
const passwordIn = document.querySelector('#password');
const signUpButton = document.querySelector('#button');
const eyeIcon = document.getElementById('eye');

eyeIcon.addEventListener('click', function () {
    const type = passwordIn.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordIn.setAttribute('type', type);
    eyeIcon.classList.toggle('fa-eye-slash');
});

signUpButton.addEventListener('click', async (e) => {
    if (
        passwordIn.value.length < 8 ||
        !/[A-Z]/.test(passwordIn.value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(passwordIn.value)
    ) {
        alert("Password is not suitable!");
    } else {
       
        try {
            const model = {
                username: usernameIn.value,
                email: emailIn.value,
                password: passwordIn.value
            };

            console.log("Model:", model);

            await postResource('/postUser', model);
            usernameIn.value='';
            passwordIn.value='';
            emailIn.value='';
            
        } catch (err) {
            console.error(err);
            alert("Error fetching data");
        }
    }
});


const serverUrla = "http://localhost:5501";

const postResource = async (endpoint, body) => {
    const url = `${serverUrla}${endpoint}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json",
        },
        body: JSON.stringify(body), 
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        alert("You successfully created an account!");
        return await response.json();
    } catch (error) {
        alert("Sorry but you have already account with this username or email");
       
    }
};
