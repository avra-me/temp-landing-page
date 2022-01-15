const plugins = [
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'material',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'icons',
    ],
];

module.exports = {
    "presets": [
        "next/babel"
    ],
    plugins
}