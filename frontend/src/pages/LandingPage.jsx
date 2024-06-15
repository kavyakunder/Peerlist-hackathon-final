import landingPageStyles from "../styles/landingPage.module.css";

export default function LandingPage() {
  return (
    <main className={`${landingPageStyles.app}`}>
      <section className={`${landingPageStyles.container}`}>
        <div className={`${landingPageStyles.content}`}>
          <h1 className={`${landingPageStyles.heroText}`}>
            Ace Your Interviews with AI Precision
          </h1>
          <p className={`${landingPageStyles.description}`}>
            Q&Ace is your AI-powered interview coach. Experience realistic mock
            interviews, get personalized feedback, and master every question.
          </p>
          <button className={`${landingPageStyles.startButton}`}>Start</button>
        </div>
      </section>

      <section
        className={`${landingPageStyles.bulletPointsSection} ${landingPageStyles.container}`}
      >
        <div>
          <h4>AI-Powered Interview Simulation</h4>
          <p>
            Experience realistic mock interviews powered by advanced AI
            algorithms. Practice answering a wide range of interview questions
            tailored to various industries and roles.
          </p>
        </div>
        <div>
          <h4>title</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            repellat nihil enim quaerat magni doloribus, facere temporibus
            praesentium
          </p>
        </div>
        <div>
          <h4>title</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            repellat nihil enim quaerat magni doloribus, facere temporibus
            praesentium
          </p>
        </div>
      </section>
    </main>
  );
}
