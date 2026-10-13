document.getElementById('addProjectBtn').addEventListener('click', function() {
    window.location.href = '../AddProject/addproject.html';
});

// Page load hote hi API call karke projects mangwana
window.onload = async function() {
    try {
        const response = await fetch('http://localhost:3000/get-projects');
        const result = await response.json();

        if (result.success) {
            const projectContainer = document.getElementById('projectList');
            projectContainer.innerHTML = ''; // Khali karo pehle

            // Har project ke liye ek card banao
            result.projects.forEach(proj => {
                let githubHTML = proj.githubLink ? `<p><strong>GitHub:</strong> <a href="${proj.githubLink}" target="_blank">${proj.githubLink}</a></p>` : '';

                let card = `
                    <div class="project-card">
                        <h4>${proj.projectName}</h4>
                        <p><strong>Tech:</strong> ${proj.techUsed}</p>
                        ${githubHTML}
                        <p><strong>Status:</strong> ${proj.projectStatus}</p>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editProject(${proj.id})">Edit</button>
                            <button class="btn-delete" onclick="deleteProject(${proj.id})">Delete</button>
                        </div>
                    </div>
                `;
                projectContainer.innerHTML += card;
            });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}; // window.onload yahan khatam hota hai

// --- Naye Delete aur Edit Functions ---
window.deleteProject = async function(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        try {
            const response = await fetch('http://localhost:3000/delete-project/' + id, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
                window.location.reload(); // Page refresh karo delete hone ke baad
            } else {
                alert("Failed to delete project!");
            }
        } catch (error) {
            alert("Error connecting to server!");
        }
    }
};

window.editProject = function(id) {
    // Edit button click hone par ek naye page par bhejenge jisme project ki ID hogi
    window.location.href = `../EditProject/editproject.html?id=${id}`;
};