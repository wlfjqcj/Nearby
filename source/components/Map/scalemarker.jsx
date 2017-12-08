const K_HINT_HTML_DEFAULT_Z_INDEX = 1000000;
const K_SCALE_HOVER = 1;
const K_SCALE_TABLE_HOVER = 1;
const K_SCALE_NORMAL = 0.65;
const K_MIN_CONTRAST = 0.4;

//https://github.com/istarkov/google-map-react-examples/blob/master/web/flux/components/examples/x_main/marker_example.jsx
function calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle) {
  const contrast = K_MIN_CONTRAST + (1 - K_MIN_CONTRAST) * Math.min(scale / K_SCALE_NORMAL, 1);

  return {
    transform: `scale(${scale} , ${scale})`,
    WebkitTransform: `scale(${scale} , ${scale})`,
    filter: `contrast(${contrast})`,
    WebkitFilter: `contrast(${contrast})`,
    ...markerStyle,
    ...zIndexStyle,
    ...imageStyle
  };
}

function calcMarkerTextStyle(scale, markerTextStyle) {
  const K_MAX_COLOR_VALUE = 0;
  const K_MIN_COLOR_VALUE = 8;
  const colorV = Math.ceil(K_MIN_COLOR_VALUE + (K_MAX_COLOR_VALUE - K_MIN_COLOR_VALUE) * Math.min(scale / K_SCALE_NORMAL, 1));
  const colorHex = colorV.toString(16);
  const colorHTML = `#${colorHex}${colorHex}${colorHex}`;

  return {
    ...markerTextStyle,
    color: colorHTML
  };
}
export {K_SCALE_NORMAL};


export default class scalemarker extends Component {
    static defaultProps = {
    scale: K_SCALE_NORMAL,
    hoverState: false,
    showBallonState: false,
    withText: false,
    size: {width: 62, height: 60},
    origin: {x: 15 / 62, y: 1},
    imageClass: 'map-marker__marker--big',
    hintType: 'hint--info'
  };
  constructor() {
      super();

  }
  render() {
      
  }

}
