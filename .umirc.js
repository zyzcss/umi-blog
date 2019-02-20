
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'blog',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
      /* pwa:{
        workboxOptions: {
          importWorkboxFrom: 'local',
        }
      } */
    }],
  ],
  history: 'hash',
  targets: {
    ie: 10,
  },
}
