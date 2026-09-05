// Panda Drum landing page — countdown timers
// Two banners on the page each run their own countdown, seeded from
// the numbers already printed in the markup so the page still looks
// right if JS fails to load.

function startCountdown(hoursEl, minutesEl, secondsEl) {
  if (!hoursEl || !minutesEl || !secondsEl) return;

  let totalSeconds =
    parseInt(hoursEl.textContent, 10) * 3600 +
    parseInt(minutesEl.textContent, 10) * 60 +
    parseInt(secondsEl.textContent, 10);

  function pad(n) {
    return n.toString().padStart(2, "0");
  }

  function render() {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    hoursEl.textContent = pad(h);
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  }

  render();

  setInterval(() => {
    if (totalSeconds <= 0) {
      // deal "resets" so the banner never looks stale on a long visit
      totalSeconds = 24 * 3600 - 1;
    } else {
      totalSeconds -= 1;
    }
    render();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  startCountdown(
    document.getElementById("t-hrs"),
    document.getElementById("t-min"),
    document.getElementById("t-sec")
  );

  startCountdown(
    document.getElementById("o-hrs"),
    document.getElementById("o-min"),
    document.getElementById("o-sec")
  );

  startCountdown(
    document.getElementById("b-hrs"),
    document.getElementById("b-min"),
    document.getElementById("b-sec")
  );

  // Comparison table: on narrow screens the table scrolls horizontally.
  // Update the little progress bar under it as the person swipes.
  const scroller = document.querySelector(".compare__scroller");
  if (scroller) {
    scroller.addEventListener("scroll", () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const ratio = max > 0 ? scroller.scrollLeft / max : 0;
      scroller.style.setProperty("--scroll-ratio", ratio.toFixed(3));
    });
  }

  // Smooth-scroll the "Save up to $200" CTA down to the plan table.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
