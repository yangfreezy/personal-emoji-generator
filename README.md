An app that allows you to save AI generated emojis of your face!

<b> Input: </b> <br />
Any number of images that includes a face, accepted filetypes: .jpg, .gif, .png <br />
<b> Output: </b> <br />
Zip file of emojis in png format<br />

<b> Data Flow: </b> <br />
- On app load, Mirror AI API token is automatically retrieved. <br />
- User uploads images and they're displayed as a list. When generate is clicked we pass the files along to Mirror AI API, then   save the URLs to later be retrieved as B64 and converted into blobs. 
- When generate button is clicked, we open up a new zip file with jszip, make calls to generated emoji URLS, rewrite the file     names to be .png, save them as blobs, then use file-saver to write the zip file directly to user's downloads. 

<b> Design: </b> <br />
Followed a Component / Container / Layouts architecture pattern. <br />
Components - Atomic units of functionality, only components contained by components are layouts or imported components  <br />
Container - Contains one or more components <br />
Layouts - Styled div with children props (can be customized for more declarative syntax, ie: Column or Row) <br />

<b> Notable issues encountered: </b><br />
- Could not bypass CORS client side when retrieving emojis as b64, built a simple node server using express.<br />
- Could not directly save images so I retrieved them as B64 which easily converts to blob. <br />

<b> Technology Used: </b> <br />
create-react-app <br />
react.js <br />
node.js <br />
mirror ai API <br />
material-ui <br />
jszip <br />
file-saver <br />
axios <br />
react-images-upload <br />
