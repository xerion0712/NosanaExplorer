// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/styles/global.scss'],
  modules: ['@nuxtjs/google-fonts', '@vueuse/nuxt'],
  app: {
    head: {
      script: [{ src: '/main.js' }],
      title: 'Job Creator',
    },
  },
  googleFonts: {
    preload: true,
    families: {
      Lexend: [300, 400, 700],
      Inconsolata: [300, 400, 500, 600, 700],
    },
  },
  runtimeConfig: {
    public: {
      ipfsJwt: process.env.IPFS_JWT,
      backendUrl: process.env.BACKEND_URL,
    },
  },
  routeRules: {
    '/**': {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
    server: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
  },
});
