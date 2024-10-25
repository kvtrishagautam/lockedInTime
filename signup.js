document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('authForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = form.querySelector('input[placeholder="Username"]').value;
        const email = form.querySelector('input[placeholder="Email"]').value;
        const password = form.querySelector('input[placeholder="Password"]').value;
        
        // Validate password confirmation
        const confirmPassword = form.querySelector('input[placeholder="Confirm-Password"]').value;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long, contain at least one numeric value and one special character.");
            return;
        }

        // Check if email already exists
        const { data: existingEmailData, error: emailError } = await supabaseclient
            .from('users')
            .select('*')
            .eq('email', email);
        
        if (emailError) {
            alert("Error checking email: " + emailError.message);
            return;
        }
        
        if (existingEmailData.length > 0) {
            alert("This email is already registered. Please use a different email.");
            return;
        }

        // Check if username already exists
        const { data: existingUsernameData, error: usernameError } = await supabaseclient
            .from('users')
            .select('*')
            .eq('username', username);
        
        if (usernameError) {
            alert("Error checking username: " + usernameError.message);
            return;
        }

        if (existingUsernameData.length > 0) {
            alert("This username is already taken. Please choose a different username.");
            return;
        }

        // Insert user data into the Supabase table
        const { data, error } = await supabaseclient
            .from('users')
            .insert([
                { username: username, email: email, password: password }
            ]);

        if (error) {
            alert("Error signing up: " + error.message);
        } else {
            alert("User signed up successfully!");
            // Redirect to the login page
            window.location.href = 'login.html';
        }
    });
});
