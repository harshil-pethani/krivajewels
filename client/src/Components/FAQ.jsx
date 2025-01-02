import React, { useState } from 'react'
import { faqQuestions, faqSectionTitle } from '../Config/Static_data';

const FAQ = () => {
    const [showAll, setShowAll] = useState(false);

    const displayedQuestions = showAll ? faqQuestions : faqQuestions.slice(0, 4);

    return (
        <div className="faqSection">
            <h1 className="section-title">
                {faqSectionTitle}
            </h1>

            <div className="questionsContainer">
                {
                    displayedQuestions.map((faqQuestion, index) => {
                        return (
                            <details key={index}>
                                <summary>
                                    <p className="que">
                                        {faqQuestion.que}
                                    </p>
                                    <p className="btn">
                                        +
                                    </p>
                                </summary>
                                {
                                    faqQuestion.ans.map((data, index) => (
                                        <p key={index} className="ans">
                                            {data}
                                        </p>
                                    ))
                                }
                            </details>
                        )
                    })
                }
            </div>

            <button style={{ marginTop: "15px" }} onClick={() => { setShowAll(!showAll) }} className="learnmore">
                {showAll ? 'Show less' : 'Show more'} <ion-icon name="arrow-forward"></ion-icon>
            </button>
        </div>
    )
}

export default FAQ