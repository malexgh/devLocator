module.exports =
    function parseTechs(techs) {
        return techs.split(',').map(tech => tech.trim());
    };
