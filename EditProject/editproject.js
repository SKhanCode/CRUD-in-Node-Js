// URL se Project ID nikalna
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = '../Dashboard/Dashboard.html';
});

// Page load hote hi purana data SQL se laakar form mein bhar do
window.onload = async function() {
    try {
        const response = await fetch('http://localhost:3000/get-project/' + projectId);
        const result = await response.json();

        if (result.success) {
            document.getElementById('projectId').value = result.project.id;
            document.getElementById('projectName').value = result.project.projectName;
            document.getElementById('projectTech').value = result.project.techUsed;
            document.getElementById('githubLink').value = result.project.githubLink || '';
            document.getElementById('projectStatus').value = result.project.projectStatus;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Update Button ka logic
document.getElementById('updateBtn').addEventListener('click', async function() {
    const id = document.getElementById('projectId').value;
    const name = document.getElementById('projectName').value;
    const tech = document.getElementById('projectTech').value;
    const github = document.getElementById('githubLink').value;
    const status = document.getElementById('projectStatus').value;

    if (name === '') {
        alert('Please enter a Project Name!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/update-project', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, name: name, tech: tech, github: github, status: status })
        });

        const result = await response.json();

        if (result.success) {
            alert('Project updated successfully!');
            window.location.href = '../Dashboard/Dashboard.html';
        } else {
            alert('Failed to update project!');
        }
    } catch (error) {
        alert('Server connection error!');
    }
});