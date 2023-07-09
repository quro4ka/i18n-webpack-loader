module.exports = function loader(source) {
    const options = this?.getOptions();

    const isInternIndex = source.search(/i18n\(/);

    if (isInternIndex !== -1) {
        const INTERN = getIntern(isInternIndex);
        source = replaceIntern(source, INTERN);
        source = replaceCall(source);
    }

    function getIntern(isInternIndex) {
        let str = '';
        let i = isInternIndex;

        while (source[i] !== ')') {
            str += source[i];
            i++;
        }

        return str.split('(')[1].replaceAll("'", '');
    }

    function replaceIntern(source, intern) {
        return source.replaceAll(intern, options[intern]);
    }

    function replaceCall(source) {
        source = source.replaceAll("{i18n('", '');
        return source.replaceAll("')}", '');
    }

    return source;
};
