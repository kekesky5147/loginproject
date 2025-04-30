module.exports = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  swcMinify: true,
  async headers () {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000' // 클라이언트에서 호출하는 도메인 주소
          }
        ]
      }
    ]
  }
}
