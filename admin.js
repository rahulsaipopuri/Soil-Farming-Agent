
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXLj4ANYp87IGcZNv9g8GvCp_IK5WL5b4",
    authDomain: "soil-farming-agent-25ce4.firebaseapp.com",
    projectId: "soil-farming-agent-25ce4",
    storageBucket: "soil-farming-agent-25ce4.appspot.com",
    messagingSenderId: "438017654039",
    appId: "1:438017654039:web:a91a293adf8cd55f720b52",
    measurementId: "G-HDJYNHH9SW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

window.logout = function () {
    signOut(auth)
        .then(() => {
            alert("Logout successful!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Logout failed: " + error.message);
        });
};

async function postSoilDetails() {
    const type = document.getElementById("soil-type").value.trim();
    const characteristics = document.getElementById("soil-characteristics").value.trim();
    const location = document.getElementById("soil-location").value.trim();
    const crop = document.getElementById("soil-crop").value.trim();

    if (!type || !characteristics || !location || !crop) {
        alert("Please fill in all soil fields.");
        return;
    }

    try {
        await addDoc(collection(db, "soils"), {
            type,
            characteristics,
            location,
            crop,
            createdAt: new Date().toISOString()
        });

        alert("✅ Soil info posted!");
        document.getElementById("soil-type").value = "";
        document.getElementById("soil-characteristics").value = "";
        document.getElementById("soil-location").value = "";
        document.getElementById("soil-crop").value = "";

        loadSoilDetails();
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

async function postDistributorDetails() {
    const name = document.getElementById("distributor-name").value.trim();
    const crop = document.getElementById("distributor-crop").value.trim();
    const location = document.getElementById("distributor-location").value.trim();
    const contact = document.getElementById("distributor-contact").value.trim();

    if (!name || !crop || !location || !contact) {
        alert("Please fill in all distributor fields.");
        return;
    }

    try {
        await addDoc(collection(db, "distributors"), {
            name,
            crop,
            location,
            contact,
            createdAt: new Date().toISOString()
        });

        alert("✅ Distributor info posted!");
        document.getElementById("distributor-name").value = "";
        document.getElementById("distributor-crop").value = "";
        document.getElementById("distributor-location").value = "";
        document.getElementById("distributor-contact").value = "";

        loadDistributorDetails();
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

async function loadSoilDetails() {
    const container = document.getElementById("soil-list");
    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "soils"));
    snapshot.forEach((doc) => {
        const soil = doc.data();
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <strong>Type:</strong> ${soil.type}<br>
            <strong>Characteristics:</strong> ${soil.characteristics}<br>
            <strong>Location:</strong> ${soil.location}<br>
            <strong>Crop:</strong> ${soil.crop}<br>
            <hr>
        `;
        container.appendChild(div);
    });
}

async function loadDistributorDetails() {
    const container = document.getElementById("distributor-list");
    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "distributors"));
    snapshot.forEach((doc) => {
        const d = doc.data();
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <strong>Name:</strong> ${d.name}<br>
            <strong>Crop:</strong> ${d.crop}<br>
            <strong>Location:</strong> ${d.location}<br>
            <strong>Contact:</strong> ${d.contact}<br>
            <hr>
        `;
        container.appendChild(div);
    });
}

window.addEventListener("load", () => {
    loadSoilDetails();
    loadDistributorDetails();
});
window.postSoilDetails = postSoilDetails;
window.postDistributorDetails = postDistributorDetails;
