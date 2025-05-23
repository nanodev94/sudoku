import withPlugins from 'next-compose-plugins'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextIntlPlugin = createNextIntlPlugin()

const nextConfig: NextConfig = {
  /* config options here */
}

const plugins = [nextIntlPlugin]

export default withPlugins(plugins, nextConfig)
