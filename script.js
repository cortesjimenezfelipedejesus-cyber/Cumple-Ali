// =========================================================
// 1. CONTROL INTERACTIVO Y TIEMPO DE MÚSICA
// =========================================================

const envoltura = document.querySelector(".envoltura-sobre");
const musica = document.getElementById("musica");

// PUNTO DE INICIO DE LA CANCIÓN EN SEGUNDOS:
// Si la canción tarda en sonar, pon aquí el segundo exacto donde empieza la música (ej. 4, 8, 12).
const segundoInicio = 5; 

envoltura.addEventListener("click", () => {
  envoltura.classList.toggle("abierto");

  if (envoltura.classList.contains("abierto")) {
    // Adelanta la canción al segundo deseado para que suene de inmediato
    musica.currentTime = segundoInicio; 
    
    musica.play().catch((error) => {
      console.log("El navegador bloqueó el inicio de audio:", error);
    });
  } else {
    musica.pause();
    musica.currentTime = segundoInicio; 
  }
});


// =========================================================
// 2. ANIMACIÓN DE CONFETI REALISTA (FÍSICA 3D CON ROTACIÓN)
// =========================================================

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particulas = [];
const colores = ["#ff4081", "#7c4dff", "#00e676", "#ffab00", "#00e5ff", "#ff80ab", "#ffeb3b"];

class ConfetiRealista {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Comienzan distribuidos arriba
    this.w = Math.random() * 8 + 6;          // Ancho de la tira
    this.h = Math.random() * 12 + 8;         // Largo de la tira
    this.speedY = Math.random() * 2 + 1.5;   // Velocidad de caída
    this.speedX = Math.random() * 1.5 - 0.75;// Viento lateral
    this.rotation = Math.random() * 360;     // Ángulo de rotación inicial
    this.rotationSpeed = Math.random() * 4 - 2; // Velocidad del giro
    this.oscillationSpeed = Math.random() * 0.03 + 0.01; // Velocidad del bamboleo
    this.color = colores[Math.floor(Math.random() * colores.length)];
    this.scaleY = 1; // Para simular el giro 3D sobre su propio eje
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * this.oscillationSpeed) + this.speedX;
    this.rotation += this.rotationSpeed;
    
    // Simula el volteo 3D cambiando la escala vertical
    this.scaleY = Math.cos(this.rotation * Math.PI / 180);

    // Si llega al final de la pantalla, vuelve arriba
    if (this.y > canvas.height + 20) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.scale(1, this.scaleY); // Efecto 3D de dar la vuelta
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

// Genera 80 papelitos para un efecto más denso y festivo
for (let i = 0; i < 80; i++) {
  particulas.push(new ConfetiRealista());
}

function animarConfeti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particulas.forEach((p) => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animarConfeti);
}

animarConfeti();