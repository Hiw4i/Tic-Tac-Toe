gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5, // скорость сглаживания (чем больше — тем мягче)
    effects: true // включает анимации прокрутки (если нужны)
  })

function download() {
  document.getElementById("audio").play()
  link.href = "TicTacToe.rar"

}
