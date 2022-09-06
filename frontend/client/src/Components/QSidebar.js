import styled from 'styled-components';
import Accordion from './Accordion';
import oneimg from '../assets/number1.png';
import twoimg from '../assets/number2.png';
import threeimg from '../assets/number3.png';

const QSidebar = () => {
  return (
    <div>
      <Div>
        Step 1: Draft your question
        <Ptag>
          <div>
            <p>
              The community is here to help you with specific coding, algorithm,
              or language problems.
            </p>
          </div>
          <div>
            <p>Avoid asking opinion-based questions.</p>
          </div>
          <div className="accordian">
            <img className="accordion_img" alt="numberImg" src={oneimg} />
            <Accordion
              className="1"
              title="Summarize the problem"
              content="* Include details about your goal
              <br />* Describe expected and actual results
              <br />* Include any error messages"
            />
            <img className="accordion_img" alt="numberImg" src={twoimg} />
            <Accordion
              title="Descibe what you've tried"
              content="Show what you’ve tried and tell us what
              <br />you found (on this site or elsewhere) and
              <br />why it didn’t meet your needs. You can get better answers when you provide 
              <br />research."
            />
            <img className="accordion_img" alt="numberImg" src={threeimg} />
            <Accordion
              title="Show some code"
              content="When appropriate, share the minimum
              <br />amount of code others need to reproduce
              <br />your problem (also called a minimum, 
              <br />reproducible example)"
            />
          </div>
        </Ptag>
      </Div>
    </div>
  );
};

export default QSidebar;

const Div = styled.div`
  border-radius: 2%;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 400px; //580px
  background-color: rgb(247, 247, 247);
  margin: 0;
  padding: 10px;
  font-size: 13px;

  .accordion_img {
    position: relative;
    top: 39px;
    width: 20px;
  }
`;

const Ptag = styled.div`
  width: 270px;
  height: 250px;
  background-color: white;
  margin-top: 10px;
`;
