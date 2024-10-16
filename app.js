document.getElementById("setupNodes").addEventListener("click", function() {
    const numNodes = parseInt(document.getElementById("numNodes").value);
    const nodeStatusInputs = document.getElementById("nodeStatusInputs");
    nodeStatusInputs.innerHTML = '';
    for (let i = 1; i <= numNodes; i++) {
        const div = document.createElement("div");
        div.classList.add("node-input");
        div.innerHTML = `
            <label for="status${i}">Apakah Komputer ${i} rusak?</label>
            <select id="status${i}" class="form-control">
                <option value="false">Baik</option>
                <option value="true">Rusak</option>
            </select>
        `;
        nodeStatusInputs.appendChild(div);
    }
    document.getElementById("messageInput").style.display = "block";
});

document.getElementById("sendMessage").addEventListener("click", function() {
    const computers = [];
    const numNodes = parseInt(document.getElementById("numNodes").value);
    
    for (let i = 1; i <= numNodes; i++) {
        const isBroken = document.getElementById(`status${i}`).value === "true";
        computers.push({ id: i, isBroken: isBroken, message: "" });
    }
    
    const senderId = parseInt(document.getElementById("senderId").value);
    const receiverId = parseInt(document.getElementById("receiverId").value);
    const message = document.getElementById("message").value;

    let output = document.getElementById("output");
    output.innerHTML = '';

    // Mengirim pesan
    for (let i = senderId - 1; i < receiverId; i++) {
        if (computers[i].isBroken) {
            output.innerHTML += `<div class="node-box broken"><span class="status-text">Komputer ${computers[i].id} (Rusak)</span></div>`;
            output.innerHTML += `<div>Pesan terhenti di Komputer ${computers[i].id} karena rusak.</div>`;
            break;
        }
        computers[i].message = message;
        output.innerHTML += `<div class="node-box"><span class="status-text">Komputer ${computers[i].id} (Baik)</span><span class="message-text">${computers[i].message}</span></div>`;
    }
});
