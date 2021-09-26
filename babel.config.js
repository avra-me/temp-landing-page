const plugins = [
    [
        'babel-plugin-transform-imports',
        {
            '@material-ui/core': {
                'transform': '@material-ui/core/${member}',
                'preventFullImport': true
            },
            '@material-ui/styles': {
                'transform': '@material-ui/core/styles/${member}',
                'preventFullImport': true
            },
            '@material-ui/icons': {
                'transform': '@material-ui/icons/${member}',
                'preventFullImport': true
            },
            '@material-ui/lab': {
                'transform': '@material-ui/lab/${member}',
                'preventFullImport': true
            },
        },
        'lodash'
    ],
    "@babel/plugin-transform-react-jsx-source"
];

module.exports = {
    "presets": [
        "next/babel"
    ],
    plugins
}