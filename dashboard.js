
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
const db = getFirestore();
const auth = getAuth();

async function loadSoilDetails() {
    const container = document.getElementById("soil-list");
    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "soils"));
    snapshot.forEach((doc) => {
        const soil = doc.data();

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><strong>Type:</strong> ${soil.type}</p>
            <p><strong>Characteristics:</strong> ${soil.characteristics}</p>
            <p><strong>Location:</strong> ${soil.location}</p>
            <p><strong>Crop:</strong> ${soil.crop}</p>
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
        const distributor = doc.data();

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><strong>Name:</strong> ${distributor.name}</p>
            <p><strong>Crop:</strong> ${distributor.crop}</p>
            <p><strong>Location:</strong> ${distributor.location}</p>
            <p><strong>Contact:</strong> ${distributor.contact}</p>
            <hr>
        `;
        container.appendChild(div);
    });
}

function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully.");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Logout failed: " + error.message);
        });
}

window.addEventListener("load", () => {
    loadSoilDetails();
    loadDistributorDetails();
});

window.logout = logout;
