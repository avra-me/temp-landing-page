const plugins = [
    [
        'babel-plugin-transform-imports',
        {
            '@mui/material': {
                'transform': '@mui/material/${member}',
                'preventFullImport': true
            },
            '@mui/styles': {
                'transform': '@mui/material/styles/${member}',
                'preventFullImport': true
            },
            '@mui/icons-material': {
                'transform': '@mui/icons-material/${member}',
                'preventFullImport': true
            },
            '@mui/lab': {
                'transform': '@mui/lab/${member}',
                'preventFullImport': true
            },
        },
        'lodash'
    ]
];

module.exports = {
    "presets": [
        "next/babel"
    ],
    plugins
}