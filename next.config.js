/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_VIEWER,
})
const withTM = require('next-transpile-modules')(['react-anime']);

module.exports = withBundleAnalyzer(withTM({}))
