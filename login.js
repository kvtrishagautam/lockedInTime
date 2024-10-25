// login.js
document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('authForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const email = form.querySelector('input[placeholder="Email"]').value;
        const password = form.querySelector('input[placeholder="Password"]').value;

        // Fetch user data from the Supabase table
        const { data, error } = await supabaseclient
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single(); // Get a single user

        if (error) {
            alert("Error logging in: " + error.message);
        } else if (data) {
            // Optionally redirect or handle successful login
            window.location.href = './dashboard.html';
        } else {
            alert("Invalid email or password");
        }
    });
});
