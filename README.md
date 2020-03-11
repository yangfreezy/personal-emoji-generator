An app that allows you to save AI generated emojis of your face!

Input: Any number of images that includes a face, accepted filetypes: .jpg, .gif, .png
Output: Zip file of emojis in png format

Data Flow:

- On app load, Mirror AI API token is automatically retrieved.
- User uploads images and they're displayed as a list. When generate is clicked we pass the files along to Mirror AI API, then   save the URLs to later be retrieved as B64 and converted into blobs. 
- When generate button is clicked, we open up a new zip file with jszip, make calls to generated emoji URLS, rewrite the file     names to be .png, save them as blobs, then use file-saver to write the zip file directly to user's downloads. 


Design:
Followed a Component / Container / Layouts architecture pattern.
Components - Single/Multi Use - Only contains Layouts for styling or contains an imported component
Container - Single/Multi Use - Contains one or more components
Layouts - Styled div with children props (can be customized for more declarative syntax, ie: <Column/> or <Row/>

Technology Used:
create-react-app
react.js
node.js
mirror ai API
material-ui
jszip
file-saver
axios
react-images-upload
