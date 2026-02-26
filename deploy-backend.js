const payload = {
    type: "web_service",
    name: "mern-portfolio-backend",
    ownerId: "tea-d64cfti4d50c73ebf6vg",
    repo: "https://github.com/MohammedAljalal/MyPortfolio",
    branch: "main",
    rootDir: "backend",
    serviceDetails: {
        env: "node",
        envSpecificDetails: {
            buildCommand: "npm install",
            startCommand: "npm start"
        },
        envVars: [
            { key: "MONGO_URI", value: "mongodb+srv://mohammedalgalalalgalal8_db_user:R1pWKvuz55ZpoCFD@cluster0.fd1nezo.mongodb.net/mern-portfolio", generateValue: false },
            { key: "JWT_SECRET", value: "supersecretportfoliojwtkey_change_in_production", generateValue: false },
            { key: "CLOUDINARY_CLOUD_NAME", value: "portfolio", generateValue: false },
            { key: "CLOUDINARY_API_KEY", value: "851337949439289", generateValue: false },
            { key: "CLOUDINARY_API_SECRET", value: "_w9EicGwQGWE1sn9zlvJPIweFhI", generateValue: false }
        ]
    }
};

fetch('https://api.render.com/v1/services', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer rnd_OMYRaW81FhkeLwkKSBucHYjKBkbV',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        console.log('STATUS:', status);
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => console.error(err));
