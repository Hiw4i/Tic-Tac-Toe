let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
let velocity = 0;
let animationFrameId = null;

// Параметры
const smoothness = 0.01; // влияет на плавность
const maxSpeed = 50; // максимум скорости

// Обработчик колесика
window.addEventListener('wheel', function(e) {
  e.preventDefault();

  // Обновляем целевую позицию
  targetScroll += e.deltaY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

  if (!animationFrameId) {
    // Перед стартом анимации синхронизируем targetScroll с текущим положением
    targetScroll = window.scrollY;
    animate();
  }
}, { passive: false });

// Обработчик кнопки
document.getElementById('scrollDownBtn').addEventListener('click', function() {
  // Перед стартом анимации синхронизируем targetScroll с текущим положением
  targetScroll = window.scrollY;

  targetScroll += 800; // добавляем прокрутку
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

  if (!animationFrameId) {
    animate();
  }
});

function animate() {
  // Обновляем текущий скролл
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  const delta = targetScroll - currentScroll;

  // Обновляем скорость
  velocity += delta * smoothness;
  velocity = Math.max(-maxSpeed, Math.min(maxSpeed, velocity));

  currentScroll += velocity;

  // Ограничиваем текущий скролл в пределах
  if (currentScroll < 0) currentScroll = 0;
  if (currentScroll > maxScroll) currentScroll = maxScroll;

  window.scrollTo(0, currentScroll);

  // Демпфирование скорости
  velocity *= 0.8;

  // Продолжаем анимацию, если есть необходимость
  if (Math.abs(delta) > 0.5 || Math.abs(velocity) > 0.5) {
    animationFrameId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}