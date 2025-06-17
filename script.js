// Можно просто обновить targetScroll, чтобы кнопка тоже работала через наш механизм
document.getElementById('scrollDownBtn').addEventListener('click', function() {
  targetScroll += 800;
  targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
  if (!animationFrameId) {
    animate();
  }
});

// document.getElementById('scrollDownBtn').addEventListener('click', function() {

// window.scrollBy({ top: 800, behavior: 'smooth' });
// });




let targetScroll = window.scrollY;
let currentScroll = window.scrollY;
let velocity = 0;
let animationFrameId = null;

// Параметры
const smoothness = 0.01; // чем меньше, тем плавнее, но медленнее реагирует
const maxSpeed = 50; // максимум скорости в px за кадр

window.addEventListener('wheel', function(e) {
  e.preventDefault();

  // Обновляем целевую позицию
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));

  // Запускаем плавное движение
  if (!animationFrameId) {
    animate();
  }
}, { passive: false });

function animate() {
  // Расчет разницы
  const delta = targetScroll - currentScroll;

  // Обновляем скорость с учетом разницы
  velocity += delta * smoothness;
  // Ограничиваем скорость
  velocity = Math.max(-maxSpeed, Math.min(maxSpeed, velocity));

  // Обновляем текущую позицию
  currentScroll += velocity;

  // Переходим к новой позиции
  window.scrollTo(0, currentScroll);

  // Замедляем скорость (эффект инерции)
  velocity *= 0.8; // демпфирование

  // Проверяем, нужно ли продолжать анимацию
  if (Math.abs(delta) > 0.5 || Math.abs(velocity) > 0.5) {
    animationFrameId = requestAnimationFrame(animate);
  } else {
    // Останавливаем анимацию, если достаточно близко
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}