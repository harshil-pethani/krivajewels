import React from 'react'
import { faqQuestions, faqSectionTitle } from '../Config/Static_data';

const FAQ = () => {
    return (
        <div className="faqSection">
            <h1 className="section-title">
                {faqSectionTitle}
            </h1>

            <div className="questionsContainer">
                {
                    faqQuestions.map((faqQuestion, index) => {
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
                                        <p className="ans">
                                            {data}
                                        </p>
                                    ))
                                }
                            </details>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FAQ