import styled from 'styled-components';
import { React, useState, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';

function Accordion(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
  }

  return (
    <Div>
      <div className="accordion__section">
        <div>{props.src}</div>
        <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
          <p className="accordion__title">{props.title}</p>
          <GoChevronDown className={`${setRotate}`} width={10} fill={'#777'} />
        </button>
        <div
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
          className="accordion__content"
        >
          <div
            className="accordion__text"
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </div>
      </div>
    </Div>
  );
}
export default Accordion;

const Div = styled.div`
  display: flex;
  flex-direction: column;

  .accordion {
    border: none;
    border-radius: 3%;
    box-shadow: 1px 1px 10px lightgrey;
    background-color: white;
    width: 270px;
    height: 60px;
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .accordion:hover .active {
    background-color: grey;
  }

  .accordion__icon {
    margin-left: auto;
    transition: transform 0.6s ease;
  }

  .accordion__content {
    overflow: hidden;
    background-color: white;
  }

  .accordion__title {
    padding-left: 20px;
  }
`;
