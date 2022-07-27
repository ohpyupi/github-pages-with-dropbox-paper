const convertMapToFrontMatter = (map) => {
    let result = '';
    result += '---\n';
    for (const [key, value] of Object.entries(map)) {
        result += `${key}: ${value}\n`;
    }
    result += '---\n';
    return result;
};

module.exports = {
    convertMapToFrontMatter
};
