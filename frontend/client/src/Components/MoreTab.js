import styled from "styled-components";

const MoreTab = ({mostViews,mostVotes, mostAnswers, leastViews, leastVotes, leastAnswers, open}) => {
    return (
        <>{open? (<MoreTabCSS>
            <div className="wrapper">
                <div className="criteria">
                    most
                </div>
                <div className="criteria--sub first" onClick={mostViews}>views</div>
                <div className="criteria--sub" onClick={mostVotes}>votes</div>
                <div className="criteria--sub" onClick={mostAnswers}>answers</div>

                <div className="criteria least">
                    least
                </div>
                <div className="criteria--sub first" onClick={leastViews}>views</div>
                <div className="criteria--sub" onClick={leastVotes}>votes</div>
                <div className="criteria--sub" onClick={leastAnswers}>answers</div>
            </div>
        
        </MoreTabCSS>) : null }
        
        </>
    )
}

export default MoreTab;

const MoreTabCSS = styled.div`
.wrapper{
    display:flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    z-index: 1000;
    border-radius: 5px;
    border : 1px solid rgb(110,110,110,0.3);
}
.criteria{
    display:flex;
    background-color: rgba(227, 236, 243);
    color: rgba(110, 156, 159);
    border-radius: 3px;
    padding: 3px;
    padding-left: 5px; padding-right: 5px;
    &.least{
        margin-left: 50px;
    }
}
.criteria--sub{
    border-radius: 3px;
    padding: 3px;
    margin-left: 5px;
    color: rgb(135,140,146);
    cursor: pointer;
    &.first{
        margin-left: 13px;
    }
}


`