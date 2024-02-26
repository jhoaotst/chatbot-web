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
        waIds: waIds,
        module_number: moduleNumber,
        day_number: dayNumber
    };

    try {
        const response = await fetch('https://bi-chatbot.whiz.pe/api/cronjob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        document.getElementById('response').innerHTML = 'Message sent successfully';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error occurred. Check console for details.';
    }
}
