document.getElementById('wizard').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('sksksks')

    const formData = {
        fullName: document.querySelector('input[placeholder="Full Name"]').value,
        email: document.querySelector('input[placeholder="Your Email"]').value,
        phoneNumber: document.querySelector('input[placeholder="Phone Number"]').value,
        // age: document.querySelector('input[placeholder="Age"]').value,
        gender: document.querySelector('#gender').value,
        // state: document.querySelector('.select-control').innerText,
        address: document.querySelector('input[placeholder="Address"]').value,
        // city: document.querySelector('input[placeholder="City"]').value,
        areaCode: document.querySelector('#area_code').value,
        // message: document.querySelector('textarea[placeholder="Your messagere here!"]').value,
        attending: document.querySelector('#check').checked,
        // acceptedTerms: document.querySelector('.checkbox-circle.mt-24 input[type="checkbox"]').checked
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('wizard').addEventListener('submit', async function(e) {
            e.preventDefault();
        
            const formData = {
                fullName: document.querySelector('input[placeholder="Full Name"]').value,
                email: document.querySelector('input[placeholder="Your Email"]').value,
                phoneNumber: document.querySelector('input[placeholder="Phone Number"]').value,
                gender: document.querySelector('#gender').value,
                address: document.querySelector('input[placeholder="Address"]').value,
                areaCode: document.querySelector('#area_code').value,
                attending: document.querySelector('#check').checked,
            };
        
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
        
                const result = await response.json();
        
                // Show the modal with the result message
                document.getElementById('modalMessage').textContent = result.message;
                const modal = document.getElementById('successModal');
                modal.style.display = 'block';
        
                // Close the modal when the user clicks on <span> (x)
                document.querySelector('.close').onclick = function() {
                    modal.style.display = 'none';
                };
        
                // Navigate back to index.html when the user clicks the button
                document.getElementById('backButton').onclick = function() {
                    window.location.href = 'index.html';
                };
        
                // Close the modal if the user clicks anywhere outside of the modal
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                };
        
            } catch (error) {
                console.error('Error:', error);
            }
        });
        
        // alert(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
});