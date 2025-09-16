function handleResponse(event) {
    const data = event.data;
    const source = data.source;
    const payload = data.payload;
    const command = data.command;
    if (source == "EXTENSION") {
        console.log(event);
        switch (command) {
            case "get_macs":
                console.log(payload.macs)
                if (payload.macs) {
                    document.getElementById("status-ekstensi").classList.remove("not");
                    document.getElementById("status-text").innerText = "Terinstall";
                    addSelectMacAddress(payload.macs);
                }
                break;
            case "version":
                console.log(payload.version);
                if (payload.version) {
                    window.postMessage({ source: "page", command: "get_macs" });
                }
                break;
            default:
                console.log("UNKNOWN", payload);
                break;
        }
    }
}
function addSelectMacAddress(macs) {

    const select = document.createElement("select");
    for (const mac of macs) {
        const option = document.createElement("option");
        option.value = mac;
        option.innerText = mac;
        select.appendChild(option);
    }
    document.body.appendChild(select);
}
window.addEventListener("message", handleResponse);
document.addEventListener("DOMContentLoaded", function () {
    window.postMessage({ source: "page", command: "version" });
})