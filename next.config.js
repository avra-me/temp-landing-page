/** @type {import('next').NextConfig} */
const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_VIEWER,
})
const withTM = require('next-transpile-modules')(['react-anime']);

module.exports = withBundleAnalyzer(withTM({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        config.resolve.alias["@files"] = path.resolve(__dirname, 'public')

        return config;
    }
}))
