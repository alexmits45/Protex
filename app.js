// 🔹 Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1ZN3FisKZoRoJY4XInerpgUjjqv0d-8I",
  authDomain: "protex-93fae.firebaseapp.com",
  projectId: "protex-93fae",
  storageBucket: "protex-93fae.firebasestorage.app",
  messagingSenderId: "111543961960",
  appId: "1:111543961960:web:27e19f920f08a7126e6edd"
};

// 🔹 Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// 👉 GUARDAR RECARGA
// ==========================
document.getElementById("recargar").addEventListener("click", async () => {
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  const correoUsuario = localStorage.getItem("correoUsuario");
  const codigoUsuario = localStorage.getItem("codigoUsuario");

  await addDoc(collection(db, "recargas"), {
    nombre: nombreUsuario,
    correo: correoUsuario,
    codigo: codigoUsuario,
    fecha: new Date(),
    estado: "pendiente"
  });

  alert("Recarga enviada y guardada en Firebase 🔥");
});

// ==========================
// 👉 LEER RECARGAS (ADMIN)
// ==========================
async function cargarRecargas() {
  const querySnapshot = await getDocs(collection(db, "recargas"));
  const contenedor = document.getElementById("listaRecargas");
  contenedor.innerHTML = "";

  querySnapshot.forEach((docu) => {
    const data = docu.data();
    contenedor.innerHTML += `
      <div>
        <b>${data.nombre}</b> — ${data.correo} — ${data.codigo} — ${data.estado}
        <button onclick="aprobarRecarga('${docu.id}')">Aprobar</button>
      </div>
    `;
  });
}

window.cargarRecargas = cargarRecargas;

// ==========================
// 👉 APROBAR RECARGA
// ==========================
window.aprobarRecarga = async (id) => {
  const ref = doc(db, "recargas", id);
  await updateDoc(ref, { estado: "aprobado" });
  cargarRecargas();
};