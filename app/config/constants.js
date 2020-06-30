
const AUDIOSCROBBLER = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = '829751643419a7128b7ada50de590067';
export const TOP_ARTISTS = AUDIOSCROBBLER+'?method=geo.gettopartists&country=colombia&api_key='+API_KEY+'&format=json'; 
export const TOP_TRACKS = AUDIOSCROBBLER+'?method=geo.gettoptracks&country=colombia&api_key='+API_KEY+'&format=json'

//GOOGLE
export const GOOGLE_WEB_CLIENT_ID = '398779864022-iotehk33247e35rbgebt6lr6p8rnf002.apps.googleusercontent.com';//Secreto de cliente web: WDFW0lycTbOp9BeivWMheCjg
export const GOOGLE_IOS_CLIENT_ID = '448475332754-e2osute50r5ttbpdfjbpmr7mi687ag53.apps.googleusercontent.com';


//notifications message
export const MESSAGE_OFF_LINE = 'No podemos cargar la información';
export const MESSAGE_OFF_LINE2 = 'Por favor revisa tu conexión a internet';
