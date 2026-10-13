document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = '../Dashboard/Dashboard.html';
});

document.getElementById('saveBtn').addEventListener('click', async function() {
    const name = document.getElementById('projectName').value;
    const tech = document.getElementById('projectTech').value;
    const github = document.getElementById('githubLink').value;
    const status = document.getElementById('projectStatus').value;

    if (name === '') {
        alert('Please enter a Project Name!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/add-project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, tech: tech, github: github, status: status })
        });

        const result = await response.json();

        if (result.success) {
            alert('Project "' + name + '" saved successfully!');
            window.location.href = '../Dashboard/Dashboard.html';
        } else {
            alert('Failed to save project!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server connection error!');
    }
});