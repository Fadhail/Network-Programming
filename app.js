let computers = [];

document.getElementById("setupNodes").addEventListener("click", function() {
    const numNodes = parseInt(document.getElementById("numNodes").value);
    const output = document.getElementById("output");
    const instruction = document.getElementById("instruction");
    const senderSelect = document.getElementById("senderSelect");
    const receiverSelect = document.getElementById("receiverSelect");

    // Tambahkan teks instruksi
    instruction.textContent = "Tekan kotak untuk mengubah status rusak atau normalnya komputer";

    output.innerHTML = '';
    computers = [];
    senderSelect.innerHTML = '<option value="">Pilih Pengirim</option>';
    receiverSelect.innerHTML = '<option value="">Pilih Penerima</option>';

    // Tampilkan kotak komputer
    for (let i = 1; i <= numNodes; i++) {
        const isBroken = false;
        computers.push(isBroken);

        const nodeBox = document.createElement("div");
        nodeBox.className = "node-box";
        nodeBox.id = `computer${i}`;
        nodeBox.innerHTML = `<span class="status-text">Komputer ${i} (Normal)</span>`;

        // Tambahkan event listener untuk mengubah status saat diklik
        nodeBox.addEventListener("click", function() {
            computers[i - 1] = !computers[i - 1];
            updateNodeBox(nodeBox, i);
        });

        output.appendChild(nodeBox);

        // Tambahkan pilihan ke dropdown
        let optionSender = document.createElement("option");
        optionSender.value = i;
        optionSender.text = `Komputer ${i}`;
        senderSelect.appendChild(optionSender);

        let optionReceiver = document.createElement("option");
        optionReceiver.value = i;
        optionReceiver.text = `Komputer ${i}`;
        receiverSelect.appendChild(optionReceiver);
    }

    // Buat elemen untuk menampilkan pesan berhenti
    const stopMessage = document.createElement("div");
    stopMessage.id = "stopMessage";
    stopMessage.style.marginTop = "20px";
    output.appendChild(stopMessage);
});

// Fungsi untuk memperbarui tampilan kotak komputer
function updateNodeBox(nodeBox, index) {
    const isBroken = computers[index - 1]; // Ambil status dari array
    nodeBox.className = isBroken ? "node-box broken" : "node-box"; // Update kelas
    nodeBox.innerHTML = `<span class="status-text">Komputer ${index} (${isBroken ? "Rusak" : "Normal"})</span>`; // Update teks
}

// Fungsi untuk mengirim data dari pengirim ke penerima
document.getElementById("sendData").addEventListener("click", function() {
    const sender = parseInt(document.getElementById("senderSelect").value);
    const receiver = parseInt(document.getElementById("receiverSelect").value);
    const stopMessage = document.getElementById("stopMessage");

    if (!sender || !receiver) {
        stopMessage.innerHTML = "<strong>Pilih pengirim dan penerima terlebih dahulu!</strong>";
        return;
    }

    // Jika pengirim dan penerima sama, tampilkan pesan kesalahan
    if (sender === receiver) {
        stopMessage.innerHTML = "<strong>Pengirim dan penerima tidak boleh sama!</strong>";
        return;
    }

    // Tentukan arah pengiriman (dari pengirim ke penerima, atau sebaliknya)
    const start = Math.min(sender, receiver);
    const end = Math.max(sender, receiver);

    let message = "";
    let dataStopped = false;

    // Cek komputer dari pengirim ke penerima dalam urutan berurutan
    for (let i = start; i <= end; i++) {
        if (computers[i - 1]) { 
            message = `Data terhenti di komputer ${i}`; 
            dataStopped = true;
            break; 
        }
    }

    // Jika data tidak terhenti, maka berhasil terkirim
    if (!dataStopped) {
        message = `Data berhasil dikirim dari Komputer ${sender} ke Komputer ${receiver}`;
    }

    // Tampilkan hasil
    stopMessage.innerHTML = `<strong>${message}</strong>`;
});
