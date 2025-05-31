import React from "react";

export const renderDescription = (text) => {
    if (!text) return null;
    const lines = text.split('&&');

    return lines.map((line, lineIndex) => {
        const parts = line.split(/\$\$(.*?)\$\$/g);

        return (
            <React.Fragment key={lineIndex}>
                {parts.map((part, index) =>
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
                {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
        );
    });
};