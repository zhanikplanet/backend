const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#loginpassword');
const confirmPasswordInput = document.querySelector('#confirmpassword');
const loginButton = document.querySelector('#submit');
const loginEyeIcon = document.getElementById('loginEye');

function setupPasswordViewer(input, eyeIcon) {
    eyeIcon.addEventListener('click', function () {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye-slash');
    });
}

setupPasswordViewer(passwordInput, loginEyeIcon);
setupPasswordViewer(confirmPasswordInput, loginEyeIcon);

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredPassword !== confirmPasswordInput.value) {
        alert("Passwords do not match!");
    } else {
        try {
            const users = await getResource('/getUsers');
            const foundUser = users.find(async (item) => {
                const isPasswordMatch = await bcrypt.compare(enteredPassword, item.password);
                return item.username === enteredUsername && isPasswordMatch;
            });

            if (foundUser) {
                alert("You are signed in");
                usernameInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
            } else {
                alert("Username or password is incorrect");
            }
        } catch (err) {
            console.error(err);
            alert("Error fetching data");
        }
    }
});

const serverUrl = "http://localhost:5501";

const getResource = async (endpoint) => {
    const url = `${serverUrl}${endpoint}`;
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching data");
    }
};
