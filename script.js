async function callAPI() {
    const waId = document.getElementById('waId').value;
    const moduleNumber = document.getElementById('moduleNumber').value;
    const dayNumber = document.getElementById('dayNumber').value;

    const requestBody = {
        waId: waId,
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
