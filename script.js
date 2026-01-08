function register_student() {
    // Get values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;

    // Basic validation
    if (name === "" || email === "" || password === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    // Data to send to backend
    const data = {
        name: name,
        email: email,
        password: password,
        role: "Student"   // role is fixed as Student
    };

    // Send data to backend using fetch
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);   // "Inserted successfully"
        
        // Clear form after success
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("course").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Registration failed");
    });
}


// --------------------------------------------------


function register_volunteer() {
    // Get values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const course = document.getElementById("skills").value;

    // Basic validation
    if (name === "" || email === "" || password === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    // Data to send to backend
    const data = {
        name: name,
        email: email,
        password: password,
        role: "volunteer"   // role is fixed as Student
    };

    // Send data to backend using fetch
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);   // "Inserted successfully"
        
        // Clear form after success
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("course").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Registration failed");
    });
}

// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

function register_ngo() {
    // Get values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const course = document.getElementById("sector").value;

    // Basic validation
    if (name === "" || email === "" || password === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    // Data to send to backend
    const data = {
        name: name,
        email: email,
        password: password,
        role: "NGO"   // role is fixed as Student
    };

    // Send data to backend using fetch
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);   // "Inserted successfully"
        
        // Clear form after success
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("sector").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Registration failed");
    });
}

// --------------------------------------------------
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Invalid login");
        }
        return res.json();
    })
    .then(data => {
        alert(data.message);

        // Role-based redirect
        if (data.user.role === "Student") {
            window.location.href = "dashboard.html";
        } else if (data.user.role === "NGO") {
            window.location.href = "dashboard.html";
        } else if (data.user.role === "Volunteer") {
            window.location.href = "dashboard.html";
        }
    })
    .catch(err => {
        alert("Invalid email or password");
    });
}


/// From dashboard.html
function goToEnroll(program) {
    window.location.href = "enrollment.html?program=" + encodeURIComponent(program);
}

// Runs on enrollment.html
document.addEventListener("DOMContentLoaded", function () {
    const programSpan = document.getElementById("programName");

    if (programSpan) {
        const params = new URLSearchParams(window.location.search);
        const program = params.get("program");
        programSpan.innerText = program || "No program selected";
    }
});

// CONFIRM ENROLLMENT → SAVE TO DB
function confirmEnroll() {
    const program = document.getElementById("programName").innerText;

    fetch("http://localhost:3000/enroll", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ program })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        window.location.href = "dashboard.html";
    })
    .catch(err => {
        alert("Enrollment failed");
        console.error(err);
    });
}




