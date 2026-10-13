document.getElementById('loginBtn').addEventListener('click', async function() {
    // 1. Textbox se id aur password nikalna
    const user = document.getElementById('userid').value;
    const pass = document.getElementById('password').value;

    try {
        // 2. Node.js backend server ko data bhejna
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: user, password: pass })
        });

        // 3. Server se jo result (true/false) aaya usko read karna
        const result = await response.json();

        if (result.success) {
            alert('Login Successful!');
            // Agar success ke baad Dashboard par jana hai toh is line ke aage se '//' hata dena
            window.location.href = 'Dashboard/Dashboard.html'; 
        } else {
            alert('Wrong User ID or Password!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server se connect nahi ho pa raha hai!');
    }
});