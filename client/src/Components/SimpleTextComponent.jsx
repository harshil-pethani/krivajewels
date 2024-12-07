import React from 'react'

const SimpleTextComponent = ({ data, title, subtitle }) => {

    return (
        <div className='simple-text-component'>
            <p className="section-title">
                {title}
            </p>
            {
                subtitle &&
                <p className="main-sub-title">
                    {subtitle}
                </p>
            }
            <div className="text-content-container">
                {
                    data?.map((dataInstance, i) => (
                        <div key={i} className="text-content">
                            <p className="content-title">
                                {i + 1}. {dataInstance.que}
                            </p>
                            {
                                dataInstance?.hasSubQue === true ?
                                    dataInstance?.ans?.map((subData, j) => (
                                        <div key={j} className="content-description">
                                            <p className="content-sub-title">
                                                {subData.que}
                                            </p>
                                            {
                                                subData?.ans?.map((ansInstance, k) => (
                                                    <p key={k}>
                                                        {ansInstance}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    ))
                                    :
                                    (
                                        <div className="content-description">
                                            {
                                                dataInstance?.ans?.map((ansInstance, l) => (
                                                    <p key={l}>
                                                        {ansInstance}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SimpleTextComponent