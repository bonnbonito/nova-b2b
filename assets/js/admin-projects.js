function display_project_details() {
	const projects = JSON.parse(CustomProjects.projects);

	const container = document.getElementById('customproject');

	projects.forEach((project) => {
		let html = '';
		html = displayProject(project);
		const tempDiv = document.createElement('div');
		tempDiv.className = 'project-item';
		tempDiv.innerHTML = html;
		container.appendChild(tempDiv); // Append the entire div
	});
}

function displayProject(project) {
	const html = `
        <h3 style="text-transform: uppercase;">${project.title}</h3>
        <div class="signage-details">
            <div class="signage-label">Description</div>
            <div class="signage-value">${project.description}</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">Custom ID</div>
            <div class="signage-value">${project.custom_id}"</div>
        </div>
        <div class="signage-details">
            <div class="signage-label">FILE</div>
            <div class="signage-value">${project.file}</div>
        </div>
    `;

	return html;
}

if (document.readyState === 'loading') {
	// Loading hasn't finished yet
	document.addEventListener('DOMContentLoaded', display_project_details);
} else {
	// `DOMContentLoaded` has already fired
	display_project_details();
}
