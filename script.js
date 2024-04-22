let waIds = [];

function addNumber() {
    const waId = document.getElementById('waId').value;
    if (!/^\d{11}$/.test(waId)) return;
    if (waId == "") return;

    waIds.push(waId);
    
    const numbers = document.getElementById('numbers');
    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = waId;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        const index = waIds.indexOf(waId);
        if (index !== -1) {
            waIds.splice(index, 1);
            numbers.removeChild(number);
        }
    });

    number.appendChild(deleteButton);
    numbers.appendChild(number);

    document.getElementById('waId').value = "";
}

async function callAPI() {
    const moduleNumber = document.getElementById('moduleNumber').value;
    const dayNumber = document.getElementById('dayNumber').value;

    if (waIds.length === 0) {
        document.getElementById('response').innerHTML = 'empty numbers';
        return;
    }

    const requestBody = {
        waIds: waIds.map(id => id.trim()), // Trim whitespace from each ID
        module_number: parseInt(moduleNumber), // Convert to integer
        day_number: parseInt(dayNumber) // Convert to integer
    };

    try {
        const response = await fetch('https://bi-chatbot-devclient.whiz.pe/api/cronjob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const responseData = await response.json();

        if (responseData.status) {
            document.getElementById('response').innerHTML = 'Message sent successfully';
        } else {
            document.getElementById('response').innerHTML = 'Failed to send message';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error occurred. Check console for details.';
    }
}
