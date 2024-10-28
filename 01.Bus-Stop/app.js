async function getInfo() {
    const stopNameEl = document.getElementById('stopName');
    const tableEl = document.getElementById('buses');
    const submitBtn = document.getElementById('submit');

    const stopID = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

    try {
        stopNameEl.textContent = 'Loading...';
        tableEl.innerHTML = '';
        submitBtn.disabled = true;

        const res = await fetch(url);

        if(res.status !== 200) {
            throw Error('Stop ID is not found!');
        }

        const data = await res.json();
        stopNameEl.textContent = data.name;
        
        Object.entries(data.buses).forEach(b => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            tableEl.appendChild(li);

        });

        submitBtn.disabled = false;
        
    } 
    catch (error) {
        stopNameEl.textContent = 'Error';
        
    }    
}