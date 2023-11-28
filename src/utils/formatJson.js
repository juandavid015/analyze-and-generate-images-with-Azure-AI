export const formatJsonString = (jsonString) => {
    let indentLevel = 0;
    const tokens = jsonString.match(/(".*?"|\d+|\[|\]|\{|\}|\w+|\S)\s*|\n|\r/g) || [];

    return tokens.map(token => {
        const isOpeningBrace = token === '{' || token === '[';
        const isClosingBrace = token === '}' || token === ']';
        const isKey = token.endsWith(':');

        let formattedToken = token;

        if (isClosingBrace) {
            indentLevel = Math.max(0, indentLevel - 1);
            formattedToken = `\n${' '.repeat(indentLevel * 4)}${token}`;
        } else if (isOpeningBrace) {
            formattedToken = `${token}\n${' '.repeat(++indentLevel * 4)}`;
        } else if (isKey) {
            formattedToken = `\n${' '.repeat(indentLevel * 4)}${token} `;
        } else {
            formattedToken = `${token} `;
        }

        return formattedToken;
    }).join('');
};