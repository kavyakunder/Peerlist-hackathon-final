import landingPageStyles from "../styles/landingPage.module.css";
import InterviewScreen from "../assets/interview sample image.jpg";

export default function LandingPage() {
  return (
    <main className={landingPageStyles.app}>
      <section className={landingPageStyles.container}>
        <div className={landingPageStyles.content}>
          <h1 className={landingPageStyles.heroText}>
            Ace Your Interviews with AI Precision
          </h1>
          <p className={landingPageStyles.description}>
            Q&Ace is your AI-powered interview coach. Experience realistic mock
            interviews, get personalized feedback, and master every question.
          </p>
          <button className={landingPageStyles.startButton}>Start</button>
        </div>
      </section>

      <section className={landingPageStyles.container}>
        <img src={InterviewScreen} alt="Interview screen" />
      </section>

      <section
        className={`${landingPageStyles.bulletPointsSection} ${landingPageStyles.container}`}
      >
        <div className={landingPageStyles.bulletPoints}>
          <h4 className={landingPageStyles.bulletTitle}>
            AI-Powered Interview Simulation
          </h4>
          <p className={landingPageStyles.bulletDescription}>
            Experience realistic mock interviews powered by advanced AI
            algorithms. Practice answering a wide range of interview questions
            tailored to various industries and roles.
          </p>
        </div>
        <div className={landingPageStyles.bulletPoints}>
          <h4 className={landingPageStyles.bulletTitle}>
            Intense Interview Preparation
          </h4>
          <p className={landingPageStyles.bulletDescription}>
            Access a comprehensive library of interview tips, strategies, and
            resources curated by industry experts. From resume building to
            mastering behavioral interviews
          </p>
        </div>
        <div className={landingPageStyles.bulletPoints}>
          <h4 className={landingPageStyles.bulletTitle}>
            Real-Time Performance Analytics
          </h4>
          <p className={landingPageStyles.bulletDescription}>
            Track your interview performance with detailed analytics and
            progress reports. Gain insights into your strengths and areas for
            improvement based on metrics such as response clarity.
          </p>
        </div>
      </section>
    </main>
  );
}
