/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_VIEWER,
})
module.exports = withBundleAnalyzer({})
