/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_VIEWER,
})
const withPreact = require('next-plugin-preact');

module.exports = withBundleAnalyzer(withPreact({
    /* regular next.js config options here */
}))
