import homeCover from './assets/specimens/home-cover.webp';

// Mobile-first home / splash screen — full-bleed high-saturation color cover with minimal copy.
export function HomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="home-screen" aria-labelledby="home-title">
      <div className="home-cover" style={{ backgroundImage: `url(${homeCover})` }} aria-hidden="true" />
      <div className="home-veil" aria-hidden="true" />
      <div className="home-top"><i className="home-dot" aria-hidden="true" />WEIRD MATTER <b>LAB</b></div>
      <div className="home-copy">
        <p className="home-eyebrow">A tiny universe in your hands</p>
        <h1 id="home-title">Make matter<br /><em>misbehave.</em></h1>
        <span>Paint it, mix it, and watch a tiny universe react for real.</span>
        <button className="home-cta" onClick={onEnter}>Enter the Lab <span aria-hidden="true">→</span></button>
      </div>
      <footer className="home-foot">An original science sandbox · No real-world hazards</footer>
    </main>
  );
}
