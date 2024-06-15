import landingPageStyles from "../styles/landingPage.module.css";

export default function LandingPage() {
  return (
    <main className={`${landingPageStyles.app}`}>
      <div className={`${landingPageStyles.container}`}>
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
      </div>
    </main>
  );
}
