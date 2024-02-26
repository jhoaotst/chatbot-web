function callAPI() {
    const waId = document.getElementById('waId').value;
    const moduleNumber = document.getElementById('moduleNumber').value;
    const dayNumber = document.getElementById('dayNumber').value;

    const requestBody = {
        waId: waId,
        module_number: moduleNumber,
        day_number: dayNumber
    };

    fetch('https://bi-chatbot.whiz.pe/api/cronjob', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error occurred. Check console for details.';
    });
}


