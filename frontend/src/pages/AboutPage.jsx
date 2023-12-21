import { Container } from "react-bootstrap";

const AboutPage = () => {
    return (
      <Container id="about">
      <h2>AboutPage</h2>
      <p>
        This is a simple application to manage a sporting league. It allows users to register and login to create a league, add teams to the league, and schedule games between teams. Coaches have the ability to add games to the team's schedule, update the game date, time, and location. There is a weather forecast for the next 5 days to give insight to weather condition for upcoming games. The Google Maps integration shows the location of the next game for a team. 
      </p>
      <p>
        Features coming soon: Team communication hub for coaches to leave messages for the team. Track teams win/loss record for a season and display league standings. 
      </p>
      </Container>
    );
  };
  
  export default AboutPage;