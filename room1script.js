document.addEventListener('DOMContentLoaded', () => {
    let draggedBlock = null;
    const blocks = document.querySelectorAll('.block');
    const cells = document.querySelectorAll('.grid-cell');
    const shelves = document.querySelectorAll('.shelf');
    const verifyButton = document.getElementById('verifyButton');
    const escapeButton = document.getElementById('escapeButton'); // Reference to the escape button

    function initDraggable(element) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    }

    function handleDragStart(e) {
        draggedBlock = this;
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', '');
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedBlock = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        this.classList.add('droppable-hover');
    }

    function handleDragLeave(e) {
        this.classList.remove('droppable-hover');
    }

    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('droppable-hover');
        if (!draggedBlock) return;
        if (this.classList.contains('grid-cell')) {
            if (!this.hasChildNodes()) {
                this.appendChild(draggedBlock);
            }
        } else if (this.classList.contains('shelf')) {
            this.appendChild(draggedBlock);
        }
    }
    
    function verifyPattern() {
        const pattern = [
            { position: 1, value: '99' },
            { position: 2, value: '111' },
            { position: 3, value: '110' },
            { position: 4, value: '115' },
            { position: 5, value: '111' },
            { position: 6, value: '108' },
            { position: 7, value: '101' }
        ];
        
        const isCorrect = pattern.every(item => {
            const cell = document.querySelector(`.grid-cell[data-position='${item.position}']`);
            return cell && cell.firstChild && cell.firstChild.getAttribute('data-value') === item.value;
        });
    
        if (isCorrect) {
            alert('Pattern verified! Proceed to the next stage.');

            // Add overlay to cover the button
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed'; 
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)'; // Invisible overlay
            overlay.style.zIndex = '10';
            document.body.appendChild(overlay);
    
            alert("New Challenge: The button is covered by an invisible element. Use the browser's Elements panel to find and delete the overlay!");

            overlay.addEventListener('click', () => {
                overlay.remove();
                alert("Good job! You've completed the challenge.");
            });
        } else {
            alert('Incorrect pattern. Try again.');
        }
    }

    // Function to reveal the escape button when 'remove' is typed in the console
    window.remove = function() {
        escapeButton.style.display = 'block'; // Show the escape button
        console.log('Escape button is now visible!'); // Optional: log a message
    };

    // Add event listener to the escape button
    escapeButton.addEventListener('click', () => {
        alert("Good job! You've completed the challenge."); // Show success message
        window.location.href = 'dashboard.html'; // Redirect to the home page (update with your actual home page URL)
    });

    verifyButton.addEventListener('click', verifyPattern);
    blocks.forEach(block => initDraggable(block));
    cells.forEach(cell => {
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('dragleave', handleDragLeave);
        cell.addEventListener('drop', handleDrop);
    });
    shelves.forEach(shelf => {
        shelf.addEventListener('dragover', handleDragOver);
        shelf.addEventListener('dragleave', handleDragLeave);
        shelf.addEventListener('drop', handleDrop);
    });
}); 
