
const firebaseConfig = {
    apiKey: "AIzaSyAXLj4ANYp87IGcZNv9g8GvCp_IK5WL5b4",
    authDomain: "soil-farming-agent-25ce4.firebaseapp.com",
    projectId: "soil-farming-agent-25ce4",
    storageBucket: "soil-farming-agent-25ce4.appspot.com", 
    messagingSenderId: "438017654039",
    appId: "1:438017654039:web:a91a293adf8cd55f720b52",
    measurementId: "G-HDJYNHH9SW"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const allowedAdmins = ["admin@gmail.com"];

function showForm(formType) {
    const adminForm = document.getElementById("adminloginform");
    const userContainer = document.getElementById("userContainer");
    const adminContainer = document.getElementById("adminContainer");
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const backToUserBtn = document.getElementById("backToUserBtn");
    const adminLoginBtn = document.getElementById("adminLoginBtn");

    adminForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    loginForm.classList.add("hidden");
    userContainer.style.display = "none";
    adminContainer.style.display = "none";

    backToUserBtn.classList.add("hidden");
    adminLoginBtn.classList.remove("hidden");

    if (formType === "register") {
        userContainer.style.display = "block";
        registerForm.classList.remove("hidden");
    } else if (formType === "login") {
        userContainer.style.display = "block";
        loginForm.classList.remove("hidden");
    } else if (formType === "admin") {
        adminContainer.style.display = "block";
        adminForm.classList.remove("hidden");
        backToUserBtn.classList.remove("hidden");
        adminLoginBtn.classList.add("hidden");
    }
}

function registerUser() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all the fields.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.updateProfile({ displayName: name })
                .then(() => user.sendEmailVerification())
                .then(() => {
                    alert("✅ Registration successful! Verification email sent.");
                    document.getElementById("regName").value = "";
                    document.getElementById("regEmail").value = "";
                    document.getElementById("regPassword").value = "";
                    showForm("login");
                });
        })
        .catch((error) => {
            console.error("Registration Error:", error);
            alert("❌ Error: " + error.message);
        });
}

function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
                alert("❌ Email not verified! Check your inbox.");
                auth.signOut();
                return;
            }

            alert("✅ Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch(() => {
            alert("Error: Please enter a valid email and password.");
        });
}

function adminLogin() {
    const adminEmail = document.getElementById("adminEmail").value.trim();
    const adminPass = document.getElementById("adminPassword").value.trim();

    if (adminPass === "admin2005") {
        if (!allowedAdmins.includes(adminEmail)) {
            alert("❌ Access Denied: Not a valid admin email.");
            return;
        }

        auth.signInWithEmailAndPassword(adminEmail, adminPass)
            .then(() => {
                alert("✅ Welcome Admin!");
                window.location.href = "admin.html";
            })
            .catch((error) => {
                alert("❌ Firebase Auth Error: " + error.message);
            });
    } else {
        alert("❌ Wrong Admin Password");
    }
}

function forgotPassword() {
    const email = document.getElementById("loginEmail").value.trim();

    if (!email) {
        alert("⚠️ Enter your email first.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("📧 Password reset email sent.");
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
}

window.onload = function () {
    showForm("login");
};
